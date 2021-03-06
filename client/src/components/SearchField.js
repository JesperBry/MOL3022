import React from "reactn";
import { Form, Input } from "reactstrap";
import Container from "@material-ui/core/Container";

import "../styles/SearchField.css";

class SearchField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputVal: "",
    };

    this.setGlobal({
      searchData: [],
      error: false,
      loading: false,
    });
  }

  handleOnChange = (e) => {
    this.setState({ inputVal: e });
  };

  handleFelch = () => {
    let apiURL = "http://localhost:5000/search?keywords=";
    if (process.env.NODE_ENV === "production") {
      apiURL = "/search?keywords=";
    }
    let searchVal = this.state.inputVal.replace(/[\n# $&:\n\t]/g, "%20");
    fetch(apiURL + searchVal).then((res) =>
      res
        .json()
        .then((data) =>
          this.setGlobal({
            searchData: data.results,
            loading: false,
          })
        )
        .catch((error) => {
          this.setGlobal({
            error: true,
          });
          console.log(error);
        })
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setGlobal({ loading: true }, () => {
      this.handleFelch();
    });
  };

  render() {
    return (
      <div className="head-bar">
        <Container maxWidth="sm">
          <h1 className="head-title">Prediction of secondary structure</h1>
          <Form className="search-form" onSubmit={this.handleSubmit}>
            <Container maxWidth="sm">
              <Input
                type="text"
                name="search"
                placeholder="Search..."
                onChange={(e) => this.handleOnChange(`${e.target.value}`)}
              />
            </Container>
          </Form>
        </Container>
      </div>
    );
  }
}

export default SearchField;
