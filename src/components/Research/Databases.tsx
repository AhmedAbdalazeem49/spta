"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Databases() {
  const { t } = useLanguage();

  const databases = [
    {
      name: "PubMed",
      description: t(
        "قاعدة بيانات طبية شاملة",
        "Comprehensive medical database"
      ),
      url: "#",
    },
    {
      name: "Cochrane Library",
      description: t(
        "مراجعات منهجية وتحليلات تجميعية",
        "Systematic reviews and meta-analyses"
      ),
      url: "#",
    },
    {
      name: "PEDro",
      description: t(
        "قاعدة بيانات العلاج الطبيعي",
        "Physical therapy database"
      ),
      url: "#",
    },
    {
      name: "ERIC",
      description: t("موارد التعليم والبحث", "Education research resources"),
      url: "#",
    },
    {
      name: "SIGN Guidelines",
      description: t("إرشادات سريرية معتمدة", "Approved clinical guidelines"),
      url: "#",
    },
    {
      name: "TRIP Database",
      description: t("بوابة البحث الإكلينيكي", "Clinical research gateway"),
      url: "#",
    },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-accent font-semibold text-lg mb-4 block">
            {t("قواعد البيانات", "Databases")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t("قواعد البيانات العلمية", "Scientific Databases")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(
              "وصول مباشر إلى أهم قواعد البيانات العلمية في مجال العلاج الطبيعي والطب",
              "Direct access to the most important scientific databases in physical therapy and medicine"
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {databases.map((db, index) => (
            <motion.a
              key={index}
              href={db.url}
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-up"
              data-aos-delay={index * 50}
              whileHover={{ y: -5 }}
              className="group bg-card rounded-2xl p-6 shadow-sm card-hover block"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {db.name}
              </h3>
              <p className="text-muted-foreground">{db.description}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
