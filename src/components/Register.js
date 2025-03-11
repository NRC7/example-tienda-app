import React, { useRef, useState, useEffect } from "react";

const Register = ({ onRegisterSuccess, onRegisterClose }) => {

  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const verifyPasswordRef = useRef(null);

  const [error, setError] = useState("");
//   const [attempts, setAttempts] = useState(0);
//   const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {

  }, [])

  const handleRegister = async (e) => {
    e.preventDefault();

    const userName = userNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const verifyPassword = verifyPasswordRef.current.value;

    if (!email || !password || !userName || !verifyPassword) {
      setError("Todos los campos son requeridos.");
      return;
    }
    else if (password !== verifyPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const URL = process.env.REACT_APP_BACKEND_REGISTER_URL;

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name: userName, email: email, password: password }),
      });

      if (response.status === 201) {
        // response.json()
        //     .then(data => {
        //         console.log('ok');
        //     })
        onRegisterSuccess();
        alert('Registrado exitosamente')
      } else {
        handleError(response.status);
      }
    } catch (error) {
      setError("Error de conexión, intenta nuevamente.");
    }
  };

  const handleError = (status) => {
    if (status === 400) {
      setError("Faltan campos obligatorios.");
    } else if (status === 401) {
      setError("Usuario no registrado.");
    } else if (status === 402) {
      setError("Contraseña incorrecta.");
    } else if (status === 429) {
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
          <input ref={userNameRef} type="text" placeholder="Nombre de usuario" className="input-field" />
          <input ref={emailRef} type="email" placeholder="Email" className="input-field" />
          <input ref={passwordRef} type="password" placeholder="Contraseña" className="input-field" />
          <input ref={verifyPasswordRef} type="password" placeholder="Repite contraseña" className="input-field" />
          <div style={{display: 'flex', width:'100%', justifyContent:'space-between', margin:'12px 0px', alignItems:'center'}}>
            <button type="submit" className="login-button">
              Registrarse
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
