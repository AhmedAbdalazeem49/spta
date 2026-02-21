"use client";

import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Cta() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto" data-aos="zoom-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t("كن جزءاً من المستقبل", "Be Part of the Future")}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t(
              "انضم إلينا وكن جزءاً من الفصل القادم في مسيرة الجمعية السعودية للعلاج الطبيعي",
              "Join us and be part of the next chapter in SPTA's journey"
            )}
          </p>

          <Link to="/contact">
            <Button size="lg" className="gap-2">
              {t("انضم للجمعية", "Join SPTA")}
              <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
