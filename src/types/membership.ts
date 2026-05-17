export type MembershipTypeKey = "active" | "affiliate" | "intern" | "student";

export interface Membership {
  id: number;
  type: MembershipTypeKey;
  name_ar: string;
  name_en: string;
  price: number;
  duration_months: number;
  benefits?: string[];
}

export interface UserMembership {
  id: number;
  user_id: number;
  membership_id: number;
  status: "active" | "expired" | "pending";
  starts_at: string;
  ends_at: string;
  membership?: Membership;
}
