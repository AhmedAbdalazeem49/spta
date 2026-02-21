"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Microscope, ArrowRight } from "lucide-react";

export default function Hero() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background gradients & glowing shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary-dark" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-glow/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground mb-6">
              <Microscope className="w-4 h-4" />
              {t("البحث العلمي", "Scientific Research")}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              {t("مركز الأبحاث", "Research Center")}
            </h1>

            <p className="text-xl text-primary-foreground/80 mb-8">
              {t(
                "نسعى لتطوير البحث العلمي في مجال العلاج الطبيعي ودعم الباحثين لتحقيق التميز البحثي في المملكة",
                "We strive to develop scientific research in physical therapy and support researchers to achieve research excellence in the Kingdom"
              )}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" className="gap-2">
                {t("تقديم بحث", "Submit Research")}
                <ArrowRight
                  className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`}
                />
              </Button>
            </div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Rotating circle */}
              <div className="w-80 h-80 mx-auto rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-4 rounded-full border-2 border-dashed border-primary-foreground/20"
                />
                <Microscope className="w-32 h-32 text-primary-foreground" />
              </div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-4 -right-4 bg-card p-4 rounded-xl shadow-lg"
              >
                <span className="text-2xl font-bold text-primary block">
                  250+
                </span>
                <span className="text-sm text-muted-foreground">
                  {t("بحث منشور", "Published")}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -bottom-4 -left-4 bg-card p-4 rounded-xl shadow-lg"
              >
                <span className="text-2xl font-bold text-primary block">
                  50+
                </span>
                <span className="text-sm text-muted-foreground">
                  {t("باحث", "Researchers")}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
