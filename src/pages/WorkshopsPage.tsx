import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Filter,
  GraduationCap,
  Loader2,
  MapPin,
  Percent,
  Search,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Workshop {
  id: number;
  title: string;
  description: string;
  doctor_name: string;
  location: string;
  date: string;
  time: string;
  duration_minutes: number;
  regular_price: string;
  member_price: string;
  total_capacity: number;
  registered_count?: number;
  status: "open" | "closed" | "completed" | "full";
}

const categories = [
  { id: "all", labelAr: "الكل", labelEn: "All" },
  { id: "rehabilitation", labelAr: "التأهيل", labelEn: "Rehabilitation" },
  { id: "sports", labelAr: "الرياضي", labelEn: "Sports" },
  { id: "respiratory", labelAr: "التنفسي", labelEn: "Respiratory" },
  { id: "geriatric", labelAr: "كبار السن", labelEn: "Geriatric" },
];

const WorkshopsPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoadingWorkshops, setIsLoadingWorkshops] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Registration dialog
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);

  // We automatically determine if member
  const isMember = user?.membership_status === "active";

  // Registration form fields
  const [classificationNumber, setClassificationNumber] = useState("");

  // ── Fetch workshops ──────────────────────────────────────────────────────────
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

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchWorkshops();
  }, []);

  // ── Filters ──────────────────────────────────────────────────────────────────
  const filteredWorkshops = workshops.filter((w) => {
    const matchesSearch =
      w.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all"; // no category field in API yet
    const matchesStatus = filterStatus === "all" || w.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // ── Status badge ─────────────────────────────────────────────────────────────
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
      full: {
        color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
        icon: AlertCircle,
        labelAr: "مكتمل",
        labelEn: "Full",
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
    };
    const config = configs[status] ?? configs.closed;
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={`${config.color} gap-1`}>
        <Icon className="w-3 h-3" />
        {t(config.labelAr, config.labelEn)}
      </Badge>
    );
  };

  // ── Open registration dialog ─────────────────────────────────────────────────
  const openRegistration = (workshop: Workshop) => {
    if (workshop.status !== "open") return;
    if (!isAuthenticated) {
      toast({
        title: t("تسجيل الدخول مطلوب", "Login Required"),
        description: t("يجب تسجيل الدخول للاشتراك في ورش العمل", "You must be logged in to subscribe to workshops"),
      });
      navigate("/login", { state: { from: { pathname: "/workshops" } } });
      return;
    }
    setSelectedWorkshop(workshop);
    setClassificationNumber("");
    setIsRegistrationOpen(true);
  };

  const resetRegistration = () => {
    setSelectedWorkshop(null);
    setIsRegistrationOpen(false);
    setClassificationNumber("");
  };

  // ── Step 1 → Payment ──────────────────────────────────────────────────────────
  const goToPayment = () => {
    if (!selectedWorkshop) return;
    
    // Pass the item with proper price calculation based on member status
    const itemWithPrice = {
      ...selectedWorkshop,
      priceValue: parseFloat(isMember ? selectedWorkshop.member_price : selectedWorkshop.regular_price) || 0,
      nameAr: selectedWorkshop.title,
      nameEn: selectedWorkshop.title,
      classification_number: classificationNumber,
    };

    navigate("/payment", {
      state: {
        type: "workshop",
        item: itemWithPrice,
      },
    });
  };

  // ── Format duration ───────────────────────────────────────────────────────────
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} ${t("دقيقة", "min")}`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m
      ? `${h}${t("س", "h")} ${m}${t("د", "m")}`
      : `${h} ${t("ساعة", "hr")}`;
  };

  return (
    <Layout>
      {/* Hero */}
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

      {/* Main Content */}
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
                      value={filterCategory}
                      onValueChange={setFilterCategory}
                    >
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <Filter className="w-4 h-4 me-2" />
                        <SelectValue placeholder={t("التصنيف", "Category")} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {t(cat.labelAr, cat.labelEn)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                        <SelectItem value="full">
                          {t("مكتمل", "Full")}
                        </SelectItem>
                        <SelectItem value="closed">
                          {t("مغلق", "Closed")}
                        </SelectItem>
                        <SelectItem value="completed">
                          {t("منتهي", "Completed")}
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
                    {filteredWorkshops.map((workshop, index) => (
                      <motion.div
                        key={workshop.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.07 }}
                      >
                        <Card className="card-hover overflow-hidden group h-full">
                          <div className="h-2 bg-gradient-to-r from-primary to-blue-light" />
                          
                          {/* Workshop Cover Image (Placeholder for now) */}
                          <div className="h-40 w-full bg-muted overflow-hidden relative">
                            <img 
                              src={`https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop`} 
                              alt="Workshop cover" 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 start-4 text-white">
                              <Badge className="bg-primary hover:bg-primary/90 mb-2">
                                {t("ورشة عمل", "Workshop")}
                              </Badge>
                            </div>
                          </div>

                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                  {workshop.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {workshop.description}
                                </p>
                              </div>
                              <div className="ms-3 shrink-0">
                                {getStatusBadge(workshop.status)}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="w-4 h-4 text-primary shrink-0" />
                                {new Date(workshop.date).toLocaleDateString(
                                  isRTL ? "ar-SA" : "en-US"
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="w-4 h-4 text-primary shrink-0" />
                                {workshop.time?.slice(0, 5)} ·{" "}
                                {formatDuration(workshop.duration_minutes)}
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                                <MapPin className="w-4 h-4 text-primary shrink-0" />
                                {workshop.location}
                              </div>
                            </div>

                            {/* Seats progress — only if registered_count available */}
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
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 mb-4">
                              <div>
                                <p className="text-xs text-muted-foreground">
                                  {t("للأعضاء", "Members")}
                                </p>
                                <p className="font-bold text-green-600">
                                  {workshop.member_price} {t("ريال", "SAR")}
                                </p>
                              </div>
                              <div
                                className={isRTL ? "text-start" : "text-end"}
                              >
                                <p className="text-xs text-muted-foreground">
                                  {t("لغير الأعضاء", "Non-Members")}
                                </p>
                                <p className="font-bold">
                                  {workshop.regular_price} {t("ريال", "SAR")}
                                </p>
                              </div>
                            </div>

                            <Button
                              className="w-full gap-2"
                              disabled={workshop.status !== "open"}
                              onClick={() => openRegistration(workshop)}
                            >
                              {workshop.status === "open" ? (
                                <>
                                  <CheckCircle className="w-4 h-4" />
                                  {t("التسجيل الآن", "Register Now")}
                                </>
                              ) : workshop.status === "full" ? (
                                t("المقاعد ممتلئة", "Seats Full")
                              ) : workshop.status === "completed" ? (
                                t("الورشة منتهية", "Workshop Ended")
                              ) : (
                                t("التسجيل مغلق", "Registration Closed")
                              )}
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
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

      {/* ── Registration Dialog ──────────────────────────────────────────────── */}
      <Dialog
        open={isRegistrationOpen}
        onOpenChange={(o) =>
          o ? setIsRegistrationOpen(true) : resetRegistration()
        }
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              {t("التسجيل في الورشة", "Workshop Registration")}
            </DialogTitle>
            <DialogDescription>{selectedWorkshop?.title}</DialogDescription>
          </DialogHeader>

          {selectedWorkshop && (
            <>
              <div className="space-y-4 py-2">
                {/* Classification number */}
                <div className="space-y-2">
                  <Label>{t("رقم التصنيف", "Classification Number")}</Label>
                  <Input
                    value={classificationNumber}
                    onChange={(e) => setClassificationNumber(e.target.value)}
                    placeholder={t(
                      "رقم التصنيف المهني (اختياري)",
                      "Professional classification no. (optional)"
                    )}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t(
                      "رقم التصنيف اختياري، ويمكن إضافته للممارسين الصحيين الذين يرغبون في دمج بياناتهم مع الهيئات الصحية السعودية مستقبلاً.",
                      "Classification number is optional and can be added for healthcare professionals who want future integration with Saudi health authorities."
                    )}
                  </p>
                </div>

                {/* Status logic */}
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-muted-foreground">{t("حالة العضوية", "Membership Status")}</span>
                    <span className={`font-bold ${isMember ? "text-emerald-600" : "text-muted-foreground"}`}>
                      {isMember ? t("عضو نشط", "Active Member") : t("غير عضو", "Non-Member")}
                    </span>
                  </div>
                  <div className="border-t border-primary/10 pt-2 flex items-center justify-between">
                    <span className="font-medium">
                      {t("المبلغ المطلوب", "Total Amount")}
                    </span>
                    <span className="text-xl font-bold text-primary">
                      {isMember ? selectedWorkshop.member_price : selectedWorkshop.regular_price} {t("ريال", "SAR")}
                    </span>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={resetRegistration}>
                  {t("إلغاء", "Cancel")}
                </Button>
                <Button onClick={goToPayment} className="gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {t("متابعة للدفع", "Continue to Payment")}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default WorkshopsPage;
