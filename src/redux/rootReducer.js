import { combineReducers } from "redux";
import { reducer as examReducer } from "./exam";

// Combine all reducers.
const rootReducer = combineReducers({
  exam: examReducer,
});

export default rootReducer;
