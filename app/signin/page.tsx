"use client";
import React from "react";
import { Flex, TextField, Button, Text, Callout } from "@radix-ui/themes";
import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import { signInAccount } from "@/appwrite/auth";
import useSignIn from "@/hooks/useSignIn";
import InputOnChange from "@/lib/InputOnChange";

const SignIn = () => {
  const { inputs, inputErrors, loading, onSignIn, setInputs, setInputErrors } =
    useSignIn();

  return (
    <AuthLayout>
      <Flex direction={"column"} gap={"3"} width={"100%"}>
        <Flex direction={"column"}>
          <Text size={"8"} weight={"bold"}>
            Welcome Back!
          </Text>
          <Text size={"3"} weight={"light"} className="text-gray-500">
            Securely sign in with your email and password.
          </Text>
        </Flex>
        {/* INPUT:EMAIL */}
        <TextField.Input
          name="email"
          value={inputs.email}
          onChange={(e) => InputOnChange({ e, setInputs, setInputErrors })()}
          size={"3"}
          placeholder={"Enter email"}
        />
        {/* INPUT:PASSWORD */}
        <TextField.Input
          type={"password"}
          name="password"
          value={inputs.password}
          onChange={(e) => InputOnChange({ e, setInputs, setInputErrors })()}
          size={"3"}
          placeholder={"Enter password"}
        />
        {/* ALERT */}
        {(inputErrors?.email || inputErrors?.password) && (
          <Callout.Root size="1" color="red">
            <Callout.Text>
              {inputErrors?.email || inputErrors?.password}
            </Callout.Text>
          </Callout.Root>
        )}
        {/* SUBMIT */}
        <Button size={"3"} onClick={onSignIn} disabled={loading}>
          {loading ? "Loading..." : "Continue"}
        </Button>
        {/* FORGOT PASSWORD */}
        <Link
          className="self-end rt-Text rt-reset rt-Link rt-underline-auto rt-r-weight-regular"
          href={"/forgotpassword"}
        >
          Forgot password?
        </Link>
        {/* SIGN-UP */}
        <Text className="self-center pt-4" weight={"light"}>
          Don't have an account?{" "}
          <Link
            href={"/signup"}
            className="self-end rt-Text rt-reset rt-Link rt-underline-auto rt-r-weight-medium"
          >
            Create new!
          </Link>
        </Text>
      </Flex>
    </AuthLayout>
  );
};

export default SignIn;
