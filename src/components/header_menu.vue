<template>
     <div class="header-menu">
        
        <!-- <a @click=" router.push({ path: '/home' }) ">首页</a>
        <a  @click=" router.push({ path: '/contactus' }) ">联系我们</a>
        <a  @click=" router.push({ path: '/my_fabu_category_sele2' }) ">发布黄页</a>
        <a @click=" router.push({ path: '/my_fabu' }) ">我的</a> -->
        <!-- <van-tabbar-item to="/my_fabu" @click="clickMy" name="setting" icon="setting-o">我的</van-tabbar-item> -->
        <a href="/home">首页</a>
        <a href="/contactus">联系我们</a>
        <a href="/downloadapp">下载</a>
        <!-- <a href="/my_cart" class="tabbar-item" >
          <i class="van-icon van-icon-cart-o"></i>
          <span>购物车</span>
        </a> -->
        <!-- <a href="/my_fabu_category_sele2">发布黄页</a> -->
        <a href="/my_fabu">我的</a>
       
    </div>
  </template>
  
<script setup>
  // import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

  
</script>
  
  <style scoped>
 .header-menu {
    display: none;
    /* justify-content: space-around; */
    justify-content: space-between;
    background-color:white;
    padding: 10px 0;
    margin-left: 15px;
    margin-right: 15px;
}

/* 当窗口宽度大于700像素时显示 HeaderMenu */
@media (min-width: 700px) {
    .header-menu {
        display: flex;
    }
}

 .header-menu a {
    text-decoration: none;
    color: #333;
    padding: 10px 20px;
}
/*
.header-menu a:hover {
    background-color: #ddd;
} */


.header-menu a {
  text-decoration: none;
  color: rgb(64, 58, 58); /* 传统的链接颜色 */
}

.header-menu a:hover {
  color: red; /* 悬停时的颜色 */
}

.header-menu a:active {
  color: purple; /* 激活时的颜色 */
}
  </style>