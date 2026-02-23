import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  GraduationCap, Search, Plus, Edit, Trash2, Loader2, AlertTriangle, Calendar, MapPin, Users, Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import api from '@/services/api';

interface Workshop {
  id: number;
  title?: string;
  titleAr?: string;
  titleEn?: string;
  title_ar?: string;
  title_en?: string;
  description?: string;
  descriptionAr?: string;
  description_ar?: string;
  date?: string;
  time?: string;
  location?: string;
  locationAr?: string;
  location_ar?: string;
  instructor?: string;
  seats?: number;
  registeredCount?: number;
  price?: number;
  member_price?: number;
  status?: string;
}

const AdminWorkshopsPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<Workshop | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const emptyForm = {
    title_en: '', title_ar: '', description: '', description_ar: '',
    date: '', time: '', location: '', location_ar: '',
    instructor: '', seats: '', price: '', member_price: '',
  };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => { fetchWorkshops(); }, []);

  const fetchWorkshops = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/workshops');
      const data = res.data?.data || res.data || [];
      setWorkshops(Array.isArray(data) ? data : []);
    } catch {
      toast({ title: t('خطأ', 'Error'), description: t('فشل التحميل', 'Failed to load'), variant: 'destructive' });
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
      title_en: w.titleEn || w.title_en || w.title || '',
      title_ar: w.titleAr || w.title_ar || '',
      description: w.description || '',
      description_ar: w.descriptionAr || w.description_ar || '',
      date: w.date || '',
      time: w.time || '',
      location: w.location || '',
      location_ar: w.locationAr || w.location_ar || '',
      instructor: w.instructor || '',
      seats: String(w.seats || ''),
      price: String(w.price || ''),
      member_price: String(w.member_price || ''),
    });
    setIsFormOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        ...form,
        seats: form.seats ? parseInt(form.seats) : null,
        price: form.price ? parseFloat(form.price) : null,
        member_price: form.member_price ? parseFloat(form.member_price) : null,
      };
      if (editMode && selected) {
        await api.put(`/admin/workshops/${selected.id}`, payload);
        toast({ title: t('تم التحديث', 'Updated') });
      } else {
        await api.post('/admin/workshops', payload);
        toast({ title: t('تم الإنشاء', 'Created') });
      }
      setIsFormOpen(false);
      fetchWorkshops();
    } catch (err: any) {
      toast({ title: t('خطأ', 'Error'), description: err.response?.data?.message || t('حدث خطأ', 'Error'), variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    setIsSaving(true);
    try {
      await api.delete(`/admin/workshops/${selected.id}`);
      toast({ title: t('تم الحذف', 'Deleted') });
      setIsDeleteOpen(false);
      setSelected(null);
      fetchWorkshops();
    } catch (err: any) {
      toast({ title: t('خطأ', 'Error'), description: err.response?.data?.message || t('حدث خطأ', 'Error'), variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = workshops.filter(w => {
    const name = w.titleEn || w.title_en || w.title || w.titleAr || w.title_ar || '';
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getName = (w: Workshop) => t(w.titleAr || w.title_ar || w.title || '', w.titleEn || w.title_en || w.title || '');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            {t('إدارة ورش العمل', 'Workshops Management')}
          </h2>
          <p className="text-muted-foreground">{t('إنشاء وتعديل وحذف ورش العمل', 'Create, edit and delete workshops')}</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          {t('إضافة ورشة', 'Add Workshop')}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'} w-4 h-4 text-muted-foreground`} />
            <Input
              placeholder={t('بحث...', 'Search...')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={isRTL ? 'pr-10' : 'pl-10'}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-14 w-full rounded-lg" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground">{t('لا توجد ورش عمل', 'No workshops found')}</p>
              <Button onClick={openCreate} variant="outline" className="mt-4 gap-2">
                <Plus className="w-4 h-4" />
                {t('أنشئ أول ورشة', 'Create first workshop')}
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-start p-4 font-semibold text-sm">{t('الاسم', 'Name')}</th>
                    <th className="text-start p-4 font-semibold text-sm">{t('التاريخ', 'Date')}</th>
                    <th className="text-start p-4 font-semibold text-sm">{t('المقاعد', 'Seats')}</th>
                    <th className="text-start p-4 font-semibold text-sm">{t('السعر', 'Price')}</th>
                    <th className="text-start p-4 font-semibold text-sm">{t('الحالة', 'Status')}</th>
                    <th className="text-start p-4 font-semibold text-sm">{t('الإجراءات', 'Actions')}</th>
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
                      <td className="p-4 font-medium text-sm">{getName(w)}</td>
                      <td className="p-4 text-sm text-muted-foreground">{w.date || '—'}</td>
                      <td className="p-4 text-sm text-muted-foreground">{w.registeredCount || 0}/{w.seats || '—'}</td>
                      <td className="p-4 text-sm">
                        <span className="font-bold text-primary">{w.price || 0}</span>
                        <span className="text-muted-foreground text-xs ms-1">{t('ريال', 'SAR')}</span>
                      </td>
                      <td className="p-4">
                        <Badge variant={w.status === 'open' ? 'default' : 'secondary'} className="text-xs">
                          {w.status || 'open'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="ghost" onClick={() => openEdit(w)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive" onClick={() => { setSelected(w); setIsDeleteOpen(true); }}>
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
            <DialogTitle>{editMode ? t('تعديل الورشة', 'Edit Workshop') : t('إضافة ورشة', 'Add Workshop')}</DialogTitle>
            <DialogDescription>{editMode ? t('عدّل بيانات الورشة', 'Update workshop details') : t('أدخل بيانات الورشة الجديدة', 'Enter new workshop details')}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('العنوان (English)', 'Title (English)')}</Label>
                <Input value={form.title_en} onChange={e => setForm({ ...form, title_en: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>{t('العنوان (عربي)', 'Title (Arabic)')}</Label>
                <Input value={form.title_ar} onChange={e => setForm({ ...form, title_ar: e.target.value })} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('الوصف (English)', 'Description (English)')}</Label>
                <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>{t('الوصف (عربي)', 'Description (Arabic)')}</Label>
                <Textarea value={form.description_ar} onChange={e => setForm({ ...form, description_ar: e.target.value })} rows={3} />
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{t('التاريخ', 'Date')}</Label>
                <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>{t('الوقت', 'Time')}</Label>
                <Input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>{t('المدرب', 'Instructor')}</Label>
                <Input value={form.instructor} onChange={e => setForm({ ...form, instructor: e.target.value })} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('الموقع (English)', 'Location (English)')}</Label>
                <Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>{t('الموقع (عربي)', 'Location (Arabic)')}</Label>
                <Input value={form.location_ar} onChange={e => setForm({ ...form, location_ar: e.target.value })} />
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{t('المقاعد', 'Seats')}</Label>
                <Input type="number" value={form.seats} onChange={e => setForm({ ...form, seats: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>{t('السعر', 'Price (SAR)')}</Label>
                <Input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>{t('سعر الأعضاء', 'Member Price')}</Label>
                <Input type="number" value={form.member_price} onChange={e => setForm({ ...form, member_price: e.target.value })} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>{t('إلغاء', 'Cancel')}</Button>
            <Button onClick={handleSave} disabled={isSaving} className="gap-2">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : editMode ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {editMode ? t('حفظ', 'Save') : t('إنشاء', 'Create')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              {t('تأكيد الحذف', 'Confirm Delete')}
            </DialogTitle>
            <DialogDescription>{t('هل أنت متأكد؟', 'Are you sure?')}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>{t('إلغاء', 'Cancel')}</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isSaving} className="gap-2">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              {t('حذف', 'Delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminWorkshopsPage;
