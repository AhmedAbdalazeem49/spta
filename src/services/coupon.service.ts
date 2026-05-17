import api from "@/api/client";
import { COUPON_ENDPOINTS } from "@/api/endpoints";
import type { ID } from "@/types/common";

export interface PromoCode {
  id: number;
  code: string;
  discount_type: "percentage" | "fixed" | "free";
  discount_value: number;
  expires_at?: string | null;
  usage_limit?: number | null;
  used_count?: number;
}

export const couponService = {
  async list(): Promise<PromoCode[]> {
    const { data } = await api.get(COUPON_ENDPOINTS.list);
    return data?.data ?? data ?? [];
  },
  async validate(code: string) {
    const { data } = await api.post(COUPON_ENDPOINTS.validate, { code });
    return data?.data ?? data;
  },
  async adminCreate(payload: Partial<PromoCode>) {
    const { data } = await api.post(COUPON_ENDPOINTS.adminCreate, payload);
    return data?.data ?? data;
  },
  async adminDelete(id: ID) {
    await api.delete(COUPON_ENDPOINTS.adminDelete(id));
  },
};
