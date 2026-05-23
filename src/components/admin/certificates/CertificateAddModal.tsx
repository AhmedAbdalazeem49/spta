import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { Certificate, Recipient, Workshop } from "@/types/certificate";
import {
  getCertificateDate,
  getCertificateName,
  getCertificateWorkshop,
} from "@/utils/certificateUtils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  GraduationCap,
  Hash,
  Loader2,
  Plus,
  QrCode,
  Search,
  Signature,
  Sparkles,
  Stamp,
  User,
  UserSearch,
} from "lucide-react";
import { CertificateStatusBadge } from "./CertificateStatusBadge";

export const EMPTY_FORM = {
  // Selectors
  workshopId: "",
  recipientId: "",
  // Manual overrides / extras
  manualRecipientName: "",
  manualWorkshopTitle: "",
  issueDate: "",
  status: "pending",
};

interface CertificateAddModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  form: typeof EMPTY_FORM;
  setForm: React.Dispatch<React.SetStateAction<typeof EMPTY_FORM>>;
  addStep: "form" | "preview";
  setAddStep: (step: "form" | "preview") => void;
  recipients: Recipient[];
  recipientsLoading: boolean;
  recipientSearch: string;
  setRecipientSearch: (search: string) => void;
  filteredRecipients: Recipient[];
  workshops: Workshop[];
  workshopsLoading: boolean;
  workshopSearch: string;
  setWorkshopSearch: (search: string) => void;
  filteredWorkshops: Workshop[];
  onSubmit: () => void;
  isSubmitting: boolean;
  getRecipientName: (r: Recipient) => string;
  getWorkshopName: (w: Workshop) => string;
  previewName: string;
  previewWorkshop: string;
  previewDate: string;
}

