<template>
  <div>
    <label for="">
      全选
      <input class="car-list-check" type="checkbox" v-model="checkAllValue" />
    </label>
    <ul>
      <li class="car-list" v-for="item in carlist" :key="item.id">
        <input class="car-list-check" type="checkbox" v-model="item.hasS" />
        <div>
          <img :src="item.img" alt="" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// * (第1种写法)import { mapState, mapActions } from 'vuex';
// 创建命名空间帮助函数
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('car');
export default {
  computed: {
    // 在vuex里面拿到购物车的列表
    // (第1种写法)...mapState('car', ['carlist']),
    ...mapState(['carlist']),
    ...mapGetters(['checkAll']),
    checkAllValue: {
      get() {
        // 获取值
        return this.checkAll; // getters里面的值
      },
      set(val) {
        // 设置值
        //  checkAllValue会放在val上 val是全选的值
        this.changeAll(val);
      },
    },
  },
  created() {
    // 调用actions里面的请求购物车的方法
    this.getCarlist();
  },
  methods: {
    // car表示car模块
    // (第1种写法)...mapActions('car', ['getCarlist']),
    ...mapActions(['getCarlist', 'changeAll']),
  },
};
</script>

<style lang="less" scoped>
.car-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &-check {
    appearance: none; // 去除默认的按钮样式
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 1px solid #409eff;
    border-radius: 8px;
    position: relative;
  }
  &-check::before {
    content: "";
    position: absolute;
    display: inline-block;
    width: 20px;
    height: 20px;
    top: 5px;
    left: 10px;
  }
  &-check:checked::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 20px;
    color: #409eff;
    border-bottom: 2px solid;
    border-right: 2px solid;
    top: 30%;
    left: 20px;
    transform-origin: center;
    transform: translate(-50%, -30%) rotate(45deg);
    -webkit-transform: translate(-50%, -30%) rotate(45deg);
  }
}
</style>
