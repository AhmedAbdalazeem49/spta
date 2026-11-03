import api from "@/services/api";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  BarChart3,
  Calendar,
  CheckCircle2,
  Loader2,
  Mail,
  QrCode,
  Search,
  Send,
  Star,
  UserCheck,
  Users,
  UserX,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

/* ─────────── Types ─────────── */
interface Participant {
  id: number;
  unique_code: string;
  user: {
    id: number;
    name: string;
    name_ar: string;
    email: string;
    phone: string;
    specialization: string;
  } | null;
  is_attended: boolean;
  day1_attended_at: string | null;
  day2_attended_at: string | null;
  qr_sent: boolean;
  has_reviewed: boolean;
  amount: string;
  created_at: string;
}

interface Stats {
  total: number;
  attended: number;
  not_attended: number;
  attendance_rate: number;
  day1_count: number;
  day2_count: number;
  qr_sent_count: number;
  reviewed_count: number;
}

/* ─────────── Stat Card ─────────── */
function StatCard({
  icon,
  label,
  value,
  sub,
  gradient,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  sub?: string;
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-5 text-white shadow-lg ${gradient} relative overflow-hidden`}
    >
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent)]" />
      <div className="flex items-start justify-between mb-3">
        <div className="bg-white/20 rounded-xl p-2.5">{icon}</div>
        {sub && (
          <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full">
            {sub}
          </span>
        )}
      </div>
      <div className="text-3xl font-black mb-1">{value}</div>
      <div className="text-sm font-medium opacity-85">{label}</div>
    </motion.div>
  );
}

/* ─────────── Boolean Pill ─────────── */
function BoolPill({
  value,
  trueLabel,
  falseLabel,
}: {
  value: boolean;
  trueLabel: string;
  falseLabel: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border
      ${
        value
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-red-50 text-red-600 border-red-200"
      }`}
    >
      {value ? (
        <CheckCircle2 className="w-3 h-3" />
      ) : (
        <XCircle className="w-3 h-3" />
      )}
      {value ? trueLabel : falseLabel}
    </span>
  );
}

