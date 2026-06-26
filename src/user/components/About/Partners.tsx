"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Handshake, ExternalLink, ImageOff, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";

export interface Partner {
  id: number;
  name: string;
  description: string | null;
  link: string | null;
  image: string | null;
}

const Partners = () => {
  const { t } = useLanguage();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await api.get("/partners");
        // Check if data is nested
        setPartners(response.data.data || response.data || []);
      } catch (error) {
        console.error("Failed to fetch partners:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPartners();
  }, []);

  if (!isLoading && partners.length === 0) return null;

  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Handshake className="w-5 h-5" />
            <span className="font-semibold text-sm">
              {t("التمثيل والشراكات", "Representation & Partnerships")}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t("شركاء النجاح", "Success Partners")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t(
              "نفخر بشراكاتنا الاستراتيجية مع نخبة من المؤسسات الأكاديمية والصحية محلياً ودولياً",
              "We take pride in our strategic partnerships with elite academic and health institutions locally and internationally"
            )}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary/50" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative bg-card rounded-2xl p-6 text-center border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Link wrapper if link exists */}
                  {partner.link ? (
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-10"
                      aria-label={`Visit ${partner.name}`}
                    />
                  ) : null}

                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/30 flex items-center justify-center overflow-hidden border border-border/50 group-hover:border-primary/30 group-hover:bg-primary/5 transition-colors relative">
                    {partner.image ? (
                      <img
                        src={`${import.meta.env.VITE_Storage_URL}/storage/${partner.image}`}
                        alt={partner.name}
                        className="w-full h-full object-contain p-3 bg-white transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <Handshake className="w-10 h-10 text-muted-foreground/40 group-hover:text-primary/40 transition-colors" />
                    )}
                  </div>
                  
                  <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {partner.name}
                  </h3>
                  
                  {partner.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
                      {partner.description}
                    </p>
                  )}
                  
                  {partner.link && (
                    <div className="mt-auto pt-4 border-t border-border/50 text-sm text-primary flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100 font-medium">
                      <span>{t("زيارة الموقع", "Visit Website")}</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default Partners;
