"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import sptaEvent1 from "@/assets/hero-1.jpg";
import sptaCeremony1 from "@/assets/spta-ceremony-1.jpg";
import sptaAward1 from "@/assets/spta-community-1.jpg";
import sptaConference1 from "@/assets/spta-conference-1.jpg";

export default function Hero() {
  const { isRTL, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: sptaEvent1,
      title: t(
        "الجمعية السعودية للعلاج الطبيعي",
        "Saudi Physical Therapy Association",
      ),
      subtitle: t(
        "مرجعًا ومنظمًا لمهنة العلاج الطبيعي في المملكة العربية السعودية",
        "The leading reference and regulator of the physical therapy profession in Saudi Arabia",
      ),
      cta: t("انضم إلينا", "Join Us"),
      ctaLink: "/contact",
    },
    {
      image: sptaAward1,
      title: t(
        "المؤتمر السعودي الدولي للعلاج الطبيعي",
        "Saudi International Physiotherapy Conference",
      ),
      subtitle: t(
        "ملتقى الخبراء والمتخصصين من جميع أنحاء العالم",
        "A gathering of experts and specialists from around the world",
      ),
      cta: t("عرض الفعاليات", "View Events"),
      ctaLink: "/news",
    },
    {
      image: sptaCeremony1,
      title: t(
        "الريادة العلمية والمهنية",
        "Scientific & Professional Leadership",
      ),
      subtitle: t(
        "السعي دائمًا إلى نشر التوعية وخدمة المجتمع",
        "Continuously striving to spread awareness and serve the community",
      ),
      cta: t("اكتشف المزيد", "Discover More"),
      ctaLink: "/about/vision-mission",
    },
    {
      image: sptaConference1,
      title: t("التعاون والشراكات", "Collaboration & Partnerships"),
      subtitle: t(
        "شراكات استراتيجية مع جهات حكومية وخاصة محلية ودولية",
        "Strategic partnerships with government and private entities locally and internationally",
      ),
      cta: t("تعرف علينا", "Learn About Us"),
      ctaLink: "/about",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );

  return (
    <section className="relative h-[550px] overflow-hidden">
      <AnimatePresence mode="wait">
        {heroSlides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                {/* Image (mobile-safe fix) */}
                <img
                  src={slide.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
              </motion.div>
            ),
        )}
      </AnimatePresence>

      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className={`max-w-3xl ${isRTL ? "text-right" : "text-left"}`}
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-2xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
              >
                {heroSlides[currentSlide].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl text-primary-foreground/90 mb-10"
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex gap-4 flex-wrap"
              >
                <Link to={heroSlides[currentSlide].ctaLink}>
                  <Button size="lg" className="btn-hero gap-2 text-lg">
                    {heroSlides[currentSlide].cta}
                    <ArrowRight
                      className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`}
                    />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
        >
          {isRTL ? (
            <ChevronRight className="w-6 h-6 text-primary-foreground" />
          ) : (
            <ChevronLeft className="w-6 h-6 text-primary-foreground" />
          )}
        </button>
        <div className="flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 ${index === currentSlide ? "w-10 bg-primary-foreground" : "w-2 bg-primary-foreground/40"}`}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
        >
          {isRTL ? (
            <ChevronLeft className="w-6 h-6 text-primary-foreground" />
          ) : (
            <ChevronRight className="w-6 h-6 text-primary-foreground" />
          )}
        </button>
      </div>
    </section>
  );
}
