"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 bg-gradient-to-br from-primary via-primary/90 to-primary-dark overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Icon */}
          <Users className="w-16 h-16 mx-auto mb-6 text-accent" />

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t("إحصائيات الأعضاء", "Members Statistics")}
          </h1>

          {/* Description */}
          <p className="text-xl text-white/80">
            {t(
              "نفخر بمجتمعنا المتنامي من المتخصصين في العلاج الطبيعي",
              "We are proud of our growing community of PT specialists"
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
