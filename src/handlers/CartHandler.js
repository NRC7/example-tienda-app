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

export const calculateSubtotal = () => {
    return getCartItems().reduce((total, item) => total + item.totalPrice, 0);
};

export const calculateShippingCost = () => {
    return getCartItems().reduce((total, item) => total + (item.freeShiping === 'true' ? 0 : 3000) * item.quantity, 0);
};

export const calculateTotal = () => {
    return calculateSubtotal() + calculateShippingCost()
};

export const calculateTotalWithCupon = (cuponValue) => {
    return calculateTotal() - cuponValue;
};