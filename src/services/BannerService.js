import dummyImages from '../util/DummyImages';

const getImages = async () => {

    let images = dummyImages;

    // try {
    //     const response = await fetch(process.env.REACT_APP_BACKEND_URL);
    //     const data = await response.json();
    //     if (data.status === "ok") {
    //         products = data.products; // Actualiza el estado con los productos obtenidos
    //         //console.log(data.products)
    //     }
    //     else {
    //         //console.log("no hay productos, solo dummies")
    //         products = dummyProducts
    //     }
    // } catch (error) {
    //     //console.log("Error al obtener productos:", error);
    //     products = dummyProducts
    // }

    return images;
  };
  
  export default {
    getImages,
  };