import { deleteWebsite } from "@/appwrite/webs";
import { useAuthContext } from "@/context/auth";
import { OpenInNewWindowIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Card,
  Flex,
  Inset,
  ScrollArea,
  Strong,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Item = ({
  url,
  user,
  createdAt,
  documentId,
  fetchData,
}: {
  url: string;
  user: any;
  createdAt: string;
  documentId: string;
  fetchData: () => void;
}) => {
  const [item, setItem] = useState<any>(null);
  const { user: currentUser } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://iframe.ly/api/iframely?url=${url}&api_key=${"9e29c7f70d783c2c917f5d"}`
        );
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (url) {
      fetchData();
    }
  }, [url]);

  if (
    !item?.meta?.canonical &&
    !item?.meta?.description &&
    !item?.meta?.title
  ) {
    return null;
  }

  function getRelativeTime(dateString: string) {
    const currentDate = new Date();
    const targetDate = new Date(dateString);
    // @ts-ignore
    const timeDifference = currentDate - targetDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `${years} ${years === 1 ? "year" : "years"} ago`;
    } else if (months > 0) {
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else if (weeks > 0) {
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else if (days > 0) {
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else {
      return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
    }
  }

  const onDelete = async () => {
    const deleteDoc = await deleteWebsite({ documentId });
    if (deleteDoc) {
      fetchData();
      toast.success("Document deleted successfully.");
    } else {
      toast.error("Failed to delete.");
    }
  };

  return (
    <Card size="2" className="max-w-sm">
      <Inset clip="padding-box" side="top" pb="current">
        <img
          src={
            item?.links?.thumbnail[0]?.href
              ? item?.links?.thumbnail[0]?.href
              : "https://source.unsplash.com/random/?website"
          }
          alt="Bold typography"
          style={{
            display: "block",
            objectFit: "cover",
            width: "100%",
            height: 140,
            backgroundColor: "var(--gray-5)",
          }}
        />
      </Inset>
      <Flex justify={"between"} mb={"1"}>
        <Text as="p" size="1" color="gray">
          {item?.meta?.canonical.replace(/^(https?:\/\/)?(www\.)?/i, "")}
        </Text>

        <Text as="p" size="1" color="gray">
          {getRelativeTime(createdAt)}
        </Text>
      </Flex>

      <Text as="p" size="3">
        <Strong>{item?.meta?.title}</Strong>
      </Text>
      <ScrollArea scrollbars="vertical" radius="full" style={{ height: 60 }}>
        <Text as="p" size="2" color="gray">
          {item?.meta?.description}
        </Text>
      </ScrollArea>
      <Flex justify={"between"} mt={"2"}>
        <Flex gap={"2"}>
          <Avatar radius="full" variant="solid" fallback={"S"} size={"1"} />
          <Text size="3">{user?.name}</Text>
        </Flex>
        <Flex gap={"2"}>
          <Link href={"http://" + url} className="some classes" target="_blank">
            <OpenInNewWindowIcon
              color="var(--accent-9)"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </Link>

          {currentUser?.id === user?.$id && (
            <TrashIcon
              color="red"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={onDelete}
            />
          )}
        </Flex>
      </Flex>
    </Card>
  );
};

export default Item;
