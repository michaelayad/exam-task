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
        <div>{parse(questions[props.questionInd]?.QuesTxt)}</div>
        <div className="py-3">
          <textarea
            placeholder="Enter Your Answer Here"
            value={ans}
            onChange={handleChange}
          ></textarea>{" "}
        </div>
      </div>
    </div>
  );
}

export default EssayQuestion;
