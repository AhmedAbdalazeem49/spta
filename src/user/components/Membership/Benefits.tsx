"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Percent,
  BookOpen,
  Award,
  Users,
  Globe,
  GraduationCap,
  CheckCircle,
} from "lucide-react";

export default function Benefits() {
  const { t, isRTL } = useLanguage();

  const benefits = [
    {
      icon: Percent,
      title: t("خصومات حصرية", "Exclusive Discounts"),
      description: t(
        "احصل على خصومات تصل إلى 50% على المؤتمرات وورش العمل والدورات التدريبية",
        "Get up to 50% discount on conferences, workshops, and training courses"
      ),
      highlights: [
        t("خصم 50% على رسوم المؤتمرات", "50% off conference fees"),
        t("خصم 30% على الدورات التدريبية", "30% off training courses"),
        t("خصم 25% على المطبوعات", "25% off publications"),
      ],
      color: "from-emerald-500 to-teal-600",
    },
    // {
    //   icon: BookOpen,
    //   title: t("المكتبة الإلكترونية", "Digital Library Access"),
    //   description: t(
    //     "وصول مجاني لقواعد البيانات العلمية والمراجع المتخصصة",
    //     "Free access to scientific databases and specialized references"
    //   ),
    //   highlights: [
    //     t("قواعد بيانات PubMed و Cochrane", "PubMed & Cochrane databases"),
    //     t("أكثر من 10,000 مرجع علمي", "Over 10,000 scientific references"),
    //     t("تحديثات دورية للمحتوى", "Regular content updates"),
    //   ],
    //   color: "from-blue-500 to-indigo-600",
    // },
    {
      icon: Award,
      title: t("الشهادات المهنية", "Professional Certificates"),
      description: t(
        "شهادات معتمدة وساعات تعليم مستمر معترف بها من هيئة التخصصات الصحية",
        "Accredited certificates and CME hours recognized by SCFHS"
      ),
      highlights: [
        t("شهادات حضور معتمدة", "Accredited attendance certificates"),
        t("ساعات تعليم طبي مستمر", "CME credit hours"),
        t("اعتراف مهني محلي ودولي", "Local and international recognition"),
      ],
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: Users,
      title: t("شبكة مهنية", "Professional Network"),
      description: t(
        "انضم لمجتمع من المتخصصين وتواصل مع الخبراء في المجال",
        "Join a community of specialists and connect with field experts"
      ),
      highlights: [
        t("أكثر من 5000 عضو", "Over 5000 members"),
        t("فعاليات networking دورية", "Regular networking events"),
        t("مجموعات تخصصية", "Specialized groups"),
      ],
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Globe,
      title: t("التمثيل الدولي", "International Representation"),
      description: t(
        "تمثيل في المحافل الدولية والاتحاد العالمي للعلاج الطبيعي",
        "Representation in international forums and World Physiotherapy"
      ),
      highlights: [
        t("عضوية الاتحاد العالمي", "World Physiotherapy membership"),
        t("مؤتمرات دولية", "International conferences"),
        t("تبادل الخبرات العالمية", "Global knowledge exchange"),
      ],
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: GraduationCap,
      title: t("فرص التطوير المهني", "Career Development"),
      description: t(
        "فرص للتدريب والتطوير والمشاركة في البرامج البحثية",
        "Opportunities for training, development, and research programs"
      ),
      highlights: [
        t("منح دراسية", "Scholarships"),
        t("برامج تدريبية متقدمة", "Advanced training programs"),
        t("فرص بحثية", "Research opportunities"),
      ],
      color: "from-rose-500 to-red-600",
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-accent font-semibold text-lg mb-4 block">
            {t("استفد من عضويتك", "Make the Most of Your Membership")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("مزايا العضوية الحصرية", "Exclusive Member Benefits")}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              whileHover={{ y: -10 }}
              className="group bg-card rounded-2xl p-8 border border-border/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 shadow-lg`}
              >
                <benefit.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mb-6">
                {benefit.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-2">
                {benefit.highlights.map((highlight, hIndex) => (
                  <motion.li
                    key={hIndex}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: hIndex * 0.1 }}
                    className="flex items-center gap-2 text-sm text-foreground/80"
                  >
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
