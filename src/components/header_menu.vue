<template>
<!-- 顶部页头：只在 md（≥768px）及更大屏幕显示 -->
<header class="hidden md:flex justify-between items-center px-6 py-2 bg-white shadow-md fixed top-0 left-0 right-0 z-50 ">
  <div class="max-w-[800px] w-full mx-auto flex justify-between items-center px-6 py-4 ">
    <div class="text-2xl font-bold text-blue-600">忆福安文化平台</div>

  <nav class="flex space-x-8 text-gray-700 font-medium">
    <a href="/home" class="hover:text-blue-500">首页</a>
    <a href="/contactus" class="hover:text-blue-500">联系我们</a>
   
  
    <a href="/menu_setup" class="flex items-center hover:text-blue-500">
    
       个人信息
    </a>
    <a href="/my_fabu" class="flex items-center hover:text-blue-500">
      <!-- 头像图标 -->
       我的
    </a>
  </nav>
  </div>
</header>



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