import type { MembershipTypeKey } from "@/types/membership";

export interface MembershipTypeMeta {
  key: MembershipTypeKey;
  name_ar: string;
  name_en: string;
  price: number;
  duration_months: number;
}

export const MEMBERSHIP_TYPES: MembershipTypeMeta[] = [
  { key: "active", name_ar: "عضو عامل", name_en: "Active Member", price: 500, duration_months: 12 },
  { key: "affiliate", name_ar: "عضو منتسب", name_en: "Affiliate Member", price: 300, duration_months: 12 },
  { key: "intern", name_ar: "عضو متدرب", name_en: "Intern Member", price: 200, duration_months: 12 },
  { key: "student", name_ar: "عضو طالب", name_en: "Student Member", price: 100, duration_months: 12 },
];
