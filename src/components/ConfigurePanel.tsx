import { useState, useCallback } from "react";
import type { Constraints, ImageFormat, Preset } from "../types";
import { presets } from "../constants/presets";
import Tooltip from "./Tooltip";

interface ConfigurePanelProps {
  constraints: Constraints;
  updateConstraint: <K extends keyof Constraints>(key: K, value: Constraints[K]) => void;
  setConstraints: React.Dispatch<React.SetStateAction<Constraints>>;
  applyPreset: (preset: Preset) => void;
  onProcess: () => void;
  processing: boolean;
}

export default function ConfigurePanel({
  constraints,
  updateConstraint,
  setConstraints,
  applyPreset,
  onProcess,
  processing,
}: ConfigurePanelProps) {
  const [sizeMode, setSizeMode] = useState<"range" | "exact">("range");
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const handlePreset = useCallback(
    (preset: Preset) => {
      setActivePreset(preset.name);
      applyPreset(preset);
      setSizeMode("range");
    },
    [applyPreset]
  );

  const handleSizeModeToggle = useCallback(() => {
    if (sizeMode === "range") {
      setSizeMode("exact");
      setConstraints((prev) => ({ ...prev, minKB: null, maxKB: null }));
    } else {
      setSizeMode("range");
      setConstraints((prev) => ({ ...prev, exactKB: null }));
    }
  }, [sizeMode, setConstraints]);

  const parseNum = (val: string): number | null => {
    const n = parseFloat(val);
    return isNaN(n) || n < 0 ? null : n;
  };

  return (
    <div className="animate-fade-in-up max-w-3xl mx-auto px-4">
      {/* ─── Exam Presets ─── */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3 flex items-center gap-2">
          <span>⚡</span> Exam Presets
        </h3>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.name}
              id={`preset-${preset.name.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => handlePreset(preset)}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium
                transition-all duration-200 cursor-pointer
                ${
                  activePreset === preset.name
                    ? "bg-[var(--saffron)] text-white shadow-lg shadow-orange-500/20"
                    : "bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--saffron)]/50 hover:text-[var(--text-primary)]"
                }
              `}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ─── File Size ─── */}
        <div className="bg-[var(--surface)] rounded-2xl p-5 border border-[var(--border)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <span>📏</span> File Size
              <Tooltip text="Target file size in kilobytes (KB). 1 MB = 1024 KB." />
            </h3>
            <button
              id="size-mode-toggle"
              onClick={handleSizeModeToggle}
              className="text-xs font-medium px-3 py-1 rounded-lg bg-[var(--navy-lighter)] text-[var(--text-secondary)] hover:text-[var(--saffron)] transition-colors cursor-pointer"
            >
              {sizeMode === "range" ? "Switch to Exact" : "Switch to Range"}
            </button>
          </div>

          {sizeMode === "range" ? (
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs text-[var(--text-muted)] mb-1.5">Min KB</label>
                <input
                  id="min-kb-input"
                  type="number"
                  min={0}
                  placeholder="e.g. 20"
                  value={constraints.minKB ?? ""}
                  onChange={(e) => updateConstraint("minKB", parseNum(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-[var(--navy)] border border-[var(--border)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--saffron)] transition-colors"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-[var(--text-muted)] mb-1.5">Max KB</label>
                <input
                  id="max-kb-input"
                  type="number"
                  min={0}
                  placeholder="e.g. 100"
                  value={constraints.maxKB ?? ""}
                  onChange={(e) => updateConstraint("maxKB", parseNum(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-[var(--navy)] border border-[var(--border)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--saffron)] transition-colors"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">Exact KB</label>
              <input
                id="exact-kb-input"
                type="number"
                min={0}
                placeholder="e.g. 50"
                value={constraints.exactKB ?? ""}
                onChange={(e) => updateConstraint("exactKB", parseNum(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-[var(--navy)] border border-[var(--border)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--saffron)] transition-colors"
              />
            </div>
          )}

          <p className="text-xs text-[var(--text-muted)] mt-3">
            Leave empty for default compression
          </p>
        </div>

        {/* ─── Dimensions ─── */}
        <div className="bg-[var(--surface)] rounded-2xl p-5 border border-[var(--border)]">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-4">
            <span>📐</span> Dimensions
            <Tooltip text="Output image size in pixels. Leave empty to keep original dimensions." />
          </h3>

          <div className="flex gap-3 mb-3">
            <div className="flex-1">
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">Width (px)</label>
              <input
                id="width-input"
                type="number"
                min={1}
                placeholder="e.g. 200"
                value={constraints.width ?? ""}
                onChange={(e) => updateConstraint("width", parseNum(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-[var(--navy)] border border-[var(--border)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--saffron)] transition-colors"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">Height (px)</label>
              <input
                id="height-input"
                type="number"
                min={1}
                placeholder="e.g. 230"
                value={constraints.height ?? ""}
                onChange={(e) => updateConstraint("height", parseNum(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-[var(--navy)] border border-[var(--border)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--saffron)] transition-colors"
              />
            </div>
          </div>

          <div className="relative flex items-center gap-2 my-3">
            <div className="flex-1 h-px bg-[var(--border)]" />
            <span className="text-xs text-[var(--text-muted)]">OR</span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          <div>
            <label className="block text-xs text-[var(--text-muted)] mb-1.5 flex items-center gap-1">
              Aspect Ratio
              <Tooltip text="Width:Height ratio (e.g. 3:4). The crop tool will lock to this ratio." />
            </label>
            <input
              id="aspect-ratio-input"
              type="text"
              placeholder='e.g. 3:4 or 35:45'
              value={constraints.aspectRatio ?? ""}
              onChange={(e) =>
                updateConstraint("aspectRatio", e.target.value || null)
              }
              className="w-full px-3 py-2.5 rounded-xl bg-[var(--navy)] border border-[var(--border)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--saffron)] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* ─── Format ─── */}
      <div className="mt-6 bg-[var(--surface)] rounded-2xl p-5 border border-[var(--border)]">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-4">
          <span>🖼️</span> Output Format
        </h3>
        <div className="flex gap-3">
          {(["jpg", "png", "webp"] as ImageFormat[]).map((fmt) => (
            <button
              key={fmt}
              id={`format-${fmt}`}
              onClick={() => updateConstraint("format", fmt)}
              className={`
                flex-1 py-2.5 rounded-xl text-sm font-semibold uppercase
                transition-all duration-200 cursor-pointer
                ${
                  constraints.format === fmt
                    ? "bg-[var(--saffron)] text-white shadow-lg shadow-orange-500/20"
                    : "bg-[var(--navy)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--saffron)]/50 hover:text-[var(--text-primary)]"
                }
              `}
            >
              {fmt.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Process Button ─── */}
      <div className="mt-8 flex justify-center">
        <button
          id="process-image-btn"
          onClick={onProcess}
          disabled={processing}
          className={`
            px-10 py-4 rounded-2xl text-base font-bold
            transition-all duration-300 cursor-pointer
            ${
              processing
                ? "bg-[var(--navy-lighter)] text-[var(--text-muted)] cursor-wait"
                : "bg-gradient-to-r from-[var(--saffron)] to-[var(--saffron-light)] text-white shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 active:scale-[0.98]"
            }
          `}
        >
          {processing ? (
            <span className="flex items-center gap-3">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.3"
                />
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Processing…
            </span>
          ) : (
            "🚀 Process Image"
          )}
        </button>
      </div>
    </div>
  );
}
