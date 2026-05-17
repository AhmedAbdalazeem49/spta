import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, Edit, Plus, Sparkles } from "lucide-react";

export const EMPTY_COUPON_FORM = {
  code: "",
  type: "discount",
  discountPercent: 10,
  maxUsage: 100,
  validFrom: "",
  validTo: "",
  linkedWorkshop: "",
};

interface CouponFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  form: typeof EMPTY_COUPON_FORM;
  setForm: React.Dispatch<React.SetStateAction<typeof EMPTY_COUPON_FORM>>;
  editMode: boolean;
  isSubmitting: boolean;
  onSave: () => void;
  codeToEdit?: string;
}

export const CouponFormModal = ({
  isOpen,
  onOpenChange,
  form,
  setForm,
  editMode,
  isSubmitting,
  onSave,
  codeToEdit,
}: CouponFormModalProps) => {
  const { t } = useLanguage();

  const generateRandomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "SPTA-";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setForm((f) => ({ ...f, code: result }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {editMode ? (
              <>
                <Edit className="w-5 h-5 text-primary" />
                {t("تعديل الكود", "Edit Code")}
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 text-primary" />
                {t("إنشاء كود جديد", "Create New Code")}
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {editMode
              ? codeToEdit
              : t("أنشئ كود خصم أو حضور مجاني جديد", "Create a new discount or free attendance code")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>{t("الكود", "Code")}</Label>
            <div className="flex gap-2">
              <Input
                value={form.code}
                onChange={(e) =>
                  setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))
                }
                placeholder={t("مثال: SPTA2024", "e.g., SPTA2024")}
                className="font-mono"
              />
              <Button
                variant="outline"
                onClick={generateRandomCode}
                title={t("توليد تلقائي", "Generate")}
              >
                <Sparkles className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("النوع", "Type")}</Label>
            <Select
              value={form.type}
              onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discount">{t("خصم", "Discount")}</SelectItem>
                <SelectItem value="free">{t("حضور مجاني", "Free Attendance")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {form.type === "discount" && (
            <div className="space-y-2">
              <Label>{t("نسبة الخصم", "Discount Percentage")}</Label>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  min="1"
                  max="99"
                  value={form.discountPercent}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      discountPercent: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-24"
                />
                <span className="text-2xl font-bold text-primary">%</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>{t("الحد الأقصى للاستخدام", "Max Usage")}</Label>
            <Input
              type="number"
              min="1"
              value={form.maxUsage}
              onChange={(e) =>
                setForm((f) => ({ ...f, maxUsage: parseInt(e.target.value) || 1 }))
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("تاريخ البدء", "Start Date")}</Label>
              <Input
                type="date"
                value={form.validFrom}
                onChange={(e) =>
                  setForm((f) => ({ ...f, validFrom: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>{t("تاريخ الانتهاء", "End Date")}</Label>
              <Input
                type="date"
                value={form.validTo}
                onChange={(e) =>
                  setForm((f) => ({ ...f, validTo: e.target.value }))
                }
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("إلغاء", "Cancel")}
          </Button>
          <Button
            onClick={onSave}
            disabled={isSubmitting}
            className="bg-green-accent hover:bg-green-light gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            {isSubmitting
              ? t(editMode ? "جارٍ الحفظ..." : "جارٍ الإنشاء...", editMode ? "Saving..." : "Creating...")
              : t(editMode ? "حفظ التعديلات" : "إنشاء", editMode ? "Save Changes" : "Create")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
