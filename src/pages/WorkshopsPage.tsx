import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import AOS from "aos";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  GraduationCap,
  ImageOff,
  MapPin,
  Percent,
  Search,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";

import { LoginRequiredModal } from "@/components/workshops/LoginRequiredModal";
import { RegistrationModal } from "@/components/workshops/RegistrationModal";
import { Workshop } from "@/types/workshop";

// ─── Main Page ────────────────────────────────────────────────────────────────

const WorkshopsPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoadingWorkshops, setIsLoadingWorkshops] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [registeredIds, setRegisteredIds] = useState<number[]>([]);


  // Modals
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(
    null
  );

  const isMember = user?.membership_status === "active";

  // ── Fetch ─────────────────────────────────────────────────────────────────────

  const fetchWorkshops = async () => {
    setIsLoadingWorkshops(true);
    try {
      const res = await api.get("/workshops");
      setWorkshops(res.data.data ?? res.data ?? []);
    } catch {
      toast({
        title: t("حدث خطأ أثناء تحميل ورش العمل", "Error loading workshops"),
        variant: "destructive",
      });
    } finally {
      setIsLoadingWorkshops(false);
    }
  };

  const fetchMyWorkshops = async () => {
    try {
      const res = await api.get("/my-workshops");

      const ids = (res.data.data || []).map((reg: any) => reg.workshop.id);

      setRegisteredIds(ids);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchWorkshops();
    fetchMyWorkshops();
  }, []);

  // ── Filters ───────────────────────────────────────────────────────────────────

  const filteredWorkshops = workshops.filter((w) => {
    const matchesSearch =
      w.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "all" || w.status === filterStatus;

    return matchesSearch && matchesStatus;
  });



  // ── Status badge ──────────────────────────────────────────────────────────────

  const getStatusBadge = (status: string) => {
    const configs: Record<
      string,
      { color: string; icon: any; labelAr: string; labelEn: string }
    > = {
      open: {
        color: "bg-green-500/10 text-green-600 border-green-500/30",
        icon: CheckCircle,
        labelAr: "متاح",
        labelEn: "Open",
      },
      closed: {
        color: "bg-destructive/10 text-destructive border-destructive/30",
        icon: XCircle,
        labelAr: "مغلق",
        labelEn: "Closed",
      },
      completed: {
        color: "bg-muted text-muted-foreground border-border",
        icon: CheckCircle,
        labelAr: "منتهي",
        labelEn: "Completed",
      },
      postponed: {
        color: "bg-amber-500/10 text-amber-600 border-amber-500/30",
        icon: AlertCircle,
        labelAr: "مؤجل",
        labelEn: "Postponed",
      },
    };
    const config = configs[status] ?? configs.closed;
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={`${config.color} gap-1 text-[11px]`}>
        <Icon className="w-3 h-3" />
        {t(config.labelAr, config.labelEn)}
      </Badge>
    );
  };

  // ── Open registration ─────────────────────────────────────────────────────────

  const openRegistration = (workshop: Workshop) => {
    if (workshop.status !== "open") return;
    if (!isAuthenticated) {
      setSelectedWorkshop(workshop);
      setShowLoginModal(true);
      return;
    }
    setSelectedWorkshop(workshop);
    setShowRegModal(true);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} ${t("دقيقة", "min")}`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m
      ? `${h}${t("س", "h")} ${m}${t("د", "m")}`
      : `${h} ${t("ساعة", "hr")}`;
  };

  const getWorkshopImage = (workshop: Workshop) =>
    workshop.image_url || workshop.image || null;

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative bg-primary py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <GraduationCap className="w-5 h-5 text-green-accent" />
              <span className="text-white text-sm font-medium">
                {t("تطوير مهني مستمر", "Continuous Professional Development")}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              {t("ورش العمل والدورات", "Workshops & Courses")}
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto">
              {t(
                "تعلم من خبراء المجال وطور مهاراتك المهنية",
                "Learn from industry experts and develop your professional skills"
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-12">
        <div className="container-custom">
          <Tabs defaultValue="workshops" className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <TabsList>
                <TabsTrigger value="workshops" className="gap-2">
                  <GraduationCap className="w-4 h-4" />
                  {t("ورش العمل", "Workshops")}
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  <Percent className="w-3 h-3 text-green-accent" />
                  {t("خصم للأعضاء", "Member Discount")}
                </Badge>
              </div>
            </div>

            <TabsContent value="workshops" className="space-y-6">
              {/* Filters */}
              <Card data-aos="fade-up">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder={t("بحث عن ورشة...", "Search workshops...")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ps-10"
                      />
                    </div>
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder={t("الحالة", "Status")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("الكل", "All")}</SelectItem>
                        <SelectItem value="open">
                          {t("متاح", "Open")}
                        </SelectItem>
                        <SelectItem value="closed">
                          {t("مغلق", "Closed")}
                        </SelectItem>
                        <SelectItem value="completed">
                          {t("منتهي", "Completed")}
                        </SelectItem>
                        <SelectItem value="postponed">
                          {t("مؤجل", "Postponed")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Grid */}
              {isLoadingWorkshops ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-80 rounded-xl bg-muted animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <AnimatePresence>
                    {filteredWorkshops.map((workshop, index) => {
                      const isRegistered = registeredIds.includes(workshop.id);
                      const attendanceUrl = `${window.location.origin}/workshop/${workshop.id}/attendance`;
                      const imgSrc = getWorkshopImage(workshop);
                      return (
                        <motion.div
                          key={workshop.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: index * 0.07 }}
                        >
                          <Card className="card-hover overflow-hidden group h-full">
                            <div className="h-2 bg-gradient-to-r from-primary to-blue-light" />

                            {/* Cover image */}
                            <div className="h-44 w-full bg-muted overflow-hidden relative">
                              {imgSrc ? (
                                <img
                                  src={imgSrc}
                                  alt={workshop.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  onError={(e) => {
                                    (
                                      e.target as HTMLImageElement
                                    ).style.display = "none";
                                    (e.target as HTMLImageElement)
                                      .parentElement!.querySelector(
                                        ".fallback"
                                      )!
                                      .classList.remove("hidden");
                                  }}
                                />
                              ) : null}
                              {/* Fallback */}
                              <div
                                className={`fallback absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 ${
                                  imgSrc ? "hidden" : ""
                                }`}
                              >
                                <ImageOff className="w-10 h-10 text-primary/20" />
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <div className="absolute bottom-3 start-4">
                                <Badge className="bg-primary hover:bg-primary/90">
                                  {t("ورشة عمل", "Workshop")}
                                </Badge>
                              </div>
                              <div className="absolute top-3 end-3">
                                {getStatusBadge(workshop.status)}
                              </div>
                            </div>

                            <CardContent className="p-6">
                              <div className="mb-3">
                                <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                                  {workshop.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {workshop.description}
                                </p>
                              </div>

                              <div className="grid grid-cols-2 gap-2.5 mb-4 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Calendar className="w-4 h-4 text-primary shrink-0" />
                                  {new Date(workshop.date).toLocaleDateString(
                                    isRTL ? "ar-SA" : "en-US"
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                                  {workshop.location}
                                </div>
                              </div>

                              {/* Seats */}
                              {workshop.registered_count !== undefined && (
                                <div className="mb-4">
                                  <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-muted-foreground flex items-center gap-1">
                                      <Users className="w-4 h-4" />
                                      {t("المقاعد", "Seats")}
                                    </span>
                                    <span className="font-medium">
                                      {workshop.registered_count}/
                                      {workshop.total_capacity}
                                    </span>
                                  </div>
                                  <Progress
                                    value={
                                      (workshop.registered_count /
                                        workshop.total_capacity) *
                                      100
                                    }
                                    className="h-2"
                                  />
                                </div>
                              )}

                              {/* Pricing */}
                              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 mb-4">
                                <div>
                                  <p className="text-[11px] text-muted-foreground">
                                    {t("للأعضاء", "Members")}
                                  </p>
                                  <p className="font-bold text-emerald-600">
                                    {workshop.member_price} {t("ر.س", "SAR")}
                                  </p>
                                </div>
                                <div
                                  className={isRTL ? "text-start" : "text-end"}
                                >
                                  <p className="text-[11px] text-muted-foreground">
                                    {t("لغير الأعضاء", "Non-Members")}
                                  </p>
                                  <p className="font-bold">
                                    {workshop.regular_price} {t("ر.س", "SAR")}
                                  </p>
                                </div>
                              </div>

                              <div className="my-4 flex flex-col items-center gap-2 ">
                                <div className="bg-white p-2 rounded-lg shadow-sm">
                                  <QRCode
                                    value={attendanceUrl}
                                    size={90}
                                    bgColor="#ffffff"
                                    fgColor="#000000"
                                  />
                                </div>

                                <p className="text-[11px] text-muted-foreground text-center">
                                  {t(
                                    "امسح لتسجيل الحضور",
                                    "Scan to mark attendance"
                                  )}
                                </p>
                              </div>

                              <Button
                                className="w-full gap-2"
                                disabled={
                                  workshop.status !== "open" || isRegistered
                                }
                                onClick={() => openRegistration(workshop)}
                              >
                                {isRegistered ? (
                                  <>
                                    <CheckCircle className="w-4 h-4" />
                                    {t("تم التسجيل", "Registered")}
                                  </>
                                ) : workshop.status === "open" ? (
                                  <>
                                    <CheckCircle className="w-4 h-4" />
                                    {t("التسجيل الآن", "Register Now")}
                                  </>
                                ) : workshop.status === "completed" ? (
                                  t("الورشة منتهية", "Workshop Ended")
                                ) : workshop.status === "postponed" ? (
                                  t("الورشة مؤجلة", "Workshop Postponed")
                                ) : (
                                  t("التسجيل مغلق", "Registration Closed")
                                )}
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}

              {!isLoadingWorkshops && filteredWorkshops.length === 0 && (
                <div className="text-center py-12">
                  <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">
                    {t("لا توجد ورش عمل متاحة", "No workshops available")}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ── Login Required Modal ── */}
      <LoginRequiredModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        workshopTitle={selectedWorkshop?.title}
        t={t}
      />

      {/* ── Registration Modal ── */}
      <RegistrationModal
        open={showRegModal}
        onClose={() => setShowRegModal(false)}
        workshop={selectedWorkshop}
        isMember={isMember}
        t={t}
        isRTL={isRTL}
        onSuccess={fetchWorkshops}
      />
    </Layout>
  );
};

export default WorkshopsPage;
