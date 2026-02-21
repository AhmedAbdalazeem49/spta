"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

// Import image
import hero1 from "@/assets/hero-1.webp";

export default function About() {
  const { isRTL, t } = useLanguage();

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div data-aos="fade-up">
            <span className="text-accent font-semibold text-lg mb-4 block">
              {t("من نحن", "About Us")}
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {t(
                "الجمعية السعودية للعلاج الطبيعي",
                "Saudi Physical Therapy Association"
              )}
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {t(
                "تأسست الجمعية السعودية للعلاج الطبيعي بهدف تطوير مهنة العلاج الطبيعي في المملكة العربية السعودية، وتعزيز البحث العلمي والممارسة المبنية على الأدلة، وتوفير فرص التعليم المستمر للممارسين.",
                "The Saudi Physical Therapy Association was established to develop the physical therapy profession in Saudi Arabia, promote scientific research and evidence-based practice, and provide continuing education opportunities for practitioners."
              )}
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t(
                "نسعى لتحقيق رؤية المملكة 2030 من خلال رفع مستوى الخدمات الصحية وتأهيل الكوادر الوطنية المتخصصة في مجال العلاج الطبيعي.",
                "We strive to achieve Saudi Vision 2030 by raising the level of healthcare services and qualifying national cadres specialized in physical therapy."
              )}
            </p>

            <Link to="/about">
              <Button className="gap-2" size="lg">
                {t("اقرأ المزيد", "Read More")}
                <ArrowRight
                  className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`}
                />
              </Button>
            </Link>
          </div>

          {/* Image Section */}
          <div className="relative" data-aos="fade-left" data-aos-delay="200">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={hero1}
                alt={t("العلاج الطبيعي", "Physical Therapy")}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>

            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-8 right-0 lg:-right-8 bg-accent text-accent-foreground p-6 rounded-2xl shadow-lg"
            >
              <span className="text-4xl font-bold block">25+</span>
              <span className="text-sm">
                {t("سنة من الخبرة", "Years of Experience")}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
