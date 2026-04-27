import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative border-b border-[var(--border)] bg-[var(--navy)]/80 backdrop-blur-xl sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group no-underline">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--saffron)] to-[var(--saffron-dark)] flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow duration-300">
            <span className="text-white font-black text-lg">F</span>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] leading-tight">
              Fit<span className="text-[var(--saffron)]">My</span>Form
            </h1>
            <p className="text-[10px] sm:text-xs text-[var(--text-muted)] leading-tight">
              Smart Tools for Govt Exams
            </p>
          </div>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Nav link when not on home */}
          {!isHome && (
            <Link
              to="/"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--saffron)] transition-colors no-underline"
            >
              ← All Tools
            </Link>
          )}

          {/* Privacy badge */}
          <div className="hidden sm:flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-xs font-medium">
            <span>🔒</span>
            <span>100% Private</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
