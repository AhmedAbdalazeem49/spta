"use client";


import { Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

export default function Cta() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-primary-dark text-white relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div
        className="container-custom relative z-10 text-center"
        data-aos="fade-up"
      >
        <Award className="w-16 h-16 mx-auto mb-6 text-accent" />
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {t("هل تحتاج إلى علاج طبيعي؟", "Do You Need Physical Therapy?")}
        </h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          {t(
            "استشر أخصائي علاج طبيعي مرخص للحصول على تقييم شامل وخطة علاجية مناسبة",
            "Consult a licensed physical therapist for a comprehensive evaluation and appropriate treatment plan"
          )}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/specializations">
            <Button size="lg" className="btn-hero gap-2">
              {t("تعرف على التخصصات", "Explore Specializations")}
              <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg"  className="btn-hero gap-2">
              {t("تواصل معنا", "Contact Us")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
