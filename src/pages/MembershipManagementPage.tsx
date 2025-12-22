import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Users, 
  Crown, 
  GraduationCap, 
  Star,
  Check,
  X,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  Award,
  Percent
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Membership types data
const membershipTypes = [
  {
    id: 'active',
    nameAr: 'عضو عامل',
    nameEn: 'Active Member',
    priceAnnual: 500,
    icon: Crown,
    color: 'from-amber-500 to-yellow-500',
    benefits: [
      { ar: 'حضور جميع ورش العمل', en: 'Access to all workshops' },
      { ar: 'خصم 30% على الفعاليات', en: '30% discount on events' },
      { ar: 'الوصول للمكتبة الإلكترونية', en: 'E-Library access' },
      { ar: 'بطاقة عضوية رقمية', en: 'Digital membership card' },
      { ar: 'حق التصويت', en: 'Voting rights' },
    ],
    discount: 30,
  },
  {
    id: 'associate',
    nameAr: 'عضو منتسب',
    nameEn: 'Associate Member',
    priceAnnual: 300,
    icon: Users,
    color: 'from-blue-500 to-cyan-500',
    benefits: [
      { ar: 'حضور ورش العمل المحددة', en: 'Access to selected workshops' },
      { ar: 'خصم 20% على الفعاليات', en: '20% discount on events' },
      { ar: 'الوصول للمكتبة الإلكترونية', en: 'E-Library access' },
      { ar: 'بطاقة عضوية رقمية', en: 'Digital membership card' },
    ],
    discount: 20,
  },
  {
    id: 'student',
    nameAr: 'طالب',
    nameEn: 'Student',
    priceAnnual: 100,
    icon: GraduationCap,
    color: 'from-green-500 to-emerald-500',
    benefits: [
      { ar: 'حضور ورش العمل التعليمية', en: 'Access to educational workshops' },
      { ar: 'خصم 40% على الفعاليات', en: '40% discount on events' },
      { ar: 'الوصول للمكتبة الإلكترونية', en: 'E-Library access' },
      { ar: 'بطاقة عضوية رقمية', en: 'Digital membership card' },
    ],
    discount: 40,
  },
  {
    id: 'intern',
    nameAr: 'طالب امتياز',
    nameEn: 'Intern Student',
    priceAnnual: 150,
    icon: Star,
    color: 'from-purple-500 to-pink-500',
    benefits: [
      { ar: 'حضور جميع ورش العمل', en: 'Access to all workshops' },
      { ar: 'خصم 35% على الفعاليات', en: '35% discount on events' },
      { ar: 'الوصول للمكتبة الإلكترونية', en: 'E-Library access' },
      { ar: 'بطاقة عضوية رقمية', en: 'Digital membership card' },
      { ar: 'إرشاد مهني', en: 'Career mentorship' },
    ],
    discount: 35,
  },
];

// Mock members data
const initialMembers = [
  { id: 1, nameAr: 'أحمد محمد', nameEn: 'Ahmed Mohammed', email: 'ahmed@example.com', type: 'active', status: 'active', expiryDate: '2025-06-15', joinDate: '2023-06-15' },
  { id: 2, nameAr: 'سارة العلي', nameEn: 'Sara Al-Ali', email: 'sara@example.com', type: 'student', status: 'active', expiryDate: '2024-12-01', joinDate: '2023-12-01' },
  { id: 3, nameAr: 'محمد القحطاني', nameEn: 'Mohammed Al-Qahtani', email: 'moh@example.com', type: 'associate', status: 'expired', expiryDate: '2024-01-15', joinDate: '2023-01-15' },
  { id: 4, nameAr: 'نورة السعيد', nameEn: 'Noura Al-Saeed', email: 'noura@example.com', type: 'intern', status: 'pending', expiryDate: '2025-03-20', joinDate: '2024-03-20' },
  { id: 5, nameAr: 'خالد العمري', nameEn: 'Khaled Al-Omari', email: 'khaled@example.com', type: 'active', status: 'active', expiryDate: '2025-08-10', joinDate: '2022-08-10' },
];

const MembershipManagementPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [members, setMembers] = useState(initialMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<typeof members[0] | null>(null);
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    email: '',
    type: 'active',
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.nameAr.includes(searchQuery) || 
                          member.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || member.type === filterType;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreate = () => {
    const newMember = {
      id: Date.now(),
      ...formData,
      status: 'active',
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      joinDate: new Date().toISOString().split('T')[0],
    };
    setMembers([...members, newMember]);
    setIsCreateOpen(false);
    setFormData({ nameAr: '', nameEn: '', email: '', type: 'active' });
    toast({
      title: t('تم بنجاح', 'Success'),
      description: t('تمت إضافة العضو بنجاح', 'Member added successfully'),
    });
  };

  const handleEdit = () => {
    if (!selectedMember) return;
    setMembers(members.map(m => 
      m.id === selectedMember.id 
        ? { ...m, ...formData }
        : m
    ));
    setIsEditOpen(false);
    setSelectedMember(null);
    toast({
      title: t('تم بنجاح', 'Success'),
      description: t('تم تحديث بيانات العضو', 'Member updated successfully'),
    });
  };

  const handleDelete = () => {
    if (!selectedMember) return;
    setMembers(members.filter(m => m.id !== selectedMember.id));
    setIsDeleteOpen(false);
    setSelectedMember(null);
    toast({
      title: t('تم بنجاح', 'Success'),
      description: t('تم حذف العضو', 'Member deleted successfully'),
    });
  };

  const openEditDialog = (member: typeof members[0]) => {
    setSelectedMember(member);
    setFormData({
      nameAr: member.nameAr,
      nameEn: member.nameEn,
      email: member.email,
      type: member.type,
    });
    setIsEditOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const configs = {
      active: { color: 'bg-green-accent/10 text-green-accent border-green-accent/30', icon: CheckCircle, labelAr: 'نشط', labelEn: 'Active' },
      expired: { color: 'bg-destructive/10 text-destructive border-destructive/30', icon: X, labelAr: 'منتهي', labelEn: 'Expired' },
      pending: { color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30', icon: Clock, labelAr: 'قيد الانتظار', labelEn: 'Pending' },
    };
    const config = configs[status as keyof typeof configs] || configs.pending;
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={`${config.color} gap-1`}>
        <Icon className="w-3 h-3" />
        {t(config.labelAr, config.labelEn)}
      </Badge>
    );
  };

  const getMembershipLabel = (type: string) => {
    const membership = membershipTypes.find(m => m.id === type);
    return membership ? t(membership.nameAr, membership.nameEn) : type;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-dark via-navy to-navy-light py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              {t('إدارة العضويات', 'Membership Management')}
            </h1>
            <p className="text-xl text-blue-pale max-w-2xl mx-auto">
              {t('إدارة شاملة لاشتراكات الأعضاء السنوية', 'Comprehensive annual membership subscription management')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Membership Types */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">
            {t('أنواع العضوية والأسعار', 'Membership Types & Pricing')}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {membershipTypes.map((type, index) => (
              <Card 
                key={type.id}
                className="card-hover overflow-hidden group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className={`h-2 bg-gradient-to-r ${type.color}`} />
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <type.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t(type.nameAr, type.nameEn)}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold text-primary">{type.priceAnnual}</span>
                    <span className="text-muted-foreground">{t('ريال / سنة', 'SAR / year')}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4 text-green-accent">
                    <Percent className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {t(`خصم ${type.discount}% على الورش`, `${type.discount}% off workshops`)}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {type.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{t(benefit.ar, benefit.en)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Members Management */}
      <section className="py-16">
        <div className="container-custom">
          <Card data-aos="fade-up">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  {t('قائمة الأعضاء', 'Members List')}
                </CardTitle>
                <Button onClick={() => setIsCreateOpen(true)} className="gap-2 bg-green-accent hover:bg-green-light">
                  <Plus className="w-4 h-4" />
                  {t('إضافة عضو', 'Add Member')}
                </Button>
              </div>
              
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder={t('بحث...', 'Search...')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="ps-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="w-4 h-4 me-2" />
                    <SelectValue placeholder={t('نوع العضوية', 'Membership Type')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('الكل', 'All')}</SelectItem>
                    {membershipTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        {t(type.nameAr, type.nameEn)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder={t('الحالة', 'Status')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('الكل', 'All')}</SelectItem>
                    <SelectItem value="active">{t('نشط', 'Active')}</SelectItem>
                    <SelectItem value="expired">{t('منتهي', 'Expired')}</SelectItem>
                    <SelectItem value="pending">{t('قيد الانتظار', 'Pending')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-start p-4 font-semibold">{t('الاسم', 'Name')}</th>
                      <th className="text-start p-4 font-semibold">{t('البريد', 'Email')}</th>
                      <th className="text-start p-4 font-semibold">{t('النوع', 'Type')}</th>
                      <th className="text-start p-4 font-semibold">{t('الحالة', 'Status')}</th>
                      <th className="text-start p-4 font-semibold">{t('تاريخ الانتهاء', 'Expiry Date')}</th>
                      <th className="text-start p-4 font-semibold">{t('الإجراءات', 'Actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filteredMembers.map((member, index) => (
                        <motion.tr
                          key={member.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-t border-border hover:bg-muted/30 transition-colors"
                        >
                          <td className="p-4">
                            <p className="font-medium">{t(member.nameAr, member.nameEn)}</p>
                          </td>
                          <td className="p-4 text-muted-foreground">{member.email}</td>
                          <td className="p-4">
                            <Badge variant="secondary">{getMembershipLabel(member.type)}</Badge>
                          </td>
                          <td className="p-4">{getStatusBadge(member.status)}</td>
                          <td className="p-4 text-muted-foreground">
                            {new Date(member.expiryDate).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openEditDialog(member)}
                                className="gap-1"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedMember(member);
                                  setIsDeleteOpen(true);
                                }}
                                className="gap-1 text-destructive hover:text-destructive"
                              >
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
              
              {filteredMembers.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>{t('لا توجد نتائج', 'No results found')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              {t('إضافة عضو جديد', 'Add New Member')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t('الاسم بالعربية', 'Name in Arabic')}</Label>
              <Input
                value={formData.nameAr}
                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                placeholder={t('أدخل الاسم بالعربية', 'Enter Arabic name')}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('الاسم بالإنجليزية', 'Name in English')}</Label>
              <Input
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                placeholder={t('أدخل الاسم بالإنجليزية', 'Enter English name')}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('البريد الإلكتروني', 'Email')}</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label>{t('نوع العضوية', 'Membership Type')}</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {membershipTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {t(type.nameAr, type.nameEn)} - {type.priceAnnual} {t('ريال', 'SAR')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              {t('إلغاء', 'Cancel')}
            </Button>
            <Button onClick={handleCreate} className="bg-green-accent hover:bg-green-light">
              {t('إضافة', 'Add')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-primary" />
              {t('تعديل بيانات العضو', 'Edit Member')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t('الاسم بالعربية', 'Name in Arabic')}</Label>
              <Input
                value={formData.nameAr}
                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('الاسم بالإنجليزية', 'Name in English')}</Label>
              <Input
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('البريد الإلكتروني', 'Email')}</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('نوع العضوية', 'Membership Type')}</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {membershipTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {t(type.nameAr, type.nameEn)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              {t('إلغاء', 'Cancel')}
            </Button>
            <Button onClick={handleEdit}>
              {t('حفظ التعديلات', 'Save Changes')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="w-5 h-5" />
              {t('تأكيد الحذف', 'Confirm Delete')}
            </DialogTitle>
            <DialogDescription>
              {t(
                `هل أنت متأكد من حذف العضو "${selectedMember?.nameAr}"؟ لا يمكن التراجع عن هذا الإجراء.`,
                `Are you sure you want to delete "${selectedMember?.nameEn}"? This action cannot be undone.`
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              {t('إلغاء', 'Cancel')}
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              {t('حذف', 'Delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default MembershipManagementPage;
