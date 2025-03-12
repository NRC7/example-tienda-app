import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Login from '../components/Login';
import { formatCurrency } from '../util/FormatCurrency';
import { getCartItems, getCartItemCount,
  incrementProductQuantity, decreaseProductQuantity
} from '../handlers/CartHandler';
import '../styles/Cart.css';
import { useAuth } from "../context/AuthContext";

const Cart = () => {

  const { authData } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState(getCartItems());
  const [cartItemCount, setCartItemCount] = useState(getCartItemCount());

  const [showLogin, setShowLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleCartUpdate = () => {
      setCartItems(getCartItems());
      setCartItemCount(getCartItemCount());
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const toggleCartDrawer = () => {
    setIsOpen(!isOpen);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const handleGoToCheckout = (e) => {
    e.preventDefault();
    if (authData.access_token || authData.user) {
      toggleCartDrawer()
      navigate('/checkout', { state: { cart: cartItems } })
    }
    else {
      alert('Debes iniciar sesion antes de proceder al checkout')
      setShowLogin(true);
    }
  };

  const handleLoginClose = () => {
    setShowLogin(false); // Cierra el diálogo después del login
  };

  return (
    <>
      <div className="cart-icon cart-toggle" onClick={toggleCartDrawer}>
        <i className="fa fa-shopping-basket"></i>
        {cartItemCount > 0 && (
          <div className="cart-bubble">{cartItemCount}</div>
        )}
      </div>

      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        {/* Encabezado del carrito */}
        <div className="cart-drawer-heading">
          <span>Mi carrito</span>
          <div className="close-cart" onClick={toggleCartDrawer}>
            <i className="fa fa-times"></i>
          </div>
        </div>

        {/* Contenido del carrito con scroll */}
        <div className="cart-content">
          {cartItems.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            <div className="cart-items-container">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.sku}>
                  <h3 onClick={() =>  navigate(`/products/${item.category}/${item.subCategory}/${item.sku}`, { state: { product: item } })}
                  className="product-name">{item.name}</h3>
                  <img
                    src={item.imageResources[0]}
                    alt={item.name}
                    style={{ width: '100%', height: '180px', objectFit: 'scale-down' }}
                    onClick={() =>  navigate(`/products/${item.category}/${item.subCategory}/${item.sku}`, { state: { product: item } })}
                  />
                  <p>Cantidad: {item.quantity}</p>
                  <p>{formatCurrency(item.totalPrice)}</p>
                  <div className="cart-item-controls">
                    <button
                      onClick={() => decreaseProductQuantity(item.sku)}
                      disabled={item.quantity === 0}
                    >
                      -
                    </button>
                    <button
                      onClick={() => incrementProductQuantity(item.sku, 1)}
                      disabled={item.quantity === 10}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Resumen al fondo */}
        {cartItems.length > 0 && (
          <div className="cart-summary">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>{formatCurrency(calculateSubtotal())}</span>
            </div>
            <button
              className="checkout-button"
              onClick={(e) => handleGoToCheckout(e)}
            >
            Continuar con tu compra
            </button>
          </div>
        )}
      </div>
      {showLogin && <Login onLoginSuccess={handleLoginClose} onLoginClose={handleLoginClose} />}
    </>
  );
};

export default Cart;
