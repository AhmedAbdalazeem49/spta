import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";
import { toast } from "sonner";
import { Loader2, Search, Ticket, Trash2, Calendar, Filter } from "lucide-react";

export default function AdminConferenceRegistrationsPage() {
  const { t } = useLanguage();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [attendedFilter, setAttendedFilter] = useState("all");

  const fetchRegistrations = async () => {
    try {
      const res = await api.get("/admin/conference-registrations");
      setRegistrations(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error(t("حدث خطأ أثناء تحميل البيانات", "Error loading data"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const updateStatus = async (id: number, field: string, value: boolean) => {
    try {
      await api.patch(`/admin/conference-registrations/${id}/status`, { [field]: value });
      toast.success(t("تم التحديث بنجاح", "Updated successfully"));
      fetchRegistrations();
    } catch (error) {
      toast.error(t("حدث خطأ", "An error occurred"));
    }
  };

  const deleteRegistration = async (id: number) => {
    if (!confirm(t("هل أنت متأكد من حذف هذا التسجيل؟", "Are you sure you want to delete this registration?"))) return;
    try {
      await api.delete(`/admin/conference-registrations/${id}`);
      toast.success(t("تم الحذف بنجاح", "Deleted successfully"));
      fetchRegistrations();
    } catch (error) {
      toast.error(t("حدث خطأ", "An error occurred"));
    }
  }

  const filteredRegistrations = registrations.filter(r => {
    const search = searchTerm.toLowerCase();
    const name = r.user?.name?.toLowerCase() || "";
    const email = r.user?.email?.toLowerCase() || "";
    const matchesSearch = name.includes(search) || email.includes(search);

    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    const matchesAttended = attendedFilter === "all" || 
      (attendedFilter === "yes" && r.is_attended) || 
      (attendedFilter === "no" && !r.is_attended);

    return matchesSearch && matchesStatus && matchesAttended;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Ticket className="w-6 h-6 text-blue-500" />
            {t("تسجيلات مؤتمر 2026", "Conference 2026 Registrations")}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t("إدارة المشتركين في المؤتمر وورش العمل", "Manage conference attendees and workshops")}
          </p>
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative max-w-sm w-full">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("ابحث بالاسم أو البريد...", "Search by name or email...")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-background border border-input rounded-lg px-3 py-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-transparent text-sm outline-none">
                <option value="all">{t("جميع حالات الدفع", "All Payment Status")}</option>
                <option value="paid">{t("مدفوع", "Paid")}</option>
                <option value="pending">{t("قيد الانتظار", "Pending")}</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2 bg-background border border-input rounded-lg px-3 py-2">
              <select value={attendedFilter} onChange={(e) => setAttendedFilter(e.target.value)} className="bg-transparent text-sm outline-none">
                <option value="all">{t("جميع حالات الحضور", "All Attendance Status")}</option>
                <option value="yes">{t("حضر", "Attended")}</option>
                <option value="no">{t("لم يحضر", "Not Attended")}</option>
              </select>
            </div>
          </div>

          <div className="text-sm font-semibold bg-blue-100 text-blue-800 px-4 py-2 rounded-lg whitespace-nowrap">
            {t("إجمالي التسجيلات:", "Total:")} {filteredRegistrations.length}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="p-4 font-semibold">{t("المشترك", "Attendee")}</th>
                <th className="p-4 font-semibold">{t("التاريخ", "Date")}</th>
                <th className="p-4 font-semibold">{t("المبلغ", "Amount")}</th>
                <th className="p-4 font-semibold">{t("كود الخصم", "Promo")}</th>
                <th className="p-4 font-semibold">{t("ورش العمل", "Workshops")}</th>
                <th className="p-4 font-semibold text-center">{t("الدفع", "Payment")}</th>
                <th className="p-4 font-semibold text-center">{t("تم إرسال QR", "QR Sent")}</th>
                <th className="p-4 font-semibold text-center">{t("حضر", "Attended")}</th>
                <th className="p-4 font-semibold text-center">{t("قيّم", "Reviewed")}</th>
                <th className="p-4 font-semibold text-center">{t("شهادة", "Certificate")}</th>
                <th className="p-4 font-semibold text-center">{t("إجراء", "Action")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRegistrations.map((r) => (
                <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-foreground">{r.user?.name}</div>
                    <div className="text-xs text-muted-foreground">{r.user?.email}</div>
                    <div className="text-xs text-muted-foreground">{r.user?.phone}</div>
                  </td>
                  <td className="p-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(r.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4 font-bold">{r.amount} SAR</td>
                  <td className="p-4">{r.promo_code?.code || "-"}</td>
                  <td className="p-4">
                    {r.selected_workshops && r.selected_workshops.length > 0 ? (
                      <div className="flex gap-1">
                        {r.selected_workshops.map((w: string) => (
                          <span key={w} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md">{w.toUpperCase()}</span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-xs">{t("بدون", "None")}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${r.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {r.status === 'paid' ? t("مدفوع", "Paid") : t("قيد الانتظار", "Pending")}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <input type="checkbox" checked={r.qr_sent} onChange={(e) => updateStatus(r.id, 'qr_sent', e.target.checked)} className="w-5 h-5 accent-blue-600" />
                  </td>
                  <td className="p-4 text-center">
                    <input type="checkbox" checked={r.is_attended} onChange={(e) => updateStatus(r.id, 'is_attended', e.target.checked)} className="w-5 h-5 accent-blue-600" />
                  </td>
                  <td className="p-4 text-center">
                    <input type="checkbox" checked={r.has_reviewed} onChange={(e) => updateStatus(r.id, 'has_reviewed', e.target.checked)} className="w-5 h-5 accent-blue-600" />
                  </td>
                  <td className="p-4 text-center">
                    <input type="checkbox" checked={r.certificate_issued} onChange={(e) => updateStatus(r.id, 'certificate_issued', e.target.checked)} className="w-5 h-5 accent-blue-600" />
                  </td>
                  <td className="p-4 text-center">
                    <button onClick={() => deleteRegistration(r.id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRegistrations.length === 0 && (
                <tr>
                  <td colSpan={11} className="p-8 text-center text-muted-foreground">
                    {t("لا يوجد تسجيلات", "No registrations found")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
