import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Paper,
  Text,
  FileInput,
  Image,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "react-hook-form-mantine";
import { createRestaurantSchema } from "../services/schema";
import { useApi } from "../hooks/useApi";
import { IconPhoto } from "@tabler/icons-react";
import toast, { Toaster } from "react-hot-toast";

function CreateRestaurantForm() {
  const { data: responseData, isLoading, error: errorApi, callApi } = useApi();
  // NOTE: Separately of other fields, for photos I used controlled FileInput from Mantine instead of react-hook-form-mantine, since it didn't work properly
  const [photos, setPhotos] = useState([]);

  // form definition
  const {
    control,
    handleSubmit,

    formState: { isSubmitting, isDirty, errors },
  } = useForm({ resolver: zodResolver(createRestaurantSchema) });
  console.log(errors);
  const onSubmit = async (data) => {
    // NOTE: In order to create object as required on backend model I have to format it into object since its a string received from the create form.
    // Further I have to stringify it in order to pass through FormData. At the and on backend I need to parse it in order to save as a real object.
    // Probably it was easier to make this field String instead of Object and just manipulate on that string

    const coordinatesArray = data.coordinates.split(",");
    data.coordinates = {
      latitude: coordinatesArray[0],
      longitude: coordinatesArray[1],
    };

    // FormData is necessary in order to send files as a data
    const fd = new FormData();

    data.photos = [];
    for (let i = 0; i < photos.length; i++) {
      fd.append("photos", photos[i]);
      data.photos.push(`${photos[i].name}`);
    }

    const dataKeys = Object.keys(data);

    for (let i = 0; i < dataKeys.length; i++) {
      if (typeof data[dataKeys[i]] === "object") {
        fd.append(dataKeys[i], JSON.stringify(data[dataKeys[i]]));
      } else {
        fd.append(dataKeys[i], data[dataKeys[i]]);
      }
    }

    await callApi("http://localhost:4000/restaurants/create", "POST", fd);
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
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <TextInput
              mb={10}
              name="name"
              control={control}
              placeholder="GoodFellas"
              label="Name"
              withAsterisk
            />

            <TextInput
              mb={10}
              name="category"
              control={control}
              placeholder="Cafe"
              label="Category"
              withAsterisk
            />
            <TextInput
              mb={10}
              name="hours"
              control={control}
              placeholder="09:00-24,00:00-24,00:00-23:00,00:00-22:30,00:00-22:00,00:00-22:00,closed"
              label="Hours"
              withAsterisk
            />
            <TextInput
              mb={10}
              name="location"
              control={control}
              placeholder="123 Main St, Vancouver, BC"
              label="Location"
              withAsterisk
            />
            <TextInput
              mb={10}
              name="coordinates"
              control={control}
              placeholder="44.816906, 20.435736"
              label="Coordinates"
              withAsterisk
            />

            <FileInput
              leftSection={<IconPhoto stroke={1} />}
              mb={10}
              name="photos"
              value={photos}
              onChange={(values) => {
                setPhotos(values);
              }}
              placeholder="Upload photos"
              label="Photos"
              multiple
              withAsterisk
            />
            {photos.length !== 0 && (
              <Image w={100} src={URL.createObjectURL(photos[0])} />
            )}
            <TextInput
              mb={10}
              name="display_phone"
              control={control}
              placeholder="+381641234567"
              label="Phone"
              withAsterisk
            />
            <TextInput
              mb={10}
              name="price"
              control={control}
              placeholder="$$"
              label="Price"
              withAsterisk
            />
            <TextInput
              mb={10}
              name="rating"
              control={control}
              placeholder="4.2"
              label="Rating"
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

export default CreateRestaurantForm;
