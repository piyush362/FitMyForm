import { motion } from "framer-motion";

const features = [
  {
    icon: "🔒",
    title: "100% Private",
    description: "Your files never leave your device. Zero server uploads. Zero tracking.",
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    description: "Powered by Canvas API and WebAssembly. Process images in under 3 seconds.",
  },
  {
    icon: "🎯",
    title: "Exam Presets",
    description: "One-click presets for UPSC, SSC, IBPS, RRB — dimensions, size, format, all set.",
  },
  {
    icon: "📱",
    title: "Works Everywhere",
    description: "Phone, tablet, laptop — fully responsive. No app install needed.",
  },
  {
    icon: "🆓",
    title: "Free Forever",
    description: "No paywalls, no watermarks, no limits. Built by students, for students.",
  },
  {
    icon: "✂️",
    title: "Smart Crop",
    description: "Interactive crop tool with aspect ratio lock. Get the perfect passport-size cut.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Features() {
  return (
    <section className="relative py-16 sm:py-20 border-t border-[var(--border)]">
      {/* Subtle bg glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] opacity-20 blur-[100px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
            Why <span className="text-[var(--saffron)]">FitMyForm</span>?
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-lg mx-auto">
            We built the tool we wished existed when filling our own exam forms.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group rounded-2xl p-6 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--saffron)]/30 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 bg-[var(--navy)] border border-[var(--border)] group-hover:border-[var(--saffron)]/30 group-hover:scale-110 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
