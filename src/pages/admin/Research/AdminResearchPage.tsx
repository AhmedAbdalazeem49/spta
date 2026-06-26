import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import {
  FileText,
  Search,
  Plus,
  Loader2,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
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

export interface ResearchItem {
  id: number;
  title: string;
  type: "research" | "questionnaire";
  link: string;
  created_at: string;
}

const AdminResearchPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  const [items, setItems] = useState<ResearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const [selectedItem, setSelectedItem] = useState<ResearchItem | null>(null);

  const [form, setForm] = useState({
    title: "",
    type: "research",
    link: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchItems = async (p = 1, search = "", type = "all") => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      params.append("page", p.toString());
      if (search) params.append("search", search);
      if (type && type !== "all") params.append("type", type);

      const response = await api.get(`/admin/research-items?${params.toString()}`);
      setItems(response.data.data);
      setLastPage(response.data.last_page);
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
    const delayDebounceFn = setTimeout(() => {
      fetchItems(1, searchQuery, typeFilter);
      setPage(1);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, typeFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.link) {
      toast({
        title: t("خطأ", "Error"),
        description: t("الرجاء تعبئة جميع الحقول المطلوبة", "Please fill all required fields"),
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);
      await api.post("/admin/research-items", form);
      toast({
        title: t("تم بنجاح", "Success"),
        description: t("تمت الإضافة بنجاح", "Added successfully"),
      });
      setIsAddOpen(false);
      fetchItems(1, searchQuery, typeFilter);
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

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || !form.title || !form.link) return;

    try {
      setIsSaving(true);
      await api.put(`/admin/research-items/${selectedItem.id}`, form);
      toast({
        title: t("تم بنجاح", "Success"),
        description: t("تم التحديث بنجاح", "Updated successfully"),
      });
      setIsEditOpen(false);
      fetchItems(page, searchQuery, typeFilter);
    } catch (error) {
      toast({
        title: t("خطأ", "Error"),
        description: t("حدث خطأ أثناء التحديث", "Error while updating"),
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    try {
      setIsDeleting(true);
      await api.delete(`/admin/research-items/${selectedItem.id}`);
      toast({
        title: t("تم بنجاح", "Success"),
        description: t("تم الحذف بنجاح", "Deleted successfully"),
      });
      setIsDeleteOpen(false);
      fetchItems(page, searchQuery, typeFilter);
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
    setForm({ title: "", type: "research", link: "" });
    setIsAddOpen(true);
  };

  const openEdit = (item: ResearchItem) => {
    setSelectedItem(item);
    setForm({ title: item.title, type: item.type, link: item.link });
    setIsEditOpen(true);
  };

  const getTypeLabel = (type: string) => {
    return type === "research" ? t("بحث", "Research") : t("استبيان", "Questionnaire");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            {t("الأبحاث والاستبيانات", "Research & Questionnaires")}
          </h2>
          <p className="text-muted-foreground mt-1">
            {t("إدارة الأبحاث التجريبية والاستبيانات البحثية", "Manage empirical research and questionnaires")}
          </p>
        </div>
        <Button onClick={openAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          {t("إضافة جديد", "Add New")}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
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
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder={t("النوع", "Type")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("الكل", "All")}</SelectItem>
                <SelectItem value="research">{t("بحث", "Research")}</SelectItem>
                <SelectItem value="questionnaire">{t("استبيان", "Questionnaire")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            </div>
          ) : items.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>{t("لا توجد نتائج", "No results found")}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-start p-4 font-semibold text-muted-foreground">#</th>
                    <th className="text-start p-4 font-semibold text-muted-foreground">{t("العنوان", "Title")}</th>
                    <th className="text-start p-4 font-semibold text-muted-foreground">{t("النوع", "Type")}</th>
                    <th className="text-start p-4 font-semibold text-muted-foreground">{t("الرابط", "Link")}</th>
                    <th className="text-start p-4 font-semibold text-muted-foreground">{t("الإجراءات", "Actions")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <AnimatePresence>
                    {items.map((item, index) => (
                      <motion.tr 
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4 text-muted-foreground text-xs">
                          {(page - 1) * 15 + index + 1}
                        </td>
                        <td className="p-4 font-medium max-w-[300px] truncate" title={item.title}>
                          {item.title}
                        </td>
                        <td className="p-4">
                          <Badge variant={item.type === 'research' ? 'default' : 'secondary'}>
                            {getTypeLabel(item.type)}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1 text-xs"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {t("عرض الرابط", "View Link")}
                          </a>
                        </td>
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
                              onClick={() => {
                                setSelectedItem(item);
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
          
          {/* Pagination */}
          {!isLoading && lastPage > 1 && (
            <div className="flex items-center justify-center gap-2 p-4 border-t">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
                {t("السابق", "Previous")}
              </Button>
              <span className="text-sm text-muted-foreground">
                {page} / {lastPage}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page === lastPage}
                onClick={() => setPage(p => p + 1)}
              >
                {t("التالي", "Next")}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add / Edit Modal */}
      <Dialog open={isAddOpen || isEditOpen} onOpenChange={(val) => {
        if (!val) {
          setIsAddOpen(false);
          setIsEditOpen(false);
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditOpen ? t("تعديل", "Edit") : t("إضافة جديد", "Add New")}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={isEditOpen ? handleEdit : handleAdd} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>{t("العنوان", "Title")}</Label>
              <Input
                required
                value={form.title}
                onChange={e => setForm({...form, title: e.target.value})}
                placeholder={t("أدخل العنوان...", "Enter title...")}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("النوع", "Type")}</Label>
              <Select value={form.type} onValueChange={v => setForm({...form, type: v})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="research">{t("بحث", "Research")}</SelectItem>
                  <SelectItem value="questionnaire">{t("استبيان", "Questionnaire")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("الرابط", "Link")}</Label>
              <Input
                required
                type="url"
                value={form.link}
                onChange={e => setForm({...form, link: e.target.value})}
                placeholder="https://..."
                dir="ltr"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }}>
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

      {/* Delete Alert */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("هل أنت متأكد؟", "Are you sure?")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.")}
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

export default AdminResearchPage;
