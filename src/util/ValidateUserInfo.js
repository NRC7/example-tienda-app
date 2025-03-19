export const validateEmail = (email) => {
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; 
  return regex.test(email);
};

export const validateInfo = (info) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(info);
};

export const isAbove18 = (user_date) => {
  // Obtener la fecha actual
  const actualDate = new Date();

  // Calcular la fecha límite (fecha actual menos 18 años)
  const limitDate = new Date(
      actualDate.getFullYear() - 18,
      actualDate.getMonth(),
      actualDate.getDate()
  );

  // Comparar la fecha de nacimiento con la fecha límite
  return new Date(user_date) <= limitDate;
}