import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const presets = [
  {
    name: "UPSC Photo",
    dims: "300 × 350 px",
    size: "20–50 KB",
    format: "JPG",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    icon: "🎓",
  },
  {
    name: "SSC CGL Photo",
    dims: "300 × 300 px",
    size: "20–50 KB",
    format: "JPG",
    color: "bg-orange-50 border-orange-200 text-orange-700",
    icon: "📝",
  },
  {
    name: "IBPS Signature",
    dims: "140 × 60 px",
    size: "10–20 KB",
    format: "JPG",
    color: "bg-green-50 border-green-200 text-green-700",
    icon: "✍️",
  },
  {
    name: "Railway Photo",
    dims: "320 × 400 px",
    size: "20–50 KB",
    format: "JPG",
    color: "bg-violet-50 border-violet-200 text-violet-700",
    icon: "🚂",
  },
  {
    name: "Passport Size",
    dims: "350 × 450 px",
    size: "10–200 KB",
    format: "JPG",
    color: "bg-rose-50 border-rose-200 text-rose-700",
    icon: "🪪",
  },
  {
    name: "UPSC Signature",
    dims: "300 × 80 px",
    size: "5–30 KB",
    format: "JPG",
    color: "bg-amber-50 border-amber-200 text-amber-700",
    icon: "🖊️",
  },
];

export default function PresetsShowcase() {
  return (
    <section className="relative py-16 sm:py-20 bg-white border-t border-slate-100">
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
            One-Click{" "}
            <span className="text-[var(--brand-blue)]">Exam Presets</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
            Select your exam and we auto-set the exact dimensions, file size,
            and format. No guesswork.
          </p>
        </motion.div>

        {/* Preset cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
          {presets.map((preset, i) => (
            <motion.div
              key={preset.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link
                to="/image-resizer"
                className="no-underline block group"
              >
                <div
                  className={`rounded-xl border p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${preset.color}`}
                >
                  <span className="text-2xl block mb-2">{preset.icon}</span>
                  <p className="text-xs font-bold text-slate-900 mb-1.5 leading-tight">
                    {preset.name}
                  </p>
                  <p className="text-[10px] text-slate-500 leading-snug">
                    {preset.dims}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {preset.size} · {preset.format}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-slate-500">
            Don't see your exam? Use{" "}
            <Link
              to="/image-resizer"
              className="text-[var(--brand-blue)] font-semibold hover:underline"
            >
              custom settings
            </Link>{" "}
            to set any dimension and size.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
