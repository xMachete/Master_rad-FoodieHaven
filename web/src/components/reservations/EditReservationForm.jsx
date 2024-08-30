import React, { useEffect } from "react";
import { Button, Container, Paper, Text } from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox, TextInput } from "react-hook-form-mantine";

import toast, { Toaster } from "react-hot-toast";
import useApi from "../../hooks/useApi";
import { editReservationSchema } from "../../services/schema";
import { useLocation } from "react-router-dom";

function EditReservationForm() {
  const { data: responseData, isLoading, error: errorApi, callApi } = useApi();

  const { state } = useLocation();
  // form definition
  const {
    control,
    handleSubmit,

    formState: { isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(editReservationSchema),
    defaultValues: state,
  });

  const onSubmit = async (reservation) => {
    await callApi(
      `http://localhost:4000/reservations/update/${state._id}`,
      "PUT",
      reservation
    );
  };

  useEffect(() => {
    if (responseData?.message === "OK") {
      toast.success("Successfully edited.", {
        duration: 3000,
        position: "top-center",
      });
    }
    if (responseData?.statusCode === 204) {
      toast.success("Successful deleted", {
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
            <TextInput
              mb={10}
              name="restaurantId"
              control={control}
              placeholder="3"
              label="Restaurant ID"
              withAsterisk
            />

            <TextInput
              mb={10}
              name="name"
              control={control}
              placeholder="Name"
              label="Name"
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
            <Checkbox
              label="Confirmed:"
              labelPosition="left"
              mb={10}
              name="confirmed"
              control={control}
            />
            <Button
              type="submit"
              disabled={isSubmitting || isLoading || !isDirty}
              style={{
                width: "200px",
                margin: "0 auto",
              }}
            >
              {isSubmitting ? "Loading..." : "Edit"}
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

export default EditReservationForm;
