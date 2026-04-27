import { motion } from "framer-motion";

const features = [
  {
    icon: "🔒",
    title: "100% Private",
    description: "Your files never leave your device. Zero server uploads. Zero tracking.",
    color: "bg-emerald-50 border-emerald-200",
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    description: "Powered by Canvas API. Process images in under 3 seconds.",
    color: "bg-amber-50 border-amber-200",
  },
  {
    icon: "🎯",
    title: "Exam Presets",
    description: "One-click presets for UPSC, SSC, IBPS, RRB — dimensions, size, format, all set.",
    color: "bg-blue-50 border-blue-200",
  },
  {
    icon: "📱",
    title: "Works Everywhere",
    description: "Phone, tablet, laptop — fully responsive. No app install needed.",
    color: "bg-violet-50 border-violet-200",
  },
  {
    icon: "🆓",
    title: "Free Forever",
    description: "No paywalls, no watermarks, no limits. Built by students, for students.",
    color: "bg-green-50 border-green-200",
  },
  {
    icon: "✂️",
    title: "Smart Crop",
    description: "Interactive crop tool with aspect ratio lock. Get the perfect passport-size cut.",
    color: "bg-rose-50 border-rose-200",
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
    <section className="relative py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Why{" "}
            <span className="text-[var(--brand-blue)]">Fit</span>
            <span className="text-[var(--brand-green)]">My</span>
            <span className="text-[var(--brand-blue)]">Form</span>?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
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
              className="group rounded-2xl p-6 bg-white border border-slate-200 hover:border-[var(--brand-blue)]/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 border ${feature.color} group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
