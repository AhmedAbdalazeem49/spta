import { motion, useScroll, useTransform } from "framer-motion";
import { Award } from "lucide-react";
import Almossa from "@/assets/almossa.png";

export const StrategicPartner = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1.06]);
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden flex items-center justify-center min-h-[50vh]">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-bold tracking-widest uppercase mb-6">
            <Award className="w-4 h-4" />
            Strategic Partner
          </div>
          <div className="w-20 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto rounded-full" />
        </motion.div>

        {/* Logo + Name card */}
        <div className="flex justify-center">
          <motion.div
            style={{ y, scale }}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl px-10 py-12 sm:px-20 sm:py-16 shadow-2xl shadow-blue-900/20 flex flex-col items-center gap-8 overflow-hidden transition-all duration-500"
          >
            {/* Hover shimmer */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Logo circle */}
            <motion.div
              whileHover={{ rotate: 3 }}
              className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-white rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(59,130,246,0.25)] border-4 border-white/20 overflow-hidden transition-all duration-500"
            >
              <img
                src={Almossa}
                alt="Almoosa Health Group"
                className="w-full h-full object-contain p-6"
              />
            </motion.div>

            {/* Name */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight text-center">
              Almoosa Health Group
            </h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
