import React, { useState, useEffect } from "react";
import { postLogout } from "../services/PrivateServices"
import { useAuth } from "../context/AuthContext";


const Logout = ({ onLogoutSuccess, onLogoutClose }) => {

  const { saveLogoutData, authData } = useAuth();

  const [error, setError] = useState("");

  useEffect(() => {

  }, [])

  const handleLogout = async (e) => {
    e.preventDefault();

    const _user = authData.user;
    const _access_token = authData.access_token;

    const logoutResponse = await postLogout(_access_token, _user)
    if (logoutResponse.code === "200") {
      saveLogoutData()
      onLogoutSuccess();
    }
    else {
      setError(logoutResponse.message)
    }

  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Cerrar Sesion</h2>
          <div style={{display: 'flex', width:'100%', justifyContent:'space-between', margin:'12px 0px', alignItems:'center'}}>
            <button type="button" className="logout-button" onClick={(e) => handleLogout(e)}>Si</button>
            <button type="button" className="cancel-button" onClick={() => onLogoutClose()}>Volver</button>
          </div>
          {error && <p className="error-message">{error}</p>}
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
            .logout-button {
              text-align: center;
              width: 45%;
              padding: 10px;
              background-color: green;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              transition: background-color 0.3s;
            }
            .cancel-button {
              opacity: 1;
              text-align: center;
              width: 45%;
              padding: 10px;
              background-color: Red;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              transition: background-color 0.3s;
            }
            .login-button:hover { opacity: 0.7; }
            .cancel-button:hover { opacity: 0.7; }
            .error-message { color: red; font-size: 14px; margin-top: 5px; }
          `}
        </style>
    </div>
    
  );
};

export default Logout;
