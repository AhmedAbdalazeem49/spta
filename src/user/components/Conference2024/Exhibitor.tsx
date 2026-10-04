import { motion } from "framer-motion";
import { BrandPattern } from "./BrandPattern";
import { Sparkles } from "lucide-react";
import KingSaudUni from "@/assets/kingsaud.webp";

export const Exhibitor = () => {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 dark:bg-gray-950">
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold tracking-wide text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
            <Sparkles className="h-3.5 w-3.5" />
            Founding Partner
          </div>
        </motion.div>

        {/* Logo + Name */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto flex max-w-md flex-col items-center"
        >
          {/* Logo */}
          <div className="flex h-52 w-52 items-center justify-center sm:h-64 sm:w-64">
            <img
              src={KingSaudUni}
              alt="King Saud University"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Name */}
          <div className="text-center">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl dark:text-white">
              King Saud University
            </h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
