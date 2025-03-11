import PrivateApi from "../api/PrivateApi";

const LOGIN_SUFIX = process.env.REACT_APP_BACKEND_LOGIN_SUFIX;
// const BANNER_SUFIX = process.env.REACT_APP_BACKEND_BANNER_SUFIX;

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

// export const getBannerImages = async () => {
//     try {
//         const response = await PublicApi.get(BANNER_SUFIX);
//         return response.data;
        
//     } catch (error) {
//         console.log("Error al obtener imagenes:", error);
//     }
// };
