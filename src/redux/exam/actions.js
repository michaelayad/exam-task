/* eslint-disable no-undef */
const actions = {
  setUserAns: (ind, ans) => {
    return (dispatch) => {
      dispatch({
        type: "SET_USER_ANS",
        data: { ind, ans },
      });
    };
  },
  setExamStates: (status, data) => {
    return (dispatch) => {
      dispatch({
        type: "SET_EXAM_STATUS",
        data: { data, status },
      });
    };
  },
  evaluateEssayAns: (ind, ans) => {
    return (dispatch) => {
      dispatch({
        type: "EVALUATE_ESSAY_ANS",
        data: { ind, ans },
      });
    };
  },
  handleResult: () => {
    return (dispatch) => {
      dispatch({
        type: "HANDLE_RESULT",
      });
    };
  },
};

export default actions;
