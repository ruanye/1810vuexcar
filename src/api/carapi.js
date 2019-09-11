// api/carapi.js  购物车相关请求
import axios from '.';

/** 添加到购物车的请求
 * @param {*} good 添加到购物车的商品信息
 */
const addCar = good => axios.post('/addgood', good);

// eslint-disable-next-line import/prefer-default-export
export { addCar };
