import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/assets/css/reset.css'
import Vant from '@/components/Vant'
import LayerLite from '@/components/LayerLite'
import validate from '@/utils/validate'
import http from '@/utils/http'
import api from '@/api'
import cache from '@/utils/cache'
import util from '@/utils/util'
import share from '@/utils/share'
import config from '@/config'
import directive from './directive'

Vue.use(Vant);
Vue.use(LayerLite);
Vue.use(directive);

Vue.prototype.$validate = validate;
Vue.prototype.$http = http;
Vue.prototype.$api = api;
Vue.prototype.$cache = cache;
Vue.prototype.$util = util;
Vue.prototype.$config = config;
Vue.prototype.$share = share;

Vue.config.productionTip = false;
if (process.env.VUE_APP_API_ENV !== 'pro') {
  const VConsole = require('vconsole');
  new VConsole();
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
