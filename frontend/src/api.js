import axios from "axios";

const API = axios.create({
  baseURL: "https://purchase-bill-inventory-system-5.onrender.com/api"
});

export default API;
