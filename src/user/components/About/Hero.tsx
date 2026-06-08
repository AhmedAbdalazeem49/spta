"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

import sptaSpeaker1 from "@/assets/spta-speaker-1.jpeg";

const Hero = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative min-h-[60vh] flex items-center bg-primary">
      <div className="absolute inset-0">
        <img src={sptaSpeaker1} alt="" className="w-full h-full object-cover opacity-20" />
      </div>

      <div className="container-custom relative z-10 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`max-w-3xl ${isRTL ? "text-right" : "text-left"}`}
        >
          <span className="text-primary-foreground/80 font-medium text-lg mb-4 block">
            {t("نبذة تعريفية", "About Us")}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            {t(
              "الجمعية السعودية للعلاج الطبيعي",
              "Saudi Physical Therapy Association"
            )}
          </h1>
          <p className="text-xl text-primary-foreground/80">
            {t(
              "إحدى الجمعيات العلمية التابعة لجامعة الملك سعود، تعمل على تطوير مهنة العلاج الطبيعي وتحقيق رؤية المملكة 2030",
              "A scientific society under King Saud University, dedicated to advancing the physical therapy profession in alignment with Saudi Vision 2030"
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
