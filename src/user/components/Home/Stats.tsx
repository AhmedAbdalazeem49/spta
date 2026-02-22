"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, Award, Building2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Stats() {
  const { t } = useLanguage();

  const stats = [
    {
      number: "5000+",
      label: t("عضو مسجل", "Registered Members"),
      icon: Users,
    },
    {
      number: "200+",
      label: t("بحث علمي", "Scientific Research"),
      icon: BookOpen,
    },
    {
      number: "50+",
      label: t("شراكة", "Partnerships"),
      icon: Award,
    },
    {
      number: "13",
      label: t("فرع إقليمي", "Regional Branches"),
      icon: Building2,
    },
  ];

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
                <stat.icon className="w-8 h-8" />
              </div>

              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1 + 0.3,
                  type: "spring",
                }}
                className="text-4xl md:text-5xl font-bold block mb-2"
              >
                {stat.number}
              </motion.span>

              <span className="text-primary-foreground/80">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
