import { produce } from "immer";
import jsondata from "../../test.json";

const examSt_ = localStorage.getItem("examStatus");
const examSt = examSt_ === "null" ? "new" : examSt_;

const handleStateData = () => {
  let stateData = { ...jsondata };
  const userAns_ = localStorage.getItem("userAns");
  const userEssay_ = localStorage.getItem("userEssay");
  const userResult_ = localStorage.getItem("userResult");
  const userAns = JSON.parse(userAns_ === "null" ? {} : userAns_);
  const userEssay = JSON.parse(userEssay_ === "null" ? {} : userEssay_);
  const userResult = JSON.parse(userResult_ === "null" ? {} : userResult_);

  stateData.questions.forEach((q, ind) => {
    if (q.QuesType === "mcq") {
      stateData.questions[ind].userAnswer =
        (userAns && userAns[ind] && userAns[ind]["ans"]) || "";
      stateData.questions[ind].Answer =
        (userAns && userAns[ind] && userAns[ind]["ansStatus"]) || false;
    } else if (q.QuesType === "maq") {
      if (userAns && userAns[ind]) {
        const nUserAns = userAns[ind]["ans"]?.map((an, ind) => {
          if (an) return true;
          return false;
        });
        stateData.questions[ind].userAnswer = nUserAns || "";
        stateData.questions[ind].Answer = userAns[ind]["ansStatus"] || false;
      }
    } else {
      stateData.questions[ind].userAnswer =
        (userAns && userAns[ind] && userAns[ind]["ans"]) || "";
      stateData.questions[ind].Answer =
        (userAns && userAns[ind] && userAns[ind]["ansStatus"]) || false;
      if (userEssay && userEssay[ind] && userEssay[ind]) {
        stateData.questions[ind]["userRightAns"] = true;
      } else if (userEssay && userEssay[ind] && !userEssay[ind]) {
        stateData.questions[ind]["userRightAns"] = false;
      }
    }
  });
  if (userResult) {
    stateData.metadata["userGrade"] = parseInt(userResult["grade"]);
    stateData.metadata["fullGrade"] = parseInt(userResult["fullGrade"]);
  }
  return stateData;
};
const INITIAL_STATE = {
  data: handleStateData(),
  examStatus: examSt,
};

const examReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER_ANS":
      if (action.error) return state;
      try {
        let userAns = JSON.parse(localStorage.getItem("userAns")) || {};
        userAns[action.data.ind] = {
          ans: action.data.ans,
          ansStatus: (action.data.ans && true) || false,
        };
        localStorage.setItem("userAns", JSON.stringify(userAns));
        return produce(state, (draft) => {
          let questionToUpdate = draft.data.questions[action.data.ind];
          questionToUpdate.userAnswer = action.data.ans;
          questionToUpdate.Answer = (action.data.ans && true) || false;
        });
      } catch (error) {
        console.error("Error updating user answer:", error);
        return state;
      }
    case "EVALUATE_ESSAY_ANS":
      if (action.error) return state;
      try {
        let userEssayAns = JSON.parse(localStorage.getItem("userEssay")) || {};
        userEssayAns[action.data.ind] = action.data.ans;
        localStorage.setItem("userEssay", JSON.stringify(userEssayAns));
        return produce(state, (draft) => {
          let questionToUpdate = draft.data.questions[action.data.ind];
          questionToUpdate["userRightAns"] = action.data.ans;
        });
      } catch (error) {
        console.error("Error updating user answer:", error);
        return state; // Return state as-is if an error occurs during update
      }
    case "HANDLE_RESULT":
      if (action.error) return state;
      try {
        let grade = 0,
          fullGrade = 0;
        state.data.questions.forEach((q) => {
          if (q.QuesType === "maq") {
            q.QuesRightAns.forEach((ans, ind) => {
              fullGrade += ans === "true" ? q.QuesScore : 0;
            });
            q.userAnswer &&
              q.userAnswer?.forEach((ans, ind) => {
                grade +=
                  q.QuesRightAns[ind] === "true" && ans ? q.QuesScore : 0;
              });
          } else if (q.QuesType === "mcq") {
            grade += q.userAnswer === q.QuesRightAns ? q.QuesScore : 0;
            fullGrade += q.QuesScore;
          } else {
            grade += q.userRightAns ? q.QuesScore : 0;
            fullGrade += q.QuesScore;
          }
        });
        let userResult = { fullGrade, grade };
        localStorage.setItem("userResult", JSON.stringify(userResult));
        return produce(state, (draft) => {
          let metadata = draft.data.metadata;
          metadata["fullGrade"] = fullGrade;
          metadata["userGrade"] = grade;
        });
      } catch (error) {
        console.error("Error updating user answer:", error);
        return state; // Return state as-is if an error occurs during update
      }
    case "SET_EXAM_STATUS":
      if (action.error) return state;
      try {
        if (action.data.status === "new") {
          localStorage.setItem("examStatus", "inProgress");
          localStorage.removeItem("userAns");
          localStorage.removeItem("userEssay");
          localStorage.removeItem("userResult");
          console.log("sss", action.data.status);
          return {
            ...state,
            data: action.data.data,
            examStatus: "inProgress",
          };
        }
        localStorage.setItem("examStatus", action.data.status);
        return { ...state, examStatus: action.data.status };
      } catch (error) {
        console.error("Error updating user answer:", error);
        return state;
      }
    default:
      return state;
  }
};

export default examReducer;
