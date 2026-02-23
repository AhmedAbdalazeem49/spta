import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Edit,
  GraduationCap,
  Loader2,
  Plus,
  Search,
  Trash2,
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
  price?: number;
  member_price?: number;
  capacity?: number;
  status?: "open" | "closed" | "completed";
  duration_minutes?: number;
}

const AdminWorkshopsPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
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
    price: "",
    member_price: "",
    capacity: "",
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
      price: String(w.price || ""),
      member_price: String(w.member_price || ""),
      capacity: String(w.capacity || ""),
      status: w.status || "open",
      duration_minutes: w.duration_minutes || 60,
    });
    setIsFormOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price as unknown as string),
        member_price: parseFloat(form.member_price as unknown as string),
        capacity: parseInt(form.capacity as unknown as string),
        duration_minutes: parseInt(form.duration_minutes as unknown as string),
      };
      if (editMode && selected) {
        await api.put(`/admin/workshops/${selected.id}`, payload);
        toast({ title: t("تم التحديث", "Updated") });
      } else {
        await api.post("/admin/workshops", payload);
        toast({ title: t("تم الإنشاء", "Created") });
      }
      setIsFormOpen(false);
      fetchWorkshops();
    } catch (err: any) {
      toast({
        title: t("خطأ", "Error"),
        description: err.response?.data?.message || t("حدث خطأ", "Error"),
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
      await api.delete(`/admin/workshops/${selected.id}`);
      toast({ title: t("تم الحذف", "Deleted") });
      setIsDeleteOpen(false);
      setSelected(null);
      fetchWorkshops();
    } catch (err: any) {
      toast({
        title: t("خطأ", "Error"),
        description: err.response?.data?.message || t("حدث خطأ", "Error"),
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = workshops.filter((w) =>
    (w.title || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            {t("إدارة ورش العمل", "Workshops Management")}
          </h2>
          <p className="text-muted-foreground">
            {t(
              "إنشاء وتعديل وحذف ورش العمل",
              "Create, edit and delete workshops"
            )}
          </p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          {t("إضافة ورشة", "Add Workshop")}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t("بحث...", "Search...")}
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
                {t("لا توجد ورش عمل", "No workshops found")}
              </p>
              <Button
                onClick={openCreate}
                variant="outline"
                className="mt-4 gap-2"
              >
                <Plus className="w-4 h-4" />
                {t("أنشئ أول ورشة", "Create first workshop")}
              </Button>
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
                      {t("التاريخ", "Date")}
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
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-t border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4 font-medium text-sm">{w.title}</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {w.doctor_name}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {w.date} {w.time}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {w.capacity}
                      </td>
                      <td className="p-4 text-sm">
                        <span className="font-bold text-primary">
                          {w.price}
                        </span>
                        <span className="text-muted-foreground text-xs ms-1">
                          SAR
                        </span>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={
                            w.status === "open" ? "default" : "secondary"
                          }
                          className="text-xs"
                        >
                          {w.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openEdit(w)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive"
                            onClick={() => {
                              setSelected(w);
                              setIsDeleteOpen(true);
                            }}
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

      {/* Create/Edit Dialog */}
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
                <Label>{t("الاسم", "Title")}</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("الطبيب", "Doctor")}</Label>
                <Input
                  value={form.doctor_name}
                  onChange={(e) =>
                    setForm({ ...form, doctor_name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("الوصف", "Description")}</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{t("الموقع", "Location")}</Label>
                <Input
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>{t("التاريخ", "Date")}</Label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("الوقت", "Time")}</Label>
                <Input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>{t("السعر", "Price (SAR)")}</Label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("سعر الأعضاء", "Member Price")}</Label>
                <Input
                  type="number"
                  value={form.member_price}
                  onChange={(e) =>
                    setForm({ ...form, member_price: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>{t("المقاعد", "Capacity")}</Label>
                <Input
                  type="number"
                  value={form.capacity}
                  onChange={(e) =>
                    setForm({ ...form, capacity: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>{t("المدة بالدقائق", "Duration (minutes)")}</Label>
                <Input
                  type="number"
                  value={form.duration_minutes}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      duration_minutes: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("الحالة", "Status")}</Label>
              <select
                className="input"
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
              {editMode ? t("حفظ", "Save") : t("إنشاء", "Create")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              {t("تأكيد الحذف", "Confirm Delete")}
            </DialogTitle>
            <DialogDescription>
              {t("هل أنت متأكد؟", "Are you sure?")}
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
