import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2, Search, Ticket, Trash2, Filter, Users,
  CreditCard, CheckCircle2, Clock, AlertTriangle, X,
  QrCode, Award, BookOpen, ShieldCheck
} from "lucide-react";

const WORKSHOP_LABELS: Record<string, string> = {
  m1: "Clinical Reasoning", m2: "Speaking Up in Elite Sport",
  m3: "Rehab to Performance", m4: "Chronic Pain", m5: "Acute Vertigo",
  e1: "Aquatic Therapy", e2: "MSK Ultrasound",
  e3: "Physical Stimuli", e4: "Better Teams", e5: "Risk to Readiness",
};

function StatusPill({
  value, trueLabel, falseLabel, trueColor, falseColor,
  onClick, loading
}: {
  value: boolean; trueLabel: string; falseLabel: string;
  trueColor: string; falseColor: string;
  onClick: () => void; loading: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95 ${value ? trueColor : falseColor}`}
    >
      {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
      {value ? trueLabel : falseLabel}
    </button>
  );
}

function DeleteModal({ reg, onClose, onConfirm, loading }: {
  reg: any; onClose: () => void; onConfirm: () => void; loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        {/* Red top bar */}
        <div className="h-2 bg-gradient-to-r from-red-500 via-rose-600 to-red-700" />

        <div className="p-8 text-center">
          {/* Pulsing danger icon */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-red-100 dark:bg-red-900/30 rounded-full animate-ping opacity-30" />
            <div className="relative w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-10 h-10" />
            </div>
          </div>

          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
            Delete Registration?
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mb-1">
            You are about to permanently delete the registration for:
          </p>
          <p className="text-lg font-bold text-slate-800 dark:text-white mb-1">
            {reg?.user?.name}
          </p>
          <p className="text-sm text-slate-400 mb-6">{reg?.user?.email}</p>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 mb-8">
            <p className="text-red-700 dark:text-red-400 text-sm font-bold flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              This action is irreversible and cannot be undone.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl font-bold border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 py-3 px-4 rounded-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-red-500/30"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              Delete Permanently
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminConferenceRegistrationsPage() {
  const { t } = useLanguage();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [attendedFilter, setAttendedFilter] = useState("all");
  const [updatingCell, setUpdatingCell] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchRegistrations = async () => {
    try {
      const res = await api.get("/admin/conference-registrations");
      setRegistrations(res.data.data || []);
    } catch {
      toast.error("Error loading data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchRegistrations(); }, []);

  const toggleField = async (id: number, field: string, current: boolean) => {
    const key = `${id}_${field}`;
    setUpdatingCell(key);
    try {
      await api.patch(`/admin/conference-registrations/${id}/status`, { [field]: !current });
      setRegistrations(prev => prev.map(r => r.id === id ? { ...r, [field]: !current } : r));
      toast.success("Updated successfully");
    } catch {
      toast.error("Update failed");
    } finally {
      setUpdatingCell(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await api.delete(`/admin/conference-registrations/${deleteTarget.id}`);
      setRegistrations(prev => prev.filter(r => r.id !== deleteTarget.id));
      toast.success("Registration deleted");
      setDeleteTarget(null);
    } catch {
      toast.error("Delete failed");
    } finally {
      setIsDeleting(false);
    }
  };

  const filtered = registrations.filter(r => {
    const s = searchTerm.toLowerCase();
    const name = r.user?.name?.toLowerCase() || "";
    const email = r.user?.email?.toLowerCase() || "";
    const matchSearch = name.includes(s) || email.includes(s);
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    const matchAttended = attendedFilter === "all"
      || (attendedFilter === "yes" && r.is_attended)
      || (attendedFilter === "no" && !r.is_attended);
    return matchSearch && matchStatus && matchAttended;
  });

  const stats = {
    total: registrations.length,
    paid: registrations.filter(r => r.status === "paid").length,
    pending: registrations.filter(r => r.status === "pending").length,
    attended: registrations.filter(r => r.is_attended).length,
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
        <p className="text-slate-500 font-medium">Loading registrations...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center">
              <Ticket className="w-5 h-5" />
            </div>
            {t("إدارة تسجيلات المؤتمر", "Conference Registrations")}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 ml-13">
            {t("إدارة المشتركين في المؤتمر وورش العمل", "Manage conference attendees and workshops")}
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: stats.total, icon: Users, color: "blue" },
          { label: "Paid", value: stats.paid, icon: CreditCard, color: "green" },
          { label: "Pending", value: stats.pending, icon: Clock, color: "amber" },
          { label: "Attended", value: stats.attended, icon: CheckCircle2, color: "purple" },
        ].map(s => (
          <div key={s.label} className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm flex items-center gap-4`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              s.color === "blue" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" :
              s.color === "green" ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" :
              s.color === "amber" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" :
              "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
            }`}>
              <s.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{s.value}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-3 items-start md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t("ابحث بالاسم أو البريد...", "Search by name or email...")}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
          <div className="flex gap-2 items-center">
            <Filter className="w-4 h-4 text-slate-400" />
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 outline-none">
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
            <select value={attendedFilter} onChange={e => setAttendedFilter(e.target.value)}
              className="text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 outline-none">
              <option value="all">All Attendance</option>
              <option value="yes">Attended</option>
              <option value="no">Not Yet</option>
            </select>
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold px-3 py-2 rounded-xl whitespace-nowrap">
              {filtered.length} records
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-5 py-3.5 text-left font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  <div className="flex items-center gap-2"><Users className="w-4 h-4" /> Attendee</div>
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  <div className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> Amount</div>
                </th>
                <th className="px-5 py-3.5 text-center font-semibold text-slate-600 dark:text-slate-300">Payment</th>
                <th className="px-5 py-3.5 text-left font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  <div className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Workshops</div>
                </th>
                <th className="px-5 py-3.5 text-center font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  <div className="flex items-center gap-2 justify-center"><QrCode className="w-4 h-4" /> QR</div>
                </th>
                <th className="px-5 py-3.5 text-center font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  <div className="flex items-center gap-2 justify-center"><CheckCircle2 className="w-4 h-4" /> Attended</div>
                </th>
                <th className="px-5 py-3.5 text-center font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  <div className="flex items-center gap-2 justify-center"><Award className="w-4 h-4" /> Certificate</div>
                </th>
                <th className="px-5 py-3.5 text-center font-semibold text-slate-600 dark:text-slate-300">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filtered.map((r, i) => (
                <motion.tr
                  key={r.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  {/* Attendee */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-black text-sm shrink-0">
                        {r.user?.name?.[0]?.toUpperCase() ?? "?"}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{r.user?.name}</div>
                        <div className="text-xs text-slate-400">{r.user?.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-5 py-4">
                    <span className="font-black text-slate-900 dark:text-white">{r.amount}</span>
                    <span className="text-xs text-slate-400 ml-1">SAR</span>
                  </td>

                  {/* Payment Status */}
                  <td className="px-5 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      r.status === "paid"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : r.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}>
                      {r.status === "paid" ? "✓ Paid" : r.status === "cancelled" ? "✗ Cancelled" : "⏳ Pending"}
                    </span>
                  </td>

                  {/* Workshops */}
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {(r.selected_workshops || []).length > 0
                        ? (r.selected_workshops as string[]).map(w => (
                          <span key={w} className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            w.startsWith("m")
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                              : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                          }`}>
                            {WORKSHOP_LABELS[w] ?? w}
                          </span>
                        ))
                        : <span className="text-xs text-slate-400 italic">Conference only</span>
                      }
                    </div>
                  </td>

                  {/* QR Sent */}
                  <td className="px-5 py-4 text-center">
                    <StatusPill
                      value={r.qr_sent}
                      trueLabel="Sent" falseLabel="Not Sent"
                      trueColor="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                      falseColor="bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                      onClick={() => toggleField(r.id, "qr_sent", r.qr_sent)}
                      loading={updatingCell === `${r.id}_qr_sent`}
                    />
                  </td>

                  {/* Attended */}
                  <td className="px-5 py-4 text-center">
                    <StatusPill
                      value={r.is_attended}
                      trueLabel="✓ Attended" falseLabel="Not Yet"
                      trueColor="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      falseColor="bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                      onClick={() => toggleField(r.id, "is_attended", r.is_attended)}
                      loading={updatingCell === `${r.id}_is_attended`}
                    />
                  </td>

                  {/* Certificate */}
                  <td className="px-5 py-4 text-center">
                    <StatusPill
                      value={r.certificate_issued}
                      trueLabel="Issued" falseLabel="Pending"
                      trueColor="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      falseColor="bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                      onClick={() => toggleField(r.id, "certificate_issued", r.certificate_issued)}
                      loading={updatingCell === `${r.id}_certificate_issued`}
                    />
                  </td>

                  {/* Delete */}
                  <td className="px-5 py-4 text-center">
                    <button
                      onClick={() => setDeleteTarget(r)}
                      className="w-9 h-9 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 rounded-xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center mx-auto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-16 text-center">
                    <Ticket className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p className="text-slate-400 font-medium">No registrations found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <DeleteModal
            reg={deleteTarget}
            onClose={() => setDeleteTarget(null)}
            onConfirm={confirmDelete}
            loading={isDeleting}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
