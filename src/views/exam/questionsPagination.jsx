import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import data from "../../test.json";
const QuestionsPagination = ({ ...props }) => {
  useEffect(() => {
    // Handle local storage/Redux persistence of collapsed state (optional)
  }, []);
  return (
    <>
      <div className="py-2">
        <div className="fw-bold text-primary">
          {parse(data.metadata.title.split(" - ")[1])}
        </div>
      </div>
    </>
  );
};

export default QuestionsPagination;
