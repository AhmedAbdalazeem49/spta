import Layout from "@/components/layout/Layout";
import PaymentMethodPicker, {
  PaymentMethodKey,
} from "@/components/PaymentMethodPicker";
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
  Star,
  Tag,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

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

interface PromoResult {
  valid: boolean;
  type?: "free" | "discount";
  discount_percentage?: number;
  discountAmount: number;
  finalPrice: number;
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

  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoadingWorkshops, setIsLoadingWorkshops] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Registration dialog
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(
    null
  );
  const [regStep, setRegStep] = useState<"info" | "payment" | "success">(
    "info"
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodKey | null>(
    null
  );
  const [isPaying, setIsPaying] = useState(false);

  // Registration form fields
  const [classificationNumber, setClassificationNumber] = useState("");
  const [isMember, setIsMember] = useState(true);

  // Promo code
  const [promoCode, setPromoCode] = useState("");
  const [promoResult, setPromoResult] = useState<PromoResult | null>(null);
  const [isCheckingPromo, setIsCheckingPromo] = useState(false);
  const [promoError, setPromoError] = useState("");

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

  // ── Price helpers ────────────────────────────────────────────────────────────
  const basePrice = (w: Workshop) =>
    parseFloat(isMember ? w.member_price : w.regular_price) || 0;

  const displayPrice = () => {
    if (!selectedWorkshop) return 0;
    return promoResult ? promoResult.finalPrice : basePrice(selectedWorkshop);
  };

  // ── Promo code check ─────────────────────────────────────────────────────────
  const checkPromo = async () => {
    if (!promoCode.trim() || !selectedWorkshop) return;
    setIsCheckingPromo(true);
    setPromoError("");
    setPromoResult(null);
    try {
      const res = await api.post("/promo-codes/validate", {
        code: promoCode.trim(),
        workshop_id: selectedWorkshop.id,
      });
      const promo = res.data?.data ?? res.data;
      const original = basePrice(selectedWorkshop);
      let discountAmount = 0;
      let finalPrice = original;

      if (promo.type === "free") {
        discountAmount = original;
        finalPrice = 0;
      } else if (promo.type === "discount") {
        discountAmount = (original * (promo.discount_percentage ?? 0)) / 100;
        finalPrice = Math.max(0, original - discountAmount);
      }

      setPromoResult({ valid: true, ...promo, discountAmount, finalPrice });
      toast({
        title: t("تم تطبيق الكود", "Promo applied"),
        description: t(
          `وفّرت ${discountAmount.toFixed(2)} ريال`,
          `You saved ${discountAmount.toFixed(2)} SAR`
        ),
      });
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        t("كود الخصم غير صالح", "Invalid promo code");
      setPromoError(msg);
    } finally {
      setIsCheckingPromo(false);
    }
  };

  const removePromo = () => {
    setPromoCode("");
    setPromoResult(null);
    setPromoError("");
  };

  // ── Open registration dialog ─────────────────────────────────────────────────
  const openRegistration = (workshop: Workshop) => {
    if (workshop.status !== "open") return;
    setSelectedWorkshop(workshop);
    setRegStep("info");
    setPaymentMethod(null);
    setClassificationNumber("");
    setIsMember(true);
    setPromoCode("");
    setPromoResult(null);
    setPromoError("");
    setIsRegistrationOpen(true);
  };

  const resetRegistration = () => {
    setSelectedWorkshop(null);
    setIsRegistrationOpen(false);
    setRegStep("info");
    setPaymentMethod(null);
    setClassificationNumber("");
    setPromoCode("");
    setPromoResult(null);
    setPromoError("");
  };

  // ── Step 1 → Step 2 ──────────────────────────────────────────────────────────
  const goToPayment = () => {
    setRegStep("payment");
  };

  // ── Submit registration ───────────────────────────────────────────────────────
  const handlePayAndRegister = async () => {
    if (!selectedWorkshop || !paymentMethod) return;
    setIsPaying(true);
    try {
      await api.post("/registrations", {
        workshop_id: selectedWorkshop.id,
        classification_number: classificationNumber || undefined,
        promo_code: promoResult?.valid ? promoCode.trim() : undefined,
      });

      setRegStep("success");
      fetchWorkshops();
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        t(
          "فشل التسجيل، حاول مرة أخرى",
          "Registration failed, please try again"
        );
      toast({
        title: t("خطأ", "Error"),
        description: msg,
        variant: "destructive",
      });
    } finally {
      setIsPaying(false);
    }
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
              <span className="text-blue-pale text-sm font-medium">
                {t("تطوير مهني مستمر", "Continuous Professional Development")}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              {t("ورش العمل والدورات", "Workshops & Courses")}
            </h1>
            <p className="text-xl text-blue-pale max-w-2xl mx-auto">
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
                              <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                                <User className="w-4 h-4 text-primary shrink-0" />
                                {workshop.doctor_name}
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
              {regStep === "info"
                ? t("التسجيل في الورشة", "Workshop Registration")
                : regStep === "payment"
                ? t("اختر طريقة الدفع", "Choose Payment Method")
                : t("تم التسجيل بنجاح", "Registration Successful")}
            </DialogTitle>
            <DialogDescription>{selectedWorkshop?.title}</DialogDescription>
          </DialogHeader>

          {/* STEP 1 — INFO */}
          {regStep === "info" && selectedWorkshop && (
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
                </div>

                {/* Member type */}
                <div className="space-y-2">
                  <Label>{t("نوع التسجيل", "Registration Type")}</Label>
                  <Select
                    value={isMember ? "member" : "non-member"}
                    onValueChange={(v) => {
                      setIsMember(v === "member");
                      removePromo(); // reset promo when type changes
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">
                        {t("عضو", "Member")} — {selectedWorkshop.member_price}{" "}
                        {t("ريال", "SAR")}
                      </SelectItem>
                      <SelectItem value="non-member">
                        {t("غير عضو", "Non-Member")} —{" "}
                        {selectedWorkshop.regular_price} {t("ريال", "SAR")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Promo code */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-primary" />
                    {t("كود الخصم", "Promo Code")}{" "}
                    <span className="text-xs text-muted-foreground">
                      ({t("اختياري", "optional")})
                    </span>
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value.toUpperCase());
                        if (promoResult) removePromo();
                        setPromoError("");
                      }}
                      placeholder="PROMO2025"
                      disabled={!!promoResult}
                      className="uppercase"
                    />
                    {promoResult ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={removePromo}
                        className="shrink-0 text-destructive border-destructive/30 hover:bg-destructive/10"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={checkPromo}
                        disabled={!promoCode.trim() || isCheckingPromo}
                        className="shrink-0"
                      >
                        {isCheckingPromo ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          t("تطبيق", "Apply")
                        )}
                      </Button>
                    )}
                  </div>

                  {/* Promo feedback */}
                  {promoResult?.valid && (
                    <p className="text-xs text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      {promoResult.type === "free"
                        ? t(
                            "كود مجاني — التسجيل بدون رسوم",
                            "Free code — no charge"
                          )
                        : t(
                            `خصم ${
                              promoResult.discount_percentage
                            }% — وفّرت ${promoResult.discountAmount.toFixed(
                              2
                            )} ريال`,
                            `${
                              promoResult.discount_percentage
                            }% off — saved ${promoResult.discountAmount.toFixed(
                              2
                            )} SAR`
                          )}
                    </p>
                  )}
                  {promoError && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      {promoError}
                    </p>
                  )}
                </div>

                {/* Price summary */}
                <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{t("السعر الأصلي", "Original Price")}</span>
                    <span>
                      {basePrice(selectedWorkshop).toFixed(2)}{" "}
                      {t("ريال", "SAR")}
                    </span>
                  </div>
                  {promoResult?.valid && promoResult.discountAmount > 0 && (
                    <div className="flex items-center justify-between text-sm text-emerald-600">
                      <span>{t("الخصم", "Discount")}</span>
                      <span>
                        − {promoResult.discountAmount.toFixed(2)}{" "}
                        {t("ريال", "SAR")}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-border pt-2 flex items-center justify-between">
                    <span className="font-medium">
                      {t("المبلغ المطلوب", "Total Amount")}
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {displayPrice().toFixed(2)} {t("ريال", "SAR")}
                    </span>
                  </div>
                  {isMember && (
                    <p className="text-xs text-emerald-600 flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {t("تم تطبيق خصم الأعضاء", "Member discount applied")}
                    </p>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={resetRegistration}>
                  {t("إلغاء", "Cancel")}
                </Button>
                {/* If free after promo, skip payment step */}
                {displayPrice() === 0 ? (
                  <Button
                    onClick={async () => {
                      setIsPaying(true);
                      try {
                        await api.post("/registrations", {
                          workshop_id: selectedWorkshop.id,
                          classification_number:
                            classificationNumber || undefined,
                          promo_code: promoResult?.valid
                            ? promoCode.trim()
                            : undefined,
                        });
                        setRegStep("success");
                        fetchWorkshops();
                      } catch (err: any) {
                        toast({
                          title: t("خطأ", "Error"),
                          description:
                            err.response?.data?.message ||
                            t("فشل التسجيل", "Registration failed"),
                          variant: "destructive",
                        });
                      } finally {
                        setIsPaying(false);
                      }
                    }}
                    disabled={isPaying}
                    className="gap-2"
                  >
                    {isPaying ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    {t("تسجيل مجاناً", "Register Free")}
                  </Button>
                ) : (
                  <Button onClick={goToPayment} className="gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {t("متابعة للدفع", "Continue to Payment")}
                  </Button>
                )}
              </DialogFooter>
            </>
          )}

          {/* STEP 2 — PAYMENT */}
          {regStep === "payment" && selectedWorkshop && (
            <div className="py-2">
              <PaymentMethodPicker
                amount={displayPrice()}
                selected={paymentMethod}
                onSelect={setPaymentMethod}
                loading={isPaying}
                onConfirm={handlePayAndRegister}
                confirmLabel={{
                  ar: "ادفع وسجّل الآن",
                  en: "Pay & Register Now",
                }}
              />
              <button
                onClick={() => setRegStep("info")}
                className="text-xs text-muted-foreground hover:text-primary mt-3 mx-auto block"
              >
                ← {t("رجوع", "Back")}
              </button>
            </div>
          )}

          {/* STEP 3 — SUCCESS */}
          {regStep === "success" && (
            <div className="py-6 text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle className="w-9 h-9 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {t("تم التسجيل بنجاح!", "You're registered!")}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {t(
                    "سيتم إرسال تفاصيل التأكيد إلى بريدك الإلكتروني.",
                    "Confirmation details have been sent to your email."
                  )}
                </p>
              </div>
              <Button onClick={resetRegistration} className="w-full">
                {t("تم", "Done")}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default WorkshopsPage;
