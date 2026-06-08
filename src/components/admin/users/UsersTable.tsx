import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { UserItem } from "@/types/user";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, CheckCircle2, Clock, Eye, Loader2, Pencil, Trash2, XCircle } from "lucide-react";

interface UsersTableProps {
  users: UserItem[];
  page: number;
  lastPage: number;
  updatingId: number | null;
  onPageChange: (page: number) => void;
  onUpdateStatus: (id: number, status: "approved" | "rejected") => void;
  onOpenView: (user: UserItem) => void;
  onOpenEdit: (user: UserItem) => void;
  onOpenDelete: (user: UserItem) => void;
}

export const UsersTable = ({
  users,
  page,
  lastPage,
  updatingId,
  onPageChange,
  onUpdateStatus,
  onOpenView,
  onOpenEdit,
  onOpenDelete,
}: UsersTableProps) => {
  const { t, isRTL } = useLanguage();

  const formatDate = (date?: string | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-start p-4 font-semibold text-sm">#</th>
            <th className="text-start p-4 font-semibold text-sm">
              {t("الاسم", "Name")}
            </th>
            <th className="text-start p-4 font-semibold text-sm">
              {t("البريد", "Email")}
            </th>
            <th className="text-start p-4 font-semibold text-sm">
              {t("الهاتف", "Phone")}
            </th>
            <th className="text-start p-4 font-semibold text-sm">
              {t("رقم الهوية / الإقامة", "National ID / Iqama")}
            </th>
            <th className="text-start p-4 font-semibold text-sm">
              {t("التخصص", "Specialization")}
            </th>
            <th className="text-start p-4 font-semibold text-sm">
              {t("التخصص الفرعي", "Sub-Spec")}
            </th>
            <th className="text-start p-4 font-semibold text-sm">
              {t("جهة العمل", "Employer")}
            </th>
            <th className="text-start p-4 font-semibold text-sm">
              {t("تاريخ التسجيل", "Registered")}
            </th>
            <th className="text-start p-4 font-semibold text-sm">
              {t("الدور", "Role")}
            </th>
            <th className="text-start p-4 font-semibold text-sm">
              {t("الحالة", "Status")}
            </th>
            <th className="text-start p-4 font-semibold text-sm">
              {t("الإجراءات", "Actions")}
            </th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {users.map((u, i) => (
              <motion.tr
                key={u.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="border-t border-border hover:bg-muted/30 transition-colors"
              >
                <td className="p-4 text-sm text-muted-foreground">{u.id}</td>
                <td className="p-4">
                  <p className="font-medium text-sm">
                    {isRTL ? u.name_ar || u.name : u.name}
                  </p>
                  {u.name_ar && (
                    <p className="text-xs text-muted-foreground">
                      {isRTL ? u.name : u.name_ar}
                    </p>
                  )}
                </td>
                <td className="p-4 text-sm text-muted-foreground">{u.email}</td>
                <td className="p-4 text-sm text-muted-foreground" dir="ltr">
                  {u.phone || "—"}
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  {u.national_id || "—"}
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  {u.specialization || "—"}
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  {u.sub_specialization || "—"}
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  {u.employer || "—"}
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  {formatDate(u.created_at)}
                </td>
                <td className="p-4">
                  <Badge
                    variant={u.role === "system_admin" ? "default" : u.role === "branch_admin" ? "outline" : "secondary"}
                    className={`text-xs ${u.role === "branch_admin" ? "border-blue-500 text-blue-500" : ""}`}
                  >
                    {u.role === "system_admin" 
                      ? t("مدير النظام", "System Admin") 
                      : u.role === "branch_admin" 
                      ? t("مدير فرع", "Branch Manager") 
                      : t("عضو", "Member")}
                  </Badge>
                </td>
                <td className="p-4">
                  {(() => {
                    const status = u.status || (u.email_verified_at ? "approved" : "pending");
                    const config: Record<
                      string,
                      { label: string; cls: string; Icon: any }
                    > = {
                      pending: {
                        label: t(" للتفعيل", "Need Verify"),
                        cls: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
                        Icon: Clock,
                      },
                      approved: {
                        label: t("نشط", "Active"),
                        cls: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
                        Icon: BadgeCheck,
                      },
                    };
                    const c = config[status] || config.pending;
                    const SI = c.Icon;
                    return (
                      <Badge variant="outline" className={`${c.cls} gap-1`}>
                        <SI className="w-3 h-3" />
                        {c.label}
                      </Badge>
                    );
                  })()}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1 flex-wrap">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onOpenView(u)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-primary hover:text-primary/80"
                      onClick={() => onOpenEdit(u)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => onOpenDelete(u)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>

      {lastPage > 1 && (
        <div className="flex justify-end mt-3 gap-2 px-4 pb-4">
          <Button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            {t("السابق", "Prev")}
          </Button>
          <span className="px-2 py-1">
            {page} / {lastPage}
          </span>
          <Button
            onClick={() => onPageChange(Math.min(lastPage, page + 1))}
            disabled={page === lastPage}
          >
            {t("التالي", "Next")}
          </Button>
        </div>
      )}
    </div>
  );
};
