import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { actions as examActions } from "../../redux/exam";

function McqQuestion({ ...props }) {
  const questions = useSelector((state) => state?.exam?.data?.questions);
  const dispatch = useDispatch();
  const [ans, setAns] = useState(
    questions[props.questionInd]?.userAnswer || ""
  );
  useEffect(() => {
    if (ans) dispatch(examActions.setUserAns(props.questionInd, ans));
  }, [ans]);

  const getElementClasses = (answer) => {
    if (answer?.buttons?.point === questions[props.questionInd].QuesRightAns)
      return "border border-1 text-white bg-success rounded-circle mb-2 px-2";
    else {
      if (
        questions[props.questionInd].userAnswer === answer?.buttons?.point &&
        questions[props.questionInd].userAnswer ===
          questions[props.questionInd].QuesRightAns
      )
        return "border border-1 text-white bg-success rounded-circle mb-2 px-2";
      else if (
        questions[props.questionInd].userAnswer === answer?.buttons?.point &&
        questions[props.questionInd].userAnswer !==
          questions[props.questionInd].QuesRightAns
      )
        return "border border-1 text-white bg-danger rounded-circle mb-2 px-2";
      else
        return "border border-1 text-primary bg-white rounded-circle mb-2 px-2";
    }
  };
  return (
    <div className="row card border shadow-sm mb-3">
      <div className="card-header bg-light">
        {questions[props.questionInd]?.QuesHeadTxt}
      </div>
      <div className="card-body">
        <div>{parse(questions[props.questionInd]?.QuesTxt)}</div>
        <div>
          {questions[props.questionInd]?.QuesAns?.map((answer, ind) => {
            return props.mode === "edit" ? (
              <div className="row gx-1 justify-content-start" key={ind}>
                <div className="col-auto">
                  <button
                    type="button"
                    className={`btn border border-1 ${
                      ans === answer?.buttons?.point && "btn-primary"
                    } btn-sm rounded-full mx-2 ${
                      ans !== answer?.buttons?.point && "text-primary bg-white"
                    }`}
                    onClick={() => {
                      setAns(answer?.buttons?.point);
                    }}
                  >
                    {answer?.buttons?.point}
                  </button>
                </div>
                <div
                  className="col-auto"
                  onClick={() => {
                    setAns(answer?.buttons?.point);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {parse(answer.txt)}
                </div>
              </div>
            ) : (
              <div className="row gx-1 justify-content-start" key={ind}>
                <div className="col-auto">
                  <div className={getElementClasses(answer)}>
                    {" "}
                    {answer?.buttons?.point}
                  </div>
                </div>
                <div className="col-auto">{parse(answer.txt)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default McqQuestion;
