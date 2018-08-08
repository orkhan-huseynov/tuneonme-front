import config from '../config';
import axios from 'axios';

let profileAdapter = {
    checkEmailExists: (postData, fulfill, reject) => {
        axios.post(config.emailExistsUrl, postData)
            .then(res => {
                const data = res.data;
                const emailExists = data.responseContent;

                fulfill(emailExists);
            })
            .catch(err => {
                reject(err);
            });
    }
};

export default profileAdapter;