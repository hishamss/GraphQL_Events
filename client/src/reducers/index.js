import tokenReducer from "./authToken";
import { combineReducers } from "redux";
const allReducers = combineReducers({
  tokenReducer,
});

export default allReducers;
