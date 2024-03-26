import Exam from "../views/exam";
import Home from "../views/home";
import Report from "../views/report";
import Result from "../views/result";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/exam",
    element: <Exam />,
  },
  {
    path: "/result",
    element: <Result />,
  },
  {
    path: "/report",
    element: <Report />,
  },
];

export default routes;
