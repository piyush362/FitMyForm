import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    icon: "📤",
    title: "Upload Your Photo",
    description:
      "Drag & drop or browse to upload your passport photo, signature, or any document image.",
    color: "bg-blue-50 border-blue-200 text-[var(--brand-blue)]",
    ring: "ring-blue-100",
  },
  {
    step: "02",
    icon: "✂️",
    title: "Crop & Configure",
    description:
      "Use interactive crop, pick an exam preset (UPSC, SSC, IBPS...), set dimensions and file size limits.",
    color: "bg-orange-50 border-orange-200 text-orange-600",
    ring: "ring-orange-100",
  },
  {
    step: "03",
    icon: "⬇️",
    title: "Download Form-Ready Image",
    description:
      "Get your perfectly sized, compressed image — ready to upload directly to the exam portal.",
    color: "bg-green-50 border-green-200 text-[var(--brand-green)]",
    ring: "ring-green-100",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            How It <span className="text-[var(--brand-blue)]">Works</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
            Three simple steps. No sign-ups, no uploads to servers. Done in
            under 30 seconds.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative group"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 left-[calc(50%+40px)] w-[calc(100%-40px)] h-[2px] bg-slate-200 z-0" />
              )}

              <div className="relative z-10 text-center">
                {/* Step number */}
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${s.color} border text-3xl mb-5 ring-4 ${s.ring} group-hover:scale-110 transition-transform duration-300`}>
                  {s.icon}
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Step {s.step}
                </p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
