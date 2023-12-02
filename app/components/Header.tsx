"use client";
import { signOutAccount } from "@/appwrite/auth";
import { useAuthContext } from "@/context/auth";
import {
  Avatar,
  Badge,
  Button,
  DropdownMenu,
  Flex,
  Strong,
  Text,
  TextField,
} from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

const Header = ({
  total,
  search,
  setSearch,
}: {
  total: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useAuthContext();

  return (
    <Flex
      position={"fixed"}
      className="bg-slate-50 z-50 w-full"
      p={"3"}
      justify={"between"}
    >
      <Flex>
        <Image
          src="/logo.png"
          alt="Vercel Logo"
          width={100}
          height={10}
          style={{ height: 30 }}
        />
        <Text size={"6"} ml={"1"}>
          <Strong> -{total}</Strong>
        </Text>
      </Flex>
      <div className="hidden md:block ">
        <TextField.Input
          value={search}
          onChange={(e) => setSearch(e?.target?.value)}
          placeholder="search..."
          style={{ minWidth: 300 }}
        />
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
              <DropdownMenu.Label>{user.name}</DropdownMenu.Label>
              <DropdownMenu.Label>{user.email}</DropdownMenu.Label>
              <DropdownMenu.Separator />
              <Link
                target="_blank"
                href={"https://github.com/iamsrikanthnani/url-hub"}
              >
                <DropdownMenu.Item className="cursor-pointer">
                  Source code
                </DropdownMenu.Item>
              </Link>

              <DropdownMenu.Separator />
              <DropdownMenu.Item
                className="cursor-pointer"
                color="red"
                onClick={() => {
                  signOutAccount();
                  setIsAuthenticated(false);
                  //@ts-ignore
                  setUser(null);
                }}
              >
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
