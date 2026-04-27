import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--navy)]/60 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--saffron)] to-[var(--saffron-dark)] flex items-center justify-center">
              <span className="text-white font-black text-xs">F</span>
            </div>
            <span className="text-sm font-semibold text-[var(--text-secondary)]">
              Fit<span className="text-[var(--saffron)]">My</span>Form
            </span>
          </Link>

          {/* Tagline */}
          <p className="text-xs text-[var(--text-muted)] text-center">
            Built for Indian students · 100% free · 100% private · No data leaves your browser
          </p>

          {/* Privacy */}
          <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
            <span>🔒</span>
            <span>Images never leave your device</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
