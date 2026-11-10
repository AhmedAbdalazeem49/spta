import React, { useState, useEffect, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Search,
  ArrowRightLeft,
  Sun,
  Moon,
  Clock,
  User,
  CheckCircle2,
  AlertTriangle,
  X,
  Filter,
  Sparkles,
  RefreshCw,
  SlidersHorizontal,
  Mail,
  Phone,
  Calendar,
  Layers,
} from "lucide-react";
import { ALL_WORKSHOPS, WorkshopOption } from "@/components/conference/ChangeWorkshopModal";

interface AttendeeRegistration {
  id: number;
  user_id: number;
  unique_code?: string;
  amount: string;
  status: string;
  selected_workshops: string[];
  attended_workshops: string[];
  is_attended: boolean;
  user?: {
    id: number;
    name: string;
    name_ar?: string;
    email: string;
    phone?: string;
    specialization?: string;
    employer?: string;
    user_type?: string;
  };
  created_at?: string;
}

const WORKSHOP_MAP: Record<string, WorkshopOption> = ALL_WORKSHOPS.reduce(
  (acc, w) => {
    acc[w.code] = w;
    return acc;
  },
  {} as Record<string, WorkshopOption>
);

export default function AdminChangeWorkshopsPage() {
  const { t, isRTL } = useLanguage();
  const [registrations, setRegistrations] = useState<AttendeeRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [periodFilter, setPeriodFilter] = useState<"all" | "morning" | "evening" | "both">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "pending">("paid");

  // Changing workshop modal state
  const [activeReg, setActiveReg] = useState<AttendeeRegistration | null>(null);
  const [slotToChange, setSlotToChange] = useState<"morning" | "evening" | null>(null);
  const [currentWorkshopCode, setCurrentWorkshopCode] = useState<string>("");
  const [selectedNewCode, setSelectedNewCode] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Fetch registrations
  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/conference-registrations");
      const list = res.data?.data || res.data || [];
      setRegistrations(Array.isArray(list) ? list : []);
    } catch (err: any) {
      console.error(err);
      toast.error(t("فشل في تحميل المشتركين", "Failed to load attendees"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Filtered list
  const filtered = useMemo(() => {
    return registrations.filter((reg) => {
      // Must have selected workshops (or we can show all, but changing applies to workshop registrants)
      const hasWorkshops = (reg.selected_workshops || []).length > 0;
      if (!hasWorkshops) return false;

      // Status filter
      if (statusFilter !== "all" && reg.status !== statusFilter) return false;

      // Period filter
      if (periodFilter !== "all") {
        const hasMorning = (reg.selected_workshops || []).some(
          (code) => WORKSHOP_MAP[code]?.time === "morning"
        );
        const hasEvening = (reg.selected_workshops || []).some(
          (code) => WORKSHOP_MAP[code]?.time === "evening"
        );

        if (periodFilter === "morning" && !hasMorning) return false;
        if (periodFilter === "evening" && !hasEvening) return false;
        if (periodFilter === "both" && (!hasMorning || !hasEvening)) return false;
      }

      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase();
        const name = (reg.user?.name || "").toLowerCase();
        const nameAr = (reg.user?.name_ar || "").toLowerCase();
        const email = (reg.user?.email || "").toLowerCase();
        const phone = (reg.user?.phone || "").toLowerCase();
        const code = (reg.unique_code || `spta26-${reg.user_id}`).toLowerCase();

        return (
          name.includes(q) ||
          nameAr.includes(q) ||
          email.includes(q) ||
          phone.includes(q) ||
          code.includes(q)
        );
      }

      return true;
    });
  }, [registrations, search, periodFilter, statusFilter]);

  // Open change modal
  const openChangeModal = (
    reg: AttendeeRegistration,
    period: "morning" | "evening",
    currentCode: string
  ) => {
    setActiveReg(reg);
    setSlotToChange(period);
    setCurrentWorkshopCode(currentCode);
    setSelectedNewCode("");
    setShowConfirmModal(false);
  };

  // Close modal
  const closeModal = () => {
    setActiveReg(null);
    setSlotToChange(null);
    setCurrentWorkshopCode("");
    setSelectedNewCode("");
    setShowConfirmModal(false);
  };

  // Submit change
  const handleConfirmChange = async () => {
    if (!activeReg || !currentWorkshopCode || !selectedNewCode) return;

    setSubmitting(true);
    try {
      const res = await api.post("/admin/conference-registrations/change-workshop", {
        registration_id: activeReg.id,
        old_workshop_code: currentWorkshopCode,
        new_workshop_code: selectedNewCode,
      });

      if (res.data?.success) {
        toast.success(
          t(
            "تم تغيير ورشة العمل للمشترك بنجاح!",
            "Workshop successfully changed for attendee!"
          )
        );
        closeModal();
        // Refetch immediately
        await fetchRegistrations();
      } else {
        toast.error(res.data?.message || t("حدث خطأ أثناء التغيير", "Error changing workshop"));
      }
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          t("فشل في استبدال الورشة", "Failed to change workshop")
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Available options for current modal
  const availableOptions = ALL_WORKSHOPS;

  const currentMeta = WORKSHOP_MAP[currentWorkshopCode];
  const selectedNewMeta = WORKSHOP_MAP[selectedNewCode];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 mx-auto" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#11517E] to-[#6FC4BC] flex items-center justify-center text-white shadow-lg shadow-[#11517E]/20">
              <ArrowRightLeft className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                {t("تغيير ورش العمل للمشتركين", "Change Attendee Workshops")}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t(
                  "إدارة واستبدال الورش الصباحية والمسائية لمشتركي المؤتمر بكل سهولة وسرعة",
                  "Manage and switch morning & evening workshops for attendees effortlessly"
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <button
            onClick={fetchRegistrations}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-sm transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>{t("تحديث البيانات", "Refresh")}</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-[#11517E] dark:text-blue-400 flex items-center justify-center font-black">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold">{t("إجمالي المسجلين في الورش", "Total Workshop Attendees")}</div>
            <div className="text-2xl font-black text-slate-800 dark:text-white">
              {registrations.filter((r) => (r.selected_workshops || []).length > 0).length}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black">
            <Sun className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold">{t("مسجلو الفترة الصباحية", "Morning Attendees")}</div>
            <div className="text-2xl font-black text-slate-800 dark:text-white">
              {
                registrations.filter((r) =>
                  (r.selected_workshops || []).some(
                    (w) => WORKSHOP_MAP[w]?.time === "morning"
                  )
                ).length
              }
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black">
            <Moon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold">{t("مسجلو الفترة المسائية", "Evening Attendees")}</div>
            <div className="text-2xl font-black text-slate-800 dark:text-white">
              {
                registrations.filter((r) =>
                  (r.selected_workshops || []).some(
                    (w) => WORKSHOP_MAP[w]?.time === "evening"
                  )
                ).length
              }
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold">{t("مسجلون بالفترتين معاً", "Both Morning & Evening")}</div>
            <div className="text-2xl font-black text-slate-800 dark:text-white">
              {
                registrations.filter((r) => {
                  const ws = r.selected_workshops || [];
                  const hasM = ws.some((w) => WORKSHOP_MAP[w]?.time === "morning");
                  const hasE = ws.some((w) => WORKSHOP_MAP[w]?.time === "evening");
                  return hasM && hasE;
                }).length
              }
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-3.5 text-slate-400" />
            <input
              type="text"
              placeholder={t(
                "بحث بالاسم، البريد الإلكتروني، رقم الجوال، أو كود المشترك...",
                "Search by name, email, phone, or attendee code..."
              )}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-11 pl-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#11517E] text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {/* Period filter */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl shrink-0">
              {(
                [
                  { id: "all", label: "الكل" },
                  { id: "morning", label: "صباحي" },
                  { id: "evening", label: "مسائي" },
                  { id: "both", label: "الفترتين" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPeriodFilter(tab.id)}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition-all ${
                    periodFilter === tab.id
                      ? "bg-white dark:bg-slate-900 text-[#11517E] dark:text-teal-400 shadow-sm"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Payment filter */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl shrink-0">
              {(
                [
                  { id: "all", label: "كافة الحالات" },
                  { id: "paid", label: "مسدد (Paid)" },
                  { id: "pending", label: "معلق (Pending)" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition-all ${
                    statusFilter === tab.id
                      ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-[#11517E]" />
            <p className="text-sm font-bold text-slate-500">{t("جاري تحميل بيانات المشتركين...", "Loading attendees...")}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Layers className="w-8 h-8" />
            </div>
            <p className="text-base font-bold text-slate-700 dark:text-slate-300">
              {t("لا يوجد مشتركون مطابقون للبحث", "No matching attendees found")}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {t("جرّب تغيير كلمات البحث أو الفلاتر المطبقة أعلاه", "Try modifying search or filter criteria")}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <th className="px-6 py-4">{t("المشترك", "Attendee")}</th>
               
                  <th className="px-6 py-4">{t("حالة السداد", "Payment")}</th>
                  <th className="px-6 py-4 text-center">{t("الورشة الصباحية (08:00 - 12:00)", "Morning Workshop")}</th>
                  <th className="px-6 py-4 text-center">{t("الورشة المسائية (13:00 - 17:00)", "Evening Workshop")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {filtered.map((reg) => {
                  const ws = reg.selected_workshops || [];
                  const morningCode = ws.find((c) => WORKSHOP_MAP[c]?.time === "morning");
                  const eveningCode = ws.find((c) => WORKSHOP_MAP[c]?.time === "evening");

                  const morningMeta = morningCode ? WORKSHOP_MAP[morningCode] : null;
                  const eveningMeta = eveningCode ? WORKSHOP_MAP[eveningCode] : null;

                  return (
                    <tr
                      key={reg.id}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Attendee */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#11517E] to-[#6FC4BC] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                            {reg.user?.name?.[0]?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                              <span>{reg.user?.name_ar || reg.user?.name}</span>
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-300">
                                {reg.unique_code || `SPTA26-${reg.user_id}`}
                              </span>
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" /> {reg.user?.email}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>



                      {/* Payment */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                            reg.status === "paid"
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                              : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${reg.status === "paid" ? "bg-emerald-500" : "bg-amber-500"}`} />
                          {reg.status === "paid" ? t("مسدد", "Paid") : t("معلق", "Pending")}
                        </span>
                      </td>

                      {/* Morning Workshop Slot */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-center justify-center min-w-[240px]">
                          {morningCode && morningMeta ? (
                            <div className="w-full bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 p-3 rounded-2xl flex items-center justify-between gap-3">
                              <div className="text-right">
                                <div className="flex items-center gap-1.5">
                                  
                                  <span className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                                    {morningMeta.title_en || morningMeta.title}
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                                  <span>{morningMeta.speaker}</span>
                                </div>
                              </div>

                              <button
                                onClick={() => openChangeModal(reg, "morning", morningCode)}
                                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-sm active:scale-95 hover:shadow-md"
                                title={t("تغيير الورشة الصباحية", "Change Morning Workshop")}
                              >
                                <ArrowRightLeft className="w-3.5 h-3.5" />
                                <span>{t("تغيير", "Change")}</span>
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400 italic">
                              {t("غير مسجل في الصباحية", "Not enrolled in morning")}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Evening Workshop Slot */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-center justify-center min-w-[240px]">
                          {eveningCode && eveningMeta ? (
                            <div className="w-full bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-800/40 p-3 rounded-2xl flex items-center justify-between gap-3">
                              <div className="text-right">
                                <div className="flex items-center gap-1.5">
                                 
                                  <span className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                                    {eveningMeta.title_en || eveningMeta.title}
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                                  <span>{eveningMeta.speaker}</span>
                                </div>
                              </div>

                              <button
                                onClick={() => openChangeModal(reg, "evening", eveningCode)}
                                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95 hover:shadow-md"
                                title={t("تغيير الورشة المسائية", "Change Evening Workshop")}
                              >
                                <ArrowRightLeft className="w-3.5 h-3.5" />
                                <span>{t("تغيير", "Change")}</span>
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400 italic">
                              {t("غير مسجل في المسائية", "Not enrolled in evening")}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Change Workshop Modal */}
      <AnimatePresence>
        {activeReg && slotToChange && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${
                      slotToChange === "morning"
                        ? "bg-gradient-to-tr from-amber-500 to-orange-400 shadow-amber-500/30"
                        : "bg-gradient-to-tr from-purple-600 to-indigo-500 shadow-purple-600/30"
                    } shadow-lg`}
                  >
                    {slotToChange === "morning" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      {t("تغيير ورشة العمل للمشترك", "Change Workshop for Attendee")}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {activeReg.user?.name_ar || activeReg.user?.name} (
                      {activeReg.unique_code || `SPTA26-${activeReg.user_id}`})
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeModal}
                  disabled={submitting}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-5 flex-1">
                {/* Current Workshop Preview */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {t("الورشة الحالية المسجلة", "Current Registered Workshop")}
                  </div>
                  {currentMeta ? (
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          
                          <span className="font-bold text-sm text-slate-800 dark:text-white">
                            {currentMeta.title_en || currentMeta.title}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {currentMeta.speaker} • {currentMeta.slot}
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-bold shrink-0">
                        {t("الحالية", "Current")}
                      </span>
                    </div>
                  ) : null}
                </div>

                {/* New Workshop Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-3">
                    {t(
                      `اختر الورشة البديلة من كافة الورش المتاحة (الصباحية أو المسائية):`,
                      `Select substitute workshop from all available options (Morning or Evening):`
                    )}
                  </label>

                  <div className="space-y-2.5">
                    {availableOptions.map((w) => {
                      const isCurrent = w.code === currentWorkshopCode;
                      const isAlreadyEnrolled =
                        (activeReg.selected_workshops || []).includes(w.code) && !isCurrent;
                      const isSelected = w.code === selectedNewCode;

                      return (
                        <div
                          key={w.code}
                          onClick={() => {
                            if (!isCurrent && !isAlreadyEnrolled && !submitting) {
                              setSelectedNewCode(w.code);
                            }
                          }}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                            isCurrent
                              ? "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800"
                              : isAlreadyEnrolled
                              ? "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800"
                              : isSelected
                              ? "bg-[#11517E]/5 dark:bg-[#6FC4BC]/10 border-[#11517E] dark:border-[#6FC4BC] ring-2 ring-[#11517E]/20"
                              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? "border-[#11517E] bg-[#11517E] text-white"
                                    : "border-slate-300 dark:border-slate-600"
                                }`}
                              >
                                {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1 ${
                                      w.time === "morning"
                                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400"
                                        : "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-400"
                                    }`}
                                  >
                                    {w.time === "morning" ? t("صباحية", "Morning") : t("مسائية", "Evening")}
                                  </span>
                                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                                    {w.title_en || w.title}
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                                  {w.speaker} • {w.slot}
                                </div>
                              </div>
                            </div>

                            {isCurrent ? (
                              <span className="text-[10px] font-bold text-slate-400">
                                {t("الورشة الحالية", "Current")}
                              </span>
                            ) : isAlreadyEnrolled ? (
                              <span className="text-[10px] font-bold text-amber-500">
                                {t("مسجل بها مسبقاً", "Already enrolled")}
                              </span>
                            ) : isSelected ? (
                              <span className="text-[10px] font-bold text-[#11517E] dark:text-[#6FC4BC]">
                                {t("مختارة", "Selected")}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {t("إلغاء", "Cancel")}
                </button>

                <button
                  type="button"
                  disabled={!selectedNewCode || submitting}
                  onClick={() => setShowConfirmModal(true)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#11517E] hover:bg-[#0c3c5f] text-white font-bold text-xs shadow-md shadow-[#11517E]/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg active:scale-95"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowRightLeft className="w-4 h-4" />
                  )}
                  <span>{t("متابعة التغيير", "Proceed to Change")}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Sub-Modal */}
      <AnimatePresence>
        {showConfirmModal && activeReg && currentMeta && selectedNewMeta && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl text-center space-y-5"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
                <AlertTriangle className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white">
                  {t("تأكيد استبدال ورشة العمل؟", "Confirm Workshop Change?")}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t(
                    `هل أنت متأكد من تغيير ورشة المشترك (${activeReg.user?.name_ar || activeReg.user?.name})؟`,
                    `Are you sure you want to change workshop for attendee (${activeReg.user?.name})?`
                  )}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-right space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold">{t("من الورشة:", "From:")} </span>
                  <span className="font-bold text-red-500 line-through">
                    {currentMeta.title_en || currentMeta.title}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">{t("إلى الورشة:", "To:")} </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedNewMeta.title_en || selectedNewMeta.title}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {t("تراجع", "Go Back")}
                </button>

                <button
                  type="button"
                  onClick={handleConfirmChange}
                  disabled={submitting}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#11517E] hover:bg-[#0c3c5f] text-white font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{t("نعم، اعتمد التغيير", "Yes, Confirm Change")}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
