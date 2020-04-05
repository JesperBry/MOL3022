import React from "react";
import Loader from "react-loader-spinner";

import "../styles/sequenceResult.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const mapStructureToNoe = {
  a: "H",
  b: "E",
  c: "-"
};

class SequenceResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sequenceData: [],
      loading: false
    };
  }

  handleFelch = () => {
    let apiURL = "http://localhost:5000/api?pdb_id=";
    if (process.env.NODE_ENV === "production") {
      apiURL = "/api?pdb_id=";
    }

    let pdbID = this.props.pdbID;
    fetch(apiURL + pdbID).then(res =>
      res
        .json()
        .then(data =>
          this.setState({
            sequenceData: data.dssp,
            loading: false
          })
        )
        .catch(error => {
          console.log(error);
        })
    );
  };

  componentDidUpdate(prevProps) {
    if (prevProps.pdbID !== this.props.pdbID) {
      this.setState({ loading: true }, () => {
        this.handleFelch();
      });
    }
  }

  render() {
    return (
      <div className="sequence">
        {this.state.loading ? (
          <Loader
            type="ThreeDots"
            color="#3b3b3b"
            height={40}
            width={40}
            timeout={3000}
          />
        ) : (
          <p>{this.state.sequenceData.map(s => mapStructureToNoe[s])}</p>
        )}
      </div>
    );
  }
}

export default SequenceResult;
