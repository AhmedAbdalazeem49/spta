"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Cta() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("هل أنت مستعد للانضمام؟", "Ready to Join?")}
          </h2>

          {/* Description */}
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {t(
              "تواصل معنا للتسجيل أو لمزيد من المعلومات حول العضوية",
              "Contact us to register or for more membership information"
            )}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/membership/count">
              <Button
                size="lg"
                variant="outline"
                className="btn-hero-outline bg-secondary-foreground gap-2"
              >
                {t("عدد الأعضاء", "Members Count")}
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
