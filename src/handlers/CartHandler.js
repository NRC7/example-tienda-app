import cartService from '../services/CartService';

export const handleAddToCart = (product) => {
    const cartItems = cartService.getCartItems();
    const existingProductIndex = cartItems.findIndex(item => item.sku === product.sku);
    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, solo aumentamos la cantidad
      cartService.incrementQuantity(product.sku);
    } else {
      // Si el producto no está en el carrito, lo agregamos con cantidad 1
      cartService.addToCart(product);
    }
  };

export const handleClearCart = () => {
    cartService.clearCart();
};

export const getCartItems = () => {
    return cartService.getCartItems();
};  

export const getCartItemCount = () => {
   return cartService.getCartItemCount();
};

export const incrementProductQuantity = (productSku) => {
    cartService.incrementQuantity(productSku)
};

export const decreaseProductQuantity = (productSku) => {
    cartService.decreaseQuantity(productSku)
};