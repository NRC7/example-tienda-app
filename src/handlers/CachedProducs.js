import { getProducts } from '../services/PublicServices';

let productCache = null;

export const getCachedProducts = async () => {
    if (!productCache) {
        productCache = await getProducts()
        console.log("LLAMANDO SERVICIO PRODUCTS")
    }
    return productCache;
};

export const clearProductCache = () => {
    productCache = null;
};
