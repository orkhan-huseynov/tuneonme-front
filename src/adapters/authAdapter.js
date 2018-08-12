import config from '../config';
import apiController from '../controllers/apiController';
import localStorageController from '../controllers/localStorageController';

class AuthAdapter {

    static async getToken(username, password) {
        try {
            const response = await apiController.post(config.getTokenUrl, {
                grant_type: 'password',
                client_id: process.env.REACT_APP_API_CLIENT_ID,
                client_secret: process.env.REACT_APP_API_CLIENT_SECRET,
                username: username,
                password: password,
                scope: '',
            });

            const responseData = await response.data;
            localStorageController.set('access_token', responseData.access_token);
            localStorageController.set('refresh_token', responseData.refresh_token);

            return Promise.resolve(responseData);

        } catch (error) {
            return Promise.reject(error.response);
        }
    }

    static async checkToken() {
        try {
            const response = await apiController.get(config.checkTokenUrl);
            const responseData = await response.data;

            return Promise.resolve(responseData.responseCode === 1);
        } catch (error) {
            console.log(error);
            return Promise.reject(error.response);
        }
    }

}

export default AuthAdapter;