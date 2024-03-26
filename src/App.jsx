import { BrowserRouter } from "react-router-dom";
import AppRouters from "./routers/appRouters";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRouters />
      </BrowserRouter>
    </>
  );
}

export default App;
