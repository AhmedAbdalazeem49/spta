"use client";

import hero1 from "@/assets/hero-1.webp";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import React from "react";

export default function Clarifications() {
  const { t } = useLanguage();

  const sections = [
    {
      title: t("ما هو العلاج الطبيعي؟", "What is Physical Therapy?"),
      content: t(
        "العلاج الطبيعي هو تخصص صحي يهدف إلى تحسين وظائف الجسم الحركية والوقاية من الإعاقة وتخفيف الألم. يستخدم أخصائيو العلاج الطبيعي مجموعة من التقنيات والتمارين العلاجية لمساعدة المرضى على استعادة قدراتهم الحركية وتحسين جودة حياتهم.",
        "Physical therapy is a healthcare specialty aimed at improving body motor functions, preventing disability, and relieving pain. Physical therapists use various techniques and therapeutic exercises to help patients restore their motor abilities and improve their quality of life."
      ),
      image: hero1,
      reverse: false,
    },
    {
      title: t("دور أخصائي العلاج الطبيعي", "The Role of a Physical Therapist"),
      content: t(
        "يقوم أخصائي العلاج الطبيعي بتقييم حالة المريض وتصميم برنامج علاجي مخصص يتضمن تمارين علاجية، تقنيات يدوية، واستخدام أجهزة متخصصة. يعمل الأخصائي مع المرضى من جميع الأعمار بدءاً من الأطفال حديثي الولادة وحتى كبار السن.",
        "A physical therapist evaluates the patient's condition and designs a customized treatment program that includes therapeutic exercises, manual techniques, and specialized equipment. The specialist works with patients of all ages, from newborns to the elderly."
      ),
      image: hero2,
      reverse: true,
    },
    {
      title: t("أهمية العلاج الطبيعي", "The Importance of Physical Therapy"),
      content: t(
        "يلعب العلاج الطبيعي دوراً حيوياً في النظام الصحي، حيث يساعد في تقليل الحاجة للأدوية المسكنة والعمليات الجراحية. كما يساهم في تسريع عملية التعافي وتحسين جودة الحياة للمرضى الذين يعانون من إصابات أو أمراض مزمنة.",
        "Physical therapy plays a vital role in the healthcare system, helping reduce the need for painkillers and surgeries. It also contributes to speeding up recovery and improving quality of life for patients with injuries or chronic conditions."
      ),
      image: hero3,
      reverse: false,
    },
  ];

  return (
    <>
      {sections.map((section, index) => (
        <section
          key={index}
          className={`section-padding ${
            index % 2 === 0 ? "bg-background" : "bg-secondary/30"
          }`}
        >
          <div className="container-custom">
            <div
              className={`grid lg:grid-cols-2 gap-16 items-center ${
                section.reverse ? "lg:flex-row-reverse" : ""
              }`}
            >
              <motion.div
                data-aos={section.reverse ? "fade-left" : "fade-right"}
                className={section.reverse ? "lg:order-2" : ""}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {section.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
              <motion.div
                data-aos={section.reverse ? "fade-right" : "fade-left"}
                className={section.reverse ? "lg:order-1" : ""}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
