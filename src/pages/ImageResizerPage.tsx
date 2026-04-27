import { motion } from "framer-motion";
import Stepper from "../components/Stepper";
import UploadZone from "../components/UploadZone";
import CropEditor from "../components/CropEditor";
import ConfigurePanel from "../components/ConfigurePanel";
import ResultPanel from "../components/ResultPanel";
import { useFormReady } from "../hooks/useFormReady";

export default function ImageResizerPage() {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex flex-col"
    >
      {/* ─── Page title ─── */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-6 pb-2">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
          🖼️ Image Resizer & Compressor
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Resize, crop, and compress photos to exact exam portal requirements
        </p>
      </div>

      {/* ─── Stepper ─── */}
      <Stepper
        currentStep={step}
        onGoToStep={goToStep}
        canGoTo2={!!uploadedImage}
        canGoTo3={!!uploadedImage}
      />

      {/* ─── Upload info bar ─── */}
      {uploadedImage && step > 1 && (
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 mb-4">
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
        {step === 1 && <UploadZone onUpload={handleUpload} />}

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
    </motion.div>
  );
}
