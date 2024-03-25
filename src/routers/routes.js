import Exam from "../views/exam";
import Home from "../views/home";
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
];

export default routes;
