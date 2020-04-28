import modules from './modules'

function defineProperty(target, key, http) {
    Object.defineProperty(target, key, {
        configurable: false,
        get: function () {
            const options = modules[key];
            if (typeof options === "function") {
                return options;
            }
            const req = async (params = {}, isQuery = false) => {
                let url = options.path;
                const IS_GET = options.method.toUpperCase() === 'GET';
                if (IS_GET) {
                    params['v'] = (new Date()).valueOf()
                } else {
                    if (isQuery || isQuery instanceof Object) {
                        let query = '';
                        const paramsTemp = isQuery instanceof Object ? isQuery : params;
                        Object.keys(paramsTemp).forEach(function (key) {
                            query += key + '=' + paramsTemp[key] + '&';
                        });

                        if (query.length > 0) {
                            query = '?' + query.substr(0, query.length - 1);
                        }
                        url += query;
                    }
                }
                try {
                    const res = await http({
                        method: options.method,
                        url,
                        [IS_GET ? 'params' : 'data']: params,
                    });
                    return Promise.resolve(res);
                } catch (e) {
                    return Promise.reject(e);
                }

            };
            return req;
        }
    });
}

export default defineProperty;