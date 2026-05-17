import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface CertificateStatusBadgeProps {
  status?: string;
}

export const CertificateStatusBadge = ({ status }: CertificateStatusBadgeProps) => {
  const { t } = useLanguage();

  const configs: Record<
    string,
    { color: string; icon: any; labelAr: string; labelEn: string }
  > = {
    verified: {
      color: "bg-green-accent/10 text-green-accent border-green-accent/30",
      icon: CheckCircle,
      labelAr: "موثقة",
      labelEn: "Verified",
    },
    pending: {
      color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
      icon: Clock,
      labelAr: "قيد المعالجة",
      labelEn: "Pending",
    },
    revoked: {
      color: "bg-destructive/10 text-destructive border-destructive/30",
      icon: XCircle,
      labelAr: "ملغاة",
      labelEn: "Revoked",
    },
  };
  
  const config = configs[status || "pending"] || configs.pending;
  const Icon = config.icon;
  
  return (
    <Badge variant="outline" className={`${config.color} gap-1 text-xs`}>
      <Icon className="w-3 h-3" />
      {t(config.labelAr, config.labelEn)}
    </Badge>
  );
};
