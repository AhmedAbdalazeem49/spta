import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  GraduationCap,
  Lock,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ─── Types ───────────────────────────────────────────────────────────────────

type PlanKey = "general" | "honorary" | "affiliate";

interface Plan {
  key: PlanKey;
  id: number;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  priceAr: string;
  priceEn: string;
  durationAr: string;
  durationEn: string;
  isFree: boolean;
  priceValue: number | null;
  featuresAr: string[];
  featuresEn: string[];
  Icon: React.ElementType;
  badge?: { ar: string; en: string };
}

// ─── Hardcoded Plans ──────────────────────────────────────────────────────────

const PLANS: Plan[] = [
  {
    key: "general",
    id: 1,
    nameAr: "العضوية العامة",
    nameEn: "General Membership",
    descriptionAr: "للمتخصصين في مجال العلاج الطبيعي المقيمين بالمملكة",
    descriptionEn: "For physiotherapy professionals residing in Saudi Arabia",
    priceAr: "اشتراك سنوي",
    priceEn: "Annual subscription",
    durationAr: "12 شهراً",
    durationEn: "12 months",
    isFree: false,
    priceValue: null,
    featuresAr: [
      "الحصول على درجة البكالوريوس في العلاج الطبيعي أو ما يعادلها",
      "أن يكون المتقدم من المتخصصين في المجال",
      "الإقامة داخل المملكة العربية السعودية",
      "سداد الاشتراكات السنوية",
      "صدور قرار مجلس الإدارة بالقبول",
    ],
    featuresEn: [
      "Bachelor's degree in physiotherapy or equivalent",
      "Applicant must be a specialized professional in the field",
      "Residency inside Saudi Arabia",
      "Payment of annual subscription fees",
      "Board of Directors approval decision",
    ],
    Icon: ShieldCheck,
    badge: { ar: "الأكثر طلباً", en: "Most Requested" },
  },
  {
    key: "honorary",
    id: 2,
    nameAr: "العضوية الشرفية",
    nameEn: "Honorary Membership",
    descriptionAr: "تُمنح تقديراً للإسهامات المتميزة في المجال",
    descriptionEn: "Granted in recognition of distinguished contributions",
    priceAr: "مجانية",
    priceEn: "Free",
    durationAr: "مدى الحياة",
    durationEn: "Lifetime",
    isFree: true,
    priceValue: 0,
    featuresAr: [
      "تُمنح بقرار الجمعية العمومية بناءً على ترشيح مجلس الإدارة",
      "تُعفى من سداد أي اشتراكات مالية",
      "حق حضور الجلسات العامة والمشاركة في المناقشات",
    ],
    featuresEn: [
      "Granted by General Assembly decision upon Board nomination",
      "Exempt from all financial subscription fees",
      "Right to attend general sessions and participate in discussions",
    ],
    Icon: Star,
  },
  {
    key: "affiliate",
    id: 3,
    nameAr: "عضوية الانتساب",
    nameEn: "Affiliate Membership",
    descriptionAr: "للطلاب والمهتمين بمجال العلاج الطبيعي",
    descriptionEn: "For students and enthusiasts in physiotherapy",
    priceAr: "اشتراك سنوي مخفض",
    priceEn: "Discounted annual fee",
    durationAr: "12 شهراً",
    durationEn: "12 months",
    isFree: false,
    priceValue: null,
    featuresAr: [
      "للطلاب الجامعيين في مجال العلاج الطبيعي",
      "للعاملين والمهتمين غير المؤهلين للعضوية العاملة",
      "المشاركة في الفعاليات والبرامج التدريبية",
    ],
    featuresEn: [
      "University students in physiotherapy programs",
      "Practitioners and enthusiasts not meeting General Membership criteria",
      "Participation in events and training programs",
    ],
    Icon: GraduationCap,
  },
];

// ─── Payment Methods ───────────────────────────────────────────────────────────

// ─── Plan Card ─────────────────────────────────────────────────────────────────

const planStyles: Record<
  PlanKey,
  { accent: string; glow: string; iconBg: string }
> = {
  general: {
    accent: "from-blue-600 to-blue-500",
    glow: "group-hover:shadow-blue-100 dark:group-hover:shadow-blue-900/30",
    iconBg: "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
  },
  honorary: {
    accent: "from-amber-500 to-yellow-400",
    glow: "group-hover:shadow-amber-100 dark:group-hover:shadow-amber-900/30",
    iconBg: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
  },
  affiliate: {
    accent: "from-teal-600 to-emerald-500",
    glow: "group-hover:shadow-teal-100 dark:group-hover:shadow-teal-900/30",
    iconBg: "bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400",
  },
};

