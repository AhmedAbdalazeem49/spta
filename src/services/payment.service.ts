import api from "@/api/client";
import { PAYMENT_ENDPOINTS } from "@/api/endpoints";

export const paymentService = {
  async createMembership(payload: {
    membership_type: string;
    payment_method: string;
  }) {
    const { data } = await api.post("/membership/subscribe", payload);

    return data?.data; // { payment_url: "" }
  },

  async verify(paymentId: string) {
    const { data } = await api.post(PAYMENT_ENDPOINTS.verify, {
      payment_id: paymentId,
    });

    return data?.data ?? data;
  },
};
