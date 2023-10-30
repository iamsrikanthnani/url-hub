// NEW USER
export type NewUser = {
  name: string;
  email: string;
  password: string;
};

// SIGN-IN
export type SignInInputs = {
  email: string;
  password: string;
};

// FORGOT-PASSWORD
export type ForgotPasswordInputs = {
  email: string;
};

// UPDATE-PASSWORD
export type UpdateNewPasswordInputs = {
  password: string;
  confirmPassword: string;
};
