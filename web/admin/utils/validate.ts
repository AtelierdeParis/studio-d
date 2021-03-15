import { required, email } from "react-admin";

export const validatePasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => {
  const errors = {} as any;

  if (password && confirm_password && password !== confirm_password) {
    errors.confirm_password = ["user.errors.password_mismatch"];
  }

  return errors;
};

export const requiredValidate = [required()];

export const emailValidate = [required(), email()];
