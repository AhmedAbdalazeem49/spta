import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { UserItem } from "@/types/user";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Pencil, Trash2 } from "lucide-react";

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
  selectedIds?: number[];
  onSelectionChange?: (ids: number[]) => void;
}

export const UsersTable = ({
  users,
  onOpenView,
  onOpenEdit,
  onOpenDelete,
  selectedIds = [],
  onSelectionChange,
}: UsersTableProps) => {
  const { t, isRTL } = useLanguage();

  const toggleAll = () => {
    if (selectedIds.length === users.length) {
      onSelectionChange?.([]);
    } else {
      onSelectionChange?.(users.map((u) => u.id));
    }
  };

  const toggleOne = (id: number) => {
    if (selectedIds.includes(id)) {
      onSelectionChange?.(selectedIds.filter((s) => s !== id));
    } else {
      onSelectionChange?.([...selectedIds, id]);
    }
  };

  return (
    <div className="overflow-x-auto border">
      <table className="w-full text-xs">
        <thead className="bg-muted/50">
          <tr className="border-b">
            {onSelectionChange && (
              <th className="px-2 py-2 w-8">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 cursor-pointer accent-primary"
                  checked={
                    users.length > 0 && selectedIds.length === users.length
                  }
                  onChange={toggleAll}
                  title={t("تحديد الكل", "Select All")}
                />
              </th>
            )}

            <th className="px-2 py-2 text-start font-semibold whitespace-nowrap">
              {t("الاسم", "Name")}
            </th>

            <th className="px-2 py-2 text-start font-semibold whitespace-nowrap">
              {t("البريد", "Email")}
            </th>

            <th className="px-2 py-2 text-start font-semibold whitespace-nowrap">
              {t("الهاتف", "Phone")}
            </th>

            <th className="px-2 py-2 text-start font-semibold whitespace-nowrap">
              {t("رقم الهوية / الإقامة", "National ID / Iqama")}
            </th>

            <th className="px-2 py-2 text-start font-semibold whitespace-nowrap">
              {t("التخصص", "Specialization")}
            </th>

            <th className="px-2 py-2 text-start font-semibold whitespace-nowrap">
              {t("التخصص الفرعي", "Sub-Spec")}
            </th>

            <th className="px-2 py-2 text-start font-semibold whitespace-nowrap">
              {t("المنطقة", "Region")}
            </th>

            <th className="px-2 py-2 text-start font-semibold whitespace-nowrap">
              {t("المدينة", "City")}
            </th>

            <th className="px-2 py-2 text-start font-semibold whitespace-nowrap">
              {t("جهة العمل", "Employer")}
            </th>

            <th className="px-2 py-2 text-start font-semibold whitespace-nowrap">
              {t("رقم التصنيف", "Classification No.")}
            </th>

            <th className="px-2 py-2 text-start font-semibold whitespace-nowrap">
              {t("الدور", "Role")}
            </th>

            <th className="px-2 py-2 text-start font-semibold whitespace-nowrap">
              {t("الإجراءات", "Actions")}
            </th>
          </tr>
        </thead>

        <tbody>
          <AnimatePresence>
            {users.map((u, i) => (
              <motion.tr
                key={u.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className={`border-b transition-colors ${
                  selectedIds.includes(u.id)
                    ? "bg-primary/5"
                    : "hover:bg-muted/30"
                }`}
              >
                {onSelectionChange && (
                  <td className="px-2 py-2">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 cursor-pointer accent-primary"
                      checked={selectedIds.includes(u.id)}
                      onChange={() => toggleOne(u.id)}
                    />
                  </td>
                )}

                <td className="px-2 py-2 font-medium whitespace-nowrap">
                  {isRTL ? u.name_ar || u.name : u.name}
                </td>

                <td className="px-2 py-2 text-muted-foreground whitespace-nowrap">
                  {u.email}
                </td>

                <td
                  className="px-2 py-2 text-muted-foreground whitespace-nowrap"
                  dir="ltr"
                >
                  {u.phone || "—"}
                </td>

                <td className="px-2 py-2 text-muted-foreground whitespace-nowrap">
                  {u.national_id || "—"}
                </td>

                <td className="px-2 py-2 text-muted-foreground whitespace-nowrap">
                  {u.specialization || "—"}
                </td>

                <td className="px-2 py-2 text-muted-foreground whitespace-nowrap">
                  {u.sub_specialization || "—"}
                </td>

                <td className="px-2 py-2 text-muted-foreground whitespace-nowrap">
                  {u.region || "—"}
                </td>

                <td className="px-2 py-2 text-muted-foreground whitespace-nowrap">
                  {u.city || "—"}
                </td>

                <td className="px-2 py-2 text-muted-foreground whitespace-nowrap">
                  {u.employer || "—"}
                </td>

                <td className="px-2 py-2 text-muted-foreground whitespace-nowrap">
                  {u.classification_number || "—"}
                </td>

                <td className="px-2 py-2 whitespace-nowrap">
                  <Badge
                    variant={
                      u.role === "system_admin"
                        ? "default"
                        : u.role === "branch_admin"
                          ? "outline"
                          : "secondary"
                    }
                    className={`text-[10px] px-2 py-0.5 ${
                      u.role === "branch_admin"
                        ? "border-blue-500 text-blue-500"
                        : ""
                    }`}
                  >
                    {u.role === "system_admin"
                      ? t("مدير النظام", "System Admin")
                      : u.role === "branch_admin"
                        ? t("مدير فرع", "Branch Manager")
                        : t("عضو", "Member")}
                  </Badge>
                </td>

                <td className="px-2 py-2">
                  <div className="flex items-center gap-0.5">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={() => onOpenView(u)}
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-primary hover:text-primary/80"
                      onClick={() => onOpenEdit(u)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-destructive"
                      onClick={() => onOpenDelete(u)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};
