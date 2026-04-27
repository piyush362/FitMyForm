import { motion } from "framer-motion";
import ToolCard from "./ToolCard";
import type { ToolCardProps } from "./ToolCard";

const tools: ToolCardProps[] = [
  {
    id: "image-resizer",
    title: "Image Resizer & Compressor",
    description:
      "Resize, crop, and compress photos to exact exam portal requirements — specific dimensions, file size, and format. Supports UPSC, SSC, IBPS, RRB presets.",
    icon: "🖼️",
    route: "/image-resizer",
    gradient: "from-[var(--brand-blue)] to-[var(--brand-blue-light)]",
    iconBg: "bg-blue-50",
    available: true,
    tags: ["JPG", "PNG", "WebP", "Crop", "Compress", "Exam Presets"],
  },
  {
    id: "pdf-tools",
    title: "PDF Tools",
    description:
      "Merge, split, compress, and convert PDF files for application forms. Combine admit cards, certificates, and documents into a single file.",
    icon: "📄",
    route: "/pdf-tools",
    gradient: "from-red-500 to-pink-500",
    iconBg: "bg-red-50",
    available: false,
    tags: ["Merge", "Split", "Compress", "Convert"],
  },
  {
    id: "signature-maker",
    title: "Signature Maker",
    description:
      "Draw or upload your signature and export it in the exact format and size required by exam portals. Transparent background support.",
    icon: "✍️",
    route: "/signature-maker",
    gradient: "from-violet-500 to-purple-500",
    iconBg: "bg-violet-50",
    available: false,
    tags: ["Draw", "Upload", "Transparent BG", "Resize"],
  },
  {
    id: "document-scanner",
    title: "Document Scanner",
    description:
      "Scan and enhance documents using your phone camera. Auto-crop, perspective correction, and convert to clean PDF or image.",
    icon: "📸",
    route: "/document-scanner",
    gradient: "from-[var(--brand-green)] to-emerald-400",
    iconBg: "bg-emerald-50",
    available: false,
    tags: ["Auto-crop", "Enhance", "PDF Export"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
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

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
        >
          {tools.map((tool) => (
            <motion.div key={tool.id} variants={itemVariants}>
              <ToolCard {...tool} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
