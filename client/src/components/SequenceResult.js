import React from "react";

import "../styles/sequenceResult.css";

const mapStructureToNoe = {
  a: "H",
  b: "E",
  c: "-"
};

class SequenceResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sequenceData: []
    };
  }

  handleFelch = () => {
    fetch("http://localhost:5000/").then(res =>
      res
        .json()
        .then(data =>
          this.setState({
            sequenceData: data.secondary_structure
          })
        )
        .catch(error => {
          console.log(error);
        })
    );
  };

  componentDidMount() {
    this.handleFelch();
  }

  render() {
    return (
      <div className="sequence">
        <p>{this.state.sequenceData.map(s => mapStructureToNoe[s])}</p>
        <hr />
      </div>
    );
  }
}

export default SequenceResult;
