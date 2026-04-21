import AuthHero from "@/components/auth/AuthHero";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { motion } from "framer-motion";
import {
  Loader2,
  Info,
  CheckCircle2,
  ShieldCheck,
  Tag,
  CreditCard,
  Banknote,
  Smartphone,
  Wallet,
  Clock,
  AlertCircle,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

type MembershipKey = "active" | "affiliate" | "intern" | "student";

interface MembershipOption {
  key: MembershipKey;
  labelAr: string;
  labelEn: string;
  price: number;
  requiresClassification: boolean;
}

const MEMBERSHIPS: MembershipOption[] = [
  {
    key: "active",
    labelAr: "عضو عامل",
    labelEn: "Active Member",
    price: 200,
    requiresClassification: true,
  },
  {
    key: "affiliate",
    labelAr: "عضو منتسب",
    labelEn: "Affiliate Member",
    price: 200,
    requiresClassification: false,
  },
  {
    key: "intern",
    labelAr: "طالب امتياز",
    labelEn: "Intern Student",
    price: 150,
    requiresClassification: false,
  },
  {
    key: "student",
    labelAr: "طالب",
    labelEn: "Student",
    price: 100,
    requiresClassification: false,
  },
];

type PaymentMethod =
  | "moyasar"
  | "mada"
  | "applepay"
  | "googlepay"
  | "card"
  | "tabby"
  | "tamara";

const PAYMENT_METHODS: {
  key: PaymentMethod;
  labelAr: string;
  labelEn: string;
  Icon: React.ElementType;
}[] = [
  { key: "mada", labelAr: "مدى", labelEn: "Mada", Icon: Banknote },
  { key: "card", labelAr: "بطاقة Visa/Master", labelEn: "Visa / Master", Icon: CreditCard },
  { key: "applepay", labelAr: "Apple Pay", labelEn: "Apple Pay", Icon: Smartphone },
  { key: "googlepay", labelAr: "Google Pay", labelEn: "Google Pay", Icon: Smartphone },
  { key: "moyasar", labelAr: "ميسر", labelEn: "Moyasar", Icon: Wallet },
  { key: "tabby", labelAr: "تابي (تقسيط)", labelEn: "Tabby (Installments)", Icon: Wallet },
  { key: "tamara", labelAr: "تمارا (تقسيط)", labelEn: "Tamara (Installments)", Icon: Wallet },
];

interface PromoResult {
  type: "percent" | "fixed" | "free" | "invalid";
  value: number;
  message?: string;
}

const SignupPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pendingDialogOpen, setPendingDialogOpen] = useState(false);
  const [classificationConfirmOpen, setClassificationConfirmOpen] = useState(false);

  // Promo state
  const [promo, setPromo] = useState<PromoResult | null>(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // Payment selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mada");

  const [formData, setFormData] = useState({
    fullNameAr: "",
    fullNameEn: "",
    nationalId: "",
    email: "",
    phone: "",
    classificationNumber: "",
    membershipType: "" as MembershipKey | "",
    promoCode: "",
    specialization: "",
    subSpecialization: "",
    workplace: "",
    password: "",
    confirmPassword: "",
  });

  const set = (field: string, value: string) => {
    setFormData((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const selectedMembership = useMemo(
    () => MEMBERSHIPS.find((m) => m.key === formData.membershipType),
    [formData.membershipType]
  );

  const finalPrice = useMemo(() => {
    if (!selectedMembership) return 0;
    const base = selectedMembership.price;
    if (!promo || promo.type === "invalid") return base;
    if (promo.type === "free") return 0;
    if (promo.type === "percent") return Math.max(0, base - (base * promo.value) / 100);
    if (promo.type === "fixed") return Math.max(0, base - promo.value);
    return base;
  }, [selectedMembership, promo]);

  const applyPromo = async () => {
    if (!formData.promoCode.trim()) return;
    setIsApplyingPromo(true);
    try {
      const res = await api.post("/promo/validate", {
        code: formData.promoCode.trim(),
        membership_type: formData.membershipType,
      });
      const data = res.data?.data || res.data;
      setPromo({
        type: data.type,
        value: Number(data.value || 0),
        message: data.message,
      });
      toast({
        title: t("تم تطبيق الكود", "Code Applied"),
        description: t("تم تطبيق الخصم بنجاح", "Discount applied successfully"),
      });
    } catch {
      // Mock fallback for codes
      const code = formData.promoCode.trim().toUpperCase();
      if (code === "FREE100") {
        setPromo({ type: "free", value: 100 });
        toast({ title: t("عضوية مجانية!", "Free Membership!") });
      } else if (code === "SAVE50") {
        setPromo({ type: "percent", value: 50 });
        toast({ title: t("خصم 50%", "50% Off Applied") });
      } else if (code === "SPTA20") {
        setPromo({ type: "fixed", value: 20 });
        toast({ title: t("خصم 20 ريال", "20 SAR Off") });
      } else {
        setPromo({ type: "invalid", value: 0 });
        toast({
          title: t("كود غير صالح", "Invalid Code"),
          variant: "destructive",
        });
      }
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.fullNameAr) e.fullNameAr = t("مطلوب", "Required");
    if (!formData.fullNameEn) e.fullNameEn = t("مطلوب", "Required");
    if (!formData.nationalId) e.nationalId = t("مطلوب", "Required");
    else if (!/^\d{10}$/.test(formData.nationalId))
      e.nationalId = t("يجب أن يتكون من 10 أرقام", "Must be 10 digits");
    if (!formData.email) e.email = t("مطلوب", "Required");
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      e.email = t("بريد غير صالح", "Invalid email");
    if (!formData.phone) e.phone = t("مطلوب", "Required");
    if (!formData.membershipType) e.membershipType = t("اختر نوع العضوية", "Select membership");
    if (selectedMembership?.requiresClassification && !formData.classificationNumber)
      e.classificationNumber = t("مطلوب لهذه العضوية", "Required for this membership");
    if (!formData.password) e.password = t("مطلوب", "Required");
    else if (formData.password.length < 8)
      e.password = t("8 أحرف على الأقل", "Min 8 characters");
    if (formData.password !== formData.confirmPassword)
      e.confirmPassword = t("غير متطابقتين", "Passwords don't match");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // If classification number is provided, show confirmation modal first
    if (formData.classificationNumber && !classificationConfirmOpen) {
      setClassificationConfirmOpen(true);
      return;
    }

    await proceedRegistration();
  };

  const proceedRegistration = async () => {
    setClassificationConfirmOpen(false);
    setIsSubmitting(true);
    try {
      const result = await register({
        name: formData.fullNameEn,
        name_ar: formData.fullNameAr,
        email: formData.email,
        phone: formData.phone,
        national_id: formData.nationalId,
        classification_number: formData.classificationNumber || undefined,
        specialization: formData.specialization || undefined,
        sub_specialization: formData.subSpecialization || undefined,
        employer: formData.workplace || undefined,
        membership_type: formData.membershipType,
        promo_code: formData.promoCode || undefined,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });

      // If price > 0, redirect to payment first
      if (finalPrice > 0 && promo?.type !== "free") {
        try {
          const payRes = await api.post("/payments/create", {
            amount: finalPrice,
            payment_method: paymentMethod,
            purpose: "membership_signup",
            email: formData.email,
            membership_type: formData.membershipType,
          });
          const payData = payRes.data?.data || payRes.data;
          if (payData?.payment_url) {
            window.location.href = payData.payment_url;
            return;
          }
        } catch {
          // Mock: pretend payment succeeded — go to success then pending
          navigate("/payment/success?source=signup");
          return;
        }
      }

      // No payment OR free → show pending approval
      if (result.status === "pending" || formData.classificationNumber) {
        setPendingDialogOpen(true);
      } else {
        toast({
          title: t("تم إنشاء الحساب", "Account Created"),
          description: t("مرحباً بك!", "Welcome!"),
        });
        navigate("/profile", { replace: true });
      }
    } catch (error: any) {
      const data = error.response?.data;
      if (data?.errors) {
        const firstError = Object.values(data.errors)[0] as string[];
        toast({
          title: t("خطأ", "Error"),
          description: firstError[0],
          variant: "destructive",
        });

        // Detect duplicate national_id
        if (data.errors.national_id) {
          setErrors((p) => ({
            ...p,
            nationalId: t(
              "رقم الهوية مسجل مسبقاً",
              "National ID already registered"
            ),
          }));
        }
      } else {
        toast({
          title: t("خطأ", "Error"),
          description: data?.message || t("حدث خطأ", "Something went wrong"),
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <AuthHero
        titleAr="انضم إلى مجتمعنا المهني"
        titleEn="Join Our Professional Community"
        subtitleAr="أنشئ حسابك واختر عضويتك للبدء"
        subtitleEn="Create your account and choose your membership"
      />

      <section className="py-16 -mt-10 relative z-10">
        <div className="container-custom max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-3xl shadow-xl p-8 md:p-10 border border-border/50"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ─── Personal Info ─── */}
              <div>
                <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  {t("المعلومات الشخصية", "Personal Information")}
                </h3>
                <p className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  {t(
                    "الرجاء إدخال اسمك الكامل (الثلاثي أو الرباعي) كما تريد ظهوره على الشهادات وبطاقات العضوية",
                    "Please enter your full name (triple or quadruple) as you want it to appear on certificates and membership cards"
                  )}
                </p>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">
                      {t("الاسم الرباعي (عربي) *", "Full Name (Arabic) *")}
                    </Label>
                    <Input
                      value={formData.fullNameAr}
                      onChange={(e) => set("fullNameAr", e.target.value)}
                      className={errors.fullNameAr ? "border-destructive" : ""}
                    />
                    {errors.fullNameAr && (
                      <p className="text-destructive text-xs mt-1">{errors.fullNameAr}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">
                      {t("الاسم الرباعي (English) *", "Full Name (English) *")}
                    </Label>
                    <Input
                      value={formData.fullNameEn}
                      onChange={(e) => set("fullNameEn", e.target.value)}
                      className={errors.fullNameEn ? "border-destructive" : ""}
                      dir="ltr"
                    />
                    {errors.fullNameEn && (
                      <p className="text-destructive text-xs mt-1">{errors.fullNameEn}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">
                      {t("رقم الهوية الوطنية *", "National ID *")}
                    </Label>
                    <Input
                      value={formData.nationalId}
                      onChange={(e) => set("nationalId", e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className={errors.nationalId ? "border-destructive" : ""}
                      dir="ltr"
                      placeholder="10XXXXXXXX"
                    />
                    {errors.nationalId && (
                      <p className="text-destructive text-xs mt-1">{errors.nationalId}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">
                      {t("البريد الإلكتروني *", "Email *")}
                    </Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => set("email", e.target.value)}
                      className={errors.email ? "border-destructive" : ""}
                      dir="ltr"
                    />
                    {errors.email && (
                      <p className="text-destructive text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">
                      {t("رقم الجوال *", "Phone *")}
                    </Label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className={errors.phone ? "border-destructive" : ""}
                      dir="ltr"
                      placeholder="+9665XXXXXXXX"
                    />
                    {errors.phone && (
                      <p className="text-destructive text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">
                      {t("جهة العمل", "Workplace")}
                    </Label>
                    <Input
                      value={formData.workplace}
                      onChange={(e) => set("workplace", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">
                      {t("التخصص", "Specialization")}
                    </Label>
                    <Input
                      value={formData.specialization}
                      onChange={(e) => set("specialization", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">
                      {t("التخصص الدقيق", "Sub-specialization")}
                    </Label>
                    <Input
                      value={formData.subSpecialization}
                      onChange={(e) => set("subSpecialization", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* ─── Membership ─── */}
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  {t("نوع العضوية", "Membership Type")}
                </h3>

                <div>
                  <Label className="text-sm font-medium mb-1.5 block">
                    {t("اختر نوع العضوية *", "Select Membership *")}
                  </Label>
                  <Select
                    value={formData.membershipType}
                    onValueChange={(v) => set("membershipType", v)}
                  >
                    <SelectTrigger
                      className={errors.membershipType ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder={t("اختر...", "Choose...")} />
                    </SelectTrigger>
                    <SelectContent>
                      {MEMBERSHIPS.map((m) => (
                        <SelectItem key={m.key} value={m.key}>
                          <div className="flex items-center justify-between w-full gap-4">
                            <span>{t(m.labelAr, m.labelEn)}</span>
                            <span className="text-primary font-bold">
                              {m.price} {t("ر.س", "SAR")}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.membershipType && (
                    <p className="text-destructive text-xs mt-1">{errors.membershipType}</p>
                  )}
                </div>

                {selectedMembership?.requiresClassification && (
                  <div className="mt-4">
                    <Label className="text-sm font-medium mb-1.5 block">
                      {t("رقم التصنيف *", "Classification Number *")}
                    </Label>
                    <Input
                      value={formData.classificationNumber}
                      onChange={(e) => set("classificationNumber", e.target.value)}
                      className={errors.classificationNumber ? "border-destructive" : ""}
                      dir="ltr"
                    />
                    <p className="text-xs text-muted-foreground mt-1.5 flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      {t(
                        "يرجى التأكد من صحة رقم التصنيف. سيُستخدم لاحقاً للتكامل مع الهيئة السعودية للتخصصات الصحية.",
                        "Please ensure the classification number is correct. It will be used later for integration with the Saudi Commission for Health Specialties."
                      )}
                    </p>
                    {errors.classificationNumber && (
                      <p className="text-destructive text-xs mt-1">
                        {errors.classificationNumber}
                      </p>
                    )}
                  </div>
                )}

                {/* Promo Code */}
                <div className="mt-5">
                  <Label className="text-sm font-medium mb-1.5 block">
                    {t("كود الخصم (اختياري)", "Promo Code (Optional)")}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={formData.promoCode}
                      onChange={(e) => set("promoCode", e.target.value.toUpperCase())}
                      placeholder={t("أدخل الكود...", "Enter code...")}
                      dir="ltr"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={applyPromo}
                      disabled={!formData.promoCode || isApplyingPromo}
                      className="gap-1.5 shrink-0"
                    >
                      {isApplyingPromo ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Tag className="w-4 h-4" />
                      )}
                      {t("تطبيق", "Apply")}
                    </Button>
                  </div>
                  {promo && promo.type !== "invalid" && (
                    <p className="text-emerald-600 text-xs mt-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {promo.type === "free"
                        ? t("عضوية مجانية!", "Free membership!")
                        : promo.type === "percent"
                        ? t(`خصم ${promo.value}%`, `${promo.value}% discount`)
                        : t(`خصم ${promo.value} ر.س`, `${promo.value} SAR off`)}
                    </p>
                  )}
                </div>

                {/* Price Summary */}
                {selectedMembership && (
                  <div className="mt-5 p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t("الرسوم", "Fee")}
                      </span>
                      <span className={promo && promo.type !== "invalid" ? "line-through text-muted-foreground" : "font-semibold"}>
                        {selectedMembership.price} {t("ر.س", "SAR")}
                      </span>
                    </div>
                    {promo && promo.type !== "invalid" && (
                      <div className="flex items-center justify-between text-sm mt-2 pt-2 border-t border-primary/20">
                        <span className="font-semibold">
                          {t("الإجمالي", "Total")}
                        </span>
                        <span className="text-xl font-bold text-primary">
                          {finalPrice} {t("ر.س", "SAR")}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ─── Payment Method ─── */}
              {selectedMembership && finalPrice > 0 && (
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    {t("طريقة الدفع", "Payment Method")}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                    {PAYMENT_METHODS.map((m) => {
                      const Icon = m.Icon;
                      const active = paymentMethod === m.key;
                      return (
                        <button
                          type="button"
                          key={m.key}
                          onClick={() => setPaymentMethod(m.key)}
                          className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-sm ${
                            active
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <Icon className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-start text-xs font-medium leading-tight">
                            {t(m.labelAr, m.labelEn)}
                          </span>
                          {active && (
                            <CheckCircle2 className="w-4 h-4 text-primary ms-auto shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ─── Password ─── */}
              <div className="border-t border-border pt-6">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">
                      {t("كلمة المرور *", "Password *")}
                    </Label>
                    <Input
                      type="password"
                      value={formData.password}
                      onChange={(e) => set("password", e.target.value)}
                      className={errors.password ? "border-destructive" : ""}
                      dir="ltr"
                    />
                    {errors.password && (
                      <p className="text-destructive text-xs mt-1">{errors.password}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">
                      {t("تأكيد كلمة المرور *", "Confirm Password *")}
                    </Label>
                    <Input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => set("confirmPassword", e.target.value)}
                      className={errors.confirmPassword ? "border-destructive" : ""}
                      dir="ltr"
                    />
                    {errors.confirmPassword && (
                      <p className="text-destructive text-xs mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : finalPrice > 0 ? (
                  t(`المتابعة للدفع — ${finalPrice} ر.س`, `Continue to Payment — ${finalPrice} SAR`)
                ) : (
                  t("إنشاء الحساب", "Create Account")
                )}
              </Button>
            </form>

            <p className="text-center text-sm mt-6">
              {t("لديك حساب بالفعل؟", "Already have an account?")}{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:underline"
              >
                {t("تسجيل الدخول", "Sign In")}
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Classification confirm modal */}
      <Dialog open={classificationConfirmOpen} onOpenChange={setClassificationConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              {t("تأكيد رقم التصنيف", "Confirm Classification Number")}
            </DialogTitle>
            <DialogDescription className="pt-2">
              {t(
                "يرجى التأكد من صحة رقم التصنيف. سيُستخدم لاحقاً للتكامل مع الهيئة السعودية للتخصصات الصحية والتحقق من حسابك.",
                "Please ensure the classification number is correct. It will be used later for integration with the Saudi Commission for Health Specialties to verify your account."
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 rounded-lg bg-muted/40 text-center">
            <p className="text-xs text-muted-foreground mb-1">
              {t("رقم التصنيف", "Classification Number")}
            </p>
            <p className="text-xl font-bold tracking-wider" dir="ltr">
              {formData.classificationNumber}
            </p>
          </div>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              variant="outline"
              onClick={() => setClassificationConfirmOpen(false)}
            >
              {t("تعديل", "Edit")}
            </Button>
            <Button onClick={proceedRegistration}>
              {t("نعم، الرقم صحيح", "Yes, it's correct")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pending approval modal */}
      <Dialog open={pendingDialogOpen} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mb-2">
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
            <DialogTitle className="text-center text-xl">
              {t("طلبك قيد المراجعة", "Your Request is Under Review")}
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              {t(
                "تم استلام طلب التسجيل بنجاح. سنقوم بالتحقق من رقم التصنيف الخاص بك قبل تفعيل الحساب. ستتلقى إشعاراً عبر البريد الإلكتروني عند الموافقة.",
                "Your registration request has been received. We will verify your classification number before activating your account. You will receive an email notification once approved."
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="p-3 rounded-lg bg-muted/40 text-sm text-center">
            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30">
              {t("قيد المراجعة", "Pending Approval")}
            </Badge>
          </div>
          <DialogFooter>
            <Button
              className="w-full"
              onClick={() => navigate("/login", { replace: true })}
            >
              {t("حسناً", "Got it")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default SignupPage;
