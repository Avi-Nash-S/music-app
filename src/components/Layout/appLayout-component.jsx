import React from "react";
import { Container } from "@material-ui/core";
import Header from "../Header/header-component";

const AppLayout = ({ children }) => {
  return (
    <Container className="app__layout">
      <Header>{children}</Header>
    </Container>
  );
};

export default AppLayout;
