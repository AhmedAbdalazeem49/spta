import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Coupon } from "@/types/coupon";
import { Trash2 } from "lucide-react";

interface CouponDeleteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCoupon: Coupon | null;
  onDelete: () => void;
}

export const CouponDeleteModal = ({
  isOpen,
  onOpenChange,
  selectedCoupon,
  onDelete,
}: CouponDeleteModalProps) => {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="w-5 h-5" />
            {t("حذف الكود", "Delete Code")}
          </DialogTitle>
          <DialogDescription>
            {t(
              "هل أنت متأكد من حذف هذا الكود؟ لا يمكن التراجع عن هذا الإجراء.",
              "Are you sure you want to delete this code? This action cannot be undone."
            )}
          </DialogDescription>
        </DialogHeader>

        {selectedCoupon && (
          <div className="py-4">
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <p className="text-2xl font-mono font-bold text-destructive">
                {selectedCoupon.code}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedCoupon.usedCount} {t("استخدام مسجل", "recorded uses")}
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("إلغاء", "Cancel")}
          </Button>
          <Button onClick={onDelete} variant="destructive" className="gap-2">
            <Trash2 className="w-4 h-4" />
            {t("حذف", "Delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
