import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Certificate } from "@/types/certificate";
import {
  getCertificateDate,
  getCertificateName,
  getCertificateWorkshop,
} from "@/utils/certificateUtils";
import {
  Award,
  Calendar,
  Eye,
  FileBadge,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  User,
  Verified,
} from "lucide-react";
import { CertificateStatusBadge } from "./CertificateStatusBadge";

interface CertificateDetailsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  certificate: Certificate | null;
  onPreview: (cert: Certificate) => void;
}

export const CertificateDetailsModal = ({
  isOpen,
  onOpenChange,
  certificate,
  onPreview,
}: CertificateDetailsModalProps) => {
  const { t } = useLanguage();

  if (!certificate) return null;

  const details = [
    {
      icon: User,
      label: t("اسم المستلم", "Recipient Name"),
      value: getCertificateName(certificate, t),
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: GraduationCap,
      label: t("عنوان الورشة", "Workshop Title"),
      value: getCertificateWorkshop(certificate, t),
      color: "text-violet-500",
      bg: "bg-violet-500/10",
    },
    {
      icon: Calendar,
      label: t("تاريخ الإصدار", "Issue Date"),
      value: getCertificateDate(certificate),
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      icon: FileBadge,
      label: t("رقم الشهادة", "Certificate Serial"),
      value: certificate.serial_number || `CERT-${certificate.id}`,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[calc(100vh-80px)] overflow-y-auto overflow-x-hidden border border-border/50 rounded-[32px] p-0 shadow-[0_30px_120px_rgba(0,0,0,0.18)] top-[40px]  translate-y-0">
        {/* ───────────────── HEADER ───────────────── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#071120] via-[#0d1f38] to-[#122b4d] text-white">
          {/* Glow */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-yellow-400/10 blur-3xl" />

          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl" />

          {/* Pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          <DialogHeader className="relative px-8 pt-8 pb-8">
            {/* Serial Card */}
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7 text-yellow-300" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[4px] text-blue-100/70">
                    Verification Serial
                  </p>

                  <p className="text-2xl font-black tracking-wide text-yellow-300 mt-1">
                    {certificate.serial_number || `CERT-${certificate.id}`}
                  </p>
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* ───────────────── BODY ───────────────── */}
        <div className="px-8 py-8">
          {/* Summary Card */}
          <div className="relative overflow-hidden rounded-[30px] border border-border/60 bg-gradient-to-br from-muted/40 via-background to-background p-7 shadow-sm mb-7">
            <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative flex items-start gap-5">
              <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-xl shrink-0">
                <Verified className="w-8 h-8" />
              </div>

              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[4px] text-muted-foreground mb-3">
                  Certificate Summary
                </p>

                <h2 className="text-3xl font-black tracking-tight leading-tight">
                  {getCertificateName(certificate, t)}
                </h2>

                <p className="text-muted-foreground mt-3 leading-relaxed text-sm max-w-xl">
                  Successfully completed and participated in the professional
                  workshop certification program.
                </p>

                <div className="flex flex-wrap items-center gap-3 my-2">
                  <CertificateStatusBadge status={certificate.status} />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="px-4 py-2 rounded-xl border bg-background text-sm font-medium">
                    {getCertificateDate(certificate)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {details.map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card hover:shadow-xl transition-all duration-300 p-5"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl" />
                </div>

                <div className="relative flex items-start gap-4">
                  <div
                    className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center shrink-0
                      ${item.bg}
                    `}
                  >
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-[3px] text-muted-foreground mb-2">
                      {item.label}
                    </p>

                    <p className="text-base font-bold leading-relaxed break-words">
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-7 rounded-3xl border border-border/60 bg-muted/20 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  {t(
                    "شهادة موثقة ومعتمدة",
                    "Verified & Authenticated Certificate"
                  )}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                  {t(
                    "يمكن التحقق من صحة هذه الشهادة باستخدام الرقم التسلسلي أو رابط التحقق الرسمي الخاص بها.",
                    "This certificate can be officially verified using the serial number or verification URL."
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left Status */}
            <div className="flex items-center gap-3">
              <CertificateStatusBadge status={certificate.status} />

              <p className="text-sm text-muted-foreground">
                {t("الحالة الحالية للشهادة", "Current certificate status")}
              </p>
            </div>

            {/* Preview Button */}
            {/* <Button
              size="lg"
              className="rounded-2xl h-12 px-7 gap-2 shadow-lg"
              onClick={() => {
                onOpenChange(false);
                onPreview(certificate);
              }}
            >
              <Eye className="w-5 h-5" />

              {t("معاينة الشهادة", "Preview Certificate")}
            </Button> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
