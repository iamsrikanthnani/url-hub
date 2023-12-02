import { createWebsite } from "@/appwrite/webs";
import { useAuthContext } from "@/context/auth";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Badge,
  Button,
  DropdownMenu,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { toast } from "sonner";

const Add = ({ fetchData, list }: { fetchData: () => void; list: any }) => {
  const [input, setInput] = useState("");

  const { user } = useAuthContext();

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
        } else {
          toast.success("failed to add");
        }
      } catch (error) {
        toast.success("something went wrong, try again later");
      }
    } else {
      toast.error("Please enter a valid URL");
    }
  };

  return (
    <Flex
      direction={"column"}
      mb={"3"}
      p={"3"}
      justify={"between"}
      gap={"1"}
      align={"center"}
    >
      <Text size={"6"} weight={"medium"}>
        Add any useful website link
      </Text>
      <Text size={"2"} color="gray">
        let the world know about that website
      </Text>
      <TextField.Root size={"3"} style={{ minWidth: 400 }}>
        <TextField.Input
          value={input}
          placeholder="add website"
          onChange={(e) => setInput(e?.target?.value?.trimStart())}
          autoFocus
        />
        <TextField.Slot>
          <PlusCircledIcon
            onClick={onAdd}
            width={26}
            height={26}
            className="cursor-pointer"
          />
        </TextField.Slot>
      </TextField.Root>
    </Flex>
  );
};

export default Add;
