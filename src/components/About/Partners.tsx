"use client";

import React from "react";
import { motion } from "framer-motion";
import { Handshake } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Partners = () => {
  const { t } = useLanguage();

  const partners = [
    {
      name: t("جامعة الملك سعود", "King Saud University"),
      type: t("أكاديمي", "Academic"),
    },
    {
      name: t("وزارة الصحة", "Ministry of Health"),
      type: t("حكومي", "Government"),
    },
    {
      name: t(
        "الهيئة السعودية للتخصصات الصحية",
        "Saudi Commission for Health Specialties"
      ),
      type: t("تنظيمي", "Regulatory"),
    },
    {
      name: t("الاتحاد العالمي للعلاج الطبيعي", "World Physiotherapy"),
      type: t("دولي", "International"),
    },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-accent font-semibold text-lg mb-4 block">
            {t("شركاؤنا", "Our Partners")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("الشراكات والتعاون", "Partnerships & Collaboration")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              whileHover={{ y: -5 }}
              className="bg-card rounded-xl p-6 text-center shadow-sm card-hover"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Handshake className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{partner.name}</h3>
              <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                {partner.type}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
