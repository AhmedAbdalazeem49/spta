import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  Building2,
  FileText,
  GraduationCap,
  Heart,
  Microscope,
  Stethoscope,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const WorkAreasSection = () => {
  const { t, isRTL } = useLanguage();
  const [activeArea, setActiveArea] = useState<number | null>(null);

const workAreas = [
  {
    id: 1,
    icon: Microscope,
    title: t("البحث العلمي", "Scientific Research"),
    subtitle: t(
      "تشجيع إجراء البحوث العلمية والدراسات الاستشارية",
      "Encouraging scientific research and consultancy studies",
    ),
    color: "from-emerald-500 to-teal-600",
    bgPattern: "bg-gradient-to-br from-emerald-500/10 to-teal-600/10",
    stats: {
      number: "1",
      label: t("مجلة علمية دولية", "International Journal"),
    },
    activities: [
      {
        icon: FileText,
        text: t(
          "إجراء البحوث العلمية والدراسات الاستشارية",
          "Conducting scientific research and consultancy studies",
        ),
      },
      {
        icon: BookOpen,
        text: t(
          "تأليف وترجمة الكتب العلمية",
          "Authoring and translating scientific books",
        ),
      },
      {
        icon: Award,
        text: t(
          "عقد الندوات العلمية وورش العمل والدورات",
          "Holding scientific seminars, workshops, and courses",
        ),
      },
      {
        icon: FileText,
        text: t(
          "إصدار الدراسات والنشرات والدوريات العلمية",
          "Publishing studies, newsletters, and scientific journals",
        ),
      },
      {
        icon: Building2,
        text: t(
          "المشاركة في المعارض المحلية والدولية",
          "Participation in local and international exhibitions",
        ),
      },
      {
        icon: Users,
        text: t(
          "دعوة العلماء والمفكرين للمشاركة في أنشطة الجمعية",
          "Inviting scholars and thinkers to participate in association activities",
        ),
      },
      {
        icon: Heart,
        text: t(
          "المساهمة في التوعية الصحية",
          "Contributing to public health awareness",
        ),
      },
    ],
    link: "/research",
    cta: t("ابدأ البحث", "Start Research"),
  },
];

  return (
    <section className="section-padding bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-accent font-semibold text-lg mb-4 block">
            {t("نشاطات الجمعية", "Association Activities")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("مجالات عملنا", "Our Areas of Work")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t(
              "نعمل في ثلاثة محاور رئيسية لتطوير مهنة العلاج الطبيعي في المملكة العربية السعودية تحقيقًا لأهداف رؤية 2030",
              "We work across three main pillars to develop the physical therapy profession in Saudi Arabia, aligned with Vision 2030 objectives",
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {workAreas.map((area, index) => (
            <motion.div
              key={area.id}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              onHoverStart={() => setActiveArea(area.id)}
              onHoverEnd={() => setActiveArea(null)}
              className={`relative rounded-3xl overflow-hidden ${area.bgPattern} border border-border/50 group`}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="relative p-8">
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${area.color} flex items-center justify-center shadow-lg`}
                  >
                    <area.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">
                      {area.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {area.subtitle}
                    </p>
                  </div>
                </div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-border/30"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span
                      className={`text-4xl font-bold bg-gradient-to-r ${area.color} bg-clip-text text-transparent`}
                    >
                      {area.stats.number}
                    </span>
                    <span className="text-muted-foreground">
                      {area.stats.label}
                    </span>
                  </div>
                </motion.div>

                <div className="space-y-3 mb-6">
                  {area.activities.map((activity, actIndex) => (
                    <motion.div
                      key={actIndex}
                      initial={{ x: isRTL ? 20 : -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * actIndex }}
                      className="flex items-center gap-3 group/item"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${area.color} bg-opacity-20 flex items-center justify-center group-hover/item:scale-110 transition-transform`}
                      >
                        <activity.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-foreground/80 group-hover/item:text-foreground transition-colors">
                        {activity.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <Link to={area.link}>
                  <Button
                    className={`w-full bg-gradient-to-r ${area.color} text-white border-0 hover:opacity-90 group/btn`}
                  >
                    {area.cta}
                    <ArrowRight
                      className={`w-4 h-4 ${isRTL ? "rotate-180 mr-2" : "ml-2"} group-hover/btn:translate-x-1 transition-transform`}
                    />
                  </Button>
                </Link>
              </div>

              <motion.div
                className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${area.color} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkAreasSection;
