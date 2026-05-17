import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Certificate } from "@/types/certificate";
import { getCertificateDate, getCertificateName, getCertificateWorkshop } from "@/utils/certificateUtils";
import { motion } from "framer-motion";
import { Award, Eye } from "lucide-react";
import { CertificateStatusBadge } from "./CertificateStatusBadge";

interface CertificatesTableProps {
  certificates: Certificate[];
  onOpenDetails: (cert: Certificate) => void;
  onOpenPreview: (cert: Certificate) => void;
}

export const CertificatesTable = ({ certificates, onOpenDetails, onOpenPreview }: CertificatesTableProps) => {
  const { t } = useLanguage();

  if (!certificates.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t("عرض الجدول", "Table View")}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-start p-4 font-semibold text-sm">{t("الرقم", "ID")}</th>
                <th className="text-start p-4 font-semibold text-sm">{t("المستلم", "Recipient")}</th>
                <th className="text-start p-4 font-semibold text-sm">{t("الورشة", "Workshop")}</th>
                <th className="text-start p-4 font-semibold text-sm">{t("التاريخ", "Date")}</th>
                <th className="text-start p-4 font-semibold text-sm">{t("الحالة", "Status")}</th>
                <th className="text-start p-4 font-semibold text-sm">{t("الإجراءات", "Actions")}</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="border-t border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4 text-sm font-mono text-muted-foreground">{c.id}</td>
                  <td className="p-4 text-sm font-medium">{getCertificateName(c, t)}</td>
                  <td className="p-4 text-sm text-muted-foreground">{getCertificateWorkshop(c, t)}</td>
                  <td className="p-4 text-sm text-muted-foreground">{getCertificateDate(c)}</td>
                  <td className="p-4"><CertificateStatusBadge status={c.status} /></td>
                  <td className="p-4 flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => onOpenDetails(c)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => onOpenPreview(c)}>
                      <Award className="w-4 h-4" />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
