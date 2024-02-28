export type Art = {
  id?: string;
  authorId?: number | null;
  exhibitionId?: number | null;
  createdAt?: string | null;
  legalStatus?: string | null;
  imageUrl?: string | null;
  hdImageUrl?: string | null;
  posterUrl?: string | null;
  name: string;
  description?: string | null;
  title?: string | null;
  style?: string | null;
  technique?: string | null;
  width?: number | null;
  height?: number | null;
  location?: string | null;
}