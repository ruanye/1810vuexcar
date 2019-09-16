// main.js
import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import Vant from 'vant';
import router from './router';
import store from './vuex';
import './assets/font.css';
import 'vant/lib/index.css';
import App from './App.vue';
// 在开发环境的情况下引入mock/index.js
// eslint-disable-next-line global-require
// if (process.env.NODE_ENV === 'development') require('./mock');

Vue.use(Vant);
Vue.use(VueAwesomeSwiper /* { default global options } */);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
