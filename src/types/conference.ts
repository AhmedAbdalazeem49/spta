export interface Conference {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar?: string;
  description_en?: string;
  starts_at: string;
  ends_at: string;
  location_ar?: string;
  location_en?: string;
  cover_image?: string;
  price?: number;
  status: "upcoming" | "ongoing" | "past";
}
