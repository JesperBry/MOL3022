import React from "react";
import Container from "@material-ui/core/Container";

import Header from "./components/Header";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Header />
      </Container>
    </div>
  );
}

export default App;
