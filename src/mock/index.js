// 引入mockjs
import Mock from 'mockjs';
import { login } from './login';

Mock.setup({
  timeout: 500, // 模拟请求延时2秒之后才返回数据
});
// 生成随机数据;
const data = Mock.mock({
  'list|6-10': [
    {
      'imgId|+1': 1,
      name: '@cname',
      imgUrl: '@img(640x300)',
      email: '@email',
    },
  ],
});
// 通过正则拦截请求路径来拦截ajax请求

Mock.mock(/\/banner/, (req) => {
  const { url } = req;
  const arr = url.split('?')[1].split('&');
  const obj = {};
  arr.map((item) => {
    // eslint-disable-next-line no-param-reassign
    item = item.split('=');
    console.log(item);
    // eslint-disable-next-line prefer-destructuring
    obj[item[0]] = item[1];
  });
  console.log(obj);
  return data;
});
Mock.mock(/\/cd/, login);
// ivewadmin mock
