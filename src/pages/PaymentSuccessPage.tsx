import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { CheckCircle2, Home, FileText, Clock } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const PaymentSuccessPage = () => {
  const { t } = useLanguage();
  const [params] = useSearchParams();
  const source = params.get("source");
  const txId = params.get("tx") || `TX-${Date.now().toString().slice(-8)}`;

  const isSignup = source === "signup";

  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-gradient-to-b from-emerald-50/50 to-background dark:from-emerald-950/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-lg"
        >
          <Card className="border-emerald-200 dark:border-emerald-900/40 shadow-xl rounded-3xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500" />
            <CardContent className="p-8 text-center space-y-5">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mx-auto w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-600" />
              </motion.div>

              <div>
                <h1 className="text-2xl font-bold mb-1">
                  {t("تم الدفع بنجاح!", "Payment Successful!")}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {t(
                    "شكراً لك. لقد تم استلام دفعتك بنجاح.",
                    "Thank you. Your payment was received successfully."
                  )}
                </p>
              </div>

              <div className="bg-muted/40 rounded-xl p-4 text-start space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {t("رقم العملية", "Transaction ID")}
                  </span>
                  <span className="font-mono font-semibold">{txId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {t("التاريخ", "Date")}
                  </span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    {t("الحالة", "Status")}
                  </span>
                  <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                    {t("مكتمل", "Completed")}
                  </Badge>
                </div>
              </div>

              {isSignup && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-start">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-yellow-800 dark:text-yellow-300">
                        {t("حسابك قيد المراجعة", "Your account is under review")}
                      </p>
                      <p className="text-muted-foreground text-xs mt-1">
                        {t(
                          "سيتم تفعيل حسابك بعد التحقق من بياناتك من قبل الإدارة.",
                          "Your account will be activated once your data is verified by the administration."
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/">
                    <Home className="w-4 h-4 me-1.5" />
                    {t("الرئيسية", "Home")}
                  </Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link to={isSignup ? "/login" : "/profile"}>
                    <FileText className="w-4 h-4 me-1.5" />
                    {isSignup
                      ? t("تسجيل الدخول", "Login")
                      : t("الملف الشخصي", "Profile")}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </Layout>
  );
};

export default PaymentSuccessPage;
