import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 ${isLanding ? "header-light" : "header-dark"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline group">
          <img
            src="/brand/logo_only.png"
            alt="FitMyForm logo"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
          />
          <div>
            <h1
              className={`text-lg sm:text-xl font-bold leading-tight ${
                isLanding ? "text-[var(--brand-blue-dark)]" : "text-[var(--text-primary)]"
              }`}
            >
              Fit<span className={isLanding ? "text-[var(--brand-green)]" : "text-[var(--saffron)]"}>My</span>Form
            </h1>
            <p
              className={`text-[10px] sm:text-xs leading-tight ${
                isLanding ? "text-slate-500" : "text-[var(--text-muted)]"
              }`}
            >
              Upload once. Fit every requirement.
            </p>
          </div>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {!isLanding && (
            <Link
              to="/"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--saffron)] transition-colors no-underline"
            >
              ← All Tools
            </Link>
          )}

          {/* Privacy badge */}
          <div
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
              isLanding
                ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                : "bg-green-500/10 border border-green-500/20 text-green-400"
            }`}
          >
            <span>🔒</span>
            <span>100% Private</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
