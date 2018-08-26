import axios from 'axios';
import localStorageController from "./localStorageController";

const baseUrl = 'http://tuneon.me';

let apiController = axios.create({
    baseURL: baseUrl,
    headers: {
        'Accept': 'application/json',
    }
});

apiController.interceptors.request.use(
    config => {
        const accessToken = localStorageController.get('access_token');
        if (accessToken !== undefined) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

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