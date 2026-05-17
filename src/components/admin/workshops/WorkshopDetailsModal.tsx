import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Workshop } from "@/types/workshop";
import { Calendar, Clock, Edit, GraduationCap, MapPin, Stethoscope, Timer, Users, Wallet, X } from "lucide-react";
import { WorkshopStatusBadge } from "./WorkshopStatusBadge";

interface WorkshopDetailsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selected: Workshop | null;
  onOpenEdit: (w: Workshop) => void;
}

export const WorkshopDetailsModal = ({
  isOpen,
  onOpenChange,
  selected,
  onOpenEdit,
}: WorkshopDetailsModalProps) => {
  const { t } = useLanguage();

  if (!selected) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            {selected.title || t("تفاصيل الورشة", "Workshop Details")}
          </DialogTitle>
          <DialogDescription>
            {t("عرض تفاصيل الورشة كاملة", "Full workshop details")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Status badge */}
          <WorkshopStatusBadge status={selected.status} />

          {/* Description */}
          {selected.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {selected.description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/40">
              <Stethoscope className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("الطبيب", "Doctor")}
                </p>
                <p className="text-sm font-medium">
                  {selected.doctor_name || "—"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/40">
              <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("الموقع", "Location")}
                </p>
                <p className="text-sm font-medium">
                  {selected.location || "—"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/40">
              <Calendar className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("التاريخ", "Date")}
                </p>
                <p className="text-sm font-medium">{selected.date || "—"}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/40">
              <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("الوقت", "Time")}
                </p>
                <p className="text-sm font-medium">{selected.time || "—"}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/40">
              <Timer className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("المدة", "Duration")}
                </p>
                <p className="text-sm font-medium">
                  {selected.duration_minutes
                    ? `${selected.duration_minutes} ${t("دقيقة", "min")}`
                    : "—"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/40">
              <Users className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("السعة", "Capacity")}
                </p>
                <p className="text-sm font-medium">
                  {selected.total_capacity ?? "—"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/40">
              <Wallet className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("السعر", "Price")}
                </p>
                <p className="text-sm font-medium">
                  {selected.regular_price ?? "—"}{" "}
                  <span className="text-xs text-muted-foreground">SAR</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/40">
              <Wallet className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("سعر الأعضاء", "Member Price")}
                </p>
                <p className="text-sm font-medium">
                  {selected.member_price ?? "—"}{" "}
                  <span className="text-xs text-muted-foreground">SAR</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="w-4 h-4 me-1" />
            {t("إغلاق", "Close")}
          </Button>
          <Button
            onClick={() => {
              onOpenChange(false);
              onOpenEdit(selected);
            }}
            className="gap-2"
          >
            <Edit className="w-4 h-4" />
            {t("تعديل", "Edit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
