import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  Receipt,
  Smartphone,
  Tag,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Define payment methods
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

const PaymentPage = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const type = location.state?.type; // "membership" | "workshop"
  const item = location.state?.item;

  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("creditcard");
  
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [discount, setDiscount] = useState(0); // Value from 0 to 1
  const [isFree, setIsFree] = useState(item?.isFree || item?.price === 0);

  // If no item, redirect back
  if (!item) {
    navigate("/");
    return null;
  }

  const basePrice = item?.priceValue || item?.price || 0;
  const finalPrice = Math.max(0, basePrice - basePrice * discount);
  const isCurrentlyFree = isFree || finalPrice === 0;

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    
    setCouponLoading(true);
    try {
      // Fake API call to validate coupon
      await new Promise(res => setTimeout(res, 800));
      
      // Demo logic:
      if (couponCode.toUpperCase() === "FREE100") {
        setDiscount(1);
        setIsFree(true);
        toast.success(t("تم تطبيق الكوبون المجاني بنجاح!", "Free coupon applied successfully!"));
      } else if (couponCode.toUpperCase() === "DISCOUNT50") {
        setDiscount(0.5);
        toast.success(t("تم تطبيق خصم 50% بنجاح!", "50% discount applied successfully!"));
      } else {
        toast.error(t("كوبون غير صالح", "Invalid coupon code"));
        setDiscount(0);
      }
    } catch (err) {
      toast.error(t("حدث خطأ أثناء التحقق من الكوبون", "Error validating coupon"));
    } finally {
      setCouponLoading(false);
    }
  };

  const handleProcessPayment = async () => {
    try {
      setLoading(true);
      
      // Faking the real logic. In real app, create order, get payment URL, redirect.
      await new Promise(res => setTimeout(res, 1500));
      
      // If free, skip payment gateway
      if (isCurrentlyFree) {
        toast.success(
          type === "membership" 
            ? t("تم التسجيل بالعضوية بنجاح!", "Membership registered successfully!")
            : t("تم الاشتراك في ورشة العمل بنجاح!", "Successfully subscribed to the workshop!")
        );
        navigate(type === "membership" ? "/profile" : "/workshops");
        return;
      }

      // Simulate redirect to payment gateway based on selected method
      toast.success(t("جاري التوجيه لبوابة الدفع...", "Redirecting to payment gateway..."));
      
      // Demo: fake success after redirect
      setTimeout(() => {
        navigate(type === "membership" ? "/profile" : "/workshops");
      }, 1000);

    } catch (err) {
      toast.error(t("حدث خطأ في عملية الدفع", "Payment process failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12 lg:py-24">
      <div className="container-custom max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {t("إتمام عملية الدفع", "Complete Payment")}
          </h1>
          <p className="text-muted-foreground">
            {t("الرجاء مراجعة التفاصيل واختيار طريقة الدفع المناسبة", "Please review details and select your preferred payment method")}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main Payment Section */}
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
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${method.bg} ${method.color} ${method.border} border`}>
                            <method.icon className="w-5 h-5" />
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <span className={`font-semibold ${isSelected ? "text-primary" : ""}`}>
                          {method.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Security Note */}
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

          {/* Order Summary */}
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
                    {type === "membership" ? t("اشتراك عضوية", "Membership Subscription") : t("تسجيل ورشة عمل", "Workshop Registration")}
                  </span>
                  <h3 className="font-bold text-base leading-snug">
                    {t(item.nameAr || item.titleAr, item.nameEn || item.titleEn)}
                  </h3>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{t("السعر الأساسي", "Base Price")}</span>
                  <span className="font-medium">{basePrice} {t("ريال", "SAR")}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between items-center text-sm text-emerald-600 dark:text-emerald-400">
                    <span>{t("الخصم", "Discount")}</span>
                    <span className="font-medium">-{basePrice * discount} {t("ريال", "SAR")}</span>
                  </div>
                )}
              </div>

              {/* Promo Code Section */}
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
                  <span className="text-base font-bold">{t("الإجمالي", "Total")}</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">
                      {finalPrice === 0 ? t("مجاني", "Free") : `${finalPrice} ${t("ريال", "SAR")}`}
                    </span>
                  </div>
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
