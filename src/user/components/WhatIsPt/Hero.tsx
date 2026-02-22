"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 bg-gradient-to-br from-primary via-primary/90 to-primary-dark overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-accent/20 flex items-center justify-center"
          >
            <Stethoscope className="w-12 h-12 text-accent" />
          </motion.div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t("ما هو العلاج الطبيعي؟", "What is Physical Therapy?")}
          </h1>

          {/* Description */}
          <p className="text-xl text-white/80 leading-relaxed">
            {t(
              "اكتشف كيف يمكن للعلاج الطبيعي أن يحسن حياتك ويساعدك على استعادة صحتك وحركتك",
              "Discover how physical therapy can improve your life and help you regain your health and mobility"
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
