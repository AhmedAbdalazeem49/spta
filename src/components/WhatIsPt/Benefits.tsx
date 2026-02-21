"use client";

import { motion } from "framer-motion";
import { Activity, Heart, Bone, Brain } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Benefits() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Activity,
      title: t("تحسين الحركة", "Improve Movement"),
      description: t(
        "استعادة القدرة على الحركة والتنقل بشكل طبيعي",
        "Restore the ability to move and navigate normally"
      ),
    },
    {
      icon: Heart,
      title: t("تخفيف الألم", "Pain Relief"),
      description: t(
        "تقليل الألم المزمن والحاد بدون أدوية",
        "Reduce chronic and acute pain without medication"
      ),
    },
    {
      icon: Bone,
      title: t("تقوية العضلات", "Strengthen Muscles"),
      description: t(
        "بناء القوة العضلية وتحسين التوازن",
        "Build muscle strength and improve balance"
      ),
    },
    {
      icon: Brain,
      title: t("إعادة التأهيل", "Rehabilitation"),
      description: t(
        "التعافي من الإصابات والعمليات الجراحية",
        "Recovery from injuries and surgeries"
      ),
    },
  ];

  return (
    <section className="py-16 bg-background relative -mt-16 z-20">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
