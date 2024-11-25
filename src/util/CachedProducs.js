import productService from '../services/ProductService';

let productCache = null;

export const getCachedProducts = async () => {
    if (!productCache) {
        productCache = await productService.getProducts();
        console.log("LLAMANDO SERVICIO")
    }
    return productCache;
};

export const clearProductCache = () => {
    productCache = null;
};
