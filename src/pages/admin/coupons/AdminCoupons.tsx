import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { Coupon, mapApiCoupon } from "@/types/coupon";
import {  Plus, Ticket } from "lucide-react";
import { useEffect, useState } from "react";

import { CouponDeleteModal } from "@/components/admin/coupons/CouponDeleteModal";
import {
  EMPTY_PROMO_FORM,
  PromoCodeFormModal,
} from "@/components/admin/coupons/CouponFormModal";
import { CouponsAnalytics } from "@/components/admin/coupons/CouponsAnalytics";
import { CouponsList } from "@/components/admin/coupons/CouponsList";

const AdminPromoCodes = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterScope, setFilterScope] = useState("all");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const [form, setForm] = useState({ ...EMPTY_PROMO_FORM });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCoupons();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("admin/promo-codes");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw: any[] = res.data?.data ?? [];
      setCoupons(raw.map(mapApiCoupon));
    } catch (err) {
      console.error(err);
      toast({
        title: t("خطأ", "Error"),
        description: t("عرض بيانات تجريبية", "Showing mock data"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };




  const filtered = coupons.filter((c) => {
    const matchesSearch = c.code
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesType = filterType === "all" || c.type === filterType;

    const matchesScope = filterScope === "all" || c.appliesTo === filterScope;

    return matchesSearch && matchesType && matchesScope;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: t("تم النسخ", "Copied"),
      description: code,
    });
  };

  const openCreate = () => {
    setForm({ ...EMPTY_PROMO_FORM });
    setIsCreateOpen(true);
  };

  const openEdit = (coupon: Coupon) => {
    setSelectedCoupon(coupon);

    setForm({
      code: coupon.code,
      type: coupon.type,

      discount_percentage:
        coupon.type === "free" ? 100 : coupon.discountPercentage,

      usage_limit: coupon.usageLimit,
      used_count: coupon.usedCount,

      start_date: coupon.startDate,
      end_date: coupon.endDate,

      applies_to: coupon.appliesTo,
      applies_to_id: coupon.appliesToId ?? null,

      is_active: coupon.isActive,
    });

    setIsEditOpen(true);
  };

  const buildPayload = () => ({
    ...form,
    discount_percentage: form.type === "free" ? 100 : form.discount_percentage,
  });

  const handleCreate = async () => {
    setIsSubmitting(true);
    try {
      const res = await api.post("admin/promo-codes", buildPayload());
      setCoupons((prev) => [mapApiCoupon(res.data.data), ...prev]);
      setIsCreateOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async () => {
    if (!selectedCoupon) return;

    setIsSubmitting(true);
    try {
      const res = await api.put(
        `admin/promo-codes/${selectedCoupon.id}`,
        buildPayload()
      );

      setCoupons((prev) =>
        prev.map((c) =>
          c.id === selectedCoupon.id ? mapApiCoupon(res.data.data) : c
        )
      );

      setIsEditOpen(false);
      setSelectedCoupon(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCoupon) return;

    await api.delete(`admin/promo-codes/${selectedCoupon.id}`);

    setCoupons((prev) => prev.filter((c) => c.id !== selectedCoupon.id));

    setIsDeleteOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Ticket className="w-6 h-6 text-primary" />
          {t("نظام الأكواد الموحد", "Unified Promo System")}
        </h2>

        <p className="text-muted-foreground">
          {t(
            "إدارة أكواد الخصم للعضويات + الورش",
            "Manage promo codes for memberships and workshops"
          )}
        </p>
      </div>


      {/* FILTERS */}
      <div className="flex gap-3">
        <Input
          placeholder="Search code..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="discount">Discount</SelectItem>
            <SelectItem value="free">Free</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterScope} onValueChange={setFilterScope}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Scope</SelectItem>
            <SelectItem value="membership">Membership</SelectItem>
            <SelectItem value="workshop">Workshop</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={openCreate}>
          <Plus className="w-4 h-4 mr-2" />
          New Promo
        </Button>
      </div>

      {/* LIST */}
      <CouponsList
        coupons={filtered}
        isLoading={isLoading}
        onOpenEdit={openEdit}
        onOpenDelete={(c) => {
          setSelectedCoupon(c);
          setIsDeleteOpen(true);
        }}
        onCopyCode={handleCopyCode}
      />

      <div className="mt-6">
        <CouponsAnalytics coupons={coupons} />
      </div>

      {/* MODALS */}
      <PromoCodeFormModal
        isOpen={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        form={form}
        setForm={setForm}
        editMode={false}
        isSubmitting={isSubmitting}
        onSave={handleCreate}
      />

      <PromoCodeFormModal
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        form={form}
        setForm={setForm}
        editMode={true}
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

export default AdminPromoCodes;
