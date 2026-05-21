import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  Eye,
  QrCode,
  Search,
  Shield,
  XCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Certificate {
  id: number | string;
  serial_number: string;
  recipient_name?: string;
  workshop_title?: string;
  issue_date?: string;
}

interface Props {
  verifyCode: string;
  setVerifyCode: (code: string) => void;
}

export const CertificateQuickVerify = ({
  verifyCode,
  setVerifyCode,
}: Props) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Certificate | null>(null);
  const [error, setError] = useState(false);

  // ================= VERIFY =================
  const onVerify = async () => {
    if (!verifyCode) return;

    try {
      setLoading(true);
      setError(false);
      setResult(null);

      const res = await api.get(`/certificates/verify/${verifyCode}`);

      const payload = res.data?.data;

      if (!payload) {
        setError(true);
        return;
      }

      setResult(payload);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-primary via-blue-light to-green-accent" />
      <CardContent className="p-8">
        {/* ================= HEADER ================= */}
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
              "Enter certificate serial number"
            )}
          </p>
        </div>

        {/* ================= INPUT ================= */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <QrCode className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

            <Input
              placeholder="CERT-XXXXXX"
              value={verifyCode}
              onChange={(e) => {
                setVerifyCode(e.target.value);
                setError(false);
                setResult(null);
              }}
              className="ps-12 h-12 text-lg"
              onKeyDown={(e) => e.key === "Enter" && onVerify()}
            />
          </div>

          <Button
            onClick={onVerify}
            disabled={loading}
            className="h-12 px-8 bg-green-accent hover:bg-green-light gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}

            {t("تحقق", "Verify")}
          </Button>
        </div>

        {/* ================= RESULT ================= */}
        <AnimatePresence>
          {(loading || result || error) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6"
            >
              {/* LOADING */}
              {loading && (
                <div className="p-6 rounded-xl border bg-muted/30 flex items-center gap-3">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">
                    {t("جاري التحقق من الشهادة...", "Verifying certificate...")}
                  </p>
                </div>
              )}

              {/* SUCCESS */}
              {result && (
                <div className="p-5 rounded-xl bg-green-50 border border-green-200">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />

                    <div className="flex-1 space-y-2">
                      <h3 className="font-bold text-green-700">
                        {t("شهادة موثقة ✓", "Certificate Verified ✓")}
                      </h3>

                      <div className="text-sm space-y-1 text-muted-foreground">
                        <p>
                          <strong>{t("الاسم:", "Name:")}</strong>{" "}
                          {result.recipient_name}
                        </p>
                        <p>
                          <strong>{t("الورشة:", "Workshop:")}</strong>{" "}
                          {result.workshop_title}
                        </p>
                        <p>
                          <strong>{t("التاريخ:", "Date:")}</strong>{" "}
                          {result.issue_date}
                        </p>
                        <p>
                          <strong>{t("الرقم:", "Serial:")}</strong>{" "}
                          {result.serial_number}
                        </p>
                      </div>

                      {/* ACTIONS */}
                      <div className="flex gap-2 pt-3">
                        <Button
                          size="sm"
                          onClick={() =>
                            navigate(
                              `/certificates/verify/${result.serial_number}`
                            )
                          }
                        >
                          <Eye className="w-4 h-4 me-1" />
                          {t("عرض كامل", "Full View")}
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setResult(null);
                            setVerifyCode("");
                          }}
                        >
                          {t("تحقق جديد", "New Check")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ERROR */}
              {error && (
                <div className="p-5 rounded-xl bg-red-50 border border-red-200">
                  <div className="flex items-start gap-4">
                    <XCircle className="w-8 h-8 text-red-600" />

                    <div className="flex-1 space-y-2">
                      <h3 className="font-bold text-red-600">
                        {t("شهادة غير موجودة", "Not Found")}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {t(
                          "تأكد من رقم الشهادة وحاول مرة أخرى",
                          "Please check the serial number"
                        )}
                      </p>

                      <div className="flex gap-2 pt-3">
                        <Button size="sm" onClick={() => setError(false)}>
                          {t("إعادة المحاولة", "Retry")}
                        </Button>

                      </div>
                    </div>
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
