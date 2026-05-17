import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Workshop } from "@/types/workshop";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";

interface WorkshopDeleteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selected: Workshop | null;
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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            {t("تأكيد الحذف", "Confirm Delete")}
          </DialogTitle>
          <DialogDescription>
            {t(
              `هل أنت متأكد من حذف "${selected?.title}"؟ لا يمكن التراجع عن هذا الإجراء.`,
              `Are you sure you want to delete "${selected?.title}"? This action cannot be undone.`
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("إلغاء", "Cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={isSaving}
            className="gap-2"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            {t("حذف", "Delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
