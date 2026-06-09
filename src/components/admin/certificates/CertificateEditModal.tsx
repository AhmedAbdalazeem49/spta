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
import { Certificate } from "@/types/certificate";
import {
  Award,
  BadgeCheck,
  CalendarDays,
  FileBadge,
  Loader2,
  Save,
  ShieldCheck,
  User2,
  Clock,
  MapPin,
  Star,
  Building2,
  Sparkles
} from "lucide-react";

interface CertificateEditModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  form: Partial<Certificate & {
    type?: string;
    recipient_name_ar?: string;
    start_date?: string;
    end_date?: string;
    hours?: string | number;
    speaker?: string;
    venue?: string;
    role?: string;
    organization_name?: string;
    contribution_description?: string;
    completion_status?: string;
    duration?: string;
    payload?: any;
  }>;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  onSave: () => void;
  isSubmitting?: boolean;
}

export const CertificateEditModal = ({
  isOpen,
  onOpenChange,
  form,
  setForm,
  onSave,
  isSubmitting,
}: CertificateEditModalProps) => {
  const { t } = useLanguage();

  const formatDateValue = (date?: string | null) => {
    if (!date) return "";
    return date.split("T")[0];
  };

  const statusStyles = {
    verified: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    revoked: "bg-red-500/10 text-red-600 border-red-500/20",
  };

  // Get details from payload if present to prefill edit form
  const payload = form.payload;
  const certificateType = form.type || payload?.type || "attendance";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto border border-border/50 rounded-[32px] p-0 shadow-[0_25px_100px_rgba(0,0,0,0.18)]">
        {/* ───────────────── HEADER ───────────────── */}
        <div className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />

          <DialogHeader className="relative px-8 pt-8 pb-7">
            <div className="flex items-start justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-xl">
                  <Award className="w-8 h-8" />
                </div>

                <div>
                  <DialogTitle className="text-3xl font-black tracking-tight">
                    {t("تعديل الشهادة", "Edit Certificate")}
                  </DialogTitle>

                  <DialogDescription className="mt-2 text-sm leading-relaxed max-w-xl">
                    {t(
                      "قم بتحديث جميع بيانات الشهادة وتخصيص المعلومات الخاصة بالمشارك والورشة",
                      "Update certificate details, workshop information, participant data, and verification status."
                    )}
                  </DialogDescription>
                </div>
              </div>

              {form.status && (
                <div
                  className={`
                    hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl border text-sm font-semibold capitalize
                    ${
                      statusStyles[form.status as keyof typeof statusStyles] ||
                      ""
                    }
                  `}
                >
                  <ShieldCheck className="w-4 h-4" />
                  {form.status}
                </div>
              )}
            </div>

            {(form.serial_number || form.id) && (
              <div className="mt-7 flex items-center gap-3 rounded-2xl border bg-background/80 backdrop-blur-sm px-5 py-4 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileBadge className="w-5 h-5 text-primary" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[3px] text-muted-foreground">
                    Certificate Serial
                  </p>

                  <p className="font-bold text-lg tracking-wide">
                    {form.serial_number || `CERT-${form.id}`}
                  </p>
                </div>
              </div>
            )}
          </DialogHeader>
        </div>

        {/* ───────────────── BODY ───────────────── */}
        <div className="px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* ───────────────── TYPE ───────────────── */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <Award className="w-4 h-4 text-primary" />
                {t("نوع الشهادة", "Certificate Type")}
              </Label>
              <Select
                value={certificateType}
                onValueChange={(v) =>
                  setForm((f: any) => ({
                    ...f,
                    type: v,
                  }))
                }
              >
                <SelectTrigger className="h-14 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-border/60">
                  <SelectItem value="attendance">{t("حضور ورشة عمل", "Workshop Attendance")}</SelectItem>
                  <SelectItem value="completion">{t("إتمام برنامج", "Program Completion")}</SelectItem>
                  <SelectItem value="appreciation_person">{t("شكر وتقدير (أفراد)", "Appreciation (Person)")}</SelectItem>
                  <SelectItem value="appreciation_org">{t("شكر وتقدير (جهات)", "Appreciation (Organization)")}</SelectItem>
                  <SelectItem value="attended">{t("حضور ندوة", "Seminar Attended")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* ───────────────── STATUS ───────────────── */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <BadgeCheck className="w-4 h-4 text-primary" />
                {t("الحالة", "Certificate Status")}
              </Label>

              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm((f: any) => ({
                    ...f,
                    status: v as any,
                  }))
                }
              >
                <SelectTrigger className="h-14 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 shadow-sm">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent className="rounded-2xl border-border/60">
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="revoked">Revoked</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* ───────────────── RECIPIENT NAME (English) ───────────────── */}
            {certificateType !== "appreciation_org" && (
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <User2 className="w-4 h-4 text-primary" />
                  {t("اسم المستلم (إنجليزي)", "Recipient Name (English)")}
                </Label>
                <Input
                  value={form.recipient_name || payload?.participant?.name || ""}
                  placeholder="Ahmed Mohamed"
                  onChange={(e) =>
                    setForm((f: any) => ({
                      ...f,
                      recipient_name: e.target.value,
                    }))
                  }
                  className="h-14 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 text-base shadow-sm"
                />
              </div>
            )}

            {/* ───────────────── RECIPIENT NAME (Arabic) ───────────────── */}
            {certificateType !== "appreciation_org" && (
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <User2 className="w-4 h-4 text-primary" />
                  {t("اسم المستلم (عربي)", "Recipient Name (Arabic)")}
                </Label>
                <Input
                  value={form.recipient_name_ar || payload?.participant?.name_ar || ""}
                  placeholder="أحمد محمد"
                  onChange={(e) =>
                    setForm((f: any) => ({
                      ...f,
                      recipient_name_ar: e.target.value,
                    }))
                  }
                  className="h-14 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 text-base shadow-sm"
                />
              </div>
            )}

            {/* ───────────────── ORGANIZATION NAME (Appreciation Org only) ───────────────── */}
            {certificateType === "appreciation_org" && (
              <div className="space-y-3 md:col-span-2">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Building2 className="w-4 h-4 text-primary" />
                  {t("اسم الجهة / المنظمة", "Organization Name")}
                </Label>
                <Input
                  value={form.organization_name || payload?.organization?.name || ""}
                  placeholder="e.g. Specialized Hospital"
                  onChange={(e) =>
                    setForm((f: any) => ({
                      ...f,
                      organization_name: e.target.value,
                      recipient_name: e.target.value, // mirror for preview
                    }))
                  }
                  className="h-14 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 text-base shadow-sm"
                />
              </div>
            )}

            {/* ───────────────── WORKSHOP TITLE / EVENT NAME ───────────────── */}
            <div className="space-y-3 md:col-span-2">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <Award className="w-4 h-4 text-primary" />
                {certificateType === "completion" 
                  ? t("اسم البرنامج التدريبي", "Program Title")
                  : t("عنوان الورشة / الفعالية", "Workshop / Event Title")}
              </Label>

              <Input
                value={form.workshop_title || payload?.event?.title || ""}
                placeholder="Advanced Physical Therapy Workshop"
                onChange={(e) =>
                  setForm((f: any) => ({
                    ...f,
                    workshop_title: e.target.value,
                  }))
                }
                className="h-14 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 text-base shadow-sm"
              />
            </div>

            {/* ───────────────── DATES & HOURS (Attendance / Completion only) ───────────────── */}
            {(certificateType === "attendance" || certificateType === "completion") && (
              <>
                {/* Start Date */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm font-semibold">
                    <CalendarDays className="w-4 h-4 text-primary" />
                    {t("تاريخ البداية", "Start Date")}
                  </Label>
                  <Input
                    type="date"
                    value={formatDateValue(form.start_date || form.workshop_date || payload?.event?.start_date)}
                    onChange={(e) =>
                      setForm((f: any) => ({
                        ...f,
                        start_date: e.target.value,
                        workshop_date: e.target.value,
                      }))
                    }
                    className="h-14 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 shadow-sm"
                  />
                </div>

                {/* End Date */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm font-semibold">
                    <CalendarDays className="w-4 h-4 text-primary" />
                    {t("تاريخ النهاية", "End Date")}
                  </Label>
                  <Input
                    type="date"
                    value={formatDateValue(form.end_date || form.workshop_end_date || payload?.event?.end_date)}
                    onChange={(e) =>
                      setForm((f: any) => ({
                        ...f,
                        end_date: e.target.value,
                        workshop_end_date: e.target.value,
                      }))
                    }
                    className="h-14 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 shadow-sm"
                  />
                </div>

                {/* Training Hours */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm font-semibold">
                    <Clock className="w-4 h-4 text-primary" />
                    {t("الساعات التدريبية", "Training Hours")}
                  </Label>
                  <Input
                    type="number"
                    value={form.hours !== undefined ? form.hours : (form.workshop_hours !== undefined ? form.workshop_hours : payload?.event?.hours || "")}
                    placeholder="e.g. 8"
                    onChange={(e) =>
                      setForm((f: any) => ({
                        ...f,
                        hours: e.target.value,
                        workshop_hours: e.target.value ? Number(e.target.value) : undefined,
                      }))
                    }
                    className="h-14 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 shadow-sm"
                  />
                </div>
              </>
            )}

            {/* ───────────────── ISSUE DATE ───────────────── */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <CalendarDays className="w-4 h-4 text-primary" />
                {t("تاريخ الإصدار", "Issue Date")}
              </Label>

              <Input
                type="date"
                value={formatDateValue(
                  form.issue_date || form.issueDate || payload?.event?.start_date
                )}
                onChange={(e) =>
                  setForm((f: any) => ({
                    ...f,
                    issue_date: e.target.value,
                    issueDate: e.target.value,
                  }))
                }
                className="h-14 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 shadow-sm"
              />
            </div>

            {/* ───────────────── SPEAKER (Attendance) ───────────────── */}
            {certificateType === "attendance" && (
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <User2 className="w-4 h-4 text-primary" />
                  {t("المحاضر / المتحدث", "Speaker")}
                </Label>
                <Input
                  value={form.speaker || payload?.speaker?.name || ""}
                  placeholder="Dr. Ahmed"
                  onChange={(e) =>
                    setForm((f: any) => ({
                      ...f,
                      speaker: e.target.value,
                    }))
                  }
                  className="h-14 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 text-base shadow-sm"
                />
              </div>
            )}

            {/* ───────────────── VENUE (Attendance, Appreciation Org, Attended) ───────────────── */}
            {(certificateType === "attendance" || certificateType === "appreciation_org" || certificateType === "attended") && (
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <MapPin className="w-4 h-4 text-primary" />
                  {t("المقر / مكان الانعقاد", "Venue / Location")}
                </Label>
                <Input
                  value={form.venue || payload?.venue?.location || ""}
                  placeholder="Riyadh / Online"
                  onChange={(e) =>
                    setForm((f: any) => ({
                      ...f,
                      venue: e.target.value,
                    }))
                  }
                  className="h-14 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 text-base shadow-sm"
                />
              </div>
            )}

            {/* ───────────────── ROLE (Appreciation) ───────────────── */}
            {(certificateType === "appreciation_person" || certificateType === "appreciation_org") && (
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Star className="w-4 h-4 text-primary" />
                  {t("الصفة / الدور", "Role")}
                </Label>
                <Input
                  value={form.role || payload?.organization?.role || payload?.extra?.role || ""}
                  placeholder="e.g. Speaker, Sponsor"
                  onChange={(e) =>
                    setForm((f: any) => ({
                      ...f,
                      role: e.target.value,
                    }))
                  }
                  className="h-14 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 text-base shadow-sm"
                />
              </div>
            )}

            {/* ───────────────── COMPLETION STATUS (Completion) ───────────────── */}
            {certificateType === "completion" && (
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <BadgeCheck className="w-4 h-4 text-primary" />
                  {t("حالة الإتمام", "Completion Status")}
                </Label>
                <Input
                  value={form.completion_status || payload?.extra?.completion_status || ""}
                  placeholder="e.g. Completed"
                  onChange={(e) =>
                    setForm((f: any) => ({
                      ...f,
                      completion_status: e.target.value,
                    }))
                  }
                  className="h-14 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 text-base shadow-sm"
                />
              </div>
            )}

            {/* ───────────────── DURATION TEXT (Completion) ───────────────── */}
            {certificateType === "completion" && (
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Clock className="w-4 h-4 text-primary" />
                  {t("المدة الزمنية (مثال: 3 أشهر)", "Duration (e.g. 3 Months)")}
                </Label>
                <Input
                  value={form.duration || payload?.extra?.duration || ""}
                  placeholder="e.g. 3 Months"
                  onChange={(e) =>
                    setForm((f: any) => ({
                      ...f,
                      duration: e.target.value,
                    }))
                  }
                  className="h-14 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 text-base shadow-sm"
                />
              </div>
            )}

            {/* ───────────────── CONTRIBUTION DESCRIPTION (Appreciation Person) ───────────────── */}
            {certificateType === "appreciation_person" && (
              <div className="space-y-3 md:col-span-2">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <FileBadge className="w-4 h-4 text-primary" />
                  {t("وصف المساهمة / الشكر والتقدير", "Contribution Description")}
                </Label>
                <Textarea
                  value={form.contribution_description || payload?.extra?.contribution_description || ""}
                  placeholder="Enter details..."
                  onChange={(e) =>
                    setForm((f: any) => ({
                      ...f,
                      contribution_description: e.target.value,
                    }))
                  }
                  rows={3}
                  className="rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 py-3 text-base shadow-sm"
                />
              </div>
            )}

            {/* ───────────────── DESIGN TEMPLATE ───────────────── */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="w-4 h-4 text-primary" />
                {t("قالب التصميم", "Design Template")}
              </Label>
              <Select
                value={form.template || "modern"}
                onValueChange={(v) =>
                  setForm((f: any) => ({
                    ...f,
                    template: v,
                  }))
                }
              >
                <SelectTrigger className="h-14 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 shadow-sm">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-border/60">
                  <SelectItem value="modern">Modern (Default)</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>
        </div>

        {/* ───────────────── FOOTER ───────────────── */}
        <DialogFooter className="border-t bg-muted/20 px-8 py-5 flex-row justify-end gap-3 font-medium">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-12 px-6 rounded-2xl"
          >
            {t("إلغاء", "Cancel")}
          </Button>

          <Button
            onClick={onSave}
            disabled={isSubmitting}
            className="h-12 px-7 rounded-2xl gap-2 shadow-lg"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}

            {isSubmitting
              ? t("جارٍ الحفظ...", "Saving...")
              : t("حفظ التعديلات", "Save Changes")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
