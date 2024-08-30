import { Button } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

function LinkButton({ linkTo, text, data = {} }) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(linkTo, { state: data });
  };

  return (
    <Button
      style={{ margin: "10px 0", textDecoration: "none", color: "white" }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export default LinkButton;
