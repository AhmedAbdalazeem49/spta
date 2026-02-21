"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import hero1 from "@/assets/hero-1.webp";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

export default function NewsItems() {
  const { t, isRTL } = useLanguage();

  const newsItems = [
    {
      id: 1,
      title: t(
        "المؤتمر السنوي للعلاج الطبيعي 2024",
        "Annual Physical Therapy Conference 2024"
      ),
      excerpt: t(
        "انطلاق المؤتمر السنوي الخامس للعلاج الطبيعي بمشاركة أكثر من 500 متخصص من مختلف أنحاء المملكة والخليج العربي.",
        "The fifth annual physical therapy conference kicks off with the participation of more than 500 specialists from across the Kingdom and the Gulf."
      ),
      date: t("15 يناير 2024", "January 15, 2024"),
      category: t("فعاليات", "Events"),
      image: hero4,
      readTime: t("5 دقائق", "5 min read"),
      author: t("فريق التحرير", "Editorial Team"),
    },
    {
      id: 2,
      title: t(
        "إطلاق برنامج التعليم المستمر الجديد",
        "Launch of New Continuing Education Program"
      ),
      excerpt: t(
        "أعلنت الجمعية عن إطلاق برنامج جديد للتعليم المستمر يهدف إلى تطوير مهارات الممارسين وتحديث معارفهم.",
        "The association announced the launch of a new continuing education program aimed at developing practitioners skills and updating their knowledge."
      ),
      date: t("10 يناير 2024", "January 10, 2024"),
      category: t("أخبار", "News"),
      image: hero2,
      readTime: t("3 دقائق", "3 min read"),
      author: t("د. أحمد العتيبي", "Dr. Ahmed Al-Otaibi"),
    },
    {
      id: 3,
      title: t(
        "شراكة استراتيجية مع جامعة الملك سعود",
        "Strategic Partnership with King Saud University"
      ),
      excerpt: t(
        "توقيع اتفاقية تعاون بين الجمعية وجامعة الملك سعود لتعزيز البحث العلمي وتبادل الخبرات الأكاديمية.",
        "Signing a cooperation agreement between the association and King Saud University to enhance scientific research and exchange academic expertise."
      ),
      date: t("5 يناير 2024", "January 5, 2024"),
      category: t("شراكات", "Partnerships"),
      image: hero3,
      readTime: t("4 دقائق", "4 min read"),
      author: t("إدارة الشراكات", "Partnerships Dept."),
    },
    {
      id: 4,
      title: t(
        "افتتاح فرع جديد في المنطقة الشرقية",
        "Opening a New Branch in the Eastern Region"
      ),
      excerpt: t(
        "تم افتتاح فرع جديد للجمعية في المنطقة الشرقية لخدمة أعضاء المنطقة وتقديم الخدمات بشكل أقرب.",
        "A new branch of the association was opened in the Eastern Region to serve members and provide services more closely."
      ),
      date: t("1 يناير 2024", "January 1, 2024"),
      category: t("أخبار", "News"),
      image: hero1,
      readTime: t("2 دقائق", "2 min read"),
      author: t("فريق التحرير", "Editorial Team"),
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="news-card group bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={item.image}
                  alt={item.title}
                  className="news-card-image w-full h-full object-cover"
                />
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
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    {item.author}
                  </span>
                  <Link
                    to="/news"
                    className="flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all"
                  >
                    {t("اقرأ المزيد", "Read More")}
                    <ArrowRight
                      className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                    />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
