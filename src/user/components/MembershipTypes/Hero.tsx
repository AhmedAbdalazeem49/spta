"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gift, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t, isRTL } = useLanguage();

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
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-accent/20 flex items-center justify-center"
          >
            <Gift className="w-10 h-10 text-accent" />
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t("مميزات العضوية", "Membership Benefits")}
          </h1>

          {/* Description */}
          <p className="text-xl text-white/80 mb-8">
            {t(
              "استمتع بمزايا حصرية وخدمات متميزة كعضو في الجمعية السعودية للعلاج الطبيعي",
              "Enjoy exclusive benefits and premium services as an SPTA member"
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
