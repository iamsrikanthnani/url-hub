"use client";
import React from "react";
import { Flex, TextField, Button, Text } from "@radix-ui/themes";
import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";

const ForgotPassword = () => {
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
        <TextField.Input size={"3"} placeholder={"Enter email"} />
        <Button size={"3"}>Reset Password</Button>

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
