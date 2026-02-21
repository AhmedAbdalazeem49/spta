"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Map = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="text-accent font-semibold text-lg mb-4 block">
            {t("موقعنا", "Our Location")}
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("تواصل معنا", "Get in Touch")}
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "نرحب بزيارتكم في مقر الجمعية بمدينة الرياض",
              "We welcome your visit to the association headquarters in Riyadh"
            )}
          </p>
        </div>

        {/* Google Map */}
        <div
          data-aos="zoom-in"
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.674714456827!2d46.6752957!3d24.7135517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sKing%20Saud%20University!5e0!3m2!1sen!2ssa!4v1702000000000!5m2!1sen!2ssa"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SPTA Location"
          />
        </div>
      </div>
    </section>
  );
};

export default Map;
