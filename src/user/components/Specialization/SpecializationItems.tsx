"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  Activity,
  Baby,
  Bone,
  Brain,
  ChevronRight,
  Dumbbell,
  Heart,
  Sparkles,
  Users,
  Stethoscope,
  Zap,
  Eye,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function SpecializationItems() {
  const { t, isRTL } = useLanguage();

  const specializations = [
    {
      id: "cardio",
      icon: Heart,
      title: t("القلب والجهاز التنفسي", "Cardiopulmonary"),
      leader: t("د. رشا منصور الغفيلي", "Dr. Rasha Mansour Al-Ghufaili"),
      color: "from-red-500 to-rose-600",
    },
    {
      id: "neuro",
      icon: Brain,
      title: t("الأعصاب", "Neurology"),
      leader: t("د. مشعل محمد الديحان", "Dr. Mishal Mohammed Al-Daihan"),
      color: "from-purple-500 to-indigo-600",
    },
    {
      id: "women",
      icon: Users,
      title: t("صحة المرأة", "Women's Health"),
      leader: t("د. غادة محمد القديري", "Dr. Ghada Mohammed Al-Qudairi"),
      color: "from-pink-500 to-fuchsia-600",
    },
    {
      id: "ortho",
      icon: Bone,
      title: t("العظام", "Orthopedics"),
      leader: t("د. علي متعب الشامي", "Dr. Ali Mutaib Al-Shami"),
      color: "from-orange-500 to-amber-600",
    },
    {
      id: "sports",
      icon: Dumbbell,
      title: t("الطب الرياضي", "Sports Medicine"),
      leader: t("د. مساعد محمد الزهراني", "Dr. Musaad Mohammed Al-Zahrani"),
      color: "from-emerald-500 to-green-600",
    },
    {
      id: "oncology",
      icon: Activity,
      title: t("الأورام", "Oncology"),
      leader: t("د. نوف محمد الضويان", "Dr. Nouf Mohammed Al-Dhuwayan"),
      color: "from-cyan-500 to-teal-600",
    },
    {
      id: "lymphedema",
      icon: Stethoscope,
      title: t("المجموعة السعودية للوذمة اللمفاوية", "Saudi Lymphedema Group"),
      leader: t("د. أسماء عبداللطيف الدرع", "Dr. Asma Abdullatif Al-Dara"),
      color: "from-violet-500 to-purple-600",
    },
    {
      id: "pediatric",
      icon: Baby,
      title: t("الأطفال", "Pediatrics"),
      leader: t("د. مشاري صالح الغدير", "Dr. Mishari Saleh Al-Ghadeer"),
      color: "from-sky-500 to-blue-600",
    },
    {
      id: "pain",
      icon: Zap,
      title: t("علم الألم", "Pain Science"),
      leader: t("د. فارس عبدالله العضيبي", "Dr. Faris Abdullah Al-Adhaibi"),
      color: "from-amber-500 to-yellow-600",
    },
    {
      id: "electro",
      icon: Eye,
      title: t("الالكترو", "Electrotherapy"),
      leader: t("أ.د. سامي العبدالوهاب", "Prof. Sami Al-Abdulwahab"),
      color: "from-indigo-500 to-blue-700",
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("المجموعات التخصصية", "Specialty Groups")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "تضم الجمعية عشر مجموعات تخصصية يقودها نخبة من المتخصصين",
              "SPTA comprises ten specialty groups led by elite specialists"
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specializations.map((spec, index) => (
            <motion.div
              key={spec.id}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              whileHover={{ y: -8 }}
              className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 shadow-md transition-all group"
            >
              <div className="p-6 flex items-start gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${spec.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                >
                  <spec.icon className="w-7 h-7 text-white" />
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {spec.title}
                  </h3>
                  <p className="text-muted-foreground text-sm flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-accent" />
                    {spec.leader}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Student Union */}
        <motion.div
          data-aos="fade-up"
          className="mt-12 bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 text-primary-foreground text-center"
        >
          <h3 className="text-2xl font-bold mb-2">
            {t("اتحاد طلبة العلاج الطبيعي", "Physical Therapy Students' Union")}
          </h3>
          <p className="text-primary-foreground/80">
            {t(
              "اتحاد طلبة العلاج الطبيعي بالجمعية السعودية للعلاج الطبيعي",
              "The Physical Therapy Students' Union of SPTA"
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
