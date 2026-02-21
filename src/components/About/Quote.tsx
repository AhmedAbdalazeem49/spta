"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote as QuoteIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Quote = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container-custom">
        <motion.div
          data-aos="fade-up"
          className="max-w-4xl mx-auto text-center"
        >
          <QuoteIcon className="w-16 h-16 mx-auto mb-8 opacity-50" />
          <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-8">
            {t(
              "نؤمن بأن العلاج الطبيعي هو ركيزة أساسية في منظومة الرعاية الصحية، ونعمل جاهدين لتحقيق رؤية المملكة 2030 في قطاع الصحة.",
              "We believe that physical therapy is a fundamental pillar of the healthcare system, and we work diligently to achieve the Kingdom Vision 2030 in the health sector."
            )}
          </p>
          <div>
            <p className="font-bold text-lg">
              {t("د. أحمد الشهراني", "Dr. Ahmed Al-Shahrani")}
            </p>
            <p className="text-primary-foreground/80">
              {t("رئيس مجلس الإدارة", "Chairman of the Board")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Quote;
