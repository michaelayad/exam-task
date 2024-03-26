import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import EssayQuestionsEvaluation from "./essayQuestionEvalution";
import ResultComponent from "./resultComponent";
import { actions as examActions } from "../../redux/exam";

const Result = () => {
  const exam = useSelector((state) => state?.exam);
  const [showEvaluation, setShowEvaluation] = useState(
    exam.examStatus === "inProgress" ? true : false
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (exam.examStatus === "new") navigate("/");
  }, []);
  
  return (
    <>
      <div className="container py-5 px-1 px-md-3 px-lg-5 ">
        <div className="fw-bold text-primary">
          {showEvaluation && (
            <EssayQuestionsEvaluation onHide={() => setShowEvaluation(false)} />
          )}
          {!showEvaluation && <ResultComponent />}
        </div>
      </div>
    </>
  );
};

export default Result;
