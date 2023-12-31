"use client";
import {
  Avatar,
  Badge,
  Button,
  Card,
  DropdownMenu,
  Flex,
  Grid,
  Text,
} from "@radix-ui/themes";
import Header from "./components/Header";
import Item from "./components/Item";
import Add from "./components/Add";
import { useEffect, useState } from "react";
import { getAllWebsites } from "@/appwrite/webs";
import { useAuthContext } from "@/context/auth";

export default function Home() {
  const { isLoading, isAuthenticated } = useAuthContext();

  const [search, setSearch] = useState<any>("");
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

  const filterList = () => {
    if (!search) {
      return list;
    }

    const searchTerm = search.toLowerCase();

    const filteredAndSorted = list.filter((item: any) => {
      const title = item?.website?.toLowerCase();
      const userName = item?.user?.name?.toLowerCase();

      return title?.includes(searchTerm) || userName?.includes(searchTerm);
    });
    return filteredAndSorted;
  };

  const filteredList = filterList();

  return (
    <Flex direction={"column"} style={{ flex: 1 }}>
      {!isLoading && (
        <Header
          total={Array.isArray(list) && list?.length !== 0 ? list?.length : 0}
          search={search}
          setSearch={setSearch}
          fetchData={fetchData}
          list={list}
        />
      )}
      <Flex className={"mt-8 ml-8 mr-8"} mb={"5"} direction={"column"}>
        {/* {!isLoading && isAuthenticated && (
          <Add fetchData={fetchData} list={list} />
        )} */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-wrap justify-center gap-3">
          {Array.isArray(filteredList) &&
            filteredList?.length !== 0 &&
            filteredList
              .sort((a: any, b: any) => {
                // Sort by createdAt in descending order (latest first)
                return (
                  new Date(b?.$createdAt).getTime() -
                  new Date(a?.$createdAt).getTime()
                );
              })
              ?.map((item: any, index: number) => (
                <Item
                  key={`website-${index}`}
                  user={item?.user}
                  url={item.website}
                  createdAt={item?.$createdAt}
                  documentId={item?.$id}
                  fetchData={fetchData}
                />
              ))}

          {!isLoading && filteredList?.length === 0 && (
            <Text size={"7"}>Nothing here...</Text>
          )}
        </div>
      </Flex>
    </Flex>
  );
}
