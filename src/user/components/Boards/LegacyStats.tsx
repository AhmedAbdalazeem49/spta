"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LegacyStats() {
  const { t } = useLanguage();

  const stats = [
    { number: "5", label: t("مجالس إدارية", "Board Terms") },
    { number: "25+", label: t("قائد ومسؤول", "Leaders & Officials") },
    { number: "100+", label: t("إنجاز", "Achievements") },
    { number: "15", label: t("عام من التميز", "Years of Excellence") },
  ];

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("إرث من الإنجازات", "A Legacy of Achievements")}
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            {t(
              "على مدار 15 عاماً من العطاء والتميز",
              "Over 15 years of dedication and excellence"
            )}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="text-center"
            >
              <span className="text-5xl md:text-6xl font-bold block mb-2">
                {stat.number}
              </span>
              <span className="text-primary-foreground/70">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
