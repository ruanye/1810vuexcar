import Vue from 'vue';
import Vuex from 'vuex';
import car from './car';
// vuex/index.js
Vue.use(Vuex);
const state = {
  carlist: [], // 购物车列表的数组
  name: 'lilei',
};
export default new Vuex.Store({
  state,
  mutations: {},
  actions: {},
  modules: {
    car, // 购物车相关的vuex会放到car的模块里
  },
});
