import { useCallback, useMemo } from "react";
import type { ProcessResult } from "../types";
import { buildFilename, downloadBlob } from "../utils/imageProcessor";

interface ResultPanelProps {
  result: ProcessResult;
  onProcessAgain: () => void;
  onStartOver: () => void;
}

export default function ResultPanel({
  result,
  onProcessAgain,
  onStartOver,
}: ResultPanelProps) {
  const filename = useMemo(() => buildFilename(result), [result]);
  const previewUrl = useMemo(
    () => (result.blob.size > 0 ? URL.createObjectURL(result.blob) : null),
    [result.blob]
  );

  const handleDownload = useCallback(() => {
    if (result.blob.size === 0) return;
    downloadBlob(result.blob, filename);
  }, [result.blob, filename]);

  const hasWarning = result.warning !== null;
  const isSuccess = !hasWarning && result.blob.size > 0;

  return (
    <div className="animate-fade-in-up max-w-2xl mx-auto px-4">
      <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] overflow-hidden">
        {/* Preview */}
        {previewUrl && (
          <div className="flex justify-center p-6 bg-[var(--navy)]/50">
            <img
              src={previewUrl}
              alt="Processed result"
              className="max-w-full max-h-[300px] rounded-xl object-contain shadow-lg"
            />
          </div>
        )}

        {/* Stats */}
        <div className="p-6">
          {/* Status badge */}
          <div
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold mb-4
              ${
                isSuccess
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
              }
            `}
          >
            <span>{isSuccess ? "✅" : "⚠️"}</span>
            <span>
              {result.finalKB} KB · {result.finalWidth} × {result.finalHeight} px ·{" "}
              {result.format.toUpperCase()}
            </span>
          </div>

          {/* Warning */}
          {hasWarning && (
            <div className="mb-4 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm">
              {result.warning}
            </div>
          )}

          {/* Filename preview */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs text-[var(--text-muted)]">Filename:</span>
            <code className="text-xs bg-[var(--navy)] px-3 py-1 rounded-lg text-[var(--text-secondary)] font-mono">
              {filename}
            </code>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              id="download-btn"
              onClick={handleDownload}
              disabled={result.blob.size === 0}
              className="
                flex-1 px-6 py-3.5 rounded-xl
                text-sm font-bold
                bg-gradient-to-r from-[var(--saffron)] to-[var(--saffron-light)] text-white
                shadow-lg shadow-orange-500/30
                hover:shadow-orange-500/50 hover:scale-[1.02]
                active:scale-[0.98]
                transition-all duration-200 cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              ⬇️ Download
            </button>

            <button
              id="process-again-btn"
              onClick={onProcessAgain}
              className="
                flex-1 px-6 py-3.5 rounded-xl
                text-sm font-semibold
                bg-[var(--navy)] text-[var(--text-secondary)]
                border border-[var(--border)]
                hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]
                hover:border-[var(--saffron)]/40
                transition-all duration-200 cursor-pointer
              "
            >
              🔄 Process Again
            </button>

            <button
              id="start-over-btn"
              onClick={onStartOver}
              className="
                flex-1 px-6 py-3.5 rounded-xl
                text-sm font-semibold
                bg-[var(--navy)] text-[var(--text-secondary)]
                border border-[var(--border)]
                hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]
                hover:border-[var(--saffron)]/40
                transition-all duration-200 cursor-pointer
              "
            >
              ✨ Start Over
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
