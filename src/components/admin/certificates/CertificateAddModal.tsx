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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { Certificate, Recipient, Workshop } from "@/types/certificate";
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
  MapPin,
  Building2,
  FileText
} from "lucide-react";
import { CertificateStatusBadge } from "./CertificateStatusBadge";
import CertificateTemplate from "@/components/CertificateTemplate";

// eslint-disable-next-line react-refresh/only-export-components
export const EMPTY_FORM = {
  type: "attendance",
  template: "modern",
  workshopId: "",
  recipientId: "",
  
  // Participant Info
  manualRecipientName: "",
  recipient_name_ar: "",
  
  // Event/Program Info
  manualWorkshopTitle: "",
  start_date: "",
  end_date: "",
  hours: "",
  
  // Venue
  venue: "",
  
  // Speaker
  speaker: "",
  
  // Organization Info
  organization_name: "",
  role: "", // e.g. Speaker, Host, Sponsor, Volunteer
  
  // Extras
  contribution_description: "",
  completion_status: "Completed",
  duration: "",
  
  issueDate: "",
  status: "pending",
  workshop_end_date: "",
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

  const handleTypeChange = (val: string) => {
    setForm((f) => ({
      ...f,
      type: val,
      // Clear specific fields if needed, or keep them
    }));
  };

  const getPreviewTitle = () => {
    switch (form.type) {
      case "completion":
        return t("Certificate of Completion", "Certificate of Completion");
      case "appreciation_person":
      case "appreciation_org":
        return t("Certificate of Appreciation", "Certificate of Appreciation");
      case "attended":
        return t("Certificate of Attendance", "Certificate of Attendance");
      default:
        return t("Certificate of Attendance", "Certificate of Attendance");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-primary" />
            </div>
            {t("إصدار شهادة جديدة", "Issue New Certificate")}
          </DialogTitle>
          <DialogDescription>
            {t(
              "اختر نوع الشهادة وأدخل البيانات المطلوبة لإصدارها",
              "Choose certificate type and fill the required details to issue it"
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
              {/* Certificate Type Selection */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-primary" />
                  {t("نوع الشهادة", "Certificate Type")}
                </Label>
                <Select value={form.type} onValueChange={handleTypeChange}>
                  <SelectTrigger className="w-full h-12 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="attendance">{t("شهادة حضور ورشة عمل", "Workshop Attendance Certificate")}</SelectItem>
                    <SelectItem value="completion">{t("شهادة إتمام برنامج", "Program Completion Certificate")}</SelectItem>
                    <SelectItem value="appreciation_person">{t("شهادة شكر وتقدير (أفراد)", "Appreciation Certificate (Person)")}</SelectItem>
                    <SelectItem value="appreciation_org">{t("شهادة شكر وتقدير (جهات/منظمات)", "Appreciation Certificate (Organization)")}</SelectItem>
                    <SelectItem value="attended">{t("شهادة حضور ندوة", "Seminar Attended Record")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="h-px bg-border" />

              {/* Recipient Section (Not required for appreciation_org) */}
              {form.type !== "appreciation_org" ? (
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

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        {t("أو أدخل الاسم يدوياً (إنجليزي)", "Or enter name manually (English)")}
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
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        {t("الاسم يدوياً (عربي - اختياري)", "Arabic Name (Optional)")}
                      </Label>
                      <Input
                        placeholder={t("الاسم بالعربي", "Arabic Name")}
                        value={form.recipient_name_ar}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            recipient_name_ar: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* Organization Section for appreciation_org */
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm">
                      {t("الجهة / المنظمة", "Organization")}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {t("مطلوب", "Required")}
                    </Badge>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">
                      {t("اسم الجهة / المنظمة (إنجليزي)", "Organization Name (English)")}
                    </Label>
                    <Input
                      placeholder={t("مثال: مستشفى التخصصي", "e.g. Specialized Hospital")}
                      value={form.organization_name}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          organization_name: e.target.value,
                          manualRecipientName: e.target.value, // mirror for preview
                        }))
                      }
                    />
                  </div>
                </div>
              )}

              <div className="h-px bg-border" />

              {/* Event / Workshop details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">
                    {t("الفعالية / البرنامج / الورشة", "Event / Workshop")}
                  </h3>
                </div>

                {/* Show workshop selector only for attendance type */}
                {form.type === "attendance" && (
                  <>
                    <div className="relative">
                      <Search
                        className={`absolute top-1/2 -translate-y-1/2 ${
                          isRTL ? "right-3" : "left-3"
                        } w-4 h-4 text-muted-foreground`}
                      />
                      <Input
                        placeholder={t("ابحث عن ورشة عمل...", "Search workshops...")}
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
                                start_date: w.date || "",
                                end_date: w.end_date || w.date || "",
                                venue: w.location || "",
                                speaker: w.doctor_name || "",
                                issueDate: f.issueDate || w.date || "",
                                workshop_end_date: w.end_date || w.date || "",
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
                              <p className="font-medium">
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
                  </>
                )}

                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">
                    {form.type === "completion" 
                      ? t("اسم البرنامج التدريبي", "Program Title")
                      : form.type === "attendance"
                        ? t("أو أدخل اسم ورشة العمل يدوياً", "Or enter workshop title manually")
                        : t("اسم الفعالية / الندوة", "Event / Seminar Title")}
                  </Label>
                  <Input
                    placeholder={t("العنوان", "Title")}
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

              {/* Dynamic Inputs depending on type */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">
                    {t("تفاصيل وإعدادات الشهادة", "Certificate Details & Settings")}
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  
                  {/* Issue Date */}
                  <div className="space-y-1.5">
                    <Label className="text-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-primary" />
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

                  {/* Status */}
                  <div className="space-y-1.5">
                    <Label className="text-xs flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-primary" />
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
                        <SelectItem value="pending">{t("قيد المعالجة", "Pending")}</SelectItem>
                        <SelectItem value="verified">{t("موثقة", "Verified")}</SelectItem>
                        <SelectItem value="revoked">{t("ملغاة", "Revoked")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Template (Locked to Modern by default, but customizable if needed) */}
                  <div className="space-y-1.5">
                    <Label className="text-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-primary" />
                      {t("قالب التصميم", "Design Template")}
                    </Label>
                    <Select
                      value={form.template || "modern"}
                      onValueChange={(v) =>
                        setForm((f) => ({ ...f, template: v }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Modern (Default)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Attendance & Completion fields: dates & hours */}
                  {(form.type === "attendance" || form.type === "completion") && (
                    <>
                      <div className="space-y-1.5">
                        <Label className="text-xs flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-primary" />
                          {t("تاريخ البداية", "Start Date")}
                        </Label>
                        <Input
                          type="date"
                          value={form.start_date}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, start_date: e.target.value }))
                          }
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-primary" />
                          {t("تاريخ النهاية", "End Date")}
                        </Label>
                        <Input
                          type="date"
                          value={form.end_date || form.workshop_end_date}
                          onChange={(e) =>
                            setForm((f) => ({ 
                              ...f, 
                              end_date: e.target.value,
                              workshop_end_date: e.target.value 
                            }))
                          }
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3 text-primary" />
                          {t("الساعات التدريبية (تلقائي إن تُرِك فارغاً)", "Training Hours (Auto if blank)")}
                        </Label>
                        <Input
                          type="number"
                          placeholder="e.g. 8"
                          value={form.hours}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, hours: e.target.value }))
                          }
                        />
                      </div>
                    </>
                  )}

                  {/* Speaker (Doctor) - Attendance */}
                  {form.type === "attendance" && (
                    <div className="space-y-1.5">
                      <Label className="text-xs flex items-center gap-1">
                        <User className="w-3 h-3 text-primary" />
                        {t("المحاضر / المتحدث", "Speaker / Doctor")}
                      </Label>
                      <Input
                        placeholder={t("د. أحمد محمد", "Dr. Ahmed")}
                        value={form.speaker}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, speaker: e.target.value }))
                        }
                      />
                    </div>
                  )}

                  {/* Venue (Location) - Attendance, Appreciation Org, Attended */}
                  {(form.type === "attendance" || form.type === "appreciation_org" || form.type === "attended") && (
                    <div className="space-y-1.5">
                      <Label className="text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-primary" />
                        {t("المقر / مكان الانعقاد", "Venue / Location")}
                      </Label>
                      <Input
                        placeholder={t("الرياض / عن بعد", "Riyadh / Online")}
                        value={form.venue}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, venue: e.target.value }))
                        }
                      />
                    </div>
                  )}

                  {/* Role (for Appreciation) */}
                  {(form.type === "appreciation_person" || form.type === "appreciation_org") && (
                    <div className="space-y-1.5">
                      <Label className="text-xs flex items-center gap-1">
                        <StarIcon className="w-3 h-3 text-primary" />
                        {t("الصفة / الدور", "Role / Contribution Title")}
                      </Label>
                      <Input
                        placeholder={t("مثال: متحدث رئيسي، شريك تنظيمي", "e.g. Keynote Speaker, Organizer Partner")}
                        value={form.role}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, role: e.target.value }))
                        }
                      />
                    </div>
                  )}

                  {/* Completion Status (for Completion) */}
                  {form.type === "completion" && (
                    <div className="space-y-1.5">
                      <Label className="text-xs flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-primary" />
                        {t("حالة الإتمام", "Completion Status")}
                      </Label>
                      <Input
                        placeholder="e.g. Completed, Passed with Honors"
                        value={form.completion_status}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, completion_status: e.target.value }))
                        }
                      />
                    </div>
                  )}

                  {/* Duration text (for Completion) */}
                  {form.type === "completion" && (
                    <div className="space-y-1.5">
                      <Label className="text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3 text-primary" />
                        {t("المدة الزمنية (مثال: 3 أشهر)", "Duration (e.g. 3 Months)")}
                      </Label>
                      <Input
                        placeholder="e.g. 3 Months"
                        value={form.duration}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, duration: e.target.value }))
                        }
                      />
                    </div>
                  )}
                </div>

                {/* Contribution Description (for Appreciation Person) */}
                {form.type === "appreciation_person" && (
                  <div className="space-y-1.5">
                    <Label className="text-xs flex items-center gap-1">
                      <FileText className="w-3 h-3 text-primary" />
                      {t("وصف المساهمة / الشكر والتقدير", "Contribution Description")}
                    </Label>
                    <Textarea
                      placeholder={t("أدخل عبارات الشكر والتقدير المخصصة...", "Enter custom appreciation details...")}
                      value={form.contribution_description}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, contribution_description: e.target.value }))
                      }
                      rows={3}
                    />
                  </div>
                )}
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
              {/* Live certificate preview rendering */}
              <div className="w-full overflow-x-auto pb-4">
                <div className="min-w-[800px]">
                  <CertificateTemplate 
                    cert={{
                      id: "preview",
                      serial_number: "CERT-PREVIEW-123",
                      recipient_name: previewName,
                      recipient_name_ar: form.recipient_name_ar,
                      workshop_title: previewWorkshop,
                      doctor_name: form.speaker,
                      issue_date: previewDate,
                      workshop_date: form.start_date,
                      workshop_end_date: form.end_date || form.workshop_end_date,
                      workshop_hours: Number(form.hours) || undefined,
                      status: form.status,
                      type: form.type,
                      template: form.template,
                      payload: {
                        type: form.type,
                        participant: {
                          name: previewName,
                          name_ar: form.recipient_name_ar,
                        },
                        event: {
                          title: previewWorkshop,
                          start_date: form.start_date,
                          end_date: form.end_date || form.workshop_end_date,
                          hours: Number(form.hours) || undefined,
                        },
                        venue: { location: form.venue },
                        speaker: { name: form.speaker },
                        organization: { name: form.organization_name, role: form.role },
                        extra: {
                          role: form.role,
                          completion_status: form.completion_status,
                          contribution_description: form.contribution_description,
                          duration: form.duration,
                        },
                      },
                    }} 
                    template={form.template as any} 
                  />
                </div>
              </div>

              {/* Summary details */}
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                {[
                  {
                    icon: User,
                    label: form.type === "appreciation_org" ? t("الجهة", "Organization") : t("المستلم", "Recipient"),
                    value: form.type === "appreciation_org" ? form.organization_name : previewName,
                  },
                  {
                    icon: GraduationCap,
                    label: t("الفعالية / الورشة", "Workshop / Event"),
                    value: previewWorkshop,
                  },
                  {
                    icon: Calendar,
                    label: t("تاريخ الإصدار", "Issue Date"),
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
              {t("حفظ وإصدار الشهادة", "Save & Issue Certificate")}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Simple Star Icon helper
function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
