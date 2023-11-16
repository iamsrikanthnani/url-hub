import {
  Avatar,
  Badge,
  Button,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import Header from "./components/Header";

export default function Home() {
  return (
    <Flex direction={"column"}>
      <Header />
    </Flex>
  );
}
