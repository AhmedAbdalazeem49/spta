import AuthHero from "@/components/auth/AuthHero";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Info, Loader2, ShieldCheck, Smartphone } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    fullNameAr: "",
    fullNameEn: "",
    nationalId: "",
    email: "",
    phone: "",
    classificationNumber: "",
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

  const validate = () => {
    const e: Record<string, string> = {};

    if (!formData.fullNameAr) e.fullNameAr = t("مطلوب", "Required");
    if (!formData.fullNameEn) e.fullNameEn = t("مطلوب", "Required");
    if (!formData.nationalId) e.nationalId = t("مطلوب", "Required");
    if (!formData.email) e.email = t("مطلوب", "Required");
    if (!formData.phone) e.phone = t("مطلوب", "Required");

    if (!formData.password) e.password = t("مطلوب", "Required");

    if (formData.password !== formData.confirmPassword)
      e.confirmPassword = t("غير متطابقتين", "Passwords don't match");

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await proceedRegistration();
  };

  const proceedRegistration = async () => {
    setIsSubmitting(true);

    try {
      await register({
        name: formData.fullNameEn,
        name_ar: formData.fullNameAr,
        email: formData.email,
        phone: formData.phone,
        national_id: formData.nationalId,
        classification_number: formData.classificationNumber || undefined,
        specialization: formData.specialization || undefined,
        sub_specialization: formData.subSpecialization || undefined,
        employer: formData.workplace || undefined,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });

      toast({
        title: t("تم إنشاء الحساب", "Account Created"),
        description: t(
          "تحقق من البريد الإلكتروني باستخدام رمز التحقق",
          "Check your email for OTP verification"
        ),
      });

      navigate("/verify-otp", {
        state: {
          email: formData.email,
        },
      });
    } catch (error: any) {
      toast({
        title: t("خطأ", "Error"),
        description:
          error?.response?.data?.message ||
          error.message ||
          t("فشل إنشاء الحساب", "Registration failed"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <AuthHero
        titleAr="إنشاء حساب جديد"
        titleEn="Create New Account"
        subtitleAr="أنشئ حسابك للانضمام إلى مجتمعنا المهني"
        subtitleEn="Create your account to join our professional community"
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
                      <p className="text-destructive text-xs mt-1">
                        {errors.fullNameAr}
                      </p>
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
                      <p className="text-destructive text-xs mt-1">
                        {errors.fullNameEn}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">
                      {t("رقم الهوية الوطنية *", "National ID *")}
                    </Label>
                    <Input
                      value={formData.nationalId}
                      onChange={(e) =>
                        set(
                          "nationalId",
                          e.target.value.replace(/\D/g, "").slice(0, 10)
                        )
                      }
                      className={errors.nationalId ? "border-destructive" : ""}
                      dir="ltr"
                      placeholder="10XXXXXXXX"
                    />
                    {errors.nationalId && (
                      <p className="text-destructive text-xs mt-1">
                        {errors.nationalId}
                      </p>
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
                      <p className="text-destructive text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">
                      {t("رقم الجوال *", "Phone *")}
                    </Label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        className={`pl-10 ${
                          errors.phone ? "border-destructive" : ""
                        }`}
                        dir="ltr"
                        placeholder="+XXX XXXXXXXXX"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5 flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      {t(
                        "الرجاء إدخال رمز الدولة ورقم الجوال بالكامل",
                        "Please include country code and full phone number."
                      )}
                    </p>
                    {errors.phone && (
                      <p className="text-destructive text-xs mt-1">
                        {errors.phone}
                      </p>
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

              {/* ─── Classification Number ─── */}
              <div className="border-t border-border pt-6">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">
                    {t(
                      "رقم التصنيف (اختياري)",
                      "Classification Number (Optional)"
                    )}
                  </Label>
                  <Input
                    value={formData.classificationNumber}
                    onChange={(e) =>
                      set("classificationNumber", e.target.value)
                    }
                    dir="ltr"
                    placeholder="e.g. 123456"
                  />
                  <p className="text-xs text-muted-foreground mt-1.5 flex items-start gap-1.5">
                    <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    {t(
                      "رقم التصنيف اختياري ويمكن إضافته للممارسين الصحيين الذين يرغبون في التكامل المستقبلي مع الهيئة السعودية للتخصصات الصحية.",
                      "Classification number is optional and can be added for healthcare professionals who want future integration with Saudi health authorities."
                    )}
                  </p>
                </div>
              </div>

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
                      <p className="text-destructive text-xs mt-1">
                        {errors.password}
                      </p>
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
                      className={
                        errors.confirmPassword ? "border-destructive" : ""
                      }
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
    </Layout>
  );
};

export default SignupPage;
