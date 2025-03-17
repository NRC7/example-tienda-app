import React, { useRef, useState, useEffect } from "react";
import { putUser } from "../services/PrivateServices"
import {isAbove18} from "../util/ValidateDateOfBirth"
import { useAuth } from '../context/AuthContext';

const ModifyUserInfoDialog = ({ onUpdateInfoSuccess, onUpdateInfoClose }) => {

    const { authData, saveLoginData } = useAuth();

    let userNameRef = useRef(null);
    let emailRef = useRef(null);
    let addressRef = useRef(null);
    let dateOfBirthRef = useRef(null);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        userNameRef.current.value = authData.user.userName
        emailRef.current.value = authData.user.email
        addressRef.current.value = authData.user.address
        dateOfBirthRef.current.value = authData.user.dateOfBirth
    }, [authData])

    const handleUpdateInfo = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const userName = userNameRef.current.value;
        const email = emailRef.current.value;
        const address = addressRef.current.value;
        const dateOfBirth = dateOfBirthRef.current.value;

        if (!email || !userName || !address || !dateOfBirth) {
            setError("Todos los campos son requeridos.");
            setLoading(false);
            return;
        }
        else if (!isAbove18(dateOfBirth)) {
            setError("Debes tener al menos 18 años para usar esta cuenta.");
            setLoading(false);
            return;
        }

        const UpdateResponse = await putUser(authData.access_token, authData.user._id, userName, email, address, dateOfBirth)
        if (UpdateResponse.code === "201") {
            saveLoginData(authData.access_token, UpdateResponse.data)
            onUpdateInfoSuccess();
            alert('Informacion actualizada exitosamente')
            setLoading(false);
        }
        else {
            handleError(UpdateResponse.code);
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
            <h2>Modificar datos personales</h2>
            <form onSubmit={handleUpdateInfo}>
            <input ref={userNameRef} type="text" placeholder="Nombre y apellido" className="input-field" />
            <input ref={emailRef} type="email" placeholder="Email" className="input-field" />
            <input ref={addressRef} type="text" placeholder="Direccion para envío: Calle n°, Comuna, Region" className="input-field" />
            <input ref={dateOfBirthRef} type="date" placeholder="Fecha de nacimiento, mayor de 18 años" className="input-field" />
            <div style={{display: 'flex', width:'100%', justifyContent:'space-between', margin:'12px 0px', alignItems:'center'}}>
                <button type="submit" className="login-button">
                {(!loading) ? "Modificar" : "Procesando..."}
                </button>
                <button type="button" className="cancel-button" onClick={() => onUpdateInfoClose()}>Volver</button>
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

export default ModifyUserInfoDialog;
