export type Profile = {
  id?: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  userId?: string;
}

export const profileValidate = {
  firstName: {
    required: "First Name is required",
  },
  lastName: {
    required: "Last Name is required",
  },
  avatarUrl: {
  }
}

export default Profile;