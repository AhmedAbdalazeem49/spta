"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Conditions() {
  const { t } = useLanguage();

  const conditions = [
    t("آلام الظهر والرقبة", "Back and Neck Pain"),
    t("إصابات الرياضة", "Sports Injuries"),
    t("ما بعد العمليات الجراحية", "Post-Surgery Recovery"),
    t("السكتة الدماغية", "Stroke"),
    t("التهاب المفاصل", "Arthritis"),
    t("إصابات العمل", "Work Injuries"),
    t("تأخر النمو الحركي", "Motor Development Delay"),
    t("أمراض القلب والرئة", "Heart and Lung Diseases"),
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-accent" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("الحالات التي نعالجها", "Conditions We Treat")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "يمكن للعلاج الطبيعي المساعدة في مجموعة واسعة من الحالات الصحية",
              "Physical therapy can help with a wide range of health conditions"
            )}
          </p>
        </div>

        {/* Conditions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {conditions.map((condition, index) => (
            <motion.div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 50}
              whileHover={{ scale: 1.05 }}
              className="bg-card rounded-xl p-4 border border-border/50 hover:border-primary/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-foreground text-sm font-medium">
                  {condition}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
