"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cta() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          data-aos="fade-up"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <Sparkles className="w-12 h-12 mx-auto mb-6 text-accent" />

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("للاستفادة من مميزات العضوية", "To Benefit from Membership")}
          </h2>

          {/* Description */}
          <p className="text-xl text-primary-foreground/80 mb-8">
            {t(
              "تواصل معنا للتسجيل أو للحصول على مزيد من المعلومات",
              "Contact us to register or get more information"
            )}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/membership/types">
              <Button
                size="lg"
                variant="outline"
                className="btn-hero-outline bg-secondary-foreground gap-2 w-full sm:w-auto"
              >
                {t("أنواع العضوية", "Membership Types")}
                <ArrowRight
                  className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`}
                />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
