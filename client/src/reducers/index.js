import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import survey from "./survey";

export default combineReducers({
  alert,
  auth,
  profile,
  survey
});
