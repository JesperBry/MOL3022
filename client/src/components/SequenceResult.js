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

class SequenceResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sequenceData: [],
      loading: false,
      type: ""
    };
  }

  handleFelch = () => {
    let apiURL = "http://localhost:5000/api?pdb_id=";
    if (process.env.NODE_ENV === "production") {
      apiURL = "/api?pdb_id=";
    }
    
    let pdbID = this.global.listID;
    if(this.state.type == "dssp"){
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
    }
    else if(this.state.type == "psea"){
      fetch(apiURL + pdbID).then(res =>
        res
          .json()
          .then(data =>
            this.setState({
              sequenceData: data.psea,
              loading: false
            })
          )
          .catch(error => {
            console.log(error);
          })
      );
    }
    else if(this.state.type == "mmtf"){
      fetch(apiURL + pdbID).then(res =>
        res
          .json()
          .then(data =>
            this.setState({
              sequenceData: data.mmtf,
              loading: false
            })
          )
          .catch(error => {
            console.log(error);
          })
      );
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      this.setState({ loading: true, type: this.props.type }, () => {
      });
      this.handleFelch();
    }
  }

  componentWillMount = () => {
    this.setState({
      type: this.props.type
    })
    
  }

  componentDidMount = () => {
    this.handleFelch();
  }

  handleOnClick = () => {
    console.log(this.state);
  }
  render() {
    return (
      <div className="sequence">
        <h3>{this.props.type}</h3>
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