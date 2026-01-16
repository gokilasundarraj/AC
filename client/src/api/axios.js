import axios from "axios";

const API = axios.create({
  baseURL: "https://ac-klmv.onrender.com/api",
});

export default API;