"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Chart() {
  const { t } = useLanguage();

  // Fake yearly growth data
  const yearlyGrowth = [
    { year: 2018, members: 1200 },
    { year: 2019, members: 1750 },
    { year: 2020, members: 2100 },
    { year: 2021, members: 2800 },
    { year: 2022, members: 3500 },
    { year: 2023, members: 4200 },
  ];

  const maxMembers = Math.max(...yearlyGrowth.map((y) => y.members));

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-accent" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("نمو العضوية", "Membership Growth")}
          </h2>
          <p className="text-muted-foreground">
            {t(
              "تطور أعداد الأعضاء خلال السنوات الأخيرة",
              "Member count growth over recent years"
            )}
          </p>
        </div>

        {/* Chart */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end justify-between gap-4 h-64">
            {yearlyGrowth.map((year, index) => {
              const heightPercentage = (year.members / maxMembers) * 100;
              return (
                <motion.div
                  key={year.year}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="flex-1 flex flex-col items-center"
                >
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${heightPercentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="w-full bg-gradient-to-t from-primary to-accent rounded-t-xl relative group cursor-pointer"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {year.members.toLocaleString()}
                    </div>
                  </motion.div>
                  <span className="mt-4 font-bold text-foreground">
                    {year.year}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
