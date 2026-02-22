import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import AuthHero from "@/components/auth/AuthHero";

const LoginPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({ email: "", password: "" });

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.email) errs.email = t("البريد مطلوب", "Email is required");
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = t("بريد غير صالح", "Invalid email");
    if (!formData.password) errs.password = t("كلمة المرور مطلوبة", "Password is required");
    else if (formData.password.length < 8) errs.password = t("8 أحرف على الأقل", "Min 8 characters");
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await login(formData.email, formData.password);
      toast({ title: t("تم تسجيل الدخول", "Logged In"), description: t("مرحباً بعودتك", "Welcome back") });
      const from = (location.state as any)?.from?.pathname || "/profile";
      navigate(from, { replace: true });
    } catch (error: any) {
      const data = error.response?.data;
      if (data?.errors) {
        const firstError = Object.values(data.errors)[0] as string[];
        toast({ title: t("خطأ", "Error"), description: firstError[0], variant: "destructive" });
      } else {
        toast({ title: t("خطأ", "Error"), description: data?.message || t("بيانات غير صحيحة", "Invalid credentials"), variant: "destructive" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `${isRTL ? "pr-12" : "pl-12"} ${errors[field] ? "border-destructive focus-visible:ring-destructive" : ""}`;

  return (
    <Layout>
      <AuthHero
        titleAr="مرحباً بعودتك"
        titleEn="Welcome Back"
        subtitleAr="سجّل دخولك للوصول إلى حسابك المهني"
        subtitleEn="Sign in to access your professional account"
      />

      <section className="py-16 -mt-10 relative z-10">
        <div className="container-custom max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-3xl shadow-xl p-8 border border-border/50"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">{t("البريد الإلكتروني", "Email")}</label>
                <div className="relative">
                  <Mail className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? "right-4" : "left-4"} w-5 text-muted-foreground`} />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                    className={inputClass("email")}
                    placeholder={t("أدخل بريدك", "Enter your email")}
                  />
                </div>
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2">{t("كلمة المرور", "Password")}</label>
                <div className="relative">
                  <Lock className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? "right-4" : "left-4"} w-5 text-muted-foreground`} />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => { setFormData({ ...formData, password: e.target.value }); setErrors({ ...errors, password: "" }); }}
                    className={`${isRTL ? "pr-12 pl-12" : "pl-12 pr-12"} ${errors.password ? "border-destructive" : ""}`}
                    placeholder={t("أدخل كلمة المرور", "Enter your password")}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? "left-4" : "right-4"} text-muted-foreground`}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
              </div>

              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  {t("نسيت كلمة المرور؟", "Forgot password?")}
                </Link>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    {t("تسجيل الدخول", "Sign In")}
                    <ArrowRight className={`ms-2 w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                  </>
                )}
              </Button>

              <p className="text-center text-sm">
                {t("ليس لديك حساب؟", "Don't have an account?")}{" "}
                <Link to="/signup" className="text-primary font-medium hover:underline">{t("إنشاء حساب", "Create Account")}</Link>
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;
