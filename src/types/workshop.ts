export interface Workshop {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar?: string;
  description_en?: string;
  starts_at: string;
  ends_at: string;
  price: number;
  seats?: number;
  cover_image?: string;
}
