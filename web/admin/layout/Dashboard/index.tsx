import * as React from "react";
import { Container } from "@material-ui/core";
import AuthorizedDashboard from "./AuthorizedDashboard";
import RestrictedDashboard from "./RestrictedDashboard";

export default ({ permissions }) => {
  return (
    <Container>
      {permissions !== "admin" ? (
        <AuthorizedDashboard />
      ) : (
        <RestrictedDashboard />
      )}
    </Container>
  );
};
