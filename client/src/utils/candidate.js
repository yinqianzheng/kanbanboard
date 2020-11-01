import axios from "axios";

export const addCandidate = candidateData => {
  return axios.post("/candidates/add", candidateData);
};

export const fetchCandidates = () => {
  return axios.get("/candidates/fetch");
}

export const updateCandidate = (id, candidateInfo) => {
  return axios.post(`/candidates/update/${id}`, candidateInfo);
};