import config from '../config'
import http from '@/utils/http'
import modules from './modules'
import defineProperty from './defineProperty'

const _http = http.create({
    baseURL: config.apiURL,
});

function Api() {
    const target = this;
    Object.keys(modules).forEach(function (key) {
        defineProperty(target, key, _http);
    });
}

Api.prototype.setAuthorization = function (authorization) {
    _http.defaults.headers.common.Authorization = `Bearer ${authorization}`;
};

export default new Api();
