import React, { useRef, useState, useEffect } from "react";
import { postRegister } from "../services/PrivateServices"
import { validateEmail, isAbove18, validateInfo } from '../util/ValidateUserInfo'

const Register = ({ onRegisterSuccess, onRegisterClose }) => {

  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const addressRef = useRef(null);
  const dateOfBirthRef = useRef(null);
  const infoRef = useRef(null);
  const verifyInfoRef = useRef(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

  }, [])

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const userName = userNameRef.current.value;
    const email = emailRef.current.value;
    const address = addressRef.current.value;
    const dateOfBirth = dateOfBirthRef.current.value;
    const info = infoRef.current.value;
    const verifyInfo = verifyInfoRef.current.value;

    if (!email || !info || !userName || !address || !dateOfBirth || !verifyInfo) {
      setError("Todos los campos son requeridos.");
      setLoading(false);
      return;
    }
    
    if (!isAbove18(dateOfBirth)) {
      setError("Debes tener al menos 18 años para registrarte.");
      setLoading(false);
      return;
    }

    if (!validateInfo(info)) {
      setError("La contraseña ingresada no es válida");
      setLoading(false);
      return;
    }
    
    if (info !== verifyInfo) {
      setError("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("El email ingresado no es válido.");
      setLoading(false);
      return;
    }

    const registerResponse = await postRegister(userName, email, address, dateOfBirth, info)
    if (registerResponse.code === "201") {
      onRegisterSuccess();
      alert('Registrado exitosamente')
      setLoading(false);
    }
    else {
      handleError(registerResponse.code);
      setLoading(false);
    }
  };

  const handleError = (status) => {
    if (status === "400") {
      setError("Faltan campos obligatorios.");
    } else if (status === "406") {
      setError("Email ya existe.");
    } else if (status === "429") {
      setError("Demasiados intentos. Espera 2 minutos.");
    }
    else {
      setError(`Error inesperado intenta nuevamente más tarde. (${status})`);
    }
  };


  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Crea tu cuenta</h2>
        <form onSubmit={handleRegister}>
          <input ref={userNameRef} type="text" placeholder="Nombre y apellido" className="input-field" />
          <input ref={emailRef} type="email" placeholder="Email" className="input-field" />
          <input ref={addressRef} type="text" placeholder="Direccion para envío: Calle n°, Comuna, Region" className="input-field" />
          <input ref={dateOfBirthRef} type="date" placeholder="Fecha de nacimiento" className="input-field" />
          <input ref={infoRef} type="password" placeholder="Contraseña" className="input-field" />
          <span>Mínimo 8 caracteres, al menos una letra minúscula, al menos una letra mayúscula, al menos un número, no permite caracteres especiales</span>
          <input ref={verifyInfoRef} type="password" placeholder="Repite contraseña" className="input-field" />
          <div style={{display: 'flex', width:'100%', justifyContent:'space-between', margin:'12px 0px', alignItems:'center'}}>
            <button type="submit" className="login-button">
              {(!loading) ? "Registrarse" : "Procesando..."}
            </button>
            <button type="button" className="cancel-button" onClick={() => onRegisterClose()}>Volver</button>
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

export default Register;
