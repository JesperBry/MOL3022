import React from "react";
import { Form, Input } from "reactstrap";
import Container from "@material-ui/core/Container";

import "../styles/SearchField.css";

class SearchField extends React.Component {
  render() {
    return (
      <div className="head-bar">
        <Container maxWidth="sm">
          <h1 className="head-title">Prediction of secondary structure</h1>
          <Form className="search-form" onSubmit={this.handleSubmit}>
            <Container maxWidth="sm">
              <Input type="text" name="search" placeholder="Search..." />
            </Container>
          </Form>
        </Container>
      </div>
    );
  }
}

export default SearchField;
