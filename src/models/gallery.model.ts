export type Gallery = {
  id?: string;
  userId?: string;
  createdAt?: string;
  fullName: string;
  name: string;
  description: string;
  address: string;
  logoUrl: string;
  latitude: number;
  longitude: number;
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
  },
  latitude: {
    required: "Latitude is required",
    pattern: {
      value: /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/,
      message: "Latitude must be a valid number"
    }
  },
  longitude: {
    required: "Longitude is required",
    pattern: {
      value: /^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
      message: "Longitude must be a valid number"
    }
  }
}

export default Gallery;