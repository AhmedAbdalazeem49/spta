"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Import hero images
import hero1 from "@/assets/hero-1.webp";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

export default function Hero() {
  const { isRTL, t } = useLanguage();

  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: hero1,
      title: t(
        "الجمعية السعودية للعلاج الطبيعي",
        "Saudi Physical Therapy Association"
      ),
      subtitle: t(
        "نحو تطوير مهنة العلاج الطبيعي في المملكة",
        "Advancing Physical Therapy in Saudi Arabia"
      ),
      cta: t("انضم إلينا", "Join Us"),
      ctaLink: "/join", // <-- add your route here
      learnMoreLink: "/about", // <-- add your route here
    },
    {
      image: hero2,
      title: t("المكتبة الإلكترونية", "Digital Library"),
      subtitle: t(
        "وصول مجاني لأحدث المراجع والأبحاث العلمية",
        "Free access to the latest references and research"
      ),
      cta: t("استكشف المكتبة", "Explore Library"),
      ctaLink: "/library",
      learnMoreLink: "/library/about",
    },
    {
      image: hero3,
      title: t("البحث العلمي", "Scientific Research"),
      subtitle: t(
        "قواعد بيانات متقدمة وأدوات بحثية متخصصة",
        "Advanced databases and specialized research tools"
      ),
      cta: t("ابدأ البحث", "Start Research"),
      ctaLink: "/research",
      learnMoreLink: "/research/guidelines",
    },
    {
      image: hero4,
      title: t("المؤتمرات والفعاليات", "Conferences & Events"),
      subtitle: t(
        "انضم لمجتمع العلاج الطبيعي في المملكة",
        "Join the Physical Therapy community"
      ),
      cta: t("عرض الفعاليات", "View Events"),
      ctaLink: "/events",
      learnMoreLink: "/events",
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
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slider */}
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
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Content */}
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
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
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
                {/* Primary CTA Button */}
                <Link to={heroSlides[currentSlide].ctaLink}>
                  <Button size="lg" className="btn-hero gap-2 text-lg">
                    {heroSlides[currentSlide].cta}
                    <ArrowRight
                      className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`}
                    />
                  </Button>
                </Link>

                {/* Learn More Button */}
                <Link to={heroSlides[currentSlide].learnMoreLink}>
                  <Button size="lg" variant="outline" className="text-lg">
                    {t("اعرف المزيد", "Learn More")}
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
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "w-10 bg-primary-foreground"
                  : "w-2 bg-primary-foreground/40"
              }`}
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
