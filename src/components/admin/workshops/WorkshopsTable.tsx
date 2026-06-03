import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Workshop } from "@/types/workshop";
import { motion } from "framer-motion";
import { Edit, GraduationCap, Trash2, Users } from "lucide-react";
import { WorkshopStatusBadge } from "./WorkshopStatusBadge";

interface WorkshopsTableProps {
  workshops: Workshop[];
  onOpenView: (w: Workshop) => void;
  onOpenEdit: (w: Workshop) => void;
  onOpenDelete: (w: Workshop) => void;
  onOpenSubscriptions: (w: Workshop) => void;
}

export const WorkshopsTable = ({
  workshops,
  onOpenView,
  onOpenEdit,
  onOpenDelete,
  onOpenSubscriptions,
}: WorkshopsTableProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const isSystemAdmin = user?.role === "system_admin";

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-start p-4 font-semibold text-sm">
              {t("الاسم", "Name")}
            </th>
            <th className="text-start p-4 font-semibold text-sm">
              {t("الطبيب", "Doctor")}
            </th>
            <th className="text-start p-4 font-semibold text-sm">
              {t("التاريخ والوقت", "Date & Time")}
            </th>
            <th className="text-start p-4 font-semibold text-sm">
              {t("المقاعد", "Seats")}
            </th>
            <th className="text-start p-4 font-semibold text-sm">
              {t("السعر", "Price")}
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
          {workshops.map((w, i) => (
            <motion.tr
              key={w.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="border-t border-border hover:bg-muted/30 transition-colors"
            >
              <td className="p-4 font-medium text-sm max-w-[180px]">
                <span
                  className="cursor-pointer hover:text-primary transition-colors line-clamp-1"
                  onClick={() => onOpenView(w)}
                  title={w.title}
                >
                  {w.title || "—"}
                </span>
              </td>
              <td className="p-4 text-sm text-muted-foreground">
                {w.doctor_name || "—"}
              </td>
              <td className="p-4 text-sm text-muted-foreground">
                <div className="flex flex-col gap-0.5">
                  <span>{w.date || "—"}</span>
                  {w.time && (
                    <span className="text-xs opacity-70">{w.time}</span>
                  )}
                </div>
              </td>
              <td className="p-4 text-sm text-muted-foreground">
                {w.total_capacity ?? "—"}
              </td>
              <td className="p-4 text-sm">
                <div className="flex flex-col gap-0.5">
                  <span>
                    <span className="font-bold text-primary">
                      {w.regular_price ?? "—"}
                    </span>
                    <span className="text-muted-foreground text-xs ms-1">
                      SAR
                    </span>
                  </span>
                  {w.member_price !== undefined &&
                    w.member_price !== w.regular_price && (
                      <span className="text-xs text-muted-foreground">
                        {t("أعضاء", "Members")}: {w.member_price} SAR
                      </span>
                    )}
                </div>
              </td>
              <td className="p-4">
                <WorkshopStatusBadge status={w.status} />
              </td>
              <td className="p-4">
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                    onClick={() => onOpenView(w)}
                    title={t("عرض", "View")}
                  >
                    <GraduationCap className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-blue-500"
                    onClick={() => onOpenSubscriptions(w)}
                    title={t("الاشتراكات", "Subscriptions")}
                  >
                    <Users className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                    onClick={() => onOpenEdit(w)}
                    title={t("تعديل", "Edit")}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  {isSystemAdmin && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => onOpenDelete(w)}
                      title={t("حذف", "Delete")}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
