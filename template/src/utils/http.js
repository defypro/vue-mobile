import axios from 'axios'
import { apiUrl } from "@/config";

// allow use http client without Vue instance
const http = axios.create({
    baseURL: apiUrl,
    timeout: 10000
});

http.interceptors.request.use(
    config => {
        // config.withCredentials = true // 需要跨域打开此配置
        return config
    },
    error => {
        return Promise.reject(error)
    }
);

http.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        if (!error['response']) {
            return Promise.reject(error)
        }

        switch (error.response.status) {
            case 403:
                break;
            case 401:
                break;
            case 422:
                break;
            case 412:
                break;
        }

        return Promise.reject(error.response);
    }
);

export function setToken(token) {
    http.defaults.headers.common.Authorization = `${token}`;
}

export default http
