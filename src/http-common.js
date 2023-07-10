import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:7160/",
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});