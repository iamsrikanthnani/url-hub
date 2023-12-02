"use client";
import React from "react";
import { Flex, TextField, Button, Text, Callout } from "@radix-ui/themes";
import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import InputOnChange from "@/lib/InputOnChange";
import useForgotPassword from "@/hooks/useForgotPassword";

const ForgotPassword = () => {
  const {
    inputs,
    inputErrors,
    loading,
    onForgotPassword,
    setInputs,
    setInputErrors,
    isPasswordRecovery,
    onUpdateNewPassword,
  } = useForgotPassword();

  return (
    <AuthLayout>
      <Flex direction={"column"} gap={"3"} width={"100%"}>
        <Flex direction={"column"}>
          <Text size={"8"} weight={"bold"}>
            Forgot Your Password?
          </Text>
          <Text size={"3"} weight={"light"} className="text-gray-500">
            Enter your email, and we'll send a reset link.
          </Text>
        </Flex>
        {/* PASSWORD RECOVERY INPUTS */}
        {"password" in inputs && isPasswordRecovery && (
          <TextField.Input
            type={"password"}
            name={"password"}
            value={inputs.password}
            onChange={(e) => InputOnChange({ e, setInputs, setInputErrors })()}
            size={"3"}
            placeholder={"Enter new password"}
          />
        )}
        {"confirmPassword" in inputs && isPasswordRecovery && (
          <TextField.Input
            type={"password"}
            name={"confirmPassword"}
            value={inputs.confirmPassword}
            onChange={(e) => InputOnChange({ e, setInputs, setInputErrors })()}
            size={"3"}
            placeholder={"Enter confirm password"}
          />
        )}
        {/* INPUT:EMAIL */}
        {"email" in inputs && (
          <TextField.Input
            name={"email"}
            value={inputs.email}
            onChange={(e) => InputOnChange({ e, setInputs, setInputErrors })()}
            size={"3"}
            placeholder={"Enter email"}
          />
        )}
        {/* ALERT */}
        {/* BAD, BUT IT'LL WORK :( */}
        {(("email" in inputErrors && inputErrors.email) ||
          ("password" in inputErrors && inputErrors.password) ||
          ("confirmPassword" in inputErrors &&
            inputErrors.confirmPassword)) && (
          <Callout.Root size="1" color="red">
            <Callout.Text>
              {("email" in inputErrors && inputErrors.email) ||
                ("password" in inputErrors && inputErrors.password) ||
                ("confirmPassword" in inputErrors &&
                  inputErrors.confirmPassword)}
            </Callout.Text>
          </Callout.Root>
        )}
        {/* SUBMIT */}
        <Button
          size={"3"}
          disabled={loading}
          onClick={isPasswordRecovery ? onUpdateNewPassword : onForgotPassword}
        >
          {loading
            ? "Loading"
            : isPasswordRecovery
            ? "Update password"
            : "Reset password"}
        </Button>
        {/* SIGN-IN */}
        <Text className="self-center pt-4" weight={"light"}>
          Do you remember your password?{" "}
          <Link
            href={"/signin"}
            className="self-end rt-Text rt-reset rt-Link rt-underline-auto rt-r-weight-medium"
          >
            Sign in!
          </Link>
        </Text>
      </Flex>
    </AuthLayout>
  );
};

export default ForgotPassword;
