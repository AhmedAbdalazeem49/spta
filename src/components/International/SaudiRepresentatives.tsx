"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SaudiRepresentatives() {
  const { t } = useLanguage();

  const representatives = [
    {
      name: t("د. أحمد محمد العمري", "Dr. Ahmed Mohammed Al-Omari"),
      role: t(
        "المندوب الرئيسي للاتحاد العالمي",
        "Chief Delegate to World Physiotherapy"
      ),
      period: "2020 - Present",
    },
    {
      name: t("د. فاطمة عبدالله الشمري", "Dr. Fatima Abdullah Al-Shammari"),
      role: t(
        "عضو اللجنة العلمية الدولية",
        "International Scientific Committee Member"
      ),
      period: "2021 - Present",
    },
    {
      name: t("د. خالد سعود القحطاني", "Dr. Khaled Saud Al-Qahtani"),
      role: t("منسق البرامج الدولية", "International Programs Coordinator"),
      period: "2022 - Present",
    },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("ممثلو المملكة الدوليون", "Saudi International Representatives")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "يمثل هؤلاء الأعضاء المملكة العربية السعودية في المحافل الدولية",
              "These members represent Saudi Arabia in international forums"
            )}
          </p>
        </div>

        {/* Representatives Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {representatives.map((rep, index) => (
            <motion.div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              whileHover={{ y: -10 }}
              className="bg-card rounded-2xl p-8 text-center border border-border/50 hover:shadow-xl transition-all"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {rep.name}
              </h3>
              <p className="text-primary text-sm mb-2">{rep.role}</p>
              <span className="text-muted-foreground text-sm">
                {rep.period}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
