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
import { Switch } from '@/components/ui/switch';
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
  Mail,
  Bell,
  Send,
  Search,
  Filter,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Users,
  Calendar,
  FileText,
  Inbox,
  Archive,
  Trash2,
  RefreshCw,
  Settings,
  BellRing,
  BellOff,
  MailCheck,
  MailX,
  Sparkles,
  MessageSquare,
  Megaphone,
  GraduationCap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock emails data
const initialEmails = [
  {
    id: 1,
    subject: 'تذكير: ورشة التأهيل الحركي المتقدم',
    subjectEn: 'Reminder: Advanced Motor Rehabilitation Workshop',
    type: 'reminder',
    status: 'sent',
    recipientType: 'workshop',
    workshopId: 1,
    recipientCount: 35,
    sentAt: '2024-03-14T10:00:00',
    openRate: 78,
    template: 'reminder',
  },
  {
    id: 2,
    subject: 'النشرة الإخبارية الشهرية - مارس 2024',
    subjectEn: 'Monthly Newsletter - March 2024',
    type: 'newsletter',
    status: 'sent',
    recipientType: 'all',
    workshopId: null,
    recipientCount: 1250,
    sentAt: '2024-03-01T09:00:00',
    openRate: 45,
    template: 'newsletter',
  },
  {
    id: 3,
    subject: 'شهادتك جاهزة للتحميل',
    subjectEn: 'Your Certificate is Ready',
    type: 'certificate',
    status: 'sent',
    recipientType: 'workshop',
    workshopId: 2,
    recipientCount: 40,
    sentAt: '2024-04-21T14:30:00',
    openRate: 92,
    template: 'certificate',
  },
  {
    id: 4,
    subject: 'دعوة للتسجيل في ورشة جديدة',
    subjectEn: 'Invitation to Register for New Workshop',
    type: 'promotion',
    status: 'scheduled',
    recipientType: 'members',
    workshopId: 3,
    recipientCount: 850,
    sentAt: '2024-05-05T10:00:00',
    openRate: 0,
    template: 'promotion',
  },
  {
    id: 5,
    subject: 'تحديث بيانات العضوية',
    subjectEn: 'Membership Data Update',
    type: 'notification',
    status: 'draft',
    recipientType: 'members',
    workshopId: null,
    recipientCount: 0,
    sentAt: null,
    openRate: 0,
    template: 'notification',
  },
];

// Mock notifications
const initialNotifications = [
  {
    id: 1,
    titleAr: 'تسجيل جديد في ورشة التأهيل',
    titleEn: 'New Registration in Rehabilitation Workshop',
    type: 'registration',
    isRead: false,
    createdAt: '2024-03-15T14:30:00',
  },
  {
    id: 2,
    titleAr: 'تم إصدار شهادة جديدة',
    titleEn: 'New Certificate Issued',
    type: 'certificate',
    isRead: false,
    createdAt: '2024-03-15T12:00:00',
  },
  {
    id: 3,
    titleAr: 'انتهاء صلاحية كود الخصم',
    titleEn: 'Discount Code Expired',
    type: 'alert',
    isRead: true,
    createdAt: '2024-03-14T09:00:00',
  },
  {
    id: 4,
    titleAr: 'ورشة جديدة متاحة للتسجيل',
    titleEn: 'New Workshop Available',
    type: 'workshop',
    isRead: true,
    createdAt: '2024-03-13T16:00:00',
  },
];

const EmailNotificationsPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [emails, setEmails] = useState(initialEmails);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<typeof emails[0] | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [emailSettings, setEmailSettings] = useState({
    workshopReminders: true,
    certificateNotifications: true,
    newsletterSubscription: true,
    promotionalEmails: false,
  });
  const [newEmail, setNewEmail] = useState({
    subject: '',
    recipientType: 'all',
    workshopId: '',
    template: 'custom',
    content: '',
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const filteredEmails = emails.filter(email => {
    const matchesSearch = 
      email.subject.includes(searchQuery) || 
      email.subjectEn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || email.type === filterType;
    const matchesStatus = filterStatus === 'all' || email.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    totalSent: emails.filter(e => e.status === 'sent').length,
    scheduled: emails.filter(e => e.status === 'scheduled').length,
    drafts: emails.filter(e => e.status === 'draft').length,
    avgOpenRate: Math.round(emails.filter(e => e.status === 'sent').reduce((acc, e) => acc + e.openRate, 0) / emails.filter(e => e.status === 'sent').length),
  };

  const getTypeBadge = (type: string) => {
    const configs = {
      reminder: { color: 'bg-blue-light/10 text-blue-light border-blue-light/30', icon: Bell, labelAr: 'تذكير', labelEn: 'Reminder' },
      newsletter: { color: 'bg-primary/10 text-primary border-primary/30', icon: FileText, labelAr: 'نشرة', labelEn: 'Newsletter' },
      certificate: { color: 'bg-green-accent/10 text-green-accent border-green-accent/30', icon: GraduationCap, labelAr: 'شهادة', labelEn: 'Certificate' },
      promotion: { color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30', icon: Megaphone, labelAr: 'ترويج', labelEn: 'Promotion' },
      notification: { color: 'bg-purple-500/10 text-purple-600 border-purple-500/30', icon: MessageSquare, labelAr: 'إشعار', labelEn: 'Notification' },
    };
    const config = configs[type as keyof typeof configs] || configs.notification;
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={`${config.color} gap-1`}>
        <Icon className="w-3 h-3" />
        {t(config.labelAr, config.labelEn)}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const configs = {
      sent: { color: 'bg-green-accent/10 text-green-accent border-green-accent/30', icon: MailCheck, labelAr: 'مرسل', labelEn: 'Sent' },
      scheduled: { color: 'bg-blue-light/10 text-blue-light border-blue-light/30', icon: Clock, labelAr: 'مجدول', labelEn: 'Scheduled' },
      draft: { color: 'bg-muted text-muted-foreground border-border', icon: FileText, labelAr: 'مسودة', labelEn: 'Draft' },
      failed: { color: 'bg-destructive/10 text-destructive border-destructive/30', icon: MailX, labelAr: 'فشل', labelEn: 'Failed' },
    };
    const config = configs[status as keyof typeof configs] || configs.draft;
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={`${config.color} gap-1`}>
        <Icon className="w-3 h-3" />
        {t(config.labelAr, config.labelEn)}
      </Badge>
    );
  };

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsComposeOpen(false);
      toast({
        title: t('تم الإرسال', 'Sent'),
        description: t('تم إرسال البريد الإلكتروني بنجاح', 'Email sent successfully'),
      });
      setNewEmail({ subject: '', recipientType: 'all', workshopId: '', template: 'custom', content: '' });
    }, 2000);
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-dark via-navy to-navy-light py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l9.9-9.9h-2.828zM27.515 0L16.343 11.172 17.757 12.586l13.485-13.485L27.515 0zM32.686 0L18.515 14.172l1.415 1.414L36.343 0h-3.657zM37.858 0L20.686 17.172l1.414 1.414L41.272 0h-3.414zM43.03 0L22.857 20.172l1.414 1.414L45.858 0h-2.828z' fill='%23ffffff' fill-opacity='0.3'/%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Mail className="w-5 h-5 text-green-accent" />
              <span className="text-blue-pale text-sm font-medium">
                {t('مركز التواصل', 'Communication Center')}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              {t('البريد الإلكتروني والإشعارات', 'Email & Notifications')}
            </h1>
            <p className="text-xl text-blue-pale max-w-2xl mx-auto">
              {t('إدارة التواصل مع المستخدمين والمشاركين في الورش', 'Manage communication with users and workshop participants')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: MailCheck, value: stats.totalSent, label: t('رسائل مرسلة', 'Emails Sent'), color: 'text-green-accent' },
              { icon: Clock, value: stats.scheduled, label: t('مجدولة', 'Scheduled'), color: 'text-blue-light' },
              { icon: FileText, value: stats.drafts, label: t('مسودات', 'Drafts'), color: 'text-muted-foreground' },
              { icon: Eye, value: `${stats.avgOpenRate}%`, label: t('معدل الفتح', 'Open Rate'), color: 'text-primary' },
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
          <Tabs defaultValue="emails" className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <TabsList>
                <TabsTrigger value="emails" className="gap-2">
                  <Mail className="w-4 h-4" />
                  {t('البريد', 'Emails')}
                </TabsTrigger>
                <TabsTrigger value="notifications" className="gap-2 relative">
                  <Bell className="w-4 h-4" />
                  {t('الإشعارات', 'Notifications')}
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -end-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2">
                  <Settings className="w-4 h-4" />
                  {t('الإعدادات', 'Settings')}
                </TabsTrigger>
              </TabsList>

              <Button onClick={() => setIsComposeOpen(true)} className="gap-2 bg-green-accent hover:bg-green-light">
                <Plus className="w-4 h-4" />
                {t('رسالة جديدة', 'New Email')}
              </Button>
            </div>

            {/* Emails Tab */}
            <TabsContent value="emails" className="space-y-6">
              {/* Filters */}
              <Card data-aos="fade-up">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder={t('بحث في الرسائل...', 'Search emails...')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ps-10"
                      />
                    </div>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <Filter className="w-4 h-4 me-2" />
                        <SelectValue placeholder={t('النوع', 'Type')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('الكل', 'All')}</SelectItem>
                        <SelectItem value="reminder">{t('تذكير', 'Reminder')}</SelectItem>
                        <SelectItem value="newsletter">{t('نشرة', 'Newsletter')}</SelectItem>
                        <SelectItem value="certificate">{t('شهادة', 'Certificate')}</SelectItem>
                        <SelectItem value="promotion">{t('ترويج', 'Promotion')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder={t('الحالة', 'Status')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('الكل', 'All')}</SelectItem>
                        <SelectItem value="sent">{t('مرسل', 'Sent')}</SelectItem>
                        <SelectItem value="scheduled">{t('مجدول', 'Scheduled')}</SelectItem>
                        <SelectItem value="draft">{t('مسودة', 'Draft')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Emails List */}
              <Card data-aos="fade-up">
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    <AnimatePresence>
                      {filteredEmails.map((email, index) => (
                        <motion.div
                          key={email.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-4 hover:bg-muted/30 transition-colors cursor-pointer group"
                          onClick={() => {
                            setSelectedEmail(email);
                            setIsPreviewOpen(true);
                          }}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              email.status === 'sent' ? 'bg-green-accent/10' : 
                              email.status === 'scheduled' ? 'bg-blue-light/10' : 'bg-muted'
                            }`}>
                              <Mail className={`w-5 h-5 ${
                                email.status === 'sent' ? 'text-green-accent' : 
                                email.status === 'scheduled' ? 'text-blue-light' : 'text-muted-foreground'
                              }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                {getTypeBadge(email.type)}
                                {getStatusBadge(email.status)}
                              </div>
                              <h4 className="font-medium truncate group-hover:text-primary transition-colors">
                                {t(email.subject, email.subjectEn)}
                              </h4>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                  <Users className="w-3.5 h-3.5" />
                                  {email.recipientCount} {t('مستلم', 'recipients')}
                                </span>
                                {email.sentAt && (
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {new Date(email.sentAt).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}
                                  </span>
                                )}
                                {email.status === 'sent' && (
                                  <span className="flex items-center gap-1">
                                    <Eye className="w-3.5 h-3.5" />
                                    {email.openRate}% {t('فتح', 'opened')}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Archive className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {filteredEmails.length === 0 && (
                    <div className="text-center py-12">
                      <Inbox className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                      <p className="text-muted-foreground">{t('لا توجد رسائل', 'No emails found')}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card data-aos="fade-up">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-primary" />
                      {t('الإشعارات الأخيرة', 'Recent Notifications')}
                    </CardTitle>
                    {unreadCount > 0 && (
                      <Button variant="ghost" size="sm" className="text-primary">
                        {t('تحديد الكل كمقروء', 'Mark all as read')}
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 cursor-pointer transition-colors ${
                          notification.isRead ? 'bg-background' : 'bg-primary/5'
                        } hover:bg-muted/30`}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            notification.type === 'registration' ? 'bg-green-accent/10' :
                            notification.type === 'certificate' ? 'bg-blue-light/10' :
                            notification.type === 'alert' ? 'bg-yellow-500/10' : 'bg-primary/10'
                          }`}>
                            {notification.type === 'registration' && <Users className="w-5 h-5 text-green-accent" />}
                            {notification.type === 'certificate' && <GraduationCap className="w-5 h-5 text-blue-light" />}
                            {notification.type === 'alert' && <AlertCircle className="w-5 h-5 text-yellow-600" />}
                            {notification.type === 'workshop' && <Calendar className="w-5 h-5 text-primary" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {!notification.isRead && (
                                <span className="w-2 h-2 bg-primary rounded-full" />
                              )}
                              <h4 className="font-medium">
                                {t(notification.titleAr, notification.titleEn)}
                              </h4>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {new Date(notification.createdAt).toLocaleString(isRTL ? 'ar-SA' : 'en-US')}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card data-aos="fade-up">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-primary" />
                    {t('إعدادات الإشعارات', 'Notification Settings')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      id: 'workshopReminders',
                      icon: Bell,
                      labelAr: 'تذكيرات الورش',
                      labelEn: 'Workshop Reminders',
                      descAr: 'استلام تذكيرات قبل موعد الورشة',
                      descEn: 'Receive reminders before workshop date',
                    },
                    {
                      id: 'certificateNotifications',
                      icon: GraduationCap,
                      labelAr: 'إشعارات الشهادات',
                      labelEn: 'Certificate Notifications',
                      descAr: 'إشعار عند جاهزية الشهادة للتحميل',
                      descEn: 'Notify when certificate is ready to download',
                    },
                    {
                      id: 'newsletterSubscription',
                      icon: FileText,
                      labelAr: 'النشرة الإخبارية',
                      labelEn: 'Newsletter Subscription',
                      descAr: 'استلام النشرة الإخبارية الشهرية',
                      descEn: 'Receive monthly newsletter',
                    },
                    {
                      id: 'promotionalEmails',
                      icon: Megaphone,
                      labelAr: 'العروض والترويج',
                      labelEn: 'Promotional Emails',
                      descAr: 'استلام عروض وأكواد خصم حصرية',
                      descEn: 'Receive exclusive offers and discount codes',
                    },
                  ].map((setting, index) => (
                    <motion.div
                      key={setting.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <setting.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{t(setting.labelAr, setting.labelEn)}</h4>
                          <p className="text-sm text-muted-foreground">{t(setting.descAr, setting.descEn)}</p>
                        </div>
                      </div>
                      <Switch
                        checked={emailSettings[setting.id as keyof typeof emailSettings]}
                        onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, [setting.id]: checked })}
                      />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Compose Dialog */}
      <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" />
              {t('إنشاء رسالة جديدة', 'Compose New Email')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t('الموضوع', 'Subject')}</Label>
              <Input
                value={newEmail.subject}
                onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
                placeholder={t('أدخل موضوع الرسالة...', 'Enter email subject...')}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('المستلمون', 'Recipients')}</Label>
                <Select 
                  value={newEmail.recipientType} 
                  onValueChange={(v) => setNewEmail({ ...newEmail, recipientType: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('جميع المشتركين', 'All Subscribers')}</SelectItem>
                    <SelectItem value="members">{t('الأعضاء فقط', 'Members Only')}</SelectItem>
                    <SelectItem value="workshop">{t('مشاركو ورشة', 'Workshop Participants')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t('القالب', 'Template')}</Label>
                <Select 
                  value={newEmail.template} 
                  onValueChange={(v) => setNewEmail({ ...newEmail, template: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">{t('مخصص', 'Custom')}</SelectItem>
                    <SelectItem value="reminder">{t('تذكير', 'Reminder')}</SelectItem>
                    <SelectItem value="newsletter">{t('نشرة إخبارية', 'Newsletter')}</SelectItem>
                    <SelectItem value="certificate">{t('شهادة', 'Certificate')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t('المحتوى', 'Content')}</Label>
              <Textarea
                value={newEmail.content}
                onChange={(e) => setNewEmail({ ...newEmail, content: e.target.value })}
                placeholder={t('اكتب محتوى الرسالة هنا...', 'Write email content here...')}
                className="min-h-[200px]"
              />
            </div>

            {/* Preview */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4 text-primary" />
                <span className="font-medium">{t('معاينة', 'Preview')}</span>
              </div>
              <div className="bg-background rounded-lg p-4">
                <div className="border-b pb-3 mb-3">
                  <p className="text-sm text-muted-foreground">{t('من:', 'From:')} SPTA &lt;noreply@spta.ksu.edu.sa&gt;</p>
                  <p className="text-sm text-muted-foreground">{t('الموضوع:', 'Subject:')} {newEmail.subject || t('(بدون موضوع)', '(No subject)')}</p>
                </div>
                <p className="text-sm whitespace-pre-wrap">{newEmail.content || t('(بدون محتوى)', '(No content)')}</p>
              </div>
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
              {t('حفظ كمسودة', 'Save as Draft')}
            </Button>
            <Button 
              onClick={handleSend} 
              className="bg-green-accent hover:bg-green-light gap-2"
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  {t('جاري الإرسال...', 'Sending...')}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {t('إرسال', 'Send')}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              {t('معاينة الرسالة', 'Email Preview')}
            </DialogTitle>
          </DialogHeader>
          
          {selectedEmail && (
            <div className="py-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {getTypeBadge(selectedEmail.type)}
                  {getStatusBadge(selectedEmail.status)}
                </div>
                <h3 className="text-xl font-bold">{t(selectedEmail.subject, selectedEmail.subjectEn)}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {selectedEmail.recipientCount} {t('مستلم', 'recipients')}
                  </span>
                  {selectedEmail.sentAt && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedEmail.sentAt).toLocaleString(isRTL ? 'ar-SA' : 'en-US')}
                    </span>
                  )}
                </div>

                {selectedEmail.status === 'sent' && (
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <MailCheck className="w-8 h-8 mx-auto mb-2 text-green-accent" />
                        <p className="text-2xl font-bold">{selectedEmail.recipientCount}</p>
                        <p className="text-sm text-muted-foreground">{t('مرسل', 'Delivered')}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Eye className="w-8 h-8 mx-auto mb-2 text-blue-light" />
                        <p className="text-2xl font-bold">{selectedEmail.openRate}%</p>
                        <p className="text-sm text-muted-foreground">{t('معدل الفتح', 'Open Rate')}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Sparkles className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold">{Math.round(selectedEmail.recipientCount * selectedEmail.openRate / 100)}</p>
                        <p className="text-sm text-muted-foreground">{t('فتحوا الرسالة', 'Opened')}</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              {t('إغلاق', 'Close')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default EmailNotificationsPage;
