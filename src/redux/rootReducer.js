import { combineReducers } from "redux";
import { reducer as examReducer } from "./exam";
import { reducer as userDataReducer } from "./userData";

// Combine all reducers.
const rootReducer = combineReducers({
  exam: examReducer,
  userData: userDataReducer,
});

export default rootReducer;
