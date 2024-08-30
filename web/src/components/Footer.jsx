import React from "react";

import { Text } from "@mantine/core";

function MyFooter() {
  return (
    <Text
      style={{
        display: "flex",
        textAlign: "right",
        alignContent: "center",
        // border: "1px solid black",
        justifyContent: "center",
        marginTop: "15px",
        margin:"auto auto",
      }}
    >
      <i> Copyright (c) 2024 Slobodan Sredojevic. All rights reserved.</i>
    </Text>
  );
}

export default MyFooter;
