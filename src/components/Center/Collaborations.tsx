"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Collaborations() {
  const { t } = useLanguage();

  const collaborations = [
    t("جامعة الملك سعود", "King Saud University"),
    t("جامعة الملك عبدالعزيز", "King Abdulaziz University"),
    t("مستشفى الملك فيصل التخصصي", "King Faisal Specialist Hospital"),
    t(
      "الهيئة السعودية للتخصصات الصحية",
      "Saudi Commission for Health Specialties"
    ),
    t("وزارة الصحة", "Ministry of Health"),
    t("جمعيات العلاج الطبيعي الدولية", "International PT Associations"),
  ];

  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("شركاؤنا في البحث", "Our Research Partners")}
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            {t(
              "نتعاون مع أبرز المؤسسات البحثية والأكاديمية في المملكة والعالم",
              "We collaborate with leading research and academic institutions in the Kingdom and worldwide"
            )}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {collaborations.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground font-medium"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
