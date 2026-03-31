"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users, Crown, Shield, Landmark } from "lucide-react";

const Leadership = () => {
  const { t } = useLanguage();

  const boardMembers = [
    {
      name: t("د. عبدالفتاح سعيد القحطاني", "Dr. Abdulfattah Saeed Al-Qahtani"),
      role: t("رئيس مجلس الإدارة", "Chairman of the Board"),
      icon: Crown,
    },
    {
      name: t("أ. محمد إسماعيل منشي", "Mr. Mohammed Ismail Menshi"),
      role: t("نائب الرئيس", "Vice Chairman"),
      icon: Shield,
    },
    {
      name: t("أ. شريفة عبدالله آل معلوي", "Ms. Shareefa Abdullah Al Maalawi"),
      role: t("أمين مجلس الجمعية", "Board Secretary"),
      icon: Landmark,
    },
    {
      name: t("أ. أنبات أحمد مجرشي", "Ms. Anbat Ahmed Mujarshi"),
      role: t("أمين مال الجمعية", "Treasurer"),
      icon: Landmark,
    },
  ];

  const boardDirectors = [
    t("د. فيصل خالد الحذيفي", "Dr. Faisal Khaled Al-Huthaifi"),
    t("د. آلاء محمد البيشي", "Dr. Alaa Mohammed Al-Bishi"),
    t("د. رشا منصور الغفيلي", "Dr. Rasha Mansour Al-Ghufaili"),
    t("أ. محمد علي المويسي", "Mr. Mohammed Ali Al-Muwaisi"),
    t("أ. ملك فايز الرويلي", "Ms. Malak Fayez Al-Ruwaili"),
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
            {t("أعضاء مجلس الإدارة", "Board of Directors")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "فريق من القادة المتميزين الملتزمين بتطوير مهنة العلاج الطبيعي في المملكة",
              "A team of distinguished leaders committed to advancing the physical therapy profession in Saudi Arabia"
            )}
          </p>
        </div>

        {/* Board Officers */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {boardMembers.map((member, index) => (
            <motion.div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="group"
            >
              <div className="bg-card rounded-2xl p-6 shadow-md card-hover text-center border border-border/50">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <member.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Board Directors */}
        <div data-aos="fade-up">
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">
            {t("أعضاء المجلس", "Board Members")}
          </h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {boardDirectors.map((name, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                whileHover={{ y: -5 }}
                className="bg-secondary/50 rounded-xl p-4 text-center"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <p className="text-foreground font-medium text-sm">{name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;
