import cartService from '../services/CartService';

export const handleAddToCart = (product, selectedQuantity) => {
    const cartItems = cartService.getCartItems();
    const existingProductIndex = cartItems.findIndex(item => item.sku === product.sku);
    if (existingProductIndex !== -1) {
      cartService.incrementQuantity(product.sku, selectedQuantity);
    } else {
      cartService.addToCart(product, selectedQuantity);
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

export const incrementProductQuantity = (productSku, selectedQuantity) => {
    cartService.incrementQuantity(productSku, selectedQuantity)
};

export const decreaseProductQuantity = (productSku) => {
    cartService.decreaseQuantity(productSku)
};