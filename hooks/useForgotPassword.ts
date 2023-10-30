import {
  ForgotPasswordInputs,
  UpdateNewPasswordInputs,
} from "@/types/types.auth";
import { useState } from "react";
import { forgotPassword, updateNewPassword } from "@/appwrite/auth";
import { emailRegex } from "@/lib/reg";
import { toast } from "sonner";

const useForgotPassword = () => {
  // READING URL PARAMS:
  const urlParams = new URLSearchParams(window.location.search);
  const secret = urlParams.get("secret") || null;
  const userid = urlParams.get("userId") || null;

  // STATES
  const [inputs, setInputs] = useState<
    ForgotPasswordInputs | UpdateNewPasswordInputs
  >(
    secret && userid
      ? {
          password: "",
          confirmPassword: "",
        }
      : {
          email: "",
        }
  );
  const [inputErrors, setInputErrors] = useState<
    ForgotPasswordInputs | UpdateNewPasswordInputs
  >(
    secret && userid
      ? {
          password: "",
          confirmPassword: "",
        }
      : {
          email: "",
        }
  );
  const [loading, setLoading] = useState(false);

  // RESTING STATES TO INITIAL
  const resetStates = () => {
    setInputs(
      secret && userid
        ? {
            password: "",
            confirmPassword: "",
          }
        : {
            email: "",
          }
    );
    // ERRORS
    setInputErrors(
      secret && userid
        ? {
            password: "",
            confirmPassword: "",
          }
        : {
            email: "",
          }
    );
  };

  // ON CLICK
  const onForgotPassword = async () => {
    // Clear any previous input errors
    setInputErrors({ email: "" });

    // Destructure email from inputs
    if ("email" in inputs) {
      const email = inputs.email;
      // Input validations
      if (!email) {
        setInputErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email is required",
        }));
        return;
      }
      // EMAIL VALIDATION
      if (!emailRegex.test(email)) {
        setInputErrors((prevErrors) => ({
          ...prevErrors,
          email: "Invalid email address",
        }));
        return;
      }

      setLoading(true);

      // appwrite recovery password
      const result = await forgotPassword({ email });

      //@ts-ignore
      if (result?.userId) {
        resetStates();
        toast.success(`Recovery password link sent successfully`);
      } else {
        setInputErrors((prevErrors) => ({
          ...prevErrors,
          //@ts-ignore
          email: result?.message || "something went wrong",
        }));
      }

      setLoading(false);
    }
  };

  const onUpdateNewPassword = async () => {
    // Clear any previous input errors
    setInputErrors({ password: "", confirmPassword: "" });

    // Destructure password, confirm password from inputs
    if (
      "password" in inputs &&
      "confirmPassword" in inputs &&
      secret &&
      userid
    ) {
      const { password, confirmPassword } = inputs;

      // Input validations
      if (!password) {
        setInputErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password is required",
        }));
        return;
      }
      // CONFIRM PASSWORD VALIDATION
      if (!confirmPassword) {
        setInputErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Confirm password is required",
        }));
        return;
      }

      setLoading(true);

      // appwrite recovery password
      const result = await updateNewPassword({
        userid,
        secret,
        password,
        confirmPassword,
      });

      //@ts-ignore
      if (result?.userId) {
        resetStates();
        toast.success(`New password updated successfully`);
      } else {
        setInputErrors((prevErrors) => ({
          ...prevErrors,
          //@ts-ignore
          password: result?.message || "something went wrong",
        }));
      }

      setLoading(false);
    }
  };

  // RETURN
  return {
    inputs,
    inputErrors,
    loading,
    onForgotPassword,
    setInputs,
    setInputErrors,
    isPasswordRecovery: secret && userid,
    onUpdateNewPassword,
  };
};

export default useForgotPassword;
