"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

import sptaAward1 from "@/assets/spta-award-1.jpg";
import sptaCommunity1 from "@/assets/spta-community-1.jpg";
import sptaClinic1 from "@/assets/spta-clinic-1.jpg";

export default function LatestNews() {
  const { t, isRTL } = useLanguage();

  const newsItems = [
    {
      id: 1,
      title: t(
        "المؤتمر السعودي الدولي الخامس للعلاج الطبيعي",
        "5th Saudi International Physiotherapy Conference"
      ),
      date: t("2024", "2024"),
      category: t("مؤتمرات", "Conferences"),
      image: sptaAward1,
    },
    {
      id: 2,
      title: t(
        "فعاليات التوعية الصحية المجتمعية",
        "Community Health Awareness Events"
      ),
      date: t("2024", "2024"),
      category: t("خدمة مجتمع", "Community Service"),
      image: sptaCommunity1,
    },
    {
      id: 3,
      title: t(
        "ورش العمل التخصصية في مناطق المملكة",
        "Specialized Workshops Across Saudi Regions"
      ),
      date: t("2024", "2024"),
      category: t("ورش عمل", "Workshops"),
      image: sptaClinic1,
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12" data-aos="fade-up">
          <div>
            <span className="text-accent font-semibold text-lg mb-4 block">
              {t("آخر الأخبار", "Latest News")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t("أحدث الفعاليات والأنشطة", "Latest Events & Activities")}
            </h2>
          </div>
          <Link to="/news">
            <Button variant="outline" className="gap-2 mt-4 md:mt-0">
              {t("عرض الكل", "View All")}
              <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="news-card group"
            >
              <div className="relative overflow-hidden aspect-video">
                <img src={item.image} alt={item.title} className="news-card-image" />
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <span className="text-muted-foreground text-sm mb-3 block">{item.date}</span>
                <h3 className="text-lg font-bold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <Link to="/news" className="flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all">
                  {t("اقرأ المزيد", "Read More")}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
