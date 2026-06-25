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
  Award,
  Calendar,
  Hash,
  Loader2,
  Trash2,
  User,
} from "lucide-react";

interface CertificateDeleteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selected: any | null;
  onDelete: () => void;
  isSaving: boolean;
}

export const CertificateDeleteModal = ({
  isOpen,
  onOpenChange,
  selected,
  onDelete,
  isSaving,
}: CertificateDeleteModalProps) => {
  const { t } = useLanguage();

  const formatDate = (date?: string) => (date ? date.split("T")[0] : "—");

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
              {t("تأكيد حذف الشهادة", "Delete Certificate Confirmation")}
            </DialogTitle>
            <DialogDescription className="text-red-100 mt-2">
              {t(
                "هذا الإجراء نهائي ولا يمكن التراجع عنه",
                "This action is permanent and cannot be undone",
              )}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* ───────── CERTIFICATE CARD ───────── */}
        <div className="p-6 space-y-5">
          {selected && (
            <div className="rounded-2xl border bg-muted/30 p-5 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      {t("نوع الشهادة", "Certificate Type")}
                    </p>
                    <h3 className="font-bold capitalize">
                      {selected.type || "attendance"}
                    </h3>
                  </div>
                </div>
                {selected.status && (
                  <span className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                    {selected.status}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                {(selected.recipient_name || selected.user?.name) && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {selected.recipient_name || selected.user?.name}
                  </div>
                )}
                {selected.serial_number && (
                  <div className="flex items-center gap-2 font-mono">
                    <Hash className="w-4 h-4" />
                    {selected.serial_number}
                  </div>
                )}
                {(selected.workshop_title || selected.workshop?.title) && (
                  <div className="col-span-2 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    {selected.workshop_title || selected.workshop?.title}
                  </div>
                )}
                {(selected.issue_date || selected.issued_at) && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selected.issue_date || selected.issued_at)}
                  </div>
                )}
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
                  "سيتم حذف الشهادة وجميع البيانات المرتبطة بها بشكل نهائي",
                  "This certificate and all related data will be permanently deleted",
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
