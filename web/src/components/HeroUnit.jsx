import React from "react";
import { Overlay, Container, Title, Button, Text } from "@mantine/core";
// @ts-ignore
import classes from "../styles/HeroContentLeft.module.css";
import { NavLink } from "react-router-dom";

// TODO: Fix the css isue to make hero unit to be full height
function HeroUnit() {
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>
          Manage restaurants and reservations with ease
        </Title>
        <Text className={classes.description} size="xl" mt="xl">
          Take full control of creating, editing and deleting restaurants. In
          easy way track all reservations that users have made.
        </Text>

        <Button
          variant="gradient"
          size="xl"
          radius="xl"
          className={classes.control}
        >
          <NavLink
            style={{ textDecoration: "none", color: "white" }}
            to="/restaurants"
          >
            Get started
          </NavLink>
        </Button>
      </Container>
    </div>
  );
}

export default HeroUnit;
