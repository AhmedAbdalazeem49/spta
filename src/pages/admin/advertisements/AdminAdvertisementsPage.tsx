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
  Megaphone,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export interface Advertisement {
  id: number;
  title: string;
  description: string | null;
  link: string;
  image: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

const AdminAdvertisementsPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  const [ads, setAds] = useState<Advertisement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedAd, setSelectedAd] = useState<Advertisement | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    sort_order: "0",
    is_active: true,
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAds = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/admin/advertisements");
      setAds(response.data.data);
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
    fetchAds();
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
    if (!form.title.trim()) {
      toast({
        title: t("خطأ", "Error"),
        description: t("العنوان مطلوب", "Title is required"),
        variant: "destructive",
      });
      return;
    }
    if (!form.link.trim()) {
      toast({
        title: t("خطأ", "Error"),
        description: t("الرابط مطلوب", "Link is required"),
        variant: "destructive",
      });
      return;
    }
    if (!isEditOpen && !imageFile) {
      toast({
        title: t("خطأ", "Error"),
        description: t("الصورة مطلوبة", "Image is required"),
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append("title", form.title);
      if (form.description) formData.append("description", form.description);
      formData.append("link", form.link);
      formData.append("sort_order", form.sort_order);
      formData.append("is_active", form.is_active ? "1" : "0");
      
      if (imageFile) formData.append("image", imageFile);

      if (isEditOpen && selectedAd) {
        formData.append("_method", "PUT");
        await api.post(`/admin/advertisements/${selectedAd.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast({
          title: t("تم بنجاح", "Success"),
          description: t("تم التحديث بنجاح", "Updated successfully"),
        });
      } else {
        await api.post("/admin/advertisements", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast({
          title: t("تم بنجاح", "Success"),
          description: t("تمت الإضافة بنجاح", "Added successfully"),
        });
      }

      setIsAddOpen(false);
      setIsEditOpen(false);
      fetchAds();
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
    if (!selectedAd) return;
    try {
      setIsDeleting(true);
      await api.delete(`/admin/advertisements/${selectedAd.id}`);
      toast({
        title: t("تم بنجاح", "Success"),
        description: t("تم الحذف بنجاح", "Deleted successfully"),
      });
      setIsDeleteOpen(false);
      fetchAds();
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
    setForm({ title: "", description: "", link: "", sort_order: "0", is_active: true });
    setImageFile(null);
    setImagePreview(null);
    setIsAddOpen(true);
  };

  const openEdit = (ad: Advertisement) => {
    setSelectedAd(ad);
    setForm({
      title: ad.title,
      description: ad.description || "",
      link: ad.link,
      sort_order: ad.sort_order.toString(),
      is_active: ad.is_active,
    });
    setImageFile(null);
    if (ad.image) {
      setImagePreview(
        ad.image.startsWith("http")
          ? ad.image
          : `${import.meta.env.VITE_Storage_URL}/storage/${ad.image}`
      );
    } else {
      setImagePreview(null);
    }
    setIsEditOpen(true);
  };

  const toggleActive = async (ad: Advertisement, checked: boolean) => {
    try {
      const formData = new FormData();
      formData.append("title", ad.title);
      formData.append("link", ad.link);
      formData.append("sort_order", ad.sort_order.toString());
      formData.append("is_active", checked ? "1" : "0");
      formData.append("_method", "PUT");
      
      await api.post(`/admin/advertisements/${ad.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      setAds(ads.map(a => a.id === ad.id ? { ...a, is_active: checked } : a));
      
      toast({
        title: t("تم بنجاح", "Success"),
        description: t("تم التحديث بنجاح", "Updated successfully"),
      });
    } catch (error) {
      toast({
        title: t("خطأ", "Error"),
        description: t("فشل التحديث", "Update failed"),
        variant: "destructive",
      });
    }
  };

  const filteredAds = ads.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-primary" />
            {t("الإعلانات", "Advertisements")}
          </h2>
          <p className="text-muted-foreground mt-1">
            {t("إدارة الإعلانات المعروضة في الصفحة الرئيسية", "Manage advertisements displayed on the homepage")}
          </p>
        </div>
        <Button onClick={openAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          {t("إضافة إعلان", "Add Advertisement")}
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
              placeholder={t("بحث بالعنوان...", "Search by title...")}
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
          ) : filteredAds.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Megaphone className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>{t("لا توجد إعلانات", "No advertisements found")}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-start p-4 font-semibold text-muted-foreground">{t("الصورة", "Image")}</th>
                    <th className="text-start p-4 font-semibold text-muted-foreground">{t("العنوان", "Title")}</th>
                    <th className="text-start p-4 font-semibold text-muted-foreground">{t("الرابط", "Link")}</th>
                    <th className="text-start p-4 font-semibold text-muted-foreground">{t("الترتيب", "Order")}</th>
                    <th className="text-start p-4 font-semibold text-muted-foreground">{t("الحالة", "Status")}</th>
                    <th className="text-start p-4 font-semibold text-muted-foreground">{t("الإجراءات", "Actions")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <AnimatePresence>
                    {filteredAds.map((ad) => (
                      <motion.tr
                        key={ad.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4">
                          {ad.image ? (
                            <img
                              src={ad.image.startsWith("http") ? ad.image : `${import.meta.env.VITE_Storage_URL}/storage/${ad.image}`}
                              alt={ad.title}
                              className="w-16 h-12 object-cover rounded-md border bg-white"
                            />
                          ) : (
                            <div className="w-16 h-12 rounded-md border bg-muted flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-muted-foreground/50" />
                            </div>
                          )}
                        </td>
                        <td className="p-4 font-medium">{ad.title}</td>
                        <td className="p-4">
                          <a
                            href={ad.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1 text-xs"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {t("زيارة الموقع", "Visit Site")}
                          </a>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="font-mono">{ad.sort_order}</Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Switch 
                              checked={ad.is_active} 
                              onCheckedChange={(checked) => toggleActive(ad, checked)} 
                            />
                            {ad.is_active ? (
                              <span className="text-xs text-green-600 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> {t("نشط", "Active")}</span>
                            ) : (
                              <span className="text-xs text-muted-foreground flex items-center gap-1"><XCircle className="w-3 h-3" /> {t("غير نشط", "Inactive")}</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEdit(ad)}
                              className="text-blue-500 hover:text-blue-600 hover:bg-blue-500/10"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedAd(ad);
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
              {isEditOpen ? t("تعديل الإعلان", "Edit Advertisement") : t("إضافة إعلان جديد", "Add New Advertisement")}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 pt-4">
            <div className="flex justify-center mb-6">
              <div
                className="w-full h-40 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors relative overflow-hidden group"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover bg-white" />
                ) : (
                  <div className="flex flex-col items-center text-muted-foreground">
                    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-xs">{t("صورة الإعلان", "Advertisement Image")}</span>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label>{t("العنوان", "Title")} <span className="text-destructive">*</span></Label>
                <Input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder={t("عنوان الإعلان...", "Advertisement title...")}
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label>{t("الرابط", "Link")} <span className="text-destructive">*</span></Label>
                <Input
                  type="url"
                  required
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                  placeholder="https://..."
                  dir="ltr"
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label>{t("وصف قصير (اختياري)", "Short Description (Optional)")}</Label>
                <Input
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder={t("وصف بسيط للإعلان...", "Brief description...")}
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
              
              <div className="space-y-2 flex flex-col justify-end pb-2">
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={form.is_active}
                    onCheckedChange={(c) => setForm({ ...form, is_active: c })}
                  />
                  <Label>{t("نشط ويظهر بالموقع", "Active & visible")}</Label>
                </div>
              </div>
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
              {t("لا يمكن التراجع عن هذا الإجراء وسيتم حذف بيانات الإعلان نهائياً.", "This action cannot be undone and advertisement details will be permanently deleted.")}
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

export default AdminAdvertisementsPage;
