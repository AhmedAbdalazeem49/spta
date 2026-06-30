import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import {
  Search,
  Plus,
  Loader2,
  Edit,
  Trash2,
  ExternalLink,
  Users,
  Image as ImageIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { motion, AnimatePresence } from "framer-motion";

export interface Partner {
  id: number;
  name: string;
  description: string | null;
  link: string | null;
  image: string | null;
  sort_order: number;
  created_at: string;
}

const AdminPartnersPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    link: "",
    sort_order: "0",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchPartners = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/admin/partners");
      setPartners(response.data.data);
    } catch (error) {
      toast({
        title: t("خطأ", "Error"),
        description: t("فشل في تحميل البيانات", "Failed to load data"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast({
        title: t("خطأ", "Error"),
        description: t("اسم الجهة مطلوب", "Name is required"),
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append("name", form.name);
      if (form.description) formData.append("description", form.description);
      if (form.link) formData.append("link", form.link);
      formData.append("sort_order", form.sort_order);
      if (imageFile) formData.append("image", imageFile);

      if (isEditOpen && selectedPartner) {
        // use POST with _method=PUT for FormData in Laravel
        formData.append("_method", "PUT");
        await api.post(`/admin/partners/${selectedPartner.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast({
          title: t("تم بنجاح", "Success"),
          description: t("تم التحديث بنجاح", "Updated successfully"),
        });
      } else {
        await api.post("/admin/partners", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast({
          title: t("تم بنجاح", "Success"),
          description: t("تمت الإضافة بنجاح", "Added successfully"),
        });
      }

      setIsAddOpen(false);
      setIsEditOpen(false);
      fetchPartners();
    } catch (error) {
      toast({
        title: t("خطأ", "Error"),
        description: t("حدث خطأ أثناء الحفظ", "Error while saving"),
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedPartner) return;
    try {
      setIsDeleting(true);
      await api.delete(`/admin/partners/${selectedPartner.id}`);
      toast({
        title: t("تم بنجاح", "Success"),
        description: t("تم الحذف بنجاح", "Deleted successfully"),
      });
      setIsDeleteOpen(false);
      fetchPartners();
    } catch (error) {
      toast({
        title: t("خطأ", "Error"),
        description: t("حدث خطأ أثناء الحذف", "Error while deleting"),
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const openAdd = () => {
    setForm({ name: "", description: "", link: "", sort_order: "0" });
    setImageFile(null);
    setImagePreview(null);
    setIsAddOpen(true);
  };

  const openEdit = (partner: Partner) => {
    setSelectedItem(partner);
    setForm({
      name: partner.name,
      description: partner.description || "",
      link: partner.link || "",
      sort_order: partner.sort_order.toString(),
    });
    setImageFile(null);
    if (partner.image) {
      setImagePreview(`${import.meta.env.VITE_Storage_URL}/storage/${partner.image}`);
    } else {
      setImagePreview(null);
    }
    setIsEditOpen(true);
  };

  const setSelectedItem = (partner: Partner) => {
    setSelectedPartner(partner);
  };

  const filteredPartners = partners.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            {t("الشركاء والجهات الداعمة", "Partners & Sponsors")}
          </h2>
          <p className="text-muted-foreground mt-1">
            {t("إدارة شعارات وتفاصيل شركاء النجاح", "Manage partners and sponsors details")}
          </p>
        </div>
        <Button onClick={openAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          {t("إضافة شريك", "Add Partner")}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search
              className={`absolute top-1/2 -translate-y-1/2 ${
                isRTL ? "right-3" : "left-3"
              } w-4 h-4 text-muted-foreground`}
            />
            <Input
              placeholder={t("بحث باسم الشريك...", "Search by name...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={isRTL ? "pr-10" : "pl-10"}
            />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            </div>
          ) : filteredPartners.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>{t("لا توجد نتائج", "No results found")}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-start p-4 font-semibold text-muted-foreground">{t("الشعار", "Logo")}</th>
                    <th className="text-start p-4 font-semibold text-muted-foreground">{t("اسم الشريك", "Name")}</th>
                    <th className="text-start p-4 font-semibold text-muted-foreground">{t("الرابط", "Link")}</th>
                    <th className="text-start p-4 font-semibold text-muted-foreground">{t("الترتيب", "Order")}</th>
                    <th className="text-start p-4 font-semibold text-muted-foreground">{t("الإجراءات", "Actions")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <AnimatePresence>
                    {filteredPartners.map((partner) => (
                      <motion.tr
                        key={partner.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4">
                          {partner.image ? (
                            <img
                              src={`${import.meta.env.VITE_Storage_URL}/storage/${partner.image}`}
                              alt={partner.name}
                              className="w-12 h-12 object-contain rounded-md border bg-white"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-md border bg-muted flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-muted-foreground/50" />
                            </div>
                          )}
                        </td>
                        <td className="p-4 font-medium">{partner.name}</td>
                        <td className="p-4">
                          {partner.link ? (
                            <a
                              href={partner.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center gap-1 text-xs"
                            >
                              <ExternalLink className="w-3 h-3" />
                              {t("زيارة الموقع", "Visit Site")}
                            </a>
                          ) : (
                            <span className="text-muted-foreground text-xs">-</span>
                          )}
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-muted font-mono text-xs border">
                            {partner.sort_order}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEdit(partner)}
                              className="text-blue-500 hover:text-blue-600 hover:bg-blue-500/10"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedItem(partner);
                                setIsDeleteOpen(true);
                              }}
                              className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={isAddOpen || isEditOpen}
        onOpenChange={(val) => {
          if (!val) {
            setIsAddOpen(false);
            setIsEditOpen(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditOpen ? t("تعديل بيانات الشريك", "Edit Partner Details") : t("إضافة شريك جديد", "Add New Partner")}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 pt-4">
            <div className="flex justify-center mb-6">
              <div
                className="w-32 h-32 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors relative overflow-hidden group"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-contain bg-white p-2" />
                ) : (
                  <div className="flex flex-col items-center text-muted-foreground">
                    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-xs">{t("صورة الشعار", "Logo Image")}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-medium">{t("تغيير الصورة", "Change Image")}</span>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="space-y-2">
              <Label>{t("اسم الشريك", "Partner Name")} <span className="text-destructive">*</span></Label>
              <Input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={t("أدخل اسم الجهة...", "Enter organization name...")}
              />
            </div>

            <div className="space-y-2">
              <Label>{t("رابط الموقع (اختياري)", "Website Link (Optional)")}</Label>
              <Input
                type="url"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="https://..."
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label>{t("وصف قصير (اختياري)", "Short Description (Optional)")}</Label>
              <Input
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder={t("نبذة بسيطة...", "Brief description...")}
              />
            </div>

            <div className="space-y-2">
              <Label>{t("ترتيب العرض", "Sort Order")} <span className="text-destructive">*</span></Label>
              <Input
                type="number"
                required
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                placeholder="0"
                dir="ltr"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddOpen(false);
                  setIsEditOpen(false);
                }}
              >
                {t("إلغاء", "Cancel")}
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {t("حفظ", "Save")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("هل أنت متأكد؟", "Are you sure?")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("لا يمكن التراجع عن هذا الإجراء وسيتم حذف بيانات الشريك نهائياً.", "This action cannot be undone and partner details will be permanently deleted.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>{t("إلغاء", "Cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : t("حذف نهائي", "Delete Permanently")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPartnersPage;
