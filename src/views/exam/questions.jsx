import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import McqQuestion from "../../components/mcqQuestion";
import MaqQuestion from "../../components/maqQuestion";
import EssayQuestion from "../../components/essayQuestion";
const Questions = ({ ...props }) => {
  const data = useSelector((state) => state?.exam?.data);

  return (
    <>
      <div className="w-100 py-2">
        <div className="w-100 fw-bold text-primary px-2">
          {data.questions.map((q, ind) => (
            <>
              {data.questions[props.questionInd].QuesType === "mcq" &&
                ind === props.questionInd && (
                  <McqQuestion questionInd={props.questionInd} />
                )}
              {data.questions[props.questionInd].QuesType === "maq" &&
                ind === props.questionInd && (
                  <MaqQuestion questionInd={props.questionInd} />
                )}
              {data.questions[props.questionInd].QuesType === "essay" &&
                ind === props.questionInd && (
                  <EssayQuestion questionInd={props.questionInd} />
                )}
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Questions;
