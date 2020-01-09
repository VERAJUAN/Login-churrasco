import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from "vuelidate";
import Login from '../views/Login.vue'
import Account from '../views/Account.vue'

Vue.use(VueRouter);
Vue.use(Vuelidate);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/account',
    name: 'account',
    component: Account
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});


router.beforeEach((to, from, next) => {
  if (to.path != '/login' && sessionStorage.length == 0) {
    next({
      path: '/login'
    });
  } else {
    next();
  }
});
router.beforeEach((to, from, next) => {
  if (to.path != '/account' && sessionStorage.length > 0) {
    next({
      path: '/account'
    });
  } else {
    next();
  }
});


export default router
