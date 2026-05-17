import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { EditForm, UserItem } from "@/types/user";
import { Loader2, Pencil, Shield } from "lucide-react";

interface UserEditModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: UserItem | null;
  editForm: EditForm;
  setEditForm: (form: EditForm) => void;
  isSaving: boolean;
  onSave: () => void;
}

export const UserEditModal = ({
  isOpen,
  onOpenChange,
  selectedUser,
  editForm,
  setEditForm,
  isSaving,
  onSave,
}: UserEditModalProps) => {
  const { t } = useLanguage();

  if (!selectedUser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="w-5 h-5 text-primary" />
            {t("تعديل المستخدم", "Edit User")}
          </DialogTitle>
          <DialogDescription>{selectedUser.email}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          <div className="space-y-1">
            <Label>{t("الاسم (EN)", "Name (EN)")}</Label>
            <Input
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <Label>{t("الاسم (AR)", "Name (AR)")}</Label>
            <Input
              value={editForm.name_ar}
              onChange={(e) =>
                setEditForm({ ...editForm, name_ar: e.target.value })
              }
              dir="rtl"
            />
          </div>

          <div className="space-y-1">
            <Label>{t("البريد الإلكتروني", "Email")}</Label>
            <Input
              type="email"
              value={editForm.email}
              onChange={(e) =>
                setEditForm({ ...editForm, email: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <Label>{t("الهاتف", "Phone")}</Label>
            <Input
              value={editForm.phone}
              onChange={(e) =>
                setEditForm({ ...editForm, phone: e.target.value })
              }
              dir="ltr"
            />
          </div>

          <div className="space-y-1">
            <Label>{t("رقم الهوية", "National ID")}</Label>
            <Input
              value={editForm.national_id}
              onChange={(e) =>
                setEditForm({ ...editForm, national_id: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <Label>{t("جهة العمل", "Employer")}</Label>
            <Input
              value={editForm.employer}
              onChange={(e) =>
                setEditForm({ ...editForm, employer: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <Label>{t("التخصص", "Specialization")}</Label>
            <Input
              value={editForm.specialization}
              onChange={(e) =>
                setEditForm({ ...editForm, specialization: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <Label>{t("التخصص الفرعي", "Sub-Specialization")}</Label>
            <Input
              value={editForm.sub_specialization}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  sub_specialization: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-1">
            <Label>
              {t("كلمة المرور الجديدة", "New Password")}{" "}
              <span className="text-xs text-muted-foreground">
                ({t("اتركه فارغاً للإبقاء", "leave blank to keep")})
              </span>
            </Label>
            <Input
              type="password"
              value={editForm.password}
              onChange={(e) =>
                setEditForm({ ...editForm, password: e.target.value })
              }
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-1">
            <Label>{t("تأكيد كلمة المرور", "Confirm Password")}</Label>
            <Input
              type="password"
              value={editForm.password_confirmation}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  password_confirmation: e.target.value,
                })
              }
              placeholder="••••••••"
            />
          </div>

          {/* Admin Toggle */}
          <div className="sm:col-span-2">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">
                    {t("صلاحيات المدير", "Admin Privileges")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t(
                      "منح المستخدم صلاحيات الإدارة الكاملة",
                      "Grant this user full admin access"
                    )}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  setEditForm({ ...editForm, is_admin: !editForm.is_admin })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  editForm.is_admin ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    editForm.is_admin ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("إلغاء", "Cancel")}
          </Button>
          <Button onClick={onSave} disabled={isSaving} className="gap-2">
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Pencil className="w-4 h-4" />
            )}
            {t("حفظ التغييرات", "Save Changes")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
