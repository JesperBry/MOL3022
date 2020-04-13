import React from "reactn";
import Container from "@material-ui/core/Container";
import Loader from "react-loader-spinner";

import SequenceResult from "../SequenceResult";
import Comparator from "../Comparator";

import "../../styles/resultPage.css";

class ResultPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }
  handleFetch = () => {
    let apiURL = "http://localhost:5000/api?pdb_id=";
    if (process.env.NODE_ENV === "production") {
      apiURL = "/api?pdb_id=";
    }

    let pdbID = this.global.listID;

    fetch(apiURL + pdbID).then((res) =>
      res
        .json()
        .then((data) => {
          this.setGlobal({
            result: data,
          });
          this.setState({ loading: false });
        })
        .catch((error) => {
          console.log(error);
        })
    );
  };

  componentDidMount = () => {
    this.handleFetch();
  };
  render() {
    return (
      <div className="results">
        <Container maxWidth="lg">
          {this.state.loading ? (
            <Loader
              type="ThreeDots"
              color="#3b3b3b"
              height={40}
              width={40}
              timeout={3000}
            />
          ) : (
            <>
              <Comparator />
              <SequenceResult type={"sequence"} plain />
              <SequenceResult type={"dssp"} />
              <SequenceResult type={"psea"} />
              <SequenceResult type={"mmtf"} />
            </>
          )}
        </Container>
      </div>
    );
  }
}

export default ResultPage;
