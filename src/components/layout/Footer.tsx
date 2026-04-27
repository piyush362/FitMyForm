import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  if (isLanding) {
    return (
      <footer className="border-t border-slate-200 bg-slate-50 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-2.5 no-underline">
              <img
                src="/brand/logo_only.png"
                alt="FitMyForm"
                className="w-7 h-7 object-contain"
              />
              <span className="text-sm font-bold text-[var(--brand-blue-dark)]">
                Fit<span className="text-[var(--brand-green)]">My</span>Form
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-xs text-slate-500 text-center">
              Built for Indian students · 100% free · 100% private · No data leaves your browser
            </p>

            {/* Privacy */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span>🔒</span>
              <span>Images never leave your device</span>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Dark footer for tool pages
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--navy)]/60 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <img
              src="/brand/logo_only.png"
              alt="FitMyForm"
              className="w-6 h-6 object-contain"
            />
            <span className="text-sm font-semibold text-[var(--text-secondary)]">
              Fit<span className="text-[var(--saffron)]">My</span>Form
            </span>
          </Link>

          <p className="text-xs text-[var(--text-muted)] text-center">
            Built for Indian students · 100% free · 100% private · No data leaves your browser
          </p>

          <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
            <span>🔒</span>
            <span>Images never leave your device</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
