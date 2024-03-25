import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import data from "../../test.json";
import Questions from "./questions";
import QuestionsPagination from "./questionsPagination";
import { Link } from "react-router-dom";
const Exam = () => {
  const [questionInd, setQuestionInd] = useState(0);
  useEffect(() => {
    // Handle local storage/Redux persistence of collapsed state (optional)
  }, []);
  return (
    <>
      <div className="container py-2 px-3 px-lg-5">
        <div className="fw-bold text-primary">
          {parse(data.metadata.title.split(" - ")[1])}
        </div>
        <Questions questionInd={questionInd} />
        <QuestionsPagination
          questionInd={questionInd}
          onChange={(ind) => setQuestionInd(ind)}
        />
        <div className="py-4 text-center fw-bold text-primary">
          <Link className="btn btn-primary fs-3 px-4" to="/result">
            submit
          </Link>
        </div>
      </div>
    </>
  );
};

export default Exam;
