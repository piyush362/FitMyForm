import type { ImageFormat, Constraints, ProcessResult } from "../types";

/** Map our format type to canvas MIME type */
function getMimeType(format: ImageFormat): string {
  switch (format) {
    case "jpg":  return "image/jpeg";
    case "png":  return "image/png";
    case "webp": return "image/webp";
  }
}

/** Parse an aspect ratio string like "3:4" into a numeric ratio (width/height) */
export function parseAspectRatio(ratio: string): number | null {
  const match = ratio.trim().match(/^(\d+(?:\.\d+)?)\s*[:\/]\s*(\d+(?:\.\d+)?)$/);
  if (!match) return null;
  const w = parseFloat(match[1]);
  const h = parseFloat(match[2]);
  if (w <= 0 || h <= 0) return null;
  return w / h;
}

/** Export a canvas to a Blob at a given quality */
function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas toBlob returned null"));
      },
      mimeType,
      quality
    );
  });
}

/**
 * Core image processing pipeline.
 *
 * 1. Resolve target dimensions
 * 2. Draw to output canvas at resolved dimensions
 * 3. Compress with binary-search if KB target is set
 * 4. Return ProcessResult with all stats
 */
export async function processImage(
  croppedCanvas: HTMLCanvasElement,
  constraints: Constraints
): Promise<ProcessResult> {
  const { format, width, height, aspectRatio, minKB, maxKB, exactKB } = constraints;
  const mimeType = getMimeType(format);

  // ── Step 1: Resolve dimensions ──
  let targetW: number;
  let targetH: number;

  if (width && height) {
    targetW = width;
    targetH = height;
  } else if (aspectRatio) {
    const ratio = parseAspectRatio(aspectRatio);
    if (ratio) {
      targetW = width ?? 400;
      targetH = height ?? Math.round(targetW / ratio);
      if (height && !width) {
        targetH = height;
        targetW = Math.round(targetH * ratio);
      }
    } else {
      targetW = croppedCanvas.width;
      targetH = croppedCanvas.height;
    }
  } else if (width) {
    // only width provided — maintain source aspect ratio
    const sourceRatio = croppedCanvas.width / croppedCanvas.height;
    targetW = width;
    targetH = Math.round(width / sourceRatio);
  } else if (height) {
    const sourceRatio = croppedCanvas.width / croppedCanvas.height;
    targetH = height;
    targetW = Math.round(height * sourceRatio);
  } else {
    targetW = croppedCanvas.width;
    targetH = croppedCanvas.height;
  }

  // ── Step 2: Draw to output canvas ──
  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = targetW;
  outputCanvas.height = targetH;
  const ctx = outputCanvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D context");

  // Use high-quality downscaling
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(croppedCanvas, 0, 0, targetW, targetH);

  // ── Step 3: Compression ──
  let effectiveMinKB = minKB;
  let effectiveMaxKB = maxKB;

  if (exactKB !== null) {
    // ±2 KB tolerance for exact mode
    effectiveMinKB = Math.max(0, exactKB - 2);
    effectiveMaxKB = exactKB + 2;
  }

  const hasTarget = effectiveMinKB !== null || effectiveMaxKB !== null;
  let warning: string | null = null;

  // PNG lossless warning
  if (format === "png" && hasTarget && effectiveMaxKB !== null && effectiveMaxKB < 100) {
    warning =
      "PNG is a lossless format and may not compress below your target. Consider using JPG instead.";
  }

  if (!hasTarget || format === "png") {
    // No KB target or PNG → export at default quality
    const quality = format === "png" ? 1 : 0.92;
    const blob = await canvasToBlob(outputCanvas, mimeType, quality);
    const finalKB = Math.round(blob.size / 1024);

    // Check if PNG result exceeds target
    if (format === "png" && effectiveMaxKB !== null && finalKB > effectiveMaxKB) {
      warning =
        `PNG output is ${finalKB} KB — exceeds your ${effectiveMaxKB} KB limit. PNG is lossless and cannot be compressed further. Try JPG or WebP.`;
    }

    return {
      blob,
      finalKB,
      finalWidth: targetW,
      finalHeight: targetH,
      format,
      warning,
    };
  }

  // Binary search on quality for JPG/WebP
  let low = 0.05;
  let high = 1.0;
  let bestBlob: Blob | null = null;
  let bestDiff = Infinity;
  const MAX_ITERATIONS = 15;

  const targetMin = effectiveMinKB ?? 0;
  const targetMax = effectiveMaxKB ?? Infinity;

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    const mid = (low + high) / 2;
    const blob = await canvasToBlob(outputCanvas, mimeType, mid);
    const sizeKB = blob.size / 1024;

    // Calculate distance from target range
    let diff: number;
    if (sizeKB >= targetMin && sizeKB <= targetMax) {
      diff = 0; // Within range
    } else if (sizeKB < targetMin) {
      diff = targetMin - sizeKB;
    } else {
      diff = sizeKB - targetMax;
    }

    if (diff < bestDiff) {
      bestDiff = diff;
      bestBlob = blob;
    }

    // If within range, we're done
    if (sizeKB >= targetMin && sizeKB <= targetMax) {
      return {
        blob,
        finalKB: Math.round(sizeKB),
        finalWidth: targetW,
        finalHeight: targetH,
        format,
        warning: null,
      };
    }

    if (sizeKB > targetMax) {
      high = mid; // Too large — reduce quality
    } else {
      low = mid; // Too small — increase quality
    }
  }

  // Could not hit range — return closest result with a warning
  const finalBlob = bestBlob!;
  const finalKB = Math.round(finalBlob.size / 1024);

  return {
    blob: finalBlob,
    finalKB,
    finalWidth: targetW,
    finalHeight: targetH,
    format,
    warning: `Could not reach target size. Closest: ${finalKB} KB. Try switching to JPG or relaxing the size range.`,
  };
}

/** Build the download filename */
export function buildFilename(result: ProcessResult): string {
  const ext = result.format === "jpg" ? "jpg" : result.format;
  return `formready_${result.finalWidth}x${result.finalHeight}_${result.finalKB}kb.${ext}`;
}

/** Trigger a browser download for a blob */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
