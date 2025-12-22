import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Award, 
  Calendar, 
  Mail, 
  Settings, 
  Download, 
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  GraduationCap,
  Building2,
  Phone,
  MapPin,
  FileText,
  Bell,
  Shield
} from 'lucide-react';

// Mock user data
const mockUser = {
  nameAr: 'د. أحمد محمد العتيبي',
  nameEn: 'Dr. Ahmed Mohammed Al-Otaibi',
  email: 'ahmed.otaibi@example.com',
  phone: '+966 50 123 4567',
  membershipNumber: 'SPTA-2024-00142',
  membershipType: 'عضو عامل',
  membershipTypeEn: 'Active Member',
  status: 'active',
  joinDate: '2022-03-15',
  expiryDate: '2025-03-15',
  workplace: 'مستشفى الملك فيصل التخصصي',
  workplaceEn: 'King Faisal Specialist Hospital',
  city: 'الرياض',
  cityEn: 'Riyadh',
  specialization: 'العلاج الطبيعي للجهاز العصبي',
  specializationEn: 'Neurological Physical Therapy',
  avatar: null,
};

const mockWorkshops = [
  {
    id: 1,
    titleAr: 'ورشة التأهيل الحركي المتقدم',
    titleEn: 'Advanced Motor Rehabilitation Workshop',
    date: '2024-02-15',
    status: 'completed',
    certificateAvailable: true,
  },
  {
    id: 2,
    titleAr: 'ورشة العلاج الطبيعي الرياضي',
    titleEn: 'Sports Physical Therapy Workshop',
    date: '2024-05-20',
    status: 'upcoming',
    certificateAvailable: false,
  },
  {
    id: 3,
    titleAr: 'ورشة تقنيات التنفس العلاجية',
    titleEn: 'Therapeutic Breathing Techniques Workshop',
    date: '2024-01-10',
    status: 'completed',
    certificateAvailable: true,
  },
];

const mockCertificates = [
  {
    id: 1,
    titleAr: 'شهادة إتمام ورشة التأهيل الحركي',
    titleEn: 'Motor Rehabilitation Workshop Completion',
    issueDate: '2024-02-16',
    type: 'workshop',
  },
  {
    id: 2,
    titleAr: 'شهادة العضوية السنوية',
    titleEn: 'Annual Membership Certificate',
    issueDate: '2024-03-15',
    type: 'membership',
  },
  {
    id: 3,
    titleAr: 'شهادة تقنيات التنفس العلاجية',
    titleEn: 'Therapeutic Breathing Techniques Certificate',
    issueDate: '2024-01-11',
    type: 'workshop',
  },
];

