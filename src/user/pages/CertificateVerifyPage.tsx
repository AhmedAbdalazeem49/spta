import CertificateTemplate from "@/components/CertificateTemplate";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";
import { motion } from "framer-motion";
import {
  Award,
  CheckCircle2,
  Shield,
  XCircle,
  Mail,
  MessageCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface VerificationResult {
  serial_number: string;
  recipient_name?: string;
  workshop_title?: string;
  issue_date?: string;
  status?: string;
}

const CertificateVerifyPage = () => {
  const { t } = useLanguage();
  const { serial_number } = useParams<{ serial_number: string }>();

  const [data, setData] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH VERIFY
  // =========================
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.get(`/certificates/verify/${serial_number}`);

        const payload = res.data?.data;

        setData(payload || null);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (serial_number) verify();
  }, [serial_number]);

  // =========================
  // CONTACT LINKS
  // =========================
  const whatsappLink = `https://wa.me/966500000000?text=Certificate%20verification%20issue:%20${serial_number}`;
  const emailLink = `mailto:support@spta.org?subject=Certificate Verification Issue&body=Serial: ${serial_number}`;

  const isValid = !!data; // ✅ FIXED LOGIC

  return (
    <Layout>
      <section className="min-h-screen bg-gradient-to-b from-muted/30 to-background px-4 py-28">
        <div className="max-w-4xl mx-auto">
          {/* ================= HEADER ================= */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-7 h-7 text-primary" />
              </div>
            </div>

            <h1 className="text-3xl font-bold">
              {t("التحقق من الشهادة", "Certificate Verification")}
            </h1>

            <p className="text-muted-foreground mt-2">
              {t(
                "صفحة رسمية للتحقق من صحة الشهادات",
                "Official certificate verification portal"
              )}
            </p>
          </motion.div>

          {/* ================= LOADING ================= */}
          {loading && (
            <Card>
              <CardContent className="p-6 space-y-3">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-40 w-full" />
              </CardContent>
            </Card>
          )}

          {/* ================= INVALID ================= */}
          {!loading && !isValid && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="border-red-200">
                <CardContent className="p-10 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center">
                    <XCircle className="w-8 h-8 text-red-600" />
                  </div>

                  <h2 className="text-xl font-bold">
                    {t("شهادة غير صالحة", "Invalid Certificate")}
                  </h2>

                  <p className="text-muted-foreground text-sm">
                    {t(
                      "لم يتم العثور على شهادة بهذا الرقم",
                      "No certificate found for this serial number"
                    )}
                  </p>

                  {/* SUPPORT */}
                  <div className="pt-6 space-y-3">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-green-600"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp Support
                    </a>

                    <br />

                    <a
                      href={emailLink}
                      className="inline-flex items-center gap-2 text-sm text-blue-600"
                    >
                      <Mail className="w-4 h-4" />
                      Email Support
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ================= VALID ================= */}
          {!loading && isValid && (
            <div className="space-y-6">
              {/* CERTIFICATE PREVIEW */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl overflow-hidden border shadow-lg"
              >
                <CertificateTemplate
                  cert={{
                    id: serial_number || "1",
                    ...data,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    issue_date: data?.issue_date || (data as any)?.issued_at,
                  }}
                />
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CertificateVerifyPage;
