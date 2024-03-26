import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { actions as examActions } from "../../redux/exam";
import jsonData from "../../test.json";

const Home = () => {
  const exam = useSelector((state) => state?.exam);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (status, route) => {
    dispatch(
      examActions.setExamStates(status, status === "new" ? jsonData : "")
    );
    navigate(route);
  };
  return (
    <>
      <div className="container py-5 px-1 px-md-3 px-lg-5 ">
        <div className="text-center fw-bold text-primary">
          {parse(exam.data?.metadata?.title?.split(" - ")[1])}
        </div>
        <div className="text-center fw-bold text-primary pb-4">
          <button
            className="btn btn-primary fs-3"
            onClick={() => {
              handleClick("new", "/exam");
            }}
          >
            Start New Exam
          </button>
        </div>
        {exam.examStatus === "inProgress" && (
          <div className="text-center fw-bold text-primary">
            <button
              className="btn btn-outline-primary fs-3"
              onClick={() => {
                handleClick("inProgress", "/exam");
              }}
            >
              continue your exam
            </button>
          </div>
        )}
        {exam.examStatus === "complete" && (
          <div className="text-center fw-bold text-primary">
            <button
              className="btn btn-outline-primary fs-3"
              onClick={() => {
                handleClick("complete", "/result");
              }}
            >
              show result and report
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
