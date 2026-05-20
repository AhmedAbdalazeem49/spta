import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { Workshop } from "@/types/workshop";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  Clock,
  GraduationCap,
  Loader2,
  MapPin,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface RegistrationModalProps {
  open: boolean;
  onClose: () => void;
  workshop: Workshop | null;
  isMember: boolean;
  t: (ar: string, en: string) => string;
  isRTL: boolean;
  onSuccess: () => void;
}

export const RegistrationModal = ({
  open,
  onClose,
  workshop,
  isMember,
  t,
  isRTL,
  onSuccess,
}: RegistrationModalProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const basePrice = workshop
    ? parseFloat(String(isMember ? workshop.member_price : workshop.regular_price)) || 0
    : 0;

  const handleSubmit = async () => {
    if (!workshop) return;

    setIsSubmitting(true);

    try {
      onClose();

      navigate("/payment", {
        state: {
          type: "workshop",

          item: {
            key: workshop.id,

            // names
            nameEn: workshop.title,
            nameAr: workshop.title,

            // pricing
            price: basePrice,
            priceValue: basePrice,

            // workshop data
            workshop_id: workshop.id,
            workshop_title: workshop.title,
            workshop_date: workshop.date,
            workshop_time: workshop.time,
            workshop_location: workshop.location,

            // membership
            isMember,

            // useful flags
            isWorkshop: true,
          },
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!workshop) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="reg-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            key="reg-panel"
            initial={{ opacity: 0, scale: 0.94, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-md rounded-3xl overflow-hidden shadow-2xl bg-background border border-border/40 flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gradient header */}
              <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/75 px-6 pt-6 pb-5 shrink-0">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.5'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/70 text-[11px] font-medium uppercase tracking-wider mb-0.5">
                        {t("التسجيل في الورشة", "Workshop Registration")}
                      </p>
                      <h2 className="text-white font-bold text-sm leading-snug line-clamp-2">
                        {workshop.title}
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-7 h-7 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors shrink-0 mt-0.5"
                  >
                    <XCircle className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Workshop quick info */}
                <div className="relative mt-4 grid grid-cols-3 gap-2">
                  {[
                    {
                      icon: <Calendar className="w-3 h-3" />,
                      value: new Date(workshop.date).toLocaleDateString(
                        isRTL ? "ar-SA" : "en-US",
                        { month: "short", day: "numeric" }
                      ),
                    },
                    {
                      icon: <Clock className="w-3 h-3" />,
                      value: workshop.time?.slice(0, 5),
                    },
                    {
                      icon: <MapPin className="w-3 h-3" />,
                      value: workshop.location,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white/10 rounded-xl px-2.5 py-2 flex items-center gap-1.5 text-white/90 min-w-0"
                    >
                      <span className="shrink-0 opacity-70">{item.icon}</span>
                      <span className="text-[11px] font-medium truncate">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
                {/* Membership + price card */}
                <div className="rounded-2xl border border-border/60 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b border-border/40">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {t("حالة العضوية", "Membership")}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        isMember
                          ? "bg-emerald-500/15 text-emerald-600"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isMember
                        ? t("عضو نشط ✓", "Active Member ✓")
                        : t("غير عضو", "Non-Member")}
                    </span>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-[11px] text-muted-foreground">
                        {t("السعر الأساسي", "Base price")}
                      </p>
                      <p className="text-sm font-semibold">
                        {isMember
                          ? workshop.member_price
                          : workshop.regular_price}{" "}
                        {t("ر.س", "SAR")}
                      </p>
                    </div>
                    <div className="text-end">
                      <p className="text-[11px] text-muted-foreground">
                        {t("المبلغ النهائي", "Final amount")}
                      </p>
                      <p className="text-xl font-bold text-primary">
                        {basePrice <= 0 ? (
                          <span className="text-emerald-600">
                            {t("مجاني", "Free")}
                          </span>
                        ) : (
                          <>
                            {basePrice.toFixed(2)}{" "}
                            <span className="text-sm font-normal">
                              {t("ر.س", "SAR")}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t bg-muted/20 flex gap-2.5 shrink-0">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 h-10 rounded-xl text-xs"
                >
                  {t("إلغاء", "Cancel")}
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 h-10 rounded-xl text-xs font-semibold gap-1.5"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <CheckCircle className="w-3.5 h-3.5" />
                  )}
                  {isSubmitting
                    ? t("جاري التسجيل...", "Registering...")
                    : basePrice <= 0
                    ? t("تأكيد التسجيل", "Confirm Registration")
                    : t("التسجيل والدفع", "Register & Pay")}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
