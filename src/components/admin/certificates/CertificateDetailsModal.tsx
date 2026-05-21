import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Certificate } from "@/types/certificate";
import { getCertificateDate, getCertificateName, getCertificateWorkshop } from "@/utils/certificateUtils";
import { Award, Calendar, Clock, GraduationCap, User } from "lucide-react";
import { CertificateStatusBadge } from "./CertificateStatusBadge";

interface CertificateDetailsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  certificate: Certificate | null;
  onPreview: (cert: Certificate) => void;
}

export const CertificateDetailsModal = ({ isOpen, onOpenChange, certificate, onPreview }: CertificateDetailsModalProps) => {
  const { t } = useLanguage();

  if (!certificate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t("تفاصيل الشهادة", "Certificate Details")}
          </DialogTitle>
          <DialogDescription>#{certificate.id}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-midnight to-dark-navy text-center text-white">
            <Award className="w-10 h-10 mx-auto mb-2 text-mint" />
            <p className="font-bold">
              {t("شهادة حضور", "Certificate of Attendance")}
            </p>
          </div>
          {[
            {
              icon: User,
              label: t("المستلم", "Recipient"),
              value: getCertificateName(certificate, t),
            },
            {
              icon: GraduationCap,
              label: t("الورشة", "Workshop"),
              value: getCertificateWorkshop(certificate, t),
            },
            {
              icon: Calendar,
              label: t("التاريخ", "Date"),
              value: getCertificateDate(certificate),
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/40"
            >
              <item.icon className="w-4 h-4 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">
                  {item.label}
                </p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            </div>
          ))}
          <div className="pt-2 flex items-center gap-3">
            <CertificateStatusBadge status={certificate.status} />
            <Button
              size="sm"
              variant="outline"
              className="gap-1 ms-auto"
              onClick={() => {
                onOpenChange(false);
                onPreview(certificate);
              }}
            >
              <Award className="w-4 h-4" />
              {t("معاينة", "Preview")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
