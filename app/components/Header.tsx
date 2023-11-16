"use client";
import { useAuthContext } from "@/context/auth";
import {
  Avatar,
  Badge,
  Button,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";

const Header = () => {
  const { isLoading, isAuthenticated, user } = useAuthContext();

  if (isLoading) {
    return null;
  }

  return (
    <Flex className="bg-slate-50" p={"3"} justify={"between"}>
      <div>
        <img src="/vercel.svg" alt="Vercel Logo" width={100} height={24} />
      </div>
      {isAuthenticated ? (
        <Flex gap={"4"} align={"center"}>
          <Text>Welcome, {user.name}</Text>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                size={"2"}
                radius="full"
                fallback={user.name}
                src={user.imageUrl}
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item shortcut="⌘ E">About</DropdownMenu.Item>
              <DropdownMenu.Item shortcut="⌘ D">Source code</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item shortcut="⌘ N" color="red">
                Sign out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
      ) : (
        <Flex gap={"3"}>
          <Link href={"/signin"}>
            <Badge size={"1"} className="cursor-pointer" variant="solid">
              SignIn
            </Badge>
          </Link>
          /
          <Link href={"/signup"}>
            <Badge size={"1"} className="cursor-pointer" variant="solid">
              SignUp
            </Badge>
          </Link>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
