import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";

type MembershipKey = "active" | "affiliate" | "student" | "intern" | "honorary";

export interface Plan {
  key: MembershipKey;
  nameAr: string;
  nameEn: string;
  price: number;
  descriptionAr: string;
  descriptionEn: string;
  featuresAr: string[];
  featuresEn: string[];
}

const planStyles: Record<MembershipKey, { accent: string; glow: string }> = {
  active: {
    accent: "from-blue-600 via-blue-500 to-indigo-500",
    glow: "group-hover:shadow-blue-500/20",
  },
  affiliate: {
    accent: "from-amber-500 via-yellow-400 to-orange-400",
    glow: "group-hover:shadow-amber-500/20",
  },
  student: {
    accent: "from-emerald-600 via-teal-500 to-cyan-500",
    glow: "group-hover:shadow-emerald-500/20",
  },
  intern: {
    accent: "from-purple-600 via-indigo-500 to-violet-500",
    glow: "group-hover:shadow-purple-500/20",
  },
  honorary: {
    accent: "from-purple-600 via-indigo-500 to-violet-500",
    glow: "group-hover:shadow-purple-500/20",
  },
};

const plans: Plan[] = [
  {
    key: "affiliate",
    nameAr: "عضو عامل أو منتسب",
    nameEn: "Active or Affiliate Member",
    price: 200,
    descriptionAr: "عضوية للمنتسبين في المجال الصحي",
    descriptionEn: "Membership for affiliated professionals",
    featuresAr: ["مشاركة جزئية", "فعاليات مختارة", "ورش عمل", "دعم مهني"],
    featuresEn: [
      "Partial access",
      "Selected events",
      "Workshops",
      "Professional support",
    ],
  },
  {
    key: "intern",
    nameAr: "طالب امتياز",
    nameEn: "Intern Student",
    price: 150,
    descriptionAr: "لطلاب التدريب العملي والامتياز",
    descriptionEn: "For internship and clinical training students",
    featuresAr: ["تدريب عملي", "تقييمات", "إشراف أكاديمي", "خبرة ميدانية"],
    featuresEn: [
      "Practical training",
      "Evaluations",
      "Academic supervision",
      "Field experience",
    ],
  },
  {
    key: "student",
    nameAr: "طالب",
    nameEn: "Student",
    price: 100,
    descriptionAr: "عضوية للطلاب في التخصص",
    descriptionEn: "Student membership for learners",
    featuresAr: ["ورش عمل", "تدريب", "مواد تعليمية", "فعاليات طلابية"],
    featuresEn: [
      "Workshops",
      "Training",
      "Learning materials",
      "Student events",
    ],
  },
  {
    key: "honorary",
    nameAr: "العضوية الشرفية",
    nameEn: "Honorary Membership",
    price: 0,
    descriptionAr: "تُمنح بقرار الجمعية العمومية بناءً على ترشيح مجلس الإدارة",
    descriptionEn: "Granted by the General Assembly upon Board nomination",
    featuresAr: [
      "الإعفاء من سداد الاشتراك",
      "حضور الجلسات",
      "المشاركة في المناقشات",
    ],
    featuresEn: [
      "Exempt from fees",
      "Attend sessions",
      "Participate in discussions",
    ],
  },
];

export default function Plans({
  t,
  isRTL,
  onSelect,
}: {
  t: (ar: string, en: string) => string;
  isRTL: boolean;
  onSelect: (plan: Plan) => void;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {plans.map((plan, index) => {
        const style = planStyles[plan.key];

        return (
          <motion.div
            key={plan.key}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.12,
            }}
            className="group relative"
          >
            {/* CARD */}
            <div
              className={`
                relative overflow-hidden rounded-3xl border border-border/60
                bg-gradient-to-b from-background to-background/60
                shadow-lg hover:shadow-2xl transition-all duration-500
                hover:-translate-y-2 ${style.glow}
              `}
            >
              {/* TOP GRADIENT BAR */}
              <div className={`h-2 w-full bg-gradient-to-r ${style.accent}`} />

              {/* GLOW BACKGROUND */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <div
                  className={`absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl bg-gradient-to-r ${style.accent} opacity-20`}
                />
              </div>

              <div className="relative p-10 flex flex-col h-full">
                {/* HEADER */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold">
                      {t(plan.nameAr, plan.nameEn)}
                    </h3>

                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed max-w-md">
                      {t(plan.descriptionAr, plan.descriptionEn)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    {plan.key.toUpperCase()}
                  </div>
                </div>

                {/* PRICE */}
                <div className="mb-8">
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-black text-primary">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground mb-2">
                      {t("ريال", "SAR")}
                    </span>
                  </div>
                </div>

                {/* FEATURES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                  {(isRTL ? plan.featuresAr : plan.featuresEn).map((f, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-sm bg-muted/30 rounded-xl p-3"
                    >
                      <Check className="w-4 h-4 text-primary mt-0.5" />
                      <span className="text-muted-foreground">{f}</span>
                    </div>
                  ))}
                </div>

                {/* ACTION */}
                {plan.key === "honorary" ? (
                  <a
                    href="/contact"
                    className={`
      relative overflow-hidden w-full rounded-2xl px-6 py-4
      font-semibold text-white transition-all duration-300
      bg-gradient-to-r ${style.accent}
      hover:scale-[1.02] active:scale-[0.98]
      shadow-lg flex items-center justify-center gap-2
    `}
                  >
                    {t("تواصل معنا", "Contact Us")}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <button
                    onClick={() => onSelect(plan)}
                    className={`
      relative overflow-hidden w-full rounded-2xl px-6 py-4
      font-semibold text-white transition-all duration-300
      bg-gradient-to-r ${style.accent}
      hover:scale-[1.02] active:scale-[0.98]
      shadow-lg
    `}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {t("اشترك الآن", "Register Now")}
                      <ArrowRight className="w-4 h-4" />
                    </span>

                    {/* BUTTON GLOW */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition bg-white blur-xl" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
