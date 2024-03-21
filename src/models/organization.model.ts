export type Organization = {
  id?: string;
  name: string;
  fullName: string;
  avatarUrl: string;
  website: string;
  userId?: string;
}

export const organizationValidate = {
  name: {
    required: "Name is required",
  },
  fullName: {
    required: "Full Name is required",
  },
  avatarUrl: {
  },
  website: {
    pattern: {
      value: /^(http|https):\/\/[^ "]+$/,
      message: "Website must be a valid URL"
    }
  }
}

export default Organization;