import { ActionIcon, Group, Loader, Select } from "@mantine/core";
import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import toast, { Toaster } from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";
import { DataTable } from "mantine-datatable";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PAGE_SIZES = [10, 15, 20];

function Reviews() {
  const { data: reviewsData, isLoading, error, callApi } = useApi();
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(reviewsData?.slice(0, pageSize));
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    callApi("http://localhost:4000/reviews/getAll", "GET");
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/restaurants/getAll")
      .then((res) => {
        setRestaurants(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    let newReviews = reviewsData?.slice(from, to);
    if (selectedRestaurant) {
      newReviews = newReviews.filter(
        (record) => record.restaurantId === selectedRestaurant
      );
    }
    setRecords(newReviews);
  }, [page, pageSize, reviewsData, selectedRestaurant]);

  const notify = (message) =>
    toast.success(message, { duration: 3000, position: "top-center" });

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/reviews/delete/${id}`);
    await callApi("http://localhost:4000/reviews/getAll", "GET");
    if (reviewsData) {
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
  if (!reviewsData?.length && isLoading) {
    return <Loader />;
  }

  const restaurantsData = restaurants.map((restaurant) => ({
    value: restaurant._id,
    label: restaurant.name,
  }));

  return (
    <div
      style={{
        margin: "0px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Toaster />
      <Select
        data={restaurantsData}
        label="Pick a restaurant"
        value={selectedRestaurant}
        onChange={setSelectedRestaurant}
        placeholder="Select a restaurant"
        clearable
      />
      <DataTable
        withTableBorder
        borderRadius="sm"
        withColumnBorders
        striped
        highlightOnHover
        records={records}
        columns={[
          { accessor: "name" },
          { accessor: "stars" },
          { accessor: "comment" },
          {
            accessor: "actions",
            title: "Actions",
            render: (restaurant) => (
              <Group gap={4} justify="center" wrap="nowrap">
                <ActionIcon size="md" variant="subtle" color="red">
                  <ConfirmModal
                    text={`Are you sure that you want to delete ${restaurant.name} restaurant?`}
                    isLaoding={isLoading}
                    // @ts-ignore
                    handleConfirm={() => handleDelete(restaurant._id)}
                  >
                    <IconTrash style={{ cursor: "pointer" }} />
                  </ConfirmModal>
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        totalRecords={reviewsData?.length}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={(p) => setPage(p)}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
      />
    </div>
  );
}

export default Reviews;
