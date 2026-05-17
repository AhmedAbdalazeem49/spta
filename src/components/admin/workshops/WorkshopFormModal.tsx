import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { Edit, Loader2, Plus } from "lucide-react";

export const emptyWorkshopForm = {
  title: "",
  description: "",
  doctor_name: "",
  location: "",
  date: "",
  time: "",
  regular_price: "",
  member_price: "",
  total_capacity: "",
  status: "open" as "open" | "closed" | "completed",
  duration_minutes: 60,
};

interface WorkshopFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  form: typeof emptyWorkshopForm;
  setForm: (form: typeof emptyWorkshopForm) => void;
  editMode: boolean;
  isSaving: boolean;
  onSave: () => void;
}

export const WorkshopFormModal = ({
  isOpen,
  onOpenChange,
  form,
  setForm,
  editMode,
  isSaving,
  onSave,
}: WorkshopFormModalProps) => {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editMode
              ? t("تعديل الورشة", "Edit Workshop")
              : t("إضافة ورشة", "Add Workshop")}
          </DialogTitle>
          <DialogDescription>
            {editMode
              ? t("عدّل بيانات الورشة", "Update workshop details")
              : t("أدخل بيانات الورشة الجديدة", "Enter new workshop details")}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("الاسم", "Title")} *</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder={t("عنوان الورشة", "Workshop title")}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("الطبيب", "Doctor")} *</Label>
              <Input
                value={form.doctor_name}
                onChange={(e) =>
                  setForm({ ...form, doctor_name: e.target.value })
                }
                placeholder={t("اسم الطبيب", "Doctor name")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("الوصف", "Description")} *</Label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={3}
              placeholder={t("وصف الورشة", "Workshop description")}
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>{t("الموقع", "Location")} *</Label>
              <Input
                value={form.location}
                onChange={(e) =>
                  setForm({ ...form, location: e.target.value })
                }
                placeholder={t("مكان الورشة", "Workshop location")}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("التاريخ", "Date")} *</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("الوقت", "Time")} *</Label>
              <Input
                type="time"
                value={form.time}
                onChange={(e) =>
                  setForm({ ...form, time: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>{t("السعر", "Price (SAR)")} *</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={form.regular_price}
                onChange={(e) =>
                  setForm({ ...form, regular_price: e.target.value })
                }
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label>{t("سعر الأعضاء", "Member Price")} *</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={form.member_price}
                onChange={(e) =>
                  setForm({ ...form, member_price: e.target.value })
                }
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label>{t("المقاعد", "Capacity")} *</Label>
              <Input
                type="number"
                min="1"
                value={form.total_capacity}
                onChange={(e) =>
                  setForm({ ...form, total_capacity: e.target.value })
                }
                placeholder="30"
              />
            </div>
            <div className="space-y-2">
              <Label>{t("المدة بالدقائق", "Duration (min)")} *</Label>
              <Input
                type="number"
                min="15"
                value={form.duration_minutes}
                onChange={(e) =>
                  setForm({
                    ...form,
                    duration_minutes: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="60"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("الحالة", "Status")}</Label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as any })
              }
            >
              <option value="open">{t("مفتوح", "Open")}</option>
              <option value="closed">{t("مغلق", "Closed")}</option>
              <option value="completed">{t("مكتمل", "Completed")}</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("إلغاء", "Cancel")}
          </Button>
          <Button onClick={onSave} disabled={isSaving} className="gap-2">
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : editMode ? (
              <Edit className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            {editMode
              ? t("حفظ التغييرات", "Save Changes")
              : t("إنشاء الورشة", "Create Workshop")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
