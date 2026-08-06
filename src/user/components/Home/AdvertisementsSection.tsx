"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye, Loader2, Sparkles, X } from "lucide-react";

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
  const [selectedAd, setSelectedAd] = useState<(typeof ads)[number] | null>(
    null,
  );

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
              "Discover the latest offers and services provided by our distinguished partners",
            )}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary/50" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <AnimatePresence>
              {ads.map((ad, index) => (
                <motion.div
                  key={ad.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ y: -8 }}
                  className="group flex flex-col bg-card rounded-3xl overflow-hidden border border-border/60 shadow-md hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-64 md:h-72 bg-muted overflow-hidden">
                    <img
                      src={
                        ad.image.startsWith("http")
                          ? ad.image
                          : `${import.meta.env.VITE_Storage_URL}/storage/${ad.image}`
                      }
                      alt={ad.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <button
                      onClick={() => setSelectedAd(ad)}
                      className="absolute top-4 end-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-white shadow-lg"
                      aria-label={t("عرض التفاصيل", "View details")}
                    >
                      <Eye className="w-5 h-5 text-foreground" />
                    </button>
                  </div>

                  <div className="p-7 flex flex-col flex-grow relative">
                    <h3 className="font-bold text-2xl text-foreground mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                      {ad.title}
                    </h3>

                    {ad.description && (
                      <p className="text-muted-foreground text-base line-clamp-3 mb-8 flex-grow leading-relaxed">
                        {ad.description}
                      </p>
                    )}

                    <div className="mt-auto pt-2 flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1 gap-2 rounded-xl h-12"
                        onClick={() => setSelectedAd(ad)}
                      >
                        <Eye className="w-4 h-4" />
                        {t("عرض التفاصيل", "View Details")}
                      </Button>
                      <Button
                        className="flex-1 gap-2 rounded-xl h-12"
                        onClick={() => window.open(ad.link, "_blank")}
                      >
                        {t("زيارة الموقع", "Visit")}
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

      {/* Full image modal — rendered outside the grid so it's never affected by grid/section layout */}
      <AnimatePresence>
        {selectedAd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-14 inset-x-0 bottom-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedAd(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedAd(null)}
                className="absolute top-4 end-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                aria-label={t("إغلاق", "Close")}
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <img
                src={
                  selectedAd.image.startsWith("http")
                    ? selectedAd.image
                    : `${import.meta.env.VITE_Storage_URL}/storage/${selectedAd.image}`
                }
                alt={selectedAd.title}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AdvertisementsSection;
