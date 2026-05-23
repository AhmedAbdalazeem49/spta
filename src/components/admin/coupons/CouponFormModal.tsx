import { api } from "@/api";
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
import {
  AlertCircle,
  Building2,
  CheckCircle,
  Edit,
  Gift,
  GraduationCap,
  Loader2,
  Percent,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";

// --------------------
// TYPES
// --------------------
type Workshop = {
  id: number;
  title: string;
};

export const EMPTY_PROMO_FORM = {
  code: "",
  type: "discount",
  discount_percentage: 10,
  usage_limit: 100,
  used_count: 0,
  start_date: "",
  end_date: "",
  applies_to: "all",
  applies_to_id: null as number | null,
  is_active: true,
};

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  form: typeof EMPTY_PROMO_FORM;
  setForm: React.Dispatch<React.SetStateAction<typeof EMPTY_PROMO_FORM>>;
  editMode: boolean;
  isSubmitting: boolean;
  onSave: () => void;
}

// --------------------
// API FETCH (WORKSHOPS)
// --------------------
export async function fetchWorkshops(): Promise<Workshop[]> {
  const res = await api.get("/admin/workshops");

  // Laravel standard response support
  return res.data?.data ?? res.data ?? [];
}

export const PromoCodeFormModal = ({
  isOpen,
  onOpenChange,
  form,
  setForm,
  editMode,
  isSubmitting,
  onSave,
}: Props) => {
  const { t } = useLanguage();

  const [error, setError] = useState<string | null>(null);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loadingWorkshops, setLoadingWorkshops] = useState(false);
  const { user } = useAuth();
  const isSystemAdmin = user?.role === "system_admin";

  // --------------------
  // LOAD WORKSHOPS
  // --------------------
  useEffect(() => {
    if (!isOpen) return;

    const load = async () => {
      setLoadingWorkshops(true);
      try {
        const data = await fetchWorkshops();
        setWorkshops(data);
      } finally {
        setLoadingWorkshops(false);
      }
    };

    load();
  }, [isOpen]);

  // --------------------
  // CODE GENERATOR
  // --------------------
  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "SPTA-";
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setForm((f) => ({ ...f, code }));
  };

  // --------------------
  // VALIDATION (MATCH BACKEND EXACTLY)
  // --------------------
  const validate = (): boolean => {
    if (!form.code) return setError("Code is required"), false;

    if (!form.type) return setError("Type is required"), false;

    if (
      form.type === "discount" &&
      (form.discount_percentage < 0 || form.discount_percentage > 100)
    )
      return setError("Discount must be 0-100"), false;

    if (!form.usage_limit || form.usage_limit < 1)
      return setError("Usage limit must be at least 1"), false;

    if (!form.start_date) return setError("Start date required"), false;

    if (!form.end_date) return setError("End date required"), false;

    if (new Date(form.end_date) < new Date(form.start_date))
      return setError("End date must be after start date"), false;

    if (!form.applies_to) return setError("Scope required"), false;

    if (form.applies_to === "workshop" && !form.applies_to_id)
      return setError("Please select a workshop"), false;

    setError(null);
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave();
  };

  // --------------------
  // SCOPE ICON
  // --------------------
  const scopeIcon = useMemo(() => {
    switch (form.applies_to) {
      case "membership":
        return <Users className="w-4 h-4" />;
      case "workshop":
        return <GraduationCap className="w-4 h-4" />;
      default:
        return <Building2 className="w-4 h-4" />;
    }
  }, [form.applies_to]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl rounded-2xl">
        {/* HEADER */}
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            {editMode ? (
              <Edit className="w-5 h-5 text-primary" />
            ) : (
              <Plus className="w-5 h-5 text-primary" />
            )}
            {t("كود خصم", "Promo Code")}
          </DialogTitle>

          <DialogDescription>
            {t(
              "إدارة أكواد الخصم والعضويات والورش",
              "Manage discount, membership and workshop promo codes"
            )}
          </DialogDescription>
        </DialogHeader>

        {/* ERROR */}
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* BODY */}
        <div className="grid grid-cols-2 gap-5 py-4">
          {/* CODE */}
          <div className="col-span-2 space-y-2">
            <Label>{t("الكود", "Code")}</Label>
            <div className="flex gap-2">
              <Input
                value={form.code}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    code: e.target.value.toUpperCase(),
                  }))
                }
                className="font-mono tracking-wider"
                placeholder="SPTA-XXXXXX"
              />
              <Button variant="outline" onClick={generateCode}>
                <Sparkles className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* TYPE */}
          <div className="space-y-2">
            <Label>{t("النوع", "Type")}</Label>
            <Select
              value={form.type}
              onValueChange={(v) => setForm((f) => ({ ...f, type: v as any }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discount">
                  <div className="flex items-center gap-2">
                    <Percent className="w-4 h-4" />
                    {t("خصم", "Discount")}
                  </div>
                </SelectItem>
                <SelectItem value="free">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4" />
                    {t("مجاني", "Free")}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* USAGE */}
          <div className="space-y-2">
            <Label>{t("عدد الاستخدامات", "Usage Limit")}</Label>
            <Input
              type="number"
              value={form.usage_limit}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  usage_limit: Number(e.target.value),
                }))
              }
            />
          </div>

          {/* DISCOUNT */}
          {form.type === "discount" && (
            <div className="col-span-2 space-y-2">
              <Label>{t("نسبة الخصم", "Discount %")}</Label>
              <Input
                type="number"
                value={form.discount_percentage}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    discount_percentage: Number(e.target.value),
                  }))
                }
              />
            </div>
          )}

          {/* SCOPE */}
          <div className="space-y-2 col-span-2">
            <Label>{t("النطاق", "Scope")}</Label>
            <Select
              value={form.applies_to}
              onValueChange={(v) =>
                setForm((f) => ({
                  ...f,
                  applies_to: v as any,
                  applies_to_id: null,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {isSystemAdmin && (
                  <SelectItem value="all">🌍 {t("الكل", "All")}</SelectItem>
                )}
                {isSystemAdmin && (
                  <SelectItem value="membership">👤 Membership</SelectItem>
                )}
                <SelectItem value="workshop">🎓 Workshop</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* WORKSHOP SELECT */}
          {form.applies_to === "workshop" && (
            <div className="col-span-2 space-y-2">
              <Label>{t("اختر الورشة", "Select Workshop")}</Label>

              {loadingWorkshops ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading workshops...
                </div>
              ) : (
                <Select
                  value={form.applies_to_id?.toString() || ""}
                  onValueChange={(v) =>
                    setForm((f) => ({
                      ...f,
                      applies_to_id: Number(v),
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select workshop" />
                  </SelectTrigger>
                  <SelectContent>
                    {workshops.map((w) => (
                      <SelectItem key={w.id} value={String(w.id)}>
                        {w.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          )}

          {/* DATES */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div>
              <Label>{t("البداية", "Start")}</Label>
              <Input
                type="datetime-local"
                value={form.start_date}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    start_date: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <Label>{t("النهاية", "End")}</Label>
              <Input
                type="datetime-local"
                value={form.end_date}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    end_date: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("إلغاء", "Cancel")}
          </Button>

          <Button onClick={handleSave} disabled={isSubmitting}>
            <CheckCircle className="w-4 h-4 mr-2" />
            {isSubmitting ? t("جاري الحفظ...", "Saving...") : t("حفظ", "Save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
