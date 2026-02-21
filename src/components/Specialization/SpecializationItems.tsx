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
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function SpecializationItems() {
  const { t, isRTL } = useLanguage();

  const specializations = [
    {
      id: "neuro",
      icon: Brain,
      title: t("العلاج الطبيعي العصبي", "Neurological Physical Therapy"),
      shortDesc: t(
        "علاج الحالات العصبية مثل السكتة الدماغية وإصابات الحبل الشوكي",
        "Treatment of neurological conditions like stroke and spinal cord injuries"
      ),
      fullDesc: t(
        "يركز هذا التخصص على تقييم وعلاج المرضى الذين يعانون من اضطرابات عصبية تؤثر على الحركة والوظيفة. يشمل ذلك السكتة الدماغية، إصابات الحبل الشوكي، مرض باركنسون، التصلب المتعدد، وإصابات الدماغ الرضحية.",
        "This specialization focuses on evaluating and treating patients with neurological disorders affecting movement and function. This includes stroke, spinal cord injuries, Parkinson's disease, multiple sclerosis, and traumatic brain injuries."
      ),
      conditions: [
        t("السكتة الدماغية", "Stroke"),
        t("إصابات الحبل الشوكي", "Spinal Cord Injuries"),
        t("مرض باركنسون", "Parkinson's Disease"),
        t("التصلب المتعدد", "Multiple Sclerosis"),
        t("إصابات الدماغ الرضحية", "Traumatic Brain Injuries"),
      ],
      color: "from-purple-500 to-indigo-600",
      image: "/placeholder.svg",
    },
    {
      id: "cardio",
      icon: Heart,
      title: t(
        "العلاج الطبيعي القلبي الرئوي",
        "Cardiopulmonary Physical Therapy"
      ),
      shortDesc: t(
        "إعادة تأهيل مرضى القلب والرئة وتحسين اللياقة القلبية",
        "Rehabilitation of heart and lung patients and improving cardiac fitness"
      ),
      fullDesc: t(
        "يهتم هذا التخصص بتقييم وعلاج المرضى الذين يعانون من أمراض القلب والأوعية الدموية والجهاز التنفسي. يشمل برامج إعادة التأهيل القلبي، تمارين التنفس، وتحسين التحمل واللياقة القلبية الرئوية.",
        "This specialization deals with evaluating and treating patients with cardiovascular and respiratory diseases. It includes cardiac rehabilitation programs, breathing exercises, and improving cardiopulmonary endurance and fitness."
      ),
      conditions: [
        t("أمراض القلب التاجية", "Coronary Heart Disease"),
        t("قصور القلب", "Heart Failure"),
        t("مرض الانسداد الرئوي المزمن", "COPD"),
        t("ما بعد جراحة القلب", "Post-Cardiac Surgery"),
        t("الربو", "Asthma"),
      ],
      color: "from-red-500 to-rose-600",
      image: "/placeholder.svg",
    },
    {
      id: "pediatric",
      icon: Baby,
      title: t("العلاج الطبيعي للأطفال", "Pediatric Physical Therapy"),
      shortDesc: t(
        "تطوير المهارات الحركية وعلاج تأخر النمو عند الأطفال",
        "Developing motor skills and treating developmental delays in children"
      ),
      fullDesc: t(
        "يركز على تقييم وعلاج الأطفال من الرضع حتى المراهقين الذين يعانون من تأخر في النمو أو إعاقات حركية. يهدف لتحسين المهارات الحركية الكبرى والدقيقة، التوازن، والتنسيق.",
        "Focuses on evaluating and treating children from infants to adolescents with developmental delays or motor disabilities. It aims to improve gross and fine motor skills, balance, and coordination."
      ),
      conditions: [
        t("الشلل الدماغي", "Cerebral Palsy"),
        t("تأخر النمو الحركي", "Motor Developmental Delay"),
        t("متلازمة داون", "Down Syndrome"),
        t("الصلب المشقوق", "Spina Bifida"),
        t("ضمور العضلات", "Muscular Dystrophy"),
      ],
      color: "from-pink-500 to-fuchsia-600",
      image: "/placeholder.svg",
    },
    {
      id: "ortho",
      icon: Bone,
      title: t("العلاج الطبيعي للعظام", "Orthopedic Physical Therapy"),
      shortDesc: t(
        "علاج إصابات العضلات والعظام والمفاصل",
        "Treatment of muscle, bone, and joint injuries"
      ),
      fullDesc: t(
        "أكبر تخصصات العلاج الطبيعي، يركز على علاج الجهاز العضلي الهيكلي بما في ذلك العضلات، العظام، الأربطة، الأوتار، والمفاصل. يشمل ما بعد الجراحة وإصابات الرياضة.",
        "The largest PT specialization, focusing on treating the musculoskeletal system including muscles, bones, ligaments, tendons, and joints. Includes post-surgery and sports injuries."
      ),
      conditions: [
        t("آلام الظهر والرقبة", "Back and Neck Pain"),
        t("التهاب المفاصل", "Arthritis"),
        t("إصابات الأربطة", "Ligament Injuries"),
        t("كسور العظام", "Bone Fractures"),
        t("استبدال المفاصل", "Joint Replacement"),
      ],
      color: "from-orange-500 to-amber-600",
      image: "/placeholder.svg",
    },
    {
      id: "sports",
      icon: Dumbbell,
      title: t("العلاج الطبيعي الرياضي", "Sports Physical Therapy"),
      shortDesc: t(
        "الوقاية والعلاج من إصابات الرياضيين",
        "Prevention and treatment of athletic injuries"
      ),
      fullDesc: t(
        "يتخصص في الوقاية من الإصابات الرياضية وعلاجها وإعادة التأهيل للعودة للنشاط الرياضي. يعمل مع الرياضيين المحترفين والهواة على حد سواء.",
        "Specializes in prevention, treatment, and rehabilitation of sports injuries to return to athletic activity. Works with both professional and amateur athletes."
      ),
      conditions: [
        t("تمزق الرباط الصليبي", "ACL Tears"),
        t("إصابات الكتف", "Shoulder Injuries"),
        t("التهاب الأوتار", "Tendinitis"),
        t("الشد العضلي", "Muscle Strains"),
        t("إصابات الركبة", "Knee Injuries"),
      ],
      color: "from-emerald-500 to-green-600",
      image: "/placeholder.svg",
    },
    {
      id: "geriatric",
      icon: Users,
      title: t("العلاج الطبيعي لكبار السن", "Geriatric Physical Therapy"),
      shortDesc: t(
        "تحسين جودة الحياة والاستقلالية لكبار السن",
        "Improving quality of life and independence for elderly"
      ),
      fullDesc: t(
        "يركز على المشاكل الصحية المرتبطة بالشيخوخة مثل التهاب المفاصل، هشاشة العظام، اضطرابات التوازن، واستبدال المفاصل. يهدف للحفاظ على الاستقلالية والوقاية من السقوط.",
        "Focuses on health problems related to aging such as arthritis, osteoporosis, balance disorders, and joint replacement. Aims to maintain independence and prevent falls."
      ),
      conditions: [
        t("هشاشة العظام", "Osteoporosis"),
        t("اضطرابات التوازن", "Balance Disorders"),
        t("الزهايمر والخرف", "Alzheimer's & Dementia"),
        t("ضعف العضلات المرتبط بالعمر", "Age-Related Muscle Weakness"),
        t("التهاب المفاصل التنكسي", "Degenerative Arthritis"),
      ],
      color: "from-cyan-500 to-teal-600",
      image: "/placeholder.svg",
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom space-y-8">
        {specializations.map((spec, index) => (
          <motion.div
            key={spec.id}
            data-aos="fade-up"
            data-aos-delay={index * 50}
            className={`bg-card rounded-3xl overflow-hidden border-2 border-border/50 hover:border-primary/30 shadow-md`}
          >
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${spec.color} flex items-center justify-center shadow-lg flex-shrink-0`}
              >
                <spec.icon className="w-10 h-10 text-white" />
              </motion.div>

              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {spec.title}
                </h3>
                <p className="text-muted-foreground mb-4">{spec.shortDesc}</p>
                <p className="text-muted-foreground mb-4">{spec.fullDesc}</p>

                <div>
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    {t("الحالات المعالجة", "Treated Conditions")}
                  </h4>
                  <ul className="flex flex-wrap gap-3">
                    {spec.conditions.map((condition, cIndex) => (
                      <li
                        key={cIndex}
                        className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                      >
                        <Activity className="w-4 h-4 text-accent" />
                        {condition}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to="/research">
                  <Button
                    className={`mt-4 bg-gradient-to-r ${spec.color} text-white border-0 gap-2`}
                  >
                    {t("اقرأ المزيد", "Read More")}
                    <ChevronRight
                      className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                    />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
