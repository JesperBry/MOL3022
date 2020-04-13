import React from "reactn";

import "../styles/sequenceResult.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const mapStructureToNoe = {
  a: "H",
  b: "E",
  c: "-",
};

class SequenceResult extends React.Component {
  render() {
    return (
      <div className="sequence">
        <h4 align="left">{`${this.props.type.toUpperCase()}:`}</h4>
        {this.props.plain ? (
          <p align="left">{this.global.result[this.props.type]}</p>
        ) : (
          <p align="left">
            {this.global.result[this.props.type].map(
              (s) => mapStructureToNoe[s]
            )}
          </p>
        )}
      </div>
    );
  }
}

export default SequenceResult;
