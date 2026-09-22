import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import KingSaudUni from "@/assets/king-saud-uni.png";

export const Exhibitor = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/10 border border-yellow-200 dark:border-yellow-700/50 text-yellow-800 dark:text-yellow-400 font-bold tracking-wide uppercase text-sm mb-4"
          >
            <Sparkles className="w-4 h-4" />
            Institutional / Foundation Partner
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl md:rounded-[3rem] p-6 sm:p-8 md:p-14 border-4 border-white dark:border-gray-700 shadow-2xl flex flex-col lg:flex-row items-center gap-6 sm:gap-10 lg:gap-16 relative"
        >
          <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 shrink-0 relative group">
            <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-3xl group-hover:bg-yellow-400/40 transition-colors duration-500"></div>

            <div className="relative w-full h-full bg-primary dark:bg-gray-900 rounded-full shadow-2xl border-8 border-gray-50 dark:border-gray-800 flex items-center justify-center p-8 transform group-hover:scale-105 transition-transform duration-500 overflow-hidden">
              <img
                src={KingSaudUni}
                alt="King Saud University"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              A Legacy of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-400">
                Excellence
              </span>{" "}
              & Innovation
            </h2>
            <div className="w-24 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mb-8 mx-auto lg:mx-0"></div>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              King Saud University is the first university in Saudi Arabia,
              established in 1957. It is a pioneer in higher education and
              scientific research, aiming to build a knowledge society through
              its distinguished academic and research programs. The university
              is proud to partner with this conference as part of its commitment
              to continuous development and innovation in the healthcare sector.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
