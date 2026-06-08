import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { Workshop } from "@/types/workshop";
import { GraduationCap, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";

// Components
import { WorkshopDeleteModal } from "@/components/admin/workshops/WorkshopDeleteModal";
import {
  emptyWorkshopForm,
  WorkshopFormModal,
  type WorkshopForm,
} from "@/components/admin/workshops/WorkshopFormModal";
import { WorkshopsTable } from "@/components/admin/workshops/WorkshopsTable";
import { WorkshopSubscriptionsModal } from "@/components/admin/workshops/WorkshopSubscriptionsModal";

const AdminWorkshopsPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isSubscriptionsOpen, setIsSubscriptionsOpen] = useState(false);

  const [selected, setSelected] = useState<Workshop | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [originalForm, setOriginalForm] = useState(emptyWorkshopForm);

  const [form, setForm] = useState({ ...emptyWorkshopForm });

  useEffect(() => {
    fetchWorkshops();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWorkshops = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/admin/workshops");
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
    setForm({ ...emptyWorkshopForm });
    setIsFormOpen(true);
  };

  // Add this state near your other states

  const openEdit = (w: Workshop) => {
    const populated = {
      title: w.title || "",
      description: w.description || "",
      doctor_name: w.doctor_name || "",
      location: w.location || "",
      date: w.date || "",
      end_date: w.end_date || "",
      time: w.time || "",
      regular_price: String(w.regular_price || ""),
      member_price: String(w.member_price || ""),
      total_capacity: String(w.total_capacity || ""),
      status: w.status || "open",
      image: null,
    } satisfies WorkshopForm;

    setForm(populated);
    setOriginalForm(populated); // snapshot for diffing
    setSelected(w);
    setEditMode(true);
    setIsFormOpen(true);
  };

  // Compute what changed (pass this to the modal)
  const getChanges = () => {
    const watchedFields = [
      "date",
      "end_date",
      "time",
      "location",
      "status",
      "title",
    ] as const;
    const changes: Record<string, { old: string; new: string }> = {};

    for (const field of watchedFields) {
      const oldVal = String(originalForm[field] ?? "");
      const newVal = String(form[field] ?? "");
      if (oldVal !== newVal) {
        changes[field] = { old: oldVal, new: newVal };
      }
    }
    return changes;
  };

  const changes = getChanges();
  const hasChanges = Object.keys(changes).length > 0;

  const changeType = (() => {
    if (changes.status?.new === "postponed") return "postponed";
    if (changes.date) return "date_changed";
    return "general";
  })();

  const openView = (w: Workshop) => {
    setSelected(w);
    setIsViewOpen(true);
  };

  const openSubscriptions = (w: Workshop) => {
    setSelected(w);
    setIsSubscriptionsOpen(true);
  };

  const handleSave = async (formData: FormData) => {
    setIsSaving(true);
    try {
      if (editMode && selected) {
        formData.append("_method", "PUT");
        await api.post(`/admin/workshops/${selected.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast({ title: t("تم التحديث", "Updated successfully") });
      } else {
        await api.post("/admin/workshops", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast({ title: t("تم الإنشاء", "Created successfully") });
      }

      setIsFormOpen(false);
      fetchWorkshops();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      await api.delete(`/admin/workshops/${selected.id}`);
      toast({ title: t("تم الحذف", "Deleted successfully") });
      setIsDeleteOpen(false);
      setSelected(null);
      fetchWorkshops();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const filtered = workshops.filter((w) => {
    const q = searchQuery.toLowerCase();
    return (
      (w.title || "").toLowerCase().includes(q) ||
      (w.doctor_name || "").toLowerCase().includes(q) ||
      (w.status || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            {t("إدارة ورش العمل", "Workshops Management")}
          </h2>
          <p className="text-muted-foreground text-sm">
            {t(
              "إنشاء وتعديل وحذف ورش العمل",
              "Create, edit and delete workshops",
            )}
          </p>
        </div>
        <Button onClick={openCreate} className="gap-2 shrink-0">
          <Plus className="w-4 h-4" />
          {t("إضافة ورشة", "Add Workshop")}
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="relative">
            <Search className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t(
                "بحث بالاسم أو الطبيب  ...",
                "Search by name, doctor...",
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
            <WorkshopsTable
              workshops={filtered}
              onOpenView={openView}
              onOpenEdit={openEdit}
              onOpenDelete={(w) => {
                setSelected(w);
                setIsDeleteOpen(true);
              }}
              onOpenSubscriptions={openSubscriptions}
            />
          )}
        </CardContent>
      </Card>


      <WorkshopFormModal
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        form={form}
        setForm={setForm}
        editMode={editMode}
        isSaving={isSaving}
        onSave={handleSave}
        changes={changes}
        changeType={changeType}
        hasChanges={hasChanges}
        workshopId={selected?.id}
        existingImage={selected?.image}
      />

      <WorkshopDeleteModal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        selected={selected}
        onDelete={handleDelete}
        isSaving={isSaving}
      />

      <WorkshopSubscriptionsModal
        isOpen={isSubscriptionsOpen}
        onOpenChange={setIsSubscriptionsOpen}
        workshop={selected}
      />
    </div>
  );
};

export default AdminWorkshopsPage;
