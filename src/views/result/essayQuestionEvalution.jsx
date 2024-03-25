import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const EssayQuestionsEvaluation = ({ ...props }) => {
  const questions = useSelector((state) => state?.exam?.data?.questions);
  const essayQuestions =
    questions
      ?.map((q, ind) => (q.QuesType === "essay" ? ind : null))
      .filter((index) => index !== null) || [];
  const [questionInd, setQuestionInd] = useState(essayQuestions[0] || -1);

  return (
    <>
      <div className="w-100">
        <div className="fw-bold text-primary fs-2">
          Essay Question Evaluation
        </div>
        <div className="w-100 fw-bold text-primary">
          <div className="row card border shadow-sm mb-3">
            <div className="card-header bg-light">
              {questions[questionInd]?.QuesHeadTxt}
            </div>
            <div className="card-body">
              <div>{parse(questions[questionInd]?.QuesTxt)}</div>
              <div className="py-2">
                <p className="text-primary fw-bold fs-3">Model answer</p>
                <p className="fs-4 border border-2">
                  {questions[questionInd]?.QuesRightAns}
                </p>
              </div>
              <div className="py-2">
                <p className="text-primary fw-bold fs-3">Your answer</p>
                <p className="fs-4 border border-2">
                  {questions[questionInd]?.userAnswer || (
                    <span className="text-secondary fs-5">
                      you didn't answer this question
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default EssayQuestionsEvaluation;
