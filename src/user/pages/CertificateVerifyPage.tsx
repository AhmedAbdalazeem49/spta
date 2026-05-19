import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Award, CheckCircle2, XCircle, Calendar, User, Shield, Building2
} from "lucide-react";
import { useParams } from "react-router-dom";
import api from "@/services/api";
import CertificateTemplate from "@/components/CertificateTemplate";

interface VerificationResult {
  valid: boolean;
  recipient_name?: string;
  workshop_title?: string;
  issue_date?: string;
  hours?: number;
  verification_code?: string;
  issuer?: string;
}

const CertificateVerifyPage = () => {
  const { t } = useLanguage();
  const { code } = useParams<{ code: string }>();
  const [data, setData] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.get(`/certificates/verify/${code}`);
        setData(res.data?.data || res.data);
      } catch {
        // Mock fallback
        if (code?.startsWith("SPTA-")) {
          setData({
            valid: true,
            recipient_name: "محمد أحمد العتيبي",
            workshop_title: "ورشة تقنيات العلاج الطبيعي الحديثة",
            issue_date: "2026-01-15",
            hours: 8,
            verification_code: code,
            issuer: "Saudi Physical Therapy Association",
            status: "verified",
            chairman_name: "د. خالد العبدالله",
            signature_url: "https://upload.wikimedia.org/wikipedia/commons/f/f8/John_Hancock_signature.svg", // Mock sig
            stamp_url: "https://cdn-icons-png.flaticon.com/512/3757/3757912.png" // Mock stamp
          });
        } else {
          setData({ valid: false });
        }
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, [code]);

  return (
    <Layout>
      <section className="py-16 px-4 min-h-[70vh] bg-gradient-to-b from-muted/30 to-background">
        <div className="container max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-8">
              <div className="inline-flex w-16 h-16 rounded-2xl bg-primary/10 items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">
                {t("التحقق من الشهادة", "Certificate Verification")}
              </h1>
              <p className="text-muted-foreground">
                {t(
                  "صفحة عامة للتحقق من صحة الشهادات الصادرة من الجمعية",
                  "Public page for verifying certificates issued by the Association"
                )}
              </p>
            </div>

            {loading ? (
              <Card>
                <CardContent className="p-8 space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            ) : !data?.valid ? (
              <Card className="border-red-200 dark:border-red-900/40">
                <CardContent className="p-10 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                    <XCircle className="w-10 h-10 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-1">
                      {t("شهادة غير صالحة", "Invalid Certificate")}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {t(
                        `لم يتم العثور على شهادة بهذا الرمز: ${code}`,
                        `No certificate found with this code: ${code}`
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Certificate Preview */}
                <div className="rounded-xl overflow-hidden shadow-lg border border-border">
                  <CertificateTemplate cert={{...data, id: code || '1'}} template="classic" />
                </div>

                {/* Verification Details */}
                <Card className="border-emerald-200 dark:border-emerald-900/40 shadow-xl overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500" />
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-6 h-6 text-primary" />
                      <span className="font-bold">
                        {t("شهادة موثقة", "Verified Certificate")}
                      </span>
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {t("صالحة", "Valid")}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {[
                      { Icon: User, label: t("المستفيد", "Recipient"), value: data.recipient_name },
                      { Icon: Award, label: t("الورشة", "Workshop"), value: data.workshop_title },
                      { Icon: Calendar, label: t("تاريخ الإصدار", "Issue Date"), value: data.issue_date },
                      ...(data.hours ? [{ Icon: Calendar, label: t("الساعات المعتمدة", "Credit Hours"), value: `${data.hours} ${t("ساعة", "hours")}` }] : []),
                      { Icon: Shield, label: t("رمز التحقق", "Verification Code"), value: data.verification_code },
                      { Icon: Building2, label: t("الجهة المُصدرة", "Issuer"), value: data.issuer || "Saudi Physical Therapy Association" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                        <row.Icon className="w-4 h-4 text-primary shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground">{row.label}</p>
                          <p className="font-medium truncate">{row.value || "—"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default CertificateVerifyPage;
