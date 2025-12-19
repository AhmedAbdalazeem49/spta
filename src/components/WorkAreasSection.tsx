import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Heart,
  Microscope,
  BookOpen,
  Stethoscope,
  Users,
  FileText,
  Award,
  ArrowRight,
  Building2,
  Brain,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const WorkAreasSection = () => {
  const { t, isRTL } = useLanguage();
  const [activeArea, setActiveArea] = useState<number | null>(null);

  const workAreas = [
    {
      id: 1,
      icon: GraduationCap,
      title: t("التعليم", "Education"),
      subtitle: t("التعليم المستمر والتطوير المهني", "Continuing Education & Professional Development"),
      color: "from-blue-500 to-blue-700",
      bgPattern: "bg-gradient-to-br from-blue-500/10 to-blue-700/10",
      stats: { number: "150+", label: t("دورة تدريبية", "Training Courses") },
      activities: [
        { icon: BookOpen, text: t("ورش العمل التخصصية", "Specialized Workshops") },
        { icon: Award, text: t("برامج الشهادات المهنية", "Professional Certificate Programs") },
        { icon: Users, text: t("المؤتمرات العلمية", "Scientific Conferences") },
        { icon: FileText, text: t("الكتيبات التعليمية", "Educational Booklets") },
      ],
      link: "/booklets",
      cta: t("استعرض البرامج", "Browse Programs"),
    },
    {
      id: 2,
      icon: Heart,
      title: t("الصحة", "Health"),
      subtitle: t("تعزيز جودة الرعاية الصحية", "Enhancing Healthcare Quality"),
      color: "from-red-500 to-rose-600",
      bgPattern: "bg-gradient-to-br from-red-500/10 to-rose-600/10",
      stats: { number: "50+", label: t("مبادرة صحية", "Health Initiatives") },
      activities: [
        { icon: Stethoscope, text: t("التوعية الصحية المجتمعية", "Community Health Awareness") },
        { icon: Activity, text: t("برامج إعادة التأهيل", "Rehabilitation Programs") },
        { icon: Building2, text: t("الشراكات الصحية", "Healthcare Partnerships") },
        { icon: Brain, text: t("الممارسة المبنية على الأدلة", "Evidence-Based Practice") },
      ],
      link: "/about/what-is-pt",
      cta: t("اكتشف المزيد", "Discover More"),
    },
    {
      id: 3,
      icon: Microscope,
      title: t("البحث", "Research"),
      subtitle: t("تطوير البحث العلمي في العلاج الطبيعي", "Advancing Scientific Research in PT"),
      color: "from-emerald-500 to-teal-600",
      bgPattern: "bg-gradient-to-br from-emerald-500/10 to-teal-600/10",
      stats: { number: "200+", label: t("بحث علمي منشور", "Published Research") },
      activities: [
        { icon: FileText, text: t("المجلة العلمية", "Scientific Journal") },
        { icon: BookOpen, text: t("قواعد البيانات العلمية", "Scientific Databases") },
        { icon: Award, text: t("جوائز البحث العلمي", "Research Awards") },
        { icon: Users, text: t("مركز الأبحاث", "Research Center") },
      ],
      link: "/research",
      cta: t("ابدأ البحث", "Start Research"),
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-accent font-semibold text-lg mb-4 block">
            {t("مجالات التميز", "Areas of Excellence")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("مجالات عملنا", "Our Areas of Work")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t(
              "نعمل في ثلاثة محاور رئيسية لتطوير مهنة العلاج الطبيعي في المملكة العربية السعودية وتحقيق رؤية 2030",
              "We work across three main pillars to develop the physical therapy profession in Saudi Arabia and achieve Vision 2030"
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
              {/* Animated Background Gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              {/* Content */}
              <div className="relative p-8">
                {/* Icon & Title */}
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
                    <p className="text-muted-foreground text-sm">{area.subtitle}</p>
                  </div>
                </div>

                {/* Stats Counter */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-border/30"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className={`text-4xl font-bold bg-gradient-to-r ${area.color} bg-clip-text text-transparent`}>
                      {area.stats.number}
                    </span>
                    <span className="text-muted-foreground">{area.stats.label}</span>
                  </div>
                </motion.div>

                {/* Activities List */}
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
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${area.color} bg-opacity-20 flex items-center justify-center group-hover/item:scale-110 transition-transform`}>
                        <activity.icon className="w-4 h-4 text-foreground" />
                      </div>
                      <span className="text-foreground/80 group-hover/item:text-foreground transition-colors">
                        {activity.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link to={area.link}>
                  <Button
                    className={`w-full bg-gradient-to-r ${area.color} text-white border-0 hover:opacity-90 group/btn`}
                  >
                    {area.cta}
                    <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180 mr-2" : "ml-2"} group-hover/btn:translate-x-1 transition-transform`} />
                  </Button>
                </Link>
              </div>

              {/* Hover Glow Effect */}
              <motion.div
                className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${area.color} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/30"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "5000+", label: t("عضو مسجل", "Registered Members"), icon: Users },
              { number: "25+", label: t("سنة من العطاء", "Years of Excellence"), icon: Award },
              { number: "13", label: t("فرع إقليمي", "Regional Branches"), icon: Building2 },
              { number: "100+", label: t("شريك استراتيجي", "Strategic Partners"), icon: Heart },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, type: "spring" }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <span className="text-3xl md:text-4xl font-bold text-foreground block mb-1">
                  {stat.number}
                </span>
                <span className="text-muted-foreground text-sm">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkAreasSection;
