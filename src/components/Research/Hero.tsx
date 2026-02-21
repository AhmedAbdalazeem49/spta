"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import hero3 from "@/assets/hero-3.jpg";

export default function Hero() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative min-h-[60vh] flex items-center bg-primary">
      {/* Background Image & Gradient */}
      <div className="absolute inset-0">
        <img
          src={hero3}
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />
      </div>

      {/* Hero Content */}
      <div className="container-custom relative z-10 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`max-w-3xl ${isRTL ? "text-right" : "text-left"}`}
        >
          <span className="text-primary-foreground/80 font-medium text-lg mb-4 block">
            {t("البحث والتعليم", "Research & Education")}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            {t("أدوات البحث العلمي", "Scientific Research Tools")}
          </h1>
          <p className="text-xl text-primary-foreground/80">
            {t(
              "مجموعة شاملة من الأدوات والموارد لدعم بحثك العلمي والممارسة المبنية على الأدلة",
              "A comprehensive set of tools and resources to support your scientific research and evidence-based practice"
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
