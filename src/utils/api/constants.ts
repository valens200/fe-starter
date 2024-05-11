import _ from "axios";

// const backend = "http://127.0.0.1:5173/api/v1";
const backend = "http://localhost:8040/api/v1";

export const api = _.create({
  baseURL: backend,
});

export const authApi = _.create({
  baseURL: backend,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
