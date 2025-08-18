<template>

  <div class="footmenu">
    <nav class="tabbar">
      <a href="javascript:void(0)" @click="goHome" class="tabbar-item">
        <span class="van-icon van-icon-home-o"></span>
        <span>首页</span>
      </a>
      <a href="/contactus" class="tabbar-item">
        <i class="van-icon van-icon-question-o"></i>
        <span>联系我们</span>
      </a>




      <div @click="router.push('/mycart/')" class="tabbar-item">
        <i class="van-icon van-icon-cart-o"></i>
        <span>购物车</span>
      </div>

      <div @click="router.push('/orders/')" class="tabbar-item">
        <i class="van-icon van-icon-cart-o"></i>
        <span>我的订单</span>
      </div>



      <a href="/my_fabu" class="tabbar-item">
        <i class="van-icon van-icon-friends-o"></i>
        <span>我的</span>
      </a>
    </nav>
  </div>




</template>


<script setup>

import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()




const goHome = () => {
  window.location.href = '/';  // 硬刷新跳转首页
};


const downloadApk = () => {
  alert('请不要在微信中打开，在浏览器中打开，请选择保存，选择信任')

  window.location.href = '/download/app-debug.apk'
}



</script>


<style scoped>
@media (min-width: 765px) {
  .footmenu {
    display: none;
  }
}

@media (max-width: 700px) {
  .headnav {
    display: none;
  }

  .footmenu {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    border-top: 1px solid #ddd;
    z-index: 1000;
    justify-content: space-around;
    padding: 0.5rem 0;
  }

  .tabbar {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
  }

  .tabbar-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-size: 12px;
    color: #333;
    text-decoration: none;
    flex: 1;
  }

  .tabbar-item i.icon {
    font-size: 20px;
    margin-bottom: 5px;
  }

  .tabbar-item span {
    font-size: 12px;
  }

  .tabbar-item:hover {
    color: #007bff;
  }
}
</style>
