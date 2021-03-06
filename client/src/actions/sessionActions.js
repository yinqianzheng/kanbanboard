import * as APIUtil from "../utils/session";
import jwt_decode from "jwt-decode";
import {closeModal} from "./modalActions"

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveUserSignIn = currentUser => ({
  type: RECEIVE_USER_SIGN_IN,
  currentUser
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});


export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  APIUtil.setAuthToken(false);
  dispatch(logoutUser());
  dispatch(clearErrors());
};

export const addUser = user => dispatch =>
  APIUtil.addUser(user)
    .then(res => {
      const { success, email } = res.data;
      if(success){
        console.log(email, "new user added");
        dispatch(closeModal());
      }
    })
    .catch(err => {
      dispatch(receiveErrors(err));
    });

export const login = user => dispatch =>
  APIUtil.login(user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
      window.location.hash = "/home";
    })
    .catch(err => {
      dispatch(receiveErrors(err));
    });
