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
      desc: t(
        "تخصص يهتم بصحة القلب والرئتين وتحسين كفاءة التنفس.",
        "Focuses on heart and lung health and improving breathing efficiency."
      ),
      color: "from-red-500 to-rose-600",
    },
    {
      id: "neuro",
      icon: Brain,
      title: t("الأعصاب", "Neurology"),
      leader: t("د. مشعل محمد الديحان", "Dr. Mishal Mohammed Al-Daihan"),
      desc: t(
        "يعالج اضطرابات الجهاز العصبي وتحسين الحركة والتوازن.",
        "Treats nervous system disorders and improves mobility and balance."
      ),
      color: "from-purple-500 to-indigo-600",
    },
    {
      id: "women",
      icon: Users,
      title: t("صحة المرأة", "Women's Health"),
      leader: t("د. غادة محمد القديري", "Dr. Ghada Mohammed Al-Qudairi"),
      desc: t(
        "رعاية متخصصة لصحة المرأة في مختلف المراحل.",
        "Specialized care for women’s health across all stages."
      ),
      color: "from-pink-500 to-fuchsia-600",
    },
    {
      id: "ortho",
      icon: Bone,
      title: t("العظام", "Orthopedics"),
      leader: t("د. علي متعب الشامي", "Dr. Ali Mutaib Al-Shami"),
      desc: t(
        "علاج إصابات العظام والمفاصل وإعادة التأهيل.",
        "Treats bone and joint injuries with rehabilitation."
      ),
      color: "from-orange-500 to-amber-600",
    },
    {
      id: "sports",
      icon: Dumbbell,
      title: t("الطب الرياضي", "Sports Medicine"),
      leader: t("د. مساعد محمد الزهراني", "Dr. Musaad Mohammed Al-Zahrani"),
      desc: t(
        "تأهيل الرياضيين وتحسين الأداء البدني.",
        "Rehabilitates athletes and enhances performance."
      ),
      color: "from-emerald-500 to-green-600",
    },
    {
      id: "oncology",
      icon: Activity,
      title: t("الأورام", "Oncology"),
      leader: t("د. نوف محمد الضويان", "Dr. Nouf Mohammed Al-Dhuwayan"),
      desc: t(
        "دعم وتأهيل مرضى الأورام لتحسين جودة الحياة.",
        "Supports cancer patients to improve quality of life."
      ),
      color: "from-cyan-500 to-teal-600",
    },
    {
      id: "lymphedema",
      icon: Stethoscope,
      title: t("المجموعة السعودية للوذمة اللمفاوية", "Saudi Lymphedema Group"),
      leader: t("د. أسماء عبداللطيف الدرع", "Dr. Asma Abdullatif Al-Dara"),
      desc: t(
        "تشخيص وعلاج الوذمة اللمفاوية بطرق متقدمة.",
        "Advanced diagnosis and treatment of lymphedema."
      ),
      color: "from-violet-500 to-purple-600",
    },
    {
      id: "pediatric",
      icon: Baby,
      title: t("الأطفال", "Pediatrics"),
      leader: t("د. مشاري صالح الغدير", "Dr. Mishari Saleh Al-Ghadeer"),
      desc: t(
        "رعاية وتأهيل الأطفال لتحسين النمو والحركة.",
        "Care and rehabilitation for children’s development."
      ),
      color: "from-sky-500 to-blue-600",
    },
    {
      id: "pain",
      icon: Zap,
      title: t("علم الألم", "Pain Science"),
      leader: t("د. فارس عبدالله العضيبي", "Dr. Faris Abdullah Al-Adhaibi"),
      desc: t(
        "إدارة الألم المزمن وتحسين جودة الحياة.",
        "Manages chronic pain and enhances quality of life."
      ),
      color: "from-amber-500 to-yellow-600",
    },
    {
      id: "electro",
      icon: Eye,
      title: t("الالكترو", "Electrotherapy"),
      leader: t("أ.د. سامي العبدالوهاب", "Prof. Sami Al-Abdulwahab"),
      desc: t(
        "استخدام التقنيات الكهربائية في العلاج الطبيعي.",
        "Uses electrical techniques in physiotherapy."
      ),
      color: "from-indigo-500 to-blue-700",
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
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

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specializations.map((spec, index) => (
            <motion.div
              key={spec.id}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              whileHover={{ y: -10 }}
              className="bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              {/* Top */}
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${spec.color} flex items-center justify-center shadow-lg`}
                  >
                    <spec.icon className="w-7 h-7 text-white" />
                  </motion.div>

                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {spec.title}
                    </h3>
                    <p className="text-muted-foreground text-sm flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-accent" />
                      {spec.leader}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {spec.desc}
                </p>
              </div>

              {/* Button */}
              <Link to="/contact">
                <Button className="w-full mt-auto group-hover:scale-[1.02] transition-all">
                  {t("انضم الآن", "Join Now")}
                  <ChevronRight
                    className={`w-4 h-4 ml-2 ${
                      isRTL ? "rotate-180 ml-0 mr-2" : ""
                    }`}
                  />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
