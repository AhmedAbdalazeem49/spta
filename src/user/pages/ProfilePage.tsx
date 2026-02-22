import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import {
  User, Award, Calendar, Mail, Settings, Download, Eye, Clock,
  CheckCircle, XCircle, AlertCircle, GraduationCap, Building2,
  Phone, MapPin, FileText, Bell, Shield, Crown, ArrowRight,
  Edit, Loader2, Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import api from '@/services/api';

interface ActiveMembership {
  id: number;
  membership_id: number;
  starts_at: string;
  ends_at: string;
  status: string;
  membership?: {
    id: number;
    name: string;
    name_ar?: string;
    price?: number;
  };
}

const ProfilePage = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeMembership, setActiveMembership] = useState<ActiveMembership | null>(null);
  const [membershipLoading, setMembershipLoading] = useState(true);
  const [membershipError, setMembershipError] = useState(false);
  const [workshops, setWorkshops] = useState<any[]>([]);
const [certificates, setCertificates] = useState<any[]>([]);

  // Profile edit state
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '', name_ar: '', phone: '', employer: '',
    specialization: '', sub_specialization: '',
  });

  const [emailSettings, setEmailSettings] = useState({
    newsletters: true,
    workshopReminders: true,
    membershipAlerts: true,
    promotions: false,
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchMembership();
  }, []);

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || '',
        name_ar: user.name_ar || '',
        phone: user.phone || '',
        employer: user.employer || '',
        specialization: user.specialization || '',
        sub_specialization: user.sub_specialization || '',
      });
    }
  }, [user]);

  const fetchMembership = async () => {
    setMembershipLoading(true);
    try {
      const res = await api.get('/membership/my-membership');
      const data = res.data?.data || res.data;
      setActiveMembership(data || null);
    } catch {
      setActiveMembership(null);
      setMembershipError(true);
    } finally {
      setMembershipLoading(false);
    }
  };

  useEffect(() => {
  fetchWorkshops();
  fetchCertificates();
}, []);

const fetchWorkshops = async () => {
  try {
    const res = await api.get('/my-workshops');
    setWorkshops(res.data.data || []);
  } catch {
    setWorkshops([]);
  }
};

