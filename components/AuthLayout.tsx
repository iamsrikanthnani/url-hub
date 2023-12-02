import React from "react";
import { Flex, Text, Link, Strong } from "@radix-ui/themes";
import Image from "next/image";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      {/* LHS */}
      <div className="hidden md:block md:w-1/2 lg:w-1/2 relative">
        {/* unsplash random image */}
        <img
          src="https://source.unsplash.com/random/?web links"
          alt="unsplash random image"
          className="object-cover absolute inset-0 w-full h-full"
        />
      </div>
      {/* RHS */}
      <Flex
        className="w-full content-center md:w-1/2 px-8 sm:px-36 md:px-16 lg:px-16"
        justify={"center"}
        align={"center"}
        direction={"column"}
      >
        <Text
          size={"4"}
          style={{
            position: "absolute",
            top: 24,
            paddingLeft: 54,
            paddingRight: 54,
            textAlign: "center",
          }}
        >
          Explore <Strong>"URL-Hub"</Strong> - Your space for shared web
          wonders.
          <br />
          Contribute links, discover, and dive into endless possibilities!
        </Text>
        {children}
        {/* FOOTER */}
        <div
          className="absolute bottom-0 py-4 text-center"
          // @ts-ignore
          style={{ textAlign: "-webkit-center" }}
        >
          <Image src="/logo.png" alt="Vercel Logo" width={200} height={24} />
          <Flex gap={"1"}>
            <Text className="text-gray-500">
              by{" "}
              <Link
                target="_blank"
                weight={"medium"}
                href={"https://github.com/iamsrikanthnani"}
              >
                @iamsrikanthnani
              </Link>
              ,
            </Text>
            <Link
              target="_blank"
              weight={"medium"}
              href={"https://github.com/iamsrikanthnani/url-hub"}
            >
              Source code
            </Link>
          </Flex>
        </div>
      </Flex>
    </div>
  );
};

export default AuthLayout;
