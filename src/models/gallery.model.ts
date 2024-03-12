export type Gallery = {
  id?: string;
  userId?: string;
  createdAt?: string;
  fullName: string;
  name: string;
  description: string;
  address: string;
  logoUrl: string;
  style: JSON;
}

export default Gallery;