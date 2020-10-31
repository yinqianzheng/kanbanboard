import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/root";
import thunk from "redux-thunk";

const middlewares = [thunk];

const configureStore = (preloadedState = {}) =>
  createStore(rootReducer, preloadedState, applyMiddleware(...middlewares));

export default configureStore;
