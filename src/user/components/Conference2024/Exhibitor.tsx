import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import KingSaudUni from "@/assets/kingsaud.webp";

export const Exhibitor = () => {
  return (
    <section className="relative overflow-hidden bg-[#11517E]/3 py-16 sm:py-20">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#6FC4BC10_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#6FC4BC]/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#6FC4BC]/30 to-transparent" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#11517E]/20 bg-white px-5 py-2 text-sm font-bold tracking-widest text-[#11517E] uppercase shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#6FC4BC]" />
            Founding Partner
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-[#11517E] to-[#6FC4BC] mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Logo + Name */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto flex max-w-sm flex-col items-center"
        >
          {/* Card */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#11517E]/10 flex flex-col items-center gap-4 relative overflow-hidden group hover:shadow-xl transition-all">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#11517E] via-[#6FC4BC] to-[#55AE47]" />

            {/* Logo */}
            <div className="flex h-44 w-44 items-center justify-center">
              <img
                src={KingSaudUni}
                alt="King Saud University"
                className="h-full w-full object-contain"
              />
            </div>

            {/* Name */}
            <div className="text-center">
              <h2 className="text-xl font-black tracking-tight text-[#11517E] sm:text-2xl">
                King Saud University
              </h2>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
