import "./index.css";
import Stepper from "./components/Stepper";
import UploadZone from "./components/UploadZone";
import CropEditor from "./components/CropEditor";
import ConfigurePanel from "./components/ConfigurePanel";
import ResultPanel from "./components/ResultPanel";
import { useFormReady } from "./hooks/useFormReady";

export default function App() {
  const {
    step,
    uploadedImage,
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
  } = useFormReady();

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── Header ─── */}
      <header className="relative border-b border-[var(--border)] bg-[var(--navy)]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--saffron)] to-[var(--saffron-dark)] flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-white font-extrabold text-lg">F</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] leading-tight">
                FormReady
              </h1>
              <p className="text-[10px] sm:text-xs text-[var(--text-muted)] leading-tight">
                Smart Image Resizer for Govt Exams
              </p>
            </div>
          </div>

          {/* Privacy badge */}
          <div className="hidden sm:flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-xs font-medium">
            <span>🔒</span>
            <span>100% Private — images never leave your device</span>
          </div>
        </div>
      </header>

      {/* ─── Stepper ─── */}
      <Stepper
        currentStep={step}
        onGoToStep={goToStep}
        canGoTo2={!!uploadedImage}
        canGoTo3={!!uploadedImage}
      />

      {/* ─── Upload info bar ─── */}
      {uploadedImage && step > 1 && (
        <div className="max-w-6xl mx-auto px-4 mb-4">
          <div className="flex items-center gap-3 bg-[var(--surface)] rounded-xl px-4 py-2.5 border border-[var(--border)] text-sm">
            <span className="text-[var(--text-muted)]">📎</span>
            <span className="text-[var(--text-secondary)] truncate">
              {uploadedImage.originalName}
            </span>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="text-[var(--text-secondary)]">
              {uploadedImage.originalSizeKB.toFixed(1)} KB
            </span>
            <button
              onClick={resetAll}
              className="ml-auto text-xs text-[var(--text-muted)] hover:text-[var(--danger)] transition-colors cursor-pointer"
            >
              ✕ Remove
            </button>
          </div>
        </div>
      )}

      {/* ─── Main Content ─── */}
      <main className="flex-1 pb-12">
        {/* Step 1: Upload */}
        {step === 1 && <UploadZone onUpload={handleUpload} />}

        {/* Step 2: Crop */}
        {step === 2 && uploadedImage && (
          <CropEditor
            imageUrl={uploadedImage.objectUrl}
            aspectRatio={constraints.aspectRatio}
            onCropComplete={handleCropComplete}
            onSkip={skipCrop}
            onNext={proceedToConfigure}
            imageRef={imageRef}
          />
        )}

        {/* Step 3: Configure & Result */}
        {step === 3 && (
          <>
            {result ? (
              <ResultPanel
                result={result}
                onProcessAgain={processAgain}
                onStartOver={resetAll}
              />
            ) : (
              <ConfigurePanel
                constraints={constraints}
                updateConstraint={updateConstraint}
                setConstraints={setConstraints}
                applyPreset={applyPreset}
                onProcess={process}
                processing={processing}
              />
            )}
          </>
        )}
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-[var(--border)] bg-[var(--navy)]/60 py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
          <span>
            FormReady — Built for Indian students. 100% free, 100% private.
          </span>
          <span className="sm:hidden flex items-center gap-1">
            🔒 Images never leave your device
          </span>
          <span className="hidden sm:inline">No data leaves your browser.</span>
        </div>
      </footer>
    </div>
  );
}
