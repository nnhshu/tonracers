import axios from 'axios';

// host api
const host = "https://api-test.tfarm.io";
// list api
const urlRegisterNoHash = host + '/v1/user/loginTelegramNoHash';

const RegisterUserNoHash = async (loginPayload) => {
    try {
        var common_axios = axios.create({
            baseURL: urlRegisterNoHash
        });
        const response = await common_axios.post(urlRegisterNoHash, loginPayload);
        return response;
    } catch (error) {
        console.log('Error:', error);
        return error.response;
    }
}

export {
    RegisterUserNoHash,
};

export default host;