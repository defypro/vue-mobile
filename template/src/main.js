import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/assets/css/reset.css'
import Vant from '@/components/Vant'
import LayerLite from '@/components/LayerLite'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import validate from '@/utils/validate'
import http from '@/utils/http'

Vue.use(Vant);
Vue.use(LayerLite);
Vue.use(VueAwesomeSwiper);

Vue.prototype.$validate = validate;
Vue.prototype.$http = http;

Vue.config.productionTip = false;
if (process.env.VUE_APP_API_ENV !== 'pro') {
  const VConsole = require('vconsole');
  new VConsole();
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
