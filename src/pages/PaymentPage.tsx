import { api } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { paymentService } from "@/services/payment.service";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  PartyPopper,
  Receipt,
  Smartphone,
  Tag,
  X,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PAYMENT_METHODS = [
  {
    id: "applepay",
    name: "آبل باي",
    shortDesc: "ادفع بلمسة واحدة",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
    gradient:
      "from-neutral-900 to-neutral-700 dark:from-neutral-800 dark:to-neutral-600",
    textColor: "text-white",
    accentColor: "text-neutral-300",
    borderSelected: "border-neutral-700",
    badges: [{ label: "Touch ID" }, { label: "Face ID" }, { label: "Instant" }],
  },
  {
    id: "samsungpay",
    name: "سامسونج باي",
    shortDesc: "ادفع في أي مكان",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.5 2h-11C5.67 2 5 2.67 5 3.5v17c0 .83.67 1.5 1.5 1.5h11c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5zm-5.5 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5-3H7V5h10v12z" />
      </svg>
    ),
    gradient: "from-blue-700 to-blue-500",
    textColor: "text-white",
    accentColor: "text-blue-200",
    borderSelected: "border-blue-500",
    badges: [{ label: "NFC" }, { label: "MST" }, { label: "Secure" }],
  },
  {
    id: "creditcard",
    name: "بطاقة ائتمانية",
    shortDesc: "فيزا، ماستر، مدى والمزيد",
    icon: CreditCard,
    gradient: "from-emerald-700 to-teal-500",
    textColor: "text-white",
    accentColor: "text-emerald-200",
    borderSelected: "border-emerald-500",
    badges: null, // we'll render card logos instead
    cardLogos: ["VISA", "MC", "MADA"],
  },
];

{
  /* Card Logo mini-renderer */
}
function CardBadge({ label }: { label: string }) {
  const styles: Record<string, string> = {
    VISA: "bg-[#1A1F71] text-white font-black italic text-[9px] tracking-widest",
    MC: "bg-white border border-gray-200",
    MADA: "bg-[#0066B3] text-white font-bold text-[9px] tracking-wider",
    AMEX: "bg-[#007BC1] text-white font-bold text-[9px] tracking-wide",
  };

  if (label === "MC") {
    return (
      <div className={`h-5 px-1 rounded flex items-center gap-0 ${styles.MC}`}>
        <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B] opacity-90" />
        <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-90 -ml-1.5" />
      </div>
    );
  }

  return (
    <div
      className={`h-5 px-1.5 rounded flex items-center ${styles[label] ?? "bg-white/20 text-white text-[9px]"}`}
    >
      {label}
    </div>
  );
}

