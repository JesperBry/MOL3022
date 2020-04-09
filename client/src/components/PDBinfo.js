import React from "reactn";
import { parseString } from "xml2js";

import "../styles/PDBinfo.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class SequenceResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      infoData: [],
    };
  }

  getPdbEntityInfo = () => {
    let baseURL = "https://www.rcsb.org/pdb/rest/describePDB?structureId=";
    let pdbID = this.props.pdbID;
    fetch(baseURL + pdbID)
      .then((response) => response.text())
      .then((responseText) => {
        parseString(responseText, function (err, result) {
          responseText = result;
          return result;
        });
        this.setState({ infoData: responseText });
      })
      .catch((error) => {
        console.log("Error fetching the feed: ", error);
      });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.pdbID !== this.props.pdbID) {
      this.setState({ loading: true }, () => {
        this.getPdbEntityInfo();
      });
    }
  }

  render() {
    return (
      <div className="sequence">
        <h1 align="left">{`PDB: ${this.props.pdbID}`}</h1>
        {this.state.infoData.PDBdescription && (
          <React.Fragment>
            <h4 align="left">
              {`${this.state.infoData.PDBdescription.PDB[0].$.title}`}
            </h4>
            <p align="left">
              {`PubMed: ${this.state.infoData.PDBdescription.PDB[0].$.pubmedId}`}
            </p>
            <p align="left">
              {`Method: ${this.state.infoData.PDBdescription.PDB[0].$.expMethod}`}
            </p>
            <p align="left">
              {`Release date: ${this.state.infoData.PDBdescription.PDB[0].$.release_date}, 
            Last modified: ${this.state.infoData.PDBdescription.PDB[0].$.last_modification_date}`}
            </p>
          </React.Fragment>
        )}
        <p align="left" className="url">
          Read more at: &nbsp;
          <a href={`https://www.rcsb.org/structure/${this.props.pdbID}`}>
            https://www.rcsb.org/structure/{this.props.pdbID}
          </a>
        </p>
      </div>
    );
  }
}

export default SequenceResult;
