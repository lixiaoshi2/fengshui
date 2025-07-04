<script >

export default {
  data() {
    return {
      
    };
  },
};


</script>

<template>
    <div class="liebiao" style="display: flex;">
    <!-- 搜索块 -->
    <van-icon name="arrow-left" size="25" style="margin-top:15px;" @click=" this.$router.go(-1);" />
    <van-search style="width: 65%;" v-model="value" placeholder="请输入搜索关键词" />
    <van-button style="margin-top: 10px;width:25%" plain type="primary" size="small"
      @click="this.$router.push({ path: '/liebiao' })">发布活动</van-button>
  </div>
</template>

<style scoped>

</style>
