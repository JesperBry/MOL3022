import React from "reactn";
import { ListGroup, ListGroupItem } from "reactstrap";

import "../styles/ProteinList.css";

class ProteinList extends React.Component {
  handelOnClick = id => {
    this.setGlobal({
      listID: id
    });
  };

  render() {
    const listArr = this.global.searchData;
    return (
      <div className="idList">
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
      </div>
    );
  }
}

export default ProteinList;
