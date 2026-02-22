"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

// Import hero image
import hero2 from "@/assets/hero-2.jpg";

const Hero = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative min-h-[60vh] flex items-center bg-primary">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={hero2}
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`max-w-3xl ${isRTL ? "text-right" : "text-left"}`}
        >
          <span className="text-primary-foreground/80 font-medium text-lg mb-4 block">
            {t("من نحن", "About Us")}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            {t(
              "الجمعية السعودية للعلاج الطبيعي",
              "Saudi Physical Therapy Association"
            )}
          </h1>
          <p className="text-xl text-primary-foreground/80">
            {t(
              "نعمل على تطوير مهنة العلاج الطبيعي وتعزيز البحث العلمي منذ أكثر من 25 عاماً",
              "We have been working to develop the physical therapy profession and promote scientific research for over 25 years"
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
