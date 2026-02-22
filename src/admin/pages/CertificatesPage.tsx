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
import { Textarea } from '@/components/ui/textarea';
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
  Award,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  QrCode,
  Shield,
  Calendar,
  User,
  GraduationCap,
  FileText,
  Stamp,
  Signature,
  ExternalLink,
  Copy,
  Printer,
  Settings,
  Sparkles,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock certificates data
const initialCertificates = [
  {
    id: 'CERT-2024-001',
    recipientNameAr: 'محمد أحمد العلي',
    recipientNameEn: 'Mohammed Ahmad Al-Ali',
    workshopTitleAr: 'ورشة التأهيل الحركي المتقدم',
    workshopTitleEn: 'Advanced Motor Rehabilitation Workshop',
    workshopDate: '2024-03-15',
    issueDate: '2024-03-16',
    hours: 6,
    status: 'verified',
    verificationUrl: 'https://spta.ksu.edu.sa/verify/CERT-2024-001',
    qrCode: 'data:image/svg+xml,...',
  },
  {
    id: 'CERT-2024-002',
    recipientNameAr: 'سارة محمد الخالد',
    recipientNameEn: 'Sara Mohammed Al-Khaled',
    workshopTitleAr: 'ورشة العلاج الطبيعي الرياضي',
    workshopTitleEn: 'Sports Physical Therapy Workshop',
    workshopDate: '2024-04-20',
    issueDate: '2024-04-21',
    hours: 8,
    status: 'verified',
    verificationUrl: 'https://spta.ksu.edu.sa/verify/CERT-2024-002',
    qrCode: 'data:image/svg+xml,...',
  },
  {
    id: 'CERT-2024-003',
    recipientNameAr: 'خالد عبدالله السعيد',
    recipientNameEn: 'Khaled Abdullah Al-Saeed',
    workshopTitleAr: 'ورشة تقنيات التنفس العلاجية',
    workshopTitleEn: 'Therapeutic Breathing Techniques',
    workshopDate: '2024-05-10',
    issueDate: '2024-05-11',
    hours: 4,
    status: 'pending',
    verificationUrl: 'https://spta.ksu.edu.sa/verify/CERT-2024-003',
    qrCode: 'data:image/svg+xml,...',
  },
];

const CertificatesPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [certificates, setCertificates] = useState(initialCertificates);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[0] | null>(null);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyResult, setVerifyResult] = useState<'success' | 'error' | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [certificateSettings, setCertificateSettings] = useState({
    signatureImageUrl: '',
    stampImageUrl: '',
    customText: '',
    template: 'modern',
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = 
      cert.recipientNameAr.includes(searchQuery) || 
      cert.recipientNameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || cert.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const configs = {
      verified: { color: 'bg-green-accent/10 text-green-accent border-green-accent/30', icon: CheckCircle, labelAr: 'موثقة', labelEn: 'Verified' },
      pending: { color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30', icon: Clock, labelAr: 'قيد المعالجة', labelEn: 'Pending' },
      revoked: { color: 'bg-destructive/10 text-destructive border-destructive/30', icon: XCircle, labelAr: 'ملغاة', labelEn: 'Revoked' },
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

  const handleVerify = () => {
    const found = certificates.find(c => c.id === verifyCode.toUpperCase());
    if (found && found.status === 'verified') {
      setVerifyResult('success');
      setSelectedCertificate(found);
    } else {
      setVerifyResult('error');
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: t('تم النسخ', 'Copied'),
      description: t('تم نسخ رابط التحقق', 'Verification link copied'),
    });
  };

  const openPreview = (cert: typeof certificates[0]) => {
    setSelectedCertificate(cert);
    setIsPreviewOpen(true);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-dark via-navy to-navy-light py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M40 0l40 40-40 40L0 40z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Award className="w-5 h-5 text-green-accent" />
              <span className="text-blue-pale text-sm font-medium">
                {t('نظام الشهادات الرقمية', 'Digital Certificate System')}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              {t('الشهادات والتحقق', 'Certificates & Verification')}
            </h1>
            <p className="text-xl text-blue-pale max-w-2xl mx-auto">
              {t('شهادات رقمية موثقة بتقنية QR للتحقق الفوري', 'Verified digital certificates with QR code for instant verification')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Verification Section */}
      <section className="py-12 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container-custom">
          <Card className="max-w-2xl mx-auto overflow-hidden" data-aos="fade-up">
            <div className="h-2 bg-gradient-to-r from-primary via-blue-light to-green-accent" />
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">{t('التحقق من الشهادة', 'Verify Certificate')}</h2>
                <p className="text-muted-foreground">
                  {t('أدخل رقم الشهادة للتحقق من صحتها', 'Enter certificate number to verify its authenticity')}
                </p>
              </div>
              
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <QrCode className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder={t('مثال: CERT-2024-001', 'e.g., CERT-2024-001')}
                    value={verifyCode}
                    onChange={(e) => {
                      setVerifyCode(e.target.value);
                      setVerifyResult(null);
                    }}
                    className="ps-12 h-12 text-lg"
                  />
                </div>
                <Button 
                  onClick={handleVerify}
                  className="h-12 px-8 bg-green-accent hover:bg-green-light gap-2"
                >
                  <Search className="w-5 h-5" />
                  {t('تحقق', 'Verify')}
                </Button>
              </div>

              <AnimatePresence>
                {verifyResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mt-6 p-4 rounded-xl ${
                      verifyResult === 'success' 
                        ? 'bg-green-accent/10 border border-green-accent/30' 
                        : 'bg-destructive/10 border border-destructive/30'
                    }`}
                  >
                    {verifyResult === 'success' && selectedCertificate ? (
                      <div className="flex items-start gap-4">
                        <CheckCircle className="w-8 h-8 text-green-accent flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-bold text-green-accent mb-2">
                            {t('شهادة موثقة ✓', 'Certificate Verified ✓')}
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-2 text-sm">
                            <p><strong>{t('الاسم:', 'Name:')}</strong> {t(selectedCertificate.recipientNameAr, selectedCertificate.recipientNameEn)}</p>
                            <p><strong>{t('الورشة:', 'Workshop:')}</strong> {t(selectedCertificate.workshopTitleAr, selectedCertificate.workshopTitleEn)}</p>
                            <p><strong>{t('التاريخ:', 'Date:')}</strong> {selectedCertificate.workshopDate}</p>
                            <p><strong>{t('الساعات:', 'Hours:')}</strong> {selectedCertificate.hours}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <XCircle className="w-8 h-8 text-destructive flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-destructive">
                            {t('شهادة غير موجودة', 'Certificate Not Found')}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {t('تأكد من صحة رقم الشهادة المدخل', 'Please check the certificate number and try again')}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-custom">
          <Tabs defaultValue="certificates" className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <TabsList>
                <TabsTrigger value="certificates" className="gap-2">
                  <Award className="w-4 h-4" />
                  {t('الشهادات', 'Certificates')}
                </TabsTrigger>
                <TabsTrigger value="templates" className="gap-2">
                  <FileText className="w-4 h-4" />
                  {t('القوالب', 'Templates')}
                </TabsTrigger>
              </TabsList>

              <Button onClick={() => setIsSettingsOpen(true)} variant="outline" className="gap-2">
                <Settings className="w-4 h-4" />
                {t('إعدادات الشهادة', 'Certificate Settings')}
              </Button>
            </div>

            {/* Certificates Tab */}
            <TabsContent value="certificates" className="space-y-6">
              {/* Filters */}
              <Card data-aos="fade-up">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder={t('بحث بالاسم أو رقم الشهادة...', 'Search by name or certificate number...')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ps-10"
                      />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <Filter className="w-4 h-4 me-2" />
                        <SelectValue placeholder={t('الحالة', 'Status')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('الكل', 'All')}</SelectItem>
                        <SelectItem value="verified">{t('موثقة', 'Verified')}</SelectItem>
                        <SelectItem value="pending">{t('قيد المعالجة', 'Pending')}</SelectItem>
                        <SelectItem value="revoked">{t('ملغاة', 'Revoked')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Certificates Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredCertificates.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="card-hover overflow-hidden group h-full">
                        <div className="h-2 bg-gradient-to-r from-primary to-green-accent" />
                        <CardContent className="p-6">
                          {/* Certificate Preview Header */}
                          <div className="relative bg-gradient-to-br from-navy-dark to-navy p-4 rounded-xl mb-4 overflow-hidden">
                            <div className="absolute inset-0 opacity-20">
                              <div className="absolute inset-0" style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2.5l5 3.5-5 3.5z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
                              }} />
                            </div>
                            <div className="relative z-10 text-center text-primary-foreground">
                              <Award className="w-10 h-10 mx-auto mb-2 text-green-accent" />
                              <h4 className="font-bold text-sm">{t('شهادة حضور', 'Certificate of Attendance')}</h4>
                              <p className="text-xs text-blue-pale">{t('الجمعية السعودية للعلاج الطبيعي', 'Saudi Physical Therapy Association')}</p>
                            </div>
                          </div>

                          <div className="space-y-3 mb-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-bold">{t(cert.recipientNameAr, cert.recipientNameEn)}</p>
                                <p className="text-sm text-muted-foreground">{cert.id}</p>
                              </div>
                              {getStatusBadge(cert.status)}
                            </div>

                            <div className="text-sm space-y-1">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <GraduationCap className="w-4 h-4 text-primary" />
                                {t(cert.workshopTitleAr, cert.workshopTitleEn)}
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="w-4 h-4 text-primary" />
                                {cert.workshopDate}
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="w-4 h-4 text-primary" />
                                {cert.hours} {t('ساعات تدريبية', 'training hours')}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1 gap-1"
                              onClick={() => openPreview(cert)}
                            >
                              <Eye className="w-4 h-4" />
                              {t('معاينة', 'Preview')}
                            </Button>
                            <Button 
                              size="sm" 
                              className="flex-1 gap-1 bg-green-accent hover:bg-green-light"
                            >
                              <Download className="w-4 h-4" />
                              {t('تحميل', 'Download')}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleCopyLink(cert.verificationUrl)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredCertificates.length === 0 && (
                <div className="text-center py-12">
                  <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">{t('لا توجد شهادات', 'No certificates found')}</p>
                </div>
              )}
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="templates" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {['modern', 'classic', 'elegant'].map((template, index) => (
                  <Card 
                    key={template}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className={`card-hover cursor-pointer ${certificateSettings.template === template ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setCertificateSettings({ ...certificateSettings, template })}
                  >
                    <CardContent className="p-6">
                      <div className="aspect-[1.4/1] bg-gradient-to-br from-navy-dark to-navy rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute inset-0" style={{
                            backgroundImage: template === 'modern' 
                              ? `linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.1) 50%, transparent 52%)`
                              : template === 'classic'
                              ? `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)`
                              : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23ffffff' fill-opacity='0.05'/%3E%3C/svg%3E")`,
                          }} />
                        </div>
                        <Award className="w-16 h-16 text-green-accent/50" />
                        {certificateSettings.template === template && (
                          <div className="absolute top-2 end-2">
                            <CheckCircle className="w-6 h-6 text-green-accent" />
                          </div>
                        )}
                      </div>
                      <h3 className="font-bold text-center">
                        {template === 'modern' && t('عصري', 'Modern')}
                        {template === 'classic' && t('كلاسيكي', 'Classic')}
                        {template === 'elegant' && t('أنيق', 'Elegant')}
                      </h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Certificate Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              {t('معاينة الشهادة', 'Certificate Preview')}
            </DialogTitle>
          </DialogHeader>
          
          {selectedCertificate && (
            <div className="relative">
              {/* Certificate Design */}
              <div className="aspect-[1.4/1] bg-gradient-to-br from-navy-dark via-navy to-navy-light rounded-2xl p-8 text-primary-foreground overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0l50 50-50 50L0 50z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
                  }} />
                </div>
                
                <div className="relative h-full flex flex-col">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                        <Award className="w-8 h-8 text-green-accent" />
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">{t('شهادة حضور', 'Certificate of Attendance')}</h2>
                    <p className="text-blue-pale">{t('الجمعية السعودية للعلاج الطبيعي', 'Saudi Physical Therapy Association')}</p>
                  </div>

                  {/* Body */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <p className="text-lg mb-4">{t('تشهد الجمعية بأن', 'This is to certify that')}</p>
                    <h3 className="text-4xl font-bold mb-4 text-green-accent">
                      {t(selectedCertificate.recipientNameAr, selectedCertificate.recipientNameEn)}
                    </h3>
                    <p className="text-lg mb-2">{t('قد أتم بنجاح حضور', 'has successfully completed')}</p>
                    <h4 className="text-2xl font-semibold mb-4">
                      {t(selectedCertificate.workshopTitleAr, selectedCertificate.workshopTitleEn)}
                    </h4>
                    <p className="text-blue-pale">
                      {t('بتاريخ', 'on')} {selectedCertificate.workshopDate} • {selectedCertificate.hours} {t('ساعات تدريبية', 'training hours')}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-end justify-between">
                    <div className="text-center">
                      <div className="w-24 h-16 border-b-2 border-blue-pale/50 mb-2 flex items-end justify-center">
                        <Signature className="w-8 h-8 text-blue-pale/50" />
                      </div>
                      <p className="text-sm text-blue-pale">{t('التوقيع', 'Signature')}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white rounded-lg p-2 mb-2">
                        <QrCode className="w-full h-full text-navy" />
                      </div>
                      <p className="text-xs text-blue-pale">{selectedCertificate.id}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-24 h-16 border-b-2 border-blue-pale/50 mb-2 flex items-end justify-center">
                        <Stamp className="w-8 h-8 text-blue-pale/50" />
                      </div>
                      <p className="text-sm text-blue-pale">{t('الختم', 'Stamp')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="gap-2">
            <Button variant="outline" className="gap-2">
              <Printer className="w-4 h-4" />
              {t('طباعة', 'Print')}
            </Button>
            <Button className="bg-green-accent hover:bg-green-light gap-2">
              <Download className="w-4 h-4" />
              {t('تحميل PDF', 'Download PDF')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              {t('إعدادات الشهادة', 'Certificate Settings')}
            </DialogTitle>
            <DialogDescription>
              {t('تخصيص مظهر الشهادات', 'Customize certificate appearance')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Signature className="w-4 h-4" />
                {t('صورة التوقيع', 'Signature Image')}
              </Label>
              <Input type="file" accept="image/*" />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Stamp className="w-4 h-4" />
                {t('صورة الختم', 'Stamp Image')}
              </Label>
              <Input type="file" accept="image/*" />
            </div>
            
            <div className="space-y-2">
              <Label>{t('نص إضافي', 'Custom Text')}</Label>
              <Textarea 
                placeholder={t('نص يظهر في الشهادة...', 'Text to display on certificate...')}
                value={certificateSettings.customText}
                onChange={(e) => setCertificateSettings({ ...certificateSettings, customText: e.target.value })}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
              {t('إلغاء', 'Cancel')}
            </Button>
            <Button className="bg-green-accent hover:bg-green-light gap-2">
              <CheckCircle className="w-4 h-4" />
              {t('حفظ الإعدادات', 'Save Settings')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default CertificatesPage;
