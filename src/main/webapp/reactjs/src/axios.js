// src/axios.js
import axios from "axios";

// Build the Basic auth header ONCE (must match your application.properties)
const USER = "user";
const PASS = "pass";
const BASIC = "Basic " + btoa(`${USER}:${PASS}`);

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // ok with our CORS config; harmless for Basic
});

// Ensure every request carries the Authorization header
api.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  config.headers["Authorization"] = BASIC;
  return config;
});

export default api;

