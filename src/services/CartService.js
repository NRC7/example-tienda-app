const cartService = {
    getCartItems: () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      return cart;
    },
  
    getCartItemCount: () => {
      const cart = cartService.getCartItems();
      return cart.length;
    },
  
    addToCart: (product) => {
      const cart = cartService.getCartItems();
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated')); // Emitir evento
    },
  
    removeFromCart: (productId) => {
      const cart = cartService.getCartItems();
      const updatedCart = cart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('cartUpdated')); // Emitir evento
    },
  
    clearCart: () => {
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated')); // Emitir evento
    }
  };
  
  export default cartService;
  