import { Button } from "@mantine/core";
import { useAuth } from "../hooks/useAuth";
import React from "react";

function SignOutButton() {
  const { logout } = useAuth();

  const handleClick = () => {
    logout();
  };
  return <Button onClick={handleClick}>Sign out</Button>;
}

export default SignOutButton;
