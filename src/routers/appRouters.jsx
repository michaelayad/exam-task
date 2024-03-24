import { Route, Routes } from "react-router-dom";
import routes from "./routes";

const AppRouters = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        return (
          <Route key={index} element={route.layout && route.layout}>
            <Route path={route.path} element={route.element} />
          </Route>
        );
      })}
    </Routes>
  );
};
export default AppRouters;
