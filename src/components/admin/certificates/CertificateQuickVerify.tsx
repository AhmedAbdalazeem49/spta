import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { Certificate } from "@/types/certificate";
import { getCertificateDate, getCertificateName, getCertificateWorkshop } from "@/utils/certificateUtils";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Eye, QrCode, Search, Shield, XCircle } from "lucide-react";

interface CertificateQuickVerifyProps {
  verifyCode: string;
  setVerifyCode: (code: string) => void;
  verifyResult: "success" | "error" | null;
  setVerifyResult: (result: "success" | "error" | null) => void;
  selected: Certificate | null;
  onVerify: () => void;
  onPreview: (cert: Certificate) => void;
}

export const CertificateQuickVerify = ({
  verifyCode,
  setVerifyCode,
  verifyResult,
  setVerifyResult,
  selected,
  onVerify,
  onPreview,
}: CertificateQuickVerifyProps) => {
  const { t } = useLanguage();

  return (
    <Card className="max-w-2xl mx-auto overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-primary via-blue-light to-green-accent" />
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {t("التحقق من الشهادة", "Verify Certificate")}
          </h2>
          <p className="text-muted-foreground">
            {t(
              "أدخل رقم الشهادة للتحقق من صحتها",
              "Enter certificate number to verify its authenticity"
            )}
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <QrCode className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder={t("مثال: CERT-2024-001", "e.g., CERT-2024-001")}
              value={verifyCode}
              onChange={(e) => {
                setVerifyCode(e.target.value);
                setVerifyResult(null);
              }}
              className="ps-12 h-12 text-lg"
              onKeyDown={(e) => e.key === "Enter" && onVerify()}
            />
          </div>
          <Button
            onClick={onVerify}
            className="h-12 px-8 bg-green-accent hover:bg-green-light gap-2"
          >
            <Search className="w-5 h-5" />
            {t("تحقق", "Verify")}
          </Button>
        </div>

        <AnimatePresence>
          {verifyResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-6 p-4 rounded-xl ${
                verifyResult === "success"
                  ? "bg-green-accent/10 border border-green-accent/30"
                  : "bg-destructive/10 border border-destructive/30"
              }`}
            >
              {verifyResult === "success" && selected ? (
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-8 h-8 text-green-accent flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-bold text-green-accent mb-2">
                      {t("شهادة موثقة ✓", "Certificate Verified ✓")}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-2 text-sm">
                      <p>
                        <strong>{t("الاسم:", "Name:")}</strong>{" "}
                        {getCertificateName(selected, t)}
                      </p>
                      <p>
                        <strong>{t("الورشة:", "Workshop:")}</strong>{" "}
                        {getCertificateWorkshop(selected, t)}
                      </p>
                      <p>
                        <strong>{t("التاريخ:", "Date:")}</strong>{" "}
                        {getCertificateDate(selected)}
                      </p>
                      {selected.hours && (
                        <p>
                          <strong>{t("الساعات:", "Hours:")}</strong>{" "}
                          {selected.hours}
                        </p>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-3 gap-1"
                      onClick={() => onPreview(selected)}
                    >
                      <Eye className="w-4 h-4" />
                      {t("معاينة الشهادة", "Preview Certificate")}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <XCircle className="w-8 h-8 text-destructive flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-destructive">
                      {t("شهادة غير موجودة", "Certificate Not Found")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(
                        "تأكد من صحة رقم الشهادة المدخل",
                        "Please check the certificate number and try again"
                      )}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
