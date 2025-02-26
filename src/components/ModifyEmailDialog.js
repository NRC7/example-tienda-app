import {validateEmail} from '../util/ValidateEmail'
import { useState } from "react";

const ModifyEmailDialog = ({ isOpen, onClose, email, setEmail }) => {

  const [oldEmail] = useState(email);

    if (!isOpen) return null;

    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Modificar Email</h2>
          <input
            type="email"
            maxLength={50}
            value={email}
            onChange={(e) =>  setEmail(e.target.value)}
          />
          <div style={{display: 'flex', width:'100%', justifyContent:'space-between'}}>
            <button className="cancel-btn" onClick={() => 
              {setEmail(oldEmail)
                onClose()}
              }>Cancelar</button>
            <button className="save-btn" onClick={() => 
              {validateEmail(email) ? onClose() : alert('Correo ingresado es incorrecto');}
              }>Guardar</button>  
          </div>
            
        </div>
  
        <style>{`
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
            }
            .modal-content {
                align-items: center;
                display: flex;
                flex-direction: column;
                background: #f0f0f0;
                padding: 40px 80px;
                border-radius: 5px;
                text-align: center;
            }
            input {
                text-align: center;
                font-size: 1rem;
                margin: 8px 0px;
                background-color: #fff;
                width: 90%;
                padding: 8px 30px;
                border: 1px solid #ccc;
                border-radius: 6px;
            }
            .save-btn {
                margin: 10px 0px;
                width: 40%;
                padding: 8px 8px;
                font-size: 0.9rem;
                background-color: green;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            .cancel-btn {
                margin: 10px 0px;
                width: 40%;
                padding: 8px 8px;
                font-size: 0.9rem;
                background-color: red;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }       
        `}</style>
      </div>
    );
  };
  
  export default ModifyEmailDialog;
  