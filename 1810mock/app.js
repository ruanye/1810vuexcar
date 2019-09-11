// app.js 后端
const express = require('express');
// 引入跨域中间件 中间都是函数
const cors = require('cors');
// 引入处理数据的中间件处理body
const bodyParser = require('body-parser');
// 启动服务器
const app = express();
const banner = require('./banner.js');
const { rfile, wfile } = require('./fsfile.js');
// 使用中间件进行跨域
app.use(cors());
// 解析json格式数据
app.use(bodyParser.json());
// 解析urlencode 格式数据
app.use(bodyParser.urlencoded({ extended: false }));
// 轮播图后端接口
app.get('/banner', (req, res) => {
  res.json(banner);
});
// 首页商品列表后端接口
app.get('/hl', async (req, res) => {
  const result = await rfile('goods.json');
  res.json(result);
});
// 分页接口 http://localhost:3000/list?page=3
app.get('/list', async (req, res) => {
  const page = +req.query.page; // 拿到前端传过来的页数
  const list = await rfile('goods.json');
  const pageData = list.slice((page - 1) * 5, page * 5);
  // 给前端一个标志 表示有没有下一次
  const hasMore = !(page * 5 > list.length);
  res.json({
    hasMore,
    pageData,
  });
});
// 详情页接口localhost:3000/detail/1
app.get('/detail/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    good: `id为${id}的商品信息`,
  });
});
// 添加商品接口
app.post('/addgood', async (req, res) => {
  // 前端传过来的数据
  const good = req.body;
  // 读取购物里面的数据
  let carlist = await rfile('carlist.json');
  // 购物车里面有没有这个商品 没有就添加并且数据为1 如果有数量在原来的基础上加1
  const singe = carlist.find(item => item.id == good.id);
  if (singe) {
    singe.count += 1;
    singe.hasS = true; // 增加选中状态
  } else {
    good.count = 1;
    good.hasS = true; // 增加选中状态
    carlist = [...carlist, good];
  }
  try {
    await wfile('carlist.json', carlist);
    res.json({
      code: 200,
      msg: '添加成功',
    });
  } catch (e) {
    res.json({
      code: 201,
      msg: '添加失败',
    });
  }
});
// 监听端口号
app.listen(3000, () => {
  console.log('服务器启动成功');
});
