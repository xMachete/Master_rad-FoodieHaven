import React, { useEffect } from "react";
import { Button, Container, Paper } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import useApi from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import { editUserSchema } from "../services/schema";
import { TextInput } from "react-hook-form-mantine";
import toast, { Toaster } from "react-hot-toast";

export default function Settings() {
  const { data: responseData, isLoading, error: errorApi, callApi } = useApi();
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: user,
  });

  const onSubmit = async (data) => {
    const password = getValues("password");
    const passwordConfirmed = getValues("passwordConfirmed");
    if (password !== passwordConfirmed) {
      setError("root", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    await callApi(`http://localhost:4000/users/update/${user}`, "PUT", data);
  };

  useEffect(() => {
    if (responseData?.message === "OK") {
      toast.success("Successfully edited.", {
        duration: 3000,
        position: "top-center",
      });
    }
  }, [responseData]);

  return (
    <Container>
      <Toaster />
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <h1>Edit your profile</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            mb={10}
            name="email"
            control={control}
            label="Email"
            placeholder="email"
          />
          <TextInput
            mb={10}
            type="password"
            name="password"
            label="Password"
            control={control}
            placeholder="password"
          />
          <TextInput
            mb={10}
            type="password"
            name="passwordConfirmed"
            label="Confirm Password"
            control={control}
            placeholder="password"
            // @ts-ignore
            onChange={() => setError("root", "")}
          />
          <Button
            mt="xl"
            type="submit"
            disabled={responseData?.message === "OK"}
          >
            {isLoading ? "Editing..." : "Edit"}
          </Button>
          {errors && <p style={{ color: "red" }}>{errors.root?.message}</p>}
        </form>
      </Paper>
    </Container>
  );
}
