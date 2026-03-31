"use client";

import { motion } from "framer-motion";
import { Microscope, BookOpen, FileText, ArrowRight, Newspaper } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

export default function Research() {
  const { t, isRTL } = useLanguage();

  const researchCards = [
    {
      icon: Newspaper,
      title: t("المجلة العلمية", "Scientific Journal"),
      description: t(
        "International Journal of Physical Therapy Research & Practice — المجلة العلمية التابعة للجمعية",
        "International Journal of Physical Therapy Research & Practice — SPTA's official scientific journal"
      ),
      link: "/research/journal",
    },
    {
      icon: Microscope,
      title: t("البحوث والدراسات", "Research & Studies"),
      description: t(
        "تشجيع إجراء البحوث العلمية والدراسات الاستشارية في مجال العلاج الطبيعي",
        "Encouraging scientific research and consultancy studies in physical therapy"
      ),
      link: "/research",
    },
    {
      icon: BookOpen,
      title: t("تأليف وترجمة الكتب", "Book Publishing & Translation"),
      description: t(
        "تأليف وترجمة الكتب العلمية وإصدار الدراسات والنشرات العلمية",
        "Authoring and translating scientific books and publishing studies and scientific bulletins"
      ),
      link: "/library",
    },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-accent font-semibold text-lg mb-4 block">
            {t("البحث والنشر", "Research & Publishing")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("البحث العلمي والنشر", "Scientific Research & Publishing")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(
              "نوفر لك مجموعة شاملة من الأدوات والموارد لدعم البحث العلمي والممارسة المبنية على الأدلة",
              "We provide a comprehensive set of tools and resources to support scientific research and evidence-based practice"
            )}
          </p>
        </div>

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
              <h3 className="text-xl font-bold text-foreground mb-4">{card.title}</h3>
              <p className="text-muted-foreground mb-6">{card.description}</p>
              <Link to={card.link} className="flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all">
                {t("اكتشف المزيد", "Discover More")}
                <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
