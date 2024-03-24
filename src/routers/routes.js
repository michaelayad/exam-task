import Exam from "../views/exam";
import Home from "../views/home";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/exam",
    element: <Exam />,
  },
];

export default routes;
