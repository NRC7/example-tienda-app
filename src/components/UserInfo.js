import React, {useState} from "react";
import { useAuth } from '../context/AuthContext';
import ModifyUserInfoDialog from './ModifyUserInfoDialog';
import { sanitizeCategory } from '../util/SanitizeCategory';
import '../styles/UserInfo.css';

const UserInfo = () => {

    const { authData } = useAuth();

    const [showDialog, setShowDialog] = useState(false);

    const handleUpdateInfoSuccess = () => {
        setShowDialog(false);
    };

    const handleUpdateInfoClose = () => {
        setShowDialog(false);
    };

    return (
        <>
            <div className="user-info-container">
                <div className="user-info">
                    <div style={{display:"flex", justifyContent: 'space-between', width: '100%',fontSize:'1.2rem', alignItems:'center'}}>
                    <h2>Información Personal</h2>
                    <span
                        onClick={() => setShowDialog(true)}
                        className="modify-button" >Modificar <i className="fa fa-edit ic"></i>
                    </span>
                </div>
                    <p><strong>Nombre:</strong> {sanitizeCategory(authData.user.userName)}</p>
                    <p><strong>Email:</strong> {authData.user.email}</p>
                    <p><strong>Dirección:</strong> {authData.user.address}</p>
                    <p><strong>Fecha de Nacimiento:</strong> {authData.user.dateOfBirth}</p>
                </div>
                {showDialog && <ModifyUserInfoDialog onUpdateInfoSuccess={handleUpdateInfoSuccess} onUpdateInfoClose={handleUpdateInfoClose}/>}
            </div>
        </>
    );
};

export default UserInfo;
