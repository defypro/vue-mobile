import Loading from './loading';
import Toast from './toast';

const install = function (Vue, config = {}) {
    if (install.installed) return;

    Vue.$indicator = Vue.prototype.$loading = Loading;
    Vue.$toast = Vue.prototype.$toast = Toast;
};


if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export const toast = Toast;
export const loading = Loading;

export default {
    install,
    Loading,
    Toast
};