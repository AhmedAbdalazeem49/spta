"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Layers, Search, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

export default function Tools() {
  const { t, isRTL } = useLanguage();

  const tools = [
    {
      icon: Layers,
      title: t("هرم الأدلة", "Evidence Pyramid"),
      description: t(
        "فهم مستويات الأدلة العلمية وترتيبها",
        "Understanding scientific evidence levels"
      ),
      link: "/research/pyramid",
    },
    {
      icon: Search,
      title: t("تقنيات البحث المتقدم", "Advanced Search Techniques"),
      description: t(
        "استراتيجيات البحث الفعال في قواعد البيانات",
        "Effective database search strategies"
      ),
      link: "/research/search-techniques",
    },
    {
      icon: FileText,
      title: t("قوالب PICOS", "PICOS Templates"),
      description: t(
        "قوالب جاهزة لصياغة أسئلة البحث",
        "Ready templates for formulating research questions"
      ),
      link: "/research/picos",
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-accent font-semibold text-lg mb-4 block">
            {t("أدوات بحثية", "Research Tools")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t("أدوات مساعدة للباحثين", "Helpful Tools for Researchers")}
          </h2>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              whileHover={{ y: -10 }}
              className="bg-card rounded-2xl p-8 shadow-md card-hover group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <tool.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                {tool.title}
              </h3>
              <p className="text-muted-foreground mb-6">{tool.description}</p>
              <Link
                to={tool.link}
                className="flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all"
              >
                {t("استكشف", "Explore")}
                <ArrowRight
                  className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
