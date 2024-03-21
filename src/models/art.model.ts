export type Art = {
  id?: string;
  authorId?: number | null;
  exhibitionId?: number | null;
  createdAt?: string | null;
  legalStatus?: string | null;
  imageUrl?: string | null;
  imagePath?: string | null;
  hdImageUrl?: string | null;
  hdImagePath?: string | null;
  posterUrl?: string | null;
  posterImagePath?: string | null;
  name: string;
  description?: string | null;
  title?: string | null;
  style?: string | null;
  technique?: string | null;
  width?: number | null;
  height?: number | null;
}

export const artValidate = {
  name: {
    required: "Name is required",
  },
  imageUrl: {
    required: "Image is required"
  },
  description: {
  },
  title: {
  },
  style: {
    pattern: {
      value: /^\s*{(\s*"[^"]*"\s*:\s*"[^"]*"\s*,?)*}\s*$/,
      message: "Style must be a valid JSON object"
    }
  },
  technique: {
  },
  width: {
    pattern: {
      value: /^\d+(\.\d+)?$/,
      message: "Width must be a valid float number"
    }
  },
  height: {
    pattern: {
      value: /^\d+(\.\d+)?$/,
      message: "Height must be a valid float number"
    }
  },
  legalStatus: {
  },
}

export default Art;
