"use client";

import { motion } from "framer-motion";
import { History } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 bg-gradient-to-br from-primary via-primary/90 to-primary-dark overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <History className="w-16 h-16 mx-auto mb-6 text-accent" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t("المجالس السابقة", "Previous Boards")}
          </h1>
          <p className="text-xl text-white/80">
            {t(
              "رحلة من الإنجاز والتميز عبر مسيرة الجمعية السعودية للعلاج الطبيعي",
              "A journey of achievement and excellence throughout SPTA's history"
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
