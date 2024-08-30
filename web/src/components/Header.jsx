import React from "react";
import { Image, Text } from "@mantine/core";
import "../styles/CustomFonts.css";

function MyHeader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Text className="my-header" style={{ fontSize: "25px" }}>
        Hey admin, welcome to <b>FoodieHaven</b> portal!
      </Text>
      <Image
        src="/assets/FoodieHeaven.png"
        alt="header image"
        w={60}
        h={60}
        radius="md"
      />
    </div>
  );
}

export default MyHeader;