// ── Error Modal ───────────────────────────────────────────────────────────────
const ErrorModal = ({
  open,
  message,
  onClose,
}: {
  open: boolean;
  message: string;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-background rounded-2xl shadow-xl p-6 w-full max-w-sm border border-border"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/40 flex items-center justify-center">
              <AlertCircle className="w-7 h-7 text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">خطأ في الكوبون</h3>
              <p className="text-muted-foreground text-sm">{message}</p>
            </div>
            <Button className="w-full" onClick={onClose}>
              حسناً
            </Button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// ── Free Registration Success Modal ──────────────────────────────────────────
const FreeSuccessModal = ({
  open,
  onGoToProfile,
}: {
  open: boolean;
  onGoToProfile: () => void;
}) => (
  <AnimatePresence>
    {open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-background rounded-2xl shadow-xl p-6 w-full max-w-sm border border-border"
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
              <PartyPopper className="w-7 h-7 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">تم التسجيل بنجاح!</h3>
              <p className="text-muted-foreground text-sm">
                لقد تم تسجيلك في الورشة بنجاح. يمكنك متابعة تفاصيل تسجيلاتك من
                صفحة الملف الشخصي.
              </p>
            </div>
            <Button className="w-full" onClick={onGoToProfile}>
              الذهاب إلى الملف الشخصي
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
const PaymentPage = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const type = location.state?.type;
  const item = location.state?.item;

  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("creditcard");

  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [isFree, setIsFree] = useState(item?.isFree || item?.price === 0);

  // Modals
  const [errorModal, setErrorModal] = useState<{
    open: boolean;
    message: string;
  }>({ open: false, message: "" });
  const [freeSuccessModal, setFreeSuccessModal] = useState(false);

  if (!item) {
    navigate("/");
    return null;
  }

  const basePrice = item?.priceValue || item?.price || 0;
  const finalPrice = Math.max(0, basePrice - basePrice * discount);
  const isCurrentlyFree = isFree || finalPrice === 0;

  const showError = (message: string) => setErrorModal({ open: true, message });

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setCouponLoading(true);
    try {
      const res = await api.post("/promo-codes/validate", {
        code: couponCode,
        applies_to: type === "workshop" ? "workshop" : "membership",
        applies_to_id: item?.key || null,
      });

      const promo = res.data?.data;

      if (promo.type === "free" || promo.discount_percentage === 100) {
        setDiscount(1);
        setIsFree(true);
      } else {
        setDiscount(promo.discount_percentage / 100);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const msg = err.response?.data?.message;
      setDiscount(0);
      setIsFree(false);

      const errorMessages: Record<string, string> = {
        "Promo not started yet": t(
          "الكوبون لم يبدأ بعد",
          "Promo not started yet",
        ),
        "Promo expired": t("انتهت صلاحية الكوبون", "Promo expired"),
        "Promo usage limit reached": t(
          "تم استنفاد الحد المسموح به",
          "Usage limit reached",
        ),
        "Promo not valid for this type": t(
          "الكوبون غير صالح لهذا النوع",
          "Promo not valid for this type",
        ),
        "Promo not valid for this item": t(
          "الكوبون غير صالح لهذه الورشة",
          "Promo not valid for this item",
        ),
      };

      showError(
        errorMessages[msg] ?? t("كوبون غير صالح", "Invalid coupon code"),
      );
    } finally {
      setCouponLoading(false);
    }
  };

  const handleProcessPayment = async () => {
    try {
      setLoading(true);
      const payload = {
        type: (type === "workshop" ? "workshop" : "membership") as
          | "workshop"
          | "membership",
        reference_id: item.key,
        payment_method: selectedMethod,
        promo_code: couponCode || undefined,
      };

      const res = await paymentService.create(payload);
      const paymentUrl = res?.payment_url;
      // free registration — show success modal instead of hitting payment

      if (!paymentUrl && isCurrentlyFree) {
        setFreeSuccessModal(true);
        return;
      }

      if (!paymentUrl) {
        showError(t("لم يتم العثور على رابط الدفع", "Payment URL not found"));
        return;
      }

      window.location.href = paymentUrl;
    } catch (err) {
      console.error(err);
      showError(
        t(
          "فشلت عملية الدفع، يرجى المحاولة مرة أخرى",
          "Payment failed, please try again",
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12 lg:py-24">
      {/* Modals */}
      <ErrorModal
        open={errorModal.open}
        message={errorModal.message}
        onClose={() => setErrorModal({ open: false, message: "" })}
      />
      <FreeSuccessModal
        open={freeSuccessModal}
        onGoToProfile={() => navigate("/profile")}
      />

      <div className="container-custom max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {t("إتمام عملية الدفع", "Complete Payment")}
          </h1>
          <p className="text-muted-foreground">
            {t(
              "الرجاء مراجعة التفاصيل واختيار طريقة الدفع المناسبة",
              "Please review details and select your preferred payment method",
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            {!isCurrentlyFree && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl p-6 border border-border bg-background shadow-sm"
              >
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  {t("طرق الدفع", "Payment Methods")}
                </h2>

                <div className="grid gap-3">
                  {PAYMENT_METHODS.map((method, i) => {
                    const isSelected = selectedMethod === method.id;
                    const Icon = method.icon;

                    return (
                      <motion.button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        whileTap={{ scale: 0.97 }}
                        className={`relative overflow-hidden rounded-2xl border-2 text-start transition-all duration-200 flex flex-col
            ${
              isSelected
                ? `border-primary shadow-lg shadow-primary/10`
                : "border-border hover:border-primary/30 hover:shadow-md"
            }`}
                      >
                        {/* Gradient top panel */}
                        <div
                          className={`bg-gradient-to-br ${method.gradient} p-4 flex flex-col gap-3`}
                        >
                          {/* Icon + checkmark row */}
                          <div className="flex items-start justify-between">
                            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <Icon className={`w-5 h-5 ${method.textColor}`} />
                            </div>
                            <motion.div
                              initial={false}
                              animate={{
                                scale: isSelected ? 1 : 0,
                                opacity: isSelected ? 1 : 0,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 20,
                              }}
                            >
                              <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center">
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              </div>
                            </motion.div>
                          </div>

                          {/* Name */}
                          <div>
                            <p
                              className={`font-bold text-sm leading-tight ${method.textColor}`}
                            >
                              {method.name}
                            </p>
                            <p
                              className={`text-xs mt-0.5 ${method.accentColor}`}
                            >
                              {method.shortDesc}
                            </p>
                          </div>
                        </div>

                        {/* Bottom info panel */}
                        <div
                          className={`px-4 py-3 bg-background flex items-center gap-1.5 flex-wrap transition-colors
            ${isSelected ? "bg-primary/5" : ""}`}
                        >
                          {method.cardLogos
                            ? method.cardLogos.map((logo) => (
                                <CardBadge key={logo} label={logo} />
                              ))
                            : method.badges?.map((b) => (
                                <span
                                  key={b.label}
                                  className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border"
                                >
                                  {b.label}
                                </span>
                              ))}
                        </div>

                        {/* Selected glow ring */}
                        {isSelected && (
                          <motion.div
                            layoutId="payment-ring"
                            className="absolute inset-0 rounded-2xl border-2 border-primary pointer-events-none"
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/50 text-sm">
              <Lock className="w-5 h-5 shrink-0" />
              <p>
                {t(
                  "معلومات الدفع الخاصة بك مشفرة ومؤمنة بالكامل باستخدام أحدث بروتوكولات الأمان (SSL).",
                  "Your payment info is encrypted and fully secured using state-of-the-art security protocols (SSL).",
                )}
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-background rounded-2xl p-6 border border-border shadow-sm sticky top-24"
            >
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-primary" />
                {t("ملخص الطلب", "Order Summary")}
              </h2>

              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <span className="text-xs font-medium text-primary mb-1 block">
                    {type === "membership"
                      ? t("اشتراك عضوية", "Membership Subscription")
                      : t("تسجيل ورشة عمل", "Workshop Registration")}
                  </span>
                  <h3 className="font-bold text-base leading-snug">
                    {t(
                      item.nameAr || item.titleAr,
                      item.nameEn || item.titleEn,
                    )}
                  </h3>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    {t("السعر الأساسي", "Base Price")}
                  </span>
                  <span className="font-medium">
                    {basePrice} {t("ريال", "SAR")}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between items-center text-sm text-emerald-600 dark:text-emerald-400">
                    <span>{t("الخصم", "Discount")}</span>
                    <span className="font-medium">
                      -{basePrice * discount} {t("ريال", "SAR")}
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-6 pt-6 border-t border-border">
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {t("كوبون الخصم", "Promo Code")}
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder={t("أدخل الكوبون هنا...", "Enter code...")}
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponLoading || isFree}
                    className="flex-1"
                  />
                  <Button
                    variant="secondary"
                    onClick={handleApplyCoupon}
                    disabled={!couponCode || couponLoading || isFree}
                  >
                    {couponLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      t("تطبيق", "Apply")
                    )}
                  </Button>
                </div>
              </div>

              <div className="pt-6 border-t border-border mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold">
                    {t("الإجمالي", "Total")}
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {finalPrice === 0
                      ? t("مجاني", "Free")
                      : `${finalPrice} ${t("ريال", "SAR")}`}
                  </span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full h-12 text-base"
                onClick={handleProcessPayment}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {isCurrentlyFree
                      ? type === "membership"
                        ? t("تأكيد التسجيل", "Confirm Registration")
                        : t("تأكيد الحضور", "Confirm Attendance")
                      : t("إتمام الدفع", "Proceed to Payment")}
                    <ArrowRight className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0" />
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
