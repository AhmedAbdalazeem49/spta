"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 bg-primary">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-primary-foreground/80 font-medium text-lg mb-4 block">
            {t("المجلة العلمية", "Scientific Journal")}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            {t("آخر الأخبار والمقالات", "Latest News & Articles")}
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            {t(
              "تابع أحدث الأخبار والفعاليات والمقالات العلمية في مجال العلاج الطبيعي",
              "Follow the latest news, events, and scientific articles in physical therapy"
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
