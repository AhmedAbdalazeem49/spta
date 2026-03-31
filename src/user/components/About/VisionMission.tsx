"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";

const VisionMission = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Vision */}
          <motion.div data-aos="fade-right" className="bg-card rounded-2xl p-8 shadow-md card-hover">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t("الرؤية", "Vision")}
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t(
                "أن تكون الجمعية مرجعًا ومنظمًا لمهنة العلاج الطبيعي في المملكة، ومنبرًا يمثل المختصين أمام الجهات والمنظمات المحلية والدولية.",
                "To be the authoritative reference and regulatory body for the physical therapy profession in the Kingdom, serving as a platform that represents specialists before local and international organizations."
              )}
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div data-aos="fade-left" data-aos-delay="100" className="bg-card rounded-2xl p-8 shadow-md card-hover">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t("الرسالة", "Mission")}
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t(
                "الريادة العلمية والمهنية للعاملين في مجال العلاج الطبيعي، والسعي دائمًا إلى نشر التوعية وخدمة المجتمع.",
                "To lead in scientific and professional excellence for physical therapy practitioners, while continuously striving to spread awareness and serve the community."
              )}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
