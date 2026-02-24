import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Calendar,
  Clock,
  Edit,
  GraduationCap,
  Loader2,
  MapPin,
  Plus,
  Search,
  Stethoscope,
  Timer,
  Trash2,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Workshop {
  id: number;
  title?: string;
  description?: string;
  doctor_name?: string;
  location?: string;
  date?: string;
  time?: string;
  regular_price?: number;
  member_price?: number;
  total_capacity?: number;
  status?: "open" | "closed" | "completed";
  duration_minutes?: number;
}

const statusConfig = {
  open: {
    label_ar: "مفتوح",
    label_en: "Open",
    variant: "default" as const,
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  closed: {
    label_ar: "مغلق",
    label_en: "Closed",
    variant: "secondary" as const,
    color: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  },
  completed: {
    label_ar: "مكتمل",
    label_en: "Completed",
    variant: "secondary" as const,
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
};

const AdminWorkshopsPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selected, setSelected] = useState<Workshop | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const emptyForm = {
    title: "",
    description: "",
    doctor_name: "",
    location: "",
    date: "",
    time: "",
    regular_price: "",
    member_price: "",
    total_capacity: "",
    status: "open" as "open" | "closed" | "completed",
    duration_minutes: 60,
  };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/workshops");
      setWorkshops(res.data?.data || []);
    } catch (err) {
      toast({
        title: t("خطأ", "Error"),
        description: t("فشل التحميل", "Failed to load"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openCreate = () => {
    setEditMode(false);
    setSelected(null);
    setForm(emptyForm);
    setIsFormOpen(true);
  };

  const openEdit = (w: Workshop) => {
    setEditMode(true);
    setSelected(w);
    setForm({
      title: w.title || "",
      description: w.description || "",
      doctor_name: w.doctor_name || "",
      location: w.location || "",
      date: w.date || "",
      time: w.time || "",
      regular_price: String(w.regular_price || ""),
      member_price: String(w.member_price || ""),
      total_capacity: String(w.total_capacity || ""),
      status: w.status || "open",
      duration_minutes: w.duration_minutes || 60,
    });
    setIsFormOpen(true);
  };

  const openView = (w: Workshop) => {
    setSelected(w);
    setIsViewOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        ...form,
        regular_price: parseFloat(String(form.regular_price)),
        member_price: parseFloat(String(form.member_price)),
        total_capacity: parseInt(String(form.total_capacity), 10),
        duration_minutes: parseInt(String(form.duration_minutes), 10),
      };

      if (editMode && selected) {
        console.log(payload);
        await api.put(`/workshops/${selected.id}`, payload);
        toast({ title: t("تم التحديث", "Updated successfully") });
      } else {
        console.log(payload);
        await api.post("/workshops", payload);
        toast({ title: t("تم الإنشاء", "Created successfully") });
      }

      setIsFormOpen(false);
      fetchWorkshops();
    } catch (err: any) {
      toast({
        title: t("خطأ", "Error"),
        description:
          err.response?.data?.message || t("حدث خطأ", "An error occurred"),
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    setIsSaving(true);
    try {
      await api.delete(`/workshops/${selected.id}`);
      toast({ title: t("تم الحذف", "Deleted successfully") });
      setIsDeleteOpen(false);
      setSelected(null);
      fetchWorkshops();
    } catch (err: any) {
      toast({
        title: t("خطأ", "Error"),
        description:
          err.response?.data?.message || t("حدث خطأ", "An error occurred"),
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Search filters by title, doctor_name, location, and status
  const filtered = workshops.filter((w) => {
    const q = searchQuery.toLowerCase();
    return (
      (w.title || "").toLowerCase().includes(q) ||
      (w.doctor_name || "").toLowerCase().includes(q) ||
      (w.status || "").toLowerCase().includes(q)
    );
  });

  const getStatusLabel = (status?: string) => {
    if (!status) return status;
    const cfg = statusConfig[status as keyof typeof statusConfig];
    return cfg ? t(cfg.label_ar, cfg.label_en) : status;
  };

  const getStatusColor = (status?: string) => {
    const cfg = statusConfig[status as keyof typeof statusConfig];
    return cfg?.color || "";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            {t("إدارة ورش العمل", "Workshops Management")}
          </h2>
          <p className="text-muted-foreground text-sm">
            {t(
              "إنشاء وتعديل وحذف ورش العمل",
              "Create, edit and delete workshops"
            )}
          </p>
        </div>
        <Button onClick={openCreate} className="gap-2 shrink-0">
          <Plus className="w-4 h-4" />
          {t("إضافة ورشة", "Add Workshop")}
        </Button>
      </div>

      {/* Table Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="relative">
            <Search className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t(
                "بحث بالاسم أو الطبيب  ...",
                "Search by name, doctor..."
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-14 w-full rounded-lg" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground">
                {searchQuery
                  ? t("لا توجد نتائج", "No results found")
                  : t("لا توجد ورش عمل", "No workshops found")}
              </p>
              {!searchQuery && (
                <Button
                  onClick={openCreate}
                  variant="outline"
                  className="mt-4 gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {t("أنشئ أول ورشة", "Create first workshop")}
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-start p-4 font-semibold text-sm">
                      {t("الاسم", "Name")}
                    </th>
                    <th className="text-start p-4 font-semibold text-sm">
                      {t("الطبيب", "Doctor")}
                    </th>
                    <th className="text-start p-4 font-semibold text-sm">
                      {t("التاريخ والوقت", "Date & Time")}
                    </th>
                    <th className="text-start p-4 font-semibold text-sm">
                      {t("المقاعد", "Seats")}
                    </th>
                    <th className="text-start p-4 font-semibold text-sm">
                      {t("السعر", "Price")}
                    </th>
                    <th className="text-start p-4 font-semibold text-sm">
                      {t("الحالة", "Status")}
                    </th>
                    <th className="text-start p-4 font-semibold text-sm">
                      {t("الإجراءات", "Actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((w, i) => (
                    <motion.tr
                      key={w.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-t border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4 font-medium text-sm max-w-[180px]">
                        <span
                          className="cursor-pointer hover:text-primary transition-colors line-clamp-1"
                          onClick={() => openView(w)}
                          title={w.title}
                        >
                          {w.title || "—"}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {w.doctor_name || "—"}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        <div className="flex flex-col gap-0.5">
                          <span>{w.date || "—"}</span>
                          {w.time && (
                            <span className="text-xs opacity-70">{w.time}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {w.total_capacity ?? "—"}
                      </td>
                      <td className="p-4 text-sm">
                        <div className="flex flex-col gap-0.5">
                          <span>
                            <span className="font-bold text-primary">
                              {w.regular_price ?? "—"}
                            </span>
                            <span className="text-muted-foreground text-xs ms-1">
                              SAR
                            </span>
                          </span>
                          {w.member_price !== undefined &&
                            w.member_price !== w.regular_price && (
                              <span className="text-xs text-muted-foreground">
                                {t("أعضاء", "Members")}: {w.member_price} SAR
                              </span>
                            )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                            w.status
                          )}`}
                        >
                          {getStatusLabel(w.status)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                            onClick={() => openView(w)}
                            title={t("عرض", "View")}
                          >
                            <GraduationCap className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                            onClick={() => openEdit(w)}
                            title={t("تعديل", "Edit")}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => {
                              setSelected(w);
                              setIsDeleteOpen(true);
                            }}
                            title={t("حذف", "Delete")}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ─── View Dialog ─── */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              {selected?.title || t("تفاصيل الورشة", "Workshop Details")}
            </DialogTitle>
            <DialogDescription>
              {t("عرض تفاصيل الورشة كاملة", "Full workshop details")}
            </DialogDescription>
          </DialogHeader>

          {selected && (
            <div className="space-y-4 py-2">
              {/* Status badge */}
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                  selected.status
                )}`}
              >
                {getStatusLabel(selected.status)}
              </span>

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
                    <p className="text-sm font-medium">
                      {selected.date || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/40">
                  <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t("الوقت", "Time")}
                    </p>
                    <p className="text-sm font-medium">
                      {selected.time || "—"}
                    </p>
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
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsViewOpen(false)}>
              <X className="w-4 h-4 me-1" />
              {t("إغلاق", "Close")}
            </Button>
            <Button
              onClick={() => {
                setIsViewOpen(false);
                if (selected) openEdit(selected);
              }}
              className="gap-2"
            >
              <Edit className="w-4 h-4" />
              {t("تعديل", "Edit")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── Create / Edit Dialog ─── */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editMode
                ? t("تعديل الورشة", "Edit Workshop")
                : t("إضافة ورشة", "Add Workshop")}
            </DialogTitle>
            <DialogDescription>
              {editMode
                ? t("عدّل بيانات الورشة", "Update workshop details")
                : t("أدخل بيانات الورشة الجديدة", "Enter new workshop details")}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("الاسم", "Title")} *</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder={t("عنوان الورشة", "Workshop title")}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("الطبيب", "Doctor")} *</Label>
                <Input
                  value={form.doctor_name}
                  onChange={(e) =>
                    setForm({ ...form, doctor_name: e.target.value })
                  }
                  placeholder={t("اسم الطبيب", "Doctor name")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("الوصف", "Description")} *</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                placeholder={t("وصف الورشة", "Workshop description")}
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{t("الموقع", "Location")} *</Label>
                <Input
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  placeholder={t("مكان الورشة", "Workshop location")}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("التاريخ", "Date")} *</Label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("الوقت", "Time")} *</Label>
                <Input
                  type="time"
                  value={form.time}
                  onChange={(e) =>
                    setForm({ ...form, time: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>{t("السعر", "Price (SAR)")} *</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.regular_price}
                  onChange={(e) =>
                    setForm({ ...form, regular_price: e.target.value })
                  }
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label>{t("سعر الأعضاء", "Member Price")} *</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.member_price}
                  onChange={(e) =>
                    setForm({ ...form, member_price: e.target.value })
                  }
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label>{t("المقاعد", "Capacity")} *</Label>
                <Input
                  type="number"
                  min="1"
                  value={form.total_capacity}
                  onChange={(e) =>
                    setForm({ ...form, total_capacity: e.target.value })
                  }
                  placeholder="30"
                />
              </div>
              <div className="space-y-2">
                <Label>{t("المدة بالدقائق", "Duration (min)")} *</Label>
                <Input
                  type="number"
                  min="15"
                  value={form.duration_minutes}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      duration_minutes: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="60"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("الحالة", "Status")}</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as any })
                }
              >
                <option value="open">{t("مفتوح", "Open")}</option>
                <option value="closed">{t("مغلق", "Closed")}</option>
                <option value="completed">{t("مكتمل", "Completed")}</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>
              {t("إلغاء", "Cancel")}
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="gap-2">
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : editMode ? (
                <Edit className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {editMode
                ? t("حفظ التغييرات", "Save Changes")
                : t("إنشاء الورشة", "Create Workshop")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── Delete Confirmation Dialog ─── */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              {t("تأكيد الحذف", "Confirm Delete")}
            </DialogTitle>
            <DialogDescription>
              {t(
                `هل أنت متأكد من حذف "${selected?.title}"؟ لا يمكن التراجع عن هذا الإجراء.`,
                `Are you sure you want to delete "${selected?.title}"? This action cannot be undone.`
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              {t("إلغاء", "Cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isSaving}
              className="gap-2"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              {t("حذف", "Delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminWorkshopsPage;
