import { NewUser } from "@/types/types.auth";
import { useState } from "react";
import { createUserAccount } from "@/appwrite/auth";
import { emailRegex } from "@/lib/reg";

const useSignUp = () => {
  // STATES
  const [inputs, setInputs] = useState<NewUser>({
    name: "",
    email: "",
    password: "",
  });
  const [inputErrors, setInputErrors] = useState<NewUser>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // ON CLICK
  const onSignUp = async () => {
    // Clear any previous input errors
    setInputErrors({ email: "", password: "", name: "" });

    // Destructure email and password from inputs
    const { email, password, name } = inputs;

    // Input validations
    if (!name) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name is required",
      }));
      return;
    }
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

    // appwrite create function
    const result = await createUserAccount({ name, email, password });
    //@ts-ignore
    if (result?.accountId) {
      console.log("user signed up");
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
    onSignUp,
    setInputs,
    setInputErrors,
  };
};

export default useSignUp;
