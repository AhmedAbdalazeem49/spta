"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function EBP() {
  const { t, isRTL } = useLanguage();

  const ebpSteps = [
    {
      step: 1,
      title: t("صياغة السؤال البحثي", "Formulate Research Question"),
      description: t(
        "استخدام نموذج PICOS لصياغة سؤال واضح ومحدد",
        "Use the PICOS model to formulate a clear and specific question"
      ),
    },
    {
      step: 2,
      title: t("البحث عن الأدلة", "Search for Evidence"),
      description: t(
        "استخدام قواعد البيانات المتخصصة للبحث عن أفضل الأدلة المتاحة",
        "Use specialized databases to search for the best available evidence"
      ),
    },
    {
      step: 3,
      title: t("التقييم النقدي", "Critical Appraisal"),
      description: t(
        "تقييم جودة وموثوقية الأدلة المستخرجة",
        "Evaluate the quality and reliability of the extracted evidence"
      ),
    },
    {
      step: 4,
      title: t("التطبيق السريري", "Clinical Application"),
      description: t(
        "دمج الأدلة مع الخبرة السريرية وتفضيلات المريض",
        "Integrate evidence with clinical expertise and patient preferences"
      ),
    },
    {
      step: 5,
      title: t("التقييم والمتابعة", "Evaluation & Follow-up"),
      description: t(
        "تقييم النتائج والتحسين المستمر",
        "Evaluate outcomes and continuous improvement"
      ),
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Text Content */}
          <div data-aos="fade-up">
            <span className="text-accent font-semibold text-lg mb-4 block">
              {t("الممارسة المبنية على الأدلة", "Evidence-Based Practice")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t(
                "ما هي الممارسة المبنية على الأدلة؟",
                "What is Evidence-Based Practice?"
              )}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t(
                "الممارسة المبنية على الأدلة هي نهج منهجي لاتخاذ القرارات السريرية يدمج بين أفضل الأدلة البحثية المتاحة والخبرة السريرية وتفضيلات المريض.",
                "Evidence-based practice is a systematic approach to clinical decision-making that integrates the best available research evidence with clinical expertise and patient preferences."
              )}
            </p>
            <Link to="/research/ebp">
              <Button className="gap-2" size="lg">
                {t("اكتشف المزيد", "Learn More")}
                <ArrowRight
                  className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`}
                />
              </Button>
            </Link>
          </div>

          {/* Right Steps */}
          <div data-aos="fade-up" data-aos-delay="200">
            <div className="space-y-4">
              {ebpSteps.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: isRTL ? -10 : 10 }}
                  className="flex items-start gap-4 bg-card rounded-xl p-5 shadow-sm card-hover"
                >
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
