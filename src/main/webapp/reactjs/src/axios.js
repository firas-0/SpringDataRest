import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  auth: { username: "user", password: "1a87056e-17e1-452b-9350-f16a6e3b20f5" }
});

export default api;

