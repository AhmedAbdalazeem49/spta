"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ExternalLink, Globe, MapPin } from "lucide-react";
import React from "react";

export default function WorldPhysiotherapy() {
  const { t } = useLanguage();

  const worldPhysiotherapy = {
    title: t("الاتحاد العالمي للعلاج الطبيعي", "World Physiotherapy"),
    description: t(
      "الجمعية السعودية للعلاج الطبيعي عضو فعال في الاتحاد العالمي للعلاج الطبيعي منذ عام 1995. يضم الاتحاد أكثر من 125 منظمة عضو يمثلون أكثر من 660,000 أخصائي علاج طبيعي حول العالم.",
      "The Saudi Physical Therapy Association has been an active member of World Physiotherapy since 1995. The federation includes over 125 member organizations representing more than 660,000 physical therapists worldwide."
    ),
    stats: [
      { number: "125+", label: t("منظمة عضو", "Member Organizations") },
      { number: "660K+", label: t("أخصائي علاج طبيعي", "Physical Therapists") },
      { number: "1951", label: t("سنة التأسيس", "Year Founded") },
    ],
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div data-aos="fade-up">
            <span className="text-accent font-semibold text-lg mb-4 block">
              {t("شراكتنا الرئيسية", "Our Main Partnership")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {worldPhysiotherapy.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {worldPhysiotherapy.description}
            </p>
            <a
              href="https://world.physio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="gap-2">
                {t("زيارة الموقع", "Visit Website")}
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>

          {/* Stats & Map Section */}
          <div data-aos="fade-up">
            <div className="grid grid-cols-3 gap-4">
              {worldPhysiotherapy.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  className="bg-card rounded-2xl p-6 text-center border border-border/50"
                >
                  <span className="text-3xl font-bold text-primary block mb-2">
                    {stat.number}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* World Map Placeholder */}
            <div className="mt-8 bg-secondary/30 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <Globe className="w-full h-full" />
              </div>
              <div className="relative z-10 text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
                <p className="text-foreground font-medium">
                  {t(
                    "تمثيل في أكثر من 125 دولة حول العالم",
                    "Represented in over 125 countries worldwide"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
