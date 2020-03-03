import React from "reactn";
import { ListGroup, ListGroupItem } from "reactstrap";

class ProteinList extends React.Component {
  render() {
    const listArr = this.global.searchData;
    return (
      <div className="idList">
        <ListGroup>
          {listArr.map((index, id) => (
            <ListGroupItem key={index}>{listArr[id]}</ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default ProteinList;
