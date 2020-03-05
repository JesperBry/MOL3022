import React, { Suspense, lazy } from "reactn";
import { ListGroup, ListGroupItem } from "reactstrap";
import SkyLight from "react-skylight";

import SequenceResult from "../components/SequenceResult";

import "../styles/ProteinList.css";

class ProteinList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listID: ""
    };
  }

  handelOnClick = id => {
    this.setState({
      listID: id
    });
    this.dialog.show();
  };

  render() {
    const listArr = this.global.searchData;
    const err = this.global.error;
    return (
      <div className="idList">
        <p>{listArr.length} PDB id's founded</p>
        <ListGroup flush>
          {listArr.map((index, id) => (
            <ListGroupItem
              key={index}
              action
              onClick={() => this.handelOnClick(listArr[id])}
            >
              {listArr[id]}
            </ListGroupItem>
          ))}
        </ListGroup>

        <SkyLight
          hideOnOverlayClicked
          ref={ref => (this.dialog = ref)}
          title={`PDB ${this.state.listID}: predicted secondary structure`}
        >
          {err ? (
            <p>An error occurred, please try again!</p>
          ) : (
            <SequenceResult pdbID={this.state.listID} />
          )}
        </SkyLight>
      </div>
    );
  }
}

export default ProteinList;
