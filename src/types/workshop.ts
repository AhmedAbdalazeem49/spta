export interface Workshop {
  id: number;
  title: string;
  description: string;
  doctor_name: string;
  location: string;
  date: string;
  end_date: string;
  time: string;
  regular_price: string | number;
  member_price: string | number;
  total_capacity: number;
  registered_count?: number;
  status: "open" | "closed" | "completed" | "postponed";
  image?: string | null;
  image_url?: string | null;
  partner_logo?: string | null;
  is_registered?: boolean;
}
