import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.3) 0%, rgba(249,115,22,0) 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--saffron)]/10 border border-[var(--saffron)]/20 text-[var(--saffron)] text-xs sm:text-sm font-medium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--saffron)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--saffron)]" />
          </span>
          100% Free · No Sign-up · Works Offline
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6"
        >
          <span className="text-[var(--text-primary)]">Your Form.</span>
          <br />
          <span className="bg-gradient-to-r from-[var(--saffron)] via-[var(--saffron-light)] to-yellow-400 bg-clip-text text-transparent">
            Perfectly Fit.
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Resize, compress & format images for{" "}
          <span className="text-[var(--text-primary)] font-semibold">
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
            className="px-8 py-4 rounded-2xl text-base font-bold bg-gradient-to-r from-[var(--saffron)] to-[var(--saffron-light)] text-white shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 active:scale-[0.98] transition-all duration-300 no-underline"
          >
            🚀 Get Started — It's Free
          </a>
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <span>🔒</span>
            <span>Your images never leave your device</span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-14 pt-8 border-t border-[var(--border)]"
        >
          {[
            { value: "100%", label: "Free Forever" },
            { value: "0", label: "Data Uploaded" },
            { value: "6+", label: "Exam Presets" },
            { value: "< 3s", label: "Processing Time" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-[var(--saffron)]">
                {stat.value}
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
