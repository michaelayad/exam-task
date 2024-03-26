import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BsCheck, BsX } from "react-icons/bs";

const QuestionsPagination = ({ ...props }) => {
  const questions = useSelector((state) => state?.exam?.data?.questions);

  const buttonClasses = (q, ind) => {
    if (props.mode === "edit") {
      return `btn position-relative ${
        ind === props.questionInd ? "btn-primary" : "btn-outline-primary"
      } px-5`;
    } else {
      if (!q.Answer) {
        return `btn position-relative btn-dark px-5`;
      } else {
        if (q.QuesType === "mcq") {
          return q.userAnswer === q.QuesRightAns
            ? `btn position-relative btn-success px-5`
            : `btn position-relative btn-danger px-5`;
        } else if (q.QuesType === "maq") {
          let a = 0;
          q.userAnswer &&
            q.userAnswer?.forEach((ans, ind) => {
              if (ans && q.QuesRightAns[ind] === "true") a++;
            });
          return a === 0
            ? `btn position-relative btn-danger px-5`
            : `btn position-relative btn-success px-5`;
        } else {
          return q.userRightAns
            ? `btn position-relative btn-success px-5`
            : `btn position-relative btn-danger px-5`;
        }
      }
    }
  };

  const getBadgeContent = (q) => {
    if (props.mode === "edit" || !q.Answer) return null;
    if (q.QuesType === "mcq") {
      return q.userAnswer === q.QuesRightAns ? (
        <BsCheck size={18} color="green" />
      ) : (
        <BsX size={18} color="red" />
      );
    } else if (q.QuesType === "maq") {
      let a = 0;
      q.userAnswer &&
        q.userAnswer?.forEach((ans, ind) => {
          if (ans && q.QuesRightAns[ind] === "true") a++;
        });
      return a === 0 ? (
        <BsX size={18} color="red" />
      ) : a === 1 ? (
        <BsCheck size={18} color="black" />
      ) : (
        <BsCheck size={18} color="green" />
      );
    } else {
      return q.userRightAns ? (
        <BsCheck size={18} color="green" />
      ) : (
        <BsX size={18} color="red" />
      );
    }
  };
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
            <div
              className={`col-auto  ${
                ind === props.questionInd && "border border-primary rounded-1"
              }  p-1 m-1`}
              key={ind}
            >
              <button
                className={`${buttonClasses(q, ind)}`}
                onClick={() => {
                  props.onChange(ind);
                }}
              >
                {ind + 1}
                {getBadgeContent(q) && (
                  <span className="ms-2 badge bg-light rounded-pill position-absolute top-0 ">
                    {getBadgeContent(q)}
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuestionsPagination;
