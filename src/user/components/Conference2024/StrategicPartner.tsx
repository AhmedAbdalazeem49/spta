import { motion, useScroll, useTransform } from "framer-motion";
import { Award } from "lucide-react";
import Almossa from "@/assets/almossa.png";

export const StrategicPartner = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.03]);
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle accent shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#11517E]/4 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#6FC4BC]/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#11517E]/20 bg-[#11517E]/5 text-[#11517E] text-sm font-bold tracking-widest uppercase mb-4">
            <Award className="w-4 h-4 text-[#6FC4BC]" />
            Strategic Partner
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-[#11517E] to-[#6FC4BC] mx-auto rounded-full" />
        </motion.div>

        {/* Logo Card */}
        <div className="flex justify-center">
          <motion.div
            style={{ y, scale }}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-white border border-[#11517E]/10 rounded-3xl px-10 py-12 sm:px-20 sm:py-14 shadow-lg shadow-[#11517E]/8 flex flex-col items-center gap-6 overflow-hidden transition-all duration-500"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#11517E] via-[#6FC4BC] to-[#55AE47]" />

            {/* Hover shimmer */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6FC4BC]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Logo circle */}
            <motion.div
              whileHover={{ rotate: 2 }}
              className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-white rounded-full flex items-center justify-center shadow-md border border-[#11517E]/10 overflow-hidden transition-all duration-500"
            >
              <img
                src={Almossa}
                alt="Almoosa Health Group"
                className="w-full h-full object-contain p-5"
              />
            </motion.div>

            {/* Name */}
            <h3 className="text-2xl sm:text-3xl font-black text-[#11517E] tracking-tight text-center">
              Almoosa Health Group
            </h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
