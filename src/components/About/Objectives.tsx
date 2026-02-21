"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Objectives = () => {
  const { t } = useLanguage();

  const objectives = [
    t(
      "تطوير مهنة العلاج الطبيعي في المملكة العربية السعودية",
      "Develop the physical therapy profession in Saudi Arabia"
    ),
    t(
      "تعزيز البحث العلمي والممارسة المبنية على الأدلة",
      "Promote scientific research and evidence-based practice"
    ),
    t(
      "توفير فرص التعليم المستمر للممارسين",
      "Provide continuing education opportunities for practitioners"
    ),
    t(
      "بناء شراكات محلية وعالمية استراتيجية",
      "Build strategic local and international partnerships"
    ),
    t(
      "رفع مستوى الوعي بأهمية العلاج الطبيعي",
      "Raise awareness about the importance of physical therapy"
    ),
    t("دعم الكوادر الوطنية المتخصصة", "Support specialized national cadres"),
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-accent font-semibold text-lg mb-4 block">
            {t("أهدافنا", "Our Goals")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t("نسعى لتحقيق", "We Strive to Achieve")}
          </h2>
        </div>

        {/* Objectives Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectives.map((objective, index) => (
            <motion.div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              whileHover={{ scale: 1.02 }}
              className="flex items-start gap-4 bg-card rounded-xl p-6 shadow-sm card-hover"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <p className="text-foreground font-medium">{objective}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Objectives;
