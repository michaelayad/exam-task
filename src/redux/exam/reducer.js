import { produce } from "immer";
import data from "../../test.json";
const INITIAL_STATE = {
  data: data,
};

const examReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER_ANS":
      if (action.error) return state;
      try {
        return produce(state, (draft) => {
          let questionToUpdate = draft.data.questions[action.data.ind];
          questionToUpdate.userAnswer = action.data.ans;
          questionToUpdate.Answer = (action.data.ans && true) || false;
        });
      } catch (error) {
        console.error("Error updating user answer:", error);
        return state; // Return state as-is if an error occurs during update
      }

    default:
      return state;
  }
};

export default examReducer;
