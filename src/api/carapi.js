// api/carapi.js  购物车相关请求
import axios from '.';

/** 添加到购物车的请求
 * @param {*} good 添加到购物车的商品信息
 */
const addCar = good => axios.post('/addgood', good);
// 请求购物车列表
const getcarapi = () => axios.get('/carlist');
// eslint-disable-next-line import/prefer-default-export
export { addCar, getcarapi };
