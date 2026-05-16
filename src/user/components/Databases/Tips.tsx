"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Tips() {
  const { t, isRTL } = useLanguage();

  const tipsList = [
    t(
      "استخدم المصطلحات الطبية المعيارية (MeSH) للبحث الدقيق",
      "Use standard medical terms (MeSH) for precise searching"
    ),
    t(
      "جرب استخدام المعاملات المنطقية (AND, OR, NOT)",
      "Try using Boolean operators (AND, OR, NOT)"
    ),
    t(
      "راجع المراجعات المنهجية أولاً للحصول على صورة شاملة",
      "Check systematic reviews first for a comprehensive overview"
    ),
    t(
      "استخدم أدوات التقييم النقدي لتقييم جودة الأدلة",
      "Use critical appraisal tools to evaluate evidence quality"
    ),
  ];

  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Tips List */}
          <div data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("نصائح للوصول الفعال", "Tips for Effective Access")}
            </h2>
            <div className="space-y-4">
              {tipsList.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-blue-glow shrink-0" />
                  <span>{tip}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Help Box */}
          <div data-aos="fade-up" data-aos-delay="200">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">
                {t("هل تحتاج مساعدة؟", "Need Help?")}
              </h3>
              <p className="text-primary-foreground/80 mb-6">
                {t(
                  "تواصل معنا للحصول على دعم في استخدام قواعد البيانات أو البحث العلمي",
                  "Contact us for support with database usage or scientific research"
                )}
              </p>
              <Button variant="secondary" className="w-full gap-2">
                {t("تواصل معنا", "Contact Us")}
                <ChevronRight
                  className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
