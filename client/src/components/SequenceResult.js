import React from "reactn";
import Loader from "react-loader-spinner";

import "../styles/sequenceResult.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Button } from "reactstrap";

const mapStructureToNoe = {
  a: "H",
  b: "E",
  c: "-"
};

const mapStructureToNoeAnnet = {
  a: "~",
  b: "▸",
  c: "–"
}

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
    
    let pdbID = this.global.listID;
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

 /*  componentDidUpdate(prevProps) {
    if (prevProps.pdbID !== this.props.pdbID) {
      this.setState({ loading: true }, () => {
        this.handleFelch();
      });
    }
  } */

  componentDidMount = () => {
    this.handleFelch();
    
    
  }

  handleOnClick = () => {
    console.log(this.state);
    
    this.setGlobal({
      shit: "shit"
    })
    console.log("global set");
    
    console.log(this.global.listID);
    console.log(this.global.shit)
    
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
          <p>{this.state.sequenceData.map(s => mapStructureToNoeAnnet[s])}</p>
        )}
        <button onClick={this.handleOnClick}>asso so</button>
      </div>
    );
  }
}

export default SequenceResult;