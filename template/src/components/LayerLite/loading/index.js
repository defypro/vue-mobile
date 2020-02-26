import Vue from 'vue';
import Loading from './src/main'

const constructor = Vue.extend(Loading);
let instance;

export default {
    open(options = {}) {
        if (!instance) {
            instance = new constructor({
                el: document.createElement('div')
            });
        }
        // if (instance.visible) return;

        instance.message = (typeof options === 'string' || typeof options === 'number') ? options : options.message;
        document.body.appendChild(instance.$el);

        Vue.nextTick(() => {
            instance.visible = true;
        });
    },

    close() {
        Vue.nextTick(() => {
            instance.visible = false;
        });
    }
};
