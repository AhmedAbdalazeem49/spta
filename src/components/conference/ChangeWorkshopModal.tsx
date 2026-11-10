import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  RefreshCw,
  Sun,
  Moon,
  Clock,
  User,
  CheckCircle2,
  AlertTriangle,
  ArrowRightLeft,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";
import { toast } from "sonner";

export interface WorkshopOption {
  code: string;
  title: string;
  title_ar?: string;
  title_en?: string;
  speaker: string;
  time: "morning" | "evening";
  slot: string;
}

export const ALL_WORKSHOPS: WorkshopOption[] = [
  // Morning (m1 - m5)
  {
    code: "m1",
    title: "Clinical Reasoning in Cervicothoracic Disorders",
    title_ar: "التفكير السريري في اضطرابات الفقرات العنقية والصدرية",
    speaker: "Dr. Terrence McGee",
    time: "morning",
    slot: "08:00 – 12:00",
  },
  {
    code: "m2",
    title: "Speaking Up in Elite Sport",
    title_ar: "التواصل والتأثير الفعال في رياضة النخبة",
    speaker: "Dr. Sian Knott",
    time: "morning",
    slot: "08:00 – 12:00",
  },
  {
    code: "m3",
    title: "From Rehabilitation to Performance: Integrating OPT",
    title_ar: "من التأهيل إلى الأداء العالي: دمج نموذج OPT",
    speaker: "Ms. Tahani AlMahdi",
    time: "morning",
    slot: "08:00 – 12:00",
  },
  {
    code: "m4",
    title: "Physiotherapy in Chronic Overlapping Pain Conditions",
    title_ar: "العلاج الطبيعي في حالات الألم المزمن المتداخل",
    speaker: "Dr. Aly Alatar",
    time: "morning",
    slot: "08:00 – 12:00",
  },
  {
    code: "m5",
    title: "A Practical Approach to Acute Vertigo and BPPV",
    title_ar: "المدخل العملي للتعامل مع الدوار الحاد والـ BPPV",
    speaker: "Dr. Doaa AlSharif",
    time: "morning",
    slot: "08:00 – 12:00",
  },
  // Evening (e1 - e5)
  {
    code: "e1",
    title: "Aquatic Therapy Beyond the Pool",
    title_ar: "العلاج المائي المتطور وتطبيقاته العلاجية",
    speaker: "Mr. Mohamed Zedan",
    time: "evening",
    slot: "13:00 – 17:00",
  },
  {
    code: "e2",
    title: "Using Musculoskeletal Ultrasound",
    title_ar: "استخدام السونار العضلي الهيكلي في التشخيص والتأهيل",
    speaker: "Mr. Jaffar Alabdrabalrasol",
    time: "evening",
    slot: "13:00 – 17:00",
  },
  {
    code: "e3",
    title: "From Physical Stimuli to Biological Adaptation",
    title_ar: "من المحفزات الميكانيكية إلى التكيف البيولوجي",
    speaker: "Dr. Philippe Germain",
    time: "evening",
    slot: "13:00 – 17:00",
  },
  {
    code: "e4",
    title: "Better Teams, Better Care",
    title_ar: "فرق العمل المتكاملة نحو رعاية صحية أفضل",
    speaker: "Ms. Halah Aldhuaian",
    time: "evening",
    slot: "13:00 – 17:00",
  },
  {
    code: "e5",
    title: "From Risk to Readiness",
    title_ar: "من تقييم المخاطر إلى الجاهزية الرياضية الكاملة",
    speaker: "Dr. Mohammed Alshehri",
    time: "evening",
    slot: "13:00 – 17:00",
  },
];

interface ChangeWorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWorkshopCode: string;
  userRegisteredWorkshops: string[]; // all codes user currently has (e.g. ['m3', 'e2'])
  onSuccess: (newCode: string) => void;
}

