import React from "reactn";

class Comparator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        Compare
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
            <div>
              {Math.round(
                this.global.result.diffs[this.state.a][this.state.b].percent *
                  100
              )}
              % match
            </div>
            <div>
              {this.global.result.diffs[this.state.a][this.state.b].diff
                .split("\n")
                .map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Comparator;
