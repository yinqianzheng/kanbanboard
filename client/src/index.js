import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./components/root";
import jwt_decode from "jwt-decode";
import configureStore from "./store/store";
import { setAuthToken } from "./utils/session";
import { logout } from "./actions/sessionActions";

document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (localStorage.jwtToken) {
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      store = configureStore({});
      store.dispatch(logout());
      window.location.hash = "/";
    } else {
      setAuthToken(localStorage.jwtToken);
      const preloadedState = {
        session: { isAuthenticated: true, user: decodedUser }
      };
      store = configureStore(preloadedState);
    }
  } else {
    store = configureStore({});
  }
  window.s = store;
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});

