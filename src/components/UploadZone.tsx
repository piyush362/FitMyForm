import { useCallback, useState, useRef } from "react";

interface UploadZoneProps {
  onUpload: (file: File) => void;
}

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

const ACCEPTED_EXTENSIONS = ".jpg,.jpeg,.png,.webp,.heic,.heif";

export default function UploadZone({ onUpload }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndUpload = useCallback(
    (file: File) => {
      setError(null);
      const isValidType =
        ACCEPTED_TYPES.includes(file.type) ||
        /\.(jpe?g|png|webp|heic|heif)$/i.test(file.name);

      if (!isValidType) {
        setError("Unsupported format. Please upload JPG, PNG, WebP, or HEIC.");
        return;
      }

      if (file.size > 50 * 1024 * 1024) {
        setError("File too large. Maximum supported size is 50 MB.");
        return;
      }

      onUpload(file);
    },
    [onUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) validateAndUpload(file);
    },
    [validateAndUpload]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) validateAndUpload(file);
      // Reset so re-uploading the same file triggers change
      e.target.value = "";
    },
    [validateAndUpload]
  );

  return (
    <div className="animate-fade-in-up max-w-2xl mx-auto px-4">
      <div
        id="upload-dropzone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative flex flex-col items-center justify-center
          min-h-[320px] sm:min-h-[380px]
          rounded-2xl border-2 border-dashed
          cursor-pointer transition-all duration-300
          ${
            isDragging
              ? "border-[var(--saffron)] bg-[var(--saffron)]/10 scale-[1.02]"
              : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--saffron)]/60 hover:bg-[var(--surface-hover)]"
          }
        `}
      >
        {/* Background glow */}
        <div
          className={`
            absolute inset-0 rounded-2xl transition-opacity duration-300
            ${isDragging ? "opacity-100" : "opacity-0"}
          `}
          style={{
            background:
              "radial-gradient(circle at center, rgba(249,115,22,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Icon */}
        <div className="relative mb-6">
          <div
            className={`
              w-20 h-20 sm:w-24 sm:h-24 rounded-2xl
              flex items-center justify-center
              bg-[var(--saffron)]/10 text-[var(--saffron)]
              transition-transform duration-300
              ${isDragging ? "scale-110 rotate-3" : ""}
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 sm:w-12 sm:h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          </div>
        </div>

        {/* Text */}
        <div className="relative text-center px-6">
          <p className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-2">
            {isDragging ? "Drop your image here" : "Drag & drop your image"}
          </p>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            or{" "}
            <span className="text-[var(--saffron)] font-medium underline underline-offset-2">
              click to browse
            </span>
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Supports JPG, PNG, WebP, HEIC · Max 50 MB
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          onChange={handleFileChange}
          className="hidden"
          id="file-upload-input"
        />
      </div>

      {error && (
        <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
}
