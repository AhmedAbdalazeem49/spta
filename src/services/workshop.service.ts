import api from "@/api/client";
import { WORKSHOP_ENDPOINTS } from "@/api/endpoints";
import type { Workshop } from "@/types/workshop";
import type { ID } from "@/types/common";

export const workshopService = {
  async list(): Promise<Workshop[]> {
    const { data } = await api.get(WORKSHOP_ENDPOINTS.list);
    return data?.data ?? data ?? [];
  },
  async detail(id: ID): Promise<Workshop | null> {
    const { data } = await api.get(WORKSHOP_ENDPOINTS.detail(id));
    return data?.data ?? data ?? null;
  },
  async register(id: ID, payload: Record<string, unknown>) {
    const { data } = await api.post(WORKSHOP_ENDPOINTS.register(id), payload);
    return data?.data ?? data;
  },
  async adminCreate(payload: Partial<Workshop>) {
    const { data } = await api.post(WORKSHOP_ENDPOINTS.adminCreate, payload);
    return data?.data ?? data;
  },
  async adminUpdate(id: ID, payload: Partial<Workshop>) {
    const { data } = await api.put(WORKSHOP_ENDPOINTS.adminUpdate(id), payload);
    return data?.data ?? data;
  },
  async adminDelete(id: ID) {
    await api.delete(WORKSHOP_ENDPOINTS.adminDelete(id));
  },
};
