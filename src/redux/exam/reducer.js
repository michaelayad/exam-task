import data from "../../test.json";
const INITIAL_STATE = {
  data: data,
};

const examReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_SUBJECT":
      if (action.error) return state;
      return {
        ...state,
        data: action.data,
      };

    default:
      return state;
  }
};

export default examReducer;
