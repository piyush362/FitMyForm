import { useState, useCallback, useRef } from "react";
import type { PixelCrop } from "react-image-crop";
import type {
  AppStep,
  UploadedImage,
  Constraints,
  ProcessResult,
  ImageFormat,
} from "../types";
import { processImage } from "../utils/imageProcessor";

/** Default constraints — every field is optional/null */
function defaultConstraints(): Constraints {
  return {
    minKB: null,
    maxKB: null,
    exactKB: null,
    width: null,
    height: null,
    aspectRatio: null,
    format: "jpg",
  };
}

/** Load an image from a URL and return the HTMLImageElement */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}

/**
 * Displayed size of the img element at the moment the crop was made.
 * Needed to convert crop coordinates (which are in displayed px) to natural px.
 */
interface DisplayedSize {
  width: number;
  height: number;
}

export function useFormReady() {
  const [step, setStep] = useState<AppStep>(1);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [crop, setCropState] = useState<PixelCrop | null>(null);
  const [constraints, setConstraints] = useState<Constraints>(defaultConstraints());
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [processing, setProcessing] = useState(false);

  // Stores the displayed (rendered) size of the image in the crop editor
  const displayedSizeRef = useRef<DisplayedSize | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // ── Step 1 → Upload ──
  const handleUpload = useCallback((file: File) => {
    // Revoke previous object URL
    setUploadedImage((prev) => {
      if (prev) URL.revokeObjectURL(prev.objectUrl);
      return null;
    });

    const objectUrl = URL.createObjectURL(file);
    const sizeKB = Math.round((file.size / 1024) * 100) / 100;
    setUploadedImage({
      file,
      objectUrl,
      originalName: file.name,
      originalSizeKB: sizeKB,
    });
    setResult(null);
    setCropState(null);
    displayedSizeRef.current = null;
    setStep(2);
  }, []);

  // ── Step 2 → Crop ──
  const handleCropComplete = useCallback((pixelCrop: PixelCrop) => {
    setCropState(pixelCrop);
    // Capture the displayed size of the image right now (while the img is still mounted)
    if (imageRef.current) {
      displayedSizeRef.current = {
        width: imageRef.current.width,
        height: imageRef.current.height,
      };
    }
  }, []);

  const skipCrop = useCallback(() => {
    setCropState(null);
    displayedSizeRef.current = null;
    setStep(3);
  }, []);

  const proceedToConfigure = useCallback(() => {
    // Capture displayed size before the CropEditor unmounts
    if (imageRef.current) {
      displayedSizeRef.current = {
        width: imageRef.current.width,
        height: imageRef.current.height,
      };
    }
    setStep(3);
  }, []);

  // ── Step 3 → Process ──
  const process = useCallback(async () => {
    if (!uploadedImage) return;

    setProcessing(true);
    setResult(null);

    try {
      // Load the image fresh from the object URL (the CropEditor's <img> is unmounted)
      const img = await loadImage(uploadedImage.objectUrl);

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      if (crop && crop.width > 0 && crop.height > 0 && displayedSizeRef.current) {
        // Scale crop coordinates from displayed px → natural px
        const scaleX = img.naturalWidth / displayedSizeRef.current.width;
        const scaleY = img.naturalHeight / displayedSizeRef.current.height;
        const sx = crop.x * scaleX;
        const sy = crop.y * scaleY;
        const sw = crop.width * scaleX;
        const sh = crop.height * scaleY;

        canvas.width = sw;
        canvas.height = sh;
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
      } else {
        // No crop — use full image
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
      }

      const processResult = await processImage(canvas, constraints);
      setResult(processResult);
    } catch (err) {
      console.error("Processing failed:", err);
      setResult({
        blob: new Blob(),
        finalKB: 0,
        finalWidth: 0,
        finalHeight: 0,
        format: constraints.format,
        warning: `Processing failed: ${err instanceof Error ? err.message : "Unknown error"}`,
      });
    } finally {
      setProcessing(false);
    }
  }, [uploadedImage, crop, constraints]);

  // ── Navigation ──
  const goToStep = useCallback((s: AppStep) => {
    setStep(s);
    if (s < 3) setResult(null);
  }, []);

  const resetAll = useCallback(() => {
    setUploadedImage((prev) => {
      if (prev) URL.revokeObjectURL(prev.objectUrl);
      return null;
    });
    setCropState(null);
    setConstraints(defaultConstraints());
    setResult(null);
    setProcessing(false);
    displayedSizeRef.current = null;
    setStep(1);
  }, []);

  const processAgain = useCallback(() => {
    setResult(null);
  }, []);

  // ── Constraint helpers ──
  const updateConstraint = useCallback(
    <K extends keyof Constraints>(key: K, value: Constraints[K]) => {
      setConstraints((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const applyPreset = useCallback(
    (preset: {
      format: ImageFormat;
      width: number | null;
      height: number | null;
      minKB: number | null;
      maxKB: number | null;
    }) => {
      setConstraints({
        format: preset.format,
        width: preset.width,
        height: preset.height,
        minKB: preset.minKB,
        maxKB: preset.maxKB,
        exactKB: null,
        aspectRatio: null,
      });
    },
    []
  );

  return {
    step,
    uploadedImage,
    crop,
    constraints,
    result,
    processing,
    imageRef,
    handleUpload,
    handleCropComplete,
    skipCrop,
    proceedToConfigure,
    process,
    goToStep,
    resetAll,
    processAgain,
    updateConstraint,
    applyPreset,
    setConstraints,
  };
}