export function ChangeWorkshopModal({
  isOpen,
  onClose,
  currentWorkshopCode,
  userRegisteredWorkshops,
  onSuccess,
}: ChangeWorkshopModalProps) {
  const { t, isRTL } = useLanguage();
  const [selectedNewCode, setSelectedNewCode] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const currentInfo = ALL_WORKSHOPS.find((w) => w.code === currentWorkshopCode);
  const isMorning = currentInfo?.time === "morning";

  // Available options: same time slot (morning or evening), excluding current and excluding other registered
  const availableOptions = ALL_WORKSHOPS;

  const handleSelect = (code: string) => {
    if (code === currentWorkshopCode) return;
    if (userRegisteredWorkshops.includes(code)) return;
    setSelectedNewCode(code);
  };

  const handleConfirmSubmit = async () => {
    if (!selectedNewCode) return;
    setIsSubmitting(true);
    try {
      const res = await api.post("/conference/workshops/change", {
        old_workshop_code: currentWorkshopCode,
        new_workshop_code: selectedNewCode,
      });

      toast.success(res.data?.message || t("تم تغيير ورشة العمل بنجاح!", "Workshop changed successfully!"));
      onSuccess(selectedNewCode);
      setShowConfirm(false);
      onClose();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        t("حدث خطأ أثناء تغيير ورشة العمل", "Failed to change workshop");
      toast.error(msg);
      setShowConfirm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedNewInfo = ALL_WORKSHOPS.find((w) => w.code === selectedNewCode);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => !isSubmitting && onClose()}
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden z-10 border border-slate-100"
      >
        {/* Top colored accent line */}
        <div
          className={`h-2 w-full ${
            isMorning
              ? "bg-gradient-to-r from-[#55AE47] via-[#6FC4BC] to-[#11517E]"
              : "bg-gradient-to-r from-[#0e7490] via-[#6FC4BC] to-[#11517E]"
          }`}
        />

        {/* Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${
                isMorning
                  ? "bg-emerald-100 text-[#55AE47]"
                  : "bg-teal-100 text-[#0e7490]"
              }`}
            >
              <ArrowRightLeft className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                    isMorning
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-teal-50 text-teal-700 border border-teal-200"
                  }`}
                >
                  {isMorning ? (
                    <span className="flex items-center gap-1">
                      <Sun className="w-3 h-3 text-amber-500" />
                      {t("فترة صباحية", "Morning Slot")}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Moon className="w-3 h-3 text-indigo-500" />
                      {t("فترة مسائية", "Evening Slot")}
                    </span>
                  )}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {currentInfo?.slot}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                {t("تغيير ورشة العمل", "Change Workshop")}
              </h3>
            </div>
          </div>

          <button
            onClick={() => !isSubmitting && onClose()}
            disabled={isSubmitting}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Workshop Notice */}
        <div className="px-6 sm:px-8 py-3 bg-slate-50 border-b border-slate-100 flex items-start gap-3">
          <div className="text-xs text-slate-500 font-medium pt-0.5 shrink-0">
            {t("الورشة المسجلة حالياً:", "Currently Enrolled:")}
          </div>
          <div className="text-xs font-extrabold text-[#11517E] flex-1">
            {currentInfo?.title}
            <span className="text-slate-400 font-medium mr-2">
              — {currentInfo?.speaker}
            </span>
          </div>
        </div>

        {/* Workshop Options List */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-5 space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            {t(
              `اختر ورشة العمل البديلة من كافة الورش الصباحية والمسائية المتاحة:`,
              `Choose your alternative workshop from all available morning and evening options:`
            )}
          </p>

          {availableOptions.map((w) => {
            const isCurrent = w.code === currentWorkshopCode;
            const isOtherRegistered =
              !isCurrent && userRegisteredWorkshops.includes(w.code);
            const isSelected = selectedNewCode === w.code;

            return (
              <motion.div
                key={w.code}
                whileHover={!isCurrent && !isOtherRegistered ? { scale: 1.01 } : {}}
                whileTap={!isCurrent && !isOtherRegistered ? { scale: 0.99 } : {}}
                onClick={() => handleSelect(w.code)}
                className={`relative rounded-2xl p-4 border-2 transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#11517E] bg-blue-50/70 shadow-md ring-2 ring-[#11517E]/20"
                    : isCurrent
                    ? "border-emerald-200 bg-emerald-50/40 opacity-70 cursor-not-allowed"
                    : isOtherRegistered
                    ? "border-slate-200 bg-slate-100/70 opacity-60 cursor-not-allowed"
                    : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          w.time === "morning"
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-purple-100 text-purple-800 border border-purple-200"
                        }`}
                      >
                        {w.time === "morning" ? (
                          <>
                            <Sun className="w-3 h-3 text-amber-600" />
                            {t("صباحية (08:00 - 12:00)", "Morning (08:00 - 12:00)")}
                          </>
                        ) : (
                          <>
                            <Moon className="w-3 h-3 text-purple-600" />
                            {t("مسائية (13:00 - 17:00)", "Evening (13:00 - 17:00)")}
                          </>
                        )}
                      </span>

                      {isCurrent && (
                        <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {t("ورشتك الحالية", "Current Workshop")}
                        </span>
                      )}

                      {isOtherRegistered && (
                        <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                          {t("مسجل بها بالفعل", "Already Enrolled")}
                        </span>
                      )}
                    </div>

                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                      {w.title}
                    </h4>
                    {w.title_ar && (
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        {w.title_ar}
                      </p>
                    )}

                    <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
                      <User className="w-3.5 h-3.5 text-[#11517E]" />
                      <span className="font-semibold">{w.speaker}</span>
                    </div>
                  </div>

                  {/* Radio / Check indicator */}
                  <div className="shrink-0 mt-1">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? "border-[#11517E] bg-[#11517E] text-white shadow-sm"
                          : isCurrent
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isSelected || isCurrent ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : null}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="px-6 sm:px-8 py-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-600 hover:bg-slate-100 transition-colors text-sm"
          >
            {t("إلغاء", "Cancel")}
          </button>

          <button
            type="button"
            disabled={!selectedNewCode || isSubmitting}
            onClick={() => setShowConfirm(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#11517E] via-[#0E446B] to-[#55AE47] text-white font-extrabold text-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:shadow-none transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t("متابعة التغيير", "Proceed to Change")}</span>
          </button>
        </div>

        {/* Confirmation Modal Overlay */}
        <AnimatePresence>
          {showConfirm && selectedNewInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-30 flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center border border-slate-100 relative overflow-hidden"
              >
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8" />
                </div>

                <h4 className="text-xl font-black text-slate-900 mb-2">
                  {t("تأكيد استبدال ورشة العمل؟", "Confirm Workshop Change?")}
                </h4>

                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {t(
                    "أنت على وشك استبدال ورشة عملك الحالية بالورشة الجديدة المختارة:",
                    "You are about to switch your currently registered workshop:"
                  )}
                </p>

                {/* Old vs New Card */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-right space-y-3 mb-6 text-xs sm:text-sm">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-red-600 shrink-0">
                      {t("من:", "From:")}
                    </span>
                    <span className="text-slate-700 line-through font-semibold text-left">
                      {currentInfo?.title}
                    </span>
                  </div>

                  <div className="border-t border-slate-200" />

                  <div className="flex items-start gap-2">
                    <span className="font-bold text-emerald-600 shrink-0">
                      {t("إلى:", "To:")}
                    </span>
                    <span className="text-[#11517E] font-black">
                     {selectedNewInfo.title}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowConfirm(false)}
                    disabled={isSubmitting}
                    className="flex-1 py-3 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 transition-colors text-sm"
                  >
                    {t("تراجع", "Go Back")}
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirmSubmit}
                    disabled={isSubmitting}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#55AE47] to-[#11517E] text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{t("جارٍ التغيير...", "Updating...")}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{t("نعم، تأكيد التغيير", "Yes, Confirm")}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
