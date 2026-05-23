import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Certificate } from "@/types/certificate";
import { getCertificateDate, getCertificateName, getCertificateVerificationUrl, getCertificateWorkshop } from "@/utils/certificateUtils";
import { Award, Calendar, Copy, Eye, GraduationCap } from "lucide-react";
import { CertificateStatusBadge } from "./CertificateStatusBadge";

interface CertificateCardProps {
  cert: Certificate;
  onOpenDetails: (cert: Certificate) => void;
  onOpenPreview: (cert: Certificate) => void;
  onCopyLink: (url: string) => void;
}

export const CertificateCard = ({ cert, onOpenDetails, onOpenPreview, onCopyLink }: CertificateCardProps) => {
  const { t } = useLanguage();
  const name = getCertificateName(cert, t);
  const workshop = getCertificateWorkshop(cert, t);
  const date = getCertificateDate(cert);
  const verificationUrl = getCertificateVerificationUrl(cert);

  return (
    <Card className="overflow-hidden group h-full hover:shadow-md transition-shadow">
      <div className="h-2 bg-gradient-to-r from-primary to-green-accent" />
      <CardContent className="p-6">
        {/* Mini cert preview header */}
        <div className="relative bg-gradient-to-br from-midnight to-dark-navy p-4 rounded-xl mb-4 overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2.5l5 3.5-5 3.5z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative z-10 text-center text-primary-foreground">
            <Award className="w-10 h-10 mx-auto mb-2 text-mint" />
            <h4 className="font-bold text-sm">
              {t("شهادة حضور", "Certificate of Attendance")}
            </h4>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-bold">{name}</p>
              <p className="text-xs text-muted-foreground font-mono">
                {cert.id}
              </p>
            </div>
            <CertificateStatusBadge status={cert.status} />
          </div>

          <div className="text-sm space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <GraduationCap className="w-4 h-4 text-primary shrink-0" />
              <span className="truncate">{workshop}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              {date}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1"
            onClick={() => onOpenDetails(cert)}
          >
            <Eye className="w-4 h-4" />
            {t("التفاصيل", "Details")}
          </Button>
          <Button
            size="sm"
            className="flex-1 gap-1 bg-green-accent hover:bg-green-light"
            onClick={() => onOpenPreview(cert)}
          >
            <Award className="w-4 h-4" />
            {t("معاينة", "Preview")}
          </Button>
          {verificationUrl && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onCopyLink(verificationUrl)}
            >
              <Copy className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
