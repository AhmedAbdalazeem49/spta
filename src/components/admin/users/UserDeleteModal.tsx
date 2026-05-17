import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";

interface UserDeleteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  isDeleting: boolean;
}

export const UserDeleteModal = ({
  isOpen,
  onOpenChange,
  onDelete,
  isDeleting,
}: UserDeleteModalProps) => {
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
              "هل أنت متأكد من حذف هذا المستخدم؟",
              "Are you sure you want to delete this user?"
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
            disabled={isDeleting}
            className="gap-2"
          >
            {isDeleting ? (
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
