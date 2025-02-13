import React from 'react';
import '../styles/ChatButton.css';

const ChatButton = () => {
    return (
      <a
        href={process.env.REACT_APP_SUPPORT_WSP_URL}
        className="joinchat"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa fa-whatsapp joinchat-icon"></i> {/* Clase para ícono */}
      </a>
    );
  };
  
  export default ChatButton;
