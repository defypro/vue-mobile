import Vue from 'vue';
import Toast from './src/main'

const constructor = Vue.extend(Toast);

let instance;

function getInstance() {
    if (instance) {
        clearTimeout(instance.timer);
        return instance;
    }
    return new constructor({
        el: document.createElement('div')
    });
}

constructor.prototype.close = function () {
    this.visible = false;
    document.body.removeChild(this.$el);
};


const toast = (options = {}) => {
    let duration = options.duration || 2000;

    instance = getInstance();
    instance.message = (typeof options === 'string' || typeof options === 'number') ? options : options.message;

    document.body.appendChild(instance.$el);

    Vue.nextTick(() => {
        instance.visible = true;
        instance.timer = setTimeout(() => {
            instance.close();
        }, duration);
    });
};


export default toast
