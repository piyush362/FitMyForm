import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const featurePills = [
  { icon: "📐", label: "Resize", sub: "Exact Dimensions" },
  { icon: "📦", label: "Compress", sub: "Target KB Size" },
  { icon: "🖼️", label: "Format", sub: "JPG / PNG / WebP" },
  { icon: "🔒", label: "100% Safe", sub: "Nothing uploaded" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-green-50/20" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#1B4F91 1px, transparent 1px), linear-gradient(90deg, #1B4F91 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-green-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* ─── Left Column ─── */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold mb-5"
            >
              <span>🇮🇳</span>
              <span className="uppercase tracking-wide text-[11px]">
                Made for Indian Students
              </span>
            </motion.div>

            {/* Heading — persuasive */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl font-black leading-[1.13] tracking-tight text-slate-900 mb-4"
            >
              Fix Photo Size, Format
              <br className="hidden sm:block" />
              {" & "}Dimensions for{" "}
              <span className="text-[var(--brand-blue)]">Any Govt Exam</span>
              <br className="hidden sm:block" />
              {" — "}
              <span className="bg-gradient-to-r from-[var(--brand-green)] to-emerald-500 bg-clip-text text-transparent">
                Instantly
              </span>
            </motion.h2>

            {/* Subtitle — benefit-driven */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 max-w-lg"
            >
              Upload your image and we'll automatically match exact requirements
              — KB size, pixel dimensions, and format.{" "}
              <span className="font-semibold text-slate-800">No more rejections.</span>
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-2.5 mb-7"
            >
              {featurePills.map((pill) => (
                <div
                  key={pill.label}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200"
                >
                  <span className="text-base">{pill.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 leading-tight">
                      {pill.label}
                    </p>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      {pill.sub}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons — strong, persuasive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-3"
            >
              <Link
                to="/image-resizer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold bg-[var(--brand-blue)] text-white shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 hover:bg-[var(--brand-blue-dark)] active:scale-[0.97] transition-all duration-300 no-underline"
              >
                Fix My Photo Now
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300 no-underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[var(--brand-blue)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
                See How It Works
              </a>
            </motion.div>

            {/* Urgency line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-xs sm:text-sm text-slate-500 mb-6 flex items-center gap-1.5"
            >
              <span className="text-amber-500">⚡</span>
              Takes less than 10 seconds · No sign-up required
            </motion.p>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-5 border-t border-slate-200"
            >
              {/* Avatar stack + rating */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {["bg-blue-500", "bg-green-500", "bg-orange-500", "bg-violet-500"].map((bg, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm`}
                    >
                      {["A", "R", "P", "S"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Trusted by 10,000+ students
                  </p>
                </div>
              </div>

              {/* Exam badges */}
              <div className="flex flex-wrap gap-1.5">
                {["UPSC", "SSC", "IBPS", "Railway"].map((exam) => (
                  <span
                    key={exam}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200"
                  >
                    {exam}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ─── Right Column — App Mockup ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main mockup card */}
            <div className="relative bg-white rounded-2xl shadow-2xl shadow-slate-200/60 border border-slate-200 overflow-hidden">
              {/* Mini header */}
              <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/brand/logo_only.png" alt="" className="w-5 h-5" />
                  <span className="text-xs font-bold text-[var(--brand-blue-dark)]">
                    Fit<span className="text-[var(--brand-green)]">My</span>Form
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {[
                    { label: "Upload", active: true, done: true },
                    { label: "Process", active: true, done: false },
                    { label: "Download", active: false, done: false },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-1.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        s.done
                          ? "bg-[var(--brand-green)] text-white"
                          : s.active
                          ? "bg-[var(--brand-blue)] text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}>
                        {s.done ? "✓" : s.active ? "2" : "3"}
                      </div>
                      <span className={`text-[10px] font-medium ${s.active ? "text-slate-700" : "text-slate-400"}`}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex items-start gap-4">
                {/* Original */}
                <div className="flex-1">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Original Image
                  </p>
                  <div className="bg-red-50/50 rounded-xl border border-red-200/60 p-3 flex items-center justify-center aspect-[3/4]">
                    <div className="w-full h-full rounded-lg bg-gradient-to-b from-slate-100 to-slate-50 flex items-center justify-center relative">
                      <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                        </svg>
                      </div>
                      {/* X mark */}
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-[9px] text-red-500 font-medium mt-1.5 text-center">
                    4032 × 3024 px · 3.2 MB ❌
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center justify-center pt-16 gap-2">
                  <div className="flex flex-col items-center gap-1.5 px-3 py-2 bg-slate-50 rounded-lg">
                    {["300×300 px", "35 KB", "JPG"].map((s) => (
                      <span key={s} className="text-[9px] font-medium text-slate-500 flex items-center gap-1">
                        <span className="text-[var(--brand-green)]">✓</span> {s}
                      </span>
                    ))}
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[var(--brand-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>

                {/* Result */}
                <div className="flex-1">
                  <p className="text-[10px] font-semibold text-[var(--brand-green)] uppercase tracking-wider mb-2">
                    ✅ Accepted
                  </p>
                  <div className="bg-green-50 rounded-xl border border-green-200 p-3 flex items-center justify-center aspect-[3/4]">
                    <div className="w-full h-full rounded-lg bg-gradient-to-b from-green-100 to-green-50 flex items-center justify-center relative">
                      <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                        </svg>
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--brand-green)] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-[9px] text-green-600 font-medium mt-1.5 text-center">
                    300 × 300 px · 35 KB ✅
                  </p>
                  <div className="mt-2 flex justify-center">
                    <div className="px-4 py-1.5 rounded-lg bg-[var(--brand-green)] text-white text-[10px] font-semibold flex items-center gap-1 shadow-md shadow-green-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" />
                      </svg>
                      Download Image
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const }}
              className="absolute -top-3 -right-3 bg-white rounded-xl shadow-lg shadow-green-100 border border-green-200 px-4 py-2.5 flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-full bg-[var(--brand-green)]/15 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[var(--brand-green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-800">Secure &</p>
                <p className="text-[11px] font-bold text-[var(--brand-green)]">Private</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" as const, delay: 0.5 }}
              className="absolute -bottom-2 -left-4 bg-white rounded-xl shadow-lg shadow-blue-100 border border-blue-200 px-4 py-2.5 flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center text-sm">📁</div>
              <p className="text-[11px] font-bold text-slate-700">Any Format</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const, delay: 1 }}
              className="absolute bottom-12 -right-5 bg-white rounded-xl shadow-lg shadow-blue-100 border border-blue-200 px-4 py-2.5 flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-sm">📏</div>
              <p className="text-[11px] font-bold text-slate-700">Any Size</p>
            </motion.div>
          </motion.div>

          {/* ─── Mobile Mockup (smaller, below CTA) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:hidden bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
          >
            <div className="p-4 flex items-center gap-3">
              {/* Before */}
              <div className="flex-1 text-center">
                <div className="bg-red-50 rounded-xl border border-red-200/60 p-2 aspect-square flex items-center justify-center mb-1.5">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                    </svg>
                  </div>
                </div>
                <p className="text-[10px] font-medium text-red-500">Before ❌</p>
                <p className="text-[8px] text-slate-400">3.2 MB · Wrong size</p>
              </div>
              {/* Arrow */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[var(--brand-blue)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              {/* After */}
              <div className="flex-1 text-center">
                <div className="bg-green-50 rounded-xl border border-green-200 p-2 aspect-square flex items-center justify-center mb-1.5">
                  <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                    </svg>
                  </div>
                </div>
                <p className="text-[10px] font-medium text-green-600">Accepted ✅</p>
                <p className="text-[8px] text-green-500">35 KB · Perfect</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
