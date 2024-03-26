import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { actions as examActions } from "../../redux/exam";

function EssayQuestion({ ...props }) {
  const questions = useSelector((state) => state?.exam?.data?.questions);
  const dispatch = useDispatch();
  const [ans, setAns] = useState(
    questions[props.questionInd]?.userAnswer || ""
  );
  const [ansHlp, setAnsHlp] = useState(
    questions[props.questionInd]?.userAnswer || false
  );
  useEffect(() => {
    if (ansHlp) dispatch(examActions.setUserAns(props.questionInd, ans));
  }, [ans]);
  const handleChange = (event) => {
    setAnsHlp(true);
    setAns(event.target.value);
  };
  return (
    <div className="row card border shadow-sm mb-3">
      <div className="card-header bg-light">
        {questions[props.questionInd]?.QuesHeadTxt}
      </div>
      <div className="card-body">
        <div style={{ maxWidth: "100%" }}>
          {parse(questions[props.questionInd]?.QuesTxt)}
        </div>
        <div className="py-3">
          {props.mode === "edit" ? (
            <textarea
              placeholder="Enter Your Answer Here"
              value={ans}
              onChange={handleChange}
            ></textarea>
          ) : (
            <div>
              <div className="py-2">
                <p className="text-primary fw-bold fs-3">Model answer</p>
                <p className="fs-4 border border-2">
                  {questions[props.questionInd]?.QuesRightAns}
                </p>
              </div>
              <div className="py-2">
                <p className="text-primary fw-bold fs-3">Your answer</p>
                <p className="fs-4 border border-2">
                  {questions[props.questionInd]?.userAnswer || (
                    <span className="text-secondary fs-5">
                      you didn't answer this question
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EssayQuestion;
