import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

type MembershipKey = "active" | "affiliate" | "student" | "intern";

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
    accent: "from-blue-600 to-blue-500",
    glow: "group-hover:shadow-blue-100 dark:group-hover:shadow-blue-900/30",
  },
  affiliate: {
    accent: "from-amber-500 to-yellow-400",
    glow: "group-hover:shadow-amber-100 dark:group-hover:shadow-amber-900/30",
  },
  student: {
    accent: "from-teal-600 to-emerald-500",
    glow: "group-hover:shadow-teal-100 dark:group-hover:shadow-teal-900/30",
  },
  intern: {
    accent: "from-purple-600 to-indigo-500",
    glow: "group-hover:shadow-purple-100 dark:group-hover:shadow-purple-900/30",
  },
};

const plans: Plan[] = [
  {
    key: "active",
    nameAr: "عضو عامل",
    nameEn: "Active Member",
    price: 250,
    descriptionAr: "للأعضاء العاملين داخل الجمعية",
    descriptionEn: "For active professional members",
    featuresAr: ["صلاحيات كاملة", "التصويت", "حضور الاجتماعات"],
    featuresEn: ["Full access", "Voting rights", "Meetings access"],
  },
  {
    key: "affiliate",
    nameAr: "عضو منتسب",
    nameEn: "affiliate Member",
    price: 200,
    descriptionAr: "للمنتسبين للمجال",
    descriptionEn: "For affiliate professionals",
    featuresAr: ["مشاركة جزئية", "فعاليات محدودة"],
    featuresEn: ["Partial access", "Limited events"],
  },
  {
    key: "intern",
    nameAr: "طالب امتياز",
    nameEn: "Intern Student",
    price: 150,
    descriptionAr: "طلاب الامتياز",
    descriptionEn: "Intern students",
    featuresAr: ["تدريب عملي", "تقييمات"],
    featuresEn: ["Practical training", "Evaluations"],
  },
  {
    key: "student",
    nameAr: "طالب",
    nameEn: "Student",
    price: 100,
    descriptionAr: "للطلاب في المجال",
    descriptionEn: "For students",
    featuresAr: ["تدريب", "ورش عمل"],
    featuresEn: ["Training", "Workshops"],
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
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
      {plans.map((plan, index) => {
        const style = planStyles[plan.key];

        return (
          <motion.div
            key={plan.key}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.12,
              ease: "easeOut",
            }}
            className="h-full"
          >
            <div
              className={`group relative h-full flex flex-col rounded-3xl border border-border/60 bg-background
              overflow-hidden transition-all duration-500
              hover:-translate-y-2 hover:shadow-2xl ${style.glow}`}
            >
              {/* Top accent */}
              <div
                className={`h-1.5 w-full bg-gradient-to-r ${style.accent}`}
              />

              <div className="flex flex-col flex-1 p-8">
                {/* Title */}
                <h3 className="text-xl font-bold mb-1">
                  {t(plan.nameAr, plan.nameEn)}
                </h3>

                <p className="text-sm text-muted-foreground mb-4">
                  {t(plan.descriptionAr, plan.descriptionEn)}
                </p>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-border/50">
                  <p className="text-3xl font-bold text-primary">
                    {plan.price} {t("ريال", "SAR")}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-8">
                  {(isRTL ? plan.featuresAr : plan.featuresEn).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onSelect(plan)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
                >
                  {t("تسجيل بالعضوية", "Register Membership")}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
