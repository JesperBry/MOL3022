import React from "react";
import Container from "@material-ui/core/Container";

import TitleBar from "./components/TitleBar";
import SearchField from "./components/SearchField";
import ProteinList from "./components/ProteinList";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <TitleBar />
        <SearchField />
        <Container maxWidth="sm">
          <ProteinList />
        </Container>
      </div>
    );
  }
}

export default App;
