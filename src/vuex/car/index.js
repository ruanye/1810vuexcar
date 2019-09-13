// car/index.js
// 引入购物车列表请求
import { getcarapi } from '../../api/carapi';
import * as Types from './mutation-type';

export default {
  namespaced: true, // 开启命名空间
  state: {
    carlist: [], // 购物车数据
  },
  actions: {
    // 请求购物车列表数据的action
    async getCarlist({ commit }) {
      const carlist = await getcarapi();
      commit(Types.SET_CAR_LIST, carlist);
    },
    changeAll({ commit, state }, val) {
      // 把购物车列表进行循环让单向选中和全选值（val）相等
      const newlist = state.carlist.map((item) => {
        // eslint-disable-next-line no-param-reassign
        item.hasS = val;
        return item;
      });
      // 提交更改选中值后的数据到mutations
      commit('changAll', newlist);
    },
  },
  mutations: {
    changAll(state, newlist) {
      // 改变选中值后的购物车列表进行重新赋值
      state.carlist = newlist;
    },
    // 修改state里面的carlist
    [Types.SET_CAR_LIST](state, payload) {
      state.carlist = payload;
    },
  },
  getters: {
    // getters 和computed完全相同的2个概念
    // 计算是否全选
    checkAll(state) {
      // return state.carlist.every(item => item.hasS == true);
      return !state.carlist.some(item => item.hasS == false);
    },
  },
};
