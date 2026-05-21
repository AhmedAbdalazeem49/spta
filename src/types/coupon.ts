export interface Coupon {
  id: number;

  code: string;
  type: "discount" | "free";

  discountPercentage: number;

  usageLimit: number | null;
  usedCount: number;

  startDate: string | null;
  endDate: string | null;

  appliesTo: "all" | "membership" | "workshop";
  appliesToId: number | null;

  isActive: boolean;

  status: "active" | "expired" | "used";

  createdAt: string;

  // UI helpers (OPTIONAL)
  scopeLabelAr: string;
  scopeLabelEn: string;
}


export function mapApiCoupon(raw: any): Coupon {
  const usedCount = raw.used_count ?? 0;
  const usageLimit = raw.usage_limit ?? null;

  const discountPercentage =
    raw.type === "free" ? 100 : Number(raw.discount_percentage ?? 0);

  const isActive = raw.is_active ?? true;

  const now = new Date();
  const endDate = raw.end_date ? new Date(raw.end_date) : null;

  // -----------------------------
  // STATUS
  // -----------------------------
  let status: Coupon["status"] = "active";

  if (!isActive) {
    status = "expired";
  } else if (endDate && endDate < now) {
    status = "expired";
  } else if (usageLimit !== null && usedCount >= usageLimit) {
    status = "used";
  }

  // -----------------------------
  // SCOPE SYSTEM
  // -----------------------------
  const appliesTo = raw.applies_to ?? "all";
  const appliesToId = raw.applies_to_id ?? null;

  const scopeLabelAr =
    appliesTo === "membership"
      ? "عضويات"
      : appliesTo === "workshop"
      ? "ورش العمل"
      : "الجميع";

  const scopeLabelEn =
    appliesTo === "membership"
      ? "Memberships"
      : appliesTo === "workshop"
      ? "Workshops"
      : "All";

  // -----------------------------
  // FINAL OBJECT
  // -----------------------------
  return {
    id: raw.id,

    code: raw.code,
    type: raw.type,

    discountPercentage,

    usageLimit,
    usedCount,

    startDate: raw.start_date ?? null,
    endDate: raw.end_date ?? null,

    appliesTo,
    appliesToId,

    isActive,

    status,

    createdAt: raw.created_at ?? "",

    scopeLabelAr,
    scopeLabelEn,
  };
}