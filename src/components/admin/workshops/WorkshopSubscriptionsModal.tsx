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
import api from "@/services/api";
import { Workshop } from "@/types/workshop";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import { FileSpreadsheet, Loader2, Medal, Users } from "lucide-react";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

interface WorkshopSubscriptionsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  workshop: Workshop | null;
}

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

  // ----------------------------
  // FETCH DATA
  // ----------------------------
  const fetchSubscribers = async () => {
    if (!workshop?.id) return;

    setIsLoading(true);
    try {
      const res = await api.get(`/admin/workshops/${workshop.id}/subscribers`);

      const mapped = res.data.data.map((reg: any) => ({
        id: reg.id,
        name: reg.user?.name || "-",
        email: reg.user?.email || "-",
        phone: reg.user?.phone || "-",
        classification_number: reg.user?.classification_number,
        payment_status: reg.price > 0 ? "paid" : "free",
        attendance_status:
          reg.status === "confirmed"
            ? "attended"
            : reg.status === "cancelled"
            ? "absent"
            : "pending",
        certificate_issued: reg.certificate_issued ?? false,
        registration_date: reg.created_at,
      }));

      setSubscribers(mapped);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to load subscribers",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && workshop) {
      fetchSubscribers();
    }
  }, [isOpen, workshop]);

  // ----------------------------
  // ATTENDANCE UPDATE
  // ----------------------------
  const updateAttendance = async (userId: string, attendance: string) => {
    try {
      await api.post(`/admin/workshops/${workshop?.id}/attendance`, {
        user_id: userId,
        attendance,
      });

      setSubscribers((prev) =>
        prev.map((s) =>
          s.id === userId ? { ...s, attendance_status: status as any } : s
        )
      );

      toast({
        title: t("تم التحديث", "Updated"),
        description: t("تم تغيير حالة الحضور", "Attendance updated"),
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update attendance",
      });
    }
  };

  // ----------------------------
  // CERTIFICATE
  // ----------------------------
  const handleIssueCertificate = async (subId: string) => {
    try {
      await api.post(`/admin/workshops/${workshop?.id}/certificates/generate`, {
        subscriber_id: subId,
      });

      setSubscribers((prev) =>
        prev.map((s) =>
          s.id === subId ? { ...s, certificate_issued: true } : s
        )
      );

      toast({
        title: t("تم إصدار الشهادة", "Certificate issued"),
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to issue certificate",
      });
    }
  };

  // ----------------------------
  // BULK CERTIFICATE
  // ----------------------------
  const handleBulkIssueCertificates = async () => {
    setIsGenerating(true);
    try {
      await api.post(
        `/admin/workshops/${workshop?.id}/certificates/generate-bulk`
      );

      setSubscribers((prev) =>
        prev.map((s) =>
          s.attendance_status === "attended"
            ? { ...s, certificate_issued: true }
            : s
        )
      );

      toast({
        title: t("تم الإصدار", "Completed"),
        description: t(
          "تم إصدار الشهادات لجميع الحاضرين",
          "Certificates issued"
        ),
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Bulk issue failed",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // ----------------------------
  // FRONTEND EXCEL (CSV)
  // ----------------------------

  const handleExportExcel = () => {
    const worksheetData = [
      [
        "👤 Name",
        "📧 Email",
        "📱 Phone",
        "💳 Payment Status",
        "🎓 Attendance",
        "📅 Registration Date",
      ],
      ...subscribers.map((s) => [
        s.name,
        s.email,
        s.phone,
        s.payment_status,
        s.attendance_status,
        new Date(s.registration_date).toLocaleString(),
      ]),
    ];

    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Column width tuning (THIS is what makes it readable)
    worksheet["!cols"] = [
      { wch: 35 }, // Name
      { wch: 35 }, // Email
      { wch: 20 }, // Phone
      { wch: 20 }, // Payment
      { wch: 20 }, // Attendance
      { wch: 20 }, // Date
    ];

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Workshop Subscribers");

    // Generate file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, `workshop-${workshop?.id}-subscribers.xlsx`);
  };

  if (!workshop) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="fixed w-screen h-screen max-w-none p-0 flex flex-col overflow-hidden bg-background">
        {/* HEADER */}
        <DialogHeader className="p-6 border-b flex flex-row justify-between items-center">
          <div>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Users className="w-5 h-5 text-primary" />
              {t("اشتراكات الورشة", "Workshop Subscribers")}
            </DialogTitle>
            <p className="text-sm text-muted-foreground">{workshop.title}</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleExportExcel}
              className="gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Excel
            </Button>

            <Button
              onClick={handleBulkIssueCertificates}
              disabled={isGenerating}
              className="gap-2"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Medal className="w-4 h-4" />
              )}
              {t("إصدار الشهادات", "Certificates")}
            </Button>
          </div>
        </DialogHeader>

        {/* BODY */}
        <div className="flex-1 overflow-auto p-6 bg-muted/10">
          {/* LOADING */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : subscribers.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              {t("لا يوجد مشتركون", "No subscribers yet")}
            </div>
          ) : (
            <div className="rounded-xl border bg-background overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="p-3 text-right">User</th>
                    <th className="p-3 text-right">Contact</th>
                    <th className="p-3 text-right">Payment</th>
                    <th className="p-3 text-right">Attendance</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {subscribers.map((sub) => (
                    <motion.tr
                      key={sub.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t"
                    >
                      <td className="p-3">
                        <div className="font-medium">{sub.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {sub.registration_date}
                        </div>
                      </td>

                      <td className="p-3">
                        <div>{sub.email}</div>
                        <div className="text-xs">{sub.phone}</div>
                      </td>

                      <td className="p-3">
                        <Badge>{sub.payment_status}</Badge>
                      </td>

                      <td className="p-3 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateAttendance(sub.id, "attended")}
                        >
                          {t("حاضر", "Present")}
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateAttendance(sub.id, "absent")}
                        >
                          {t("غائب", "Absent")}
                        </Button>
                      </td>

                      <td className="p-3">
                        {sub.certificate_issued ? (
                          <Badge>{t("تم الإصدار", "Issued")}</Badge>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleIssueCertificate(sub.id)}
                          >
                            {t("شهادة", "Certificate")}
                          </Button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
