"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, Users, BookOpen, Award } from "lucide-react";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface FeaturesProps {
  features?: Feature[];
}

export default function Features({ features }: FeaturesProps) {
  const { t } = useLanguage();

  const defaultFeatures: Feature[] = features || [
    {
      icon: Globe,
      title: t("معترف بها دولياً", "Internationally Recognized"),
      description: t(
        "مفهرسة في قواعد البيانات العالمية",
        "Indexed in global databases"
      ),
    },
    {
      icon: Users,
      title: t("مراجعة الأقران", "Peer Reviewed"),
      description: t(
        "عملية مراجعة صارمة من الخبراء",
        "Rigorous expert review process"
      ),
    },
    {
      icon: BookOpen,
      title: t("الوصول المفتوح", "Open Access"),
      description: t("متاحة مجاناً للجميع", "Free access for everyone"),
    },
    {
      icon: Award,
      title: t("جودة عالية", "High Quality"),
      description: t("معايير نشر عالمية", "International publishing standards"),
    },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {defaultFeatures.map((feature, index) => (
            <motion.div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              whileHover={{ y: -10 }}
              className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-xl transition-all text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
