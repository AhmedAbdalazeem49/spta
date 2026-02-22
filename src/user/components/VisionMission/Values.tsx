"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Values() {
  const { t } = useLanguage();

  const values = [
    {
      title: t("النزاهة", "Integrity"),
      desc: t(
        "الالتزام بأعلى معايير الأخلاق المهنية",
        "Commitment to the highest professional ethical standards"
      ),
    },
    {
      title: t("التميز", "Excellence"),
      desc: t(
        "السعي الدائم نحو الجودة والتميز",
        "Constant pursuit of quality and excellence"
      ),
    },
    {
      title: t("التعاون", "Collaboration"),
      desc: t("العمل الجماعي وروح الفريق", "Teamwork and team spirit"),
    },
    {
      title: t("الابتكار", "Innovation"),
      desc: t(
        "التطوير المستمر والتفكير الإبداعي",
        "Continuous development and creative thinking"
      ),
    },
    {
      title: t("الاحترام", "Respect"),
      desc: t("احترام الجميع والتنوع", "Respect for all and diversity"),
    },
    {
      title: t("المسؤولية", "Responsibility"),
      desc: t(
        "الالتزام بالمسؤولية تجاه المجتمع",
        "Commitment to social responsibility"
      ),
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("قيمنا", "Our Values")}
            </h2>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="flex items-start gap-4 bg-secondary/30 rounded-xl p-6"
              >
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
