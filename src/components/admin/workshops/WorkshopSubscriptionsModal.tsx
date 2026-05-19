import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Workshop } from "@/types/workshop";
import { Download, FileSpreadsheet, Medal, Users, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/services/api";

interface WorkshopSubscriptionsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  workshop: Workshop | null;
}

// Mock Subscriber Type for UI purposes (will be replaced by API in the future)
interface Subscriber {
  id: string;
  name: string;
  email: string;
  phone: string;
  classification_number?: string;
  payment_status: "paid" | "free" | "pending";
  attendance_status: "attended" | "absent" | "pending";
  certificate_issued: boolean;
  registration_date: string;
}

export const WorkshopSubscriptionsModal = ({
  isOpen,
  onOpenChange,
  workshop,
}: WorkshopSubscriptionsModalProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isOpen && workshop) {
      // Fake fetch
      setIsLoading(true);
      setTimeout(() => {
        setSubscribers([
          {
            id: "1",
            name: "أحمد محمد العتيبي",
            email: "ahmed@example.com",
            phone: "+966 50 123 4567",
            classification_number: "29384756",
            payment_status: "paid",
            attendance_status: "attended",
            certificate_issued: false,
            registration_date: "2026-05-18",
          },
          {
            id: "2",
            name: "سارة عبدالله الرشيدي",
            email: "sara@example.com",
            phone: "+966 55 987 6543",
            payment_status: "free",
            attendance_status: "absent",
            certificate_issued: false,
            registration_date: "2026-05-19",
          },
        ]);
        setIsLoading(false);
      }, 500);
    }
  }, [isOpen, workshop]);

  const handleExportExcel = () => {
    toast({
      title: t("جاري التصدير", "Exporting"),
      description: t("سيتم تحميل ملف الإكسل قريباً", "Excel file will download shortly"),
    });
    // In reality, trigger excel generation from backend or using a library like xlsx
  };

  const handleIssueCertificate = async (subId: string) => {
    try {
      await api.post(`/admin/workshops/${workshop?.id}/certificates/generate`, { subscriber_id: subId });
      setSubscribers((prev) =>
        prev.map((s) =>
          s.id === subId ? { ...s, certificate_issued: true } : s
        )
      );
      toast({ title: t("تم إصدار الشهادة", "Certificate issued") });
    } catch (err) {
      toast({ title: t("خطأ في إصدار الشهادة", "Error issuing certificate"), variant: "destructive" });
    }
  };

  const handleBulkIssueCertificates = async () => {
    setIsGenerating(true);
    try {
      await api.post(`/admin/workshops/${workshop?.id}/certificates/generate-bulk`);
      setSubscribers((prev) =>
        prev.map((s) =>
          s.attendance_status === "attended"
            ? { ...s, certificate_issued: true }
            : s
        )
      );
      toast({
        title: t("تم الإصدار", "Issued"),
        description: t(
          "تم إصدار الشهادات لجميع الحاضرين",
          "Certificates issued for all attendees"
        ),
      });
    } catch (err) {
      toast({ title: t("خطأ في الإصدار الجماعي", "Error in bulk issue"), variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  if (!workshop) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b border-border pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <DialogTitle className="flex items-center gap-2 text-xl mb-1">
                <Users className="w-5 h-5 text-primary" />
                {t("اشتراكات ورشة العمل", "Workshop Subscriptions")}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">{workshop.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                onClick={handleExportExcel}
              >
                <FileSpreadsheet className="w-4 h-4" />
                {t("تصدير Excel", "Export Excel")}
              </Button>
              <Button
                size="sm"
                className="gap-2"
                onClick={handleBulkIssueCertificates}
                disabled={isGenerating}
              >
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Medal className="w-4 h-4" />}
                {t("إصدار شهادات للحاضرين", "Issue Certificates to Attendees")}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto p-6 bg-muted/20">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : subscribers.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {t("لا يوجد مشتركون", "No subscribers")}
            </div>
          ) : (
            <div className="bg-background rounded-xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="text-start p-4 text-sm font-semibold">
                        {t("المشترك", "Subscriber")}
                      </th>
                      <th className="text-start p-4 text-sm font-semibold">
                        {t("معلومات التواصل", "Contact Info")}
                      </th>
                      <th className="text-start p-4 text-sm font-semibold">
                        {t("الدفع", "Payment")}
                      </th>
                      <th className="text-start p-4 text-sm font-semibold">
                        {t("الحضور", "Attendance")}
                      </th>
                      <th className="text-start p-4 text-sm font-semibold">
                        {t("الإجراءات", "Actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((sub, i) => (
                      <motion.tr
                        key={sub.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-border last:border-0 hover:bg-muted/30"
                      >
                        <td className="p-4">
                          <p className="font-semibold text-sm">{sub.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {t("التسجيل", "Registered")}: {sub.registration_date}
                          </p>
                          {sub.classification_number && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {t("رقم التصنيف", "Classification")}: {sub.classification_number}
                            </p>
                          )}
                        </td>
                        <td className="p-4">
                          <p className="text-sm">{sub.email}</p>
                          <p className="text-sm text-muted-foreground" dir="ltr">
                            {sub.phone}
                          </p>
                        </td>
                        <td className="p-4">
                          {sub.payment_status === "paid" && (
                            <Badge className="bg-green-500/10 text-green-600 border-green-500/30 font-normal">
                              {t("مدفوع", "Paid")}
                            </Badge>
                          )}
                          {sub.payment_status === "free" && (
                            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 font-normal">
                              {t("مجاني", "Free")}
                            </Badge>
                          )}
                          {sub.payment_status === "pending" && (
                            <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30 font-normal">
                              {t("معلق", "Pending")}
                            </Badge>
                          )}
                        </td>
                        <td className="p-4">
                          {sub.attendance_status === "attended" && (
                            <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/30 font-normal">
                              {t("حاضر", "Attended")}
                            </Badge>
                          )}
                          {sub.attendance_status === "absent" && (
                            <Badge className="bg-red-500/10 text-red-600 border-red-500/30 font-normal">
                              {t("غائب", "Absent")}
                            </Badge>
                          )}
                          {sub.attendance_status === "pending" && (
                            <Badge className="bg-muted text-muted-foreground border-border font-normal">
                              {t("لم يحدد", "Pending")}
                            </Badge>
                          )}
                        </td>
                        <td className="p-4">
                          {sub.attendance_status === "attended" ? (
                            sub.certificate_issued ? (
                              <Badge className="bg-primary/10 text-primary border-primary/30 font-normal">
                                {t("تم إصدار الشهادة", "Certificate Issued")}
                              </Badge>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleIssueCertificate(sub.id)}
                              >
                                {t("إصدار شهادة", "Issue Certificate")}
                              </Button>
                            )
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              {t("يجب إثبات الحضور", "Attendance Required")}
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
