import AuthHero from "@/components/auth/AuthHero";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  RefreshCw,
  Send,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtpPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);


  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleResend = async () => {
    if (!email) {
      toast({
        title: t("خطأ", "Error"),
        description: t("الرجاء إدخال البريد الإلكتروني", "Please enter your email"),
        variant: "destructive",
      });
      return;
    }
    
    try {
      setResendLoading(true);
      await api.post("/resend-otp", { email });
      setTimeLeft(120);
      toast({
        title: t("تم الإرسال", "Sent"),
        description: t("تم إرسال رمز تحقق جديد", "A new verification code has been sent"),
      });
    } catch (err: any) {
      toast({
        title: t("خطأ", "Error"),
        description: err.response?.data?.message || t("حدث خطأ أثناء إرسال الرمز", "Error sending code"),
        variant: "destructive",
      });
    } finally {
      setResendLoading(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !email) return;

    try {
      setLoading(true);
      const res = await api.post("/verify-otp", { email, otp });
      const data = res.data?.data;

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      toast({
        title: t("تم التحقق بنجاح", "Verification Successful"),
        description: t("تم تفعيل حسابك بنجاح.", "Your account has been activated successfully."),
      });

      window.location.href = "/membership";
    } catch (err: any) {
      toast({
        title: t("رمز غير صالح", "Invalid OTP"),
        description: err.response?.data?.message || t("الرمز الذي أدخلته غير صحيح.", "The code you entered is incorrect."),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleResend();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <AuthHero
        titleAr="تأكيد البريد الإلكتروني"
        titleEn="Verify Email"
        subtitleAr="الرجاء إدخال رمز التحقق المرسل إلى بريدك الإلكتروني"
        subtitleEn="Please enter the verification code sent to your email"
      />

      <section className="py-16 -mt-10 relative z-10">
        <div className="container-custom max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-3xl shadow-xl p-8 md:p-10 border border-border/50 text-center"
          >
            <div className="mx-auto w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
              <Mail className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-bold mb-2">
              {t("أدخل رمز التحقق", "Enter Verification Code")}
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              {email 
                ? t(`لقد أرسلنا رمزاً مكوناً من 6 أرقام إلى ${email}`, `We've sent a 6-digit code to ${email}`) 
                : t("يرجى إدخال بريدك الإلكتروني لتلقي الرمز", "Please enter your email to receive the code")
              }
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-xl p-4 mb-6 flex items-start gap-3 text-start"
            >
              <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {t(
                  "تنويه: قد تصل رسالة التحقق إلى مجلد الرسائل غير المرغوب فيها (Spam / Junk). يرجى التحقق منه.",
                  "Note: The verification email may arrive in your Spam or Junk folder. Please check it."
                )}
              </p>
            </motion.div>

            <form onSubmit={verifyOtp} className="space-y-6">
              {!location.state?.email && (
                <div className="mb-4">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("البريد الإلكتروني", "Email Address")}
                    className="h-12 text-center"
                    dir="ltr"
                  />
                </div>
              )}

              <div>
                <Input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder={t("أدخل الرمز هنا...", "Enter code here...")}
                  className="text-center text-2xl tracking-[0.5em] h-14"
                  maxLength={6}
                  dir="ltr"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 text-base"
                disabled={loading || otp.length < 4 || !email}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0" />
                    {t("تأكيد وحفظ", "Verify & Continue")}
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">
                {t("لم تستلم الرمز؟", "Didn't receive the code?")}
              </p>
              
              <Button
                variant="outline"
                onClick={handleResend}
                disabled={timeLeft > 0 || resendLoading || !email}
                className="w-full md:w-auto min-w-[200px]"
              >
                {resendLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : timeLeft > 0 ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    {t(`إعادة الإرسال بعد ${formatTime(timeLeft)}`, `Resend in ${formatTime(timeLeft)}`)}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    {t("إعادة إرسال الرمز", "Resend Code")}
                  </span>
                )}
              </Button>
            </div>

          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default VerifyOtpPage;
