import type { AppStep } from "../types";

interface StepperProps {
  currentStep: AppStep;
  onGoToStep: (step: AppStep) => void;
  canGoTo2: boolean;
  canGoTo3: boolean;
}

const steps: { step: AppStep; label: string; icon: string }[] = [
  { step: 1, label: "Upload", icon: "📤" },
  { step: 2, label: "Crop", icon: "✂️" },
  { step: 3, label: "Configure", icon: "⚙️" },
];

export default function Stepper({
  currentStep,
  onGoToStep,
  canGoTo2,
  canGoTo3,
}: StepperProps) {
  const canNavigate = (s: AppStep): boolean => {
    if (s === 1) return true;
    if (s === 2) return canGoTo2;
    if (s === 3) return canGoTo3;
    return false;
  };

  return (
    <nav className="flex items-center justify-center gap-2 sm:gap-4 py-6 px-4">
      {steps.map(({ step, label, icon }, index) => {
        const isActive = currentStep === step;
        const isCompleted = currentStep > step;
        const clickable = canNavigate(step);

        return (
          <div key={step} className="flex items-center gap-2 sm:gap-4">
            <button
              id={`stepper-step-${step}`}
              onClick={() => clickable && onGoToStep(step)}
              disabled={!clickable}
              className={`
                flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl
                text-sm sm:text-base font-semibold
                transition-all duration-300 cursor-pointer
                ${
                  isActive
                    ? "bg-[var(--saffron)] text-white shadow-lg shadow-orange-500/30 scale-105"
                    : isCompleted
                    ? "bg-[var(--saffron)]/20 text-[var(--saffron)] border border-[var(--saffron)]/30"
                    : "bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)]"
                }
                ${
                  clickable && !isActive
                    ? "hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] hover:border-[var(--saffron)]/50"
                    : ""
                }
                ${!clickable ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <span className="text-base">{isCompleted ? "✅" : icon}</span>
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{step}</span>
            </button>

            {index < steps.length - 1 && (
              <div
                className={`
                  w-8 sm:w-12 h-0.5 rounded-full transition-colors duration-300
                  ${currentStep > step ? "bg-[var(--saffron)]" : "bg-[var(--border)]"}
                `}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
