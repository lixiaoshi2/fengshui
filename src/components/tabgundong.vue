

<template>
   
  <van-tabs>
    <van-tab v-for="item, index in tabmenu" :to="item.to" :title="item.title">
    
    </van-tab>
  </van-tabs>

  <!-- 可以滚动-->


</template>

<script >

export default {
  data() {
    return {
      tabmenu:[
        {
          to:"/home",
          title:'主页'
        },
        {
          to:"/liebiao",
          title:'发布活动'
        },
        {
          to:"/user_login",
          title:'登录'
        },
        {
          to:"/user_register",
          title:'注册'
        },
        {
          to:"/act_list",
          title:'活动列表'
        },
        {
          to:"/liebiao",
          title:'发布活动'
        },
        {
          to:"/act_list",
          title:'活动列表'
        },
        {
          to:"/liebiao",
          title:'发布活动'
        },
        
      ]



    };
  },
};


</script>
<style scoped>

</style>
