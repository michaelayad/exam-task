import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { actions as examActions } from "../../redux/exam";

function MaqQuestion({ ...props }) {
  const questions = useSelector((state) => state?.exam?.data?.questions);
  const dispatch = useDispatch();
  const [ans, setAns] = useState(
    questions[props.questionInd]?.userAnswer ||
      Array(questions[props.questionInd]?.QuesAns?.length).fill(false)
  );
  const [firstAndSecAns, setFirstAndSecAns] = useState([-1, -1]);
  useEffect(() => {
    if (ans.indexOf(true) !== -1)
      dispatch(examActions.setUserAns(props.questionInd, ans));
  }, [ans]);

  const handleAnswerClick = (ind) => {
    if (ans.filter((a) => a).length === 2 && !ans[ind]) {
      let arr = [...ans];
      arr[firstAndSecAns[0]] = false;
      arr[ind] = true;
      setFirstAndSecAns([firstAndSecAns[1], ind]);
      setAns(arr);
    } else if (ans.filter((a) => a).length !== 2 && !ans[ind]) {
      setFirstAndSecAns([
        firstAndSecAns[0] === -1 ? ind : firstAndSecAns[0],
        firstAndSecAns[0] === -1 ? -1 : ind,
      ]);
      setAns([...ans.slice(0, ind), true, ...ans.slice(ind + 1)]);
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
          {questions[props.questionInd]?.QuesAns?.map((answer, ind) => (
            <div className="row gx-1 justify-content-start" key={ind}>
              <div className="col-auto">
                <button
                  type="button"
                  className={`btn border border-1 ${
                    ans[ind] && "btn-primary"
                  } btn-sm rounded-full mx-2 ${
                    !ans[ind] && "text-primary bg-white"
                  }`}
                  onClick={() => {
                    handleAnswerClick(ind);
                  }}
                >
                  {answer?.buttons?.point}
                </button>
              </div>
              <div
                className="col"
                onClick={() => {
                  handleAnswerClick(ind);
                }}
                style={{ cursor: "pointer" }}
              >
                {parse(answer.txt)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MaqQuestion;
