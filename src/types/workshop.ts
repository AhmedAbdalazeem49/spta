export interface Workshop {
  id: number;
  title?: string;
  description?: string;
  doctor_name?: string;
  location?: string;
  date?: string;
  time?: string;
  regular_price?: number;
  member_price?: number;
  total_capacity?: number;
  status?: "open" | "closed" | "completed";
  duration_minutes?: number;
}
