import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { Workshop } from "@/types/workshop";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import {
  Ban,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  Loader2,
  Medal,
  Trash2,
  Users,
  XCircle,
  Mail,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { BulkEmailModal } from "@/components/shared/BulkEmailModal";

interface WorkshopSubscriptionsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  workshop: Workshop | null;
}

interface Subscriber {
  id: string; // registration id
  user_id: string; // actual user id — needed for certificate API
  name: string;
  name_ar?: string;
  email: string;
  phone: string;
  membership_type?: string;
  classification_number?: string;
  payment_status: "paid" | "free" | "pending";
  registration_status: string; // confirmed / cancelled / pending
  attendance: "attended" | "absent";
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
  const [issuingId, setIssuingId] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // Selection & Email State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isEmailOpen, setIsEmailOpen] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "absent" | "attended" | "free" | "paid">("all");

  // ─── FETCH ───────────────────────────────────────────────
  const fetchSubscribers = async () => {
    if (!workshop?.id) return;
    setIsLoading(true);
    try {
      const res = await api.get(`/admin/workshops/${workshop.id}/subscribers`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mapped: Subscriber[] = res.data.data.map((reg: any) => ({
        id: String(reg.id),
        user_id: String(reg.user_id),
        name: reg.user?.name || "-",
        name_ar: reg.user?.name_ar,
        email: reg.user?.email || "-",
        phone: reg.user?.phone || "-",
        membership_type: reg.user?.active_membership?.membership_type,
        classification_number: reg.user?.classification_number,
        payment_status: parseFloat(reg.price) > 0 ? "paid" : "free",
        registration_status: reg.status,
        attendance: reg.attendance === "attended" ? "attended" : "absent",
        certificate_issued: reg.certificate_issued ?? false,
        registration_date: reg.created_at,
      }));
      setSubscribers(mapped);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to load subscribers",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && workshop) fetchSubscribers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, workshop]);

  const filteredSubscribers = subscribers.filter((sub) => {
    // Filter type logic
    if (filterType === "absent" && sub.attendance !== "absent") return false;
    if (filterType === "attended" && sub.attendance !== "attended") return false;
    if (filterType === "free" && sub.payment_status !== "free") return false;
    if (filterType === "paid" && sub.payment_status !== "paid") return false;

    // Search query logic
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        sub.name.toLowerCase().includes(q) ||
        (sub.name_ar && sub.name_ar.toLowerCase().includes(q)) ||
        sub.email.toLowerCase().includes(q) ||
        sub.phone.toLowerCase().includes(q) ||
        (sub.classification_number && sub.classification_number.toLowerCase().includes(q));

      if (!matchesSearch) return false;
    }

    return true;
  });

  // Auto-update selection when filter or search changes
  useEffect(() => {
    if (filterType !== "all" || searchQuery !== "") {
      setSelectedIds(filteredSubscribers.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType, searchQuery]);

  const toggleAll = () => {
    const filteredIds = filteredSubscribers.map(s => s.id);
    const areAllFilteredSelected = filteredIds.length > 0 && filteredIds.every(id => selectedIds.includes(id));

    if (areAllFilteredSelected) {
      setSelectedIds(selectedIds.filter(id => !filteredIds.includes(id)));
    } else {
      const newSelections = new Set([...selectedIds, ...filteredIds]);
      setSelectedIds(Array.from(newSelections));
    }
  };

  const toggleOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((s) => s !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // ─── ATTENDANCE TOGGLE ───────────────────────────────────
  const toggleAttendance = async (sub: Subscriber) => {
    const next = sub.attendance === "attended" ? "absent" : "attended";
    try {
      await api.post(`/admin/workshops/${workshop?.id}/attendance`, {
        user_id: sub.user_id,
        attendance: next,
      });
      setSubscribers((prev) =>
        prev.map((s) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          s.id === sub.id ? { ...s, attendance: next as any } : s,
        ),
      );
      toast({
        title: t("تم التحديث", "Updated"),
        description: t("تم تغيير حالة الحضور", "Attendance updated"),
      });
      fetchSubscribers();
    } catch {
      toast({
        title: "Error",
        description: "Failed to update attendance",
        variant: "destructive",
      });
    }
  };

  // ─── CANCEL SUBSCRIPTION ─────────────────────────────────
  const handleCancelSubscription = async (sub: Subscriber) => {
    if (sub.registration_status === "cancelled") return;

    setCancellingId(sub.id);
    try {
      // Uses registration ID as the route param: POST /workshops/{id}/cancel
      await api.post(`/admin/workshops/registrations/${sub.id}/cancel`);

      setSubscribers((prev) =>
        prev.map((s) =>
          s.id === sub.id ? { ...s, registration_status: "cancelled" } : s,
        ),
      );
      await fetchSubscribers();
      toast({
        title: t("تم الإلغاء", "Cancelled"),
        description: t(
          "تم إلغاء اشتراك المستخدم",
          "User subscription has been cancelled",
        ),
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast({
        title: "Error",
        description: t("فشل إلغاء الاشتراك", "Failed to cancel subscription"),
        variant: "destructive",
      });
    } finally {
      setCancellingId(null);
    }
  };

  // ─── SINGLE CERTIFICATE ──────────────────────────────────
  const handleIssueCertificate = async (sub: Subscriber) => {
    setIssuingId(sub.id);
    try {
      await api.post("/admin/certificates", {
        type: "attendance",
        recipient_id: sub.user_id,
        workshop_id: String(workshop?.id),
        status: "verified",
      });

      setSubscribers((prev) =>
        prev.map((s) =>
          s.id === sub.id ? { ...s, certificate_issued: true } : s,
        ),
      );
      toast({ title: t("تم إصدار الشهادة", "Certificate Issued") });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.response?.status === 409) {
        setSubscribers((prev) =>
          prev.map((s) =>
            s.id === sub.id ? { ...s, certificate_issued: true } : s,
          ),
        );
        toast({
          title: t("شهادة موجودة", "Already Issued"),
          description: t(
            "يمتلك هذا المستخدم شهادة لهذه الورشة مسبقاً",
            "This user already has a certificate for this workshop",
          ),
        });
        return;
      }
      toast({
        title: "Error",
        description: "Failed to issue certificate",
        variant: "destructive",
      });
    } finally {
      setIssuingId(null);
    }
  };

  // ─── BULK CERTIFICATE ────────────────────────────────────
  const handleBulkIssueCertificates = async () => {
    const attended = subscribers.filter(
      (s) => s.attendance === "attended" && !s.certificate_issued,
    );

    if (attended.length === 0) {
      toast({
        title: t("لا يوجد", "Nothing to issue"),
        description: t(
          "لا يوجد حاضرون بدون شهادة",
          "All attended subscribers already have certificates",
        ),
      });
      return;
    }

    setIsGenerating(true);
    let successCount = 0;
    let skipCount = 0;

    for (const sub of attended) {
      try {
        await api.post("/admin/certificates", {
          type: "attendance",
          recipient_id: sub.user_id,
          workshop_id: String(workshop?.id),
          status: "verified",
        });
        successCount++;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err?.response?.status === 409) {
          skipCount++;
        }
      }
    }

    await fetchSubscribers();
    setIsGenerating(false);

    toast({
      title: t("تم الإصدار", "Bulk Issue Complete"),
      description: t(
        `تم إصدار ${successCount} شهادة${
          skipCount > 0 ? `، ${skipCount} موجودة مسبقاً` : ""
        }`,
        `Issued ${successCount} certificate(s)${
          skipCount > 0 ? `, ${skipCount} already existed` : ""
        }`,
      ),
    });
  };

  // ─── EXCEL EXPORT ────────────────────────────────────────
  const handleExportExcel = () => {
    const worksheetData = [
      [
        "Name",
        "Name (AR)",
        "Email",
        "Phone",
        "Membership",
        "Payment",
        "Registration",
        "Classification_number",
        "Attendance",
        "Certificate",
        "Date",
      ],
      ...filteredSubscribers.map((s) => [
        s.name,
        s.name_ar || "",
        s.email,
        s.phone,
        s.membership_type || "",
        s.payment_status,
        s.registration_status,
        s.classification_number,
        s.attendance,
        s.certificate_issued ? "Issued" : "Not Issued",
        new Date(s.registration_date).toLocaleString(),
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    worksheet["!cols"] = [
      { wch: 30 },
      { wch: 30 },
      { wch: 35 },
      { wch: 18 },
      { wch: 16 },
      { wch: 12 },
      { wch: 14 },
      { wch: 30 },
      { wch: 14 },
      { wch: 14 },
      { wch: 22 },
    ];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Subscribers");
    const buf = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([buf], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      `workshop-${workshop?.id}-subscribers.xlsx`,
    );
  };

  // ─── HELPERS ─────────────────────────────────────────────
  const attendanceConfig = {
    attended: {
      label: t("حاضر", "Attended"),
      className: "bg-emerald-100 text-emerald-700 border-emerald-200",
    },
    absent: {
      label: t("غائب", "Absent"),
      className: "bg-red-100 text-red-700 border-red-200",
    },
  };

  const paymentConfig = {
    paid: {
      label: t("مدفوع", "Paid"),
      className: "bg-blue-100 text-blue-700 border-blue-200",
    },
    free: {
      label: t("مجاني", "Free"),
      className: "bg-purple-100 text-purple-700 border-purple-200",
    },
    pending: {
      label: t("معلق", "Pending"),
      className: "bg-yellow-100 text-yellow-700 border-yellow-200",
    },
  };

  if (!workshop) return null;

  const attendedCount = subscribers.filter(
    (s) => s.attendance === "attended",
  ).length;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="fixed w-screen h-screen max-w-none p-0 flex flex-col overflow-hidden bg-background">
        {/* ── HEADER ── */}
        <DialogHeader className="p-6 border-b shrink-0">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Users className="w-5 h-5 text-primary" />
                {t("اشتراكات الورشة", "Workshop Subscribers")}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                {workshop.title}
              </p>

              {/* Stats row */}
              <div className="flex items-center gap-4 mt-3 text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  {t("الإجمالي", "Total")}:{" "}
                  <strong>{subscribers.length}</strong>
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t("حاضر", "Attended")}: <strong>{attendedCount}</strong>
                </span>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap items-center">
              {selectedIds.length > 0 && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsEmailOpen(true)}
                    className="gap-2 border-primary text-primary hover:bg-primary/5 h-9"
                  >
                    <Mail className="w-4 h-4" />
                    {t(`إرسال بريد (${selectedIds.length})`, `Email (${selectedIds.length})`)}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedIds([])}
                    title={t("إلغاء التحديد", "Clear selection")}
                    className="h-9 w-9"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                onClick={handleExportExcel}
                className="gap-2 h-9"
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
                {t("إصدار للحاضرين", "Issue to Attended")}
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* ── SEARCH & FILTERS ── */}
        <div className="px-6 py-4 border-b bg-muted/5 flex flex-col sm:flex-row gap-4 items-center">
          <div className="w-full sm:w-1/3">
            <Input
              placeholder={t("بحث (الاسم، البريد، الجوال)...", "Search (Name, Email, Phone)...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              value={filterType}
              onValueChange={(val: any) => setFilterType(val)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("تصفية", "Filter")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("الكل", "All")}</SelectItem>
                <SelectItem value="attended">{t("حاضر", "Attended")}</SelectItem>
                <SelectItem value="absent">{t("غائب", "Absent")}</SelectItem>
                <SelectItem value="free">{t("مجاني", "Free")}</SelectItem>
                <SelectItem value="paid">{t("دفع", "Paid")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="flex-1 overflow-auto p-6 bg-muted/10">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredSubscribers.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
              {t("لا يوجد مشتركون", "No subscribers yet")}
            </div>
          ) : (
            <div className="rounded-xl border bg-background overflow-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="p-3 w-10 text-start">
                      <input
                        type="checkbox"
                        className="w-4 h-4 cursor-pointer accent-primary"
                        checked={
                          filteredSubscribers.length > 0 &&
                          filteredSubscribers.every((s) => selectedIds.includes(s.id))
                        }
                        onChange={toggleAll}
                        title={t("تحديد الكل", "Select All")}
                      />
                    </th>
                    <th className="p-3 text-start font-medium">
                      {t("المستخدم", "User")}
                    </th>
                    <th className="p-3 text-start font-medium">
                      {t("التواصل", "Contact")}
                    </th>
                    <th className="p-3 text-start font-medium">
                      {t("الدفع", "Payment")}
                    </th>
                    <th className="p-3 text-start font-medium">
                      {t("التسجيل", "Registration")}
                    </th>
                    <th className="p-3 text-start font-medium">
                      {t("رقم التصنيف", "Classification_number")}
                    </th>
                    <th className="p-3 text-start font-medium">
                      {t("الحضور", "Attendance")}
                    </th>
                    <th className="p-3 text-start font-medium">
                      {t("الشهادة", "Certificate")}
                    </th>
                    <th className="p-3 text-start font-medium">
                      {t("الإجراءات", "Actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscribers.map((sub) => {
                    const att = attendanceConfig[sub.attendance];
                    const pay = paymentConfig[sub.payment_status];
                    const isCancelled = sub.registration_status === "cancelled";
                    return (
                      <motion.tr
                        key={sub.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`border-t transition-colors ${
                          isCancelled
                            ? "bg-red-50/40 dark:bg-red-950/10 opacity-60"
                            : "hover:bg-muted/20"
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="p-3 w-10">
                          <input
                            type="checkbox"
                            className="w-4 h-4 cursor-pointer accent-primary"
                            checked={selectedIds.includes(sub.id)}
                            onChange={() => toggleOne(sub.id)}
                          />
                        </td>

                        {/* User */}
                        <td className="p-3 whitespace-nowrap">
                          <p className="font-medium">{sub.name}</p>
                          {sub.name_ar && (
                            <p className="text-xs text-muted-foreground">
                              {sub.name_ar}
                            </p>
                          )}
                          {sub.membership_type && (
                            <Badge
                              variant="outline"
                              className="text-[10px] mt-0.5"
                            >
                              {sub.membership_type}
                            </Badge>
                          )}
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {new Date(
                              sub.registration_date,
                            ).toLocaleDateString()}
                          </p>
                        </td>

                        {/* Contact */}
                        <td className="p-3">
                          <p className="text-sm">{sub.email}</p>
                          <p className="text-xs text-muted-foreground">
                            {sub.phone}
                          </p>
                        </td>

                        {/* Payment */}
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${pay.className}`}
                          >
                            {pay.label}
                          </span>
                        </td>

                        {/* Registration status */}
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                              sub.registration_status === "confirmed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : sub.registration_status === "cancelled"
                                  ? "bg-red-50 text-red-700 border-red-200"
                                  : "bg-gray-50 text-gray-600 border-gray-200"
                            }`}
                          >
                            {sub.registration_status}
                          </span>
                        </td>

                        {/* Classification number */}
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${pay.className}`}
                          >
                            {sub.classification_number}
                          </span>
                        </td>

                        {/* Attendance — clickable to cycle */}
                        <td className="p-3">
                          <button
                            onClick={() =>
                              !isCancelled && toggleAttendance(sub)
                            }
                            disabled={isCancelled}
                            title={
                              isCancelled
                                ? t("الاشتراك ملغي", "Subscription cancelled")
                                : t("انقر للتغيير", "Click to change")
                            }
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-opacity ${att.className} ${
                              isCancelled
                                ? "opacity-40 cursor-not-allowed"
                                : "hover:opacity-75"
                            }`}
                          >
                            {sub.attendance === "attended" && (
                              <CheckCircle2 className="w-3 h-3" />
                            )}
                            {sub.attendance === "absent" && (
                              <XCircle className="w-3 h-3" />
                            )}
                            {att.label}
                          </button>
                        </td>

                        {/* Certificate */}
                        <td className="p-3">
                          {sub.certificate_issued ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3" />
                              {t("تم الإصدار", "Issued")}
                            </span>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={issuingId === sub.id || isCancelled}
                              onClick={() => handleIssueCertificate(sub)}
                              className="h-7 text-xs gap-1"
                            >
                              {issuingId === sub.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Medal className="w-3 h-3" />
                              )}
                              {t("إصدار", "Issue")}
                            </Button>
                          )}
                        </td>

                        {/* Actions — Cancel */}
                        <td className="p-3">
                          {isCancelled ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200">
                              <Ban className="w-3 h-3" />
                              {t("ملغي", "Cancelled")}
                            </span>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={cancellingId === sub.id}
                              onClick={() => handleCancelSubscription(sub)}
                              className="h-7 text-xs gap-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                            >
                              {cancellingId === sub.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Trash2 className="w-3 h-3" />
                              )}
                              {t("إلغاء وحذف", "Cancel & Delete")}
                            </Button>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </DialogContent>
      
      <BulkEmailModal
        isOpen={isEmailOpen}
        onOpenChange={(open) => {
          setIsEmailOpen(open);
          if (!open) setSelectedIds([]);
        }}
        endpoint="/admin/emails/send"
        extraPayload={{ 
          user_ids: subscribers
            .filter(s => selectedIds.includes(s.id))
            .map(s => Number(s.user_id)) 
        }}
        recipientLabel={t(`المشتركون المحددون`, `Selected Subscribers`)}
        recipientCount={selectedIds.length}
      />
    </Dialog>
  );
};
