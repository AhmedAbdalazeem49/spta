import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useInView } from "framer-motion";
import {
  Activity,
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
import { useRef, useState } from "react";

const WorkAreasSection = () => {
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const pillars = [
    {
      id: 0,
      icon: Microscope,
      keyword: t("البحث", "Research"),
      title: t("البحث العلمي", "Scientific Research"),
      color: "#10b981",
      glow: "rgba(16,185,129,0.15)",
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
            "Inviting scholars and thinkers to participate",
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
      stat: {
        value: "1",
        label: t("مجلة علمية دولية", "International Journal"),
      },
    },
    {
      id: 1,
      icon: GraduationCap,
      keyword: t("التدريب", "Training"),
      title: t("التطوير المهني", "Professional Development"),
      color: "#6366f1",
      glow: "rgba(99,102,241,0.15)",
      activities: [
        {
          icon: GraduationCap,
          text: t(
            "برامج متخصصة لتدريب أخصائيي العلاج الطبيعي",
            "Specialized training programs for physical therapists",
          ),
        },
        {
          icon: Award,
          text: t(
            "منح الشهادات المهنية المعتمدة",
            "Granting accredited professional certificates",
          ),
        },
        {
          icon: Brain,
          text: t(
            "ورش عمل التطوير المستمر",
            "Continuous development workshops",
          ),
        },
        {
          icon: Users,
          text: t(
            "برامج الإرشاد والتوجيه المهني",
            "Mentoring and professional guidance programs",
          ),
        },
        {
          icon: Activity,
          text: t(
            "تقييم الكفاءات المهنية",
            "Professional competency assessment",
          ),
        },
      ],
      stat: {
        value: "+20",
        label: t(
          "أكثر من 20 ورشة عمل ونشاط علمي سنوياَ",
          "More Than 20 workshops and scientific activities annually",
        ),
      },
    },
    // {
    //   id: 2,
    //   icon: Stethoscope,
    //   keyword: t("الرعاية", "Care"),
    //   title: t("الرعاية الصحية", "Healthcare"),
    //   color: "#f59e0b",
    //   glow: "rgba(245,158,11,0.15)",
    //   activities: [
    //     {
    //       icon: Heart,
    //       text: t(
    //         "تعزيز معايير الرعاية الصحية",
    //         "Enhancing healthcare standards",
    //       ),
    //     },
    //     {
    //       icon: Stethoscope,
    //       text: t(
    //         "دعم الممارسة السريرية للعلاج الطبيعي",
    //         "Supporting clinical physical therapy practice",
    //       ),
    //     },
    //     {
    //       icon: Users,
    //       text: t(
    //         "التواصل مع المرضى والمجتمع",
    //         "Engaging patients and the community",
    //       ),
    //     },
    //     {
    //       icon: Building2,
    //       text: t(
    //         "الشراكة مع المؤسسات الصحية",
    //         "Partnership with healthcare institutions",
    //       ),
    //     },
    //     {
    //       icon: Activity,
    //       text: t(
    //         "مراقبة جودة الخدمات الصحية",
    //         "Monitoring healthcare service quality",
    //       ),
    //     },
    //   ],
    //   stat: { value: "+3000", label: t("معالج مسجل", "Registered Therapists") },
    // },
  ];

  const active = pillars[activeTab];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-background overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 60%, ${active.glow}, transparent)`,
            transition: "background 0.6s ease",
          }}
        />
      </div>

      <div className="container-custom relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: active.color, transition: "color 0.4s" }}
          >
            {t("نشاطات الجمعية", "Association Activities")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            {t("مجالات عملنا", "Our Areas of Work")}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl text-base leading-relaxed">
            {t(
              "نعمل في ثلاثة محاور رئيسية لتطوير مهنة العلاج الطبيعي في المملكة العربية السعودية",
              "Three core pillars developing the physical therapy profession across Saudi Arabia",
            )}
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex gap-2 mb-12 flex-wrap"
        >
          {pillars.map((p) => {
            const Icon = p.icon;
            const isActive = activeTab === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className="relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border"
                style={{
                  background: isActive ? p.color : "transparent",
                  borderColor: isActive ? p.color : "hsl(var(--border))",
                  color: isActive ? "#fff" : "hsl(var(--muted-foreground))",
                  boxShadow: isActive ? `0 0 20px ${p.glow}` : "none",
                }}
              >
                <Icon className="w-4 h-4" />
                {p.keyword}
              </button>
            );
          })}
        </motion.div>

        {/* Main content panel */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-5 gap-8 items-start"
        >
          {/* Left: stat + title block */}
          <div className="lg:col-span-2 space-y-6">
            {/* Big stat card */}
            <div
              className="rounded-2xl p-8 border border-border/40"
              style={{ background: `${active.glow}` }}
            >
              <p
                className="text-6xl font-black tabular-nums leading-none"
                style={{ color: active.color }}
              >
                {active.stat.value}
              </p>
              <p className="text-muted-foreground text-sm mt-2 font-medium">
                {active.stat.label}
              </p>
            </div>

            {/* Title block */}
            <div className="space-y-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: active.glow }}
              >
                <active.icon
                  className="w-6 h-6"
                  style={{ color: active.color }}
                />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                {active.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(
                  "نسعى إلى تحقيق التميز في هذا المجال من خلال مبادرات استراتيجية تدعم رؤية ٢٠٣٠",
                  "We pursue excellence through strategic initiatives aligned with Vision 2030",
                )}
              </p>
            </div>

            {/* Pillar nav dots */}
            <div className="flex gap-2 pt-2">
              {pillars.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  className="h-1.5 rounded-full transition-all duration-400"
                  style={{
                    width: activeTab === p.id ? "2rem" : "0.375rem",
                    background:
                      activeTab === p.id ? p.color : "hsl(var(--border))",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: activity list */}
          <div className="lg:col-span-3 space-y-3">
            {active.activities.map((activity, i) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={`${activeTab}-${i}`}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-card/50 hover:border-border transition-colors group cursor-default"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: active.glow }}
                  >
                    <Icon className="w-4 h-4" style={{ color: active.color }} />
                  </div>
                  <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors leading-snug">
                    {activity.text}
                  </span>
                  <div
                    className="ms-auto w-1 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    style={{ background: active.color }}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkAreasSection;
