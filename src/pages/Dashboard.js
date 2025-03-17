import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Logout from '../components/Logout';
import OrderInfo from '../components/OrderInfo';
import { sanitizeCategory } from '../util/SanitizeCategory';
import '../styles/dashboard.css';
import { useAuth } from "../context/AuthContext";

const DashBoard = () => {

  const { authData } = useAuth();

  const navigate = useNavigate();

  const [showAccountInfo, setShowAccountInfo] = useState(true)
  const [showOrderInfo, setShowOrderInfo] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showLogout, setShowLogout] = useState(false)

  useEffect(() => {
    // console.log(authData)
    if (!authData.access_token || !authData.user) {
        navigate("/")
    }
  }, [authData]);

  const handleToggleSections = (e, opt) => {
    e.preventDefault();
    switch(opt) {
        case 1:
            console.log("1");
            setShowAccountInfo(true)
            setShowOrderInfo(false)
            setShowChangePassword(false)
            setShowLogout(false)
            break;
        case 2:
            console.log("2");
            setShowAccountInfo(false)
            setShowOrderInfo(true)
            setShowChangePassword(false)
            setShowLogout(false)
            break;
        case 3:
            console.log("3");
            setShowAccountInfo(false)
            setShowOrderInfo(false)
            setShowChangePassword(true)
            setShowLogout(false)
            break;
        case 4:
            console.log("4");
            setShowAccountInfo(false)
            setShowOrderInfo(false)
            setShowChangePassword(false)
            setShowLogout(true)
            break;            
        default:
            console.log("def");
            setShowAccountInfo(false)
            setShowOrderInfo(false)
            setShowChangePassword(false)
            setShowLogout(false)
            break;    
    }
  }

  const handleLogoutSuccess = () => {
    setShowLogout(false); // Cierra el diálogo después del login
    navigate("/")
  };

  const handleLogoutClose = () => {
    setShowLogout(false); // Cierra el diálogo después del login
  };

  return (
    <>
        <div className='dashboard'>
            {/* Encabezado */}
            <div className="dashboard-heading">
                <h2>{sanitizeCategory(authData.user.userName)}</h2>
                <Link style={{color:'black', scale:'1.2'}} to={'/'}>
                    <i className="fa fa-times"></i>
                </Link>
            </div>
            {/* Contenido */}
            <div className="dashboard-content">
                <div className='dashboard-content-item' onClick={(e) => handleToggleSections(e, 1)}>
                    <span>Mis datos</span>
                </div>
                <div className='dashboard-content-item' onClick={(e) => handleToggleSections(e, 2)}>
                    <span>Mis pedidos</span>
                </div>
                <div className='dashboard-content-item' onClick={(e) => handleToggleSections(e, 3)}>
                    <span>Cambiar contraseña</span>
                </div>
                <div className='dashboard-content-item' onClick={(e) => handleToggleSections(e, 4)}>
                    <span>Cerra sesion</span>
                </div>
            </div>
        </div>

        <div className='section-content'>
            {showAccountInfo && <h2>ACCOUNT INFO</h2>}
            {showOrderInfo && <OrderInfo />}
            {showChangePassword && <h2>CHANGE PASSWORD</h2>}
            {showLogout && <Logout onLogoutSuccess={handleLogoutSuccess} onLogoutClose={handleLogoutClose} />}
        </div>
    </>
  );
};

export default DashBoard;
