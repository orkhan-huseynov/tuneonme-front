import axios from 'axios';

const baseUrl = 'http://tuneon.me';
const apiController = axios.create({
    baseURL: baseUrl
});

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