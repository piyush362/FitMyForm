import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ToolsGrid() {
  return (
    <section id="tools" className="relative py-16 sm:py-20 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            All Tools, <span className="text-[var(--brand-blue)]">One Place</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Everything you need to prepare your government exam form documents.
            No sign-ups, no uploads to servers — everything runs locally.
          </p>
        </motion.div>

        {/* Grid — 2 cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
        >
          {/* Card 1 — Image Resizer */}
          <motion.div variants={itemVariants}>
            <Link to="/image-resizer" className="no-underline block">
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:border-[var(--brand-blue)]/30 hover:shadow-xl hover:shadow-blue-500/8 transition-all duration-300 cursor-pointer"
              >
                <div className="h-1.5 w-full bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-blue-light)]" />
                <div className="p-6 sm:p-7">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 bg-blue-50 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    🖼️
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    Image Resizer & Compressor
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    Resize, crop, and compress photos to exact exam portal
                    requirements — specific dimensions, file size, and format.
                    Supports UPSC, SSC, IBPS, RRB presets.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {["JPG", "PNG", "WebP", "Crop", "Compress", "Exam Presets"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--brand-blue)] group-hover:gap-3 transition-all duration-300">
                    <span>Open Tool</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Card 2 — More Tools Coming Soon */}
          <motion.div variants={itemVariants}>
            <div className="relative rounded-2xl overflow-hidden bg-white border border-dashed border-slate-300 h-full flex flex-col items-center justify-center text-center p-8 sm:p-10">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 bg-slate-100">
                🚀
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                More Tools Coming Soon
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs mb-5">
                PDF merge & compress, signature maker, document scanner, and
                more — we're building tools for every step of your exam
                application.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["PDF Tools", "Signature Maker", "Doc Scanner"].map((label) => (
                  <span
                    key={label}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
