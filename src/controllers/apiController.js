import axios from 'axios';
import localStorageController from "./localStorageController";

const baseUrl = 'http://tuneon.me';
const accessToken = localStorageController.get('access_token');
let apiController;
if (accessToken !== undefined) {
    apiController = axios.create({
        baseURL: baseUrl,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    });
} else {
    apiController = axios.create({
        baseURL: baseUrl,
        headers: {
            'Accept': 'application/json',
        }
    });
}


apiController.interceptors.response.use(
    response => response,
    error => {
        const { status } = error.response;
        console.log(`API error: ${status}`);
        // TODO: refresh token if status is 401
        return Promise.reject(error);
    }
);

export default apiController;