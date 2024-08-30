import React from "react";
import { AppShell } from "@mantine/core";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function AppShellDemo() {
  return (
    <AppShell
      header={{ height: 70 }}
      footer={{ height: 60 }}
      navbar={{ breakpoint: "sm", width: 300 }}
    >
      <AppShell.Header p="md">
        <Header />
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
