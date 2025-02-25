import { useState, useEffect, useRef } from "react";
import { formatCurrency } from '../util/FormatCurrency';
import { getEstimatedDeliveryDate } from '../util/EstimatedDeliveryDate';
import { getCartItems, calculateSubtotal, calculateShippingCost, 
  calculateTotalWithCupon, getCuponAppliedValue, calculateTotal
} from '../handlers/CartHandler';
import { getCuponAppliedValue } from '../handlers/CuponHandler';
import '../styles/Checkout.css';

const Checkout = () => {
  const [selectedDate, setSelectedDate] = useState("2025-02-25");
  const [couponValue, setCouponValue] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const inputRef = useRef();

  const [cartItems, setCartItems] = useState(getCartItems());

  useEffect(() => {
      const handleCartUpdate = () => {
        setCartItems(getCartItems());
      };
  
      window.addEventListener('cartUpdated', handleCartUpdate);
      return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, []);

  const cuponAplicadoDummy = 'SAVE10';

  const deliveryAddress = 'Calle principal #123, Santiago.'
  const email = 'johnkennedy@ejemplo.com'

  function handleApplyCoupon() {
    const couponQuery = inputRef.current?.value.toUpperCase();
    if (couponQuery.length > 4) {
        const applied = getCuponAppliedValue(couponQuery);
        if (applied > 0) {
            setCouponValue(applied);
            alert('Cupón aplicado');
        }
    }
  };

  return (
    <div className="checkout-container">
      {/* Envío */}
      <div style={{display:"flex", flexDirection:'column', height:'150px', alignItems:'flex-start', backgroundColor:'white', borderRadius:'5px', border: '1px solid #ddd', margin:'10px 0px', padding:'0px 14px', fontSize:'1rem', color:'gris', gap:'4px'}}>
        <div style={{display:"flex", justifyContent: 'space-between', width: '100%',fontSize:'1.2rem', alignItems:'center'}}>
          <h2>Entrega</h2>
          <span className="modify-button" >Modificar <i className="fa fa-edit ic"></i></span>
        </div>
        <span>{deliveryAddress}</span>
        <span>A partir de: <span style={{fontWeight:'bold'}}>{getEstimatedDeliveryDate()}.</span></span>
        <span>Horario: desde las 9:00 hasta las 18:00 hrs.</span>
      </div>
      
      {/* Boleta */}
      <div style={{display:"flex", flexDirection:'column', height:'105px', alignItems:'flex-start', backgroundColor:'white', borderRadius:'5px', border: '1px solid #ddd', margin:'10px 0px', padding:'0px 14px', fontSize:'1rem', color:'gris', gap:'4px'}}>
        <div style={{display:"flex", justifyContent: 'space-between', width: '100%', alignItems:'center'}}>
          <h2>Boleta</h2>
          <span className="modify-button" >Modificar <i className="fa fa-edit ic"></i></span>
        </div>
        <div style={{display:"flex", justifyContent: 'start', width: '100%', alignItems:'center', gap:'8px'}}>
          <span>Recibe tu boleta en:</span>
          <span style={{fontWeight:'bold'}}>{email}</span>
        </div>
      </div>

      {/* Cupones */}
      <div style={{display:"flex", flexDirection:'column', height:'100px', alignItems:'flex-start', backgroundColor:'white', borderRadius:'5px', border: '1px solid #ddd', margin:'10px 0px', padding:'0px 14px'}}>
      <h2 style={{fontSize:'1.2rem'}}>Cupones</h2>
        <div style={{display:"flex", justifyContent: 'space-between', width: '50%', fontSize:'0.9rem', color:'gris'}}>
          <input className="coupon-input" ref={inputRef} type="text" placeholder="Ingresa tu cupón..." />
          <button className="cartItem-btn" onClick={() => handleApplyCoupon()}>Aplicar</button>
        </div>
      </div>

      {/* Medio de pago */}
      <div style={{display:"flex", flexDirection:'column', height:'auto', alignItems:'flex-start', backgroundColor:'white', borderRadius:'5px', border: '1px solid #ddd', margin:'10px 0px', padding:'8px 14px', fontSize:'1rem', color:'gris', gap:'4px'}}>
        <h2>Medio de pago</h2>
        {["Tarjeta de débito *", "Tarjeta de crédito *", "Transferencia **"].map((method) => (
            <div style={{margin:'4px 0px'}} key={method}>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                {method.toUpperCase()}
              </div>
            </div>
        ))}
        <span style={{fontSize:"0.9rem", margin:'4px 0px'}}>* Serás redirigido fuera de nuestra pagina para completar tu pago.</span>
        <span style={{fontSize:"0.9rem", margin:'4px 0px'}}>** Tu compra quedará pendiente mientras se verifica la transferencia.</span>
      </div>  

      {/* Products */}
      <div style={{display:"flex", flexDirection:'column', alignItems:'center', backgroundColor:'white', borderRadius:'5px', border: '1px solid #ddd', margin:'10px 0px'}}>
        {/* Title */}
        <h2 style={{fontSize:'1.2rem'}}>Mis productos</h2>
        {/* Items */}
        {cartItems?.map((cartItem) => (
            <div key={cartItem.sku} style={{ width:'95%', display:"flex", alignItems:'center', borderRadius:'5px', margin:'10px 0px', gap:'6px'}}>

                {/* IMAGE */}
                <div style={{display:"flex", width:'35%', height:'95%', justifyContent:'center'}}>
                    <img src={cartItem.imageResources[0]} alt={cartItem.name} style={{width:'160px', height:'160px', objectFit:'scale-down'}} />
                </div>
                
                {/* CONTENT */}
                <div style={{height:'200px', width:'65%', display:'flex', justifyContent:'center', alignItems:'center'}}>

                    {/* CONTAINER */}
                    <div style={{maxHeight:'99%', width:'98%', fontSize:'0.9rem', color:'gris'}}>

                        {/* NAME */}
                        <div style={{width:'100%', fontWeight:'bold', margin:'2px 0px'}}>{cartItem.name}</div>

                        {/* QUANTITY */}
                        <div style={{ textAlign: 'center', width: '78%', margin: '3px 0px', display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>
                          <span>Cantidad: </span>
                          <span>{cartItem.quantity}</span>
                        </div>
                        
                        {/* PRICING */}
                        {cartItem?.discountPercentage !== "" ? (
                            <div style={{ textAlign: 'center', width: '80%', margin: '2px 0px', display: 'flex', flexDirection:'column', justifyContent: 'space-between', alignItems:'center' }}>
                        
                                <span style={{ textAlign: 'center', width: '100%', color: 'gris', margin: '2px 0px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span >Precio normal:</span>
                                    <span style={{textDecoration: 'line-through', fontSize: '0.9rem'}}>{formatCurrency(cartItem?.normalPrice * cartItem?.quantity)}</span>
                                </span>
                        
                                <span style={{ textAlign: 'center', width: '100%', color: 'gris', margin: '2px 0px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span >% Desc:</span> <span>-{cartItem?.discountPercentage}</span>
                                </span>
                        
                                <span style={{ textAlign: 'center', width: '100%', color: 'gris', margin: '2px 0px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span >Precio oferta:</span> <span >{formatCurrency(cartItem?.dealPrice * cartItem?.quantity)}</span>
                                </span>
                        
                            </div>
                                                        
                        ) : (
                        
                            <div style={{ textAlign: 'center', width: '80%', margin: '2px 0px', display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>
                        
                                <span >Normal:</span>
                        
                                <span >{formatCurrency(cartItem?.normalPrice * cartItem?.quantity)}</span>
                        
                            </div>
                        
                        )}

                        {/* Shipping */}
                        <div style={{ textAlign: 'center', width: '80%', margin: '2px 0px', display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>
                        
                            <span>Envio gratis:</span>
                        
                            <span>{cartItem?.freeShiping === 'true' ? 'Si' : 'No'}</span>
                        
                        </div>
                    </div>
                </div>


            </div>
        ))}
      </div>

      {/* Resume */}
      <div style={{display:"flex", flexDirection:'column', alignItems:'center', backgroundColor:'white', borderRadius:'5px', border: '1px solid #ddd', margin:'10px 0px'}}>
        {/* Title */}
        <h2 style={{fontSize:'1.2rem'}}>Resumen</h2>
        {/* Content */}
        <div style={{display:"flex", flexDirection: 'column', justifyContent:'center', width:'95%', alignItems:'center', padding:'6px 2px', borderRadius:'5px', fontSize:'1rem'}}>
                <div style={{display:"flex", justifyContent: 'space-between', width: '50%'}}>
                    <span>Subtotal: </span>
                    <span>{formatCurrency(calculateSubtotal())}</span>
                </div>

                <div style={{display:"flex", justifyContent: 'space-between', width: '50%'}}>
                    <span>Despacho: </span>
                    <span>+{formatCurrency(calculateShippingCost())}</span>
                </div>

                <hr style={{border: 'none', height: '1px', backgroundColor: '#ccc', margin: '12px 0', width:'60%'}} />

                <div style={{display:"flex", justifyContent: 'space-between', width: '50%', fontWeight:'bold'}}>
                    <span>Total a pagar: </span>
                    <span>{formatCurrency(calculateTotal())}</span>
                </div>

                {couponValue > 0 ? (
                    <>
                        <hr style={{border: 'none', height: '1px', backgroundColor: '#ccc', margin: '12px 0', width:'60%'}} />
                        <div style={{display:"flex", justifyContent: 'space-between', width: '50%'}}>
                            <span>Cupones: </span>
                            <span>-{formatCurrency(couponValue)}</span>
                        </div>
                        <div style={{display:"flex", justifyContent: 'space-between', width: '50%', fontWeight:'bold'}}>
                            <span>Total con cupones: </span>
                            <span>{formatCurrency(calculateTotalWithCupon(couponValue))}</span>
                        </div>
                                                
                    </>
                ) : (
                
                    <>
                    </>
                )}

                <hr style={{border: 'none', height: '1px', backgroundColor: '#ccc', margin: '12px 0', width:'60%'}} />

                <div style={{display: 'flex', alignItems:'center', width: '50%', justifyContent:'center', gap:'4px', margin:'20px 0px'}}>
                        <input checked={termsAccepted} 
                        onChange={(e) => setTermsAccepted(e.target.checked)} type="checkbox" /> Acepto términos y condiciones
                </div>
                
                <button disabled={!termsAccepted || paymentMethod.length === 0}
                  onClick={() => console.log(paymentMethod.length)}
                 className="pay-button">Pagar {formatCurrency(couponValue > 0 ? calculateTotalWithCupon(couponValue) : calculateTotal())}</button>
            
            </div>
        


      </div>
    </div>
  );
};

export default Checkout;