interface PlanCardProps {
  plan: Plan;
  index: number;
  onSelect: (plan: Plan) => void;
  isRTL: boolean;
  t: (ar: string, en: string) => string;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, index, isRTL, t }) => {
  const style = planStyles[plan.key];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      className="h-full"
    >
      <div
        className={`group relative h-full flex flex-col rounded-3xl border border-border/60 bg-background
          overflow-hidden cursor-default
          transition-all duration-500
          hover:border-border hover:shadow-2xl ${style.glow}
          hover:-translate-y-2`}
      >
        {/* Top accent bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${style.accent}`} />

        {/* Badge */}
        {plan.badge && (
          <div className={`absolute top-5 ${isRTL ? "left-5" : "right-5"}`}>
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary text-primary-foreground">
              <Sparkles className="w-3 h-3" />
              {t(plan.badge.ar, plan.badge.en)}
            </span>
          </div>
        )}

        <div className="flex flex-col flex-1 p-8">
          {/* Icon + Title */}
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${style.iconBg} transition-transform duration-300 group-hover:scale-110`}
          >
            <plan.Icon className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-bold tracking-tight mb-1">
            {t(plan.nameAr, plan.nameEn)}
          </h3>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {t(plan.descriptionAr, plan.descriptionEn)}
          </p>

          {/* Price */}
          <div className="mb-6 pb-6 border-b border-border/50">
            {plan.isFree ? (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {t("مجانية", "Free")}
                </span>
                <span className="text-sm text-muted-foreground">
                  — {t(plan.durationAr, plan.durationEn)}
                </span>
              </div>
            ) : (
              <div>
                <p className="text-2xl font-bold">
                  {t(plan.priceAr, plan.priceEn)}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {t(plan.durationAr, plan.durationEn)}
                </p>
              </div>
            )}
          </div>

          {/* Features */}
          <ul className="space-y-3 flex-1 mb-8">
            {(isRTL ? plan.featuresAr : plan.featuresEn).map((f, fi) => (
              <li key={fi} className="flex items-start gap-2.5 text-sm">
                <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span className="text-muted-foreground leading-snug">{f}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => onSelect(plan)}
            className={`w-full group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-md transition-all duration-300 hover:shadow-xl hover:bg-primary/90 mt-auto`}
          >
            {t("تسجيل بالعضوية", "Register Membership")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

const MembershipSubscribePage = () => {
  const { t, isRTL } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSelectPlan = (plan: Plan) => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: { pathname: "/membership" } },
      });
      return;
    }
    
    // If authenticated, go to payment page
    navigate("/payment", {
      state: {
        type: "membership",
        item: plan,
      },
    });
  };

  return (
    <>
      {/* ── Plans Section ── */}
      <section className="py-20 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-transparent to-transparent pointer-events-none" />

        <div className="container-custom relative">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary/8 px-4 py-1.5 rounded-full mb-4">
              <Users className="w-4 h-4" />
              {t("أنواع العضوية", "Membership Types")}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              {t("اختر العضوية المناسبة لك", "Choose the Right Membership")}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t(
                "نوفر ثلاثة مستويات من العضوية تناسب مختلف الفئات المهنية والأكاديمية",
                "We offer three membership levels suited for different professional and academic backgrounds"
              )}
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {PLANS.map((plan, i) => (
              <PlanCard
                key={plan.key}
                plan={plan}
                index={i}
                onSelect={handleSelectPlan}
                isRTL={isRTL}
                t={t}
              />
            ))}
          </div>

          {/* Auth Nudge */}
          {!isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-12 flex justify-center"
            >
              <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-primary/5 px-6 py-5 shadow-lg backdrop-blur-sm max-w-xl w-full">
                {/* Glow Effect */}
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

                <div className="relative z-10 flex flex-col items-center text-center gap-4">
                  {/* Icon */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 border border-primary/20">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>

                  {/* Text */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {t("تسجيل الدخول مطلوب", "Login Required")}
                    </h3>

                    <p className="text-sm leading-relaxed text-muted-foreground max-w-md">
                      {t(
                        "يجب تسجيل الدخول للاشتراك والوصول إلى جميع المميزات والخدمات المتاحة.",
                        "You must be logged in to subscribe and access all available features and services."
                      )}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => navigate("/login")}
                    className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:bg-primary/90"
                  >
                    {t("تسجيل الدخول", "Log in")}

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Conditions Section ── */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h3 className="text-2xl font-bold mb-4">
              {t("الشروط والأحكام العامة", "General Terms & Conditions")}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {t(
                "تخضع جميع العضويات لموافقة مجلس الإدارة ووفقاً للنظام الأساسي للجمعية. يحق للجمعية قبول أو رفض أي طلب دون إبداء الأسباب.",
                "All memberships are subject to Board of Directors approval and in accordance with the Association's bylaws. The Association reserves the right to accept or reject any application without stating reasons."
              )}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default MembershipSubscribePage;
