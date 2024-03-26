export type User = {
  id: string;
  email: string;
}


export const userValidate = {
  email: {
    required: "E-mail is required",
  },
  password: {
    required: "Password is required",
  },
  emailConfirm: {
    required: "E-mail confirmation is required",
    validate: (value, allValues) => value === allValues.email || "emails don't match"
  },
  passwordConfirm: {
    required: "Password confirmation is required",
    validate: (value, allValues) => value === allValues.password || "passwords don't match" 
  }
}

export default User;