import AuthHero from "@/components/auth/AuthHero";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
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
    email: "",
    phone: "",
    nationalId: "",
    specialization: "",
    subSpecialization: "",
    workplace: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });

  const set = (field: string, value: string) => {
    setFormData((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.fullNameEn) e.fullNameEn = t("مطلوب", "Required");
    if (!formData.email) e.email = t("مطلوب", "Required");
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      e.email = t("بريد غير صالح", "Invalid email");
    if (!formData.phone) e.phone = t("مطلوب", "Required");
    if (!formData.nationalId) e.nationalId = t("مطلوب", "Required");
    if (!formData.specialization) e.specialization = t("مطلوب", "Required");
    if (!formData.subSpecialization)
      e.subSpecialization = t("مطلوب", "Required");
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
    setIsSubmitting(true);
    try {
      await register({
        name: formData.fullNameEn,
        name_ar: formData.fullNameAr,
        email: formData.email,
        phone: formData.phone,
        national_id: formData.nationalId,
        specialization: formData.specialization,
        sub_specialization: formData.subSpecialization,
        employer: formData.workplace,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });
      toast({
        title: t("تم إنشاء الحساب", "Account Created"),
        description: t("مرحباً بك!", "Welcome!"),
      });
      navigate("/profile", { replace: true });
    } catch (error: any) {
      const data = error.response?.data;
      if (data?.errors) {
        const firstError = Object.values(data.errors)[0] as string[];
        toast({
          title: t("خطأ", "Error"),
          description: firstError[0],
          variant: "destructive",
        });
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

  const fields = [
    {
      key: "fullNameAr",
      label: t("الاسم الرباعي (عربي)", "Full Name (Arabic)"),
      type: "text",
    },
    {
      key: "fullNameEn",
      label: t("الاسم الرباعي (English)", "Full Name (English)"),
      type: "text",
    },
    { key: "email", label: t("البريد الإلكتروني", "Email"), type: "email" },
    { key: "phone", label: t("رقم الجوال", "Phone Number"), type: "tel" },
    { key: "nationalId", label: t("رقم الهوية", "National ID"), type: "text" },
    {
      key: "specialization",
      label: t("التخصص", "Specialization"),
      type: "text",
    },
    {
      key: "subSpecialization",
      label: t("التخصص الدقيق", "Sub-specialization"),
      type: "text",
    },
    { key: "workplace", label: t("جهة العمل", "Workplace"), type: "text" },
    { key: "password", label: t("كلمة المرور", "Password"), type: "password" },
    {
      key: "confirmPassword",
      label: t("تأكيد كلمة المرور", "Confirm Password"),
      type: "password",
    },
  ];

  return (
    <Layout>
      <AuthHero
        titleAr="انضم إلى مجتمعنا المهني"
        titleEn="Join Our Professional Community"
        subtitleAr="أنشئ حسابك وابدأ رحلتك المهنية"
        subtitleEn="Create your account and start your professional journey"
      />

      <section className="py-16 -mt-10 relative z-10">
        <div className="container-custom max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-3xl shadow-xl p-8 md:p-10 border border-border/50"
          >
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
              {fields.map((f) => (
                <div key={f.key} className={f.key === "workplace" ? "" : ""}>
                  <label className="block text-sm font-medium mb-1.5">
                    {f.label}
                  </label>
                  <Input
                    type={f.type}
                    value={(formData as any)[f.key]}
                    onChange={(e) => set(f.key, e.target.value)}
                    className={errors[f.key] ? "border-destructive" : ""}
                    placeholder={f.label}
                  />
                  {errors[f.key] && (
                    <p className="text-destructive text-xs mt-1">
                      {errors[f.key]}
                    </p>
                  )}
                </div>
              ))}

              <div className="md:col-span-2">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    t("إنشاء الحساب", "Create Account")
                  )}
                </Button>
              </div>
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
