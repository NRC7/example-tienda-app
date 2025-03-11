import PrivateApi from "../api/PrivateApi";

const LOGIN_SUFIX = process.env.REACT_APP_BACKEND_LOGIN_SUFIX;
const REGISTER_SUFIX = process.env.REACT_APP_BACKEND_REGISTER_SUFIX;

export const getLogin = async (_email, _password) => {
    try {
        const response = await PrivateApi.post(LOGIN_SUFIX, {email: _email, password: _password});
        // response.json()
        //     .then(data => {
        //         console.log('ok');
        //     })
        return response.data;  
      } catch (error) {
        console.log("Error de autenticacion: ", error.response.data);
        return error.response.data;
      }
};

export const getRegister = async (_userName, _email, _password) => {
    try {
        const response = await PrivateApi.post(REGISTER_SUFIX, { user_name: _userName, email: _email, password: _password });
        // response.json()
        //     .then(data => {
        //         console.log('ok');
        //     })
        return response.data;  
      } catch (error) {
        console.log("Error durante registro: ", error.response.data);
        return error.response.data;
      }
};
