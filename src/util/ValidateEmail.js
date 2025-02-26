// Función para validar email con una expresión regular
export const validateEmail = (email) => {
    // eslint-disable-next-line
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; 
    return regex.test(email);
  };