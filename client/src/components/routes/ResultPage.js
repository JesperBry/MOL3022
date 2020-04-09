import React from "reactn";
import SequenceResult from "../SequenceResult";

const testPage = () => {
  return <div>
    <SequenceResult type={"dssp"}/>
    <SequenceResult type={"psea"}/>
    <SequenceResult type={"mmtf"}/>
  </div>;
};

export default testPage;
