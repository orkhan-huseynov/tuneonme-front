import config from '../config';
import apiController from '../controllers/apiController';

class ProfileAdapter {

    static async checkEmailExists(postData) {
        try {
            const res = await apiController.post(config.emailExistsUrl, postData);
            const data = res.data;
            const emailExists = data.responseContent;

            return Promise.resolve(emailExists);
        } catch (error) {
            return Promise.reject(error.response);
        }
    }

    static async storeProfile(postData) {
        try {
            const response = await apiController.post(config.storeProfileUrl, postData);
            const responseData = response.data;

            if (responseData.responseCode === 1) {
                return Promise.resolve(true);
            } else {
                console.log(responseData.responseContent);
                return Promise.resolve(false);
            }
        } catch (error) {
            return Promise.reject(error.response);
        }
    }

}

export default ProfileAdapter;