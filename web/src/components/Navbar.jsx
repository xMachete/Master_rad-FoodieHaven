import React from "react";
import { useState } from "react";
import {
  IconHome,
  IconToolsKitchen2,
  IconSettings,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconTagStarred,
  IconQrcode,
} from "@tabler/icons-react";
// import { logo2 } from "@mantinex/mantine-logo";

// @ts-ignore
import classes from "../styles/NavbarSimple.module.css";
import { useAuth } from "../hooks/useAuth";
import { NavLink } from "react-router-dom";

const data = [
  { link: "/home", label: "Home", icon: IconHome },
  { link: "/restaurants", label: "Restaurants", icon: IconToolsKitchen2 },
  { link: "/reservations", label: "Reservations", icon: IconReceipt2 },
  { link: "/reviews", label: "Reviews", icon: IconTagStarred },
  { link: "/qr-codes", label: "QR Codes", icon: IconQrcode },
  { link: "/settings", label: "Settings", icon: IconSettings },
];

export default function NavbarSimple() {
  const { logout } = useAuth();
  const [active, setActive] = useState("Billing");

  const links = data.map((item) => (
    <NavLink
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links} </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={() => logout()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={() => logout()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
