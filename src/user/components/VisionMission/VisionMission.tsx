"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const VisionMission = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20 bg-background relative -mt-16 z-20">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-3xl p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 end-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-4">
                {t("رؤيتنا", "Our Vision")}
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                {t(
                  "أن تكون الجمعية مرجعًا ومنظمًا لمهنة العلاج الطبيعي في المملكة، ومنبرًا يمثل المختصين أمام الجهات والمنظمات المحلية والدولية.",
                  "To be the authoritative reference and regulatory body for the physical therapy profession in the Kingdom, serving as a platform that represents specialists before local and international organizations."
                )}
              </p>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-accent to-amber-600 text-white rounded-3xl p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 end-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-4">
                {t("رسالتنا", "Our Mission")}
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                {t(
                  "الريادة العلمية والمهنية للعاملين في مجال العلاج الطبيعي، والسعي دائمًا إلى نشر التوعية وخدمة المجتمع.",
                  "To lead in scientific and professional excellence for physical therapy practitioners, while continuously striving to spread awareness and serve the community."
                )}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
