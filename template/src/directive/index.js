import sendsms from './sendsms'

const install = function (Vue) {
    if (install.installed) return;

    Vue.directive('sendsms', sendsms);

};

export default {
    install,
};
