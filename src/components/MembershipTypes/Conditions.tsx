"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Conditions() {
  const { t, isRTL } = useLanguage();

  const generalConditions = [
    t(
      "الالتزام بنظام الجمعية ولوائحها",
      "Commitment to the association's regulations"
    ),
    t("سداد رسوم العضوية السنوية", "Payment of annual membership fees"),
    t(
      "عدم الإساءة لسمعة المهنة أو الجمعية",
      "Not harming the profession's or association's reputation"
    ),
    t(
      "المشاركة الفعالة في أنشطة الجمعية",
      "Active participation in association activities"
    ),
    t("تحديث البيانات بشكل دوري", "Regular data updates"),
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("الشروط العامة للعضوية", "General Membership Conditions")}
            </h2>
            <p className="text-muted-foreground">
              {t(
                "تنطبق هذه الشروط على جميع أنواع العضوية",
                "These conditions apply to all membership types"
              )}
            </p>
          </div>

          {/* Conditions Card */}
          <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm">
            <ul className="space-y-4">
              {generalConditions.map((condition, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 text-foreground"
                >
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {index + 1}
                  </span>
                  {condition}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
