import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Tools", href: "#tools" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 ${isLanding ? "header-light" : "header-dark"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline shrink-0">
          <img
            src="/brand/logo_only.png"
            alt="FitMyForm logo"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
          />
          <div className="hidden sm:block">
            <h1
              className={`text-lg font-bold leading-tight ${
                isLanding ? "text-[var(--brand-blue-dark)]" : "text-[var(--text-primary)]"
              }`}
            >
              Fit<span className={isLanding ? "text-[var(--brand-green)]" : "text-[var(--saffron)]"}>My</span>Form
            </h1>
            <p
              className={`text-[10px] leading-tight ${
                isLanding ? "text-slate-500" : "text-[var(--text-muted)]"
              }`}
            >
              Upload once. Fit every requirement.
            </p>
          </div>
        </Link>

        {/* Desktop Nav — only on landing */}
        {isLanding && (
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-[var(--brand-blue)] transition-colors no-underline"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          {!isLanding && (
            <Link
              to="/"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--saffron)] transition-colors no-underline"
            >
              ← All Tools
            </Link>
          )}

          {isLanding ? (
            <Link
              to="/image-resizer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[var(--brand-blue)] text-white hover:bg-[var(--brand-blue-dark)] shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 no-underline"
            >
              Get Started Free
            </Link>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-500/10 border border-green-500/20 text-green-400">
              <span>🔒</span>
              <span>100% Private</span>
            </div>
          )}

          {/* Mobile hamburger — landing only */}
          {isLanding && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isLanding && mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-slate-200 bg-white"
        >
          <div className="px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-slate-600 hover:text-[var(--brand-blue)] py-2 no-underline"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/image-resizer"
              className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[var(--brand-blue)] text-white no-underline"
            >
              Get Started Free
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
