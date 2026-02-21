"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Award,
  CheckCircle,
  ChevronDown,
  Crown,
  Shield,
  Star,
  UserPlus,
  Users,
} from "lucide-react";

export default function Types() {
  const { t, isRTL } = useLanguage();
  const [expandedType, setExpandedType] = useState<string | null>("active");

  const membershipTypes = [
    {
      id: "active",
      icon: Users,
      badge: Shield,
      title: t("العضوية العاملة", "Active Membership"),
      subtitle: t("للممارسين المحترفين", "For Professional Practitioners"),
      color: "from-blue-500 to-indigo-600",
      price: t("200 ريال سنوياً", "200 SAR/year"),
      features: [
        t(
          "حق التصويت في الجمعية العمومية",
          "Voting rights in general assembly"
        ),
        t("الترشح لمجلس الإدارة", "Eligibility for board positions"),
        t(
          "خصومات حصرية على جميع الفعاليات",
          "Exclusive discounts on all events"
        ),
        t(
          "الوصول الكامل للمكتبة الإلكترونية",
          "Full access to digital library"
        ),
        t("شهادة عضوية رسمية", "Official membership certificate"),
      ],
      requirements: [
        t(
          "حاصل على شهادة بكالوريوس في العلاج الطبيعي أو ما يعادلها",
          "Bachelor's degree in PT or equivalent"
        ),
        t("مرخص من الهيئة السعودية للتخصصات الصحية", "Licensed by SCFHS"),
        t("يمارس المهنة في المملكة", "Practicing in Saudi Arabia"),
      ],
    },
    {
      id: "honorary",
      icon: Award,
      badge: Crown,
      title: t("العضوية الشرفية", "Honorary Membership"),
      subtitle: t("للشخصيات المميزة", "For Distinguished Individuals"),
      color: "from-amber-500 to-orange-600",
      price: t("مجاناً", "Free"),
      features: [
        t("تكريم خاص في المناسبات", "Special recognition at events"),
        t("دعوات لجميع الفعاليات الرسمية", "Invitations to official events"),
        t("شهادة تقدير خاصة", "Special appreciation certificate"),
        t("ذكر في المطبوعات الرسمية", "Mention in publications"),
      ],
      requirements: [
        t("قدم خدمات جليلة للمهنة", "Distinguished service to profession"),
        t("موافقة مجلس الإدارة", "Board approval"),
        t("ترشيح من عضوين عاملين", "Nomination by two active members"),
      ],
    },
    {
      id: "associate",
      icon: UserPlus,
      badge: Star,
      title: t("عضوية الانتساب", "Associate Membership"),
      subtitle: t("للطلاب والمهتمين", "For Students & Enthusiasts"),
      color: "from-emerald-500 to-teal-600",
      price: t("100 ريال سنوياً", "100 SAR/year"),
      features: [
        t("حضور الفعاليات بأسعار مخفضة", "Reduced event prices"),
        t("الوصول للمكتبة الإلكترونية", "Digital library access"),
        t("نشرة إخبارية دورية", "Regular newsletter"),
        t("شهادة انتساب", "Associate certificate"),
      ],
      requirements: [
        t("طالب علاج طبيعي", "PT student"),
        t("أو مهتم بالمجال", "Interested in PT"),
        t("أو ممارس خارج المملكة", "Practitioner outside KSA"),
      ],
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-3 gap-8">
          {membershipTypes.map((type) => (
            <motion.div
              key={type.id}
              layout
              transition={{ duration: 0.3 }}
              className={`bg-card rounded-3xl border overflow-hidden shadow-sm ${
                expandedType === type.id
                  ? "border-primary shadow-xl"
                  : "border-border/50"
              }`}
            >
              {/* Header */}
              <div className={`bg-gradient-to-br ${type.color} p-8 text-white`}>
                <type.icon className="w-14 h-14 mb-4" />
                <h3 className="text-2xl font-bold">{type.title}</h3>
                <p className="text-white/80">{type.subtitle}</p>
                <div className="mt-6 pt-4 border-t border-white/20 text-2xl font-bold">
                  {type.price}
                </div>
              </div>

              <div className="p-6">
                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {type.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Requirements Toggle */}
                <button
                  onClick={() =>
                    setExpandedType(expandedType === type.id ? null : type.id)
                  }
                  className="w-full flex justify-between items-center py-3 border-t border-border font-medium"
                >
                  {t("شروط العضوية", "Requirements")}
                  <motion.div
                    animate={{ rotate: expandedType === type.id ? 180 : 0 }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {expandedType === type.id && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2 py-4">
                        {type.requirements.map((req, i) => (
                          <li
                            key={i}
                            className="flex gap-2 text-sm text-muted-foreground"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link to="/contact">
                  <Button
                    className={`w-full mt-4 bg-gradient-to-r ${type.color} text-white hover:opacity-90`}
                  >
                    {t("تقدم للعضوية", "Apply Now")}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
