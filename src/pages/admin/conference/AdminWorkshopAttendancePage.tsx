import { useState, useEffect, useMemo } from "react";
import api from "@/services/api";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2, Search, Users, QrCode, CheckCircle2, XCircle,
  Send, X, AlertTriangle, UserCheck, Mail, BookOpen, Sun, Sunset
} from "lucide-react";

/* ─────────── Types ─────────── */
interface WorkshopParticipant {
  id: number;
  unique_code: string;
  user: { id: number; name: string; name_ar: string; email: string; phone: string; specialization: string } | null;
  is_attended: boolean;
  workshop_qr_sent: boolean;
}

interface WorkshopStat {
  code: string;
  title: string;
  speaker: string;
  time: string;
  slot: string;
  enrolled_count: number;
  attended_count: number;
  absent_count: number;
  attendance_rate: number;
  participants: WorkshopParticipant[];
}

interface Summary {
  total_enrolled_slots: number;
  total_attended_slots: number;
  overall_rate: number;
}

interface RegForModal {
  id: number;
  unique_code: string;
  user: { name: string; email: string } | null;
  workshop_qr_sent: boolean;
  selected_workshops: string[];
}

/* ─────────── Send Workshop QR Modal ─────────── */
function SendWorkshopQrModal({ registrations, onClose, onSuccess }: {
  registrations: RegForModal[]; onClose: () => void; onSuccess: () => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [confirming, setConfirming] = useState(false);
  const [sending, setSending] = useState(false);

  const candidates = useMemo(() => {
    const base = showAll ? registrations : registrations.filter(r => !r.workshop_qr_sent);
    if (!search.trim()) return base;
    const q = search.toLowerCase();
    return base.filter(r => r.user?.name.toLowerCase().includes(q) || r.user?.email.toLowerCase().includes(q) || r.unique_code.toLowerCase().includes(q));
  }, [registrations, showAll, search]);

  const toggleAll = () => setSelected(selected.length === candidates.length ? [] : candidates.map(r => r.id));

  const totalEmails = useMemo(() =>
    candidates.filter(r => selected.includes(r.id)).reduce((sum, r) => sum + (r.selected_workshops?.length ?? 0), 0),
    [candidates, selected]);

  const doSend = async () => {
    setSending(true);
    try {
      const res = await api.post("/admin/conference/send-workshop-qr", { registration_ids: selected });
      toast.success(res.data?.message || "تم جدولة الإرسال بنجاح");
      onSuccess();
      onClose();
    } catch {
      toast.error("فشل الإرسال");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 20 }}
        className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-[#0e7490] via-[#6FC4BC] to-[#55AE47]" />
        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#0e7490]" />
            </div>
            <div>
              <h2 className="font-black text-lg text-slate-800 dark:text-white">إرسال بطاقات QR الورش</h2>
              <p className="text-xs text-slate-500">كل مشترك يستلم إيميل منفصل لكل ورشة مسجل بها</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"><X className="w-5 h-5" /></button>
        </div>
        <div className="px-6 py-3 border-b dark:border-slate-700 flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث..."
              className="w-full pr-9 pl-3 py-2 text-sm rounded-xl border dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-teal-400 outline-none" />
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={showAll} onChange={e => setShowAll(e.target.checked)} className="w-4 h-4 accent-teal-600" />
            <span className="text-slate-600 dark:text-slate-300">عرض المُرسل إليهم أيضاً</span>
          </label>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500">{candidates.length} مشترك | محدد: {selected.length} | إجمالي الإيميلات: {totalEmails}</span>
            <button onClick={toggleAll} className="text-xs font-bold text-teal-600 hover:underline">
              {selected.length === candidates.length ? "إلغاء الكل" : "تحديد الكل"}
            </button>
          </div>
          <div className="space-y-2">
            {candidates.map(r => (
              <label key={r.id}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all
                  ${selected.includes(r.id) ? "border-teal-500 bg-teal-50 dark:bg-teal-950/30" : "border-slate-200 dark:border-slate-700 hover:border-slate-300"}`}>
                <input type="checkbox" checked={selected.includes(r.id)}
                  onChange={e => setSelected(e.target.checked ? [...selected, r.id] : selected.filter(x => x !== r.id))}
                  className="w-4 h-4 accent-teal-600" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-slate-800 dark:text-white truncate">{r.user?.name}</div>
                  <div className="text-xs text-slate-400 flex gap-1 flex-wrap mt-0.5">
                    {r.selected_workshops.map(ws => (
                      <span key={ws} className="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 px-1.5 py-0.5 rounded font-bold">{ws.toUpperCase()}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="font-mono text-xs bg-slate-100 dark:bg-slate-700 text-teal-700 px-2 py-0.5 rounded-md">{r.unique_code}</span>
                  {r.workshop_qr_sent && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">✓ مُرسل</span>}
                </div>
              </label>
            ))}
            {candidates.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-semibold">لا توجد نتائج</p>
              </div>
            )}
          </div>
        </div>
        <div className="px-6 py-4 border-t dark:border-slate-700 flex items-center justify-between gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors">إلغاء</button>
          <button disabled={selected.length === 0} onClick={() => setConfirming(true)}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0e7490] to-[#6FC4BC] text-white font-bold disabled:opacity-40 hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <Send className="w-4 h-4" />
            إرسال ({selected.length} مشترك / {totalEmails} إيميل)
          </button>
        </div>
        <AnimatePresence>
          {confirming && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-3xl flex items-center justify-center p-8">
              <div className="text-center max-w-sm">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <AlertTriangle className="w-10 h-10 text-amber-500" />
                </div>
                <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">تأكيد الإرسال</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">
                  سيتم إرسال <strong>{totalEmails} إيميل</strong> – كل مشترك يستلم إيميل منفصل لكل ورشة.
                </p>
                <p className="text-amber-700 bg-amber-50 rounded-xl px-4 py-2 text-sm mb-6 font-semibold">⏱️ فارق 30 ثانية بين كل إيميل.</p>
                <div className="flex gap-3">
                  <button onClick={() => setConfirming(false)} disabled={sending}
                    className="flex-1 py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors">رجوع</button>
                  <button onClick={doSend} disabled={sending}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#0e7490] to-[#6FC4BC] text-white font-bold flex items-center justify-center gap-2 disabled:opacity-60">
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
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

/* ─────────── Workshop Card ─────────── */
function WorkshopCard({ ws, selected, onClick }: { ws: WorkshopStat; selected: boolean; onClick: () => void }) {
  const isMorning = ws.slot === "morning";
  return (
    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onClick}
      className={`text-right w-full rounded-2xl p-4 border-2 transition-all shadow-sm
        ${selected
          ? isMorning ? "border-[#11517E] bg-blue-50 dark:bg-blue-950/30" : "border-[#0e7490] bg-teal-50 dark:bg-teal-950/30"
          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300"}`}>
      <div className="flex items-start justify-between mb-2">
        <span className={`text-xs font-black px-2 py-1 rounded-lg text-white ${isMorning ? "bg-[#11517E]" : "bg-[#0e7490]"}`}>
          {ws.code.toUpperCase()}
        </span>
        <span className={`flex items-center gap-1 text-xs font-bold ${isMorning ? "text-amber-600" : "text-teal-600"}`}>
          {isMorning ? <Sun className="w-3.5 h-3.5" /> : <Sunset className="w-3.5 h-3.5" />}
          {ws.time}
        </span>
      </div>
      <h3 className="font-bold text-slate-800 dark:text-white text-xs leading-tight mb-1 line-clamp-2">{ws.title}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{ws.speaker}</p>
      <div className="grid grid-cols-3 gap-1 mb-2">
        {[
          { label: "مسجل", val: ws.enrolled_count, color: "text-slate-600 dark:text-slate-300" },
          { label: "حضر", val: ws.attended_count, color: "text-green-600" },
          { label: "غائب", val: ws.absent_count, color: "text-red-500" },
        ].map(s => (
          <div key={s.label} className="text-center">
            <div className={`text-xl font-black ${s.color}`}>{s.val}</div>
            <div className="text-xs text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
        <motion.div initial={{ width: 0 }} animate={{ width: `${ws.attendance_rate}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-2 rounded-full ${isMorning ? "bg-[#11517E]" : "bg-[#0e7490]"}`} />
      </div>
      <div className="text-xs text-right mt-1 font-bold text-slate-500">{ws.attendance_rate}%</div>
    </motion.button>
  );
}

/* ─────────── Main Page ─────────── */
export default function AdminWorkshopAttendancePage() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [workshops, setWorkshops] = useState<WorkshopStat[]>([]);
  const [selectedWs, setSelectedWs] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sendModal, setSendModal] = useState(false);
  const [registrationsForModal, setRegistrationsForModal] = useState<RegForModal[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/conference/workshop-attendance-stats");
      setSummary(res.data.data.summary);
      const wsList: WorkshopStat[] = res.data.data.workshops;
      setWorkshops(wsList);
      if (wsList.length > 0 && !selectedWs) setSelectedWs(wsList[0].code);
    } catch {
      toast.error("فشل تحميل بيانات الورش");
    } finally {
      setLoading(false);
    }
  };

  const fetchRegistrationsForModal = async () => {
    try {
      const res = await api.get("/admin/conference-registrations");
      const regs = res.data.data ?? [];
      setRegistrationsForModal(
        regs
          .filter((r: any) => r.status === "paid" && Array.isArray(r.selected_workshops) && r.selected_workshops.length > 0)
          .map((r: any) => ({
            id: r.id,
            unique_code: `SPTA26-${r.user_id}`,
            user: r.user ? { name: r.user.name, email: r.user.email } : null,
            workshop_qr_sent: !!r.workshop_qr_sent,
            selected_workshops: r.selected_workshops ?? [],
          }))
      );
    } catch {
      toast.error("فشل تحميل قائمة المشتركين");
    }
  };

  useEffect(() => { fetchData(); }, []);

  const activeWs = useMemo(() => workshops.find(w => w.code === selectedWs), [workshops, selectedWs]);
  const filteredParticipants = useMemo(() => {
    if (!activeWs) return [];
    const q = search.toLowerCase();
    return activeWs.participants.filter(p =>
      !q || p.user?.name.toLowerCase().includes(q) || p.user?.email.toLowerCase().includes(q) || p.unique_code.toLowerCase().includes(q)
    );
  }, [activeWs, search]);

  const morning = workshops.filter(w => w.slot === "morning");
  const afternoon = workshops.filter(w => w.slot === "afternoon");

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#0e7490] mx-auto mb-3" />
        <p className="text-slate-500 font-semibold">جارٍ تحميل بيانات ورش العمل...</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6 min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-[#0e7490]" />
            ورش عمل المؤتمر
          </h1>
          <p className="text-slate-500 text-sm mt-1">تتبع حضور ورش العمل المصاحبة للمؤتمر – 14 نوفمبر 2026</p>
        </div>
        <button onClick={() => { fetchRegistrationsForModal(); setSendModal(true); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0e7490] to-[#6FC4BC] text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all">
          <Mail className="w-4 h-4" />
          إرسال بطاقات QR الورش
        </button>
      </div>

      {/* Summary */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <Users className="w-5 h-5" />, label: "إجمالي المقاعد المحجوزة", value: summary.total_enrolled_slots, grad: "bg-gradient-to-br from-[#11517E] to-[#1e6fa8]" },
            { icon: <UserCheck className="w-5 h-5" />, label: "إجمالي الحضور", value: summary.total_attended_slots, grad: "bg-gradient-to-br from-[#55AE47] to-[#3d9234]" },
            { icon: <QrCode className="w-5 h-5" />, label: "معدل الحضور الكلي", value: `${summary.overall_rate}%`, grad: "bg-gradient-to-br from-[#0e7490] to-[#0c5a72]" },
          ].map(s => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className={`${s.grad} rounded-2xl p-5 text-white shadow-lg relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent)]" />
              <div className="bg-white/20 rounded-xl p-2.5 inline-block mb-3">{s.icon}</div>
              <div className="text-3xl font-black mb-1">{s.value}</div>
              <div className="text-sm opacity-85">{s.label}</div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Morning Workshops */}
      <div>
        <h2 className="text-sm font-black text-[#11517E] dark:text-blue-300 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Sun className="w-4 h-4" /> ورش الفترة الصباحية – 08:00 إلى 12:00
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {morning.map(ws => <WorkshopCard key={ws.code} ws={ws} selected={selectedWs === ws.code} onClick={() => setSelectedWs(ws.code)} />)}
        </div>
      </div>

      {/* Afternoon Workshops */}
      <div>
        <h2 className="text-sm font-black text-[#0e7490] dark:text-teal-300 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Sunset className="w-4 h-4" /> ورش الفترة المسائية – 13:00 إلى 17:00
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {afternoon.map(ws => <WorkshopCard key={ws.code} ws={ws} selected={selectedWs === ws.code} onClick={() => setSelectedWs(ws.code)} />)}
        </div>
      </div>

      {/* Participants Table */}
      {activeWs && (
        <AnimatePresence mode="wait">
          <motion.div key={activeWs.code}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className={`px-6 py-4 border-b dark:border-slate-700
              ${activeWs.slot === "morning" ? "bg-gradient-to-r from-[#11517E]/10 to-transparent" : "bg-gradient-to-r from-[#0e7490]/10 to-transparent"}`}>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-black px-2 py-0.5 rounded text-white ${activeWs.slot === "morning" ? "bg-[#11517E]" : "bg-[#0e7490]"}`}>
                      {activeWs.code.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-500">{activeWs.time}</span>
                  </div>
                  <h3 className="font-black text-slate-800 dark:text-white">{activeWs.title}</h3>
                  <p className="text-sm text-slate-500">{activeWs.speaker}</p>
                </div>
                <div className="flex items-center gap-4 text-center">
                  {[
                    { val: activeWs.enrolled_count, label: "مسجل", col: "text-slate-700 dark:text-slate-200" },
                    { val: activeWs.attended_count, label: "حضر", col: "text-green-600" },
                    { val: activeWs.absent_count, label: "غائب", col: "text-red-500" },
                    { val: `${activeWs.attendance_rate}%`, label: "نسبة", col: "text-[#11517E] dark:text-[#6FC4BC]" },
                  ].map(s => (
                    <div key={s.label}>
                      <div className={`text-2xl font-black ${s.col}`}>{s.val}</div>
                      <div className="text-xs text-slate-400">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-3 border-b dark:border-slate-700">
              <div className="relative max-w-xs">
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث في المشاركين..."
                  className="w-full pr-9 pl-3 py-2 text-sm rounded-xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-teal-400 outline-none" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`text-white ${activeWs.slot === "morning" ? "bg-gradient-to-r from-[#11517E] to-[#6FC4BC]" : "bg-gradient-to-r from-[#0e7490] to-[#6FC4BC]"}`}>
                    {["#","الاسم","البريد","الكود","حضر الورشة","QR مُرسل"].map(h => (
                      <th key={h} className="px-4 py-3 text-right font-bold whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredParticipants.length === 0 ? (
                    <tr><td colSpan={6} className="py-14 text-center text-slate-400">
                      <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p className="font-semibold">لا توجد نتائج</p>
                    </td></tr>
                  ) : filteredParticipants.map((p, i) => (
                    <tr key={p.id} className={`border-b dark:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors
                      ${i % 2 === 0 ? "" : "bg-slate-50/30 dark:bg-slate-800/40"}`}>
                      <td className="px-4 py-3 text-slate-400 text-xs font-bold">{i + 1}</td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-800 dark:text-white whitespace-nowrap">{p.user?.name}</div>
                        <div className="text-xs text-slate-400 truncate max-w-[150px]">{p.user?.specialization}</div>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">{p.user?.email}</td>
                      <td className="px-4 py-3">
                        <span className={`font-mono font-black text-xs px-2.5 py-1 rounded-lg
                          ${activeWs.slot === "morning" ? "text-[#11517E] bg-blue-50 dark:bg-blue-950/30" : "text-[#0e7490] bg-teal-50 dark:bg-teal-950/30"}`}>
                          {p.unique_code}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border
                          ${p.is_attended ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-600 border-red-200"}`}>
                          {p.is_attended ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {p.is_attended ? "حضر" : "غائب"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border
                          ${p.workshop_qr_sent ? "bg-green-50 text-green-700 border-green-200" : "bg-slate-50 text-slate-500 border-slate-200"}`}>
                          {p.workshop_qr_sent ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {p.workshop_qr_sent ? "مُرسل" : "لم يُرسل"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Send Modal */}
      <AnimatePresence>
        {sendModal && (
          <SendWorkshopQrModal registrations={registrationsForModal} onClose={() => setSendModal(false)} onSuccess={fetchData} />
        )}
      </AnimatePresence>
    </div>
  );
}
