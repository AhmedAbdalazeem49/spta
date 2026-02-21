"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Partners() {
  const { t } = useLanguage();

  const partners = [
    {
      name: t("المستشفيات الحكومية", "Government Hospitals"),
      discount: "20%",
    },
    {
      name: t("مراكز العلاج الطبيعي", "PT Centers"),
      discount: "30%",
    },
    {
      name: t("المعاهد التدريبية", "Training Institutes"),
      discount: "25%",
    },
    {
      name: t("المكتبات العلمية", "Scientific Libraries"),
      discount: "15%",
    },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="text-accent font-semibold text-lg mb-4 block">
            {t("شركاؤنا", "Our Partners")}
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("خصومات الشركاء", "Partner Discounts")}
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "استفد من خصومات حصرية مع شركائنا الاستراتيجيين",
              "Enjoy exclusive discounts with our strategic partners"
            )}
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-card rounded-2xl p-6 text-center border border-border/50 hover:shadow-lg transition-all duration-300"
            >
              <Building2 className="w-12 h-12 mx-auto mb-4 text-primary" />

              <h3 className="font-bold text-foreground mb-2">{partner.name}</h3>

              <span className="text-2xl font-bold text-accent">
                {partner.discount}
              </span>

              <p className="text-sm text-muted-foreground">
                {t("خصم", "discount")}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
