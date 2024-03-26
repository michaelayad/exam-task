import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { actions as examActions } from "../../redux/exam";
import jsonData from "../../test.json";

const ResultComponent = ({ ...props }) => {
  const metadata = useSelector((state) => state?.exam?.data?.metadata);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (status, route) => {
    dispatch(
      examActions.setExamStates(status, status === "new" ? jsonData : "")
    );
    navigate(route);
  };
  return (
    <>
      <div className="w-100">
        <div className="fw-bold text-center text-primary fs-2 mb-3">
          Exam Result
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div
            className="bg-secondary rounded-circle px-5 py-5 shadow-sm d-flex flex-column justify-content-center align-items-center"
            style={{ minWidth: 300 }}
          >
            <p className="fw-bold mb-0 fs-4 text-primary">Your Grade :</p>
            <p className="text-white fs-3">{metadata.userGrade || ""}</p>
            <div className="w-100">
              <hr className="w-100 border border-3 border-dark" />
            </div>
            <p className="fw-bold mb-0 fs-4 text-primary">Full Grade :</p>
            <p className="text-white fs-3">{metadata.fullGrade || ""}</p>
          </div>
        </div>
        <div className="row justify-content-center gx-2 my-3">
          <div className="col-auto">
            <Link className={`btn btn-primary fw-bold px-5`} to="/report">
              Exam Report
            </Link>
          </div>
          <div className="col-auto">
            <button
              className={`btn btn-outline-primary fw-bold px-5`}
              onClick={() => {
                handleClick("new", "/exam");
              }}
            >
              Retake exam
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultComponent;
