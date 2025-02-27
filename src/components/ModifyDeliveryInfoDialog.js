import { useState } from "react";
import {formatDate, isWeekday} from "../util/EstimatedDeliveryDate"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModifyDeliveryInfoDialog = ({ isOpen, onClose, address, setAddress, date, setDate }) => {

  const [oldAddress] = useState(address);
  const [oldDate] = useState(date);

    if (!isOpen) return null;

    return (
      <div className="modal">
        <div className="modal-content">

          <h2>Modificar Dirección</h2>
          <input
            type="text"
            maxLength={100}
            value={address}
            onChange={(e) =>  setAddress(e.target.value)}
          />

          <h2>Modificar Fecha</h2>
          <div style={{display:'flex', justifyContent:'center', marginRight:'30px'}}>
            <DatePicker
                  selected={date}
                  filterDate={isWeekday}
                  onChange={(e) => setDate(formatDate(e))}    
                  minDate={oldDate} // No permite fechas pasadas
                  maxDate={new Date(new Date().setMonth(new Date().getMonth() + 2))} // Máximo 2 meses adelante
                  dateFormat="dd/MM/yyyy"
            />
          </div>
          
          
          <div style={{display: 'flex', width:'100%', justifyContent:'space-between', margin:'12px 0px'}}>
            <button className="cancel-btn" onClick={() => 
              {setAddress(oldAddress)
                onClose()}
              }>Cancelar</button>
            <button className="save-btn" onClick={() => 
              {address !== '' ? onClose() : alert('Ingresa una dirección');}
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
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
            .date-picker {
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
  
  export default ModifyDeliveryInfoDialog;
  