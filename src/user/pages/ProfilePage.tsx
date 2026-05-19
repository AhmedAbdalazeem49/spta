import { CertificateCard } from "@/components/admin/certificates/CertificateCard";
import DigitalMembershipCard from "@/components/DigitalMembershipCard";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { Certificate } from "@/types/certificate";
import AOS from "aos";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Award,
  Bell,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  Download,
  Edit,
  Eye,
  FileText,
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Save,
  Settings,
  Shield,
  User,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export interface ActiveMembership {
  id: number;
  user_id?: number;

  membership_type: string; // "active | affiliate | intern | student"
  membership_number?: string;

  starts_at: string;
  ends_at: string;
  status: string;

  created_at?: string;
  updated_at?: string;
}

const ProfilePage = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeMembership, setActiveMembership] =
    useState<ActiveMembership | null>(null);
  const [membershipLoading, setMembershipLoading] = useState(true);
  const [membershipError, setMembershipError] = useState(false);
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [showCardModal, setShowCardModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [showCertDetails, setShowCertDetails] = useState(false);
  const [showCertPreview, setShowCertPreview] = useState(false);

  // Profile edit state
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    name_ar: "",
    phone: "",
    employer: "",
    specialization: "",
    sub_specialization: "",
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchMembership();
  }, []);

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || "",
        name_ar: user.name_ar || "",
        phone: user.phone || "",
        employer: user.employer || "",
        specialization: user.specialization || "",
        sub_specialization: user.sub_specialization || "",
      });
    }
  }, [user]);

  const fetchMembership = async () => {
    setMembershipLoading(true);
    try {
      const res = await api.get("/membership/my-membership");
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
      const res = await api.get("/my-workshops");
      setWorkshops(res.data.data || []);
    } catch {
      setWorkshops([]);
    }
  };

  const fetchCertificates = async () => {
    try {
      const res = await api.get("/my-certificates");
      setCertificates(res.data.data || []);
    } catch {
      setCertificates([]);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await api.put("/profile/update", editForm);
      toast({
        title: t("تم بنجاح", "Success"),
        description: t("تم تحديث الملف الشخصي", "Profile updated"),
      });
      setIsEditing(false);
    } catch (err: any) {
      toast({
        title: t("خطأ", "Error"),
        description: err.response?.data?.message || t("حدث خطأ", "Error"),
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const configs: Record<
      string,
      { color: string; icon: any; labelAr: string; labelEn: string }
    > = {
      active: {
        color: "bg-green-accent/10 text-green-accent border-green-accent/30",
        icon: CheckCircle,
        labelAr: "نشط",
        labelEn: "Active",
      },
      expired: {
        color: "bg-destructive/10 text-destructive border-destructive/30",
        icon: XCircle,
        labelAr: "منتهي",
        labelEn: "Expired",
      },
      pending: {
        color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
        icon: AlertCircle,
        labelAr: "قيد الانتظار",
        labelEn: "Pending",
      },
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
    { id: "overview", labelAr: "نظرة عامة", labelEn: "Overview", icon: User },
    {
      id: "workshops",
      labelAr: "ورش العمل",
      labelEn: "Workshops",
      icon: GraduationCap,
    },
    {
      id: "certificates",
      labelAr: "الشهادات",
      labelEn: "Certificates",
      icon: Award,
    },
    { id: "edit", labelAr: "تعديل الملف", labelEn: "Edit Profile", icon: Edit },
  ];

  const openCertDetails = (cert: Certificate) => {
    setSelectedCert(cert);
    setShowCertDetails(true);
  };

  const openCertPreview = (cert: Certificate) => {
    setSelectedCert(cert);
    setShowCertPreview(true);
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: t("تم النسخ", "Copied"),
      description: t("تم نسخ رابط التحقق", "Verification link copied"),
    });
  };

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
                            <p className="font-semibold">
                              {activeMembership?.membership_type}
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
                    <div className="mt-6 pt-6 border-t border-border flex flex-wrap gap-2">
                      {/* Only show subscribe button when NOT subscribed */}
                      {!activeMembership && (
                        <Button
                          onClick={() => navigate("/membership")}
                          className="gap-2"
                        >
                          <RefreshCw className="w-4 h-4" />
                          {t("اشترك بالعضوية", "Subscribe Now")}
                        </Button>
                      )}

                      {/* Renew button only when subscribed */}
                      {activeMembership && (
                        <Button
                          onClick={() => navigate("/membership")}
                          variant="outline"
                          className="gap-2 hidden"
                        >
                          <RefreshCw className="w-4 h-4" />
                          {t("تجديد العضوية", "Renew Membership")}
                        </Button>
                      )}

                      {activeMembership && (
                        <Button
                          onClick={() => setShowCardModal(true)}
                          className="gap-2"
                        >
                          <FileText className="w-4 h-4" />
                          {t("البطاقة الرقمية", "Membership Card")}
                        </Button>
                      )}
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
            {/* Certificates Tab */}
            {activeTab === "certificates" && (
              <motion.div
                key="certificates"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {certificates.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-4">
                      <Award className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      {t("لا توجد شهادات بعد", "No Certificates Yet")}
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-xs">
                      {t(
                        "ستظهر شهاداتك هنا بعد إتمام ورش العمل",
                        "Your certificates will appear here after completing workshops"
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                      {certificates.map((cert, index) => (
                        <motion.div
                          key={cert.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <CertificateCard
                            cert={cert}
                            onOpenDetails={openCertDetails}
                            onOpenPreview={openCertPreview}
                            onCopyLink={handleCopyLink}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
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
                    <div className="mb-8 flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
                      <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                      <p className="text-sm leading-relaxed">
                        {t(
                          "لتعديل المعلومات الأساسية أو الرسمية (مثل الاسم أو رقم الهوية)، يرجى التواصل معنا عبر البريد الإلكتروني أو الواتساب وسيقوم فريق الإدارة بمساعدتك.",
                          "If you need to modify sensitive information such as your name or official data, please contact us via email or WhatsApp and our administration team will assist you."
                        )}
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
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
          </AnimatePresence>
        </div>
      </section>

      {/* Digital Card Modal */}
      {showCardModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowCardModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-background rounded-3xl shadow-2xl w-full max-w-lg p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowCardModal(false)}
              className="absolute top-4 end-4 w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
            >
              <XCircle className="w-4 h-4 text-muted-foreground" />
            </button>

            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              {t("بطاقة العضوية الرقمية", "Digital Membership Card")}
            </h2>

            <DigitalMembershipCard
              member={{
                fullName: user?.name || "",
                fullNameEn: user?.name || "",
                membershipNumber: activeMembership?.membership_number || "—",
                membershipType:
                  (activeMembership?.membership_type as any) || "active",
                expiryDate: activeMembership?.ends_at || "",
                workplace: user?.employer || "",
                workplaceEn: user?.employer || "",
              }}
              showControls={true}
              showSignature={true}
              showStamp={true}
            />
          </motion.div>
        </div>
      )}

      {/* Certificate Details Modal */}
      {showCertDetails && selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowCertDetails(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-background rounded-3xl shadow-2xl w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCertDetails(false)}
              className="absolute top-4 end-4 w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
            >
              <XCircle className="w-4 h-4 text-muted-foreground" />
            </button>

            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">
                {t("تفاصيل الشهادة", "Certificate Details")}
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  label: t("الاسم", "Name"),
                  value: selectedCert.recipientNameAr || selectedCert.recipientNameEn,
                },
                {
                  label: t("رقم الشهادة", "Certificate ID"),
                  value: selectedCert.id,
                  mono: true,
                },
                {
                  label: t("تاريخ الإصدار", "Issue Date"),
                  value: selectedCert.issue_date
                    ? new Date(selectedCert.issue_date).toLocaleDateString(
                        isRTL ? "ar-SA" : "en-US"
                      )
                    : "—",
                },
                {
                  label: t("الساعات التدريبية", "Training Hours"),
                  value: selectedCert.hours
                    ? `${selectedCert.hours} ${t("ساعة", "hrs")}`
                    : "—",
                },
                { label: t("الحالة", "Status"), value: selectedCert.status },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b border-border last:border-0"
                >
                  <span className="text-sm text-muted-foreground">
                    {row.label}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      row.mono ? "font-mono" : ""
                    }`}
                  >
                    {row.value || "—"}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Certificate Preview Modal */}
      {showCertPreview && selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowCertPreview(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-background rounded-3xl shadow-2xl w-full max-w-2xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCertPreview(false)}
              className="absolute top-4 end-4 w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
            >
              <XCircle className="w-4 h-4 text-muted-foreground" />
            </button>

            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">
                {t("معاينة الشهادة", "Certificate Preview")}
              </h2>
            </div>

            {/* Certificate visual */}
            <div className="relative bg-gradient-to-br from-midnight to-dark-navy rounded-2xl p-8 text-white text-center overflow-hidden">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2.5l5 3.5-5 3.5z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative z-10">
                <Award className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                <p className="text-sm opacity-60 mb-1">
                  {t("شهادة حضور", "Certificate of Attendance")}
                </p>
                <h3 className="text-2xl font-bold mb-2">{user?.name}</h3>
                <p className="opacity-70 mb-4">
                  {t("أتم بنجاح", "has successfully completed")}
                </p>
                <h4 className="text-xl font-semibold mb-6 text-yellow-300">
                  {selectedCert.recipientNameAr || selectedCert.recipientNameEn}
                </h4>
                <div className="flex justify-center gap-8 text-sm opacity-70">
                  <span>
                    {selectedCert.issue_date
                      ? new Date(selectedCert.issue_date).toLocaleDateString(
                          isRTL ? "ar-SA" : "en-US"
                        )
                      : "—"}
                  </span>
                  {selectedCert.hours && (
                    <span>
                      {selectedCert.hours} {t("ساعات", "hrs")}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button className="flex-1 gap-2">
                <Download className="w-4 h-4" />
                {t("تحميل PDF", "Download PDF")}
              </Button>
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => handleCopyLink(selectedCert.id?.toString())}
              >
                <Copy className="w-4 h-4" />
                {t("نسخ الرابط", "Copy Link")}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </Layout>
  );
};

export default ProfilePage;
