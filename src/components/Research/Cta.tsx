"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cta() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container-custom text-center">
        <motion.div data-aos="zoom-in" className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("هل تحتاج مساعدة في بحثك؟", "Need Help with Your Research?")}
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            {t(
              "فريقنا المتخصص جاهز لمساعدتك في رحلتك البحثية",
              "Our specialized team is ready to help you in your research journey"
            )}
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="gap-2">
              {t("تواصل معنا", "Contact Us")}
              <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
