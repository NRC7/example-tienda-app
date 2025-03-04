import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
const PUBLIC_TIMEOUT = process.env.REACT_APP_PUBLIC_TIMEOUT

// Axios sin autenticación
const publicApi = axios.create({
    baseURL: API_BASE_URL,
    timeout: PUBLIC_TIMEOUT,
    headers: { "Content-Type": "application/json" },
    withCredentials: false, // Permite enviar cookies si el backend lo necesita
});

export default publicApi;
