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
      name: t("المجلس الصحي السعودي", "Saudi Health Council"),
      type: t("حكومي", "Government"),
    },
    {
      name: t("وزارة الصحة", "Ministry of Health"),
      type: t("حكومي", "Government"),
    },
    {
      name: t("World Physiotherapy", "World Physiotherapy"),
      type: t("دولي", "International"),
    },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-accent font-semibold text-lg mb-4 block">
            {t("التمثيل والشراكات", "Representation & Partnerships")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("الشراكات والتعاون", "Partnerships & Collaboration")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "للجمعية مقعد في المجلس الصحي السعودي وتمثيل عالمي في World Physiotherapy",
              "SPTA holds a seat in the Saudi Health Council and has international representation in World Physiotherapy"
            )}
          </p>
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
