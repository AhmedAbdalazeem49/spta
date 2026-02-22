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
          <motion.div
            data-aos="fade-right"
            className="bg-card rounded-2xl p-8 shadow-md card-hover"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t("الرؤية", "Vision")}
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t(
                "أن نكون المرجع الأول في تطوير مهنة العلاج الطبيعي في المملكة العربية السعودية والشرق الأوسط، وتحقيق التميز في البحث العلمي والممارسة السريرية.",
                "To be the leading reference in developing the physical therapy profession in Saudi Arabia and the Middle East, achieving excellence in scientific research and clinical practice."
              )}
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            data-aos="fade-left"
            data-aos-delay="100"
            className="bg-card rounded-2xl p-8 shadow-md card-hover"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t("الرسالة", "Mission")}
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t(
                "تعزيز مهنة العلاج الطبيعي من خلال التعليم المستمر والبحث العلمي والممارسة المبنية على الأدلة، وبناء مجتمع مهني متكامل يخدم الصحة العامة.",
                "Enhance the physical therapy profession through continuing education, scientific research, and evidence-based practice, building an integrated professional community serving public health."
              )}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
