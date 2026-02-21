"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

import hero1 from "@/assets/hero-1.webp";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const Leadership = () => {
  const { t } = useLanguage();

  const council = [
    {
      name: t("د. أحمد الشهراني", "Dr. Ahmed Al-Shahrani"),
      role: t("رئيس مجلس الإدارة", "Chairman of the Board"),
      image: hero1,
    },
    {
      name: t("د. فاطمة القحطاني", "Dr. Fatima Al-Qahtani"),
      role: t("نائب الرئيس", "Vice Chairman"),
      image: hero2,
    },
    {
      name: t("د. محمد العتيبي", "Dr. Mohammed Al-Otaibi"),
      role: t("أمين عام الجمعية", "Secretary General"),
      image: hero3,
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-accent font-semibold text-lg mb-4 block">
            {t("القيادة", "Leadership")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("المجلس الحالي", "Current Council")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "فريق من القادة المتميزين الملتزمين بتطوير المهنة",
              "A team of distinguished leaders committed to developing the profession"
            )}
          </p>
        </div>

        {/* Council Members Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {council.map((member, index) => (
            <motion.div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {member.name}
              </h3>
              <p className="text-muted-foreground">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;
