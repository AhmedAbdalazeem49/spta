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
  Eye,
  Heart,
  Sparkles,
  Stethoscope,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function SpecializationItems() {
  const { t, isRTL } = useLanguage();

  const specializations = [
    {
      id: "cardio",
      icon: Heart,
      title: t(
        "المجموعة التخصصية لتأهيل مرضى القلب والجهاز التنفسي",
        "Cardiopulmonary Rehabilitation Special Interest Group",
      ),
      leader: t("د. رشا منصور الغفيلي", "Dr. Rasha Mansour Al-Ghufaili"),
      desc: t(
        "المجموعة التخصصية لتأهيل مرضى القلب والجهاز التنفسي.",
        "Specialized group for cardiopulmonary rehabilitation.",
      ),
      color: "from-red-500 to-rose-600",
    },
    {
      id: "neuro",
      icon: Brain,
      title: t(
        "المجموعة التخصصية للعلاج الطبيعي للأعصاب",
        "Neurological Physical Therapy Special Interest Group",
      ),
      leader: t("د. مشعل محمد الديحان", "Dr. Mishal Mohammed Al-Daihan"),
      desc: t(
        "المجموعة التخصصية للعلاج الطبيعي للأعصاب.",
        "Specialized group for neurological physical therapy.",
      ),
      color: "from-purple-500 to-indigo-600",
    },
    {
      id: "women",
      icon: Users,
      title: t(
        "المجموعة التخصصية للعلاج الطبيعي لصحة المرأة",
        "Women's Health Physical Therapy Special Interest Group",
      ),
      leader: t("أ. غادة محمد القديري", "Ms. Ghada Mohammed Al-Qudairi"),
      desc: t(
        "المجموعة التخصصية للعلاج الطبيعي لصحة المرأة.",
        "Specialized group for women's health physical therapy.",
      ),
      color: "from-pink-500 to-fuchsia-600",
    },
    {
      id: "ortho",
      icon: Bone,
      title: t(
        "المجموعة التخصصية للعلاج الطبيعي للعظام",
        "Orthopedic Physical Therapy Special Interest Group",
      ),
      leader: t("د. علي متعب الشامي", "Dr. Ali Mutaib Al-Shami"),
      desc: t(
        "المجموعة التخصصية للعلاج الطبيعي للعظام.",
        "Specialized group for orthopedic physical therapy.",
      ),
      color: "from-orange-500 to-amber-600",
    },
    {
      id: "sports",
      icon: Dumbbell,
      title: t(
        "المجموعة التخصصية للعلاج الطبيعي - الطب الرياضي",
        "Sports Physical Therapy Special Interest Group",
      ),
      leader: t("أ. راكان عبدالله الوابل", "Mr. Rakan Abdullah Al-Wabel"),
      desc: t(
        "المجموعة التخصصية للعلاج الطبيعي - الطب الرياضي.",
        "Specialized group for sports physical therapy.",
      ),
      color: "from-emerald-500 to-green-600",
    },
    {
      id: "oncology",
      icon: Activity,
      title: t(
        "المجموعة التخصصية للعلاج الطبيعي لمرضى الأورام",
        "Oncology Physical Therapy Special Interest Group",
      ),
      leader: t("أ. نوف محمد الضويان", "Ms. Nouf Mohammed Al-Dhuwayan"),
      desc: t(
        "المجموعة التخصصية للعلاج الطبيعي لمرضى الأورام.",
        "Specialized group for oncology physical therapy.",
      ),
      color: "from-cyan-500 to-teal-600",
    },
    {
      id: "lymphedema",
      icon: Stethoscope,
      title: t("المجموعة السعودية للوذمة اللمفاوية", "Saudi Lymphedema Group"),
      leader: t("د. أسماء عبداللطيف الدرع", "Dr. Asmaa Abdul Latif Al-Darra"),
      desc: t(
        "المجموعة السعودية للوذمة اللمفاوية.",
        "Saudi specialized group for lymphedema.",
      ),
      color: "from-violet-500 to-purple-600",
    },
    {
      id: "pediatric",
      icon: Baby,
      title: t(
        "المجموعة التخصصية للعلاج الطبيعي للأطفال",
        "Pediatric Physical Therapy Special Interest Group",
      ),
      leader: t("د. مشاري صالح الغدير", "Dr. Mishari Saleh Al-Ghadeer"),
      desc: t(
        "المجموعة التخصصية للعلاج الطبيعي للأطفال.",
        "Specialized group for pediatric physical therapy.",
      ),
      color: "from-sky-500 to-blue-600",
    },
    {
      id: "pain",
      icon: Zap,
      title: t(
        "المجموعة التخصصية للعلاج الطبيعي - علم الألم",
        "Pain Science Physical Therapy Special Interest Group",
      ),
      leader: t("د. فارس عبدالله العضيبي", "Dr. Faris Abdullah Al-Adhaibi"),
      desc: t(
        "المجموعة التخصصية للعلاج الطبيعي - علم الألم.",
        "Specialized group for pain science physical therapy.",
      ),
      color: "from-amber-500 to-yellow-600",
    },
    {
      id: "electro",
      icon: Eye,
      title: t(
        "المجموعة التخصصية للعلاج الطبيعي - العلاج الكهربائي",
        "Electrotherapy Physical Therapy Special Interest Group",
      ),
      leader: t("أ.د. سامي العبدالوهاب", "Prof. Sami Al-Abdulwahab"),
      desc: t(
        "المجموعة التخصصية للعلاج الطبيعي - العلاج الكهربائي.",
        "Specialized group for electrotherapy.",
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
              "SPTA comprises ten specialty groups led by elite specialists",
            )}
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
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
              <Link to="/membership">
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
