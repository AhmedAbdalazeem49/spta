import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  GraduationCap,
  ImageOff,
  Loader2,
  Lock,
  LogIn,
  MapPin,
  Percent,
  Search,
  Sparkles,
  Tag,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

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
  status: "open" | "closed" | "completed" | "postponed";
  image?: string | null;
  image_url?: string | null;
  is_registered?: boolean;
}

// ─── Login-required modal ─────────────────────────────────────────────────────

interface LoginRequiredModalProps {
  open: boolean;
  onClose: () => void;
  workshopTitle?: string;
  t: (ar: string, en: string) => string;
}

const LoginRequiredModal = ({
  open,
  onClose,
  workshopTitle,
  t,
}: LoginRequiredModalProps) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="login-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="login-panel"
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl bg-background border border-border/40"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative top stripe */}
              <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primary/70 to-primary/30" />

              {/* Animated icon area */}
              <div className="flex flex-col items-center pt-8 pb-6 px-6 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.12,
                    type: "spring",
                    stiffness: 300,
                    damping: 18,
                  }}
                  className="relative mb-5"
                >
                  {/* Outer glow ring */}
                  <motion.div
                    animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.15, 0.4] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-full bg-primary/25 blur-md"
                  />
                  <div className="relative w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Lock className="w-9 h-9 text-primary" strokeWidth={1.6} />
                  </div>
                  {/* Sparkle */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35 }}
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                >
                  <h2 className="text-xl font-bold mb-2 leading-snug">
                    {t("تسجيل الدخول مطلوب", "Login Required")}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {workshopTitle
                      ? t(
                          `للتسجيل في "${workshopTitle}" يجب أن تكون مسجلاً في المنصة`,
                          `To register for "${workshopTitle}" you need to be signed in`
                        )
                      : t(
                          "يجب تسجيل الدخول للاشتراك في ورش العمل",
                          "You need to sign in to register for workshops"
                        )}
                  </p>
                </motion.div>

                {/* Divider with workshop name pill */}
                {workshopTitle && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.24 }}
                    className="mt-4 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-xs font-medium text-primary max-w-full truncate"
                  >
                    <GraduationCap className="w-3 h-3 inline me-1.5 shrink-0" />
                    {workshopTitle}
                  </motion.div>
                )}
              </div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="px-6 pb-6 space-y-2.5"
              >
                <Button
                  className="w-full gap-2 h-11 text-sm font-semibold rounded-xl"
                  onClick={() => {
                    onClose();
                    navigate("/login", {
                      state: { from: { pathname: "/workshops" } },
                    });
                  }}
                >
                  <LogIn className="w-4 h-4" />
                  {t("تسجيل الدخول", "Sign In")}
                  <ArrowRight className="w-3.5 h-3.5 ms-auto opacity-60" />
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-9 text-xs text-muted-foreground hover:text-foreground rounded-xl"
                  onClick={onClose}
                >
                  {t("ليس الآن", "Maybe Later")}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── Registration Modal ───────────────────────────────────────────────────────

interface RegistrationModalProps {
  open: boolean;
  onClose: () => void;
  workshop: Workshop | null;
  isMember: boolean;
  t: (ar: string, en: string) => string;
  isRTL: boolean;
  onSuccess: () => void;
}

