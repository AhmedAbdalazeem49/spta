import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { UserItem } from "@/types/user";
import { Briefcase, Building2, CreditCard, Mail, Phone, Shield, User } from "lucide-react";

interface UserViewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserItem | null;
}

export const UserViewModal = ({ isOpen, onOpenChange, user }: UserViewModalProps) => {
  const { t, isRTL } = useLanguage();

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("تفاصيل المستخدم", "User Details")}</DialogTitle>
          <DialogDescription>{user.email}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-4">
          {[
            {
              icon: User,
              label: t("الاسم", "Name"),
              value: isRTL ? user.name_ar || user.name : user.name,
            },
            {
              icon: Mail,
              label: t("البريد", "Email"),
              value: user.email,
            },
            {
              icon: Phone,
              label: t("الهاتف", "Phone"),
              value: user.phone || "—",
            },
            {
              icon: CreditCard,
              label: t("الهوية", "National ID"),
              value: user.national_id || "—",
            },
            {
              icon: Briefcase,
              label: t("التخصص", "Specialization"),
              value: user.specialization || "—",
            },
            {
              icon: Briefcase,
              label: t("التخصص الفرعي", "Sub-Spec"),
              value: user.sub_specialization || "—",
            },
            {
              icon: Building2,
              label: t("جهة العمل", "Employer"),
              value: user.employer || "—",
            },
            {
              icon: Shield,
              label: t("الدور", "Role"),
              value: user.role === "system_admin" ? t("مدير النظام", "System Admin") : user.role === "branch_manager" ? t("مدير فرع", "Branch Manager") : t("عضو", "Member"),
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/40"
            >
              <item.icon className="w-4 h-4 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
