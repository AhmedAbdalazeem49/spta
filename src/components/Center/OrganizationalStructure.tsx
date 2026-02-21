"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { GraduationCap, Users, Building2, Handshake } from "lucide-react";

export default function OrganizationalStructure() {
  const { t } = useLanguage();

  const organizationalStructure = [
    {
      title: t("مدير المركز", "Center Director"),
      description: t(
        "الإشراف العام على أنشطة المركز البحثية",
        "Overall supervision of center research activities"
      ),
      icon: GraduationCap,
    },
    {
      title: t("لجنة المراجعة العلمية", "Scientific Review Committee"),
      description: t(
        "مراجعة وتقييم المقترحات البحثية",
        "Review and evaluation of research proposals"
      ),
      icon: Users,
    },
    {
      title: t("وحدة الدعم البحثي", "Research Support Unit"),
      description: t(
        "تقديم الدعم الإحصائي والتقني للباحثين",
        "Providing statistical and technical support to researchers"
      ),
      icon: Building2,
    },
    {
      title: t("وحدة الشراكات", "Partnerships Unit"),
      description: t(
        "تنسيق التعاون مع المؤسسات البحثية",
        "Coordinating collaboration with research institutions"
      ),
      icon: Handshake,
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-accent font-semibold text-lg mb-4 block">
            {t("الهيكل التنظيمي", "Organizational Structure")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t("فريق العمل", "Our Team")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {organizationalStructure.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -5 }}
                className="bg-card rounded-xl p-6 shadow-md border border-border/50 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
