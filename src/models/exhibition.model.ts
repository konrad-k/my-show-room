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

export const exhibitionValidate = {
  fullName: {
    required: "Name is required",
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
  startAt: {
    pattern: {
      value: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/,
      message: "Start date must be a valid date"
    }
  },
  endAt: {
    pattern: {
      value: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/,
      message: "End date must be a valid date"
    }
  },
  posterUrl: {
  }
}

export default Exhibition;
