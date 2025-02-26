const getImages = async () => {

  try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL_BANNER);
      const data = await response.json();
      return data.data;
      
  } catch (error) {
      console.log("Error al obtener imagenes:", error);
  }
};
  
export default getImages;