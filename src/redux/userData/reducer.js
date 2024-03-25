import data from "../../test.json";
const INITIAL_STATE = {
  quesInd: 0,
};

const userDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_QUES_IND":
      if (action.error) return state;
      return {
        ...state,
        quesInd: action.data,
      };

    default:
      return state;
  }
};

export default userDataReducer;
