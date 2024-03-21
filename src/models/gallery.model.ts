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

export const galleryValidate = {
  fullName: {
    required: "Full Name is required",
  },
  name: {
    required: "Name is required",
  },
  description: {
  },
  address: {
  },
  logoUrl: {
    required: "Image is required"
  },
  style: {
    pattern: {
      value: /^\s*{(\s*"[^"]*"\s*:\s*"[^"]*"\s*,?)*}\s*$/,
      message: "Style must be a valid JSON object"
    }
  }
}

export default Gallery;