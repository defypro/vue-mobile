import Vue from 'vue'
import Router from 'vue-router'
import beforeEach from './beforeEach'
import Home from '../views/Home.vue'

const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
};
Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(beforeEach);

export default router
