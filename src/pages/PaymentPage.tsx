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
    id: "mada",
    name: "Mada مدى",
    icon: CreditCard,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    id: "applepay",
    name: "Apple Pay",
    icon: Smartphone,
    color: "text-neutral-900 dark:text-white",
    bg: "bg-neutral-100 dark:bg-neutral-800",
    border: "border-neutral-200 dark:border-neutral-700",
  },
  {
    id: "samsungpay",
    name: "Samsung Pay",
    icon: Smartphone,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    id: "creditcard",
    name: "Credit Card",
    icon: CreditCard,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
  },
];

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
    } catch (err: any) {
      const msg = err.response?.data?.message;
      setDiscount(0);
      setIsFree(false);

      const errorMessages: Record<string, string> = {
        "Promo not started yet": t(
          "الكوبون لم يبدأ بعد",
          "Promo not started yet"
        ),
        "Promo expired": t("انتهت صلاحية الكوبون", "Promo expired"),
        "Promo usage limit reached": t(
          "تم استنفاد الحد المسموح به",
          "Usage limit reached"
        ),
        "Promo not valid for this type": t(
          "الكوبون غير صالح لهذا النوع",
          "Promo not valid for this type"
        ),
        "Promo not valid for this item": t(
          "الكوبون غير صالح لهذه الورشة",
          "Promo not valid for this item"
        ),
      };

      showError(
        errorMessages[msg] ?? t("كوبون غير صالح", "Invalid coupon code")
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
          "Payment failed, please try again"
        )
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
              "Please review details and select your preferred payment method"
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            {!isCurrentlyFree && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-background rounded-2xl p-6 border border-border shadow-sm"
              >
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  {t("طرق الدفع", "Payment Methods")}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {PAYMENT_METHODS.map((method) => {
                    const isSelected = selectedMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`relative p-4 rounded-xl border-2 text-start transition-all duration-200 flex flex-col gap-3 ${
                          isSelected
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:border-primary/40 bg-background"
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${method.bg} ${method.color} ${method.border} border`}
                          >
                            <method.icon className="w-5 h-5" />
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <span
                          className={`font-semibold ${
                            isSelected ? "text-primary" : ""
                          }`}
                        >
                          {method.name}
                        </span>
                      </button>
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
                  "Your payment info is encrypted and fully secured using state-of-the-art security protocols (SSL)."
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
                      item.nameEn || item.titleEn
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
