/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-unresolved */
<template>
  <div>
    <my-tab>列表</my-tab>
    <div class="container" ref="sEle" @scroll="slmore">
      <!-- views/List.vue -->
      <div class="list">
        <ul>
          <router-link
            :to="{ path: `/detail/`, query: { id: item.id } }"
            v-for="item in list"
            :key="item.id"
            tag="li"
          >
            <img :src="item.img" />
            <p>{{ item.name }}</p>
            <button class="btn" @click.stop="addCar(item)">
              添加到购物车
            </button>
          </router-link>
        </ul>

        这是列表
        <button
          :class="{ btn: hasMore, 'btn-default': !hasMore }"
          @click="loadmore"
        >
          {{ hasMore ? "点击加载更多" : "没有数据了" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import MyTab from "_c/MyTab.vue";
import { getPage } from "api/listApi";
import { addCar } from "api/carapi";

export default {
  name: "list",
  created() {
    this.getPageApi();
  },
  components: {
    MyTab
  },
  mounted() {},
  data() {
    return {
      page: 1, // 默认请求第一页
      list: [],
      hasMore: true // 默认有下一页，到底有没有下一页由我们请求回来的数据决定
    };
  },
  methods: {
    // 添加到购物车 发送添加到购物车的请求
    async addCar(item) {
      // 异常处理
      try {
        const { code, msg } = await addCar(item);
        if (code === 200) {
          alert(msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 封装滚动里面的加载更多事件
    slfn(ele, fn) {
      const el = this.$refs[ele];
      const { scrollHeight, scrollTop, clientHeight } = el;
      if (clientHeight + scrollTop + 10 > scrollHeight) {
        fn.apply(this);
      }
    },
    // 滚动事件
    slmore() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.slfn("sEle", this.loadmore);
      }, 13);
      // 获取到滚动的元素
    },
    async getPageApi() {
      // 如果没有下一页，就不在发请求了
      if (!this.hasMore) return;
      const { hasMore, pageData: list } = await getPage(this.page);
      // 是否有下页面赋值给this
      this.hasMore = hasMore;
      // 每次把请求回来的数据和原来的数据合并
      this.list = [...this.list, ...list];
    },
    loadmore() {
      // 加载更多的方法
      this.page = this.page + 1;
      this.getPageApi();
    }
  }
};
</script>
<style lang="less" scoped>
.btn-default {
  width: 200px;
  height: 60px;
  background: #e3e3e3;
  color: #000;
  font-size: 26px;
  border: none;
  outline: none;
  appearance: none;
  border-radius: 10px;
}
.btn {
  width: 200px;
  height: 60px;
  background: #409eff;
  color: #fff;
  font-size: 26px;
  border: none;
  outline: none;
  appearance: none;
  border-radius: 10px;
}
.btn:hover {
  opacity: 0.8;
}
.list {
  margin-bottom: 60px;
}
</style>
