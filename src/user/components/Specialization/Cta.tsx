"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface CtaProps {
  title?: string;
  description?: string;
  link?: string;
  buttonText?: string;
}

export default function Cta({
  title,
  description,
  link = "/contact",
  buttonText,
}: CtaProps) {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container-custom text-center" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {title ||
            t(
              "مهتم بالتخصص في العلاج الطبيعي؟",
              "Interested in Specializing in PT?"
            )}
        </h2>
        <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          {description ||
            t(
              "انضم للجمعية واستفد من برامج التطوير المهني والتدريب المتخصص",
              "Join the association and benefit from professional development and specialized training"
            )}
        </p>
        <Link to={link}>
          <Button
            size="lg"
            className="relative inline-flex items-center justify-center px-8 py-4 gap-3 font-bold text-white bg-gradient-to-r from-accent to-blue-glow rounded-full shadow-lg shadow-accent/50 hover:scale-105 transition-transform duration-300 overflow-hidden"
          >
            {buttonText || t("انضم الآن", "Join Now")}
            <ArrowRight
              className={`w-5 h-5 transition-transform duration-300 ${
                isRTL ? "rotate-180" : ""
              }`}
            />
            {/* Add subtle animated background effect */}
            <span className="absolute inset-0 bg-white/10 rounded-full blur-xl opacity-30 animate-pulse" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
