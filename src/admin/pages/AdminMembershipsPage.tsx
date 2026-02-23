import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Crown, Plus, Search, Edit, Trash2, Loader2, AlertTriangle, CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import api from '@/services/api';

interface Membership {
  id: number;
  name: string;
  name_ar?: string;
  description?: string;
  type?: string;
  price?: number;
  workshop_discount?: number;
  is_free?: boolean;
  is_active?: boolean;
  created_at?: string;
}

const AdminMembershipsPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<Membership | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const membershipTypeOptions = [
    { value: 'active_member', labelAr: 'عضو عامل', labelEn: 'Active Member' },
    { value: 'associative_member', labelAr: 'عضو منتسب', labelEn: 'Associate Member' },
    { value: 'student', labelAr: 'طالب', labelEn: 'Student' },
    { value: 'internship_member', labelAr: 'طالب امتياز', labelEn: 'Intern Student' },
  ];

  const emptyForm = {
    name: '', name_ar: '', type: 'active_member', description: '',
    price: '', workshop_discount: '', is_free: false, is_active: true,
  };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => { fetchMemberships(); }, []);

  const fetchMemberships = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/admin/memberships');
      const data = res.data?.data || res.data || [];
      setMemberships(Array.isArray(data) ? data : []);
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

  const openEdit = (m: Membership) => {
    setEditMode(true);
    setSelected(m);
    setForm({
      name: m.name, name_ar: m.name_ar || '', type: m.type || 'active_member',
      description: m.description || '', price: String(m.price || ''),
      workshop_discount: String(m.workshop_discount || ''),
      is_free: m.is_free || false, is_active: m.is_active !== false,
    });
    setIsFormOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.name_ar) return;
    setIsSaving(true);
    try {
      const payload = {
        name: form.name, name_ar: form.name_ar, type: form.type,
        description: form.description,
        price: form.price ? parseFloat(form.price) : 0,
        workshop_discount: form.workshop_discount ? parseInt(form.workshop_discount) : 0,
        is_free: form.is_free, is_active: form.is_active,
      };
      if (editMode && selected) {
        await api.put(`/admin/memberships/${selected.id}`, payload);
        toast({ title: t('تم التحديث', 'Updated') });
      } else {
        await api.post('/admin/memberships', payload);
        toast({ title: t('تم الإنشاء', 'Created') });
      }
      setIsFormOpen(false);
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
      toast({ title: t('تم الحذف', 'Deleted') });
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

  const getTypeLabel = (type?: string) => {
    const opt = membershipTypeOptions.find(o => o.value === type);
    return opt ? t(opt.labelAr, opt.labelEn) : type || '—';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Crown className="w-6 h-6 text-primary" />
            {t('إدارة العضويات', 'Memberships Management')}
          </h2>
          <p className="text-muted-foreground">{t('إنشاء وتعديل أنواع العضويات', 'Create and manage membership types')}</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          {t('إضافة عضوية', 'Add Membership')}
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
              <Crown className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground">{t('لا توجد عضويات', 'No memberships yet')}</p>
              <Button onClick={openCreate} variant="outline" className="mt-4 gap-2">
                <Plus className="w-4 h-4" />{t('أنشئ أول عضوية', 'Create first')}
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-start p-4 font-semibold text-sm">{t('الاسم', 'Name')}</th>
                    <th className="text-start p-4 font-semibold text-sm">{t('النوع', 'Type')}</th>
                    <th className="text-start p-4 font-semibold text-sm">{t('السعر', 'Price')}</th>
                    <th className="text-start p-4 font-semibold text-sm">{t('الخصم', 'Discount')}</th>
                    <th className="text-start p-4 font-semibold text-sm">{t('الحالة', 'Status')}</th>
                    <th className="text-start p-4 font-semibold text-sm">{t('الإجراءات', 'Actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m, i) => (
                    <motion.tr
                      key={m.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-t border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <p className="font-medium text-sm">{t(m.name_ar || m.name, m.name)}</p>
                        {m.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{m.description}</p>}
                      </td>
                      <td className="p-4"><Badge variant="secondary" className="text-xs">{getTypeLabel(m.type)}</Badge></td>
                      <td className="p-4 text-sm">
                        {m.is_free ? (
                          <Badge variant="outline" className="bg-green-accent/10 text-green-accent border-green-accent/30 text-xs">{t('مجاني', 'Free')}</Badge>
                        ) : (
                          <><span className="font-bold text-primary">{m.price}</span> <span className="text-xs text-muted-foreground">{t('ريال', 'SAR')}</span></>
                        )}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{m.workshop_discount || 0}%</td>
                      <td className="p-4">
                        <Badge variant={m.is_active !== false ? 'default' : 'secondary'} className="text-xs gap-1">
                          {m.is_active !== false ? <><CheckCircle className="w-3 h-3" />{t('نشط', 'Active')}</> : t('معطل', 'Inactive')}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="ghost" onClick={() => openEdit(m)}><Edit className="w-4 h-4" /></Button>
                          <Button size="sm" variant="ghost" className="text-destructive" onClick={() => { setSelected(m); setIsDeleteOpen(true); }}>
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
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editMode ? t('تعديل العضوية', 'Edit Membership') : t('إضافة عضوية', 'Add Membership')}</DialogTitle>
            <DialogDescription>{editMode ? t('عدّل البيانات', 'Update details') : t('أدخل بيانات العضوية الجديدة', 'Enter new membership details')}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('الاسم (English)', 'Name (English)')} *</Label>
                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>{t('الاسم (عربي)', 'Name (Arabic)')} *</Label>
                <Input value={form.name_ar} onChange={e => setForm({ ...form, name_ar: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t('النوع', 'Type')} *</Label>
              <Select value={form.type} onValueChange={v => setForm({ ...form, type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {membershipTypeOptions.map(o => (
                    <SelectItem key={o.value} value={o.value}>{t(o.labelAr, o.labelEn)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t('الوصف', 'Description')}</Label>
              <Input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('السعر (ريال)', 'Price (SAR)')}</Label>
                <Input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} disabled={form.is_free} />
              </div>
              <div className="space-y-2">
                <Label>{t('خصم الورش %', 'Workshop Discount %')}</Label>
                <Input type="number" min="0" max="100" value={form.workshop_discount} onChange={e => setForm({ ...form, workshop_discount: e.target.value })} />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={form.is_free} onCheckedChange={v => setForm({ ...form, is_free: v, price: v ? '0' : form.price })} />
                <Label>{t('مجاني', 'Free')}</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.is_active} onCheckedChange={v => setForm({ ...form, is_active: v })} />
                <Label>{t('نشط', 'Active')}</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>{t('إلغاء', 'Cancel')}</Button>
            <Button onClick={handleSave} disabled={isSaving || !form.name || !form.name_ar} className="gap-2">
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
              <AlertTriangle className="w-5 h-5" />{t('تأكيد الحذف', 'Confirm Delete')}
            </DialogTitle>
            <DialogDescription>{t('هل أنت متأكد؟ لا يمكن التراجع.', 'Are you sure? This cannot be undone.')}</DialogDescription>
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

export default AdminMembershipsPage;
