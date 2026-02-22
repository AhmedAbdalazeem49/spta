import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Users, Plus, Search, Edit, Trash2, Loader2, Crown, CheckCircle, X, Clock, AlertTriangle, ShieldAlert
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import AuthHero from '@/components/auth/AuthHero';

interface Membership {
  id: number;
  name: string;
  name_ar?: string;
  description?: string;
  description_ar?: string;
  price: number;
  duration_months: number;
  status?: string;
  created_at?: string;
}

const AdminMembershipsPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<Membership | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    name: '', name_ar: '', description: '', description_ar: '', price: '', duration_months: '12',
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/admin/memberships');
      const data = res.data?.data || res.data || [];
      setMemberships(Array.isArray(data) ? data : []);
    } catch {
      toast({ title: t('خطأ', 'Error'), description: t('فشل تحميل البيانات', 'Failed to load data'), variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => setForm({ name: '', name_ar: '', description: '', description_ar: '', price: '', duration_months: '12' });

  const handleCreate = async () => {
    if (!form.name || !form.price) return;
    setIsSaving(true);
    try {
      await api.post('/admin/memberships', {
        name: form.name, name_ar: form.name_ar, description: form.description,
        description_ar: form.description_ar, price: parseFloat(form.price),
        duration_months: parseInt(form.duration_months),
      });
      toast({ title: t('تم بنجاح', 'Success'), description: t('تمت إضافة العضوية', 'Membership created') });
      setIsCreateOpen(false);
      resetForm();
      fetchMemberships();
    } catch (err: any) {
      toast({ title: t('خطأ', 'Error'), description: err.response?.data?.message || t('حدث خطأ', 'Error'), variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const openEdit = (m: Membership) => {
    setSelected(m);
    setForm({
      name: m.name, name_ar: m.name_ar || '', description: m.description || '',
      description_ar: m.description_ar || '', price: String(m.price), duration_months: String(m.duration_months),
    });
    setIsEditOpen(true);
  };

  const handleEdit = async () => {
    if (!selected) return;
    setIsSaving(true);
    try {
      await api.put(`/admin/memberships/${selected.id}`, {
        name: form.name, name_ar: form.name_ar, description: form.description,
        description_ar: form.description_ar, price: parseFloat(form.price),
        duration_months: parseInt(form.duration_months),
      });
      toast({ title: t('تم بنجاح', 'Success'), description: t('تم التحديث', 'Updated successfully') });
      setIsEditOpen(false);
      resetForm();
      fetchMemberships();
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
      await api.delete(`/admin/memberships/${selected.id}`);
      toast({ title: t('تم بنجاح', 'Success'), description: t('تم الحذف', 'Deleted successfully') });
      setIsDeleteOpen(false);
      setSelected(null);
      fetchMemberships();
    } catch (err: any) {
      toast({ title: t('خطأ', 'Error'), description: err.response?.data?.message || t('حدث خطأ', 'Error'), variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = memberships.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.name_ar && m.name_ar.includes(searchQuery))
  );

  // Form dialog shared content
  const FormFields = () => (
    <div className="grid gap-4 py-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t('الاسم (English)', 'Name (English)')}</Label>
          <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Active Member" />
        </div>
        <div className="space-y-2">
          <Label>{t('الاسم (عربي)', 'Name (Arabic)')}</Label>
          <Input value={form.name_ar} onChange={e => setForm({ ...form, name_ar: e.target.value })} placeholder="عضو عامل" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t('الوصف (English)', 'Description (English)')}</Label>
          <Input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>{t('الوصف (عربي)', 'Description (Arabic)')}</Label>
          <Input value={form.description_ar} onChange={e => setForm({ ...form, description_ar: e.target.value })} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t('السعر (ريال)', 'Price (SAR)')}</Label>
          <Input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="500" />
        </div>
        <div className="space-y-2">
          <Label>{t('المدة (شهر)', 'Duration (months)')}</Label>
          <Input type="number" value={form.duration_months} onChange={e => setForm({ ...form, duration_months: e.target.value })} placeholder="12" />
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <AuthHero
        titleAr="إدارة العضويات"
        titleEn="Membership Management"
        subtitleAr="إنشاء وتعديل وحذف أنواع العضويات"
        subtitleEn="Create, edit, and delete membership types"
      />

      <section className="py-12 -mt-6 relative z-10">
        <div className="container-custom">
          <Card data-aos="fade-up" className="shadow-lg">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Crown className="w-5 h-5 text-primary" />
                  {t('أنواع العضوية', 'Membership Types')}
                </CardTitle>
                <Button onClick={() => { resetForm(); setIsCreateOpen(true); }} className="gap-2">
                  <Plus className="w-4 h-4" />
                  {t('إضافة نوع', 'Add Type')}
                </Button>
              </div>
              <div className="relative mt-4">
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
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full rounded-lg" />)}
                </div>
              ) : filtered.length === 0 ? (
                <div className="p-12 text-center">
                  <Crown className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">{t('لا توجد عضويات بعد', 'No memberships yet')}</p>
                  <Button onClick={() => { resetForm(); setIsCreateOpen(true); }} variant="outline" className="mt-4 gap-2">
                    <Plus className="w-4 h-4" />
                    {t('أنشئ أول عضوية', 'Create first membership')}
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-start p-4 font-semibold">{t('الاسم', 'Name')}</th>
                        <th className="text-start p-4 font-semibold">{t('السعر', 'Price')}</th>
                        <th className="text-start p-4 font-semibold">{t('المدة', 'Duration')}</th>
                        <th className="text-start p-4 font-semibold">{t('الإجراءات', 'Actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {filtered.map((m, i) => (
                          <motion.tr
                            key={m.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ delay: i * 0.05 }}
                            className="border-t border-border hover:bg-muted/30 transition-colors"
                          >
                            <td className="p-4">
                              <p className="font-medium">{t(m.name_ar || m.name, m.name)}</p>
                              {m.description && <p className="text-xs text-muted-foreground mt-1">{t(m.description_ar || m.description, m.description)}</p>}
                            </td>
                            <td className="p-4">
                              <span className="font-bold text-primary">{m.price}</span>
                              <span className="text-muted-foreground text-sm ms-1">{t('ريال', 'SAR')}</span>
                            </td>
                            <td className="p-4 text-muted-foreground">
                              {m.duration_months} {t('شهر', 'months')}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline" onClick={() => openEdit(m)} className="gap-1">
                                  <Edit className="w-3.5 h-3.5" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => { setSelected(m); setIsDeleteOpen(true); }}
                                  className="gap-1 text-destructive hover:bg-destructive hover:text-destructive-foreground">
                                  <Trash2 className="w-3.5 h-3.5" />
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
        </div>
      </section>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t('إضافة نوع عضوية', 'Add Membership Type')}</DialogTitle>
            <DialogDescription>{t('أدخل بيانات العضوية الجديدة', 'Enter new membership details')}</DialogDescription>
          </DialogHeader>
          <FormFields />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>{t('إلغاء', 'Cancel')}</Button>
            <Button onClick={handleCreate} disabled={isSaving} className="gap-2">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {t('إضافة', 'Create')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t('تعديل العضوية', 'Edit Membership')}</DialogTitle>
            <DialogDescription>{t('عدّل بيانات العضوية', 'Update membership details')}</DialogDescription>
          </DialogHeader>
          <FormFields />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>{t('إلغاء', 'Cancel')}</Button>
            <Button onClick={handleEdit} disabled={isSaving} className="gap-2">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit className="w-4 h-4" />}
              {t('حفظ', 'Save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              {t('تأكيد الحذف', 'Confirm Delete')}
            </DialogTitle>
            <DialogDescription>
              {t('هل أنت متأكد من حذف هذه العضوية؟ لا يمكن التراجع.', 'Are you sure you want to delete this membership? This cannot be undone.')}
            </DialogDescription>
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
    </Layout>
  );
};

export default AdminMembershipsPage;
