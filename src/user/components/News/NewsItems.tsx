"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import sptaAward1 from "@/assets/spta-award-1.jpg";
import sptaCeremony1 from "@/assets/spta-ceremony-1.jpg";
import sptaExhibition1 from "@/assets/spta-exhibition-1.jpg";
import sptaSponsors1 from "@/assets/spta-sponsors-1.jpg";

export default function NewsItems() {
  const { t, isRTL } = useLanguage();

  const newsItems = [
    {
      id: 1,
      title: t(
        "المؤتمر السعودي الدولي الخامس للعلاج الطبيعي",
        "5th Saudi International Physiotherapy Conference"
      ),
      excerpt: t(
        "انعقد المؤتمر السعودي الدولي الخامس للعلاج الطبيعي بمشاركة نخبة من الخبراء والمتخصصين من مختلف أنحاء العالم.",
        "The 5th Saudi International Physiotherapy Conference was held with the participation of elite experts and specialists from around the world."
      ),
      date: t("2024", "2024"),
      category: t("مؤتمرات", "Conferences"),
      image: sptaAward1,
      readTime: t("5 دقائق", "5 min read"),
      author: t("فريق التحرير", "Editorial Team"),
    },
    {
      id: 2,
      title: t(
        "المؤتمر السعودي الدولي الأول للجلطة",
        "1st Saudi International Stroke Conference"
      ),
      excerpt: t(
        "أقامت الجمعية المؤتمر السعودي الدولي الأول للجلطة بالتعاون مع شركاء محليين ودوليين.",
        "SPTA organized the 1st Saudi International Stroke Conference in collaboration with local and international partners."
      ),
      date: t("2024", "2024"),
      category: t("مؤتمرات", "Conferences"),
      image: sptaCeremony1,
      readTime: t("4 دقائق", "4 min read"),
      author: t("فريق التحرير", "Editorial Team"),
    },
    {
      id: 3,
      title: t(
        "فعاليات التوعية الصحية المجتمعية",
        "Community Health Awareness Events"
      ),
      excerpt: t(
        "أقامت الجمعية العديد من الأنشطة الثقافية والتوعوية والترفيهية في مختلف مناطق المملكة.",
        "SPTA organized numerous cultural, educational, and recreational activities across various regions of the Kingdom."
      ),
      date: t("2024", "2024"),
      category: t("خدمة مجتمع", "Community Service"),
      image: sptaExhibition1,
      readTime: t("3 دقائق", "3 min read"),
      author: t("إدارة الفروع", "Branch Management"),
    },
    {
      id: 4,
      title: t(
        "الاتفاقيات والشراكات الاستراتيجية",
        "Strategic Agreements & Partnerships"
      ),
      excerpt: t(
        "عقدت الجمعية عددًا من الاتفاقيات والشراكات مع جهات حكومية وخاصة لتعزيز التعاون وتحقيق أهدافها الاستراتيجية.",
        "SPTA signed multiple agreements and partnerships with government and private entities to enhance cooperation and achieve its strategic objectives."
      ),
      date: t("2024", "2024"),
      category: t("شراكات", "Partnerships"),
      image: sptaSponsors1,
      readTime: t("3 دقائق", "3 min read"),
      author: t("فريق التحرير", "Editorial Team"),
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="news-card group bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50"
            >
              <div className="relative overflow-hidden aspect-video">
                <img src={item.image} alt={item.title} className="news-card-image w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {item.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-6 line-clamp-3">{item.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    {item.author}
                  </span>
                  {/* <Link to="/news" className="flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all">
                    {t("اقرأ المزيد", "Read More")}
                    <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                  </Link> */}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
