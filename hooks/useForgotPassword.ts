import { ForgotPasswordInputs } from "@/types/types.auth";
import { useState } from "react";
import { forgotPassword } from "@/appwrite/auth";
import { emailRegex } from "@/lib/reg";

const useForgotPassword = () => {
  // STATES
  const [inputs, setInputs] = useState<ForgotPasswordInputs>({
    email: "",
  });
  const [inputErrors, setInputErrors] = useState<ForgotPasswordInputs>({
    email: "",
  });
  const [loading, setLoading] = useState(false);

  // ON CLICK
  const onForgotPassword = async () => {
    // Clear any previous input errors
    setInputErrors({ email: "" });

    // Destructure email from inputs
    const { email } = inputs;

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
      console.log("used logged in");
    } else {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        //@ts-ignore
        email: result?.message || "something went wrong",
      }));
    }

    setLoading(false);
  };

  // RETURN
  return {
    inputs,
    inputErrors,
    loading,
    onForgotPassword,
    setInputs,
    setInputErrors,
  };
};

export default useForgotPassword;
