import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModifyEmailDialog from '../components/ModifyEmailDialog';
import ModifyDeliveryInfoDialog from '../components/ModifyDeliveryInfoDialog';
import { formatCurrency } from '../util/FormatCurrency';
import { getEstimatedDeliveryDate } from '../util/EstimatedDeliveryDate';
import { getCartItems, calculateSubtotal, calculateShippingCost, 
  calculateTotalWithCupon, calculateTotal, handleClearCart
} from '../handlers/CartHandler';
import { getCuponValue } from '../handlers/CuponHandler';
import '../styles/Checkout.css';
import {postCheckout, postRefresh} from "../services/PrivateServices"
import { useAuth } from "../context/AuthContext";

const Checkout = () => {

  const { authData, saveLoginData, saveLogoutData } = useAuth();
  const inputRef = useRef();
  const [selectedDate, setSelectedDate] = useState(getEstimatedDeliveryDate());
  const [couponValue, setCouponValue] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isModifyEmailDialogOpen, setIsModifyEmailDialogOpen] = useState(false);
  const [isModifyDeliveryInfoDialogOpen, setIsModifyDeliveryInfoDialogOpen] = useState(false);
  const [email, setEmail] = useState(authData.user.email);
  const [address, setAddress] = useState(authData.user.address);
  const [cartItems, setCartItems] = useState(getCartItems());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/", { replace: true });
    }
    document.body.style.marginTop = "0";
    window.scrollTo(0, 0);
      const handleCartUpdate = () => {
        setCartItems(getCartItems());
      };
  
      window.addEventListener('cartUpdated', handleCartUpdate);
      return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, [cartItems, navigate]);

  function handleApplyCoupon() {
    const couponQuery = inputRef.current?.value.toUpperCase();
    if (couponQuery.length > 4) {
        const applied = getCuponValue(couponQuery);
        console.log('applied: ', applied)
        if (applied > 0) {
            setCouponValue(applied);
            alert('Cupón aplicado');
        }
    }
  };

  const handleGoToPayment = async (
    {
      address,
      deliveryDate,
      email,
      couponFactor,
      couponAmount,
      paymentMethod,
      cartProducts,
      subTotalAmount,
      shippingCost,
      totalAmount,
      totalWithDiscountAmount,
      user
    }
  ) => {
    setLoading(true);
    const voucherData =  {
      "address": address,
      "deliveryDate": deliveryDate,
      "email": email,
      "couponFactor": couponFactor,
      "couponAmount": couponAmount,
      "paymentMethod": paymentMethod,
      "cartProducts": cartProducts,
      "subTotalAmount": subTotalAmount,
      "shippingCost": shippingCost,
      "totalAmount": totalAmount,
      "totalWithDiscountAmount": totalWithDiscountAmount,
      "user": user
    }

    const checkoutResponse = await postCheckout(authData.access_token, voucherData)
    if (checkoutResponse.code === "201") {
      alert('Pago ingresado exitosamente!')
      navigate("/", { replace: true });
      handleClearCart();
    }
    else if (checkoutResponse.code === "405") {
      await handleRefresh()
    }
    else {
      console.log('handleError: ', checkoutResponse.code)
      handleError(checkoutResponse.code);
    }      
  }

  const handleError = (status) => {
    if (status === "400") {
      setError("Faltan campos obligatorios.");
    } else if (status === "404") {
      setError("Usuario no registrado.");
    } else {
      setError("error durante pago.");
    }
  };
  
  const handleRefresh = async () => {
    const response = await postRefresh();
    if (response.code === "200") {
      saveLoginData(response.access_token, authData.user)
      alert('Intenta nuevamente')
    }
    else {
      handleError("500")
      saveLogoutData()
      alert('La sesion ha expirado')
      navigate("/")
    }
  }

  return (
    <main>
      <div className='checkout-navegation'>
        <Link className='' to={`/`}>Home - </Link>
        <span className='highlight'>Checkout</span>
      </div>
      <div className="checkout-container">
        {/* Envío */}
        <div style={{display:"flex", flexDirection:'column', height:'150px', alignItems:'flex-start', backgroundColor:'white', borderRadius:'5px', border: '1px solid #ddd', margin:'10px 0px', padding:'0px 14px', fontSize:'1rem', color:'gris', gap:'4px'}}>
          <div style={{display:"flex", justifyContent: 'space-between', width: '100%',fontSize:'1.2rem', alignItems:'center'}}>
            <h2>Entrega</h2>
            <span
              onClick={() => setIsModifyDeliveryInfoDialogOpen(true)}
              className="modify-button" >Modificar <i className="fa fa-edit ic"></i>
            </span>
            <ModifyDeliveryInfoDialog
              isOpen={isModifyDeliveryInfoDialogOpen}
              onClose={() => setIsModifyDeliveryInfoDialogOpen(false)}
              address={address}
              setAddress={setAddress}
              date={selectedDate}
              setDate={setSelectedDate}
            />
          </div>
          <span>{address}</span>
          <span>A partir de: <span style={{fontWeight:'bold'}}>{selectedDate}.</span></span>
          <span>Horario: desde las 9:00 hasta las 18:00 hrs.</span>
        </div>

        {/* Boleta */}
        <div style={{display:"flex", flexDirection:'column', height:'105px', alignItems:'flex-start', backgroundColor:'white', borderRadius:'5px', border: '1px solid #ddd', margin:'10px 0px', padding:'0px 14px', fontSize:'1rem', color:'gris', gap:'4px'}}>
          <div style={{display:"flex", justifyContent: 'space-between', width: '100%', alignItems:'center'}}>
            <h2>Boleta</h2>
            <span
              onClick={() => setIsModifyEmailDialogOpen(true)}
              className="modify-button" >Modificar <i className="fa fa-edit ic"></i>
            </span>
            <ModifyEmailDialog
              isOpen={isModifyEmailDialogOpen}
              onClose={() => setIsModifyEmailDialogOpen(false)}
              email={email}
              setEmail={setEmail}
            />
          </div>
          <div style={{display:"flex", justifyContent: 'start', width: '100%', alignItems:'center', gap:'8px'}}>
            <span>Recibe tu boleta en:</span>
            <span style={{fontWeight:'bold', overflow: 'hidden',textOverflow: 'ellipsis'}}>{email}</span>
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
          <h2 style={{fontSize:'1.2rem'}}>Tus productos</h2>
          {/* Items */}
          {cartItems?.map((cartItem) => (
              <div key={cartItem.sku} style={{ width:'95%', display:"flex", alignItems:'center', borderRadius:'5px', margin:'10px 0px', gap:'6px'}}>

                  {/* Image */}
                  <div style={{display:"flex", width:'35%', height:'95%', justifyContent:'center'}}>
                      <img src={cartItem.imageResources[0]} alt={cartItem.name} style={{width:'160px', height:'160px', objectFit:'scale-down'}} />
                  </div>
                  
                  {/* Content */}
                  <div style={{height:'200px', width:'65%', display:'flex', justifyContent:'center', alignItems:'center'}}>

                      {/* Container */}
                      <div style={{maxHeight:'99%', width:'98%', fontSize:'0.9rem', color:'gris'}}>

                          {/* Name */}
                          <div style={{width:'100%', fontWeight:'bold', margin:'2px 0px'}}>{cartItem.name}</div>

                          {/* Quantity */}
                          <div style={{ textAlign: 'center', width: '78%', margin: '3px 0px', display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>
                            <span>Cantidad: </span>
                            <span>{cartItem.quantity}</span>
                          </div>
                          
                          {/* Pricing */}
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
                              <span>-{formatCurrency(couponValue * calculateTotal())}</span>
                          </div>
                          <div style={{display:"flex", justifyContent: 'space-between', width: '50%', fontWeight:'bold'}}>
                              <span>Total con descuento: </span>
                              <span>{formatCurrency(calculateTotalWithCupon(couponValue * calculateTotal()))}</span>
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
                  <button disabled={!termsAccepted || paymentMethod.length === 0 || address.length === 0 || email.length === 0}
                    onClick={() => handleGoToPayment(
                      {
                        address: address,
                        deliveryDate: selectedDate,
                        email: email,
                        couponFactor: couponValue,
                        couponAmount: couponValue * calculateTotal(),
                        paymentMethod: paymentMethod,
                        cartProducts: cartItems,
                        subTotalAmount: calculateSubtotal(),
                        shippingCost: calculateShippingCost(),
                        totalAmount: calculateTotal(),
                        totalWithDiscountAmount: couponValue === 0 ? 0 : calculateTotalWithCupon(couponValue * calculateTotal()),
                        user: authData.user._id
                      }
                    )
                  }
                    className="pay-button">
                      {(!loading) ? `Pagar ${formatCurrency(couponValue > 0 ? calculateTotalWithCupon(couponValue) : calculateTotal())}` 
                        : "Procesando..."}
                  </button>
              </div>
        </div>

      </div>  

    </main>
  );
};

export default Checkout;