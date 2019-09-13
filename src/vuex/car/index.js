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
      // 全选的值是val 全选是选中 每一项也都是选中 全选不是选中每一项也都不是选中
      const newlist = state.carlist.map((item) => {
        // eslint-disable-next-line no-param-reassign
        item.hasS = val;
        return item;
      });
      // newlist 修改完选中状态的数组
      commit('changAll', newlist);
    },
  },
  mutations: {
    changAll(state, newlist) {
      state.carlist = newlist;
    },
    // 修改state里面的carlist
    [Types.SET_CAR_LIST](state, payload) {
      state.carlist = payload;
    },
  },
  getters: {
    // 计算是否全选
    checkAll(state) {
      // return state.carlist.every(item => item.hasS == true);
      return !state.carlist.some(item => item.hasS == false);
    },
  },
};
const arr = [{ hasS: false }, { hasS: true }];
