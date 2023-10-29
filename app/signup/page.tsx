"use client";
import React from "react";
import { Flex, TextField, Button, Text } from "@radix-ui/themes";
import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";

const SignUp = () => {
  return (
    <AuthLayout>
      <Flex direction={"column"} gap={"3"} width={"100%"}>
        <Flex direction={"column"}>
          <Text size={"8"} weight={"bold"}>
            Start Your Journey Here
          </Text>
          <Text size={"3"} weight={"light"} className="text-gray-500">
            Sign up to explore a world of possibilities.
          </Text>
        </Flex>
        <TextField.Input size={"3"} placeholder={"Enter name"} />
        <TextField.Input size={"3"} placeholder={"Enter email"} />
        <TextField.Input size={"3"} placeholder={"Enter password"} />
        <Button size={"3"}>Get Started</Button>
        <Text className="self-center pt-4" weight={"light"}>
          already have an account?{" "}
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

export default SignUp;
