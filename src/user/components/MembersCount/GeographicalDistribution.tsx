"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function GeographicalDistribution() {
  const { t } = useLanguage();

  // Self-contained data
  const regions = [
    { name: t("الرياض", "Riyadh"), count: 1850, percentage: 35 },
    { name: t("جدة", "Jeddah"), count: 1200, percentage: 23 },
    { name: t("الدمام", "Dammam"), count: 850, percentage: 16 },
    { name: t("مكة المكرمة", "Makkah"), count: 450, percentage: 9 },
    { name: t("المدينة المنورة", "Madinah"), count: 384, percentage: 7 },
    { name: t("مناطق أخرى", "Other Regions"), count: 500, percentage: 10 },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("التوزيع الجغرافي", "Geographic Distribution")}
          </h2>
          <p className="text-muted-foreground">
            {t(
              "انتشار أعضائنا في مختلف مناطق المملكة",
              "Our members across Saudi Arabia regions"
            )}
          </p>
        </div>

        {/* Regions List */}
        <div className="max-w-3xl mx-auto space-y-6">
          {regions.map((region, index) => (
            <motion.div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              className="bg-card rounded-xl p-6 border border-border/50"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-foreground">{region.name}</span>
                <span className="text-primary font-bold">
                  {region.count.toLocaleString()}
                </span>
              </div>
              <div className="h-4 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${region.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
              <span className="text-sm text-muted-foreground mt-2 block">
                {region.percentage}%{" "}
                {t("من إجمالي الأعضاء", "of total members")}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
