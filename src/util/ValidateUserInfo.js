export const validateEmail = (email) => {
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; 
  return regex.test(email);
};

export const validateInfo = (info) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(info);
};

export const isAbove18 = (user_date) => {
  const actualDate = new Date();
  const limitDate = new Date(
      actualDate.getFullYear() - 18,
      actualDate.getMonth(),
      actualDate.getDate()
  );
  return new Date(user_date) <= limitDate;
}

export const validateFullName = (fullName) => {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+ [A-Za-zÁÉÍÓÚáéíóúÑñ]+$/;
  return regex.test(fullName) && fullName.length >= 5 && fullName.length <= 50;
};

export const validateAddress = (address) => {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9#,\s]+$/;
  return regex.test(address) && address.length >= 10 && address.length <= 100;
};