export const CertificateAddModal = ({
  isOpen,
  onOpenChange,
  form,
  setForm,
  addStep,
  setAddStep,
  recipients,
  recipientsLoading,
  recipientSearch,
  setRecipientSearch,
  filteredRecipients,
  workshops,
  workshopsLoading,
  workshopSearch,
  setWorkshopSearch,
  filteredWorkshops,
  onSubmit,
  isSubmitting,
  getRecipientName,
  getWorkshopName,
  previewName,
  previewWorkshop,
  previewDate,
}: CertificateAddModalProps) => {
  const { t, isRTL } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-primary" />
            </div>
            {t("إضافة شهادة جديدة", "Add New Certificate")}
          </DialogTitle>
          <DialogDescription>
            {t(
              "اختر المستلم والورشة من القوائم أو أدخل البيانات يدوياً",
              "Select recipient and workshop from the lists or enter data manually"
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Step indicator */}
        <div className="flex items-center gap-2 py-2">
          <button
            onClick={() => setAddStep("form")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              addStep === "form"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            {t("البيانات", "Data")}
          </button>
          <div className="h-px flex-1 bg-border" />
          <button
            onClick={() => setAddStep("preview")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              addStep === "preview"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            {t("معاينة", "Preview")}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {addStep === "form" ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6 py-2"
            >
              {/* Recipient Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">
                    {t("المستلم", "Recipient")}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {t("مطلوب", "Required")}
                  </Badge>
                </div>

                <div className="relative">
                  <UserSearch
                    className={`absolute top-1/2 -translate-y-1/2 ${
                      isRTL ? "right-3" : "left-3"
                    } w-4 h-4 text-muted-foreground`}
                  />
                  <Input
                    placeholder={t("ابحث عن مستخدم...", "Search users...")}
                    value={recipientSearch}
                    onChange={(e) => setRecipientSearch(e.target.value)}
                    className={isRTL ? "pr-10" : "pl-10"}
                  />
                  {recipientsLoading && (
                    <Loader2
                      className={`absolute top-1/2 -translate-y-1/2 ${
                        isRTL ? "left-3" : "right-3"
                      } w-4 h-4 animate-spin text-muted-foreground`}
                    />
                  )}
                </div>

                {!recipientsLoading && filteredRecipients.length > 0 && (
                  <div className="border rounded-lg overflow-hidden max-h-36 overflow-y-auto">
                    {filteredRecipients.map((r) => (
                      <button
                        key={r.id}
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            recipientId: String(r.id),
                            manualRecipientName: "",
                          }))
                        }
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-start transition-colors hover:bg-muted/50 border-b last:border-0 ${
                          form.recipientId === String(r.id)
                            ? "bg-primary/5 border-l-2 border-l-primary"
                            : ""
                        }`}
                      >
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <User className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {getRecipientName(r)}
                          </p>
                          {r.email && (
                            <p className="text-xs text-muted-foreground truncate">
                              {r.email}
                            </p>
                          )}
                        </div>
                        {form.recipientId === String(r.id) && (
                          <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">
                    {t("أو أدخل الاسم يدوياً", "Or enter name manually")}
                  </Label>
                  <Input
                    placeholder={t("الاسم الكامل", "Full name")}
                    value={form.manualRecipientName}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        manualRecipientName: e.target.value,
                        recipientId: "",
                      }))
                    }
                  />
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Workshop Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">
                    {t("الورشة", "Workshop")}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {t("مطلوب", "Required")}
                  </Badge>
                </div>

                <div className="relative">
                  <Search
                    className={`absolute top-1/2 -translate-y-1/2 ${
                      isRTL ? "right-3" : "left-3"
                    } w-4 h-4 text-muted-foreground`}
                  />
                  <Input
                    placeholder={t("ابحث عن ورشة...", "Search workshops...")}
                    value={workshopSearch}
                    onChange={(e) => setWorkshopSearch(e.target.value)}
                    className={isRTL ? "pr-10" : "pl-10"}
                  />
                  {workshopsLoading && (
                    <Loader2
                      className={`absolute top-1/2 -translate-y-1/2 ${
                        isRTL ? "left-3" : "right-3"
                      } w-4 h-4 animate-spin text-muted-foreground`}
                    />
                  )}
                </div>

                {!workshopsLoading && filteredWorkshops.length > 0 && (
                  <div className="border rounded-lg overflow-hidden max-h-36 overflow-y-auto">
                    {filteredWorkshops.map((w) => (
                      <button
                        key={w.id}
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            workshopId: String(w.id),
                            manualWorkshopTitle: "",
                            issueDate: f.issueDate || w.date || "",
                          }))
                        }
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-start transition-colors hover:bg-muted/50 border-b last:border-0 ${
                          form.workshopId === String(w.id)
                            ? "bg-primary/5 border-l-2 border-l-primary"
                            : ""
                        }`}
                      >
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <GraduationCap className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {getWorkshopName(w)}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {w.date && <span>{w.date}</span>}
                          </div>
                        </div>
                        {form.workshopId === String(w.id) && (
                          <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">
                    {t(
                      "أو أدخل اسم الورشة يدوياً",
                      "Or enter workshop title manually"
                    )}
                  </Label>
                  <Input
                    placeholder={t("اسم الورشة", "Workshop title")}
                    value={form.manualWorkshopTitle}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        manualWorkshopTitle: e.target.value,
                        workshopId: "",
                      }))
                    }
                  />
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Extra Fields */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Hash className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">
                    {t("تفاصيل إضافية", "Additional Details")}
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {t("تاريخ الإصدار", "Issue Date")}
                    </Label>
                    <Input
                      type="date"
                      value={form.issueDate}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, issueDate: e.target.value }))
                      }
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {t("الحالة", "Status")}
                    </Label>
                    <Select
                      value={form.status}
                      onValueChange={(v) =>
                        setForm((f) => ({ ...f, status: v }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">
                          {t("قيد المعالجة", "Pending")}
                        </SelectItem>
                        <SelectItem value="verified">
                          {t("موثقة", "Verified")}
                        </SelectItem>
                        <SelectItem value="revoked">
                          {t("ملغاة", "Revoked")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div
                className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => setAddStep("preview")}
              >
                <Sparkles className="w-5 h-5 text-primary shrink-0" />
                <p className="text-sm text-primary font-medium">
                  {t(
                    "انقر لمعاينة الشهادة قبل الحفظ ←",
                    "Click to preview the certificate before saving →"
                  )}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4 py-2"
            >
              {/* Live certificate preview */}
              <div className="relative aspect-[1.6/1] bg-gradient-to-br from-midnight via-dark-navy to-navy-light rounded-2xl p-6 text-primary-foreground overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0l50 50-50 50L0 50z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
                  }}
                />
                <div className="relative h-full flex flex-col">
                  <div className="text-center mb-4">
                    <Award className="w-8 h-8 mx-auto mb-1 text-green-accent" />
                    <h2 className="text-xl font-bold">
                      {t(
                        "Certificate of Attendance",
                        "Certificate of Attendance"
                      )}
                    </h2>
                    <p className="text-xs text-blue-pale">
                      {t(
                        "Saudi Physical Therapy Association",
                        "Saudi Physical Therapy Association"
                      )}
                    </p>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <p className="text-sm mb-2 text-blue-pale">
                      {t("This is to certify that", "This is to certify that")}
                    </p>
                    <h3
                      className={`text-2xl font-bold mb-2 ${
                        previewName.startsWith("—")
                          ? "text-white/30 italic text-base"
                          : "text-green-accent"
                      }`}
                    >
                      {previewName}
                    </h3>
                    <p className="text-sm mb-1 text-blue-pale">
                      {t(
                        "has successfully completed",
                        "has successfully completed"
                      )}
                    </p>
                    <h4
                      className={`text-lg font-semibold mb-2 ${
                        previewWorkshop.startsWith("—")
                          ? "text-white/30 italic text-sm"
                          : ""
                      }`}
                    >
                      {previewWorkshop}
                    </h4>
                    <p className="text-xs text-blue-pale">
                      {previewDate !== "—" && `${t("on", "on")} ${previewDate}`}
                    </p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-center">
                      <div className="w-16 h-10 border-b border-blue-pale/40 mb-1 flex items-end justify-center">
                        <Signature className="w-5 h-5 text-blue-pale/40" />
                      </div>
                      <p className="text-xs text-blue-pale">
                        {t("Signature", "Signature")}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white rounded p-1 mb-1">
                        <QrCode className="w-full h-full text-navy" />
                      </div>
                      <p className="text-xs text-blue-pale">{t("QR", "QR")}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-10 border-b border-blue-pale/40 mb-1 flex items-end justify-center">
                        <Stamp className="w-5 h-5 text-blue-pale/40" />
                      </div>
                      <p className="text-xs text-blue-pale">
                        {t("Stamp", "Stamp")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    icon: User,
                    label: t("المستلم", "Recipient"),
                    value: previewName,
                  },
                  {
                    icon: GraduationCap,
                    label: t("الورشة", "Workshop"),
                    value: previewWorkshop,
                  },
                  {
                    icon: Calendar,
                    label: t("التاريخ", "Date"),
                    value: previewDate,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/40"
                  >
                    <item.icon className="w-4 h-4 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium truncate">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <CertificateStatusBadge status={form.status} />
                <button
                  onClick={() => setAddStep("form")}
                  className="text-xs text-muted-foreground underline ms-auto"
                >
                  {t("← تعديل البيانات", "← Edit data")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <DialogFooter className="gap-2 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("إلغاء", "Cancel")}
          </Button>
          {addStep === "form" ? (
            <Button onClick={() => setAddStep("preview")} className="gap-2">
              <Sparkles className="w-4 h-4" />
              {t("معاينة", "Preview")}
            </Button>
          ) : (
            <Button
              onClick={onSubmit}
              disabled={isSubmitting}
              className="bg-green-accent hover:bg-green-light gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              {t("حفظ الشهادة", "Save Certificate")}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
