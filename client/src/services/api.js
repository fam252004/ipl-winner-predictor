import axios from "axios";

const api = axios.create({
  baseURL: "https://ipl-winner-predictor-gqf9.onrender.com",
});

export default api;