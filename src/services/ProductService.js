//import dummyProducts from '../util/DummyProducts';

const getProducts = async () => {

    let products = {};

    try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL);
        const data = await response.json();
        if (data.code === "200") {
            products = data.data; 
        }
        else {
            console.log("Error al obtener productos: ", data.code);
            //products = dummyProducts
        }
    } catch (error) {
        console.log("Error al obtener productos: ", error);
        //products = dummyProducts
    }

    return products;
  };
  
  export default {
    getProducts,
  };