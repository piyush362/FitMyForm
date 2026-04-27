/** Supported output image formats */
export type ImageFormat = "jpg" | "png" | "webp";

/** Exam preset definition */
export interface Preset {
  name: string;
  format: ImageFormat;
  width: number | null;
  height: number | null;
  minKB: number | null;
  maxKB: number | null;
}

/** User-defined processing constraints */
export interface Constraints {
  minKB: number | null;
  maxKB: number | null;
  exactKB: number | null;
  width: number | null;
  height: number | null;
  aspectRatio: string | null; // e.g. "3:4"
  format: ImageFormat;
}

/** Result returned after image processing */
export interface ProcessResult {
  blob: Blob;
  finalKB: number;
  finalWidth: number;
  finalHeight: number;
  format: ImageFormat;
  warning: string | null;
}

/** Upload metadata */
export interface UploadedImage {
  file: File;
  objectUrl: string;
  originalName: string;
  originalSizeKB: number;
}

/** App step identifiers */
export type AppStep = 1 | 2 | 3;
