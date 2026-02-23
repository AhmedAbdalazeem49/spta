import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Ticket,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Copy,
  Percent,
  Gift,
  Calendar,
  Users,
  Tag,
  Clock,
  TrendingUp,
  Sparkles,
  Link2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";

// ── Types ────────────────────────────────────────────────────────────────────

interface Coupon {
  id: number;
  code: string;
  type: "discount" | "free";
  discountPercent: number;
  maxUsage: number;
  usedCount: number;
  validFrom: string;
  validTo: string;
  status: "active" | "expired" | "used";
  linkedWorkshop: number | null;
  linkedWorkshopAr: string;
  linkedWorkshopEn: string;
  createdAt: string;
}

// ── Mock data (used as fallback / placeholder while API not connected) ────────

const mockCoupons: Coupon[] = [
  {
    id: 1,
    code: "SPTA2024",
    type: "discount",
    discountPercent: 20,
    maxUsage: 100,
    usedCount: 45,
    validFrom: "2024-01-01",
    validTo: "2024-12-31",
    status: "active",
    linkedWorkshop: null,
    linkedWorkshopAr: "جميع الورش",
    linkedWorkshopEn: "All Workshops",
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    code: "FREE-REHAB",
    type: "free",
    discountPercent: 100,
    maxUsage: 10,
    usedCount: 8,
    validFrom: "2024-03-01",
    validTo: "2024-03-31",
    status: "active",
    linkedWorkshop: 1,
    linkedWorkshopAr: "ورشة التأهيل الحركي المتقدم",
    linkedWorkshopEn: "Advanced Motor Rehabilitation Workshop",
    createdAt: "2024-02-15",
  },
  {
    id: 3,
    code: "MEMBER50",
    type: "discount",
    discountPercent: 50,
    maxUsage: 50,
    usedCount: 50,
    validFrom: "2024-02-01",
    validTo: "2024-06-30",
    status: "expired",
    linkedWorkshop: null,
    linkedWorkshopAr: "جميع الورش",
    linkedWorkshopEn: "All Workshops",
    createdAt: "2024-02-01",
  },
  {
    id: 4,
    code: "NEWUSER25",
    type: "discount",
    discountPercent: 25,
    maxUsage: 200,
    usedCount: 67,
    validFrom: "2024-01-15",
    validTo: "2024-12-31",
    status: "active",
    linkedWorkshop: null,
    linkedWorkshopAr: "جميع الورش",
    linkedWorkshopEn: "All Workshops",
    createdAt: "2024-01-15",
  },
  {
    id: 5,
    code: "VIP-SPORTS",
    type: "free",
    discountPercent: 100,
    maxUsage: 5,
    usedCount: 5,
    validFrom: "2024-04-01",
    validTo: "2024-04-30",
    status: "used",
    linkedWorkshop: 2,
    linkedWorkshopAr: "ورشة العلاج الطبيعي الرياضي",
    linkedWorkshopEn: "Sports Physical Therapy Workshop",
    createdAt: "2024-03-20",
  },
];

const EMPTY_FORM = {
  code: "",
  type: "discount",
  discountPercent: 10,
  maxUsage: 100,
  validFrom: "",
  validTo: "",
  linkedWorkshop: "",
};

// ── Component ─────────────────────────────────────────────────────────────────

