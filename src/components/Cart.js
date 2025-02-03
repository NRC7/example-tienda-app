import React, { useState, useEffect } from 'react';
import '../styles/Cart.css';
import cartService from '../services/CartService';

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState(cartService.getCartItems());
  const [cartItemCount, setCartItemCount] = useState(cartService.getCartItemCount());
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const handleCartUpdate = () => {
      setCartItems(cartService.getCartItems());
      setCartItemCount(cartService.getCartItemCount());
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(value);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  return (
    <>
      <div className="cart-icon cart-toggle" onClick={toggleCart}>
        <i className="fa fa-shopping-basket"></i>
        {cartItemCount > 0 && (
          <div className="cart-bubble">{cartItemCount}</div>
        )}
      </div>

      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        {/* Encabezado del carrito */}
        <div className="cart-drawer-heading">
          <span>Mi carrito</span>
          <div className="close-cart" onClick={toggleCart}>
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
                  <h3 className="product-name">{item.name}</h3>
                  <img
                    src={item.imageResources[0]}
                    alt={item.name}
                    style={{ width: '100%', height: '180px', objectFit: 'scale-down' }}
                  />
                  <p>Cantidad: {item.quantity}</p>
                  <p>{formatCurrency(item.totalPrice)}</p>
                  <div className="cart-item-controls">
                    <button
                      onClick={() => cartService.decreaseQuantity(item.sku)}
                      disabled={item.quantity === 0}
                    >
                      -
                    </button>
                    <button
                      onClick={() => cartService.incrementQuantity(item.sku)}
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
            <div className="terms">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={termsAccepted}
                onChange={handleTermsChange}
              />
              <label htmlFor="acceptTerms">Acepto términos y condiciones</label>
            </div>
            <button
              className="checkout-button"
              disabled={!termsAccepted}
            >
              Finalizar compra
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
