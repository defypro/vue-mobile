import axios from "axios";

function createHttp(options = {}) {
    const _axios = axios.create(options);
    _axios.interceptors.response.use(
        response => {
            console.log('%c Request Success:', 'color: #4CAF50; font-weight: bold', response);
            const {data} = response;
            return data
        },
        error => {
            console.log('%c Request Error:', 'color: #EC6060; font-weight: bold', error.response);
            if (!error['response']) {
                return Promise.reject(error)
            }
            return Promise.reject(error.response);
        }
    );
    return _axios;
}

const http = createHttp();

http.create = function (options) {
    return createHttp(options);
};

export default http;