import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const Home = () => {
  const data = useSelector((state) => state?.exam?.data);
  useEffect(() => {
    // Handle local storage/Redux persistence of collapsed state (optional)
  }, []);

  return (
    <>
      <div className="container py-5 px-1 px-md-3 px-lg-5 ">
        <div className="text-center fw-bold text-primary">
          {parse(data?.metadata?.title?.split(" - ")[1])}
        </div>
        <div className="text-center fw-bold text-primary">
          <Link className="btn btn-primary fs-3" to="/exam">
            Start
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
