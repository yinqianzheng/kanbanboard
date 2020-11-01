import { combineReducers } from "redux";
import session from './sessionReducer';
import errors from './errorsReducer';
import candidates from "./candidateReducer"
import modal from "./modalReducer"

const RootReducer = combineReducers({
  candidates,
  session,
  errors,
  modal
});

export default RootReducer;
