import React from "react";
import Container from "@material-ui/core/Container";

import SequenceResult from "./components/SequenceResult";
import TitleBar from "./components/TitleBar";
import SearchField from "./components/SearchField";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <TitleBar />
        <SearchField />
        <Container maxWidth="md">
          <SequenceResult />
        </Container>
      </div>
    );
  }
}

export default App;
