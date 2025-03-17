import PrivateApi from "../api/PrivateApi";

const LOGIN_SUFIX = process.env.REACT_APP_BACKEND_LOGIN_SUFIX;
const LOGOUT_SUFIX = process.env.REACT_APP_BACKEND_LOGOUT_SUFIX;
const REGISTER_SUFIX = process.env.REACT_APP_BACKEND_REGISTER_SUFIX;
const CHECKOUT_SUFIX = process.env.REACT_APP_BACKEND_CHECKOUT_SUFIX;
const ORDERS_SUFIX = process.env.REACT_APP_BACKEND_ORDERS_SUFIX;
const REFRESH_SUFIX = process.env.REACT_APP_BACKEND_REFRESH_SUFIX;

export const getLogin = async (_email, _password) => {
  console.log("LLAMANDO SERVICIO LOGIN")
    try {
        const response = await PrivateApi.post(LOGIN_SUFIX, {email: _email, password: _password});
        // response.json()
        //     .then(data => {
        //         console.log('ok');
        //     })
        console.log("RESULTADO SERVICIO LOGIN: ", response.data?.code);
        return response.data;  
      } catch (error) {
        console.log("Error durante login: ", error.response.data);
        return error.response.data;
      }
};

export const getLogout = async (access_token, _user) => {
  console.log("LLAMANDO SERVICIO LOGOUT")
  try {
      const response = await PrivateApi.post(LOGOUT_SUFIX, {}, { 
        headers: { Authorization: `Bearer ${access_token}` }
    });
      // response.json()
      //     .then(data => {
      //         console.log('ok');
      //     })
      console.log("RESULTADO SERVICIO LOGOUT: ", response.data?.code);
      return response.data;  
    } catch (error) {
      console.log("Error servicio logout: ", error.response.data);
      return error.response.data;
    }
};

export const getRegister = async (_userName, _email, _password) => {
  console.log("LLAMANDO SERVICIO REGISTER")
    try {
        const response = await PrivateApi.post(REGISTER_SUFIX, { user_name: _userName, email: _email, password: _password });
        // response.json()
        //     .then(data => {
        //         console.log('ok');
        //     })
        console.log("RESULTADO SERVICIO REGISTER: ", response.data?.code);
        return response.data;  
      } catch (error) {
        console.log("Error durante registro: ", error.response.data);
        return error.response.data;
      }
};

export const postCheckout = async (access_token, params) => {
  console.log("LLAMANDO SERVICIO CHECKOUT")
    try {
        const response = await PrivateApi.post(CHECKOUT_SUFIX, params, { 
            headers: { Authorization: `Bearer ${access_token}`}
        });
        // response.json()
        //     .then(data => {
        //         console.log('ok');
        //     })
        console.log("RESULTADO SERVICIO CHECKOUT: ", response.data?.code);
        return response.data;  
      } catch (error) {
        console.log("Error durante checkout: ", error.response.data);
        return error.response.data;
      }
};

export const getOrders = async (access_token) => {
  console.log("LLAMANDO SERVICIO USER'S ORDERS")
  try {
      const response = await PrivateApi.get(ORDERS_SUFIX, { 
          headers: { Authorization: `Bearer ${access_token}`}
      });
      // response.json()
      //     .then(data => {
      //         console.log('ok');
      //     })
      console.log("RESULTADO SERVICIO USER'S ORDERS: ", response.data?.code);
      return response.data;  
    } catch (error) {
      console.log("Error al obtener pedidos: ", error.response.data);
      return error.response.data;
    }
};

export const getRefresh = async () => {
  console.log("LLAMANDO SERVICIO REFRESH")
  try {
    const response = await PrivateApi.post(REFRESH_SUFIX);
      // response.json()
      //     .then(data => {
      //         console.log('ok');
      //     })
      console.log("RESULTADO SERVICIO REFRESH: ", response.data?.code);
      return response.data;  
    } catch (error) {
      console.log("Error refreshing: ", error.response.data);
      return error.response.data;
    }
};
