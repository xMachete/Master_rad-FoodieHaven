import useApi from "../hooks/useApi";
import QRCodeGenerator from "../components/QRCodeGenerator";
import React, { useEffect, useState } from "react";
import { Container, Select } from "@mantine/core";

export default function QRCodePage() {
  const { data: restaurantsData, callApi } = useApi();
  const [restaurant, setRestaurant] = useState("");
 
  const restaurantsOptions = restaurantsData?.map((restaurant) => ({
    value: restaurant._id,
    label: restaurant.name,
  }));

  useEffect(() => {
    callApi("http://localhost:4000/restaurants/getAll", "GET");
  }, []);

  useEffect(() => {
    if (restaurantsData) {
      setRestaurant(restaurantsData[0]._id);
    }
  }, [restaurantsData]);

  return (
    <Container>
      <Select
        label="Pick a restaurant"
        value={restaurant}
        onChange={setRestaurant}
        data={restaurantsOptions || []}
        clearable
      />
      <QRCodeGenerator value={restaurant} />
    </Container>
  );
}
