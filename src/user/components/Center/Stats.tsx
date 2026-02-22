"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileText, Users, Handshake, Award } from "lucide-react";

export default function Stats() {
  const { t } = useLanguage();

  const stats = [
    {
      number: "250+",
      label: t("بحث منشور", "Published Research"),
      icon: FileText,
    },
    {
      number: "50+",
      label: t("باحث نشط", "Active Researchers"),
      icon: Users,
    },
    {
      number: "30+",
      label: t("شراكة بحثية", "Research Partnerships"),
      icon: Handshake,
    },
    {
      number: "15",
      label: t("جائزة بحثية", "Research Awards"),
      icon: Award,
    },
  ];

  return (
    <section className="py-16 bg-background relative -mt-8 z-20">
      <div className="container-custom">
        <div className="bg-card rounded-3xl shadow-xl p-8 border border-border/50">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                    className="text-3xl md:text-4xl font-bold text-foreground block mb-2"
                  >
                    {stat.number}
                  </motion.span>

                  <span className="text-muted-foreground">{stat.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
