import { combineReducers } from "redux";
import session from './sessionReducer';
import errors from './errorsReducer';
import candidates from "./candidateReducer"

const RootReducer = combineReducers({
  candidates,
  session,
  errors
});

export default RootReducer;
