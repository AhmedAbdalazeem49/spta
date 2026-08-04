import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { NEWS_ENDPOINTS } from "@/api/endpoints";
import {
  Search,
  Plus,
  Loader2,
  Edit,
  Trash2,
  ExternalLink,
  Newspaper,
  Image as ImageIcon,
  Calendar,
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export interface NewsItem {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  image: string | null;
  link: string | null;
  created_at: string;
  updated_at: string;
}

const STORAGE_URL = import.meta.env.VITE_Storage_URL;

const getImageUrl = (image: string | null) => {
  if (!image) return null;
  if (image.startsWith("http")) return image;
  return `${STORAGE_URL}/storage/${image}`;
};

const formatDate = (dateStr: string, lang: string) => {
  return new Date(dateStr).toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const AdminNewsPage = () => {
  const { t, isRTL, language } = useLanguage();
  const { toast } = useToast();

  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);

  const emptyForm = {
    title_ar: "",
    title_en: "",
    description_ar: "",
    description_en: "",
    link: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  /* ── Data Fetching ── */
  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(NEWS_ENDPOINTS.adminList);
      // Laravel paginate returns { data: [...] }
      const items: NewsItem[] = response.data.data ?? response.data;
      setNews(Array.isArray(items) ? items : []);
    } catch {
      toast({
        title: t("خطأ", "Error"),
        description: t("فشل في تحميل الأخبار", "Failed to load news"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Image Handling ── */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  /* ── Save (Create / Update) ── */
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title_ar.trim() || !form.title_en.trim()) {
      toast({
        title: t("خطأ", "Error"),
        description: t("العنوان بالعربية والإنجليزية مطلوبان", "Both Arabic and English titles are required"),
        variant: "destructive",
      });
      return;
    }
    if (!form.description_ar.trim() || !form.description_en.trim()) {
      toast({
        title: t("خطأ", "Error"),
        description: t("الوصف بالعربية والإنجليزية مطلوبان", "Both Arabic and English descriptions are required"),
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append("title_ar", form.title_ar);
      formData.append("title_en", form.title_en);
      formData.append("description_ar", form.description_ar);
      formData.append("description_en", form.description_en);
      if (form.link.trim()) formData.append("link", form.link);
      if (imageFile) formData.append("image", imageFile);

      if (isEditOpen && selectedItem) {
        formData.append("_method", "PUT");
        await api.post(NEWS_ENDPOINTS.adminUpdate(selectedItem.id), formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast({ title: t("تم بنجاح", "Success"), description: t("تم تحديث الخبر بنجاح", "News updated successfully") });
      } else {
        await api.post(NEWS_ENDPOINTS.adminCreate, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast({ title: t("تم بنجاح", "Success"), description: t("تمت إضافة الخبر بنجاح", "News added successfully") });
      }

      setIsAddOpen(false);
      setIsEditOpen(false);
      fetchNews();
    } catch {
      toast({
        title: t("خطأ", "Error"),
        description: t("حدث خطأ أثناء الحفظ", "Error while saving"),
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  /* ── Delete ── */
  const handleDelete = async () => {
    if (!selectedItem) return;
    try {
      setIsDeleting(true);
      await api.delete(NEWS_ENDPOINTS.adminDelete(selectedItem.id));
      toast({ title: t("تم بنجاح", "Success"), description: t("تم حذف الخبر بنجاح", "News deleted successfully") });
      setIsDeleteOpen(false);
      fetchNews();
    } catch {
      toast({
        title: t("خطأ", "Error"),
        description: t("حدث خطأ أثناء الحذف", "Error while deleting"),
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  /* ── Dialog Openers ── */
  const openAdd = () => {
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview(null);
    setSelectedItem(null);
    setIsAddOpen(true);
  };

  const openEdit = (item: NewsItem) => {
    setSelectedItem(item);
    setForm({
      title_ar: item.title_ar,
      title_en: item.title_en,
      description_ar: item.description_ar,
      description_en: item.description_en,
      link: item.link ?? "",
    });
    setImageFile(null);
    setImagePreview(getImageUrl(item.image));
    setIsEditOpen(true);
  };

  const closeModal = () => {
    setIsAddOpen(false);
    setIsEditOpen(false);
  };

  /* ── Filtering ── */
  const filtered = news.filter((n) =>
    n.title_ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.title_en.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ══════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════ */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-primary" />
            {t("إدارة الأخبار", "News Management")}
          </h2>
          <p className="text-muted-foreground mt-1">
            {t("أضف وعدّل واحذف أخبار الجمعية المعروضة في موقع الويب", "Add, edit and delete SPTA news displayed on the website")}
          </p>
        </div>
        <Button onClick={openAdd} className="gap-2 shrink-0">
          <Plus className="w-4 h-4" />
          {t("إضافة خبر جديد", "Add News")}
        </Button>
      </div>

      {/* Table Card */}
      <Card>
        <CardHeader>
          <div className="relative">
            <Search
              className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? "right-3" : "left-3"} w-4 h-4 text-muted-foreground`}
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
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>{t("لا توجد أخبار", "No news items found")}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-start p-4 font-semibold text-muted-foreground">{t("الصورة", "Image")}</th>
                    <th className="text-start p-4 font-semibold text-muted-foreground">{t("العنوان (ع)", "Title (AR)")}</th>
                    <th className="text-start p-4 font-semibold text-muted-foreground">{t("العنوان (EN)", "Title (EN)")}</th>
                    <th className="text-start p-4 font-semibold text-muted-foreground">{t("الرابط", "Link")}</th>
                    <th className="text-start p-4 font-semibold text-muted-foreground">{t("تاريخ النشر", "Published")}</th>
                    <th className="text-start p-4 font-semibold text-muted-foreground">{t("الإجراءات", "Actions")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <AnimatePresence>
                    {filtered.map((item) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        {/* Image */}
                        <td className="p-4">
                          {getImageUrl(item.image) ? (
                            <img
                              src={getImageUrl(item.image)!}
                              alt={item.title_en}
                              className="w-16 h-12 object-cover rounded-md border bg-white"
                            />
                          ) : (
                            <div className="w-16 h-12 rounded-md border bg-muted flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-muted-foreground/40" />
                            </div>
                          )}
                        </td>

                        {/* Title AR */}
                        <td className="p-4">
                          <p className="font-medium line-clamp-2 max-w-[180px]" dir="rtl">{item.title_ar}</p>
                        </td>

                        {/* Title EN */}
                        <td className="p-4">
                          <p className="text-muted-foreground line-clamp-2 max-w-[180px]">{item.title_en}</p>
                        </td>

                        {/* Link */}
                        <td className="p-4">
                          {item.link ? (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center gap-1 text-xs"
                            >
                              <ExternalLink className="w-3 h-3" />
                              {t("زيارة", "Visit")}
                            </a>
                          ) : (
                            <Badge variant="outline" className="text-xs text-muted-foreground">{t("لا يوجد", "None")}</Badge>
                          )}
                        </td>

                        {/* Date */}
                        <td className="p-4">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                            <Calendar className="w-3 h-3" />
                            {formatDate(item.created_at, language)}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEdit(item)}
                              className="text-blue-500 hover:text-blue-600 hover:bg-blue-500/10"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => { setSelectedItem(item); setIsDeleteOpen(true); }}
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

      {/* Add / Edit Dialog */}
      <Dialog open={isAddOpen || isEditOpen} onOpenChange={(v) => !v && closeModal()}>
        <DialogContent className="sm:max-w-[620px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-primary" />
              {isEditOpen ? t("تعديل الخبر", "Edit News Item") : t("إضافة خبر جديد", "Add New News Item")}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-5 pt-2">
            {/* Image Upload */}
            <div
              className="w-full h-44 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors relative overflow-hidden group"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-muted-foreground gap-2">
                  <ImageIcon className="w-8 h-8 opacity-40" />
                  <span className="text-sm">{t("صورة الخبر (اختيارية)", "News Image (optional)")}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm font-medium">{t("تغيير الصورة", "Change Image")}</span>
              </div>
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />

            {/* Bilingual Titles */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("العنوان بالعربية", "Title (Arabic)")} <span className="text-destructive">*</span></Label>
                <Input
                  required
                  dir="rtl"
                  value={form.title_ar}
                  onChange={(e) => setForm({ ...form, title_ar: e.target.value })}
                  placeholder="عنوان الخبر..."
                />
              </div>
              <div className="space-y-2">
                <Label>{t("العنوان بالإنجليزية", "Title (English)")} <span className="text-destructive">*</span></Label>
                <Input
                  required
                  dir="ltr"
                  value={form.title_en}
                  onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                  placeholder="News title..."
                />
              </div>
            </div>

            {/* Bilingual Descriptions */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("الوصف بالعربية", "Description (Arabic)")} <span className="text-destructive">*</span></Label>
                <Textarea
                  required
                  dir="rtl"
                  rows={4}
                  value={form.description_ar}
                  onChange={(e) => setForm({ ...form, description_ar: e.target.value })}
                  placeholder="وصف الخبر..."
                  className="resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label>{t("الوصف بالإنجليزية", "Description (English)")} <span className="text-destructive">*</span></Label>
                <Textarea
                  required
                  dir="ltr"
                  rows={4}
                  value={form.description_en}
                  onChange={(e) => setForm({ ...form, description_en: e.target.value })}
                  placeholder="News description..."
                  className="resize-none"
                />
              </div>
            </div>

            {/* Link */}
            <div className="space-y-2">
              <Label>{t("الرابط (اختياري)", "Link (Optional)")}</Label>
              <Input
                type="url"
                dir="ltr"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="https://spta.sa/..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={closeModal}>
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

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("هل أنت متأكد؟", "Are you sure?")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t(
                "لا يمكن التراجع عن هذا الإجراء وسيتم حذف بيانات الخبر نهائياً.",
                "This action cannot be undone and the news item will be permanently deleted."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>{t("إلغاء", "Cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => { e.preventDefault(); handleDelete(); }}
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

export default AdminNewsPage;