const ProfilePage = () => {
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [emailSettings, setEmailSettings] = useState({
    newsletters: true,
    workshopReminders: true,
    membershipAlerts: true,
    promotions: false,
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const getStatusBadge = (status: string) => {
    const configs = {
      active: { 
        color: 'bg-green-accent/10 text-green-accent border-green-accent/30', 
        icon: CheckCircle, 
        labelAr: 'نشط', 
        labelEn: 'Active' 
      },
      expired: { 
        color: 'bg-destructive/10 text-destructive border-destructive/30', 
        icon: XCircle, 
        labelAr: 'منتهي', 
        labelEn: 'Expired' 
      },
      pending: { 
        color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30', 
        icon: AlertCircle, 
        labelAr: 'قيد الانتظار', 
        labelEn: 'Pending' 
      },
    };
    const config = configs[status as keyof typeof configs] || configs.pending;
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={`${config.color} gap-1.5 px-3 py-1`}>
        <Icon className="w-3.5 h-3.5" />
        {t(config.labelAr, config.labelEn)}
      </Badge>
    );
  };

  const tabs = [
    { id: 'overview', labelAr: 'نظرة عامة', labelEn: 'Overview', icon: User },
    { id: 'workshops', labelAr: 'ورش العمل', labelEn: 'Workshops', icon: GraduationCap },
    { id: 'certificates', labelAr: 'الشهادات', labelEn: 'Certificates', icon: Award },
    { id: 'settings', labelAr: 'الإعدادات', labelEn: 'Settings', icon: Settings },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-dark via-navy to-navy-light py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8" data-aos="fade-up">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-light to-blue-primary flex items-center justify-center text-primary-foreground text-4xl font-bold shadow-lg">
                {mockUser.nameAr.charAt(0)}
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-green-accent flex items-center justify-center shadow-md">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* User Info */}
            <div className="text-center md:text-start">
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                {t(mockUser.nameAr, mockUser.nameEn)}
              </h1>
              <p className="text-blue-pale text-lg mb-3">
                {t(mockUser.specializationEn, mockUser.specializationEn)}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {getStatusBadge(mockUser.status)}
                <Badge variant="outline" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30 gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  {mockUser.membershipNumber}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-muted/30">
        <div className="container-custom">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8" data-aos="fade-up">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                onClick={() => setActiveTab(tab.id)}
                className={`gap-2 transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'shadow-md' 
                    : 'hover:bg-primary/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {t(tab.labelAr, tab.labelEn)}
              </Button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {/* Membership Status Card */}
                <Card className="card-hover lg:col-span-2" data-aos="fade-up">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Shield className="w-5 h-5 text-primary" />
                      {t('حالة العضوية', 'Membership Status')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Award className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{t('نوع العضوية', 'Membership Type')}</p>
                            <p className="font-semibold">{t(mockUser.membershipType, mockUser.membershipTypeEn)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{t('تاريخ الانضمام', 'Join Date')}</p>
                            <p className="font-semibold">{new Date(mockUser.joinDate).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-green-accent/10 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-green-accent" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{t('تاريخ الانتهاء', 'Expiry Date')}</p>
                            <p className="font-semibold">{new Date(mockUser.expiryDate).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{t('الحالة', 'Status')}</p>
                            {getStatusBadge(mockUser.status)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-border">
                      <Button className="w-full sm:w-auto gap-2 bg-green-accent hover:bg-green-light">
                        <FileText className="w-4 h-4" />
                        {t('تجديد العضوية', 'Renew Membership')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="card-hover" data-aos="fade-up" data-aos-delay="100">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">{t('إحصائيات سريعة', 'Quick Stats')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-muted-foreground">{t('ورش العمل', 'Workshops')}</span>
                      <span className="text-2xl font-bold text-primary">{mockWorkshops.length}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-muted-foreground">{t('الشهادات', 'Certificates')}</span>
                      <span className="text-2xl font-bold text-green-accent">{mockCertificates.length}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-muted-foreground">{t('سنوات العضوية', 'Years Member')}</span>
                      <span className="text-2xl font-bold text-primary">2</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Personal Info */}
                <Card className="card-hover lg:col-span-3" data-aos="fade-up" data-aos-delay="200">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <User className="w-5 h-5 text-primary" />
                      {t('المعلومات الشخصية', 'Personal Information')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t('البريد الإلكتروني', 'Email')}</p>
                          <p className="font-medium text-sm">{mockUser.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t('الهاتف', 'Phone')}</p>
                          <p className="font-medium text-sm" dir="ltr">{mockUser.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t('جهة العمل', 'Workplace')}</p>
                          <p className="font-medium text-sm">{t(mockUser.workplace, mockUser.workplaceEn)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t('المدينة', 'City')}</p>
                          <p className="font-medium text-sm">{t(mockUser.city, mockUser.cityEn)}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Workshops Tab */}
            {activeTab === 'workshops' && (
              <motion.div
                key="workshops"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden" data-aos="fade-up">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      {t('ورش العمل المسجل بها', 'Registered Workshops')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="text-start p-4 font-semibold">{t('اسم الورشة', 'Workshop Name')}</th>
                            <th className="text-start p-4 font-semibold">{t('التاريخ', 'Date')}</th>
                            <th className="text-start p-4 font-semibold">{t('الحالة', 'Status')}</th>
                            <th className="text-start p-4 font-semibold">{t('الإجراءات', 'Actions')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockWorkshops.map((workshop, index) => (
                            <tr 
                              key={workshop.id} 
                              className="border-t border-border hover:bg-muted/30 transition-colors"
                              data-aos="fade-up"
                              data-aos-delay={index * 100}
                            >
                              <td className="p-4">
                                <p className="font-medium">{t(workshop.titleAr, workshop.titleEn)}</p>
                              </td>
                              <td className="p-4">
                                {new Date(workshop.date).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}
                              </td>
                              <td className="p-4">
                                <Badge 
                                  variant="outline"
                                  className={workshop.status === 'completed' 
                                    ? 'bg-green-accent/10 text-green-accent border-green-accent/30' 
                                    : 'bg-blue-light/10 text-blue-light border-blue-light/30'
                                  }
                                >
                                  {workshop.status === 'completed' 
                                    ? t('مكتملة', 'Completed') 
                                    : t('قادمة', 'Upcoming')
                                  }
                                </Badge>
                              </td>
                              <td className="p-4">
                                {workshop.certificateAvailable && (
                                  <Button size="sm" variant="outline" className="gap-2">
                                    <Download className="w-4 h-4" />
                                    {t('الشهادة', 'Certificate')}
                                  </Button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <motion.div
                key="certificates"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {mockCertificates.map((cert, index) => (
                  <Card 
                    key={cert.id} 
                    className="card-hover group" 
                    data-aos="fade-up" 
                    data-aos-delay={index * 100}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-light flex items-center justify-center text-primary-foreground shadow-md group-hover:scale-110 transition-transform">
                          <Award className="w-6 h-6" />
                        </div>
                        <Badge 
                          variant="outline"
                          className={cert.type === 'workshop' 
                            ? 'bg-blue-pale text-primary' 
                            : 'bg-green-accent/10 text-green-accent border-green-accent/30'
                          }
                        >
                          {cert.type === 'workshop' ? t('ورشة', 'Workshop') : t('عضوية', 'Membership')}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {t(cert.titleAr, cert.titleEn)}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {t('تاريخ الإصدار:', 'Issue Date:')} {new Date(cert.issueDate).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 gap-2">
                          <Eye className="w-4 h-4" />
                          {t('عرض', 'View')}
                        </Button>
                        <Button size="sm" className="flex-1 gap-2">
                          <Download className="w-4 h-4" />
                          {t('تحميل', 'Download')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto"
              >
                <Card data-aos="fade-up">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-primary" />
                      {t('إعدادات البريد الإلكتروني', 'Email Settings')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      { key: 'newsletters', labelAr: 'النشرة الإخبارية', labelEn: 'Newsletters', descAr: 'استلام آخر الأخبار والتحديثات', descEn: 'Receive latest news and updates' },
                      { key: 'workshopReminders', labelAr: 'تذكيرات ورش العمل', labelEn: 'Workshop Reminders', descAr: 'تذكيرات قبل موعد ورش العمل', descEn: 'Reminders before workshop dates' },
                      { key: 'membershipAlerts', labelAr: 'تنبيهات العضوية', labelEn: 'Membership Alerts', descAr: 'إشعارات انتهاء وتجديد العضوية', descEn: 'Expiry and renewal notifications' },
                      { key: 'promotions', labelAr: 'العروض الترويجية', labelEn: 'Promotions', descAr: 'عروض وخصومات حصرية للأعضاء', descEn: 'Exclusive member offers and discounts' },
                    ].map((setting, index) => (
                      <div 
                        key={setting.key}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        data-aos="fade-up"
                        data-aos-delay={index * 50}
                      >
                        <div>
                          <p className="font-medium">{t(setting.labelAr, setting.labelEn)}</p>
                          <p className="text-sm text-muted-foreground">{t(setting.descAr, setting.descEn)}</p>
                        </div>
                        <Switch
                          checked={emailSettings[setting.key as keyof typeof emailSettings]}
                          onCheckedChange={(checked) => 
                            setEmailSettings(prev => ({ ...prev, [setting.key]: checked }))
                          }
                        />
                      </div>
                    ))}
                    <div className="pt-4">
                      <Button className="w-full gap-2">
                        <Settings className="w-4 h-4" />
                        {t('حفظ الإعدادات', 'Save Settings')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default ProfilePage;
