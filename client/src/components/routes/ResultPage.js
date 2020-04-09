import React from "reactn";
import Container from "@material-ui/core/Container";

import SequenceResult from "../SequenceResult";

import "../../styles/resultPage.css";

const ResultPage = () => {
  return (
    <div className="results">
      <Container maxWidth="lg">
        <SequenceResult type={"sequence"} />
        <SequenceResult type={"dssp"} />
        <SequenceResult type={"psea"} />
        <SequenceResult type={"mmtf"} />
      </Container>
    </div>
  );
};

export default ResultPage;
