import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Container,
  FileInput,
  Image,
  Paper,
  Text,
} from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "react-hook-form-mantine";
import { createRestaurantSchema } from "../../services/schema";
import { useLocation } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { IconTrash } from "@tabler/icons-react";
import toast, { Toaster } from "react-hot-toast";

function EditRestaurantForm() {
  const { data: responseData, isLoading, error: errorApi, callApi } = useApi();

  // Data received from Restaurants table
  const { state } = useLocation();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(createRestaurantSchema),
    defaultValues: {
      ...state,
      coordinates: `${state.coordinates.latitude}, ${state.coordinates.longitude}`,
      rating: `${state.rating}`,
      review_count: `${state.review_count}`,
    },
  });
  const [newPhotos, setNewPhotos] = useState([]);
  const [oldPhotos, setOldPhotos] = useState(getValues("photos"));

  const onSubmit = async (data) => {
    const coordinatesArray = data.coordinates.split(",");
    data.coordinates = {
      latitude: coordinatesArray[0],
      longitude: coordinatesArray[1],
    };

    // FormData is necessary in order to send files as a data
    const fd = new FormData();

    // Adding to data new photos
    data.newPhotos = [];
    for (let i = 0; i < newPhotos.length; i++) {
      fd.append("newPhotos", newPhotos[i]);
      data.newPhotos.push(`${newPhotos[i].name}`);
    }

    // Adding to data old photos
    data.photos = oldPhotos;

    const dataKeys = Object.keys(data);

    for (let i = 0; i < dataKeys.length; i++) {
      if (typeof data[dataKeys[i]] === "object") {
        fd.append(dataKeys[i], JSON.stringify(data[dataKeys[i]]));
      } else {
        fd.append(dataKeys[i], data[dataKeys[i]]);
      }
    }

    await callApi(
      `http://localhost:4000/restaurants/edit/${state._id}`,
      "PUT",
      fd
    );
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
    <>
      <Toaster />
      <Container>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              {oldPhotos?.map((oldPhoto) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      position: "relative",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      w={100}
                      h={100}
                      src={oldPhoto}
                      alt="old photo"
                      radius="md"
                    />

                    <IconTrash
                      style={{
                        position: "absolute",
                        left: "0",
                        top: "0",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setOldPhotos((oldPhotos) => {
                          return oldPhotos.filter((x) => {
                            return x !== oldPhoto;
                          });
                        });
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <FileInput
              leftSection={<IconPhoto stroke={1} />}
              mb={10}
              name="new-photos"
              value={newPhotos}
              onChange={(values) => {
                setNewPhotos(values);
              }}
              placeholder="Upload photos"
              label="New Photos"
              multiple
              withAsterisk
            />
            {newPhotos.length !== 0 && (
              <Image w={100} src={URL.createObjectURL(newPhotos[0])} />
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
            <TextInput
              mb={10}
              name="review_count"
              control={control}
              placeholder="232"
              label="Review count"
              withAsterisk
            />
            <Button
              type="submit"
              disabled={
                isSubmitting || isLoading || responseData?.message === "OK"
              }
              style={{
                width: "200px",
                margin: "0 auto",
              }}
            >
              {/* NOTE: Could be improved not to be able to edit if nothing is changed using isDirty(reference: https://github.com/orgs/react-hook-form/discussions/3948 */}
              {isSubmitting ? "Loading..." : "Edit"}
            </Button>
            {errorApi && <Text style={{ color: "red" }}>{errorApi}</Text>}
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default EditRestaurantForm;
