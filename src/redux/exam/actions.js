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
};

export default actions;
