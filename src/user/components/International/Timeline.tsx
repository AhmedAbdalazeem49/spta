"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Timeline() {
  const { t } = useLanguage();

  const timeline = [
    {
      year: "2024",
      event: t(
        "استضافة المؤتمر العالمي للعلاج الطبيعي",
        "Hosting World PT Congress"
      ),
    },
    {
      year: "2022",
      event: t(
        "إطلاق برنامج التبادل الدولي",
        "Launched International Exchange Program"
      ),
    },
    {
      year: "2018",
      event: t(
        "المشاركة في المؤتمر العالمي بجنيف",
        "Participated in World Congress in Geneva"
      ),
    },
    {
      year: "2015",
      event: t(
        "توقيع اتفاقية التعاون مع APTA",
        "Signed cooperation agreement with APTA"
      ),
    },
    {
      year: "2010",
      event: t(
        "استضافة المؤتمر الإقليمي الأول",
        "Hosted First Regional Conference"
      ),
    },
    {
      year: "1995",
      event: t(
        "الانضمام للاتحاد العالمي للعلاج الطبيعي",
        "Joined World Physiotherapy"
      ),
    },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("مسيرتنا الدولية", "Our International Journey")}
          </h2>
        </div>

        {/* Timeline Items */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute start-8 top-0 bottom-0 w-0.5 bg-border" />

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="relative flex items-start gap-8 mb-8 last:mb-0"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg z-10 flex-shrink-0"
              >
                {item.year}
              </motion.div>
              <div className="bg-card rounded-xl p-6 border border-border/50 flex-1 hover:shadow-lg transition-shadow">
                <p className="text-foreground font-medium">{item.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
