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

function Reservations() {
  const { data: reservationsData, isLoading, error, callApi } = useApi();
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(reservationsData?.slice(0, pageSize));

  const navigate = useNavigate();

  useEffect(() => {
    callApi("http://localhost:4000/reservations/getAll", "GET");
  }, []);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(reservationsData?.slice(from, to));
  }, [page, pageSize, reservationsData]);

  const notify = (message) =>
    toast.success(message, { duration: 3000, position: "top-center" });

  const handleDelete = async (id) => {
    await callApi(`http://localhost:4000/reservations/delete/${id}`, "DELETE");

    if (reservationsData) {
      notify("Successfully deleted");
    }
    if (error) {
      notify(error);
    }
  };

  const handleEdit = async (reservation) => {
    navigate("edit", { state: reservation });
  };

  // For slow internet connection Loader is returned
  if (!reservationsData?.length && isLoading) {
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
          { accessor: "restaurantId" },
          { accessor: "name" },
          { accessor: "tableNumber" },
          { accessor: "email" },
          {
            accessor: "date",
            render: ({ date }) => {
              const dateObj = new Date(date);
              // If date is invalid return "/"
              if (isNaN(dateObj.getDate())) return "/";
              return `${dateObj.getDate()}/${
                dateObj.getMonth() + 1
              }/${dateObj.getFullYear()}`;
            },
          },

          {
            accessor: "time",
            render: ({ time }) => {
              const dateObj = new Date(time);
              // If date is invalid return "/"
              if (isNaN(dateObj.getTime())) return "/";
              return `${dateObj.getHours()}:${dateObj.getMinutes()}`;
            },
          },
          {
            accessor: "confirmed",
            render: ({ confirmed }) => {
              return confirmed ? (
                <Text color="green">Confirmed</Text>
              ) : (
                <Text color="red">Not Confirmed</Text>
              );
            },
          },
          {
            accessor: "actions",
            title: "Actions",
            render: (reservation) => (
              <Group gap={4} justify="center" wrap="nowrap">
                <ActionIcon
                  size="md"
                  variant="subtle"
                  color="blue"
                  onClick={() => handleEdit(reservation)}
                >
                  <IconEdit size={50} />
                </ActionIcon>
                <ActionIcon size="md" variant="subtle" color="red">
                  <ConfirmModal
                    text={`Are you sure that you want to delete reservation?`}
                    isLaoding={isLoading}
                    // @ts-ignore
                    handleConfirm={() => handleDelete(reservation._id)}
                  >
                    <IconTrash style={{ cursor: "pointer" }} />
                  </ConfirmModal>
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        totalRecords={reservationsData?.length}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={(p) => setPage(p)}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
      />
    </div>
  );
}

export default Reservations;
