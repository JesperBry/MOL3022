import React from "react";
import Container from "@material-ui/core/Container";

import SearchField from "../SearchField";
import ProteinList from "../ProteinList";

const HomePage = () => {
  return (
    <div>
      <SearchField />
      <Container maxWidth="sm">
        <ProteinList />
      </Container>
    </div>
  );
};

export default HomePage;
