<script setup>

import { ref } from 'vue'
import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()   

const active = ref('home') 




const downloadApk = () => {
 alert('请不要在微信中打开，在浏览器中打开，请选择保存，选择信任')

  window.location.href = '/download/app-debug.apk'
}



</script>

<template>
   

<!-- 这段程序是写菜单 -->
<!-- <div class="footmenu">
  <van-tabbar v-model="active">
    <van-tabbar-item to="/" @click="clickHome" name="home" icon="home-o">首页</van-tabbar-item>
   
    <van-tabbar-item to="/contactus" name="contactus" icon="friends-o">帮助指导</van-tabbar-item>
    <van-tabbar-item @click="fabuhuangye"  name="/my_fabu_category_sele2" icon="friends-o">发布黄页</van-tabbar-item>
    <van-tabbar-item @click="mycart"  name="mycart" icon="friends-o">购物车</van-tabbar-item>
    <van-tabbar-item to="/my_fabu" @click="clickMy" name="setting" icon="setting-o">我的</van-tabbar-item>
  </van-tabbar>
  </div> -->


  <div class="footmenu">
  <nav class="tabbar">
    <a href="/" class="tabbar-item" @click="clickHome">
      <span class="van-icon van-icon-home-o"></span>
      <span>首页</span>
    </a>
    <a href="/contactus" class="tabbar-item">
      <i class="van-icon van-icon-question-o"></i>
      <span>联系我们</span>
    </a>
  
  
   

    <div @click="router.push('/mycart/')" class="tabbar-item" >
      <i class="van-icon van-icon-cart-o"></i>
      <span>购物车</span>
    </div>

    <div @click="router.push('/orders/')" class="tabbar-item" >
      <i class="van-icon van-icon-cart-o"></i>
      <span>我的订单</span>
    </div>


    
    <a href="/my_fabu" class="tabbar-item" >
      <i class="van-icon van-icon-friends-o"></i>
      <span>我的</span>
    </a>
  </nav>
</div>




</template>

<script setup>






</script>

<style scoped>


/* @media (min-width: 765px) {
  .footmenu {
    display: none;
  }
}

@media (max-width: 700px) {
  .headnav {
    display: none;
  }
  .footmenu {
    display:flex;
  }
} */


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
