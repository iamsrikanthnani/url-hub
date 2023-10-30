import { SignInInputs } from "@/types/types.auth";
import { useState } from "react";
import { signInAccount } from "@/appwrite/auth";
import { emailRegex } from "@/lib/reg";

const useSignIn = () => {
  // STATES
  const [inputs, setInputs] = useState<SignInInputs>({
    email: "",
    password: "",
  });
  const [inputErrors, setInputErrors] = useState<SignInInputs>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // ON CLICK
  const onSignIn = async () => {
    // Clear any previous input errors
    setInputErrors({ email: "", password: "" });

    // Destructure email and password from inputs
    const { email, password } = inputs;

    // Input validations
    if (!email) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      return;
    }
    if (!emailRegex.test(email)) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
      return;
    }
    if (!password) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      return;
    }

    setLoading(true);

    // Call the signInAccount function here
    const result = await signInAccount({ email, password });
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
    onSignIn,
    setInputs,
    setInputErrors,
  };
};

export default useSignIn;
