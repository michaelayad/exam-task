import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import data from "../../test.json";
import { Link, useNavigate } from "react-router-dom";
import Questions from "../../components/questions";
import QuestionsPagination from "../../components/questionsPagination";
import { useSelector } from "react-redux";
const Exam = () => {
  const [questionInd, setQuestionInd] = useState(0);
  const exam = useSelector((state) => state?.exam);
  const navigate = useNavigate();

  useEffect(() => {
    if (exam.examStatus !== "inProgress") navigate("/");
  }, []);
  return (
    <>
      <div className="container py-2 px-3 px-lg-5">
        <div className="fw-bold text-primary">
          {parse(data.metadata.title.split(" - ")[1])}
        </div>
        <Questions questionInd={questionInd} mode="edit" />
        <QuestionsPagination
          questionInd={questionInd}
          onChange={(ind) => setQuestionInd(ind)}
          mode="edit"
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
