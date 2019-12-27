import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import VueResource from 'vue-resource';
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2';
import store from "./store";

 
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(require('vue-moment'))
Vue.use(VueSweetalert2);
Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(axios);
Vue.use(VueResource)

Vue.filter('currency', function (value) {
  return '₹' + parseFloat(value).toLocaleString();
});
const router = new VueRouter({
  routes:Routes,
  mode: "history"
}) 

new Vue({
  render: h => h(App),
  router:router,
  store
}).$mount('#app')
