"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import sptaConference2 from "@/assets/spta-conference-2.jpg";

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
                "تأسست الجمعية السعودية للعلاج الطبيعي لتمارس نشاطاتها في تطوير المعارف النظرية والتطبيقية , وتقديم الاستشارات والدراسات العلمية والتطبيقات للقطاعات الصحية العامة والخاصة في مجال العلاج الطبيعي .",
                "The Saudi Physical Therapy Association was established to carry out activities aimed at developing both theoretical and practical knowledge, and to provide consultations, scientific studies, and practical applications to the public and private healthcare sectors in the field of physical therapy."
              )}
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t(
                "تمارس الجمعية نشاطاتها في تطوير المعارف النظرية والتطبيقية، وتقديم الاستشارات والدراسات العلمية والتطبيقية للقطاعات الصحية العامة والخاصة في مجال العلاج الطبيعي.",
                "The association carries out its activities in advancing theoretical and applied knowledge, and providing consultations and scientific studies to both public and private healthcare sectors in the field of physical therapy."
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
                src={sptaConference2}
                alt={t("فعاليات الجمعية", "SPTA Events")}
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
              <span className="text-4xl font-bold block">13</span>
              <span className="text-sm">
                {t("فرعاً حول المملكة", "Branches Across KSA")}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
