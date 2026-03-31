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
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Objectives() {
  const { t } = useLanguage();

  const objectives = [
    {
      icon: BookOpen,
      title: t("تنمية الفكر العلمي", "Foster Scientific Thinking"),
      description: t(
        "تنمية الفكر العلمي في مجال العلاج الطبيعي والعمل على تطويره وتنشيطه",
        "Foster scientific thinking in physical therapy and work towards its development and advancement"
      ),
    },
    {
      icon: Users,
      title: t("التواصل العلمي", "Scientific Communication"),
      description: t(
        "تحقيق التواصل العلمي لأعضاء الجمعية وإتاحة الفرصة للإسهام في التقدم المعرفي",
        "Facilitate scientific communication among members and empower contributions to knowledge advancement"
      ),
    },
    {
      icon: Target,
      title: t("المشورة العلمية", "Scientific Consultation"),
      description: t(
        "تقديم المشورة العلمية وإجراء الدراسات اللازمة لرفع مستوى الأداء",
        "Provide scientific consultation and conduct studies to elevate performance standards"
      ),
    },
    {
      icon: Flag,
      title: t("تطوير الأداء المهني", "Professional Development"),
      description: t(
        "تطوير الأداء العلمي والمهني لممارسي المهنة",
        "Enhance the scientific and professional capabilities of practitioners"
      ),
    },
    {
      icon: Globe,
      title: t("تبادل المعرفة", "Knowledge Exchange"),
      description: t(
        "تيسير تبادل الإنتاج العلمي والرؤى المعرفية بين الهيئات الصحية داخل المملكة وخارجها",
        "Facilitate the exchange of scientific outputs and insights between healthcare institutions within and beyond the Kingdom"
      ),
    },
    {
      icon: Heart,
      title: t("التثقيف الصحي", "Public Health Education"),
      description: t(
        "التثقيف الصحي للمجتمع ورفع مستوى الوعي بالصحة العامة",
        "Promote public health education and raise awareness about community well-being"
      ),
    },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-16" data-aos="fade-up">
          <Flag className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("أهداف الجمعية", "Association Objectives")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "نعمل على تحقيق مجموعة من الأهداف الاستراتيجية لخدمة المهنة والمجتمع",
              "We work to achieve strategic objectives to serve the profession and community"
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
