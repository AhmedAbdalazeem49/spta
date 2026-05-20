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
import { Loader2, Save } from "lucide-react";

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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{t("تعديل الشهادة", "Edit Certificate")}</DialogTitle>
          <DialogDescription>
            {t("قم بتحديث بيانات الشهادة", "Update certificate details")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label>{t("الاسم", "Name")}</Label>
            <Input
              value={form.recipient_name || ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, recipient_name: e.target.value }))
              }
            />
          </div>

          <div>
            <Label>{t("الورشة", "Workshop")}</Label>
            <Input
              value={form.workshop_title || ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, workshop_title: e.target.value }))
              }
            />
          </div>

          <div>
            <Label>{t("التاريخ", "Date")}</Label>
            <Input
              type="date"
              value={(form.issueDate || "").split("T")[0]}
              onChange={(e) =>
                setForm((f) => ({ ...f, issueDate: e.target.value }))
              }
            />
          </div>

          <div>
            <Label>{t("الحالة", "Status")}</Label>
            <Select
              value={form.status}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, status: v as any }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="revoked">Revoked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("إلغاء", "Cancel")}
          </Button>

          <Button onClick={onSave} disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {t("حفظ", "Save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
