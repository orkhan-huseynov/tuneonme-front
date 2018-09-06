import config from '../config';
import apiController from '../controllers/apiController';

class levelAdapter {
    static async getLevels() {
        try {
            const response = await apiController.get(config.getLevels);
            const responseData = response.data;

            if (responseData.responseCode === 1) {
                return Promise.resolve(responseData.responseContent);
            } else {
                console.log(responseData.responseContent);
                return Promise.resolve(false);
            }
        } catch (error) {
            return Promise.reject(error.response);
        }
    }
}

export default levelAdapter;