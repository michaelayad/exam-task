import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import data from "../../test.json";
import McqQuestion from "../../components/mcqQuestion";
import MaqQuestion from "../../components/maqQuestion";
import EssayQuestion from "../../components/essayQuestion";
const Questions = ({ ...props }) => {
  useEffect(() => {
    // Handle local storage/Redux persistence of collapsed state (optional)
  }, []);
  return (
    <>
      <div className="py-2">
        <div className="fw-bold text-primary">
          {data.questions[props.quesqionInd].QuesType === "mcq" && (
            <McqQuestion />
          )}
          {data.questions[props.quesqionInd].QuesType === "maq" && (
            <MaqQuestion />
          )}
          {data.questions[props.quesqionInd].QuesType === "essay" && (
            <EssayQuestion />
          )}
        </div>
      </div>
    </>
  );
};

export default Questions;
