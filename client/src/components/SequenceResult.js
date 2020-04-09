import React from "reactn";
import Loader from "react-loader-spinner";

import "../styles/sequenceResult.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const mapStructureToNoe = {
  a: "H",
  b: "E",
  c: "-",
};

class SequenceResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sequenceData: [],
      loading: false,
      type: "",
      primSeq: null,
    };
  }

  handleFetch = () => {
    let apiURL = "http://localhost:5000/api?pdb_id=";
    if (process.env.NODE_ENV === "production") {
      apiURL = "/api?pdb_id=";
    }

    let pdbID = this.global.listID;

    if (this.state.type === "dssp") {
      fetch(apiURL + pdbID).then((res) =>
        res
          .json()
          .then((data) =>
            this.setState({
              sequenceData: data.dssp,
              loading: false,
            })
          )
          .catch((error) => {
            console.log(error);
          })
      );
    } else if (this.state.type === "psea") {
      fetch(apiURL + pdbID).then((res) =>
        res
          .json()
          .then((data) =>
            this.setState({
              sequenceData: data.psea,
              loading: false,
            })
          )
          .catch((error) => {
            console.log(error);
          })
      );
    } else if (this.state.type === "mmtf") {
      fetch(apiURL + pdbID).then((res) =>
        res
          .json()
          .then((data) =>
            this.setState({
              sequenceData: data.mmtf,
              loading: false,
            })
          )
          .catch((error) => {
            console.log(error);
          })
      );
    } else if (this.state.type === "sequence") {
      fetch(apiURL + pdbID).then((res) =>
        res
          .json()
          .then((data) =>
            this.setState({
              primSeq: data.sequence,
              loading: false,
            })
          )
          .catch((error) => {
            console.log(error);
          })
      );
    }
  };

  componentWillMount = () => {
    this.setState({
      type: this.props.type,
    });
  };

  componentDidMount = () => {
    this.setState({ loading: true }, () => {
      this.handleFetch();
    });
  };

  render() {
    return (
      <div className="sequence">
        <h4 align="left">{`${this.props.type.toUpperCase()}:`}</h4>
        <p align="left">{this.state.primSeq}</p>
        {this.state.loading ? (
          <Loader
            type="ThreeDots"
            color="#3b3b3b"
            height={40}
            width={40}
            timeout={3000}
          />
        ) : (
          <p align="left">
            {this.state.sequenceData.map((s) => mapStructureToNoe[s])}
          </p>
        )}
      </div>
    );
  }
}

export default SequenceResult;
