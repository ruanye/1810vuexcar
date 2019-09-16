<template>
  <div class="container">
    <label for="">
      全选
      <input class="car-list-check" type="checkbox" v-model="checkAllValue" />
    </label>
    <ul>
      <li class="car-list" v-for="item in carlist" :key="item.id">
        <input class="car-list-check" type="checkbox" v-model="item.hasS" />
        <div>
          <img :src="item.img" alt="" />
          <span @click="throttleAddCount(item.id)" class="sbtn">+</span>
          <span class="scount">{{ item.count }}</span>
          <span class="sbtn">-</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<!-- views/Car.vue -->
<script>
// 引入节流函数
import { createNamespacedHelpers } from 'vuex';
import { throttle } from '../lib/util';

// * (第1种写法)import { mapState, mapActions } from 'vuex';
// 创建命名空间帮助函数

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('car');
let vm;
export default {
  data() {
    return { id: '' };
  },
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
    vm = this;
  },
  methods: {
    throttleAddCount(id) {
      this.id = id;
      this.addCount(this.id);
    },
    // eslint-disable-next-line no-undef
    addCount: throttle(() => {
      // eslint-disable-next-line no-undef
      vm.actionsAddCount(vm.id);
    }, 1000),
    // car表示car模块
    // (第1种写法)...mapActions('car', ['getCarlist']),
    ...mapActions(['getCarlist', 'changeAll', 'actionsAddCount']),
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
.sbtn,
.scount {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 28px;
}
.sbtn {
  background-color: #409eff;
  user-select: none;
  cursor: pointer;
}
</style>
