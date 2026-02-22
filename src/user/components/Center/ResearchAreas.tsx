"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Microscope, BookOpen, TrendingUp, Globe } from "lucide-react";

export default function ResearchAreas() {
  const { t } = useLanguage();

  const researchAreas = [
    {
      icon: Microscope,
      title: t("البحث السريري", "Clinical Research"),
      description: t(
        "أبحاث تطبيقية لتحسين نتائج العلاج وتطوير البروتوكولات السريرية",
        "Applied research to improve treatment outcomes and develop clinical protocols"
      ),
    },
    {
      icon: BookOpen,
      title: t("البحث التعليمي", "Educational Research"),
      description: t(
        "تطوير مناهج وأساليب تعليم العلاج الطبيعي",
        "Developing curricula and teaching methods in physical therapy"
      ),
    },
    {
      icon: TrendingUp,
      title: t("بحوث النتائج", "Outcomes Research"),
      description: t(
        "قياس فعالية التدخلات العلاجية وجودة الرعاية",
        "Measuring effectiveness of therapeutic interventions and quality of care"
      ),
    },
    {
      icon: Globe,
      title: t("الصحة العامة", "Public Health"),
      description: t(
        "أبحاث الوقاية وتعزيز الصحة المجتمعية",
        "Prevention research and community health promotion"
      ),
    },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-accent font-semibold text-lg mb-4 block">
            {t("أهمية البحث", "Why Research Matters")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t(
              "البحث العلمي في السياق السعودي",
              "Scientific Research in the Saudi Context"
            )}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t(
              "يلعب البحث العلمي دوراً محورياً في تحقيق رؤية المملكة 2030 وتطوير قطاع الرعاية الصحية",
              "Scientific research plays a pivotal role in achieving Saudi Vision 2030 and developing the healthcare sector"
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {researchAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-card rounded-2xl p-8 shadow-md border border-border/50 text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {area.title}
                </h3>
                <p className="text-muted-foreground">{area.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