const RegistrationModal = ({
  open,
  onClose,
  workshop,
  isMember,
  t,
  isRTL,
  onSuccess,
}: RegistrationModalProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [promoResult, setPromoResult] = useState<{
    discount: number;
    final: number;
    type: string;
  } | null>(null);
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const basePrice = workshop
    ? parseFloat(isMember ? workshop.member_price : workshop.regular_price) || 0
    : 0;
  const finalPrice = promoResult ? promoResult.final : basePrice;

  const handleClose = () => {
    setPromoCode("");
    setPromoResult(null);
    onClose();
  };

  const applyPromo = async () => {
    if (!promoCode.trim() || !workshop) return;
    setIsValidatingPromo(true);
    try {
      const res = await api.post("/promo-codes/validate", {
        code: promoCode,
        workshop_id: workshop.id,
      });
      const data = res.data;
      const discount =
        data.type === "free"
          ? basePrice
          : (basePrice * (data.discount_percentage || 0)) / 100;
      setPromoResult({
        discount,
        final: Math.max(0, basePrice - discount),
        type: data.type,
      });
      toast({ title: t("تم تطبيق كود الخصم", "Promo code applied") });
    } catch (err: any) {
      toast({
        title: t("كود الخصم غير صالح", "Invalid promo code"),
        description: err.response?.data?.message,
        variant: "destructive",
      });
      setPromoResult(null);
    } finally {
      setIsValidatingPromo(false);
    }
  };

  const handleSubmit = async () => {
    if (!workshop) return;
    setIsSubmitting(true);
    try {
      const res = await api.post("/workshops/register", {
        workshop_id: workshop.id,
        promo_code: promoCode || undefined,
      });

      const registrationData = res.data?.data;

      if (registrationData?.final_price > 0 && registrationData?.status === "pending") {
        handleClose();
        navigate("/payment", {
          state: {
            type: "workshop",
            item: {
              key: workshop.id,
              nameEn: workshop.title,
              nameAr: workshop.title,
              price: registrationData.final_price,
              priceValue: registrationData.final_price,
            },
          },
        });
        return;
      }

      toast({
        title: t("تم التسجيل بنجاح!", "Registered Successfully!"),
        description: t("تم تأكيد تسجيلك", "Your registration is confirmed"),
      });
      handleClose();
      onSuccess();
    } catch (err: any) {
      toast({
        title: t("خطأ في التسجيل", "Registration Error"),
        description:
          err.response?.data?.message ||
          t("حدث خطأ ما", "Something went wrong"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && workshop && (
        <>
          <motion.div
            key="reg-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            key="reg-panel"
            initial={{ opacity: 0, scale: 0.94, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-md rounded-3xl overflow-hidden shadow-2xl bg-background border border-border/40 flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gradient header */}
              <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/75 px-6 pt-6 pb-5 shrink-0">
                {/* subtle pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.5'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/70 text-[11px] font-medium uppercase tracking-wider mb-0.5">
                        {t("التسجيل في الورشة", "Workshop Registration")}
                      </p>
                      <h2 className="text-white font-bold text-sm leading-snug line-clamp-2">
                        {workshop.title}
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-7 h-7 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors shrink-0 mt-0.5"
                  >
                    <XCircle className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Workshop quick info */}
                <div className="relative mt-4 grid grid-cols-3 gap-2">
                  {[
                    {
                      icon: <Calendar className="w-3 h-3" />,
                      value: new Date(workshop.date).toLocaleDateString(
                        isRTL ? "ar-SA" : "en-US",
                        { month: "short", day: "numeric" }
                      ),
                    },
                    {
                      icon: <Clock className="w-3 h-3" />,
                      value: workshop.time?.slice(0, 5),
                    },
                    {
                      icon: <MapPin className="w-3 h-3" />,
                      value: workshop.location,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white/10 rounded-xl px-2.5 py-2 flex items-center gap-1.5 text-white/90 min-w-0"
                    >
                      <span className="shrink-0 opacity-70">{item.icon}</span>
                      <span className="text-[11px] font-medium truncate">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
                {/* Membership + price card */}
                <div className="rounded-2xl border border-border/60 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b border-border/40">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {t("حالة العضوية", "Membership")}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        isMember
                          ? "bg-emerald-500/15 text-emerald-600"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isMember
                        ? t("عضو نشط ✓", "Active Member ✓")
                        : t("غير عضو", "Non-Member")}
                    </span>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-[11px] text-muted-foreground">
                        {t("السعر الأساسي", "Base price")}
                      </p>
                      <p className="text-sm font-semibold">
                        {isMember
                          ? workshop.member_price
                          : workshop.regular_price}{" "}
                        {t("ر.س", "SAR")}
                      </p>
                    </div>
                    {promoResult && (
                      <div className="text-center">
                        <p className="text-[11px] text-muted-foreground">
                          {t("الخصم", "Discount")}
                        </p>
                        <p className="text-sm font-semibold text-rose-500">
                          -{promoResult.discount.toFixed(2)} {t("ر.س", "SAR")}
                        </p>
                      </div>
                    )}
                    <div className="text-end">
                      <p className="text-[11px] text-muted-foreground">
                        {t("المبلغ النهائي", "Final amount")}
                      </p>
                      <p className="text-xl font-bold text-primary">
                        {finalPrice <= 0 ? (
                          <span className="text-emerald-600">
                            {t("مجاني", "Free")}
                          </span>
                        ) : (
                          <>
                            {finalPrice.toFixed(2)}{" "}
                            <span className="text-sm font-normal">
                              {t("ر.س", "SAR")}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Promo code */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                    <Tag className="w-3 h-3" />
                    {t("كود الخصم", "Promo Code")}
                    <span className="normal-case font-normal text-muted-foreground/60">
                      ({t("اختياري", "optional")})
                    </span>
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value.toUpperCase());
                        if (promoResult) setPromoResult(null);
                      }}
                      placeholder={t("أدخل الكود", "Enter code")}
                      className="h-10 rounded-xl text-sm flex-1 font-mono tracking-widest"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={applyPromo}
                      disabled={!promoCode.trim() || isValidatingPromo}
                      className="h-10 px-4 rounded-xl text-xs shrink-0"
                    >
                      {isValidatingPromo ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        t("تطبيق", "Apply")
                      )}
                    </Button>
                  </div>
                  <AnimatePresence>
                    {promoResult && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">
                          <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                          {promoResult.type === "free"
                            ? t(
                                "كود مجاني — التسجيل بدون رسوم!",
                                "Free code — registration is free!"
                              )
                            : t(
                                `تم تطبيق خصم ${promoResult.discount.toFixed(
                                  2
                                )} ر.س`,
                                `Discount of ${promoResult.discount.toFixed(
                                  2
                                )} SAR applied`
                              )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t bg-muted/20 flex gap-2.5 shrink-0">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 h-10 rounded-xl text-xs"
                >
                  {t("إلغاء", "Cancel")}
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 h-10 rounded-xl text-xs font-semibold gap-1.5"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <CheckCircle className="w-3.5 h-3.5" />
                  )}
                  {isSubmitting
                    ? t("جاري التسجيل...", "Registering...")
                    : finalPrice <= 0
                    ? t("تأكيد التسجيل", "Confirm Registration")
                    : t("التسجيل والدفع", "Register & Pay")}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const WorkshopsPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoadingWorkshops, setIsLoadingWorkshops] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

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

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchWorkshops();
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

                              <Button
                                className="w-full gap-2"
                                disabled={workshop.status !== "open" || workshop.is_registered}
                                onClick={() => openRegistration(workshop)}
                              >
                                {workshop.is_registered ? (
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
