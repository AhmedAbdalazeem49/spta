import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  AlertTriangle,
  Loader2,
  Trash2,
  User,
  Mail,
  Phone,
  BadgeCheck,
  Shield,
  IdCard,
} from "lucide-react";

interface UserDeleteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selected: any | null;
  onDelete: () => void;
  isDeleting: boolean;
}

export const UserDeleteModal = ({
  isOpen,
  onOpenChange,
  selected,
  onDelete,
  isDeleting,
}: UserDeleteModalProps) => {
  const { t } = useLanguage();

  const user = selected;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl overflow-hidden p-0 border border-red-200/30 rounded-[28px] shadow-2xl">
        {/* ───────── HEADER ───────── */}
        <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white p-6 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

          <DialogHeader className="relative">
            <DialogTitle className="flex items-center gap-3 text-2xl font-black">
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-300" />
              </div>

              {t("تأكيد حذف المستخدم", "Delete User Confirmation")}
            </DialogTitle>

            <DialogDescription className="text-red-100 mt-2">
              {t(
                "هذا الإجراء سيؤدي إلى حذف المستخدم نهائياً",
                "This will permanently delete the user account"
              )}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* ───────── USER INFO ───────── */}
        <div className="p-6 space-y-5">
          {/* USER CARD */}
          {user && (
            <div className="rounded-2xl border bg-muted/30 p-5 space-y-4">
              {/* Identity */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold">{user.name}</h3>

                  <p className="text-sm text-muted-foreground">
                    {user.name_ar}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-600">
                    {user.role}
                  </span>

                  <span className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-600">
                    {user.membership_status}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="break-all">{user.email}</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {user.phone}
                </div>

                {user.national_id && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <IdCard className="w-4 h-4" />
                    {user.national_id}
                  </div>
                )}

                {user.active_membership?.membership_number && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    {user.active_membership.membership_number}
                  </div>
                )}
              </div>

              {/* Membership Info */}
              {user.active_membership && (
                <div className="rounded-xl border bg-background p-3 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-emerald-500" />
                    <span>Active Membership</span>
                  </div>

                  <span className="text-muted-foreground">
                    Expires: {user.active_membership.ends_at?.split("T")[0]}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* WARNING BOX */}
          <div className="rounded-2xl border border-red-200/40 bg-red-50 p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />

            <div>
              <p className="font-semibold text-red-700">
                {t("تحذير خطير", "Critical Warning")}
              </p>

              <p className="text-sm text-red-600 mt-1">
                {t(
                  "سيتم حذف الحساب وكل البيانات المرتبطة به بشكل نهائي ولا يمكن استرجاعها",
                  "The account and all related data will be permanently deleted and cannot be recovered"
                )}
              </p>
            </div>
          </div>
        </div>

        {/* ───────── ACTIONS ───────── */}
        <DialogFooter className="p-5 border-t bg-background flex-row justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-xl"
          >
            {t("إلغاء", "Cancel")}
          </Button>

          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={isDeleting}
            className="gap-2 rounded-xl shadow-lg"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            {t("حذف المستخدم نهائياً", "Delete User Permanently")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
