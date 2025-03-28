import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Logout from '../components/Logout';
import OrderInfo from '../components/OrderInfo';
import UserInfo from '../components/UserInfo';
import ModifyUserDataDialog from '../components/ModifyUserDataDialog';
import { sanitizeCategory } from '../util/SanitizeCategory';
import '../styles/dashboard.css';
import { useAuth } from "../context/AuthContext";

const DashBoard = () => {

  const { authData } = useAuth();

  const navigate = useNavigate();

  const [showAccountInfo, setShowAccountInfo] = useState(true)
  const [showOrderInfo, setShowOrderInfo] = useState(false)
  const [showModifyUserData, setShowModifyUserData] = useState(false)
  const [showLogout, setShowLogout] = useState(false)

  useEffect(() => {
    if (!authData.access_token || !authData.user) {
        navigate("/", { replace: true });
    }
  }, [authData]);

  const handleToggleSections = (e, opt) => {
    e.preventDefault();
    switch(opt) {
        case 1:
            setShowAccountInfo(true)
            setShowOrderInfo(false)
            setShowModifyUserData(false)
            setShowLogout(false)
            break;
        case 2:
            setShowAccountInfo(false)
            setShowOrderInfo(true)
            setShowModifyUserData(false)
            setShowLogout(false)
            break;
        case 3:
            setShowAccountInfo(false)
            setShowOrderInfo(false)
            setShowModifyUserData(true)
            setShowLogout(false)
            break;
        case 4:
            setShowAccountInfo(false)
            setShowOrderInfo(false)
            setShowModifyUserData(false)
            setShowLogout(true)
            break;            
        default:
            setShowAccountInfo(false)
            setShowOrderInfo(false)
            setShowModifyUserData(false)
            setShowLogout(false)
            break;    
    }
  }

  const handleLogoutSuccess = () => {
    setShowLogout(false);
    navigate("/", { replace: true });
  };

  const handleLogoutClose = () => {
    setShowLogout(false);
  };

  const handleModifyUserDataClose = () => {
    setShowModifyUserData(false);
  };

  return (
    <div className='dashboard-container'>
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
            {showAccountInfo && <UserInfo />}
            {showOrderInfo && <OrderInfo onRefreshFailed={handleLogoutSuccess} />}
            {showModifyUserData && <ModifyUserDataDialog onModifyUserDataClose={handleModifyUserDataClose} />}
            {showLogout && <Logout onLogoutSuccess={handleLogoutSuccess} onLogoutClose={handleLogoutClose} />}
        </div>
    </div>
  );
};

export default DashBoard;
