import tokenReducer from "./authToken";
import emailReducer from "./authEmail";
import { combineReducers } from "redux";
const allReducers = combineReducers({
  tokenReducer,
  emailReducer,
});

export default allReducers;
