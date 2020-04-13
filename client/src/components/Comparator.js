import React from "reactn";
import { Collapse, Button, Table } from "reactstrap";

import "../styles/Comparator.css";

class Comparator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div className="compare">
        <strong>Compare</strong>
        <select
          onChange={(e) => this.setState({ a: e.target.value, b: undefined })}
          defaultValue="none"
        >
          <option disabled value="none">
            choose method
          </option>
          {Object.keys(this.global.result.diffs).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        {this.state.a && (
          <>
            to
            <select
              value={this.state.b || "none"}
              onChange={(e) => this.setState({ b: e.target.value })}
              defaultValue="none"
            >
              <option disabled value="none">
                choose method
              </option>
              {Object.keys(this.global.result.diffs[this.state.a]).map(
                (key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                )
              )}
            </select>
          </>
        )}
        {this.state.a && this.state.b && (
          <>
            <div className="match">
              {Math.round(
                this.global.result.diffs[this.state.a][this.state.b].percent *
                  100
              )}
              % match
            </div>
            <Button
              onClick={this.toggle}
              style={{
                padding: "1rem",
                marginTop: "1.2rem",
                fontSize: "1.6rem",
              }}
            >
              More details
            </Button>
            <Collapse isOpen={this.state.isOpen}>
              <div className="table">
                {this.global.result.diffs[this.state.a][this.state.b].diff
                  .split("\n")
                  .map((line, i) => (
                    <Table
                      style={{
                        marginTop: "1.2rem",
                        width: "40%",
                      }}
                    >
                      <td key={i} style={{ padding: "0.2rem" }}>
                        {line}
                      </td>
                    </Table>
                  ))}
              </div>
            </Collapse>
          </>
        )}
      </div>
    );
  }
}

export default Comparator;