/* ─────────── Send QR Modal ─────────── */
function SendQrModal({
  registrations,
  onClose,
  onSuccess,
}: {
  registrations: Participant[];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [confirming, setConfirming] = useState(false);
  const [sending, setSending] = useState(false);

  const candidates = useMemo(() => {
    const base = showAll
      ? registrations
      : registrations.filter((r) => !r.qr_sent);
    if (!search.trim()) return base;
    const q = search.toLowerCase();
    return base.filter(
      (r) =>
        r.user?.name.toLowerCase().includes(q) ||
        r.user?.email.toLowerCase().includes(q) ||
        r.unique_code.toLowerCase().includes(q),
    );
  }, [registrations, showAll, search]);

  const toggleAll = () =>
    setSelected(
      selected.length === candidates.length ? [] : candidates.map((r) => r.id),
    );

  const doSend = async () => {
    setSending(true);
    try {
      const res = await api.post("/admin/conference/send-attendance-qr", {
        registration_ids: selected,
      });
      toast.success(
        res.data?.message || `تم جدولة إرسال ${selected.length} إيميل بنجاح`,
      );
      onSuccess();
      onClose();
    } catch {
      toast.error("فشل الإرسال، يرجى المحاولة مجدداً");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 20 }}
        className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        <div className="h-1.5 bg-gradient-to-r from-[#11517E] via-[#6FC4BC] to-[#55AE47]" />
        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <Mail className="w-5 h-5 text-[#11517E]" />
            </div>
            <div>
              <h2 className="font-black text-lg text-slate-800 dark:text-white">
                إرسال بطاقات QR المؤتمر
              </h2>
              <p className="text-xs text-slate-500">
                اختر المشاركين لإرسال بطاقة الحضور الرسمية
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-3 border-b dark:border-slate-700 flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="بحث بالاسم أو الإيميل..."
              className="w-full pr-9 pl-3 py-2 text-sm rounded-xl border dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showAll}
              onChange={(e) => setShowAll(e.target.checked)}
              className="w-4 h-4 accent-[#11517E]"
            />
            <span className="text-slate-600 dark:text-slate-300">
              عرض من تم الإرسال إليهم أيضاً
            </span>
          </label>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500">
              {candidates.length} مشترك | محدد: {selected.length}
            </span>
            <button
              onClick={toggleAll}
              className="text-xs font-bold text-[#11517E] hover:underline"
            >
              {selected.length === candidates.length
                ? "إلغاء التحديد الكل"
                : "تحديد الكل"}
            </button>
          </div>
          <div className="space-y-2">
            {candidates.map((r) => (
              <label
                key={r.id}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all
                  ${
                    selected.includes(r.id)
                      ? "border-[#11517E] bg-blue-50 dark:bg-blue-950/30"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
                  }`}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(r.id)}
                  onChange={(e) =>
                    setSelected(
                      e.target.checked
                        ? [...selected, r.id]
                        : selected.filter((x) => x !== r.id),
                    )
                  }
                  className="w-4 h-4 accent-[#11517E]"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-slate-800 dark:text-white truncate">
                    {r.user?.name}
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {r.user?.email}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="font-mono text-xs bg-slate-100 dark:bg-slate-700 text-[#11517E] px-2 py-0.5 rounded-md">
                    {r.unique_code}
                  </span>
                  {r.qr_sent && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                      ✓ مُرسل
                    </span>
                  )}
                </div>
              </label>
            ))}
            {candidates.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <Mail className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-semibold">لا توجد نتائج</p>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 border-t dark:border-slate-700 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            إلغاء
          </button>
          <button
            disabled={selected.length === 0}
            onClick={() => setConfirming(true)}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#11517E] to-[#6FC4BC] text-white font-bold disabled:opacity-40 hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            إرسال للمحددين ({selected.length})
          </button>
        </div>

        <AnimatePresence>
          {confirming && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-3xl flex items-center justify-center p-8"
            >
              <div className="text-center max-w-sm">
                <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
                  <AlertTriangle className="w-10 h-10 text-amber-500" />
                </div>
                <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">
                  تأكيد الإرسال
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">
                  سيتم إرسال <strong>{selected.length} إيميل</strong> لبطاقة
                  حضور المؤتمر مع QR Code مخصص لكل مشترك.
                </p>
                <p className="text-amber-700 bg-amber-50 dark:bg-amber-900/20 rounded-xl px-4 py-2 text-sm mb-6 font-semibold">
                  ⏱️ فارق 30 ثانية بين كل إيميل وآخر للحفاظ على جودة التسليم.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirming(false)}
                    disabled={sending}
                    className="flex-1 py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    رجوع
                  </button>
                  <button
                    onClick={doSend}
                    disabled={sending}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#11517E] to-[#6FC4BC] text-white font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-60"
                  >
                    {sending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {sending ? "جارٍ الجدولة..." : "تأكيد الإرسال"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ─────────── Main Page ─────────── */
export default function AdminConferenceAttendancePage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats | null>(null);
  const [registrations, setRegistrations] = useState<Participant[]>([]);
  const [search, setSearch] = useState("");
  const [attendedFilter, setAttendedFilter] = useState<"all" | "yes" | "no">(
    "all",
  );
  const [dayFilter, setDayFilter] = useState<"all" | "day1" | "day2">("all");
  const [qrFilter, setQrFilter] = useState<"all" | "sent" | "not_sent">("all");
  const [sendModal, setSendModal] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/conference/attendance-stats");
      setStats(res.data.data.stats);
      setRegistrations(res.data.data.registrations);
    } catch {
      toast.error("فشل تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    return registrations.filter((r) => {
      const q = search.toLowerCase();
      if (
        q &&
        !r.user?.name.toLowerCase().includes(q) &&
        !r.user?.email.toLowerCase().includes(q) &&
        !r.unique_code.toLowerCase().includes(q)
      )
        return false;
      if (attendedFilter === "yes" && !r.is_attended) return false;
      if (attendedFilter === "no" && r.is_attended) return false;
      if (dayFilter === "day1" && !r.day1_attended_at) return false;
      if (dayFilter === "day2" && !r.day2_attended_at) return false;
      if (qrFilter === "sent" && !r.qr_sent) return false;
      if (qrFilter === "not_sent" && r.qr_sent) return false;
      return true;
    });
  }, [registrations, search, attendedFilter, dayFilter, qrFilter]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#11517E] mx-auto mb-3" />
          <p className="text-slate-500 font-semibold">
            جارٍ تحميل إحصائيات الحضور...
          </p>
        </div>
      </div>
    );

  return (
    <div className="p-6 space-y-6 min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
            <UserCheck className="w-7 h-7 text-[#11517E]" />
            حضور المؤتمر
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            المؤتمر السعودي الدولي السادس للعلاج الطبيعي – 12/13 نوفمبر 2026
          </p>
        </div>
        <button
          onClick={() => setSendModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#11517E] to-[#6FC4BC] text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          <Mail className="w-4 h-4" />
          إرسال بطاقات QR المؤتمر
        </button>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<Users className="w-5 h-5" />}
            label="إجمالي المسجلين"
            value={stats.total}
            gradient="bg-gradient-to-br from-[#11517E] to-[#1e6fa8]"
          />
          <StatCard
            icon={<UserCheck className="w-5 h-5" />}
            label="إجمالي الحضور"
            value={stats.attended}
            sub={`${stats.attendance_rate}%`}
            gradient="bg-gradient-to-br from-[#55AE47] to-[#3d9234]"
          />
          <StatCard
            icon={<Calendar className="w-5 h-5" />}
            label="اليوم الأول – 12 نوفمبر"
            value={stats.day1_count}
            gradient="bg-gradient-to-br from-[#6FC4BC] to-[#4da8a0]"
          />
          <StatCard
            icon={<Calendar className="w-5 h-5" />}
            label="اليوم الثاني – 13 نوفمبر"
            value={stats.day2_count}
            gradient="bg-gradient-to-br from-[#0e7490] to-[#0c5a72]"
          />
          <StatCard
            icon={<QrCode className="w-5 h-5" />}
            label="تم إرسال QR"
            value={stats.qr_sent_count}
            gradient="bg-gradient-to-br from-purple-600 to-purple-800"
          />
          <StatCard
            icon={<Star className="w-5 h-5" />}
            label="أجرى التقييم"
            value={stats.reviewed_count}
            gradient="bg-gradient-to-br from-amber-500 to-orange-600"
          />
          <StatCard
            icon={<UserX className="w-5 h-5" />}
            label="لم يحضر بعد"
            value={stats.not_attended}
            gradient="bg-gradient-to-br from-red-500 to-rose-600"
          />
          <StatCard
            icon={<BarChart3 className="w-5 h-5" />}
            label="نسبة الحضور"
            value={`${stats.attendance_rate}%`}
            gradient="bg-gradient-to-br from-indigo-600 to-blue-700"
          />
        </div>
      )}

      {/* Attendance Rate Bar */}
      {stats && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-slate-700 dark:text-slate-200">
              نسبة الحضور الكلية للمؤتمر
            </span>
            <span className="font-black text-[#11517E] dark:text-[#6FC4BC] text-lg">
              {stats.attendance_rate}%
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stats.attendance_rate}%` }}
              transition={{ duration: 1.3, ease: "easeOut" }}
              className="h-4 rounded-full bg-gradient-to-r from-[#11517E] via-[#6FC4BC] to-[#55AE47]"
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-400">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث بالاسم، البريد، أو الكود..."
            className="w-full pr-9 pl-3 py-2 text-sm rounded-xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
        {[
          {
            val: attendedFilter,
            set: setAttendedFilter,
            opts: [
              ["all", "الكل"],
              ["yes", "حضر ✓"],
              ["no", "لم يحضر"],
            ],
          },
          {
            val: dayFilter,
            set: setDayFilter,
            opts: [
              ["all", "كل الأيام"],
              ["day1", "اليوم الأول فقط"],
              ["day2", "اليوم الثاني فقط"],
            ],
          },
          {
            val: qrFilter,
            set: setQrFilter,
            opts: [
              ["all", "QR: الكل"],
              ["sent", "تم الإرسال"],
              ["not_sent", "لم يُرسل"],
            ],
          },
        ].map(({ val, set, opts }, i) => (
          <select
            key={i}
            value={val}
            onChange={(e) => (set as (v: string) => void)(e.target.value)}
            className="px-3 py-2 text-sm rounded-xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
          >
            {opts.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        ))}
        <span className="text-xs text-slate-400 font-semibold bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-xl">
          {filtered.length} نتيجة
        </span>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-[#11517E] to-[#6FC4BC] text-white">
                {[
                  "#",
                  "الاسم",
                  "البريد",
                  "الكود",
                  "حضر",
                  "اليوم 1",
                  "اليوم 2",
                  "QR",
                  "قيّم",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-right font-bold whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-slate-400">
                    <UserX className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="font-semibold">لا توجد نتائج مطابقة</p>
                  </td>
                </tr>
              ) : (
                filtered.map((r, i) => (
                  <tr
                    key={r.id}
                    className={`border-b dark:border-slate-700 hover:bg-blue-50/30 dark:hover:bg-slate-700/30 transition-colors
                    ${i % 2 === 0 ? "" : "bg-slate-50/50 dark:bg-slate-800/40"}`}
                  >
                    <td className="px-4 py-3 font-bold text-slate-400 text-xs">
                      {i + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-800 dark:text-white whitespace-nowrap">
                        {r.user?.name}
                      </div>
                      <div className="text-xs text-slate-400 truncate max-w-[160px]">
                        {r.user?.specialization}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs whitespace-nowrap">
                      {r.user?.email}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono font-black text-[#11517E] dark:text-[#6FC4BC] bg-blue-50 dark:bg-blue-950/30 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap">
                        {r.unique_code}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <BoolPill
                        value={r.is_attended}
                        trueLabel="حضر"
                        falseLabel="غائب"
                      />
                    </td>
                    <td className="px-4 py-3 text-center text-xs whitespace-nowrap">
                      {r.day1_attended_at ? (
                        <span className="text-green-600 font-bold">
                          {new Date(r.day1_attended_at).toLocaleTimeString(
                            "ar-SA",
                            { hour: "2-digit", minute: "2-digit" },
                          )}
                        </span>
                      ) : (
                        <span className="text-slate-300 dark:text-slate-600">
                          —
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-xs whitespace-nowrap">
                      {r.day2_attended_at ? (
                        <span className="text-green-600 font-bold">
                          {new Date(r.day2_attended_at).toLocaleTimeString(
                            "ar-SA",
                            { hour: "2-digit", minute: "2-digit" },
                          )}
                        </span>
                      ) : (
                        <span className="text-slate-300 dark:text-slate-600">
                          —
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <BoolPill
                        value={r.qr_sent}
                        trueLabel="مُرسل"
                        falseLabel="لم يُرسل"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <BoolPill
                        value={r.has_reviewed}
                        trueLabel="قيّم"
                        falseLabel="لم يقيّم"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Send QR Modal */}
      <AnimatePresence>
        {sendModal && (
          <SendQrModal
            registrations={registrations}
            onClose={() => setSendModal(false)}
            onSuccess={fetchData}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
