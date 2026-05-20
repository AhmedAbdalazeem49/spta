import CertificateTemplate, {
  CertTemplate,
} from "@/components/CertificateTemplate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { downloadElementAsPdf, printElement } from "@/lib/certificate-export";
import api from "@/services/api";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Award,
  Download,
  Loader2,
  Palette,
  Printer,
  Search,
  Share2,
  Shield,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Certificate {
  id: string | number;
  recipient_name?: string;
  workshop_title?: string;
  issue_date?: string;
  hours?: number;
  status?: string;
  verification_code?: string;
  template?: CertTemplate;
}

const TEMPLATES: { key: CertTemplate; labelAr: string; labelEn: string }[] = [
  { key: "classic", labelAr: "كلاسيكي", labelEn: "Classic" },
  { key: "modern", labelAr: "عصري", labelEn: "Modern" },
  { key: "elegant", labelAr: "فاخر", labelEn: "Elegant" },
  { key: "minimal", labelAr: "بسيط", labelEn: "Minimal" },
];

// ─── Component ────────────────────────────────────────────────────────────────

const CertificatesTab = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [templateMap, setTemplateMap] = useState<Record<string, CertTemplate>>(
    {}
  );
  const [busyId, setBusyId] = useState<string | null>(null);

  const certRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    fetchCertificates();
  }, []);

  // ── Fetch ────────────────────────────────────────────────────────────────────

  const fetchCertificates = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const res = await api.get("/my-certificates");
      const data = res.data?.data || res.data || [];
      setCertificates(Array.isArray(data) ? data : []);
    } catch {
      setHasError(true);
      setCertificates([]);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Helpers ──────────────────────────────────────────────────────────────────

  const getTemplate = (id: string | number): CertTemplate =>
    templateMap[String(id)] || "classic";

  const setCertTemplate = (id: string | number, tpl: CertTemplate) =>
    setTemplateMap((prev) => ({ ...prev, [String(id)]: tpl }));



  // ── Actions ──────────────────────────────────────────────────────────────────

  const handleDownload = async (cert: Certificate) => {
    const el = certRefs.current[String(cert.id)];
    if (!el) return;
    setBusyId(String(cert.id));
    try {
      const name = `${cert.recipient_name || "user"}-${
        cert.workshop_title || "certificate"
      }`;
      await downloadElementAsPdf(el, `certificate-${name}`);
      toast({ title: t("تم تحميل الشهادة", "Certificate downloaded") });
    } catch {
      toast({
        title: t("تعذر التحميل", "Download failed"),
        variant: "destructive",
      });
    } finally {
      setBusyId(null);
    }
  };



  const handleShare = async (cert: Certificate) => {
    const verifyUrl = `${window.location.origin}/certificates/verify/${cert.verification_code}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: t(
            "شهادة من الجمعية السعودية للعلاج الطبيعي",
            "Certificate from SPTA"
          ),
          text: `${cert.workshop_title} - ${cert.verification_code}`,
          url: verifyUrl,
        });
      } else {
        await navigator.clipboard.writeText(verifyUrl);
        toast({ title: t("تم نسخ رابط التحقق", "Verification link copied") });
      }
    } catch {}
  };

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <motion.div
      key="certificates"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      {/* ── Loading skeletons ── */}
      {isLoading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-56 rounded-2xl" />
              <div className="space-y-2 px-1">
                <Skeleton className="h-6 rounded-lg w-3/4" />
                <Skeleton className="h-8 rounded-lg" />
                <Skeleton className="h-8 rounded-lg w-5/6" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Error state ── */}
      {!isLoading && hasError && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 gap-4 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-destructive/60" />
          </div>
          <div>
            <p className="font-semibold text-sm">
              {t("حدث خطأ أثناء التحميل", "Failed to load certificates")}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {t(
                "تحقق من اتصالك وحاول مجدداً",
                "Check your connection and try again"
              )}
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={fetchCertificates}>
            {t("إعادة المحاولة", "Try Again")}
          </Button>
        </motion.div>
      )}

      {/* ── Empty state ── */}
      {!isLoading && !hasError && certificates.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 text-center gap-4"
        >
          <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
            <Award className="w-10 h-10 text-muted-foreground/40" />
          </div>

          <div>
            <h3 className="text-lg font-bold mb-1">
              {t("لا توجد شهادات بعد", "No Certificates Yet")}
            </h3>

            <p className="text-muted-foreground text-sm max-w-xs">
              {t(
                "ستظهر شهاداتك هنا بعد إتمام ورش العمل",
                "Your certificates will appear here after completing workshops"
              )}
            </p>
          </div>

          <Button onClick={() => navigate("/workshops")} className="mt-2">
            {t("استعرض الورش", "Browse Workshops")}
          </Button>
        </motion.div>
      )}

      {/* ── Certificates grid ── */}
      {!isLoading && !hasError && certificates.length > 0 && (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-7">
            <AnimatePresence>
              {certificates.map((cert, i) => {
                const tpl = getTemplate(cert.id);
                const isBusy = busyId === String(cert.id);

                return (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      delay: i * 0.06,
                      type: "spring",
                      stiffness: 280,
                      damping: 26,
                    }}
                    className="rounded-2xl border border-border/60 overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-card"
                  >
                    {/* Certificate preview */}
                    <div
                      ref={(node) => (certRefs.current[String(cert.id)] = node)}
                      className="w-full"
                    >
                      <CertificateTemplate cert={cert} template={tpl} />
                    </div>

                    {/* Controls */}
                    <div className="p-4 space-y-3 border-t no-print bg-card">
                      {/* Template picker */}
                      <div>
                        <p className="text-[11px] font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                          <Palette className="w-3.5 h-3.5" />
                          {t("اختر التصميم", "Choose Template")}
                        </p>
                        <div className="grid grid-cols-4 gap-1.5">
                          {TEMPLATES.map((tplOpt) => (
                            <button
                              key={tplOpt.key}
                              onClick={() =>
                                setCertTemplate(cert.id, tplOpt.key)
                              }
                              className={`
                                text-[11px] font-medium py-1.5 px-2 rounded-lg border
                                transition-all duration-150
                                ${
                                  tpl === tplOpt.key
                                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                    : "bg-background hover:bg-muted border-border text-muted-foreground hover:text-foreground"
                                }
                              `}
                            >
                              {t(tplOpt.labelAr, tplOpt.labelEn)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handleDownload(cert)}
                          disabled={isBusy}
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-1.5 text-xs h-8"
                        >
                          {isBusy ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Download className="w-3.5 h-3.5" />
                          )}
                          {t("تحميل PDF", "Download PDF")}
                        </Button>

                        <Button
                          onClick={() => handleShare(cert)}
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-1.5 text-xs h-8"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          {t("مشاركة", "Share")}
                        </Button>
                      </div>

                      {/* Verification code */}
                      {cert.verification_code && (
                        <p className="text-[10px] text-muted-foreground text-center flex items-center justify-center gap-1 pt-0.5">
                          <Shield className="w-3 h-3 shrink-0" />
                          {t("رمز التحقق:", "Verification:")}{" "}
                          {cert.verification_code}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Count footer */}
          <p className="text-[11px] text-muted-foreground text-center pt-1">
            {isRTL
              ? `${certificates.length} ${
                  certificates.length === 1 ? "شهادة" : "شهادات"
                }`
              : `${certificates.length} ${
                  certificates.length === 1 ? "certificate" : "certificates"
                }`}
          </p>
        </>
      )}
    </motion.div>
  );
};

export default CertificatesTab;
