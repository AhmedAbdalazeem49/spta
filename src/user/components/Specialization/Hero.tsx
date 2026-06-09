"use client";

import React from "react";
import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 bg-gradient-to-br from-primary via-primary/90 to-primary-dark overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: -20 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 opacity-10"
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </motion.div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <Stethoscope className="w-16 h-16 mx-auto mb-6 text-accent" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t("المجموعات التخصصية", "Specializations")}
          </h1>
          <p className="text-xl text-white/80">
            {t(
              "تعرف على المجموعات التخصصية المختلفة في مجال العلاج الطبيعي ومجالات العمل المتاحة",
              "Learn about different specializations in physical therapy and available work areas"
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
