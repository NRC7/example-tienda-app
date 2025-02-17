import React from 'react';
import '../styles/BuyingInfo.css'; // Si usas archivo CSS separado

const BuyingInfo = () => {
  return (
    <div className="col-full-dit">
      <div className="widget_text-dit widget widget_custom_html">
        <div className="textwidget-dit custom-html-widget">
        <i className="fa fa-shield" style={{ fontSize: '60px', margin: '2px auto' }}></i>
            <span className="widget-title-dit">CAMBIOS Y DEVOLUCIONES</span>
            <p style={{ textAlign: 'center', lineHeight: '1.4' }}>
                Si quieres cambiar un producto o devolverlo contactanos.
            </p>
        </div>
      </div>

      <div className="widget_text-dit widget widget_custom_html">
        <div className="textwidget-dit custom-html-widget">
            <i className="fa fa-certificate" style={{ fontSize: '60px', margin: '2px auto' }}></i>
            <span className="widget-title-dit">CALIDAD GARANTIZADA</span>
            <p style={{ textAlign: 'center', lineHeight: '1.4' }}>
                Todos nuestros productos incluyen una garantía mínima de 6 meses.
            </p>
        </div>
      </div>

      <div className="widget_text-dit widget widget_custom_html">
        <div className="textwidget-dit custom-html-widget">
            <i className="fa fa-headset" style={{ fontSize: '60px', margin: '2px auto' }}></i>
            <span className="widget-title-dit">¿Necesitas ayuda?</span>
            <p style={{ textAlign: 'center', lineHeight: '1.4' }}>
                Resuelve tus dudas y consultas a través de nuestro WhatsApp.
            </p>
        </div>
      </div>

    </div>
  );
};

export default BuyingInfo;
