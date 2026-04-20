import AuthHero from "@/components/auth/AuthHero";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Banknote,
  Check,
  CreditCard,
  Crown,
  GraduationCap,
  Loader2,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
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
    priceValue: null, // determined by API or admin
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

type PaymentMethod = "credit_card" | "mada" | "bank_transfer";

interface PaymentMethodOption {
  value: PaymentMethod;
  labelAr: string;
  labelEn: string;
  Icon: React.ElementType;
  description: { ar: string; en: string };
}

const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    value: "credit_card",
    labelAr: "بطاقة ائتمان / خصم",
    labelEn: "Credit / Debit Card",
    Icon: CreditCard,
    description: {
      ar: "Visa، Mastercard، American Express",
      en: "Visa, Mastercard, American Express",
    },
  },
  {
    value: "mada",
    labelAr: "مدى",
    labelEn: "Mada",
    Icon: Banknote,
    description: {
      ar: "بطاقة مدى البنكية السعودية",
      en: "Saudi Mada bank card",
    },
  },
  {
    value: "bank_transfer",
    labelAr: "تحويل بنكي",
    labelEn: "Bank Transfer",
    Icon: Banknote,
    description: {
      ar: "تحويل مباشر عبر البنك",
      en: "Direct bank wire transfer",
    },
  },
];

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

