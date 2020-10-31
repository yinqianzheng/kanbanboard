import axios from "axios";

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const addUser = userData => {
  return axios.post("/users/addUser", userData);
};

export const login = userData => {
  return axios.post("/users/login", userData);
};