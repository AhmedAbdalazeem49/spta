"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/services/api";
import { NEWS_ENDPOINTS } from "@/api/endpoints";
import { useToast } from "@/hooks/use-toast";

interface NewsItem {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  image: string | null;
  link: string | null;
  created_at: string;
}

const STORAGE_URL = import.meta.env.VITE_Storage_URL;
const getImageUrl = (image: string | null) => {
  if (!image) return null;
  if (image.startsWith("http")) return image;
  return `${STORAGE_URL}/storage/${image}`;
};

const formatDate = (dateStr: string, lang: string) => {
  return new Date(dateStr).toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function NewsItems() {
  const { t, isRTL, language } = useLanguage();
  const { toast } = useToast();
  
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(NEWS_ENDPOINTS.list);
        const items = response.data.data ?? response.data;
        setNewsItems(Array.isArray(items) ? items : []);
      } catch (error) {
        toast({
          title: t("خطأ", "Error"),
          description: t("فشل في تحميل الأخبار", "Failed to load news"),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNews();
  }, [t, toast]);

  if (isLoading) {
    return (
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-border/50">
                <Skeleton className="w-full aspect-video" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (newsItems.length === 0) return null;

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="news-card group bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 flex flex-col"
            >
              <div className="relative overflow-hidden aspect-video bg-muted">
                {getImageUrl(item.image) && (
                  <img src={getImageUrl(item.image)!} alt={isRTL ? item.title_ar : item.title_en} className="news-card-image w-full h-full object-cover" />
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(item.created_at, language)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2" dir={isRTL ? "rtl" : "ltr"}>
                  {isRTL ? item.title_ar : item.title_en}
                </h3>
                <p className="text-muted-foreground mb-6 line-clamp-3" dir={isRTL ? "rtl" : "ltr"}>
                  {isRTL ? item.description_ar : item.description_en}
                </p>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all">
                      {t("زيارة الرابط", "Visit Link")}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : <div />}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
