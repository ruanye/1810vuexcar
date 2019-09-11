<template>
  <div></div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    // 在vuex里面拿到购物车的列表
    ...mapState({
      carlist: state => state.carlist,
    }),
  },
  created() {
    // 调用actions里面的请求购物车的方法
    this.getCarlist();
  },
  methods: {
    ...mapActions(['getCarlist']),
  },
};
</script>

<style>
</style>
