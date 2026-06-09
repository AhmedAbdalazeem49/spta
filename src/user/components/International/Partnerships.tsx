"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useInView } from "framer-motion";
import { Globe, Brain, Baby, Heart, Activity, Users } from "lucide-react";
import { useRef } from "react";

export default function Partnerships() {
  const { t, isRTL } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const groups = [
    {
      icon: Heart,
      color: "#e11d48",
      glow: "rgba(225,29,72,0.12)",
      title: t(
        "مجموعة العلاج الطبيعي في مجال فيروس نقص المناعة البشرية (HIV/AIDS)، والأورام، والرعاية التلطيفية ورعاية المحتضرين",
        "HIV/AIDS, Oncology & Palliative Care Physiotherapy Group",
      ),
      desc: t(
        "بما يدعم تطوير الخدمات التأهيلية وتحسين جودة الحياة للمرضى.",
        "Supporting rehabilitation services and improving patient quality of life.",
      ),
    },
    {
      icon: Brain,
      color: "#6366f1",
      glow: "rgba(99,102,241,0.12)",
      title: t(
        "مجموعة العلاج الطبيعي للأعصاب (Neurology)",
        "Neurology Physiotherapy Group",
      ),
      desc: t(
        "تعزيز الممارسات المبنية على الأدلة العلمية في تأهيل المرضى المصابين بالاضطرابات العصبية.",
        "Promoting evidence-based neurological rehabilitation practice.",
      ),
    },
    {
      icon: Baby,
      color: "#0ea5e9",
      glow: "rgba(14,165,233,0.12)",
      title: t(
        "مجموعة العلاج الطبيعي للأطفال (Paediatrics)",
        "Paediatrics Physiotherapy Group",
      ),
      desc: t(
        "تطوير الكفاءات المهنية والارتقاء بالخدمات المقدمة للأطفال في مختلف المراحل العمرية.",
        "Developing professional competencies and improving pediatric care services.",
      ),
    },
    {
      icon: Users,
      color: "#d97706",
      glow: "rgba(217,119,6,0.12)",
      title: t(
        "مجموعة صحة الحوض وصحة المرأة (Pelvic and Women's Health)",
        "Pelvic and Women's Health Physiotherapy Group",
      ),
      desc: t(
        "دعم الممارسات المتخصصة في صحة المرأة وتأهيل اضطرابات قاع الحوض.",
        "Supporting specialized women's health and pelvic floor rehabilitation.",
      ),
    },
    {
      icon: Activity,
      color: "#10b981",
      glow: "rgba(16,185,129,0.12)",
      title: t(
        "مجموعة العلاج الطبيعي الرياضي (Sports)",
        "Sports Physiotherapy Group",
      ),
      desc: t(
        "تطوير مجالات الوقاية من الإصابات الرياضية وعلاجها وإعادة التأهيل وتحسين الأداء البدني للرياضيين.",
        "Advancing sports injury prevention, rehabilitation and performance enhancement.",
      ),
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 bg-background overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container-custom relative z-10 max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-5">
            {t(
              "العلاقات الدولية للجمعية السعودية للعلاج الطبيعي",
              "International Relations of the Saudi Physical Therapy Association",
            )}
          </h2>

          <p className="text-muted-foreground max-w-3xl leading-relaxed text-base">
            {t(
              "تولي الجمعية السعودية للعلاج الطبيعي اهتمامًا كبيرًا بتعزيز علاقاتها الدولية وبناء شراكات استراتيجية مع المنظمات والمجموعات التخصصية العالمية التابعة لـ World Physiotherapy، بما يسهم في تطوير مهنة العلاج الطبيعي، ودعم تبادل الخبرات والمعارف، وتعزيز جودة الممارسة المهنية وفقًا لأفضل المعايير الدولية. وترتبط الجمعية بعلاقات مهنية وعلمية مع World Physiotherapy، مما يتيح لها المشاركة في المبادرات والبرامج الدولية، والاستفادة من أحدث المستجدات العلمية والمهنية، والإسهام في تطوير السياسات والممارسات المتعلقة بالعلاج الطبيعي على المستوى العالمي.",
              "The Saudi Physical Therapy Association places great importance on strengthening its international relations and building strategic partnerships with global professional groups under World Physiotherapy, contributing to the development of the profession, knowledge exchange, and improving clinical standards globally. The association maintains professional and scientific ties with World Physiotherapy, enabling participation in international initiatives and policy development.",
            )}
          </p>
        </motion.div>

        {/* GROUPS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((g, i) => {
            const Icon = g.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="rounded-2xl border border-border/50 bg-card/50 p-5"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: g.glow }}
                >
                  <Icon className="w-5 h-5" style={{ color: g.color }} />
                </div>

                <h4 className="text-sm font-bold text-foreground mb-2">
                  {g.title}
                </h4>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {g.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Closing */}
        <div className="mt-10 text-sm text-muted-foreground leading-relaxed">
          {t(
            "ومن خلال هذه العلاقات الدولية الفاعلة، تؤكد الجمعية السعودية للعلاج الطبيعي التزامها بتعزيز التعاون العالمي، وتبادل المعرفة والخبرات، ودعم التطوير المهني المستمر لأخصائيي العلاج الطبيعي في المملكة العربية السعودية، بما ينعكس إيجابًا على جودة الخدمات الصحية المقدمة للمجتمع.",
            "Through these active international relations, the Saudi Physical Therapy Association reaffirms its commitment to global collaboration, knowledge exchange, and continuous professional development of physical therapists in Saudi Arabia, enhancing healthcare quality.",
          )}
        </div>
      </div>
    </section>
  );
}
