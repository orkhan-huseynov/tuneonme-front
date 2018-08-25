import axios from 'axios';
import localStorageController from "./localStorageController";

const baseUrl = 'http://tuneon.me';
const accessToken = localStorageController.get('access_token');
let fileApiController;
if (accessToken !== undefined) {
    fileApiController = axios.create({
        baseURL: baseUrl,
        headers: {
            'Authorization': `Bearer ${localStorageController.get('access_token')}`,
            'Content-Type': 'multipart/form-data',
        }
    });
} else {
    fileApiController = axios.create({
        baseURL: baseUrl,
        headers: {
            'Accept': 'application/json',
        }
    });
}


fileApiController.interceptors.response.use(
    response => response,
    error => {
        const { status } = error.response;
        console.log(`API error: ${status}`);
        // TODO: refresh token if status is 401
        return Promise.reject(error);
    }
);

export default fileApiController;