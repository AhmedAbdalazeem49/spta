"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Cta = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          data-aos="zoom-in"
          className="bg-primary rounded-3xl p-12 text-center text-primary-foreground"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("انضم إلى مجتمعنا", "Join Our Community")}
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {t(
              "كن جزءاً من أكبر مجتمع للعلاج الطبيعي في المملكة العربية السعودية",
              "Be part of the largest physical therapy community in Saudi Arabia"
            )}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="gap-2">
                {t("تواصل معنا", "Contact Us")}
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
};

export default Cta;