const fetchCertificates = async () => {
  try {
    const res = await api.get('/my-certificates');
    setCertificates(res.data.data || []);
  } catch {
    setCertificates([]);
  }
};

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await api.put('/me', editForm);
      toast({ title: t('تم بنجاح', 'Success'), description: t('تم تحديث الملف الشخصي', 'Profile updated') });
      setIsEditing(false);
    } catch (err: any) {
      toast({
        title: t('خطأ', 'Error'),
        description: err.response?.data?.message || t('حدث خطأ', 'Error'),
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const configs: Record<string, { color: string; icon: any; labelAr: string; labelEn: string }> = {
      active: { color: 'bg-green-accent/10 text-green-accent border-green-accent/30', icon: CheckCircle, labelAr: 'نشط', labelEn: 'Active' },
      expired: { color: 'bg-destructive/10 text-destructive border-destructive/30', icon: XCircle, labelAr: 'منتهي', labelEn: 'Expired' },
      pending: { color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30', icon: AlertCircle, labelAr: 'قيد الانتظار', labelEn: 'Pending' },
    };
    const config = configs[status] || configs.pending;
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
  { id: 'membership', labelAr: 'العضوية', labelEn: 'Membership', icon: Crown },
  { id: 'edit', labelAr: 'تعديل الملف', labelEn: 'Edit Profile', icon: Edit },
  { id: 'settings', labelAr: 'الإعدادات', labelEn: 'Settings', icon: Settings },
];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary-dark py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <div
            className="flex flex-col md:flex-row items-center gap-8"
            data-aos="fade-up"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-teal flex items-center justify-center text-primary-foreground text-4xl font-bold shadow-lg">
                {user?.name?.charAt(0) || "U"}
              </div>
              {activeMembership?.status === "active" && (
                <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-green-accent flex items-center justify-center shadow-md">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
            <div className="text-center md:text-start">
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                {user?.name || t("المستخدم", "User")}
              </h1>
              <p className="text-white/70 text-lg mb-3">
                {user?.specialization || user?.email}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Badge
                  variant="outline"
                  className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30 gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5" />
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
          <div
            className="flex flex-wrap justify-center gap-2 mb-8"
            data-aos="fade-up"
          >
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className={`gap-2 transition-all duration-300 ${
                  activeTab === tab.id ? "shadow-md" : "hover:bg-primary/5"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {t(tab.labelAr, tab.labelEn)}
              </Button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Membership Status Card */}
                <Card className="card-hover lg:col-span-2" data-aos="fade-up">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Shield className="w-5 h-5 text-primary" />
                      {t("حالة العضوية", "Membership Status")}
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
                            <p className="text-sm text-muted-foreground">
                              {t("نوع العضوية", "Membership Type")}
                            </p>
                            <p className="font-semibold"></p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Award className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {t("نوع العضوية", "Membership Type")}
                            </p>
                            <p className="font-semibold">
                              {activeMembership?.membership?.name_ar ||
                                activeMembership?.membership?.name ||
                                "—"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {t("تاريخ الانضمام", "Join Date")}
                            </p>
                            <p className="font-semibold">
                              {activeMembership?.starts_at
                                ? new Date(
                                    activeMembership.starts_at
                                  ).toLocaleDateString(
                                    isRTL ? "ar-SA" : "en-US"
                                  )
                                : "—"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-green-accent/10 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-green-accent" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {t("تاريخ الانتهاء", "Expiry Date")}
                            </p>
                            <p className="font-semibold">
                              {activeMembership?.ends_at
                                ? new Date(
                                    activeMembership.ends_at
                                  ).toLocaleDateString(
                                    isRTL ? "ar-SA" : "en-US"
                                  )
                                : "—"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {t("الحالة", "Status")}
                            </p>
                            {activeMembership?.status
                              ? getStatusBadge(activeMembership.status)
                              : "—"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-border">
                      <Button className="w-full sm:w-auto gap-2 bg-green-accent hover:bg-green-light">
                        <FileText className="w-4 h-4" />
                        {t("تجديد العضوية", "Renew Membership")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card
                  className="card-hover"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">
                      {t("إحصائيات سريعة", "Quick Stats")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-muted-foreground">
                        {t("ورش العمل", "Workshops")}
                      </span>
                      <span className="text-2xl font-bold text-primary"></span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-muted-foreground">
                        {t("الشهادات", "Certificates")}
                      </span>
                      <span className="text-2xl font-bold text-green-accent"></span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-muted-foreground">
                        {t("سنوات العضوية", "Years Member")}
                      </span>
                      <span className="text-2xl font-bold text-primary">2</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Personal Info */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Mail,
                      label: t("البريد", "Email"),
                      value: user?.email,
                    },
                    {
                      icon: Phone,
                      label: t("الهاتف", "Phone"),
                      value: user?.phone,
                    },
                    {
                      icon: Building2,
                      label: t("جهة العمل", "Employer"),
                      value: user?.employer,
                    },
                    {
                      icon: GraduationCap,
                      label: t("التخصص", "Specialization"),
                      value: user?.specialization,
                    },
                    {
                      icon: FileText,
                      label: t("التخصص الدقيق", "Sub-specialization"),
                      value: user?.sub_specialization,
                    },
                    {
                      icon: Shield,
                      label: t("رقم الهوية", "National ID"),
                      value: user?.national_id,
                    },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {item.label}
                          </p>
                          <p className="font-medium text-sm">
                            {item.value || "—"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Workshops Tab */}
            {activeTab === "workshops" && (
              <motion.div
                key="membership"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden" data-aos="fade-up">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      {t("ورش العمل المسجل بها", "Registered Workshops")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="text-start p-4 font-semibold">
                              {t("اسم الورشة", "Workshop Name")}
                            </th>
                            <th className="text-start p-4 font-semibold">
                              {t("التاريخ", "Date")}
                            </th>
                            <th className="text-start p-4 font-semibold">
                              {t("الحالة", "Status")}
                            </th>
                            <th className="text-start p-4 font-semibold">
                              {t("الإجراءات", "Actions")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {workshops.map((workshop, index) => (
                            <tr
                              key={workshop.id}
                              className="border-t border-border hover:bg-muted/30 transition-colors"
                              data-aos="fade-up"
                              data-aos-delay={index * 100}
                            >
                              <td className="p-4">
                                <p className="font-medium">
                                  {t(workshop.titleAr, workshop.titleEn)}
                                </p>
                              </td>
                              <td className="p-4">
                                {new Date(workshop.date).toLocaleDateString(
                                  isRTL ? "ar-SA" : "en-US"
                                )}
                              </td>
                              <td className="p-4">
                                <Badge
                                  variant="outline"
                                  className={
                                    workshop.status === "completed"
                                      ? "bg-green-accent/10 text-green-accent border-green-accent/30"
                                      : "bg-blue-light/10 text-blue-light border-blue-light/30"
                                  }
                                >
                                  {workshop.status === "completed"
                                    ? t("مكتملة", "Completed")
                                    : t("قادمة", "Upcoming")}
                                </Badge>
                              </td>
                              <td className="p-4">
                                {workshop.certificateAvailable && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="gap-2"
                                  >
                                    <Download className="w-4 h-4" />
                                    {t("الشهادة", "Certificate")}
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
            {activeTab === "certificates" && (
              <motion.div
                key="certificates"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {certificates.length === 0 ? (
                  <Card className="card-hover">
                    <CardContent className="py-16 text-center">
                      <Crown className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-xl font-bold mb-2">
                        {t("لا توجد شهادات بعد", "No Certificates Yet")}
                      </h3>
                    </CardContent>
                  </Card>
                ) : (
                  certificates.map((cert, index) => (
                    <Card key={cert.id} className="card-hover group">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-2">
                          {cert.title_ar || cert.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {new Date(cert.issue_date).toLocaleDateString(
                            isRTL ? "ar-SA" : "en-US"
                          )}
                        </p>
                        <Button size="sm" className="gap-2">
                          <Download className="w-4 h-4" />
                          {t("تحميل", "Download")}
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </motion.div>
            )}

            {/* Edit Profile Tab */}
            {activeTab === "edit" && (
              <motion.div
                key="edit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto"
              >
                <Card className="shadow-lg rounded-3xl" data-aos="fade-up">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Edit className="w-5 h-5 text-primary" />
                      {t("تعديل الملف الشخصي", "Edit Profile")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          {t("الاسم (English)", "Name (English)")}
                        </Label>
                        <Input
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          className="focus-visible:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          {t("الاسم (عربي)", "Name (Arabic)")}
                        </Label>
                        <Input
                          value={editForm.name_ar}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              name_ar: e.target.value,
                            })
                          }
                          className="focus-visible:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          {t("رقم الجوال", "Phone")}
                        </Label>
                        <Input
                          value={editForm.phone}
                          onChange={(e) =>
                            setEditForm({ ...editForm, phone: e.target.value })
                          }
                          className="focus-visible:ring-primary"
                          dir="ltr"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          {t("جهة العمل", "Employer")}
                        </Label>
                        <Input
                          value={editForm.employer}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              employer: e.target.value,
                            })
                          }
                          className="focus-visible:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          {t("التخصص", "Specialization")}
                        </Label>
                        <Input
                          value={editForm.specialization}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              specialization: e.target.value,
                            })
                          }
                          className="focus-visible:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          {t("التخصص الدقيق", "Sub-specialization")}
                        </Label>
                        <Input
                          value={editForm.sub_specialization}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              sub_specialization: e.target.value,
                            })
                          }
                          className="focus-visible:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border">
                      <Button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="gap-2 w-full sm:w-auto"
                        size="lg"
                      >
                        {isSaving ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        {t("حفظ التعديلات", "Save Changes")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
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
                      {t("إعدادات البريد الإلكتروني", "Email Settings")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        key: "newsletters",
                        labelAr: "النشرة الإخبارية",
                        labelEn: "Newsletters",
                        descAr: "استلام آخر الأخبار والتحديثات",
                        descEn: "Receive latest news and updates",
                      },
                      {
                        key: "workshopReminders",
                        labelAr: "تذكيرات ورش العمل",
                        labelEn: "Workshop Reminders",
                        descAr: "تذكيرات قبل موعد ورش العمل",
                        descEn: "Reminders before workshop dates",
                      },
                      {
                        key: "membershipAlerts",
                        labelAr: "تنبيهات العضوية",
                        labelEn: "Membership Alerts",
                        descAr: "إشعارات انتهاء وتجديد العضوية",
                        descEn: "Expiry and renewal notifications",
                      },
                      {
                        key: "promotions",
                        labelAr: "العروض الترويجية",
                        labelEn: "Promotions",
                        descAr: "عروض وخصومات حصرية للأعضاء",
                        descEn: "Exclusive member offers and discounts",
                      },
                    ].map((setting, index) => (
                      <div
                        key={setting.key}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        data-aos="fade-up"
                        data-aos-delay={index * 50}
                      >
                        <div>
                          <p className="font-medium">
                            {t(setting.labelAr, setting.labelEn)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t(setting.descAr, setting.descEn)}
                          </p>
                        </div>
                        <Switch
                          checked={
                            emailSettings[
                              setting.key as keyof typeof emailSettings
                            ]
                          }
                          onCheckedChange={(checked) =>
                            setEmailSettings((prev) => ({
                              ...prev,
                              [setting.key]: checked,
                            }))
                          }
                        />
                      </div>
                    ))}
                    <div className="pt-4">
                      <Button className="w-full gap-2">
                        <Settings className="w-4 h-4" />
                        {t("حفظ الإعدادات", "Save Settings")}
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