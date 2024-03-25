import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const QuestionsPagination = ({ ...props }) => {
  const questions = useSelector((state) => state?.exam?.data?.questions);

  return (
    <>
      <div className="row  py-2">
        <div className="col-12 d-flex justify-content-between py-2">
          <button
            className="btn btn-outline-primary px-5"
            disabled={props.questionInd === 0}
            onClick={() => {
              props.onChange(props.questionInd - 1);
            }}
          >
            prev
          </button>
          <button
            className="btn btn-outline-primary px-5"
            disabled={props.questionInd === questions.length - 1}
            onClick={() => {
              props.onChange(props.questionInd + 1);
            }}
          >
            next
          </button>
        </div>
        <div className="col-12 row g-1 justify-content-center ">
          {questions?.map((q, ind) => (
            <div className="col-auto" key={ind}>
              <button
                className={`btn ${
                  ind === props.questionInd
                    ? "btn-primary"
                    : q.Answer
                    ? "btn-secondary"
                    : "btn-outline-primary"
                }   px-5`}
                onClick={() => {
                  props.onChange(ind);
                }}
              >
                {ind + 1}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuestionsPagination;
