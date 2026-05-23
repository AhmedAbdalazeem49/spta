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
} from "lucide-react";

interface CertificateEditModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  form: Partial<Certificate>;
  setForm: React.Dispatch<React.SetStateAction<Partial<Certificate>>>;
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

  // ───────────────────────────────────────────────────────────
  // FORMAT DATE
  // Removes timezone & time part
  // ───────────────────────────────────────────────────────────

  const formatDateValue = (date?: string | null) => {
    if (!date) return "";

    return date.split("T")[0];
  };

  // ───────────────────────────────────────────────────────────
  // STATUS STYLE
  // ───────────────────────────────────────────────────────────

  const statusStyles = {
    verified: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    revoked: "bg-red-500/10 text-red-600 border-red-500/20",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl overflow-hidden border border-border/50 rounded-[32px] p-0 shadow-[0_25px_100px_rgba(0,0,0,0.18)]">
        {/* ───────────────── HEADER ───────────────── */}
        <div className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-background to-background">
          {/* Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />

          <DialogHeader className="relative px-8 pt-8 pb-7">
            <div className="flex items-start justify-between gap-5">
              {/* Left */}
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

              {/* Status Badge */}
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

            {/* Serial */}
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
            {/* ───────────────── NAME ───────────────── */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <User2 className="w-4 h-4 text-primary" />
                {t("اسم المستلم", "Recipient Name")}
              </Label>

              <div className="relative">
                <Input
                  value={form.recipient_name || ""}
                  placeholder="Ahmed Mohamed Abdalazeem"
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      recipient_name: e.target.value,
                    }))
                  }
                  className="h-14 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 text-base shadow-sm focus-visible:ring-2"
                />
              </div>

              <p className="text-xs text-muted-foreground">
                Full participant name displayed on the certificate.
              </p>
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
                  setForm((f) => ({
                    ...f,
                    status: v as any,
                  }))
                }
              >
                <SelectTrigger className="h-14 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 shadow-sm">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent className="rounded-2xl border-border/60">
                  <SelectItem value="pending">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      Pending
                    </div>
                  </SelectItem>

                  <SelectItem value="verified">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      Verified
                    </div>
                  </SelectItem>

                  <SelectItem value="revoked">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      Revoked
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <p className="text-xs text-muted-foreground">
                Manage the current verification state of this certificate.
              </p>
            </div>

            {/* ───────────────── WORKSHOP ───────────────── */}
            <div className="space-y-3 md:col-span-2">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <Award className="w-4 h-4 text-primary" />
                {t("عنوان الورشة", "Workshop Title")}
              </Label>

              <Input
                value={form.workshop_title || ""}
                placeholder="Advanced Physical Therapy Workshop"
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    workshop_title: e.target.value,
                  }))
                }
                className="h-14 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 text-base shadow-sm"
              />

              <p className="text-xs text-muted-foreground">
                This title will appear prominently inside the certificate.
              </p>
            </div>

            {/* ───────────────── ISSUE DATE ───────────────── */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <CalendarDays className="w-4 h-4 text-primary" />
                {t("تاريخ الإصدار", "Issue Date")}
              </Label>

              <Input
                type="date"
                value={formatDateValue(
                  (form.issue_date as string) || (form.issueDate as string)
                )}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    issue_date: e.target.value,
                    issueDate: e.target.value,
                  }))
                }
                className="h-14 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 shadow-sm"
              />

              <p className="text-xs text-muted-foreground">
                Certificate official issue date.
              </p>
            </div>

            {/* ───────────────── WORKSHOP DATE ───────────────── */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <CalendarDays className="w-4 h-4 text-primary" />
                {t("تاريخ الورشة", "Workshop Date")}
              </Label>

              <Input
                type="date"
                value={formatDateValue(form.workshop_date as string)}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    workshop_date: e.target.value,
                  }))
                }
                className="h-14 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm px-5 shadow-sm"
              />

              <p className="text-xs text-muted-foreground">
                Date when the workshop or event took place.
              </p>
            </div>
          </div>

          {/* ───────────────── PREVIEW CARD ───────────────── */}
          <div className="mt-8 rounded-[28px] border border-border/60 bg-gradient-to-br from-muted/40 via-background to-background p-6 shadow-sm">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Award className="w-7 h-7 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[4px] text-muted-foreground mb-2">
                  Certificate Preview Summary
                </p>

                <h3 className="text-2xl font-black tracking-tight leading-tight">
                  {form.recipient_name || "Recipient Name"}
                </h3>

                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {form.workshop_title || "Workshop title will appear here"}
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-5">
                  <div className="px-4 py-2 rounded-xl border bg-background text-sm font-medium">
                    {formatDateValue(
                      (form.issue_date as string) || (form.issueDate as string)
                    ) || "No issue date"}
                  </div>

                  <div
                    className={`
                      px-4 py-2 rounded-xl border text-sm font-semibold capitalize
                      ${
                        statusStyles[
                          form.status as keyof typeof statusStyles
                        ] || ""
                      }
                    `}
                  >
                    {form.status || "pending"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ───────────────── FOOTER ───────────────── */}
        <DialogFooter className="border-t bg-muted/20 px-8 py-5 flex-row justify-end gap-3">
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
