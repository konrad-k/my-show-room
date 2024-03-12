export type Exhibition = {
  id?: string;
  galleryId?: string;
  createdAt?: string;
  fullName: string;
  name: string;
  description: string;
  address: string;
  startAt: Date;
  endAt: Date;
  posterUrl: string;
}

export default Exhibition;
