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
import { Progress } from '@/components/ui/progress';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Ticket,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Copy,
  Percent,
  Gift,
  Calendar,
  Users,
  Tag,
  Clock,
  TrendingUp,
  Sparkles,
  Eye,
  EyeOff,
  Link2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock discount codes data
const initialCodes = [
  {
    id: 1,
    code: 'SPTA2024',
    type: 'discount',
    discountPercent: 20,
    maxUsage: 100,
    usedCount: 45,
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    status: 'active',
    linkedWorkshop: null,
    linkedWorkshopAr: 'جميع الورش',
    linkedWorkshopEn: 'All Workshops',
    createdAt: '2024-01-01',
  },
  {
    id: 2,
    code: 'FREE-REHAB',
    type: 'free',
    discountPercent: 100,
    maxUsage: 10,
    usedCount: 8,
    validFrom: '2024-03-01',
    validTo: '2024-03-31',
    status: 'active',
    linkedWorkshop: 1,
    linkedWorkshopAr: 'ورشة التأهيل الحركي المتقدم',
    linkedWorkshopEn: 'Advanced Motor Rehabilitation Workshop',
    createdAt: '2024-02-15',
  },
  {
    id: 3,
    code: 'MEMBER50',
    type: 'discount',
    discountPercent: 50,
    maxUsage: 50,
    usedCount: 50,
    validFrom: '2024-02-01',
    validTo: '2024-06-30',
    status: 'expired',
    linkedWorkshop: null,
    linkedWorkshopAr: 'جميع الورش',
    linkedWorkshopEn: 'All Workshops',
    createdAt: '2024-02-01',
  },
  {
    id: 4,
    code: 'NEWUSER25',
    type: 'discount',
    discountPercent: 25,
    maxUsage: 200,
    usedCount: 67,
    validFrom: '2024-01-15',
    validTo: '2024-12-31',
    status: 'active',
    linkedWorkshop: null,
    linkedWorkshopAr: 'جميع الورش',
    linkedWorkshopEn: 'All Workshops',
    createdAt: '2024-01-15',
  },
  {
    id: 5,
    code: 'VIP-SPORTS',
    type: 'free',
    discountPercent: 100,
    maxUsage: 5,
    usedCount: 5,
    validFrom: '2024-04-01',
    validTo: '2024-04-30',
    status: 'used',
    linkedWorkshop: 2,
    linkedWorkshopAr: 'ورشة العلاج الطبيعي الرياضي',
    linkedWorkshopEn: 'Sports Physical Therapy Workshop',
    createdAt: '2024-03-20',
  },
];

const DiscountCodesPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [codes, setCodes] = useState(initialCodes);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState<typeof codes[0] | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [newCode, setNewCode] = useState({
    code: '',
    type: 'discount',
    discountPercent: 10,
    maxUsage: 100,
    validFrom: '',
    validTo: '',
    linkedWorkshop: '',
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const filteredCodes = codes.filter(code => {
    const matchesSearch = code.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || code.type === filterType;
    const matchesStatus = filterStatus === 'all' || code.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: codes.length,
    active: codes.filter(c => c.status === 'active').length,
    totalUsage: codes.reduce((acc, c) => acc + c.usedCount, 0),
    avgDiscount: Math.round(codes.reduce((acc, c) => acc + c.discountPercent, 0) / codes.length),
  };

  const getTypeBadge = (type: string) => {
    if (type === 'free') {
      return (
        <Badge className="bg-green-accent/10 text-green-accent border-green-accent/30 gap-1">
          <Gift className="w-3 h-3" />
          {t('مجاني', 'Free')}
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 gap-1">
        <Percent className="w-3 h-3" />
        {t('خصم', 'Discount')}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const configs = {
      active: { color: 'bg-green-accent/10 text-green-accent border-green-accent/30', icon: CheckCircle, labelAr: 'نشط', labelEn: 'Active' },
      expired: { color: 'bg-destructive/10 text-destructive border-destructive/30', icon: Clock, labelAr: 'منتهي', labelEn: 'Expired' },
      used: { color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30', icon: AlertCircle, labelAr: 'مستنفد', labelEn: 'Used Up' },
    };
    const config = configs[status as keyof typeof configs] || configs.expired;
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={`${config.color} gap-1`}>
        <Icon className="w-3 h-3" />
        {t(config.labelAr, config.labelEn)}
      </Badge>
    );
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: t('تم النسخ', 'Copied'),
      description: t('تم نسخ الكود إلى الحافظة', 'Code copied to clipboard'),
    });
  };

  const handleCreate = () => {
    const generatedCode = newCode.code || `SPTA-${Date.now().toString(36).toUpperCase()}`;
    const newCodeItem = {
      id: codes.length + 1,
      code: generatedCode,
      type: newCode.type,
      discountPercent: newCode.type === 'free' ? 100 : newCode.discountPercent,
      maxUsage: newCode.maxUsage,
      usedCount: 0,
      validFrom: newCode.validFrom,
      validTo: newCode.validTo,
      status: 'active',
      linkedWorkshop: newCode.linkedWorkshop ? parseInt(newCode.linkedWorkshop) : null,
      linkedWorkshopAr: 'جميع الورش',
      linkedWorkshopEn: 'All Workshops',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCodes([...codes, newCodeItem]);
    setIsCreateOpen(false);
    setNewCode({ code: '', type: 'discount', discountPercent: 10, maxUsage: 100, validFrom: '', validTo: '', linkedWorkshop: '' });
    toast({
      title: t('تم الإنشاء', 'Created'),
      description: t('تم إنشاء الكود بنجاح', 'Code created successfully'),
    });
  };

  const handleDelete = () => {
    if (!selectedCode) return;
    setCodes(codes.filter(c => c.id !== selectedCode.id));
    setIsDeleteOpen(false);
    setSelectedCode(null);
    toast({
      title: t('تم الحذف', 'Deleted'),
      description: t('تم حذف الكود بنجاح', 'Code deleted successfully'),
    });
  };

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'SPTA-';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewCode({ ...newCode, code: result });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-dark via-navy to-navy-light py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Ticket className="w-5 h-5 text-green-accent" />
              <span className="text-blue-pale text-sm font-medium">
                {t('إدارة العروض', 'Promotions Management')}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              {t('أكواد الخصم والحضور المجاني', 'Discount & Free Attendance Codes')}
            </h1>
            <p className="text-xl text-blue-pale max-w-2xl mx-auto">
              {t('إنشاء وإدارة أكواد الخصم والحضور المجاني للورش', 'Create and manage discount and free attendance codes for workshops')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Ticket, value: stats.total, label: t('إجمالي الأكواد', 'Total Codes'), color: 'text-primary' },
              { icon: CheckCircle, value: stats.active, label: t('أكواد نشطة', 'Active Codes'), color: 'text-green-accent' },
              { icon: TrendingUp, value: stats.totalUsage, label: t('مرات الاستخدام', 'Total Usage'), color: 'text-blue-light' },
              { icon: Percent, value: `${stats.avgDiscount}%`, label: t('متوسط الخصم', 'Avg Discount'), color: 'text-yellow-600' },
            ].map((stat, index) => (
              <Card key={index} data-aos="fade-up" data-aos-delay={index * 100} className="card-hover">
                <CardContent className="p-4 text-center">
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-custom">
          <Tabs defaultValue="codes" className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <TabsList>
                <TabsTrigger value="codes" className="gap-2">
                  <Ticket className="w-4 h-4" />
                  {t('الأكواد', 'Codes')}
                </TabsTrigger>
                <TabsTrigger value="analytics" className="gap-2">
                  <TrendingUp className="w-4 h-4" />
                  {t('الإحصائيات', 'Analytics')}
                </TabsTrigger>
              </TabsList>

              <Button onClick={() => setIsCreateOpen(true)} className="gap-2 bg-green-accent hover:bg-green-light">
                <Plus className="w-4 h-4" />
                {t('كود جديد', 'New Code')}
              </Button>
            </div>

            {/* Codes Tab */}
            <TabsContent value="codes" className="space-y-6">
              {/* Filters */}
              <Card data-aos="fade-up">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder={t('بحث عن كود...', 'Search codes...')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ps-10"
                      />
                    </div>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <Tag className="w-4 h-4 me-2" />
                        <SelectValue placeholder={t('النوع', 'Type')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('الكل', 'All')}</SelectItem>
                        <SelectItem value="discount">{t('خصم', 'Discount')}</SelectItem>
                        <SelectItem value="free">{t('مجاني', 'Free')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <Filter className="w-4 h-4 me-2" />
                        <SelectValue placeholder={t('الحالة', 'Status')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('الكل', 'All')}</SelectItem>
                        <SelectItem value="active">{t('نشط', 'Active')}</SelectItem>
                        <SelectItem value="expired">{t('منتهي', 'Expired')}</SelectItem>
                        <SelectItem value="used">{t('مستنفد', 'Used Up')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Codes Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredCodes.map((code, index) => (
                    <motion.div
                      key={code.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="card-hover overflow-hidden group h-full">
                        <div className={`h-2 ${code.type === 'free' ? 'bg-gradient-to-r from-green-accent to-green-light' : 'bg-gradient-to-r from-primary to-blue-light'}`} />
                        <CardContent className="p-6">
                          {/* Code Display */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              {getTypeBadge(code.type)}
                              {getStatusBadge(code.status)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleCopyCode(code.code)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Code Value */}
                          <div className="bg-muted/50 rounded-xl p-4 mb-4 text-center group-hover:bg-muted transition-colors">
                            <p className="text-xs text-muted-foreground mb-1">{t('الكود', 'Code')}</p>
                            <p className="text-2xl font-mono font-bold tracking-wider text-primary">{code.code}</p>
                          </div>

                          {/* Discount Info */}
                          <div className="flex items-center justify-center gap-2 mb-4">
                            <span className={`text-4xl font-bold ${code.type === 'free' ? 'text-green-accent' : 'text-primary'}`}>
                              {code.discountPercent}%
                            </span>
                            <span className="text-muted-foreground">
                              {code.type === 'free' ? t('حضور مجاني', 'Free Attendance') : t('خصم', 'Discount')}
                            </span>
                          </div>

                          {/* Usage Progress */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-muted-foreground flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {t('الاستخدام', 'Usage')}
                              </span>
                              <span className="font-medium">
                                {code.usedCount}/{code.maxUsage}
                              </span>
                            </div>
                            <Progress 
                              value={(code.usedCount / code.maxUsage) * 100} 
                              className="h-2"
                            />
                          </div>

                          {/* Details */}
                          <div className="space-y-2 text-sm mb-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4 text-primary" />
                              {code.validFrom} → {code.validTo}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Link2 className="w-4 h-4 text-primary" />
                              {t(code.linkedWorkshopAr, code.linkedWorkshopEn)}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1 gap-1"
                              onClick={() => {
                                setSelectedCode(code);
                                setIsEditOpen(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                              {t('تعديل', 'Edit')}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-1 text-destructive hover:text-destructive"
                              onClick={() => {
                                setSelectedCode(code);
                                setIsDeleteOpen(true);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredCodes.length === 0 && (
                <div className="text-center py-12">
                  <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">{t('لا توجد أكواد', 'No codes found')}</p>
                </div>
              )}
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Usage Chart Placeholder */}
                <Card data-aos="fade-up">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      {t('استخدام الأكواد', 'Code Usage')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-muted/50 rounded-xl flex items-center justify-center">
                      <p className="text-muted-foreground">{t('رسم بياني للاستخدام', 'Usage Chart')}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Codes */}
                <Card data-aos="fade-up" data-aos-delay="100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-green-accent" />
                      {t('أكثر الأكواد استخداماً', 'Most Used Codes')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {codes
                        .sort((a, b) => b.usedCount - a.usedCount)
                        .slice(0, 5)
                        .map((code, index) => (
                          <div key={code.id} className="flex items-center gap-4">
                            <span className="text-2xl font-bold text-muted-foreground w-8">{index + 1}</span>
                            <div className="flex-1">
                              <p className="font-mono font-medium">{code.code}</p>
                              <p className="text-sm text-muted-foreground">{code.usedCount} {t('استخدام', 'uses')}</p>
                            </div>
                            <Progress value={(code.usedCount / code.maxUsage) * 100} className="w-24 h-2" />
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              {t('إنشاء كود جديد', 'Create New Code')}
            </DialogTitle>
            <DialogDescription>
              {t('أنشئ كود خصم أو حضور مجاني جديد', 'Create a new discount or free attendance code')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t('الكود', 'Code')}</Label>
              <div className="flex gap-2">
                <Input
                  value={newCode.code}
                  onChange={(e) => setNewCode({ ...newCode, code: e.target.value.toUpperCase() })}
                  placeholder={t('مثال: SPTA2024', 'e.g., SPTA2024')}
                  className="font-mono"
                />
                <Button variant="outline" onClick={generateRandomCode}>
                  <Sparkles className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t('النوع', 'Type')}</Label>
              <Select value={newCode.type} onValueChange={(v) => setNewCode({ ...newCode, type: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount">{t('خصم', 'Discount')}</SelectItem>
                  <SelectItem value="free">{t('حضور مجاني', 'Free Attendance')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newCode.type === 'discount' && (
              <div className="space-y-2">
                <Label>{t('نسبة الخصم', 'Discount Percentage')}</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={newCode.discountPercent}
                    onChange={(e) => setNewCode({ ...newCode, discountPercent: parseInt(e.target.value) })}
                    className="w-24"
                  />
                  <span className="text-2xl font-bold text-primary">%</span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>{t('الحد الأقصى للاستخدام', 'Max Usage')}</Label>
              <Input
                type="number"
                min="1"
                value={newCode.maxUsage}
                onChange={(e) => setNewCode({ ...newCode, maxUsage: parseInt(e.target.value) })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('تاريخ البدء', 'Start Date')}</Label>
                <Input
                  type="date"
                  value={newCode.validFrom}
                  onChange={(e) => setNewCode({ ...newCode, validFrom: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('تاريخ الانتهاء', 'End Date')}</Label>
                <Input
                  type="date"
                  value={newCode.validTo}
                  onChange={(e) => setNewCode({ ...newCode, validTo: e.target.value })}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              {t('إلغاء', 'Cancel')}
            </Button>
            <Button onClick={handleCreate} className="bg-green-accent hover:bg-green-light gap-2">
              <CheckCircle className="w-4 h-4" />
              {t('إنشاء', 'Create')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="w-5 h-5" />
              {t('حذف الكود', 'Delete Code')}
            </DialogTitle>
            <DialogDescription>
              {t('هل أنت متأكد من حذف هذا الكود؟ لا يمكن التراجع عن هذا الإجراء.', 'Are you sure you want to delete this code? This action cannot be undone.')}
            </DialogDescription>
          </DialogHeader>
          
          {selectedCode && (
            <div className="py-4">
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-mono font-bold text-destructive">{selectedCode.code}</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              {t('إلغاء', 'Cancel')}
            </Button>
            <Button onClick={handleDelete} variant="destructive" className="gap-2">
              <Trash2 className="w-4 h-4" />
              {t('حذف', 'Delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default DiscountCodesPage;
