import api from "@/api/client";
import { MEMBERSHIP_ENDPOINTS } from "@/api/endpoints";
import type { Membership, UserMembership } from "@/types/membership";

export const membershipService = {
  async list(): Promise<Membership[]> {
    const { data } = await api.get(MEMBERSHIP_ENDPOINTS.list);
    return data?.data ?? data ?? [];
  },
  async mine(): Promise<UserMembership | null> {
    const { data } = await api.get(MEMBERSHIP_ENDPOINTS.mine);
    return data?.data ?? data ?? null;
  },
  async subscribe(payload: { membership_type: string; promo_code?: string }) {
    const { data } = await api.post(MEMBERSHIP_ENDPOINTS.subscribe, payload);
    return data?.data ?? data;
  },
  async renew(payload: { membership_type?: string }) {
    const { data } = await api.post(MEMBERSHIP_ENDPOINTS.renew, payload);
    return data?.data ?? data;
  },
  async adminList(): Promise<UserMembership[]> {
    const { data } = await api.get(MEMBERSHIP_ENDPOINTS.adminList);
    return data?.data ?? data ?? [];
  },
};
