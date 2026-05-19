import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { EditForm, UserItem } from "@/types/user";
import { Loader2, Pencil, Shield, Users, Building2 } from "lucide-react";

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

          {/* Role Select */}
          <div className="sm:col-span-2">
            <div className="space-y-1.5">
              <Label>{t("الصلاحية والدور", "Role")}</Label>
              <div className="relative">
                <Select
                  value={editForm.role}
                  onValueChange={(val) => setEditForm({ ...editForm, role: val })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{t("عضو", "Member")}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="branch_manager">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-blue-500" />
                        <span>{t("مدير فرع", "Branch Manager")}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="system_admin">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span>{t("مدير النظام", "System Admin")}</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
