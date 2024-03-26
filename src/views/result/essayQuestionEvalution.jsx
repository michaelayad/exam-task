import React, { useState } from "react";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { BsCheckLg } from "react-icons/bs";
import { MdClear } from "react-icons/md";
import { actions as examActions } from "../../redux/exam";

const EssayQuestionsEvaluation = ({ ...props }) => {
  const questions = useSelector((state) => state?.exam?.data?.questions);
  const dispatch = useDispatch();
  const essayQuestions =
    questions
      ?.map((q, ind) => (q.QuesType === "essay" ? ind : null))
      .filter((index) => index !== null) || [];
  const [essayQuestionInd, setEssayQuestionInd] = useState(
    essayQuestions ? 0 : -1
  );
  const handleAnswer = (ind, ans) => {
    dispatch(examActions.evaluateEssayAns(ind, ans));
    if (essayQuestionInd < essayQuestions.length - 1) {
      setEssayQuestionInd(essayQuestionInd + 1);
    } else {
      dispatch(examActions.handleResult());
      dispatch(examActions.setExamStates("complete",""));
      props.onHide();
    }
  };
  return (
    <>
      <div className="w-100">
        <div className="fw-bold text-primary fs-2">
          Essay Questions Evaluation
        </div>
        <div className="w-100 fw-bold text-primary">
          <div className="row card border shadow-sm mb-3">
            <div className="card-header bg-light">
              {questions[essayQuestions[essayQuestionInd]]?.QuesHeadTxt}
            </div>
            <div className="card-body">
              <div>
                {parse(questions[essayQuestions[essayQuestionInd]]?.QuesTxt)}
              </div>
              <div className="py-2">
                <p className="text-primary fw-bold fs-3">Model answer</p>
                <p className="fs-4 border border-2">
                  {questions[essayQuestions[essayQuestionInd]]?.QuesRightAns}
                </p>
              </div>
              <div className="py-2">
                <p className="text-primary fw-bold fs-3">Your answer</p>
                <p className="fs-4 border border-2">
                  {questions[essayQuestions[essayQuestionInd]]?.userAnswer || (
                    <span className="text-secondary fs-5">
                      you didn't answer this question
                    </span>
                  )}
                </p>
              </div>
              <div className="">
                <div className="text-center text-primary fw-bold fs-3">
                  Evaluate your answer
                </div>
                <div className="d-flex justify-content-center text-primary fw-bold fs-3">
                  <button
                    type="button"
                    class="btn btn-success btn-lg mx-2"
                    onClick={() => {
                      handleAnswer(essayQuestions[essayQuestionInd], true);
                    }}
                  >
                    <BsCheckLg size={30} />
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger btn-lg mx-2"
                    onClick={() => {
                      handleAnswer(essayQuestions[essayQuestionInd], false);
                    }}
                  >
                    <MdClear size={30} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EssayQuestionsEvaluation;
