"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Flag,
  BookOpen,
  Target,
  Users,
  Globe,
  Heart,
  Lightbulb,
  Award,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Objectives() {
  const { t } = useLanguage();

  const objectives = [
    {
      icon: BookOpen,
      title: t("التعليم المستمر", "Continuing Education"),
      description: t(
        "توفير برامج تعليم مستمر عالية الجودة للممارسين",
        "Provide high-quality continuing education programs for practitioners"
      ),
    },
    {
      icon: Target,
      title: t("تطوير المهنة", "Professional Development"),
      description: t(
        "رفع مستوى الممارسة المهنية وتطوير الكفاءات",
        "Elevate professional practice and develop competencies"
      ),
    },
    {
      icon: Users,
      title: t("بناء المجتمع", "Community Building"),
      description: t(
        "خلق مجتمع مهني متماسك ومتعاون",
        "Create a cohesive and collaborative professional community"
      ),
    },
    {
      icon: Globe,
      title: t("التمثيل الدولي", "International Representation"),
      description: t(
        "تمثيل المهنة في المحافل الدولية والإقليمية",
        "Represent the profession in international and regional forums"
      ),
    },
    {
      icon: Heart,
      title: t("خدمة المجتمع", "Community Service"),
      description: t(
        "المساهمة في تحسين صحة المجتمع من خلال التوعية",
        "Contribute to improving community health through awareness"
      ),
    },
    {
      icon: Lightbulb,
      title: t("الابتكار والبحث", "Innovation & Research"),
      description: t(
        "تشجيع البحث العلمي والابتكار في مجال العلاج الطبيعي",
        "Encourage scientific research and innovation in physical therapy"
      ),
    },
    {
      icon: Award,
      title: t("الجودة والتميز", "Quality & Excellence"),
      description: t(
        "السعي نحو التميز في جميع الخدمات والبرامج المقدمة",
        "Strive for excellence in all services and programs offered"
      ),
    },
    {
      icon: Flag,
      title: t("رؤية 2030", "Vision 2030"),
      description: t(
        "المساهمة في تحقيق أهداف رؤية المملكة 2030 الصحية",
        "Contribute to achieving Saudi Vision 2030 health objectives"
      ),
    },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <Flag className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("أهدافنا الاستراتيجية", "Our Strategic Objectives")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "نعمل على تحقيق مجموعة من الأهداف الاستراتيجية لخدمة المهنة والمجتمع",
              "We work to achieve a set of strategic objectives to serve the profession and community"
            )}
          </p>
        </div>

        {/* Objective Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {objectives.map((objective, index) => (
            <motion.div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              whileHover={{ y: -10 }}
              className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-xl transition-all group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                <objective.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
              </motion.div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {objective.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {objective.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
