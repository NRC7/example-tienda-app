import React, { useRef, useState, useEffect } from "react";
import { postLogin } from "../services/PrivateServices"
import { useAuth } from "../context/AuthContext";
import { validateEmail, validateInfo } from '../util/ValidateUserInfo'


const Login = ({ onLoginSuccess, onLoginClose }) => {

  const { saveLoginData } = useAuth();

  const emailRef = useRef(null);
  const infoRef = useRef(null);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (isLocked) return;

    if (attempts >= 3) {
        setLoading(false)
        setError("Demasiados intentos. Espera 2 minutos.");
        return;
      }

    const email = emailRef.current.value;
    const info = infoRef.current.value;

    if (!email || !info) {
      setLoading(false)
      setError("Email y contraseña son requeridos.");
      return;
    }

    if (!validateEmail(email)) {
      setLoading(false)
      setError("El email ingresado no es válido.");
      return;
    }

    if (!validateInfo(info)) {
      setLoading(false)
      setError("La contraseña ingresada no es válida.");
      return;
    }

    const loginResponse = await postLogin(email, info)
    if (loginResponse.code === "200") {
      setLoading(false)
      saveLoginData(loginResponse.access_token, loginResponse.data)
      onLoginSuccess();
    }
    else {
      setLoading(false)
      handleError(loginResponse.code);
    }

  };

  const handleError = (status) => {
    if (status === "400") {
      setError("Faltan campos obligatorios.");
    } else if (status === "401") {
      setError("Usuario no registrado.");
    } else if (status === "402") {
      setError("Contraseña incorrecta.");
    } else if (status === "404") {
      setError("Email incorrecto.");
    } else {
      setError("Demasiados intentos. Espera 2 minutos.");
      setIsLocked(true);
      setTimeout(() => {
        setAttempts(0);
        setIsLocked(false);
      }, 1000);
    }
    setAttempts((prev) => prev + 1);
  };


  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Iniciar Sesion</h2>
        <form onSubmit={handleLogin}>
          <input ref={emailRef} type="email" placeholder="Email" className="input-field" />
          <input ref={infoRef} type="password" placeholder="Contraseña" className="input-field" />
          <div style={{display: 'flex', width:'100%', justifyContent:'space-between', margin:'12px 0px', alignItems:'center'}}>
            <button type="submit" disabled={isLocked} className="login-button">
              {loading ? "Procesando..." : isLocked ? "Esperando..." : "Iniciar sesión"}
            </button>
            <button type="button" className="cancel-button" onClick={() => onLoginClose()}>Volver</button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
      <style>
          {`
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .modal-content {
                justify-content: center;
                align-items: center;
                display: flex;
                flex-direction: column;
                background: #f0f0f0;
                padding: 40px 80px;
                border-radius: 5px;
                text-align: center;
            }
            .input-field {
              width: 95%;
              padding: 8px;
              margin: 5px 0;
              border: 1px solid #ccc;
              border-radius: 5px;
              outline: none;
              transition: border-color 0.3s;
            }
            .input-field:focus { border-color: #007bff; }
            .login-button {
              text-align: center;
              width: 40%;
              padding: 10px;
              background-color: #007bff;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              transition: background-color 0.3s;
            }
            .cancel-button {
              opacity: 1;
              text-align: center;
              width: 40%;
              padding: 10px;
              background-color: Red;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              transition: background-color 0.3s;
            }
            .login-button:hover { background-color: #0056b3; }
            .cancel-button:hover { opacity: 0.7; }
            .error-message { color: red; font-size: 14px; margin-top: 5px; }
          `}
        </style>
    </div>
    
  );
};

export default Login;
