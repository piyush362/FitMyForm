import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  gradient: string;
  iconBg: string;
  available: boolean;
  tags: string[];
}

export default function ToolCard({
  title,
  description,
  icon,
  route,
  gradient,
  iconBg,
  available,
  tags,
}: ToolCardProps) {
  const content = (
    <motion.div
      whileHover={available ? { y: -6, scale: 1.02 } : {}}
      whileTap={available ? { scale: 0.98 } : {}}
      className={`
        relative group rounded-2xl overflow-hidden
        bg-white border border-slate-200
        shadow-sm
        transition-all duration-300
        ${
          available
            ? "hover:border-[var(--brand-blue)]/30 hover:shadow-xl hover:shadow-blue-500/8 cursor-pointer"
            : "opacity-60 cursor-not-allowed"
        }
      `}
    >
      {/* Top gradient bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

      <div className="p-6 sm:p-7">
        {/* Icon */}
        <div
          className={`
            w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5
            ${iconBg}
            ${available ? "group-hover:scale-110 group-hover:rotate-3" : ""}
            transition-transform duration-300
          `}
        >
          {icon}
        </div>

        {/* Title & Status */}
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          {!available && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-500">
              Coming Soon
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-5">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        {available ? (
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--brand-blue)] group-hover:gap-3 transition-all duration-300">
            <span>Open Tool</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">
            We're working on this — stay tuned!
          </p>
        )}
      </div>
    </motion.div>
  );

  if (available) {
    return (
      <Link to={route} className="no-underline block">
        {content}
      </Link>
    );
  }

  return content;
}
