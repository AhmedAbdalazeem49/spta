import api from "@/api/client";
import { PAYMENT_ENDPOINTS } from "@/api/endpoints";

export const paymentService = {
  /**
   * Unified payment creation (membership OR workshop)
   */
  async create(payload: {
    type: "membership" | "workshop";
    reference_id: string | number;
    payment_method: string;
    promo_code?: string | null;
  }) {
    if (payload.type === "workshop") {
      const { data } = await api.post("/workshops/subscribe", {
        workshop_id: payload.reference_id,
        payment_method: payload.payment_method,
        promo_code: payload.promo_code ?? undefined,
      });
      return data?.data ?? data;
    } else {
      const { data } = await api.post("/membership/subscribe", {
        membership_type: payload.reference_id,
        payment_method: payload.payment_method,
        promo_code: payload.promo_code ?? undefined,
      });
      return data?.data ?? data;
    }
  },

  /**
   * Verify payment (optional future use)
   */
  async verify(paymentId: string) {
    const { data } = await api.post(PAYMENT_ENDPOINTS.verify, {
      payment_id: paymentId,
    });

    return data?.data ?? data;
  },
};
