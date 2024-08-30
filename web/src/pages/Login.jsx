import { useAuth } from "../hooks/useAuth";
import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Image,
} from "@mantine/core";
import { TextInput } from "react-hook-form-mantine";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// @ts-ignore
import classes from "../styles/AuthenticationTitle.module.css";
import { loginSchema } from "../services/schema";
import useApi from "../hooks/useApi";

function Login() {
  window.onbeforeunload = function () {
    if (!rememberMe) {
      localStorage.clear();
    }
  };
  const { login } = useAuth();
  const { data: responseData, isLoading, error, callApi } = useApi();
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (data) => {
    await callApi("http://localhost:4000/users/login", "POST", data);
  };

  useEffect(() => {
    if (responseData?.message === "OK") {
      login(responseData?.userId);
    }
  }, [responseData]);

  const { control, handleSubmit, getValues } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <>
      <Image
        src="/assets/login_background.png"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      />
      <Container
        size={420}
        my={40}
        style={{ position: "absolute", left: "40%" }}
      >
        <Title ta="center" className={classes.title}>
          Welcome to FoodieHaven login!
        </Title>
        {/* <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text> */}

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={handleSubmit(handleLogin)}>
            <TextInput
              name="email"
              mb={10}
              control={control}
              label="Email"
              withAsterisk
              placeholder="user@email.com"
            />
            <TextInput
              name="password"
              type="password"
              mb={10}
              control={control}
              label="Password"
              placeholder="123"
              withAsterisk
            />
            <Group justify="space-between" mt="lg">
              <Checkbox
                label="Remember me"
                checked={rememberMe}
                onChange={(e) => {
                  setRememberMe(e.currentTarget.checked);
                }}
              />
              {/* <Anchor component="button" size="sm">
                Forgot password?
              </Anchor> */}
            </Group>
            <Button mt="xl" type="submit">
              {isLoading ? "Logging..." : "Login"}
            </Button>
            {error && <Text style={{ color: "red" }}>{error}</Text>}
          </form>
        </Paper>
      </Container>
    </>
  );
}
export default Login;
