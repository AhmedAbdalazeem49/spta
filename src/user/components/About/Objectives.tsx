"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Objectives = () => {
  const { t } = useLanguage();

  const objectives = [
    t(
      "تنمية الفكر العلمي في مجال العلاج الطبيعي والعمل على تطويره وتنشيطه.",
      "Foster scientific thinking in physical therapy and work towards its development and advancement."
    ),
    t(
      "تحقيق التواصل العلمي لأعضاء الجمعية وإتاحة الفرصة للعاملين للإسهام في حركة التقدم المعرفي.",
      "Facilitate scientific communication among members and empower practitioners to contribute to knowledge advancement."
    ),
    t(
      "تقديم المشورة العلمية وإجراء الدراسات اللازمة لرفع مستوى الأداء.",
      "Provide scientific consultation and conduct studies to elevate professional performance standards."
    ),
    t(
      "تطوير الأداء العلمي والمهني لممارسي المهنة.",
      "Enhance the scientific and professional capabilities of practitioners."
    ),
    t(
      "تيسير تبادل الإنتاج العلمي والرؤى المعرفية بين الهيئات الصحية داخل المملكة وخارجها.",
      "Facilitate the exchange of scientific outputs and knowledge between healthcare institutions within and beyond the Kingdom."
    ),
    t(
      "التثقيف الصحي للمجتمع ورفع مستوى الوعي بالصحة العامة.",
      "Promote public health education and raise awareness about community well-being."
    ),
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-accent font-semibold text-lg mb-4 block">
            {t("أهداف الجمعية", "Association Objectives")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t("نسعى لتحقيق", "We Strive to Achieve")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectives.map((objective, index) => (
            <motion.div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              whileHover={{ scale: 1.02 }}
              className="flex items-start gap-4 bg-card rounded-xl p-6 shadow-sm card-hover"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <p className="text-foreground font-medium">{objective}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Objectives;
