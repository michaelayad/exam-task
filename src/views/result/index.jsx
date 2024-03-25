import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import EssayQuestionsEvaluation from "./essayQuestionEvalution";

const Result = () => {
  const data = useSelector((state) => state?.exam?.data);

  return (
    <>
      <div className="container py-5 px-1 px-md-3 px-lg-5 ">
        <div className="fw-bold text-primary">
          <EssayQuestionsEvaluation />
        </div>
      </div>
    </>
  );
};

export default Result;
