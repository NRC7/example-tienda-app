import React from 'react';
import '../styles/StoreInfo.css'; // Si usas archivo CSS separado

const StoreInfo = () => {
  return (
    <div className="col-full">
      <div className="widget_text widget widget_custom_html">
        <div className="textwidget custom-html-widget">
            <i className="fa fa-shield-alt" style={{ fontSize: '60px', margin: '2px auto' }}></i>
            <span className="widget-title">COMPRA SEGURA</span>
            <p style={{ textAlign: 'center', lineHeight: '1.4' }}>
                Te garantizamos que tus datos siempre estáran seguros durante todo el proceso.
            </p>
        </div>
      </div>

      <div className="widget_text widget widget_custom_html">
        <div className="textwidget custom-html-widget">
            <i className="fa fa-headset" style={{ fontSize: '60px', margin: '2px auto' }}></i>
            <span className="widget-title">ATENCIÓN AL CLIENTE</span>
            <p style={{ textAlign: 'center', lineHeight: '1.4' }}>
                Si tienes alguna pregunta, no dudes en escribirnos a través de WhatsApp. ¡Estamos aquí para ayudarte!
            </p>
        </div>
      </div>

      <div className="widget_text widget widget_custom_html">
        <div className="textwidget custom-html-widget">
            <i className="fa fa-certificate" style={{ fontSize: '60px', margin: '2px auto' }}></i>
            <span className="widget-title">CALIDAD GARANTIZADA</span>
            <p style={{ textAlign: 'center', lineHeight: '1.4' }}>
                Todos nuestros productos incluyen una garantía mínima de 6 meses.
            </p>
        </div>
      </div>

      <div className="widget_text widget widget_custom_html">
        <div className="textwidget custom-html-widget">
            <i className="fa fa-truck" style={{ fontSize: '60px', margin: '2px auto' }}></i>
            <span className="widget-title">ENVÍOS A TODO CHILE</span>
            <p style={{ textAlign: 'center', lineHeight: '1.4' }}>
                Realizamos envíos a todo Chile, entregando tu pedido directamente en la comodidad de tu hogar.
            </p>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;
