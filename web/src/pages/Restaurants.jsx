import { ActionIcon, Group, Loader, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import CreateNewRestaurantButton from "../components/LinkButton";
import useApi from "../hooks/useApi";
import toast, { Toaster } from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";
import { DataTable } from "mantine-datatable";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZES = [10, 15, 20];

function Restaurants() {
  const { data: restaurantsData, isLoading, error, callApi } = useApi();
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(restaurantsData?.slice(0, pageSize));

  const navigate = useNavigate();

  useEffect(() => {
    callApi("http://localhost:4000/restaurants/getAll", "GET");
  }, []);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(restaurantsData?.slice(from, to));
  }, [page, pageSize, restaurantsData]);

  const notify = (message) =>
    toast.success(message, { duration: 3000, position: "top-center" });

  const handleDelete = async (id) => {
    await callApi(`http://localhost:4000/restaurants/delete/${id}`, "DELETE");

    if (restaurantsData) {
      notify("Successfully deleted");
    }
    if (error) {
      notify(error);
    }
  };

  const handleEdit = async (restaurant) => {
    navigate("edit", { state: restaurant });
  };

  // For slow internet connection Loader is returned
  if (!restaurantsData?.length && isLoading) {
    return <Loader />;
  }

  return (
    <div style={{ margin: "0 20px" }}>
      <Toaster />
      <CreateNewRestaurantButton linkTo="addNew" text="Add new" />

      <DataTable
        withTableBorder
        borderRadius="sm"
        withColumnBorders
        striped
        highlightOnHover
        records={records}
        columns={[
          { accessor: "name" },
          { accessor: "category" },
          {
            accessor: "coordinates",
            render: ({ coordinates }) => {
              return (
                <Text>
                  {coordinates.latitude} {coordinates.longitude}
                </Text>
              );
            },
          },

          { accessor: "display_phone" },
          {
            accessor: "hours",
            render: ({ hours }) => {
              const workingHours = hours.split(",");
              return (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text>Monday: {workingHours[0]} </Text>
                  <Text>Tuesday: {workingHours[1]}</Text>
                  <Text>Wednesday: {workingHours[2]}</Text>
                  <Text>Thursday: {workingHours[3]}</Text>
                  <Text>Friday:{workingHours[4]} </Text>
                  <Text>Saturday: {workingHours[5]}</Text>
                  <Text>Sunday: {workingHours[6]}</Text>
                </div>
              );
            },
          },
          { accessor: "location" },
          {
            accessor: "photos",
            render: ({ photos }) => {
              return photos.map((photo) => {
                return <Text>{photo}</Text>;
              });
            },
          },
          { accessor: "review_count" },
          {
            accessor: "actions",
            title: "Actions",
            render: (restaurant) => (
              <Group gap={4} justify="center" wrap="nowrap">
                <ActionIcon
                  size="md"
                  variant="subtle"
                  color="blue"
                  onClick={() => handleEdit(restaurant)}
                >
                  <IconEdit size={50} />
                </ActionIcon>
                <ActionIcon size="md" variant="subtle" color="red">
                  <ConfirmModal
                    text={`Are you sure that you want to delete ${restaurant.name} restaurant?`}
                    isLaoding={isLoading}
                    handleConfirm={() => handleDelete(restaurant._id)}
                  >
                    <IconTrash style={{ cursor: "pointer" }} />
                  </ConfirmModal>
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        totalRecords={restaurantsData?.length}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={(p) => setPage(p)}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
      />
    </div>
  );
}

export default Restaurants;
