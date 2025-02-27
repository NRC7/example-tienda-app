const getProducts = async () => {

    try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL_PRODUCTS);
        const data = await response.json();
        return data.data;

    } catch (error) {
        console.log("Error al obtener productos: ", error);
    }
};
  
export default {getProducts};