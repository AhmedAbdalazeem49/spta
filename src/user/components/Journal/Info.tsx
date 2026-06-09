"use client";

import heroImage from "@/assets/hero-2.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import React from "react";

interface InfoProps {
  journalInfo?: {
    name: string;
    issn: string;
    frequency: string;
    language: string;
  };
  heroImage?: string;
}

export default function Info({ journalInfo }: InfoProps) {
  const { t } = useLanguage();

  const info = journalInfo || {
    name: t(
      "المجلة الدولية لأبحاث العلاج الطبيعي وممارساته",
      "International Journal of Physical Therapy Research and Practice",
    ),
    issn: "1234-5678",
    frequency: t("شهرياَ", "Monthly"),
    language: t("عربي / إنجليزي", "Arabic / English"),
  };

  return (
    <section className="py-16 bg-background relative -mt-16 z-20">
      <div className="container-custom">
        <div className="bg-card rounded-3xl shadow-xl border border-border/50 p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-up">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {info.name}
              </h2>

              <div className="space-y-3 mb-6">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">ISSN:</span>{" "}
                  {info.issn}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {t("التكرار:", "Frequency:")}
                  </span>{" "}
                  {info.frequency}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {t("اللغة:", "Language:")}
                  </span>{" "}
                  {info.language}
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {t(
                  "المجلة السعودية للعلاج الطبيعي هي مجلة علمية محكمة تصدر عن الجمعية السعودية للعلاج الطبيعي. تهدف المجلة إلى نشر الأبحاث العلمية الأصيلة في مجال العلاج الطبيعي والتأهيل الطبي.",
                  "The Saudi Journal of Physical Therapy is a peer-reviewed scientific journal published by SPTA. The journal aims to publish original scientific research in physical therapy and medical rehabilitation.",
                )}
              </p>
            </div>

            <div data-aos="fade-up">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={heroImage}
                  alt={info.name}
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
