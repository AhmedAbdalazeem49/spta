import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { Coupon, mapApiCoupon, mockCoupons } from "@/types/coupon";
import { motion } from "framer-motion";
import { CheckCircle, Filter, Percent, Plus, Search, Tag, Ticket, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

// Components
import { CouponDeleteModal } from "@/components/admin/coupons/CouponDeleteModal";
import { CouponFormModal, EMPTY_COUPON_FORM } from "@/components/admin/coupons/CouponFormModal";
import { CouponsAnalytics } from "@/components/admin/coupons/CouponsAnalytics";
import { CouponsList } from "@/components/admin/coupons/CouponsList";

const AdminCoupons = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const [form, setForm] = useState({ ...EMPTY_COUPON_FORM });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/promo-codes");
      const raw: any[] = res.data?.data ?? res.data ?? [];
      setCoupons(Array.isArray(raw) ? raw.map(mapApiCoupon) : []);
    } catch (err) {
      console.error("Failed to fetch promo codes, falling back to mock:", err);
      setCoupons(mockCoupons);
      toast({
        title: t("تعذر الاتصال بالخادم", "Could not reach server"),
        description: t("يتم عرض بيانات تجريبية مؤقتاً", "Showing mock data temporarily"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stats = {
    total: coupons.length,
    active: coupons.filter((c) => c.status === "active").length,
    totalUsage: coupons.reduce((acc, c) => acc + c.usedCount, 0),
    avgDiscount:
      coupons.length > 0
        ? Math.round(
            coupons.reduce((acc, c) => acc + c.discountPercent, 0) / coupons.length
          )
        : 0,
  };

  const filtered = coupons.filter((c) => {
    const matchesSearch = c.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || c.type === filterType;
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: t("تم النسخ", "Copied"),
      description: t("تم نسخ الكود إلى الحافظة", "Code copied to clipboard"),
    });
  };

  const openCreate = () => {
    setForm({ ...EMPTY_COUPON_FORM });
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
      linkedWorkshop: coupon.linkedWorkshop ? String(coupon.linkedWorkshop) : "",
    });
    setIsEditOpen(true);
  };

  const buildPayload = () => ({
    code: form.code || `SPTA-${Date.now().toString(36).toUpperCase()}`,
    type: form.type,
    discount_percentage: form.type === "free" ? 100 : Number(form.discountPercent),
    usage_limit: Number(form.maxUsage),
    start_date: form.validFrom || null,
    end_date: form.validTo || null,
    workshop_id: form.linkedWorkshop ? parseInt(form.linkedWorkshop) : null,
  });

  const handleCreate = async () => {
    setIsSubmitting(true);
    try {
      const res = await api.post("/promo-codes", buildPayload());
      const created = mapApiCoupon(res.data?.data ?? res.data);
      setCoupons((prev) => [created, ...prev]);
      setIsCreateOpen(false);
      toast({
        title: t("تم الإنشاء", "Created"),
        description: t("تم إنشاء الكود بنجاح", "Code created successfully"),
      });
    } catch (err: any) {
      const message = err?.response?.data?.message ?? t("فشل إنشاء الكود", "Failed to create code");
      toast({
        title: t("حدث خطأ", "Error"),
        description: message,
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
      const res = await api.put(`/promo-codes/${selectedCoupon.id}`, buildPayload());
      const updated = mapApiCoupon(res.data?.data ?? res.data);
      setCoupons((prev) => prev.map((c) => (c.id === selectedCoupon.id ? updated : c)));
      setIsEditOpen(false);
      setSelectedCoupon(null);
      toast({
        title: t("تم التعديل", "Updated"),
        description: t("تم تعديل الكود بنجاح", "Code updated successfully"),
      });
    } catch (err: any) {
      const message = err?.response?.data?.message ?? t("فشل تعديل الكود", "Failed to update code");
      toast({
        title: t("حدث خطأ", "Error"),
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCoupon) return;
    try {
      await api.delete(`/promo-codes/${selectedCoupon.id}`);
      setCoupons((prev) => prev.filter((c) => c.id !== selectedCoupon.id));
      setIsDeleteOpen(false);
      setSelectedCoupon(null);
      toast({
        title: t("تم الحذف", "Deleted"),
        description: t("تم حذف الكود بنجاح", "Code deleted successfully"),
      });
    } catch (err: any) {
      const message = err?.response?.data?.message ?? t("فشل حذف الكود", "Failed to delete code");
      toast({
        title: t("حدث خطأ", "Error"),
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
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
        <Button onClick={openCreate} className="gap-2 bg-green-accent hover:bg-green-light">
          <Plus className="w-4 h-4" />
          {t("كود جديد", "New Code")}
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isLoading
          ? [1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24 rounded-xl" />)
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
                    <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
      </div>

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

        <TabsContent value="codes" className="space-y-6">
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
                    <SelectItem value="discount">{t("خصم", "Discount")}</SelectItem>
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
                    <SelectItem value="expired">{t("منتهي", "Expired")}</SelectItem>
                    <SelectItem value="used">{t("مستنفد", "Used Up")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <CouponsList
            coupons={filtered}
            isLoading={isLoading}
            onOpenEdit={openEdit}
            onOpenDelete={(code) => {
              setSelectedCoupon(code);
              setIsDeleteOpen(true);
            }}
            onCopyCode={handleCopyCode}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <CouponsAnalytics coupons={coupons} />
        </TabsContent>
      </Tabs>

      <CouponFormModal
        isOpen={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        form={form}
        setForm={setForm}
        editMode={false}
        isSubmitting={isSubmitting}
        onSave={handleCreate}
      />

      <CouponFormModal
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        form={form}
        setForm={setForm}
        editMode={true}
        codeToEdit={selectedCoupon?.code}
        isSubmitting={isSubmitting}
        onSave={handleEdit}
      />

      <CouponDeleteModal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        selectedCoupon={selectedCoupon}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminCoupons;
