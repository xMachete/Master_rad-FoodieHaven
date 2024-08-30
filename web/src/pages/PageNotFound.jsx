import React from "react";
import { Title, Text, Button, Container, Group, Image } from "@mantine/core";
// @ts-ignore
import classes from "../styles/NotFoundTitle.module.css";
import { NavLink } from "react-router-dom";

export default function NotFoundTitle() {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>
        404 <Image src="/assets/FoodieHEaven.png" w={100} h={100} mt={20} />
      </div>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md">
          <NavLink to="home">Take me back to home page</NavLink>
        </Button>
      </Group>
    </Container>
  );
}