const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  index,
  onSelect,
  isRTL,
  t,
}) => {
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

          {/* CTA */}
          {plan.isFree ? (
            <Button
              variant="outline"
              className="w-full gap-2 rounded-xl h-11"
              disabled
            >
              <Crown className="w-4 h-4" />
              {t("بالترشيح فقط", "By Nomination Only")}
            </Button>
          ) : (
            <Button
              onClick={() => onSelect(plan)}
              className="w-full gap-2 rounded-xl h-11 group/btn"
              size="lg"
            >
              {t("اشترك الآن", "Subscribe Now")}
              <ArrowRight
                className={`w-4 h-4 transition-transform group-hover/btn:translate-x-1 ${
                  isRTL ? "rotate-180 group-hover/btn:-translate-x-1" : ""
                }`}
              />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

type DialogStep = "select_payment" | "confirm" | "processing";

const MembershipSubscribePage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [step, setStep] = useState<DialogStep>("select_payment");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSelectPlan = (plan: Plan) => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: { pathname: "/membership/subscribe" } },
      });
      return;
    }
    setSelectedPlan(plan);
    setSelectedPayment(null);
    setStep("select_payment");
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    if (!selectedPayment) return;
    setStep("confirm");
  };

  const handleSubscribe = async () => {
    if (!selectedPlan || !selectedPayment) return;
    setIsSubscribing(true);
    setStep("processing");
    try {
      const res = await api.post("/membership/subscribe", {
        membership_id: selectedPlan.id,
        payment_method: selectedPayment,
      });
      const data = res.data?.data || res.data;
      if (data?.payment_url) {
        window.location.href = data.payment_url;
      } else {
        toast({
          title: t("تم بنجاح", "Success"),
          description: t("تم الاشتراك بنجاح", "Subscribed successfully"),
        });
        navigate("/profile");
      }
    } catch (err: any) {
      toast({
        title: t("خطأ", "Error"),
        description:
          err.response?.data?.message ||
          t("حدث خطأ ما", "Something went wrong"),
        variant: "destructive",
      });
      setStep("select_payment");
    } finally {
      setIsSubscribing(false);
    }
  };

  const closeDialog = () => {
    if (isSubscribing) return;
    setIsDialogOpen(false);
    setSelectedPlan(null);
    setSelectedPayment(null);
    setStep("select_payment");
  };

  return (
    <Layout>
      <AuthHero
        titleAr="اشترك في العضوية"
        titleEn="Subscribe to Membership"
        subtitleAr="اختر الباقة المناسبة وابدأ رحلتك المهنية معنا"
        subtitleEn="Choose the right plan and start your professional journey with us"
      />

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

          {/* Auth nudge */}
          {!isAuthenticated && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-10 text-center"
            >
              <p className="text-sm text-muted-foreground">
                {t(
                  "يجب تسجيل الدخول للاشتراك.",
                  "You must be logged in to subscribe."
                )}{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                >
                  {t("تسجيل الدخول", "Log in")}
                </button>
              </p>
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

      {/* ── Subscription Dialog ── */}
      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
          <DialogHeader className="pb-2">
            <DialogTitle className="flex items-center gap-2 text-lg">
              {step === "processing" ? (
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              ) : (
                <CreditCard className="w-5 h-5 text-primary" />
              )}
              {step === "processing"
                ? t("جاري المعالجة...", "Processing...")
                : step === "confirm"
                ? t("تأكيد الاشتراك", "Confirm Subscription")
                : t("اختر طريقة الدفع", "Choose Payment Method")}
            </DialogTitle>
            {selectedPlan && step !== "processing" && (
              <DialogDescription className="text-sm">
                {t(
                  `الاشتراك في ${selectedPlan.nameAr}`,
                  `Subscribing to ${selectedPlan.nameEn}`
                )}
              </DialogDescription>
            )}
          </DialogHeader>

          <AnimatePresence mode="wait">
            {/* Step 1: Payment selection */}
            {step === "select_payment" && selectedPlan && (
              <motion.div
                key="select"
                initial={{ opacity: 0, x: isRTL ? -16 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 16 : -16 }}
                className="space-y-3 py-2"
              >
                {/* Plan summary pill */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/60 border border-border/50">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      planStyles[selectedPlan.key].iconBg
                    }`}
                  >
                    <selectedPlan.Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {t(selectedPlan.nameAr, selectedPlan.nameEn)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t(selectedPlan.priceAr, selectedPlan.priceEn)} —{" "}
                      {t(selectedPlan.durationAr, selectedPlan.durationEn)}
                    </p>
                  </div>
                </div>

                <Label className="text-sm font-medium">
                  {t("طريقة الدفع", "Payment Method")}
                </Label>

                {PAYMENT_METHODS.map((pm) => (
                  <button
                    key={pm.value}
                    onClick={() => setSelectedPayment(pm.value)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-200
                      ${
                        selectedPayment === pm.value
                          ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                          : "border-border/60 bg-background hover:border-border hover:bg-muted/40"
                      }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors
                      ${
                        selectedPayment === pm.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <pm.Icon className="w-4 h-4" />
                    </div>
                    <div className={`flex-1 text-${isRTL ? "right" : "left"}`}>
                      <p className="font-medium text-sm">
                        {t(pm.labelAr, pm.labelEn)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t(pm.description.ar, pm.description.en)}
                      </p>
                    </div>
                    {selectedPayment === pm.value && (
                      <Check className="w-4 h-4 text-primary shrink-0" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step 2: Confirm */}
            {step === "confirm" && selectedPlan && selectedPayment && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: isRTL ? -16 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 16 : -16 }}
                className="space-y-4 py-2"
              >
                {/* Summary card */}
                <div className="rounded-xl border border-border/60 bg-muted/30 divide-y divide-border/40">
                  <div className="flex justify-between items-center px-4 py-3">
                    <span className="text-sm text-muted-foreground">
                      {t("نوع العضوية", "Membership Type")}
                    </span>
                    <span className="font-semibold text-sm">
                      {t(selectedPlan.nameAr, selectedPlan.nameEn)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-3">
                    <span className="text-sm text-muted-foreground">
                      {t("المدة", "Duration")}
                    </span>
                    <span className="font-semibold text-sm">
                      {t(selectedPlan.durationAr, selectedPlan.durationEn)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-3">
                    <span className="text-sm text-muted-foreground">
                      {t("طريقة الدفع", "Payment Method")}
                    </span>
                    <span className="font-semibold text-sm">
                      {t(
                        PAYMENT_METHODS.find((p) => p.value === selectedPayment)
                          ?.labelAr ?? "",
                        PAYMENT_METHODS.find((p) => p.value === selectedPayment)
                          ?.labelEn ?? ""
                      )}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  {t(
                    "بالمتابعة، أنت توافق على الشروط والأحكام وسياسة الخصوصية للجمعية.",
                    "By continuing, you agree to the Association's terms, conditions and privacy policy."
                  )}
                </p>
              </motion.div>
            )}

            {/* Step 3: Processing */}
            {step === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-10 gap-4"
              >
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">
                  {t("جاري تحضير طلبك...", "Preparing your request...")}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {step !== "processing" && (
            <DialogFooter className="gap-2 pt-2 flex-row-reverse sm:flex-row-reverse">
              <Button
                variant="ghost"
                onClick={
                  step === "confirm"
                    ? () => setStep("select_payment")
                    : closeDialog
                }
                className="gap-1.5"
              >
                {step === "confirm" ? (
                  <>
                    <ArrowRight
                      className={`w-4 h-4 ${isRTL ? "" : "rotate-180"}`}
                    />
                    {t("رجوع", "Back")}
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4" />
                    {t("إلغاء", "Cancel")}
                  </>
                )}
              </Button>

              {step === "select_payment" && (
                <Button
                  onClick={handleConfirm}
                  disabled={!selectedPayment}
                  className="gap-2 flex-1 sm:flex-initial"
                >
                  {t("التالي", "Next")}
                  <ArrowRight
                    className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                  />
                </Button>
              )}

              {step === "confirm" && (
                <Button
                  onClick={handleSubscribe}
                  className="gap-2 flex-1 sm:flex-initial"
                >
                  <Check className="w-4 h-4" />
                  {t("تأكيد الدفع والاشتراك", "Confirm & Pay")}
                </Button>
              )}
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default MembershipSubscribePage;
