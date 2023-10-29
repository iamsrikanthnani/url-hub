"use client";
import React from "react";
import { Flex, TextField, Button, Text } from "@radix-ui/themes";
import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";

const SignIn = () => {
  return (
    <AuthLayout>
      <Flex direction={"column"} gap={"3"} width={"100%"}>
        <Flex direction={"column"}>
          <Text size={"8"} weight={"bold"}>
            Welcome Back!
          </Text>
          <Text size={"2"} weight={"light"} className="text-gray-500">
            Securely sign in with your email and password.
          </Text>
        </Flex>
        <TextField.Input size={"3"} placeholder={"Enter email"} />
        <TextField.Input size={"3"} placeholder={"Enter password"} />
        <Button size={"3"}>Continue</Button>
        <Link
          className="self-end rt-Text rt-reset rt-Link rt-underline-auto rt-r-weight-regular"
          href={"/forgotpassword"}
        >
          Forgot password?
        </Link>
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
