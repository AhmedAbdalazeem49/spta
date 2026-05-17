import api from "@/api/client";
import { CONFERENCE_ENDPOINTS } from "@/api/endpoints";
import type { Conference } from "@/types/conference";
import type { ID } from "@/types/common";

export const conferenceService = {
  async list(): Promise<Conference[]> {
    const { data } = await api.get(CONFERENCE_ENDPOINTS.list);
    return data?.data ?? data ?? [];
  },
  async detail(id: ID): Promise<Conference | null> {
    const { data } = await api.get(CONFERENCE_ENDPOINTS.detail(id));
    return data?.data ?? data ?? null;
  },
  async register(id: ID, payload: Record<string, unknown>) {
    const { data } = await api.post(CONFERENCE_ENDPOINTS.register(id), payload);
    return data?.data ?? data;
  },
};
