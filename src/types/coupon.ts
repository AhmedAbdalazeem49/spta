export interface Coupon {
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
  isActive: boolean;
}

export function mapApiCoupon(raw: any): Coupon {
  const usedCount = raw.used_count ?? raw.usedCount ?? 0;
  const maxUsage = raw.usage_limit ?? raw.maxUsage ?? 0;
  const discountPercent = parseFloat(
    raw.discount_percentage ?? raw.discountPercent ?? 0
  );
  const isActive = raw.is_active ?? raw.isActive ?? true;

  let status: Coupon["status"] = "active";
  const now = new Date();
  const endDate = raw.end_date ? new Date(raw.end_date) : null;
  if (!isActive || (endDate && endDate < now)) {
    status = "expired";
  } else if (maxUsage > 0 && usedCount >= maxUsage) {
    status = "used";
  }

  const workshopAr =
    raw.workshop?.title_ar ?? raw.linkedWorkshopAr ?? "جميع الورش";
  const workshopEn =
    raw.workshop?.title_en ?? raw.linkedWorkshopEn ?? "All Workshops";

  return {
    id: raw.id,
    code: raw.code,
    type: raw.type,
    discountPercent: raw.type === "free" ? 100 : discountPercent,
    maxUsage,
    usedCount,
    validFrom: raw.start_date
      ? raw.start_date.substring(0, 10)
      : raw.validFrom ?? "",
    validTo: raw.end_date ? raw.end_date.substring(0, 10) : raw.validTo ?? "",
    status,
    linkedWorkshop: raw.workshop_id ?? raw.linkedWorkshop ?? null,
    linkedWorkshopAr: workshopAr,
    linkedWorkshopEn: workshopEn,
    createdAt: raw.created_at
      ? raw.created_at.substring(0, 10)
      : raw.createdAt ?? "",
    isActive,
  };
}

export const mockCoupons: Coupon[] = [
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
    isActive: true,
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
    isActive: true,
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
    isActive: false,
  },
];