const AdminCoupons = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  // Data
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);
  const [isLoading, setIsLoading] = useState(false); // set true if fetching from API

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Dialogs
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  // Form state (create & edit share same shape)
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── API calls (uncomment when backend is ready) ──────────────────────────

  // useEffect(() => { fetchCoupons(); }, []);

  // const fetchCoupons = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await api.get('/coupons');
  //     const data = res.data?.data || res.data || [];
  //     setCoupons(Array.isArray(data) ? data : []);
  //   } catch {
  //     setCoupons(mockCoupons); // fallback to mock
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // ── Derived stats ─────────────────────────────────────────────────────────

  const stats = {
    total: coupons.length,
    active: coupons.filter((c) => c.status === "active").length,
    totalUsage: coupons.reduce((acc, c) => acc + c.usedCount, 0),
    avgDiscount:
      coupons.length > 0
        ? Math.round(
            coupons.reduce((acc, c) => acc + c.discountPercent, 0) /
              coupons.length
          )
        : 0,
  };

  // ── Filtered list ─────────────────────────────────────────────────────────

  const filtered = coupons.filter((c) => {
    const matchesSearch = c.code
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || c.type === filterType;
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // ── Badges ────────────────────────────────────────────────────────────────

  const getTypeBadge = (type: string) => {
    if (type === "free") {
      return (
        <Badge className="bg-green-accent/10 text-green-accent border-green-accent/30 gap-1">
          <Gift className="w-3 h-3" />
          {t("مجاني", "Free")}
        </Badge>
      );
    }
    return (
      <Badge
        variant="outline"
        className="bg-primary/10 text-primary border-primary/30 gap-1"
      >
        <Percent className="w-3 h-3" />
        {t("خصم", "Discount")}
      </Badge>
    );
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
        icon: Clock,
        labelAr: "منتهي",
        labelEn: "Expired",
      },
      used: {
        color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
        icon: AlertCircle,
        labelAr: "مستنفد",
        labelEn: "Used Up",
      },
    };
    const config = configs[status] || configs.expired;
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={`${config.color} gap-1`}>
        <Icon className="w-3 h-3" />
        {t(config.labelAr, config.labelEn)}
      </Badge>
    );
  };

  // ── Actions ───────────────────────────────────────────────────────────────

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: t("تم النسخ", "Copied"),
      description: t("تم نسخ الكود إلى الحافظة", "Code copied to clipboard"),
    });
  };

  const generateRandomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "SPTA-";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setForm((f) => ({ ...f, code: result }));
  };

  const openCreate = () => {
    setForm({ ...EMPTY_FORM });
    setIsCreateOpen(true);
  };

  const openEdit = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setForm({
      code: coupon.code,
      type: coupon.type,
      discountPercent: coupon.discountPercent,
      maxUsage: coupon.maxUsage,
      validFrom: coupon.validFrom,
      validTo: coupon.validTo,
      linkedWorkshop: coupon.linkedWorkshop
        ? String(coupon.linkedWorkshop)
        : "",
    });
    setIsEditOpen(true);
  };

  const handleCreate = async () => {
    setIsSubmitting(true);
    try {
      // ── API call (uncomment when backend ready) ──
      // const res = await api.post('/coupons', {
      //   code: form.code || `SPTA-${Date.now().toString(36).toUpperCase()}`,
      //   type: form.type,
      //   discount_percent: form.type === 'free' ? 100 : form.discountPercent,
      //   max_usage: form.maxUsage,
      //   valid_from: form.validFrom,
      //   valid_to: form.validTo,
      //   linked_workshop: form.linkedWorkshop ? parseInt(form.linkedWorkshop) : null,
      // });
      // const created = res.data?.data || res.data;
      // setCoupons((prev) => [...prev, created]);

      // ── Mock fallback ──
      const generated =
        form.code || `SPTA-${Date.now().toString(36).toUpperCase()}`;
      const created: Coupon = {
        id: coupons.length + 1,
        code: generated,
        type: form.type as "discount" | "free",
        discountPercent:
          form.type === "free" ? 100 : Number(form.discountPercent),
        maxUsage: Number(form.maxUsage),
        usedCount: 0,
        validFrom: form.validFrom,
        validTo: form.validTo,
        status: "active",
        linkedWorkshop: form.linkedWorkshop
          ? parseInt(form.linkedWorkshop)
          : null,
        linkedWorkshopAr: "جميع الورش",
        linkedWorkshopEn: "All Workshops",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setCoupons((prev) => [...prev, created]);

      setIsCreateOpen(false);
      toast({
        title: t("تم الإنشاء", "Created"),
        description: t("تم إنشاء الكود بنجاح", "Code created successfully"),
      });
    } catch {
      toast({
        title: t("حدث خطأ", "Error"),
        description: t("فشل إنشاء الكود", "Failed to create code"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async () => {
    if (!selectedCoupon) return;
    setIsSubmitting(true);
    try {
      // ── API call (uncomment when backend ready) ──
      // await api.put(`/coupons/${selectedCoupon.id}`, {
      //   code: form.code,
      //   type: form.type,
      //   discount_percent: form.type === 'free' ? 100 : form.discountPercent,
      //   max_usage: form.maxUsage,
      //   valid_from: form.validFrom,
      //   valid_to: form.validTo,
      //   linked_workshop: form.linkedWorkshop ? parseInt(form.linkedWorkshop) : null,
      // });

      // ── Mock fallback ──
      setCoupons((prev) =>
        prev.map((c) =>
          c.id === selectedCoupon.id
            ? {
                ...c,
                code: form.code,
                type: form.type as "discount" | "free",
                discountPercent:
                  form.type === "free" ? 100 : Number(form.discountPercent),
                maxUsage: Number(form.maxUsage),
                validFrom: form.validFrom,
                validTo: form.validTo,
                linkedWorkshop: form.linkedWorkshop
                  ? parseInt(form.linkedWorkshop)
                  : null,
              }
            : c
        )
      );

      setIsEditOpen(false);
      setSelectedCoupon(null);
      toast({
        title: t("تم التعديل", "Updated"),
        description: t("تم تعديل الكود بنجاح", "Code updated successfully"),
      });
    } catch {
      toast({
        title: t("حدث خطأ", "Error"),
        description: t("فشل تعديل الكود", "Failed to update code"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCoupon) return;
    try {
      // ── API call (uncomment when backend ready) ──
      // await api.delete(`/coupons/${selectedCoupon.id}`);

      // ── Mock fallback ──
      setCoupons((prev) => prev.filter((c) => c.id !== selectedCoupon.id));

      setIsDeleteOpen(false);
      setSelectedCoupon(null);
      toast({
        title: t("تم الحذف", "Deleted"),
        description: t("تم حذف الكود بنجاح", "Code deleted successfully"),
      });
    } catch {
      toast({
        title: t("حدث خطأ", "Error"),
        description: t("فشل حذف الكود", "Failed to delete code"),
        variant: "destructive",
      });
    }
  };

  // ── Form dialog shared JSX ─────────────────────────────────────────────────

  const renderFormFields = () => (
    <div className="space-y-4 py-4">
      {/* Code + generator */}
      <div className="space-y-2">
        <Label>{t("الكود", "Code")}</Label>
        <div className="flex gap-2">
          <Input
            value={form.code}
            onChange={(e) =>
              setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))
            }
            placeholder={t("مثال: SPTA2024", "e.g., SPTA2024")}
            className="font-mono"
          />
          <Button
            variant="outline"
            onClick={generateRandomCode}
            title={t("توليد تلقائي", "Generate")}
          >
            <Sparkles className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Type */}
      <div className="space-y-2">
        <Label>{t("النوع", "Type")}</Label>
        <Select
          value={form.type}
          onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="discount">{t("خصم", "Discount")}</SelectItem>
            <SelectItem value="free">
              {t("حضور مجاني", "Free Attendance")}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Discount percent (only for discount type) */}
      {form.type === "discount" && (
        <div className="space-y-2">
          <Label>{t("نسبة الخصم", "Discount Percentage")}</Label>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              min="1"
              max="99"
              value={form.discountPercent}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  discountPercent: parseInt(e.target.value) || 0,
                }))
              }
              className="w-24"
            />
            <span className="text-2xl font-bold text-primary">%</span>
          </div>
        </div>
      )}

      {/* Max usage */}
      <div className="space-y-2">
        <Label>{t("الحد الأقصى للاستخدام", "Max Usage")}</Label>
        <Input
          type="number"
          min="1"
          value={form.maxUsage}
          onChange={(e) =>
            setForm((f) => ({ ...f, maxUsage: parseInt(e.target.value) || 1 }))
          }
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t("تاريخ البدء", "Start Date")}</Label>
          <Input
            type="date"
            value={form.validFrom}
            onChange={(e) =>
              setForm((f) => ({ ...f, validFrom: e.target.value }))
            }
          />
        </div>
        <div className="space-y-2">
          <Label>{t("تاريخ الانتهاء", "End Date")}</Label>
          <Input
            type="date"
            value={form.validTo}
            onChange={(e) =>
              setForm((f) => ({ ...f, validTo: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Ticket className="w-6 h-6 text-primary" />
            {t("إدارة أكواد الخصم", "Coupons Management")}
          </h2>
          <p className="text-muted-foreground">
            {t(
              "إنشاء وإدارة أكواد الخصم والحضور المجاني للورش",
              "Create and manage discount and free attendance codes for workshops"
            )}
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="gap-2 bg-green-accent hover:bg-green-light"
        >
          <Plus className="w-4 h-4" />
          {t("كود جديد", "New Code")}
        </Button>
      </div>

      {/* ── Stats Row ────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isLoading
          ? [1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))
          : [
              {
                icon: Ticket,
                value: stats.total,
                label: t("إجمالي الأكواد", "Total Codes"),
                color: "text-primary",
              },
              {
                icon: CheckCircle,
                value: stats.active,
                label: t("أكواد نشطة", "Active Codes"),
                color: "text-green-accent",
              },
              {
                icon: TrendingUp,
                value: stats.totalUsage,
                label: t("مرات الاستخدام", "Total Usage"),
                color: "text-blue-light",
              },
              {
                icon: Percent,
                value: `${stats.avgDiscount}%`,
                label: t("متوسط الخصم", "Avg Discount"),
                color: "text-yellow-600",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <stat.icon
                      className={`w-8 h-8 mx-auto mb-2 ${stat.color}`}
                    />
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
      </div>

      {/* ── Tabs ─────────────────────────────────────────────────────────────── */}
      <Tabs defaultValue="codes" className="space-y-6">
        <TabsList>
          <TabsTrigger value="codes" className="gap-2">
            <Ticket className="w-4 h-4" />
            {t("الأكواد", "Codes")}
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            {t("الإحصائيات", "Analytics")}
          </TabsTrigger>
        </TabsList>

        {/* ══ Codes Tab ════════════════════════════════════════════════════ */}
        <TabsContent value="codes" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search
                    className={`absolute top-1/2 -translate-y-1/2 ${
                      isRTL ? "right-3" : "left-3"
                    } w-4 h-4 text-muted-foreground`}
                  />
                  <Input
                    placeholder={t("بحث عن كود...", "Search codes...")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={isRTL ? "pr-10" : "pl-10"}
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <Tag className="w-4 h-4 me-2" />
                    <SelectValue placeholder={t("النوع", "Type")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("الكل", "All")}</SelectItem>
                    <SelectItem value="discount">
                      {t("خصم", "Discount")}
                    </SelectItem>
                    <SelectItem value="free">{t("مجاني", "Free")}</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <Filter className="w-4 h-4 me-2" />
                    <SelectValue placeholder={t("الحالة", "Status")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("الكل", "All")}</SelectItem>
                    <SelectItem value="active">{t("نشط", "Active")}</SelectItem>
                    <SelectItem value="expired">
                      {t("منتهي", "Expired")}
                    </SelectItem>
                    <SelectItem value="used">
                      {t("مستنفد", "Used Up")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Codes Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-72 rounded-xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">
                {t("لا توجد أكواد", "No codes found")}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filtered.map((code, index) => (
                  <motion.div
                    key={code.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.07 }}
                  >
                    <Card className="overflow-hidden group h-full hover:shadow-md transition-shadow">
                      <div
                        className={`h-2 ${
                          code.type === "free"
                            ? "bg-gradient-to-r from-green-accent to-green-light"
                            : "bg-gradient-to-r from-primary to-blue-light"
                        }`}
                      />
                      <CardContent className="p-6">
                        {/* Badges row */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 flex-wrap">
                            {getTypeBadge(code.type)}
                            {getStatusBadge(code.status)}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 shrink-0"
                            onClick={() => handleCopyCode(code.code)}
                            title={t("نسخ", "Copy")}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Code value */}
                        <div className="bg-muted/50 rounded-xl p-4 mb-4 text-center group-hover:bg-muted transition-colors">
                          <p className="text-xs text-muted-foreground mb-1">
                            {t("الكود", "Code")}
                          </p>
                          <p className="text-2xl font-mono font-bold tracking-wider text-primary">
                            {code.code}
                          </p>
                        </div>

                        {/* Discount amount */}
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <span
                            className={`text-4xl font-bold ${
                              code.type === "free"
                                ? "text-green-accent"
                                : "text-primary"
                            }`}
                          >
                            {code.discountPercent}%
                          </span>
                          <span className="text-muted-foreground">
                            {code.type === "free"
                              ? t("حضور مجاني", "Free Attendance")
                              : t("خصم", "Discount")}
                          </span>
                        </div>

                        {/* Usage progress */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {t("الاستخدام", "Usage")}
                            </span>
                            <span className="font-medium">
                              {code.usedCount}/{code.maxUsage}
                            </span>
                          </div>
                          <Progress
                            value={(code.usedCount / code.maxUsage) * 100}
                            className="h-2"
                          />
                        </div>

                        {/* Details */}
                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4 text-primary shrink-0" />
                            {code.validFrom} → {code.validTo}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Link2 className="w-4 h-4 text-primary shrink-0" />
                            {t(code.linkedWorkshopAr, code.linkedWorkshopEn)}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-1"
                            onClick={() => openEdit(code)}
                          >
                            <Edit className="w-4 h-4" />
                            {t("تعديل", "Edit")}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 text-destructive hover:text-destructive hover:border-destructive/50"
                            onClick={() => {
                              setSelectedCoupon(code);
                              setIsDeleteOpen(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>

        {/* ══ Analytics Tab ════════════════════════════════════════════════ */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Usage Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  {t("استخدام الأكواد", "Code Usage")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/50 rounded-xl flex items-center justify-center">
                  <p className="text-muted-foreground">
                    {t("رسم بياني للاستخدام", "Usage Chart")}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Top Codes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-green-accent" />
                  {t("أكثر الأكواد استخداماً", "Most Used Codes")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...coupons]
                    .sort((a, b) => b.usedCount - a.usedCount)
                    .slice(0, 5)
                    .map((code, index) => (
                      <div key={code.id} className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-muted-foreground w-8">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-mono font-medium truncate">
                            {code.code}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {code.usedCount} {t("استخدام", "uses")}
                          </p>
                        </div>
                        <Progress
                          value={(code.usedCount / code.maxUsage) * 100}
                          className="w-24 h-2"
                        />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* ── Create Dialog ────────────────────────────────────────────────────── */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              {t("إنشاء كود جديد", "Create New Code")}
            </DialogTitle>
            <DialogDescription>
              {t(
                "أنشئ كود خصم أو حضور مجاني جديد",
                "Create a new discount or free attendance code"
              )}
            </DialogDescription>
          </DialogHeader>

          {renderFormFields()}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              {t("إلغاء", "Cancel")}
            </Button>
            <Button
              onClick={handleCreate}
              disabled={isSubmitting}
              className="bg-green-accent hover:bg-green-light gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              {t("إنشاء", "Create")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Edit Dialog ──────────────────────────────────────────────────────── */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-primary" />
              {t("تعديل الكود", "Edit Code")}
            </DialogTitle>
            <DialogDescription>{selectedCoupon?.code}</DialogDescription>
          </DialogHeader>

          {renderFormFields()}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              {t("إلغاء", "Cancel")}
            </Button>
            <Button
              onClick={handleEdit}
              disabled={isSubmitting}
              className="bg-green-accent hover:bg-green-light gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              {t("حفظ التعديلات", "Save Changes")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Dialog ────────────────────────────────────────────────────── */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="w-5 h-5" />
              {t("حذف الكود", "Delete Code")}
            </DialogTitle>
            <DialogDescription>
              {t(
                "هل أنت متأكد من حذف هذا الكود؟ لا يمكن التراجع عن هذا الإجراء.",
                "Are you sure you want to delete this code? This action cannot be undone."
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedCoupon && (
            <div className="py-4">
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-mono font-bold text-destructive">
                  {selectedCoupon.code}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedCoupon.usedCount}{" "}
                  {t("استخدام مسجل", "recorded uses")}
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              {t("إلغاء", "Cancel")}
            </Button>
            <Button
              onClick={handleDelete}
              variant="destructive"
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              {t("حذف", "Delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCoupons;
