import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const painPoints = [
  { icon: "❌", text: '"File size too large" errors', color: "text-red-500" },
  { icon: "❌", text: "Trial & error with dimensions", color: "text-red-500" },
  { icon: "❌", text: "Photo rejected after uploading", color: "text-red-500" },
  { icon: "❌", text: "Wasting hours on wrong format", color: "text-red-500" },
];

const solution = [
  { icon: "✅", text: "One click → perfect image", color: "text-[var(--brand-green)]" },
  { icon: "✅", text: "Exact KB, dimensions & format", color: "text-[var(--brand-green)]" },
  { icon: "✅", text: "Accepted on the first try", color: "text-[var(--brand-green)]" },
  { icon: "✅", text: "Works for every govt exam portal", color: "text-[var(--brand-green)]" },
];

export default function WhyStudents() {
  return (
    <section className="relative py-16 sm:py-20 bg-slate-50/50 border-t border-slate-100">
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
            Why Students Use{" "}
            <span className="text-[var(--brand-blue)]">FitMyForm</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
            Stop wasting time. Fix your form photos in seconds, not hours.
          </p>
        </motion.div>

        {/* Before / After grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {/* Before — Pain */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl border border-red-200/60 p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500 text-lg">
                😩
              </div>
              <h3 className="text-base font-bold text-slate-900">Without FitMyForm</h3>
            </div>
            <div className="space-y-3">
              {painPoints.map((p) => (
                <div key={p.text} className="flex items-center gap-3">
                  <span className={`text-sm ${p.color}`}>{p.icon}</span>
                  <span className="text-sm text-slate-600">{p.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* After — Solution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl border border-green-200 p-6 sm:p-8 ring-2 ring-green-100"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-500 text-lg">
                😎
              </div>
              <h3 className="text-base font-bold text-slate-900">
                With <span className="text-[var(--brand-green)]">FitMyForm</span>
              </h3>
            </div>
            <div className="space-y-3">
              {solution.map((s) => (
                <div key={s.text} className="flex items-center gap-3">
                  <span className={`text-sm ${s.color}`}>{s.icon}</span>
                  <span className="text-sm text-slate-700 font-medium">{s.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link
            to="/image-resizer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold bg-[var(--brand-blue)] text-white shadow-xl shadow-blue-600/20 hover:shadow-blue-600/35 hover:bg-[var(--brand-blue-dark)] active:scale-[0.97] transition-all duration-300 no-underline"
          >
            Make My Image Form-Ready
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-xs text-slate-500 mt-3 flex items-center justify-center gap-1.5">
            <span className="text-amber-500">⚡</span>
            Free · No sign-up · Works on phone
          </p>
        </motion.div>
      </div>
    </section>
  );
}
