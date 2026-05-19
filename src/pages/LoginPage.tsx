import AuthHero from "@/components/auth/AuthHero";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  AlertCircle,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const LoginPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    const errs: Record<string, string> = {};

    const email = formData.email.trim();

    if (!email) {
      errs.email = t("البريد مطلوب", "Email is required");
    } else if (!emailRegex.test(email)) {
      errs.email = t("بريد إلكتروني غير صالح", "Invalid email format");
    }

    if (!formData.password) {
      errs.password = t("كلمة المرور مطلوبة", "Password is required");
    } else if (formData.password.length < 8) {
      errs.password = t("يجب أن تكون 8 أحرف على الأقل", "Minimum 8 characters");
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await login(formData.email.trim(), formData.password);

      toast({
        title: t("تم تسجيل الدخول", "Logged In"),
        description: t("مرحباً بعودتك 👋", "Welcome back 👋"),
      });

      const from = (location.state as any)?.from?.pathname || "/profile";

      navigate(from, { replace: true });
    } catch (error: any) {
      const data = error?.response?.data;

      toast({
        title: t("خطأ في تسجيل الدخول", "Login failed"),
        description:
          data?.message ||
          t(
            "تحقق من البيانات وحاول مرة أخرى",
            "Check your credentials and try again"
          ),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputWrapper = (field: string) =>
    `relative transition-all ${errors[field] ? "animate-pulse" : ""}`;

  const inputClass = (field: string) =>
    `${isRTL ? "pr-12" : "pl-12"} ${
      errors[field] ? "border-destructive focus-visible:ring-destructive" : ""
    }`;

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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("البريد الإلكتروني", "Email")}
                </label>

                <div className={inputWrapper("email")}>
                  <Mail
                    className={`absolute top-1/2 -translate-y-1/2 ${
                      isRTL ? "right-4" : "left-4"
                    } w-5 text-muted-foreground`}
                  />

                  <Input
                    type="email"
                    value={formData.email}
                    aria-invalid={!!errors.email}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      });
                      setErrors({ ...errors, email: "" });
                    }}
                    className={inputClass("email")}
                    placeholder={t("أدخل بريدك الإلكتروني", "Enter your email")}
                  />
                </div>

                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1 text-destructive text-xs mt-2"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("كلمة المرور", "Password")}
                </label>

                <div className={inputWrapper("password")}>
                  <Lock
                    className={`absolute top-1/2 -translate-y-1/2 ${
                      isRTL ? "right-4" : "left-4"
                    } w-5 text-muted-foreground`}
                  />

                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    aria-invalid={!!errors.password}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      });
                      setErrors({ ...errors, password: "" });
                    }}
                    className={`${isRTL ? "pr-12 pl-12" : "pl-12 pr-12"} ${
                      errors.password ? "border-destructive" : ""
                    }`}
                    placeholder={t("أدخل كلمة المرور", "Enter your password")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute top-1/2 -translate-y-1/2 ${
                      isRTL ? "left-4" : "right-4"
                    } text-muted-foreground hover:text-foreground transition`}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1 text-destructive text-xs mt-2"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* FORGOT */}
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  {t("نسيت كلمة المرور؟", "Forgot password?")}
                </Link>
              </div>

              {/* SUBMIT */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {t("تسجيل الدخول", "Sign In")}
                    <ArrowRight
                      className={`ms-2 w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                    />
                  </>
                )}
              </Button>

              {/* SIGNUP */}
              <p className="text-center text-sm text-muted-foreground">
                {t("ليس لديك حساب؟", "Don't have an account?")}{" "}
                <Link
                  to="/signup"
                  className="text-primary font-medium hover:underline"
                >
                  {t("إنشاء حساب", "Create Account")}
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;
