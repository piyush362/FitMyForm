import { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import type { Crop, PixelCrop, PercentCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface CropEditorProps {
  imageUrl: string;
  aspectRatio: string | null;
  onCropComplete: (crop: PixelCrop) => void;
  onSkip: () => void;
  onNext: () => void;
  imageRef: React.RefObject<HTMLImageElement | null>;
}

export default function CropEditor({
  imageUrl,
  aspectRatio,
  onCropComplete,
  onSkip,
  onNext,
  imageRef,
}: CropEditorProps) {
  const [crop, setCrop] = useState<Crop>();
  const [hasCrop, setHasCrop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse aspect ratio for lock
  const parsedRatio = (() => {
    if (!aspectRatio) return undefined;
    const match = aspectRatio.trim().match(/^(\d+(?:\.\d+)?)\s*[:\/]\s*(\d+(?:\.\d+)?)$/);
    if (!match) return undefined;
    const w = parseFloat(match[1]);
    const h = parseFloat(match[2]);
    if (w <= 0 || h <= 0) return undefined;
    return w / h;
  })();

  // Reset crop when image or aspect ratio changes
  useEffect(() => {
    setCrop(undefined);
    setHasCrop(false);
  }, [imageUrl, aspectRatio]);

  const handleCropChange = useCallback((c: Crop) => {
    setCrop(c);
  }, []);

  const handleComplete = useCallback(
    (pixelCrop: PixelCrop, _percentageCrop: PercentCrop) => {
      if (pixelCrop.width > 0 && pixelCrop.height > 0) {
        setHasCrop(true);
        onCropComplete(pixelCrop);
      }
    },
    [onCropComplete]
  );

  return (
    <div className="animate-fade-in-up max-w-4xl mx-auto px-4">
      {/* Crop area */}
      <div
        ref={containerRef}
        className="relative bg-[var(--surface)] rounded-2xl p-4 border border-[var(--border)] overflow-hidden"
      >
        {/* Info bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <span className="text-base">✂️</span>
            <span>
              {parsedRatio
                ? `Locked to ${aspectRatio} ratio`
                : "Free crop — drag to select area"}
            </span>
          </div>
          {hasCrop && (
            <span className="text-xs bg-[var(--saffron)]/10 text-[var(--saffron)] px-3 py-1 rounded-full font-medium">
              Crop selected
            </span>
          )}
        </div>

        {/* Cropper */}
        <div className="flex justify-center">
          <ReactCrop
            crop={crop}
            onChange={handleCropChange}
            onComplete={handleComplete}
            aspect={parsedRatio}
            minWidth={20}
            minHeight={20}
          >
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Uploaded preview"
              className="max-w-full max-h-[55vh] object-contain rounded-lg"
              crossOrigin="anonymous"
            />
          </ReactCrop>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
        <button
          id="skip-crop-btn"
          onClick={onSkip}
          className="
            w-full sm:w-auto px-6 py-3 rounded-xl
            text-sm font-semibold
            bg-[var(--surface)] text-[var(--text-secondary)]
            border border-[var(--border)]
            hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]
            hover:border-[var(--saffron)]/40
            transition-all duration-200 cursor-pointer
          "
        >
          Skip Crop — Use Full Image
        </button>
        <button
          id="next-to-configure-btn"
          onClick={onNext}
          className="
            w-full sm:w-auto px-8 py-3 rounded-xl
            text-sm font-semibold
            bg-[var(--saffron)] text-white
            hover:bg-[var(--saffron-dark)]
            shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40
            transition-all duration-200 cursor-pointer
          "
        >
          Next →
        </button>
      </div>
    </div>
  );
}
