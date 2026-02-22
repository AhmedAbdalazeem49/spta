import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import AuthHero from "@/components/auth/AuthHero";

const ForgotPasswordPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError(t("البريد مطلوب", "Email is required")); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError(t("بريد غير صالح", "Invalid email")); return; }
    
    setIsSubmitting(true);
    try {
      await forgotPassword(email);
      setIsSent(true);
    } catch (err: any) {
      toast({
        title: t("خطأ", "Error"),
        description: err.response?.data?.message || t("حدث خطأ", "Something went wrong"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <AuthHero
        titleAr="استعادة كلمة المرور"
        titleEn="Reset Your Password"
        subtitleAr="سنرسل لك رابطاً لإعادة تعيين كلمة المرور"
        subtitleEn="We'll send you a link to reset your password"
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
              {isSent ? (
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
                  <h3 className="text-xl font-bold mb-2">{t("تم الإرسال!", "Email Sent!")}</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {t("تحقق من بريدك الإلكتروني للحصول على رابط إعادة التعيين", "Check your email for a reset link")}
                  </p>
                  <Link to="/login">
                    <Button variant="outline" className="gap-2">
                      <ArrowLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                      {t("العودة لتسجيل الدخول", "Back to Login")}
                    </Button>
                  </Link>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t("البريد الإلكتروني", "Email")}</label>
                    <div className="relative">
                      <Mail className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? "right-4" : "left-4"} w-5 text-muted-foreground`} />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(""); }}
                        className={`${isRTL ? "pr-12" : "pl-12"} ${error ? "border-destructive" : ""}`}
                        placeholder={t("أدخل بريدك", "Enter your email")}
                      />
                    </div>
                    {error && <p className="text-destructive text-xs mt-1">{error}</p>}
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : t("إرسال رابط الاستعادة", "Send Reset Link")}
                  </Button>

                  <p className="text-center text-sm">
                    <Link to="/login" className="text-primary font-medium hover:underline">
                      {t("العودة لتسجيل الدخول", "Back to Login")}
                    </Link>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ForgotPasswordPage;
