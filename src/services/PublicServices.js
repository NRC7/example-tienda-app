import PublicApi from "../api/PublicApi";

const PRODUCTS_SUFIX = process.env.REACT_APP_BACKEND_PRODUCTS_SUFIX;
const BANNER_SUFIX = process.env.REACT_APP_BACKEND_BANNER_SUFIX;

export const getProducts = async () => {
    try {
        const response = await PublicApi.get(PRODUCTS_SUFIX);
        return response.data;
    } catch (error) {
        console.log("Error al obtener productos: ", error);
    }
};

export const getBannerImages = async () => {
    try {
        const response = await PublicApi.get(BANNER_SUFIX);
        return response.data;
        
    } catch (error) {
        console.log("Error al obtener imagenes:", error);
    }
};
