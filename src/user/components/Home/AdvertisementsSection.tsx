"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2, Sparkles } from "lucide-react";

export interface Advertisement {
  id: number;
  title: string;
  description: string | null;
  link: string;
  image: string;
}

const AdvertisementsSection = () => {
  const { t } = useLanguage();
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await api.get("/advertisements");
        setAds(response.data || []);
      } catch (error) {
        console.error("Failed to fetch advertisements:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAds();
  }, []);

  if (!isLoading && ads.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold text-sm">
              {t("الإعلانات", "Advertisements")}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t("شركاء النجاح والرعاة", "Our Partners & Sponsors")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t(
              "تعرف على أحدث العروض والخدمات المقدمة من شركائنا المتميزين",
              "Discover the latest offers and services provided by our distinguished partners"
            )}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary/50" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {ads.map((ad, index) => (
                <motion.div
                  key={ad.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border/60 shadow-md hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <img
                      src={ad.image.startsWith("http") ? ad.image : `${import.meta.env.VITE_Storage_URL}/storage/${ad.image}`}
                      alt={ad.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow relative">
                    <h3 className="font-bold text-xl text-foreground mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                      {ad.title}
                    </h3>
                    
                    {ad.description && (
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                        {ad.description}
                      </p>
                    )}
                    
                    <div className="mt-auto pt-2">
                      <Button 
                        className="w-full gap-2 rounded-xl"
                        onClick={() => window.open(ad.link, "_blank")}
                      >
                        {t("زيارة الموقع", "Visit Website")}
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdvertisementsSection;
