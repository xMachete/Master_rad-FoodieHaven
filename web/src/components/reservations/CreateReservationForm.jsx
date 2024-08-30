import React, { useEffect } from "react";
import { Button, Container, Paper, Text } from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NumberInput, TextInput } from "react-hook-form-mantine";

import toast, { Toaster } from "react-hot-toast";
import useApi from "../../hooks/useApi";
import { createReservationSchema } from "../../services/schema";

function CreateReservationForm() {
  const { data: responseData, isLoading, error: errorApi, callApi } = useApi();

  // form definition
  const {
    control,
    handleSubmit,

    formState: { isSubmitting, isDirty },
  } = useForm({ resolver: zodResolver(createReservationSchema) });

  const onSubmit = async (data) => {
    await callApi("http://localhost:4000/reservations/create", "POST", data);
  };

  useEffect(() => {
    if (responseData?.message === "OK") {
      toast.success("Successfully created.", {
        duration: 3000,
        position: "top-center",
      });
    }
  }, [responseData]);

  return (
    <>
      <Toaster />
      <Container>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <NumberInput
              mb={10}
              name="restaurantId"
              control={control}
              placeholder="3"
              label="restaurantId"
              withAsterisk
            />

            <TextInput
              mb={10}
              name="tableNumber"
              control={control}
              placeholder="23"
              label="Table number"
              withAsterisk
            />

            <TextInput
              mb={10}
              name="email"
              control={control}
              placeholder="Cafe"
              label="Email"
              withAsterisk
            />
            <TextInput
              mb={10}
              name="date"
              control={control}
              placeholder="2024-08-07T16:29:15.808Z"
              label="Date"
              withAsterisk
            />
            <TextInput
              mb={10}
              name="time"
              control={control}
              placeholder="2024-08-07T16:29:15.808Z"
              label="Time"
              withAsterisk
            />

            <Button
              type="submit"
              disabled={isSubmitting || isLoading || !isDirty}
              style={{
                width: "200px",
                margin: "0 auto",
              }}
            >
              {isSubmitting ? "Loading..." : "Create"}
            </Button>
            {errorApi && (
              <Text style={{ color: "red" }}>{errorApi.message}</Text>
            )}
            {/* {responseData?.message === "OK" && (
              <Text style={{ color: "green" }}>Successfully created.</Text>
            )} */}
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default CreateReservationForm;
