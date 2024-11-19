import React, { useState, useEffect } from 'react';
import '../styles/Cart.css';
import cartService from '../services/CartService'; // Importamos el servicio

const Cart = () => {

  const [isOpen, setIsOpen] = useState(false);
  
  const [cartItems, setCartItems] = useState(cartService.getCartItems());

  const [cartItemCount, setCartItemCount] = useState(cartService.getCartItemCount());

  const updateCartItemCount = () => {
    setCartItemCount(cartService.getCartItemCount());
    setCartItems(cartService.getCartItems());
  };
  
  // Obtener los productos al cargar el componente
  useEffect(() => {
    const items = cartService.getCartItems();
    setCartItems(items);
    // Escucha el evento `cartUpdated`
    //console.log(cartItems)
    const handleCartUpdate = () => {
        updateCartItemCount();
      };
      window.addEventListener('cartUpdated', handleCartUpdate);
  
      // Cleanup: elimina el listener cuando el componente se desmonta
      return () => {
        window.removeEventListener('cartUpdated', handleCartUpdate);
      };
  }, []);

  // Función para abrir/cerrar el carrito
  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    cartService.addToCart(product);  // Usamos el servicio para agregar el producto
    setCartItems(cartService.getCartItems());  // Actualizamos el estado con la nueva lista
  };
  

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    cartService.removeFromCart(productId);  // Usamos el servicio para eliminar el producto
    setCartItems(cartService.getCartItems());  // Actualizamos el estado con la nueva lista
  };

  // Formato de moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    }).format(value);
};

  return (
    <>
      {/* Botón para abrir/cerrar el carrito */}
      <div className="cart-icon cart-toggle" onClick={toggleCart}>
        <i className="fa fa-shopping-basket"></i> {/* Icono de carrito */}
        {/* Burbuja de cantidad de artículos */}
        {cartItemCount > 0 && (
          <div className="cart-bubble">{cartItemCount}</div> // Muestra la burbuja con la cantidad de artículos
        )}
      </div>

      {/* Drawer del carrito */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-drawer-heading">
          <span>Mi carrito</span>
          {/* Botón de cierre (X) con Font Awesome */}
          <div className="close-cart" onClick={toggleCart}>
            <i className="fa fa-times"></i> {/* Ícono de la X para cerrar */}
          </div>
        </div>

        <div className="cart-content">
          {/* Mostrar productos en el carrito */}
          {cartItems.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            <div className="cart-items-container">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                <h3 className='product-name'>{item.name}</h3>
                <img src={item.imageResources[0]} alt={item.name} style={{ width: '100%', height: '180px' }} />
                <p style={{ margin: '6px 2px', fontSize: '0.8rem' }}>Categoria: {item.category}</p>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {item.discountPercentage !== "" ? (
                        <>
                            <span style={{ textDecoration: 'line-through', color: 'red', margin: '6px 2px', fontSize: '1rem' }}>
                                Antes: {formatCurrency(item.normalPrice)}
                            </span>
                            <span style={{ fontWeight: 'bold', color: 'green', fontSize: '1.2rem', margin: '6px 2px' }}>
                                Oferta: {formatCurrency(item.dealPrice)}
                            </span>
                            <span style={{ color: 'black', margin: '6px 2px', fontSize: '1rem', }}>
                                ({item.discountPercentage} de desct.)
                            </span>
                        </>
                            ) : (
                                // Muestra solo el normalPrice si no hay descuento
                                <span style={{ fontWeight: 'bold', color: 'black', fontSize: '1.3rem', margin: '20px 2px' }}>{formatCurrency(item.normalPrice)}</span>
                            )}
                        </div>
                        {/* Mostrar las estrellas de calificación */}
                
                    </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
