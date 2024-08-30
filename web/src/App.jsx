import React from "react";

import { MantineProvider } from "@mantine/core";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import AppShell from "./components/AppShell";
import Restaurants from "./pages/Restaurants";
import ReviewPage from "./pages/Reviews";
import CreateRestaurantForm from "./components/CreateRestaurantForm";
import "@mantine/core/styles.css";
import Reservations from "./pages/Reservations";
import Home from "./pages/Home";
import EditRestaurantForm from "./components/restaurant/EditRestaurantForm";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";
import "./styles/layout.css";
import CreateReservationForm from "./components/reservations/CreateReservationForm";
import EditReservationForm from "./components/reservations/EditReservationForm";
import QRCodePage from "./pages/QRCode";
import Settings from "./pages/Settings";

function App() {
  return (
    <AuthProvider>
      <MantineProvider>
        <ModalsProvider labels={{ confirm: "Submit", cancel: "Cancel" }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<AppShell />}>
              <Route index element={<Navigate replace to="home" />} />
              <Route
                path="restaurants"
                element={
                  <ProtectedRoute>
                    <Restaurants />
                  </ProtectedRoute>
                }
              />
              <Route
                path="home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="reservations"
                element={
                  <ProtectedRoute>
                    <Reservations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="reservations/addNew"
                element={
                  <ProtectedRoute>
                    <CreateReservationForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="reservations/edit"
                element={
                  <ProtectedRoute>
                    <EditReservationForm />
                  </ProtectedRoute>
                }
              />
              {/* TODO: Nest into restaurant and create index for each */}
              <Route
                path="restaurants/addNew"
                element={
                  <ProtectedRoute>
                    <CreateRestaurantForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="restaurants/edit"
                element={
                  <ProtectedRoute>
                    <EditRestaurantForm />
                  </ProtectedRoute>
                }
              />
              <Route path="reviews" element={<ReviewPage />} />
              <Route path="qr-codes" element={<QRCodePage />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ModalsProvider>
      </MantineProvider>
    </AuthProvider>
  );
}

export default App;
