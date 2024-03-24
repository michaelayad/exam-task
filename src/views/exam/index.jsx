import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import data from "../../test.json";
import Questions from "./questions";
import QuestionsPagination from "./questionsPagination";
const Exam = () => {
  const [quesqionInd, setQuesqionInd] = useState(0);
  useEffect(() => {
    // Handle local storage/Redux persistence of collapsed state (optional)
  }, []);
  return (
    <>
      <div className="container py-2 px-1 px-md-3 px-lg-5">
        <div className="fw-bold text-primary">
          {parse(data.metadata.title.split(" - ")[1])}
        </div>
        <Questions quesqionInd={quesqionInd} />
        <QuestionsPagination />
      </div>
    </>
  );
};

export default Exam;
