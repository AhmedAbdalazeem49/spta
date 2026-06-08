"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import React from "react";

const Objectives = () => {
  const { t } = useLanguage();

  const objectives = [
    t(
      "تنمية الفكر العلمي في مجال العلاج الطبيعي والعمل على تطويره وتنشيطه.",
      "Develop scientific thinking in the field of physical therapy and work on its continuous development and activation.",
    ),
    t(
      "تحقيق التواصل العلمي لأعضاء الجمعية وإتاحة الفرصة للعاملين للإسهام في حركة التقدم المعرفي.",
      "Achieve scientific communication among association members and provide opportunities for practitioners to contribute to knowledge advancement.",
    ),
    t(
      "تقديم المشورة العلمية وإجراء الدراسات اللازمة لرفع مستوى الأداء.",
      "Provide scientific consultation and conduct necessary studies to improve performance levels.",
    ),
    t(
      "تطوير الأداء العلمي والمهني لممارسي المهنة.",
      "Develop the scientific and professional performance of practitioners in the field.",
    ),
    t(
      "تيسير تبادل الإنتاج العلمي والرؤى المعرفية بين الهيئات الصحية داخل المملكة وخارجها.",
      "Facilitate the exchange of scientific output and knowledge perspectives between healthcare institutions inside and outside the Kingdom.",
    ),
    t(
      "التثقيف الصحي للمجتمع ورفع مستوى الوعي بالصحة العامة.",
      "Promote health education in the community and raise public health awareness.",
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
