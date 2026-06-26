import CertificatesTab from "@/components/CertificatesTab";
import DigitalMembershipCard from "@/components/DigitalMembershipCard";
import Layout from "@/components/layout/Layout";
import ProfileImageModal from "@/components/ProfileImageModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import WorkshopsTab from "@/components/WorkshopsTab";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import AOS from "aos";
import { AnimatePresence, motion } from "framer-motion";
import QRCode from "react-qr-code";

import {
  Award,
  Building2,
  Camera,
  CheckCircle,
  FileText,
  GraduationCap,
  Mail,
  Phone,
  QrCode,
  RefreshCw,
  Shield,
  User,
} from "lucide-react";

import { AlertCircle, Edit, Loader2, Save, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface ActiveMembership {
  id: number;
  user_id?: number;

  membership_type: string;
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
  const [showCardModal, setShowCardModal] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(
    user?.profile_image
      ? `${import.meta.env.VITE_Storage_URL}/${user.profile_image}`
      : null,
  );
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
    classification_number: "",
    region: "",
    city: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [certificateSettings, setCertificateSettings] = useState<any>(null);

  useEffect(() => {
    fetchCertificateSettings();
  }, []);

  const fetchCertificateSettings = async () => {
    try {
      const response = await api.get("/certificate-settings");

      setCertificateSettings(response.data?.data || response.data);
    } catch (error) {
      console.error("Failed to fetch certificate settings", error);
    }
  };

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
        classification_number: user.classification_number || "",
        region: user.region || "",
        city: user.city || "",
      });
    }
  }, [user]);

  const fetchMembership = async () => {
    setMembershipLoading(true);

    try {
      const res = await api.get("/membership/my-membership");

      const data = res.data?.data;

      // ensure only valid object is stored
      setActiveMembership(data ?? null);
    } catch (error) {
      setActiveMembership(null);
      setMembershipError(true);
    } finally {
      setMembershipLoading(false);
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary-dark py-24 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Soft radial glow behind avatar for depth */}
        <div className="absolute top-1/2 start-1/4 -translate-y-1/2 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10">
          <div
            className="flex flex-col md:flex-row items-center gap-8 md:gap-10"
            data-aos="fade-up"
          >
            {/* Avatar + Edit Section */}
            <div className="relative shrink-0">
              {/* Avatar ring */}
              <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-br from-white/40 to-white/10 shadow-xl">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-primary to-teal flex items-center justify-center ring-4 ring-primary-dark/20">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      className="w-full h-full object-cover"
                      alt={t("الصورة الشخصية", "Profile photo")}
                    />
                  ) : (
                    <span className="text-4xl font-bold text-white">
                      {user?.name?.charAt(0) || "U"}
                    </span>
                  )}
                </div>

                {/* Active badge */}
                {activeMembership?.status === "active" && (
                  <div className="absolute -bottom-1 -end-1 w-9 h-9 rounded-full bg-green-accent flex items-center justify-center shadow-md ring-2 ring-primary">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              {/* Edit / Camera button */}
              <button
                onClick={() => setImageModalOpen(true)}
                className="absolute -bottom-1 -start-1 w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-lg ring-4 ring-primary-dark/10 hover:bg-white/90 hover:scale-105 active:scale-95 transition-all"
                aria-label={t("تغيير الصورة الشخصية", "Change profile photo")}
              >
                <Camera className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* User Info */}
            <div className="text-center md:text-start flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                {user?.name || t("المستخدم", "User")}
              </h1>

              <p className="text-white/70 text-lg mb-4">
                {user?.specialization || user?.email}
              </p>

              {/* Role / Badge */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Badge
                  variant="outline"
                  className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30 gap-1.5 px-3 py-1.5"
                >
                  <Shield className="w-3.5 h-3.5" />
                  {t("عضو", "Member")}
                </Badge>

                <button
                  onClick={() => setImageModalOpen(true)}
                  className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-full px-3 py-1.5 transition"
                >
                  <Edit className="w-3.5 h-3.5" />
                  {t("تغيير الصورة الشخصية", "Change profile photo")}
                </button>
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
                className="space-y-10"
              >
                {/* Premium Membership Card */}
                <Card
                  className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-primary/90 text-white"
                  data-aos="fade-up"
                >
                  {/* Background Effects */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-32 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-32 -left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />

                    {/* Premium Pattern */}
                    <div className="absolute inset-0 opacity-[0.04]">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: `
                linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
              `,
                          backgroundSize: "30px 30px",
                        }}
                      />
                    </div>
                  </div>

                  <CardContent className="relative p-0">
                    <div className="grid lg:grid-cols-[1.3fr_420px]">
                      {/* Left Content */}
                      <div className="p-8 lg:p-10">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-5">
                              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg">
                                <Shield className="w-7 h-7 text-white" />
                              </div>

                              <div>
                                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
                                  {t("بطاقة العضوية", "Membership Card")}
                                </h2>

                                <p className="text-white/70 mt-1 text-sm">
                                  {t(
                                    "الهوية الرقمية الرسمية للعضو",
                                    "Official Digital Member Identity",
                                  )}
                                </p>
                              </div>
                            </div>

                            {/* Status Badge */}
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                              <CheckCircle className="w-4 h-4 text-emerald-300" />

                              {activeMembership?.status
                                ? getStatusBadge(activeMembership.status)
                                : t("غير مشترك", "Not Subscribed")}
                            </div>
                          </div>

                          {/* Membership Type */}
                          {activeMembership && (
                            <div className="hidden sm:flex flex-col items-end">
                              <span className="text-white/60 text-xs uppercase tracking-[0.3em] mb-2">
                                {t("نوع العضوية", "Membership")}
                              </span>

                              <div className="px-5 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg">
                                <span className="font-semibold text-base">
                                  {activeMembership?.membership_type ||
                                    "Member"}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Divider */}
                        <div className="h-px w-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 my-8" />

                        {/* Member Information */}
                        <div className="grid sm:grid-cols-1 gap-6">
                          <div className="space-y-5">
                            <div>
                              <p className="text-xs uppercase tracking-[0.25em] text-white/50 mb-2">
                                {t("اسم العضو", "Member Name")}
                              </p>

                              <h3 className="text-md md:text-xl font-bold text-white break-all">
                                {user?.name || "—"}
                              </h3>
                            </div>

                            <div>
                              <p className="text-xs uppercase tracking-[0.25em] text-white/50 mb-2">
                                {t("البريد الإلكتروني", "Email")}
                              </p>

                              <p className="text-md md:text-xl text-white/85 break-all">
                                {user?.email || "—"}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs uppercase tracking-[0.25em] text-white/50 mb-2">
                                {t(
                                  "رقم الهوية / الإقامة",
                                  "National ID / Iqama",
                                )}
                              </p>

                              <p className="text-white/85 tracking-widest">
                                {user?.national_id || "—"}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-5">
                            <div>
                              <p className="text-xs uppercase tracking-[0.25em] text-white/50 mb-2">
                                {t("تاريخ الانضمام", "Join Date")}
                              </p>

                              <p className="text-white/85">
                                {activeMembership?.starts_at
                                  ? new Date(
                                      activeMembership.starts_at,
                                    ).toLocaleDateString(
                                      isRTL ? "ar-SA" : "en-US",
                                    )
                                  : "—"}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs uppercase tracking-[0.25em] text-white/50 mb-2">
                                {t("تاريخ الانتهاء", "Expiry Date")}
                              </p>

                              <p className="text-white/85">
                                {activeMembership?.ends_at
                                  ? new Date(
                                      activeMembership.ends_at,
                                    ).toLocaleDateString(
                                      isRTL ? "ar-SA" : "en-US",
                                    )
                                  : "—"}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs uppercase tracking-[0.25em] text-white/50 mb-2">
                                {t("رقم العضوية", "Membership ID")}
                              </p>

                              <p className="text-white tracking-[0.3em] font-semibold">
                                #
                                {activeMembership?.membership_number || "00000"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-10 flex flex-wrap items-center gap-4">
                          {!activeMembership ? (
                            <Button
                              onClick={() => navigate("/membership")}
                              size="lg"
                              className="rounded-2xl bg-white text-slate-900 hover:bg-white/90 shadow-xl gap-2"
                            >
                              <RefreshCw className="w-4 h-4" />

                              {t("اشترك الآن", "Subscribe Now")}
                            </Button>
                          ) : (
                            <>
                              <Button
                                onClick={() => setShowCardModal(true)}
                                size="lg"
                                className="rounded-2xl bg-white text-slate-900 hover:bg-white/90 shadow-xl gap-2"
                              >
                                <FileText className="w-4 h-4" />

                                {t("عرض البطاقة", "View Card")}
                              </Button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Right Side */}
                      <div className="relative border-t lg:border-t-0 lg:border-s border-white/10 bg-black/10 backdrop-blur-xl p-8 flex flex-col justify-center">
                        {/* QR Section */}
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <p className="text-xs uppercase tracking-[0.25em] text-white/50 mb-2">
                                {t("التحقق الرقمي", "Digital Verification")}
                              </p>

                              <h3 className="font-semibold text-lg">
                                {t("رمز الاستجابة السريعة", "QR Verification")}
                              </h3>
                            </div>

                            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                              <QrCode className="w-6 h-6 text-white" />
                            </div>
                          </div>

                          {/* QR Card */}
                          <div className="rounded-3xl bg-white p-5 shadow-2xl w-fit mx-auto">
                            <QRCode
                              value={`${window.location.origin}/verify-membership/${activeMembership?.membership_number}`}
                              size={180}
                              bgColor="#ffffff"
                              fgColor="#000000"
                              level="H"
                            />
                          </div>

                          <p className="text-center text-sm text-white/60 mt-5 leading-relaxed">
                            {t(
                              "قم بمسح الرمز للتحقق من العضوية وعرض بيانات البطاقة الرسمية",
                              "Scan to verify membership and display official member card",
                            )}
                          </p>
                        </div>

                        {/* Certificate Settings */}
                        <div className="mt-10 hidden">
                          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
                            <div className="flex items-center gap-3 mb-5">
                              <Award className="w-5 h-5 text-primary" />

                              <h4 className="font-semibold">
                                {t(
                                  "اعتماد الشهادة الرسمية",
                                  "Official Certificate Approval",
                                )}
                              </h4>
                            </div>

                            {/* Signature */}
                            <div className="space-y-5">
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-[0.2em] mb-2">
                                  {t("اسم رئيس المجلس", "Chairman Name")}
                                </p>

                                <p className="font-semibold text-white">
                                  {certificateSettings?.chairman_name || "—"}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-[0.2em] mb-3">
                                  {t("التوقيع الرسمي", "Official Signature")}
                                </p>

                                {certificateSettings?.signature_image ? (
                                  <div className="w-full rounded-2xl bg-white p-3 inline-flex shadow-lg">
                                    <img
                                      src={`${import.meta.env.VITE_Storage_URL}/storage/${certificateSettings.signature_image.replace(/^\/storage\//, "")}`}
                                      alt="signature"
                                      className="w-full h-16 object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="h-16 rounded-2xl border border-dashed border-white/20 flex items-center justify-center text-white/40 text-sm">
                                    {t("لا يوجد توقيع", "No Signature")}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Personal Info */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                      label: t("رقم الهوية / الإقامة", "National ID / Iqama"),
                      value: user?.national_id,
                    },
                    {
                      icon: Shield,
                      label: t("رقم التصنيف", "Classification Number"),
                      value: user?.classification_number,
                    },
                    {
                      icon: Building2,
                      label: t("المنطقة", "Region"),
                      value: user?.region,
                    },
                    {
                      icon: Building2,
                      label: t("المدينة", "City"),
                      value: user?.city,
                    },
                  ].map((item, i) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={i}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="group relative overflow-hidden rounded-3xl border border-border/50 bg-background/80 backdrop-blur-xl p-5 shadow-sm hover:shadow-xl transition-all duration-300"
                      >
                        {/* Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative flex items-start gap-4">
                          {/* Icon */}
                          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>

                          {/* Content */}
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                              {item.label}
                            </p>

                            <p className="mt-2 text-sm font-semibold text-foreground break-words leading-relaxed">
                              {item.value ? (
                                item.value
                              ) : (
                                <span className="text-muted-foreground font-normal">
                                  —
                                </span>
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Accent Line */}
                        <div className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Workshops Tab */}
            {activeTab === "workshops" && <WorkshopsTab />}

            {/* Certificates Tab */}
            {activeTab === "certificates" && <CertificatesTab />}

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
                          "If you need to modify sensitive information such as your name or official data, please contact us via email or WhatsApp and our administration team will assist you.",
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
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          {t("رقم التصنيف", "Classification Number")}
                        </Label>
                        <Input
                          value={editForm.classification_number}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              classification_number: e.target.value,
                            })
                          }
                          className="focus-visible:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          {t("المنطقة", "Region")}
                        </Label>
                        <select
                          value={editForm.region}
                          onChange={(e) =>
                            setEditForm({ ...editForm, region: e.target.value })
                          }
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">{t("اختر المنطقة", "Select Region")}</option>
                          {[
                            "الرياض",
                            "مكة المكرمة",
                            "المدينة المنورة",
                            "القصيم",
                            "الشرقية",
                            "عسير",
                            "تبوك",
                            "حائل",
                            "الحدود الشمالية",
                            "جازان",
                            "نجران",
                            "الباحة",
                            "الجوف",
                          ].map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          {t("المدينة", "City")}
                        </Label>
                        <Input
                          value={editForm.city}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              city: e.target.value,
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
            className="bg-background rounded-3xl shadow-2xl w-full max-w-2xl mx-auto p-6 relative"
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
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (activeMembership?.membership_type as any) || "active",
                expiryDate: activeMembership?.ends_at || "",
                workplace: user?.employer || "",
                workplaceEn: user?.employer || "",
                profileImage: profileImage || undefined,
              }}
              certificateSettings={certificateSettings}
              showControls={true}
              showSignature={true}
              showStamp={true}
            />
          </motion.div>
        </div>
      )}
      <ProfileImageModal
        open={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        onSuccess={(url) => {
          setProfileImage(url);
        }}
      />
    </Layout>
  );
};

export default ProfilePage;
