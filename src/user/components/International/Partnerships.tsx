"use client";

import React from "react";
import { motion } from "framer-motion";
import { Handshake, Building2, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Partnerships() {
  const { t } = useLanguage();

  const partnerships = [
    {
      name: t(
        "جمعية العلاج الطبيعي الأمريكية",
        "American Physical Therapy Association"
      ),
      type: t("شراكة تعليمية", "Educational Partnership"),
      since: "2018",
    },
    {
      name: t(
        "الجمعية الأوروبية للعلاج الطبيعي",
        "European Physiotherapy Association"
      ),
      type: t("تبادل خبرات", "Knowledge Exchange"),
      since: "2019",
    },
    {
      name: t(
        "جمعية العلاج الطبيعي البريطانية",
        "Chartered Society of Physiotherapy UK"
      ),
      type: t("برامج تدريبية", "Training Programs"),
      since: "2020",
    },
    {
      name: t(
        "الاتحاد الآسيوي للعلاج الطبيعي",
        "Asian Confederation for Physical Therapy"
      ),
      type: t("تعاون إقليمي", "Regional Cooperation"),
      since: "2017",
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <Handshake className="w-12 h-12 mx-auto mb-4 text-accent" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("شراكاتنا الدولية", "Our International Partnerships")}
          </h2>
        </div>

        {/* Partnership Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {partnerships.map((partner, index) => (
            <motion.div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all flex items-center gap-6"
            >
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground mb-1">
                  {partner.name}
                </h3>
                <p className="text-primary text-sm mb-1">{partner.type}</p>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {t("منذ", "Since")} {partner.since}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
