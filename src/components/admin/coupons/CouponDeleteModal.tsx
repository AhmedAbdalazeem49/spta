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
import { Coupon } from "@/types/coupon";
import { AlertTriangle, Trash2, ShieldAlert } from "lucide-react";

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
      <DialogContent className="sm:max-w-lg overflow-hidden p-0 rounded-2xl">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-red-600/10 via-red-500/5 to-transparent p-6 border-b">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-red-600 text-xl font-bold">
              <div className="p-2 rounded-xl bg-red-100 dark:bg-red-900/30">
                <Trash2 className="w-5 h-5" />
              </div>
              {t("حذف كود الخصم", "Delete Coupon Code")}
            </DialogTitle>

            <DialogDescription className="mt-2 text-muted-foreground flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 mt-0.5 text-red-500" />
              {t(
                "هذا الإجراء نهائي ولا يمكن التراجع عنه. سيتم حذف الكود من جميع الأنظمة.",
                "This action is permanent and cannot be undone. The code will be removed from all systems."
              )}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-4">
          {selectedCoupon && (
            <>
              {/* CODE CARD */}
              <div className="relative overflow-hidden rounded-2xl border bg-muted/30 p-5 text-center">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent" />

                <p className="text-sm text-muted-foreground mb-2">
                  {t("كود الخصم", "Coupon Code")}
                </p>

                <p className="text-3xl font-mono font-black tracking-widest text-red-600">
                  {selectedCoupon.code}
                </p>

                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  {t(
                    "سيتم إزالته من جميع المستخدمين",
                    "Will be removed from all users"
                  )}
                </div>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border p-4 text-center bg-background">
                  <p className="text-2xl font-bold text-primary">
                    {selectedCoupon.usedCount}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("استخدامات", "Uses")}
                  </p>
                </div>

                <div className="rounded-xl border p-4 text-center bg-background">
                  <p className="text-2xl font-bold text-red-500">!</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("إجراء خطير", "High Risk Action")}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* FOOTER */}
        <DialogFooter className="p-6 border-t bg-muted/20 flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl"
          >
            {t("إلغاء", "Cancel")}
          </Button>

          <Button
            onClick={onDelete}
            className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 text-white gap-2 shadow-lg"
          >
            <Trash2 className="w-4 h-4" />
            {t("تأكيد الحذف", "Confirm Delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
