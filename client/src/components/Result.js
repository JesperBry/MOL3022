import React, {Suspense, lazy } from "reactn";
import { ListGroup, ListGroupItem} from "reactstrap";
import SkyLight from "react-skylight";
import SequenceResult from "../components/SequenceResult";

//TODO import "../styles/Result"

class Result extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            visible: true
        };
    }
    
    render() {
        return (
            <div>
                <SequenceResult listID={this.global.listID}/>
            </div>
        )
    }
}

export default Result;