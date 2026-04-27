import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background — soft gradient + subtle grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white to-white" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#1B4F91 1px, transparent 1px), linear-gradient(90deg, #1B4F91 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(27,79,145,0.06) 0%, rgba(46,159,71,0.04) 40%, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-12 sm:pb-16 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <img
            src="/brand/logo_only.png"
            alt="FitMyForm"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-lg"
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-[var(--brand-blue)] text-xs sm:text-sm font-medium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-green)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--brand-green)]" />
          </span>
          100% Free · No Sign-up · Works Offline
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-5"
        >
          <span className="text-slate-900">Your Form.</span>
          <br />
          <span className="bg-gradient-to-r from-[var(--brand-blue)] via-[var(--brand-blue-light)] to-[var(--brand-green)] bg-clip-text text-transparent">
            Perfectly Fit.
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          Upload once. Fit every requirement.{" "}
          Resize, compress & format images for{" "}
          <span className="text-slate-900 font-semibold">
            UPSC, SSC, IBPS, RRB
          </span>{" "}
          and every government exam form — in seconds, right in your browser.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#tools"
            className="px-8 py-4 rounded-2xl text-base font-bold bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-blue-light)] text-white shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105 active:scale-[0.98] transition-all duration-300 no-underline"
          >
            🚀 Get Started — It's Free
          </a>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>🔒</span>
            <span>Your images never leave your device</span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-14 pt-8 border-t border-slate-200"
        >
          {[
            { value: "100%", label: "Free Forever" },
            { value: "0", label: "Data Uploaded" },
            { value: "6+", label: "Exam Presets" },
            { value: "< 3s", label: "Processing Time" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-[var(--brand-blue)]">
                {stat.value}
              </p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
