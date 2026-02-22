"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

export default function Cta() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div
          className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 rounded-3xl p-8 md:p-16 text-center border border-border/50"
          data-aos="zoom-in"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-primary flex items-center justify-center"
          >
            <FileText className="w-10 h-10 text-primary-foreground" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t("هل لديك بحث للتقديم؟", "Have Research to Submit?")}
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t(
              "نرحب بمشاركاتكم البحثية ونقدم الدعم الكامل للباحثين في جميع مراحل البحث",
              "We welcome your research contributions and provide full support to researchers at all stages"
            )}
          </p>

          <div className="flex flex-wrap justify-center gap-4">

            <Link to="/contact">
              <Button size="lg" variant="outline" className="gap-2">
                {t("تواصل معنا", "Contact Us")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
