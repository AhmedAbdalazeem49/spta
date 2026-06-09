"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function Hero({
  title,
  subtitle,
  buttonText,
  buttonLink = "#",
}: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 bg-gradient-to-br from-primary via-primary/90 to-primary-dark overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <BookOpen className="w-16 h-16 mx-auto mb-6 text-accent" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {title || t("المجلة العلمية", "Scientific Journal")}
          </h1>
          <p className="text-xl text-white/80 mb-8">
            {subtitle ||
              t(
                "منصة النشر العلمي للجمعية السعودية للعلاج الطبيعي",
                "The scientific publishing platform of the Saudi Physical Therapy Association",
              )}
          </p>

          <a
            href="https://www.inkwellinfinite.com/index.php/ijprp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="btn-hero gap-2">
              {buttonText || t("الذهاب إلى صفحة المجلة", "Go to Journal Page")}
              <ExternalLink className="w-5 h-5" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
