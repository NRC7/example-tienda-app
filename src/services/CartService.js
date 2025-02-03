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

      // Buscar si el producto ya existe en el carrito
      const existingProductIndex = cart.findIndex(item => item.sku === product.sku);

      if (existingProductIndex !== -1) {
        // Incrementar cantidad y recalcular precio total
        cart[existingProductIndex].quantity += 1;
        cart[existingProductIndex].totalPrice =
          cart[existingProductIndex].quantity *
          (product.dealPrice || product.normalPrice);
      } else {
        // Agregar un nuevo producto con cantidad 1
        cart.push({
          ...product,
          quantity: 1,
          totalPrice: product.dealPrice || product.normalPrice,
        });
      }

      // Guardar en localStorage y disparar el evento
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
    },
  
    removeFromCart: (productSku) => {
      const cart = cartService.getCartItems();
      const updatedCart = cart.filter(item => item.sku !== productSku);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('cartUpdated')); // Emitir evento
    },
  
    clearCart: () => {
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated')); // Emitir evento
    },

    incrementQuantity: (productSku) => {
      const cart = cartService.getCartItems();
      const product = cart.find(item => item.sku === productSku);
      if (product && product.quantity < 10) {
        product.quantity += 1;
        product.totalPrice = product.quantity * (product.dealPrice || product.normalPrice);
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cartUpdated'));
      }
    },
  
    decreaseQuantity: (productSku) => {
      const cart = cartService.getCartItems();
      const productIndex = cart.findIndex(item => item.sku === productSku);
    
      if (productIndex !== -1) {
        const product = cart[productIndex];
    
        if (product.quantity > 1) {
          // Disminuir cantidad
          product.quantity -= 1;
          product.totalPrice = product.quantity * (product.dealPrice || product.normalPrice);
        } else {
          // Si la cantidad es 1, eliminar el producto
          cart.splice(productIndex, 1);
        }
    
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cartUpdated'));
      }
    },

  };
  
  export default cartService;
  