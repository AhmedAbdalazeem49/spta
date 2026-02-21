"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import hero4 from "@/assets/hero-4.jpg";

export default function Hero() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative min-h-[50vh] flex items-center bg-primary">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={hero4}
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`max-w-3xl ${isRTL ? "text-right" : "text-left"}`}
        >
          <span className="text-primary-foreground/80 font-medium text-lg mb-4 block">
            {t("تواصل معنا", "Contact Us")}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            {t("نحن هنا لمساعدتك", "We Are Here to Help")}
          </h1>
          <p className="text-xl text-primary-foreground/80">
            {t(
              "لا تتردد في التواصل معنا لأي استفسارات أو اقتراحات",
              "Do not hesitate to contact us for any inquiries or suggestions"
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
