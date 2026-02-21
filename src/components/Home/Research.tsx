"use client";

import { motion } from "framer-motion";
import { Microscope, Database, FileText, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

export default function Research() {
  const { t, isRTL } = useLanguage();

  const researchCards = [
    {
      icon: Microscope,
      title: t("الممارسة المبنية على الأدلة", "Evidence-Based Practice"),
      description: t(
        "تعرف على منهجية الممارسة المبنية على الأدلة العلمية",
        "Learn the methodology of evidence-based practice"
      ),
      link: "/research/ebp",
    },
    {
      icon: Database,
      title: t("قواعد البيانات", "Research Databases"),
      description: t(
        "الوصول إلى قواعد بيانات عالمية مثل PubMed و Cochrane",
        "Access global databases like PubMed and Cochrane"
      ),
      link: "/research/databases",
    },
    {
      icon: FileText,
      title: t("إرشادات البحث", "Research Guidelines"),
      description: t(
        "دليلك الشامل لكتابة ونشر الأبحاث العلمية",
        "Your comprehensive guide to writing and publishing research"
      ),
      link: "/research/guidelines",
    },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-accent font-semibold text-lg mb-4 block">
            {t("البحث والتعليم", "Research & Education")}
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("أدوات البحث العلمي", "Scientific Research Tools")}
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(
              "نوفر لك مجموعة شاملة من الأدوات والموارد لدعم بحثك العلمي",
              "We provide you with a comprehensive set of tools and resources to support your scientific research"
            )}
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {researchCards.map((card, index) => (
            <motion.div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              whileHover={{ y: -10 }}
              className="bg-card rounded-2xl p-8 shadow-md card-hover group transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <card.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-4">
                {card.title}
              </h3>

              <p className="text-muted-foreground mb-6">{card.description}</p>

              <Link
                to={card.link}
                className="flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all"
              >
                {t("اكتشف المزيد", "Discover More")}
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
