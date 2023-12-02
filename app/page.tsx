"use client";
import {
  Avatar,
  Badge,
  Button,
  DropdownMenu,
  Flex,
  Grid,
  Text,
} from "@radix-ui/themes";
import Header from "./components/Header";
import Item from "./components/Item";
import Add from "./components/Add";
import { useEffect, useState } from "react";
import { createWebsite, getAllWebsites } from "@/appwrite/webs";
import { toast } from "sonner";
import { useAuthContext } from "@/context/auth";

export default function Home() {
  const { isLoading, isAuthenticated } = useAuthContext();

  const [list, setList] = useState<any>([]);

  const fetchData = async () => {
    try {
      const listRes = await getAllWebsites();
      setList(listRes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Flex direction={"column"}>
      {!isLoading && <Header />}
      <Flex mt={"9"} mb={"5"} direction={"column"} align={"center"}>
        {!isLoading && isAuthenticated && (
          <Add fetchData={fetchData} list={list} />
        )}
        <Flex
          justify={"center"}
          align={"center"}
          gap={"4"}
          className="flex flex-wrap justify-center"
        >
          {Array.isArray(list) &&
            list?.length !== 0 &&
            list?.map((item: any, index: number) => (
              <Item
                key={`website-${index}`}
                user={item?.user}
                url={item.website}
                createdAt={item?.$createdAt}
                documentId={item?.$id}
                fetchData={fetchData}
              />
            ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
