import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { XCircle, Home, RefreshCw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const PaymentFailedPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-gradient-to-b from-red-50/50 to-background dark:from-red-950/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-lg"
        >
          <Card className="border-red-200 dark:border-red-900/40 shadow-xl rounded-3xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-red-500 to-rose-500" />
            <CardContent className="p-8 text-center space-y-5">
              <div className="mx-auto w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">
                  {t("فشل الدفع", "Payment Failed")}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {t(
                    "تعذر إتمام عملية الدفع. يرجى المحاولة مرة أخرى أو استخدام طريقة دفع مختلفة.",
                    "We couldn't process your payment. Please try again or use a different payment method."
                  )}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/">
                    <Home className="w-4 h-4 me-1.5" />
                    {t("الرئيسية", "Home")}
                  </Link>
                </Button>
                <Button onClick={() => navigate(-1)} className="flex-1">
                  <RefreshCw className="w-4 h-4 me-1.5" />
                  {t("إعادة المحاولة", "Try Again")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </Layout>
  );
};

export default PaymentFailedPage;
