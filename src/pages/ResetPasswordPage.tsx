import AuthHero from "@/components/auth/AuthHero";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const emailParam = searchParams.get("email") || "";

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.password) e.password = t("مطلوب", "Required");
    else if (formData.password.length < 8)
      e.password = t("8 أحرف على الأقل", "Min 8 characters");
    if (formData.password !== formData.confirmPassword)
      e.confirmPassword = t("غير متطابقتين", "Passwords don't match");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  if (!token || !emailParam) {
    toast({
      title: t("رابط غير صالح", "Invalid link"),
      description: t("رابط إعادة التعيين غير صحيح", "Reset link is invalid"),
      variant: "destructive",
    });
    navigate("/forgot-password");
    return;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await resetPassword({
        token,
        email: emailParam,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });
      setIsSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: any) {
      toast({
        title: t("خطأ", "Error"),
        description:
          err.response?.data?.message || t("حدث خطأ", "Something went wrong"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <AuthHero
        titleAr="إنشاء كلمة مرور جديدة"
        titleEn="Create New Password"
        subtitleAr="أدخل كلمة المرور الجديدة لحسابك"
        subtitleEn="Enter your new password below"
      />

      <section className="py-16 -mt-10 relative z-10">
        <div className="container-custom max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-3xl shadow-xl p-8 border border-border/50"
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">
                    {t("تم التغيير!", "Password Changed!")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t(
                      "جاري التحويل لتسجيل الدخول...",
                      "Redirecting to login..."
                    )}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t("كلمة المرور الجديدة", "New Password")}
                    </label>
                    <div className="relative">
                      <Lock
                        className={`absolute top-1/2 -translate-y-1/2 ${
                          isRTL ? "right-4" : "left-4"
                        } w-5 text-muted-foreground`}
                      />
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        value={formData.password}
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
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className={`absolute top-1/2 -translate-y-1/2 ${
                          isRTL ? "left-4" : "right-4"
                        } text-muted-foreground`}
                      >
                        {showNewPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-destructive text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t("تأكيد كلمة المرور", "Confirm Password")}
                    </label>

                    <div className="relative">
                      <Lock
                        className={`absolute top-1/2 -translate-y-1/2 ${
                          isRTL ? "right-4" : "left-4"
                        } w-5 text-muted-foreground`}
                      />

                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          });
                          setErrors({ ...errors, confirmPassword: "" });
                        }}
                        className={`${isRTL ? "pr-12 pl-12" : "pl-12 pr-12"} ${
                          errors.confirmPassword ? "border-destructive" : ""
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className={`absolute top-1/2 -translate-y-1/2 ${
                          isRTL ? "left-4" : "right-4"
                        } text-muted-foreground`}
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>

                    {errors.confirmPassword && (
                      <p className="text-destructive text-xs mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      t("تغيير كلمة المرور", "Reset Password")
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ResetPasswordPage;
