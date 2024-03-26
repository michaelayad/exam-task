import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Questions from "../../components/questions";
import QuestionsPagination from "../../components/questionsPagination";
import { useSelector } from "react-redux";
const Report = () => {
  const [questionInd, setQuestionInd] = useState(0);
  const exam = useSelector((state) => state?.exam);
  const navigate = useNavigate();
  useEffect(() => {
    if (exam.examStatus !== "complete") navigate("/");
  }, []);
  return (
    <>
      <div className="container py-2 px-3 px-lg-5">
        <div className="fw-bold text-primary text-center fs-3">Exam Report</div>
        <Questions questionInd={questionInd} mode="readOnly" />
        <QuestionsPagination
          questionInd={questionInd}
          onChange={(ind) => setQuestionInd(ind)}
          mode="readOnly"
        />
        <div className="py-4 text-center fw-bold text-primary">
          <Link className="btn btn-primary fs-3 px-4" to="/result">
            Back to Result
          </Link>
        </div>
      </div>
    </>
  );
};

export default Report;
