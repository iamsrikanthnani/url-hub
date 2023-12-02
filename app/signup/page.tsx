"use client";
import React from "react";
import { Flex, TextField, Button, Text, Callout } from "@radix-ui/themes";
import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import useSignUp from "@/hooks/useSignUp";
import InputOnChange from "@/lib/InputOnChange";

const SignUp = () => {
  const { inputs, inputErrors, loading, onSignUp, setInputs, setInputErrors } =
    useSignUp();
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
        {/* INPUT:NAME */}
        <TextField.Input
          name={"name"}
          value={inputs?.name}
          size={"3"}
          placeholder={"Enter name"}
          onChange={(e) => InputOnChange({ e, setInputs, setInputErrors })()}
        />
        {/* INPUT:EMAIL */}
        <TextField.Input
          name={"email"}
          value={inputs?.email}
          size={"3"}
          placeholder={"Enter email"}
          onChange={(e) => InputOnChange({ e, setInputs, setInputErrors })()}
        />
        {/* INPUT:PASSWORD */}
        <TextField.Input
          type={"password"}
          name={"password"}
          value={inputs?.password}
          size={"3"}
          placeholder={"Enter password"}
          onChange={(e) => InputOnChange({ e, setInputs, setInputErrors })()}
        />
        {/* alert */}
        {(inputErrors?.name || inputErrors?.email || inputErrors?.password) && (
          <Callout.Root size="1" color="red">
            <Callout.Text>
              {inputErrors?.email || inputErrors?.password}
            </Callout.Text>
          </Callout.Root>
        )}
        {/* SUBMIT BUTTON */}
        <Button size={"3"} onClick={onSignUp} disabled={loading}>
          {loading ? "Loading..." : "Continue"}
        </Button>
        {/* SIGN-IN */}
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
