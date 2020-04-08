import React from "reactn";
import { ListGroup, ListGroupItem } from "reactstrap";
import SkyLight from "react-skylight";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

import PDBinfo from "./PDBinfo";

import "../styles/ProteinList.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class ProteinList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listID: "",
    };
  }

  handleOnClick = (id) => {
    this.setState({
      listID: id,
    });
    this.setGlobal({
      listID: id
    })
    console.log(this.global.listID);
    this.dialog.show();
  };

  render() {
    const listArr = this.global.searchData;
    const err = this.global.error;
    return (
      <div className="idList">
        <p>{listArr.length} PDB id's found</p>
        {this.global.loading ? (
          <Loader
            type="ThreeDots"
            color="#3b3b3b"
            height={40}
            width={40}
            timeout={5000}
          />
        ) : (
          <ListGroup flush>
            {listArr.map((index, id) => (
              <ListGroupItem
                key={index}
                action
                onClick={() => this.handleOnClick(listArr[id])}
              >
                {listArr[id]}
              </ListGroupItem>
            ))}
          </ListGroup>
        )}

        <SkyLight hideOnOverlayClicked ref={(ref) => (this.dialog = ref)}>
          {err ? (
            <p>An error occurred, please try again!</p>
          ) : (
            <div>
              <PDBinfo pdbID={this.state.listID} />
              <Link className="calc-results" to="/result">
                Continue to prediction 🠚
              </Link>
            </div>
          )}
        </SkyLight>
      </div>
    );
  }
}

export default ProteinList;
