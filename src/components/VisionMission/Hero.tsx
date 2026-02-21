"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles } from "lucide-react";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 bg-gradient-to-br from-primary via-primary/90 to-primary-dark overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        {/* Pattern circles */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="absolute w-32 h-32 border border-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto"
        >
          <Sparkles className="w-16 h-16 mx-auto mb-6 text-accent" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t("الرؤية والرسالة والأهداف", "Vision, Mission & Objectives")}
          </h1>
          <p className="text-xl text-white/80">
            {t(
              "نسعى لتطوير مهنة العلاج الطبيعي وتحقيق التميز في خدمة المجتمع",
              "We strive to develop the PT profession and achieve excellence in serving the community"
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
