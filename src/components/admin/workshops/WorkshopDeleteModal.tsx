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
import { Workshop } from "@/types/workshop";
import {
  AlertTriangle,
  Calendar,
  Clock,
  Loader2,
  MapPin,
  Trash2,
  User,
  Users,
} from "lucide-react";

interface WorkshopDeleteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selected: any | null;
  onDelete: () => void;
  isSaving: boolean;
}

export const WorkshopDeleteModal = ({
  isOpen,
  onOpenChange,
  selected,
  onDelete,
  isSaving,
}: WorkshopDeleteModalProps) => {
  const { t } = useLanguage();

  const workshop = selected?.workshop;

  const formatDate = (date?: string) => (date ? date.split("T")[0] : "");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl overflow-hidden p-0 border border-red-200/30 rounded-[28px] shadow-2xl">
        {/* ───────── HEADER ───────── */}
        <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white p-6 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <DialogHeader className="relative">
            <DialogTitle className="flex items-center gap-3 text-2xl font-black">
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-300" />
              </div>

              {t("تأكيد حذف الورشة", "Delete Workshop Confirmation")}
            </DialogTitle>

            <DialogDescription className="text-red-100 mt-2">
              {t(
                "هذا الإجراء نهائي ولا يمكن التراجع عنه",
                "This action is permanent and cannot be undone"
              )}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* ───────── WORKSHOP CARD ───────── */}
        <div className="p-6 space-y-5">
          {/* Workshop Preview */}
          {workshop && (
            <div className="rounded-2xl border bg-muted/30 p-5 space-y-4">
              <div>
                <h3 className="text-lg font-bold leading-snug">
                  {workshop.title}
                </h3>

                {workshop.doctor_name && (
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {workshop.doctor_name}
                  </p>
                )}
              </div>

              {/* Meta grid */}
              <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                {workshop.date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(workshop.date)}
                  </div>
                )}

                {workshop.time && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {workshop.time}
                  </div>
                )}

                {workshop.location && (
                  <div className="col-span-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {workshop.location}
                  </div>
                )}

                {workshop.total_capacity && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Capacity: {workshop.total_capacity}
                  </div>
                )}
              </div>

              {/* Status chips */}
              <div className="flex gap-2 pt-2">
                <span className="px-3 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-600">
                  {selected?.status}
                </span>

                <span className="px-3 py-1 rounded-full text-xs bg-red-500/10 text-red-600">
                  {selected?.attendance}
                </span>
              </div>
            </div>
          )}

          {/* Warning Box */}
          <div className="rounded-2xl border border-red-200/40 bg-red-50 p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <p className="font-semibold text-red-700">
                {t("تحذير مهم", "Important Warning")}
              </p>
              <p className="text-sm text-red-600 mt-1">
                {t(
                  "سيتم حذف الورشة وجميع البيانات المرتبطة بها بشكل نهائي",
                  "This workshop and all related data will be permanently deleted"
                )}
              </p>
            </div>
          </div>
        </div>

        {/* ───────── FOOTER ───────── */}
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
            disabled={isSaving}
            className="gap-2 rounded-xl shadow-lg"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            {t("حذف نهائي", "Delete Permanently")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
