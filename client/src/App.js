import React from "react";
import { Route, Switch } from "react-router-dom";

import TitleBar from "./components/TitleBar";

import HomePage from "./components/routes/HomePage";
import ResultPage from "./components/routes/ResultPage";
import SearchField from "./components/SearchField";
import ProteinList from "./components/ProteinList";
import Result from "./components/Result";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <TitleBar />
        <Switch>
          <Route component={ResultPage} exact path="/result" />
          <Route component={HomePage} exact path="/" />
        </Switch>
        <SearchField />
        <Container maxWidth="sm">
          <ProteinList />
        </Container>
        <Result />
      </div>
    );
  }
}

export default App;
