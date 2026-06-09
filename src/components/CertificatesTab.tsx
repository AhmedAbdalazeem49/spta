import CertificateTemplate, {
  CertTemplate,
} from "@/components/CertificateTemplate";
import { CertificatePreviewModal } from "@/components/admin/certificates/CertificatePreviewModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { downloadElementAsPdf } from "@/lib/certificate-export";
import api from "@/services/api";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Award,
  Download,
  ExternalLink,
  Loader2,
  Shield,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Certificate {
  id: string | number;
  recipient_name?: string;
  workshop_title?: string;
  issue_date?: string;
  status?: string;
  serial_number?: string;
  template?: CertTemplate;
}

// ─── Component ────────────────────────────────────────────────────────────────

const CertificatesTab = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [templateMap, setTemplateMap] = useState<Record<string, CertTemplate>>(
    {},
  );
  const [busyId, setBusyId] = useState<string | null>(null);
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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
    templateMap[String(id)] || "modern";

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

      toast({
        title: "Certificate Downloaded",
        description: "Your certificate PDF has been downloaded successfully.",
      });
    } catch {
      toast({
        title: "Download Failed",
        description: "Something went wrong while downloading the certificate.",
        variant: "destructive",
      });
    } finally {
      setBusyId(null);
    }
  };

  const handleCopyLink = async (cert: Certificate) => {
    const link = `${window.location.origin}/certificate/verify/${cert.serial_number}`;

    await navigator.clipboard.writeText(link);

    toast({
      title: "Link Copied",
      description: "Certificate verification link copied successfully.",
    });
  };

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <motion.div
      key="certificates"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      {/* ───────────────── Loading State ───────────────── */}
      {isLoading && (
        <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-7">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-3xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <Skeleton className="h-64 w-full" />

              <div className="p-5 space-y-3">
                <Skeleton className="h-5 w-1/2 rounded-lg" />
                <Skeleton className="h-10 rounded-xl" />
                <Skeleton className="h-10 rounded-xl" />
                <Skeleton className="h-4 w-2/3 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ───────────────── Error State ───────────────── */}
      {!isLoading && hasError && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="w-20 h-20 rounded-3xl bg-destructive/10 flex items-center justify-center mb-5">
            <AlertCircle className="w-10 h-10 text-destructive/70" />
          </div>

          <h3 className="text-xl font-bold mb-2">
            Failed to Load Certificates
          </h3>

          <p className="text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed">
            We couldn't load your certificates at the moment. Please check your
            internet connection and try again.
          </p>

          <Button
            size="sm"
            variant="outline"
            onClick={fetchCertificates}
            className="rounded-xl"
          >
            Try Again
          </Button>
        </motion.div>
      )}

      {/* ───────────────── Empty State ───────────────── */}
      {!isLoading && !hasError && certificates.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border border-primary/10">
              <Award className="w-12 h-12 text-primary/70" />
            </div>

            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-2">No Certificates Yet</h3>

          <p className="text-muted-foreground text-sm max-w-md leading-relaxed mb-7">
            Your certificates will appear here after successfully completing
            your workshops and training sessions.
          </p>

          <Button
            onClick={() => navigate("/workshops")}
            className="rounded-xl px-6"
          >
            Browse Workshops
          </Button>
        </motion.div>
      )}

      {/* ───────────────── Certificates Grid ───────────────── */}
      {!isLoading && !hasError && certificates.length > 0 && (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                My Certificates
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                Download, customize, and verify your workshop certificates.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-2xl border bg-card px-4 py-2 text-sm shadow-sm">
              <Award className="w-4 h-4 text-primary" />

              <span className="font-medium">
                {certificates.length}{" "}
                {certificates.length === 1 ? "Certificate" : "Certificates"}
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-8">
            <AnimatePresence>
              {certificates.map((cert, i) => {
                const tpl = getTemplate(cert.id);
                const isBusy = busyId === String(cert.id);

                return (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      delay: i * 0.06,
                      type: "spring",
                      stiffness: 260,
                      damping: 24,
                    }}
                    className="group rounded-[30px] overflow-hidden border border-border/60 bg-card shadow-sm hover:shadow-2xl transition-all duration-300"
                  >
                    {/* ───────────────── Certificate Preview ───────────────── */}
                    <div
                      onClick={() => {
                        setSelectedCert(cert);
                        setIsPreviewOpen(true);
                      }}
                      className="relative overflow-hidden bg-muted/20 cursor-pointer"
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 blur-3xl rounded-full" />
                      </div>

                      <div
                        ref={(node) =>
                          (certRefs.current[String(cert.id)] = node)
                        }
                        className="w-full pointer-events-none select-none"
                      >
                        <CertificateTemplate cert={cert} template={tpl} />
                      </div>
                    </div>

                    {/* ───────────────── Content Section ───────────────── */}
                    <div className="p-5 space-y-5 border-t bg-card">
                      {/* Workshop Info */}
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="font-bold text-base leading-tight truncate">
                              {cert.workshop_title || "Workshop Certificate"}
                            </h3>

                            <p className="text-sm text-muted-foreground mt-1">
                              Issued to{" "}
                              <span className="font-medium text-foreground">
                                {cert.recipient_name || "Participant"}
                              </span>
                            </p>
                          </div>

                          <div className="shrink-0 rounded-xl bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary border border-primary/10">
                            Certified
                          </div>
                        </div>

                        {cert.issue_date && (
                          <p className="text-xs text-muted-foreground">
                            Issue Date:{" "}
                            {new Date(cert.issue_date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </p>
                        )}
                      </div>

                      {/* ───────────────── Action Buttons ───────────────── */}
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => {
                            setSelectedCert(cert);
                            setIsPreviewOpen(true);
                          }}
                          variant="default"
                          size="sm"
                          className="flex-1 h-10 rounded-xl gap-2 font-medium"
                        >
                          <Download className="w-4 h-4" />
                          {t("معاينة وتحميل", "View & Download")}
                        </Button>

                        <Button
                          onClick={() => handleCopyLink(cert)}
                          variant="outline"
                          size="sm"
                          className="h-10 rounded-xl gap-2 px-4"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Copy Link
                        </Button>
                      </div>

                      {/* ───────────────── Verification ───────────────── */}
                      {cert.serial_number && (
                        <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/5 px-4 py-3">
                          <div className="flex items-center justify-center gap-2 text-center">
                            <Shield className="w-4 h-4 text-emerald-600 shrink-0" />

                            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium break-all">
                              Verification Code: {cert.serial_number}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* ───────────────── Footer ───────────────── */}
          <div className="pt-2">
            <div className="mx-auto w-fit rounded-2xl border bg-card px-5 py-2 shadow-sm">
              <p className="text-xs text-muted-foreground text-center">
                You currently own{" "}
                <span className="font-semibold text-foreground">
                  {certificates.length}
                </span>{" "}
                {certificates.length === 1
                  ? "professional certificate"
                  : "professional certificates"}
              </p>
            </div>
          </div>
        </>
      )}
      <CertificatePreviewModal
        isOpen={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        certificate={selectedCert}
      />
    </motion.div>
  );
};

export default CertificatesTab;
