import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  ExternalLink,
  GraduationCap,
  ImageOff,
  MapPin,
  Percent,
  Search,
  UserCircle,
  Users,
  Video,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

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
    null,
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <Badge variant="outline" className={`${config.color} gap-1 text-[16px]`}>
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
                "أقامت الجمعية ورش عمل مختلفة في جميع مناطق المملكة، تجاوز عدد المستفيدين منها 5000 مستفيدًا من ممارسي المهنة.",
                "The Association has conducted a wide range of workshops across the Kingdom of Saudi Arabia, serving more than 5,000 physical therapy professionals and practitioners.",
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
                      const imgSrc = getWorkshopImage(workshop);
                      const isOnline = workshop.attendance_type === "online";
                      const isInPerson =
                        workshop.attendance_type === "in_person";
                      const isFull =
                        workshop.registered_count !== undefined &&
                        workshop.registered_count >= workshop.total_capacity;
                      const seatsLeft =
                        workshop.registered_count !== undefined
                          ? workshop.total_capacity - workshop.registered_count
                          : null;
                      const fillPct =
                        workshop.registered_count !== undefined
                          ? Math.round(
                              (workshop.registered_count /
                                workshop.total_capacity) *
                                100,
                            )
                          : 0;

                      // Urgency colour for seats bar
                      const barColor =
                        fillPct >= 90
                          ? "bg-red-500"
                          : fillPct >= 70
                            ? "bg-amber-500"
                            : "bg-emerald-500";

                      return (
                        <motion.div
                          key={workshop.id}
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: index * 0.07, duration: 0.4 }}
                          className="group h-full"
                        >
                          <div className="relative h-full flex flex-col rounded-2xl border bg-card overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
                            {/* ── Cover image ─────────────────────────────────────── */}
                            <div className="relative h-52 w-full overflow-hidden bg-muted shrink-0">
                              {imgSrc ? (
                                <img
                                  src={imgSrc}
                                  alt={workshop.title}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  onError={(e) => {
                                    (
                                      e.target as HTMLImageElement
                                    ).style.display = "none";
                                    (e.target as HTMLImageElement)
                                      .parentElement!.querySelector(
                                        ".fallback",
                                      )!
                                      .classList.remove("hidden");
                                  }}
                                />
                              ) : null}

                              {/* Fallback */}
                              <div
                                className={`fallback absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/15 to-primary/5 ${
                                  imgSrc ? "hidden" : ""
                                }`}
                              >
                                <ImageOff className="w-12 h-12 text-primary/20" />
                              </div>

                              {/* Gradient overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                              {/* Top-right badges */}
                              <div className="absolute top-3 end-3 flex flex-col gap-1.5 items-end">
                                {getStatusBadge(workshop.status)}
                                {isOnline && (
                                  <Badge className="bg-blue-500 text-white border border-blue-400/30 backdrop-blur-sm text-[14px] gap-1 px-2 py-0.5">
                                    <Video className="w-3 h-3" />
                                    {t("أونلاين", "Online")}
                                  </Badge>
                                )}
                                {isInPerson && (
                                  <Badge className="bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 backdrop-blur-sm text-[14px] gap-1 px-2 py-0.5">
                                    <Users className="w-3 h-3" />
                                    {t("حضوري", "In Person")}
                                  </Badge>
                                )}
                              </div>

                              {/* Bottom-left: price pill */}
                              <div className="absolute bottom-3 start-3">
                                <div className="flex items-baseline gap-1 bg-black/50 backdrop-blur-sm border border-white/10 text-white rounded-xl px-3 py-1.5">
                                  <span className="text-emerald-400 font-bold text-sm">
                                    {t("ر.س", "SAR")} {workshop.member_price}
                                  </span>
                                  <span className="text-white/40 text-xs">
                                    /
                                  </span>
                                  <span className="text-white/70 text-xs line-through">
                                    {workshop.regular_price}
                                  </span>
                                </div>
                              </div>

                              {/* Sheen on hover */}
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
                            </div>

                            {/* ── Body ────────────────────────────────────────────── */}
                            <div className="flex flex-col flex-1 p-5 gap-4">
                              {/* Title + description */}
                              <div>
                                <h3 className="text-base font-bold leading-snug mb-1.5 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                                  {workshop.title}
                                </h3>
                                {workshop.description && (
                                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                    {workshop.description}
                                  </p>
                                )}
                              </div>

                              {/* Meta grid */}
                              <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                    <Calendar className="w-3.5 h-3.5 text-primary" />
                                  </div>
                                  <span>
                                    {new Date(workshop.date).toLocaleDateString(
                                      isRTL ? "ar-SA" : "en-US",
                                      { day: "numeric", month: "short" },
                                    )}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                    <Calendar className="w-3.5 h-3.5 text-primary" />
                                  </div>
                                  <span>
                                    {new Date(
                                      workshop.end_date,
                                    ).toLocaleDateString(
                                      isRTL ? "ar-SA" : "en-US",
                                      { day: "numeric", month: "short" },
                                    )}
                                  </span>
                                </div>

                                {workshop.time && (
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                      <Clock className="w-3.5 h-3.5 text-primary" />
                                    </div>
                                    <span>{workshop.time.slice(0, 5)}</span>
                                  </div>
                                )}

                                <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                                  <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                    <MapPin className="w-3.5 h-3.5 text-primary" />
                                  </div>
                                  <span className="truncate">
                                    {workshop.location}
                                  </span>
                                </div>

                                {workshop.doctor_name && (
                                  <div className="flex items-center gap-1.5 col-span-2">
                                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                      <UserCircle className="w-3.5 h-3.5 text-primary" />
                                    </div>
                                    <span className="truncate">
                                      {workshop.doctor_name}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Seats progress */}
                              {workshop.registered_count !== undefined && (
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground flex items-center gap-1">
                                      <Users className="w-3.5 h-3.5" />
                                      {t("المقاعد", "Seats")}
                                    </span>
                                    <span
                                      className={`font-semibold ${isFull ? "text-red-500" : seatsLeft !== null && seatsLeft <= 3 ? "text-amber-500" : "text-foreground"}`}
                                    >
                                      {isFull
                                        ? t("مكتمل", "Full")
                                        : seatsLeft !== null && seatsLeft <= 5
                                          ? isRTL
                                            ? `${seatsLeft} مقاعد متبقية`
                                            : `${seatsLeft} left`
                                          : `${workshop.registered_count}/${workshop.total_capacity}`}
                                    </span>
                                  </div>
                                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                    <motion.div
                                      className={`h-full rounded-full ${barColor}`}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${fillPct}%` }}
                                      transition={{
                                        duration: 0.8,
                                        delay: index * 0.07 + 0.3,
                                      }}
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Meeting link — only for online workshops */}
                              {isOnline && workshop.meeting_link && (
                                <a
                                  href={workshop.meeting_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="group/link flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-blue-500/25 bg-blue-500/6 hover:bg-blue-500/12 hover:border-blue-500/40 transition-all duration-200 hidden"
                                >
                                  <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0">
                                    <Video className="w-3.5 h-3.5 text-blue-500" />
                                  </div>
                                  <div className="flex-1 min-w-0 ">
                                    <p className="text-[11px] text-muted-foreground leading-none mb-0.5">
                                      {t("رابط الاجتماع", "Meeting Link")}
                                    </p>
                                    <p className="text-xs font-medium text-blue-600 dark:text-blue-400 truncate group-hover/link:underline">
                                      {workshop.meeting_link.replace(
                                        /^https?:\/\//,
                                        "",
                                      )}
                                    </p>
                                  </div>
                                  <ExternalLink className="w-3.5 h-3.5 text-blue-500/60 shrink-0 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                                </a>
                              )}

                              {/* Pricing row */}
                              <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-muted/50 border border-border/60">
                                <div>
                                  <p className="text-[10px] text-muted-foreground mb-0.5">
                                    {t("للأعضاء", "Members")}
                                  </p>
                                  <p className="font-bold text-emerald-600 text-sm">
                                    {workshop.member_price}{" "}
                                    <span className="text-[11px] font-medium">
                                      {t("ر.س", "SAR")}
                                    </span>
                                  </p>
                                </div>
                                <div className="w-px h-8 bg-border" />
                                <div
                                  className={isRTL ? "text-start" : "text-end"}
                                >
                                  <p className="text-[10px] text-muted-foreground mb-0.5">
                                    {t("لغير الأعضاء", "Non-Members")}
                                  </p>
                                  <p className="font-bold text-sm">
                                    {workshop.regular_price}{" "}
                                    <span className="text-[11px] font-medium text-muted-foreground">
                                      {t("ر.س", "SAR")}
                                    </span>
                                  </p>
                                </div>
                              </div>

                              {/* CTA button */}
                              <Button
                                className={`w-full gap-2 mt-auto rounded-xl font-semibold transition-all duration-300 ${
                                  isRegistered
                                    ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 hover:bg-emerald-500/20"
                                    : workshop.status === "open" && !isFull
                                      ? "hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
                                      : ""
                                }`}
                                variant={isRegistered ? "outline" : "default"}
                                disabled={
                                  workshop.status !== "open" ||
                                  isRegistered ||
                                  isFull
                                }
                                onClick={() => openRegistration(workshop)}
                              >
                                {isRegistered ? (
                                  <>
                                    <CheckCircle className="w-4 h-4" />
                                    {t("تم التسجيل", "Registered")}
                                  </>
                                ) : isFull ? (
                                  <>
                                    <Users className="w-4 h-4" />
                                    {t("المقاعد ممتلئة", "Seats Full")}
                                  </>
                                ) : workshop.status === "open" ? (
                                  <>
                                    <CheckCircle className="w-4 h-4" />
                                    {t("سجّل الآن", "Register Now")}
                                  </>
                                ) : workshop.status === "completed" ? (
                                  t("الورشة منتهية", "Workshop Ended")
                                ) : workshop.status === "postponed" ? (
                                  t("الورشة مؤجلة", "Workshop Postponed")
                                ) : (
                                  t("التسجيل مغلق", "Registration Closed")
                                )}
                              </Button>
                            </div>
                          </div>
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
