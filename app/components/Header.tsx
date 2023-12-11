"use client";
import { signOutAccount } from "@/appwrite/auth";
import { createWebsite } from "@/appwrite/webs";
import { useAuthContext } from "@/context/auth";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DropdownMenu,
  Flex,
  Strong,
  Text,
  TextField,
  Link as RadixLink,
  AlertDialog,
} from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const Header = ({
  total,
  search,
  setSearch,
  fetchData,
  list,
}: {
  total: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  fetchData: () => void;
  list: any;
}) => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useAuthContext();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const onAdd = async () => {
    const urlRegex =
      /^(?:(ftp|http|https):\/\/)?(?:www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})\b(?:\/\S*)?$/;
    // Remove www, http, or https from the input
    const cleanInput = input.replace(/^(ftp|http|https):\/\/(?:www\.)?/, "");
    const isAlreadyAdded = list.some(
      (item: any) => item.website === cleanInput
    );

    if (isAlreadyAdded) {
      toast.error("This website has already been added");
      return;
    }

    if (input && urlRegex.test(input)) {
      try {
        const create = await createWebsite({
          user: user.id,
          website: cleanInput,
        });
        if (create) {
          fetchData();
          toast.success("added successfully");
          setInput("");
          //   setOpen(false);
        } else {
          toast.success("failed to add");
          setInput("");
        }
      } catch (error) {
        toast.success("something went wrong, try again later");
        setInput("");
      }
    } else {
      toast.error("Please enter a valid URL");
      setInput("");
    }
  };

  return (
    <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
      <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          href="/"
        >
          <Image
            src="/logo.png"
            alt="Vercel Logo"
            width={150}
            height={10}
            style={{ height: 30 }}
          />
        </Link>
        <Link className="font-bold" href="/">
          Dashboard
        </Link>
        {isAuthenticated && (
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <RadixLink className="font-bold">Add</RadixLink>
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{ maxWidth: 450 }}>
              <AlertDialog.Title>
                Share a Valuable Website Link
              </AlertDialog.Title>
              <AlertDialog.Description
                size="2"
                style={{ marginTop: -12 }}
                mb={"4"}
              >
                Spread the word about a helpful website and contribute to our
                growing knowledge hub.
              </AlertDialog.Description>

              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Add website
                  </Text>
                  <TextField.Input
                    size={"3"}
                    value={input}
                    placeholder="add website"
                    onChange={(e) => setInput(e?.target?.value?.trimStart())}
                    autoFocus
                  />
                </label>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                  <Button style={{ width: 80 }} variant="soft" color="gray">
                    Close
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button
                    style={{ width: 80, backgroundColor: "blue" }}
                    onClick={() => onAdd()}
                  >
                    Add
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        )}
      </nav>
      <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="flex-1 ml-auto sm:flex-initial">
          <div className="relative">
            <TextField.Root>
              <TextField.Slot>
                <MagnifyingGlassIcon className=" text-gray-500 dark:text-gray-400" />
              </TextField.Slot>
              <TextField.Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                value={search}
                onChange={(e) => setSearch(e?.target?.value)}
                placeholder="search url..."
                style={{ minWidth: 300 }}
              />
            </TextField.Root>
          </div>
        </form>

        {isAuthenticated ? (
          <Flex gap={"4"} align={"center"}>
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
      </div>
    </header>
  );
};

export default Header;
