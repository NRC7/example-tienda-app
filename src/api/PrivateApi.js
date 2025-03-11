import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
const PUBLIC_TIMEOUT = process.env.REACT_APP_PUBLIC_TIMEOUT
const REJECT_UNAUTHORIZED = process.env.REACT_APP_REJECT_UNAUTHORIZED;

const PrivateApi = axios.create({
    baseURL: API_BASE_URL,
    timeout: PUBLIC_TIMEOUT,
    headers: { "Content-Type": "application/json" },
    withCredentials: false, // Permite enviar cookies si el backend lo necesita
    httpsAgent: new (require('https')).Agent({  
        rejectUnauthorized: REJECT_UNAUTHORIZED  // Deshabilita la verificación de certificados (solo en desarrollo)
      }),
});

export default PrivateApi;