<template>
  <div class="my-container">
     <!-- <van-nav-bar @click="router.go(-1);" left-text="返回"  > -->  
     <van-nav-bar  >
      <template #left>
         <p  @click="zhuce">注册</p>
      </template>

      <template #right>
         <p v-if="isLoggedIn" @click="logout">退出登录</p>
        <p @click="login2" v-else>请登录</p>

      </template>
      <template #title>
        <p v-if="isLoggedIn" >尊敬的客户您好！</p>
        <p @click="login2() " v-else>请登录</p>
      </template>
      
      </van-nav-bar>
  
      <!-- <p @click="login2()" >请登录 </p> -->
  <!-- <van-cell title="URL 跳转" is-link url="https://github.com" />
  <van-cell title="路由跳转" is-link to="index" /> -->
  <van-space :size="20"></van-space>
  <!--
  <van-cell style="font-size: small;" title="组织活动" />
   <van-row>
    <van-col style="" span="12"> <van-cell  title="个人登录信息"   icon="records"/></van-col>
    <van-col span="12"> <van-cell style="" title="个人详细信息"  icon="location-o" /></van-col>
  </van-row>  -->
  <!-- <van-space :size="20"></van-space>
  <van-cell style="  display: flex; font-size: small;" title="组织活动" />
  <van-row> 
    <van-col style="display: flex;align-items: center; justify-content: center;" span="12"> 
      <van-cell @click=" router.push({ path: '/activitys_liebiao_geren' }) " title="活动管理"  icon="manager-o" /></van-col>
    <van-col span="12"> <van-cell to="/activity_fabu" style="" title="活动发布"   icon="peer-pay" /></van-col>
  
  </van-row> -->
  
  <van-space :size="20"></van-space>
  <van-cell style="  display: flex; font-size: small;" title="用户管理" />
  
  <van-row> 
    <van-col style="display: flex;align-items: center; justify-content: center;" span="12"> 
    <van-cell  title="修改密码" @click=" router.push({ path: '/user_changepasswd' }) "  icon="manager-o" />
  </van-col>
    
  <van-col style="display: flex;align-items: center; justify-content: center;" span="12"> 
    <van-cell  title="地址管理" @click=" router.push({ path: '/address' }) " icon="manager-o" /></van-col>
  
  </van-row>
  <van-row> 
    <van-col style="display: flex;align-items: center; justify-content: center;" span="12"> 
    <van-cell  title="修改电子邮件" @click=" router.push({ path: '/user_changeEmail' }) " icon="manager-o" /></van-col>
    
    <van-col style="display: flex;align-items: center; justify-content: center;" span="12"> 
    <van-cell  title="修改手机号码" @click=" router.push({ path: '/user_changePhone' }) " icon="manager-o"/></van-col>
  
  </van-row>
  
  
  <van-space :size="20"></van-space>
  <van-cell style="  display: flex; font-size: small; font-weight: bold;" title="黄页管理" />
  
  <van-row> 
    <van-col  span="12">  <a href="/my_fabu_category_sele2" class="order-link"> <van-cell style="" title="黄页发布"   icon="peer-pay" />  </a></van-col>
    <!-- <van-col  @click=" router.push({ path: '/my_fabu_category_sele2' }) " span="12"> <van-cell style="" title="黄页发布"   icon="peer-pay" /></van-col> -->
    <van-col @click=" router.push({ path: '/my_post' }) " style="display: flex;align-items: center; justify-content: center;" span="12"> <van-cell  title="我的发布"  icon="manager-o" /></van-col>
    
  
    <!-- <van-col @click=" router.push({ path: '/my_post' }) " style="display: flex;align-items: center; justify-content: center;" span="24"> <van-cell  title="保洁发布管理"  icon="manager-o" /></van-col>
    <van-col  to="/post_info" @click=" router.push({ path: '/my_fabu_category_sele2' }) " span="12"> <van-cell style="" title="保洁发布"   icon="peer-pay" /></van-col> -->
  
  </van-row>
  
  <!-- <van-space :size="20"></van-space>
  <van-cell style="  display: flex; font-size: small;" title="我的黄页订单" /> -->
  
  <van-row> 
    <van-col @click=" router.push({ path: '/myorder' }) " style="display: flex;align-items: center; justify-content: center;" span="24"> <van-cell  title="黄页订单"  icon="manager-o" /></van-col>
    <!-- <van-col  to="/post_info" @click=" router.push({ path: '/my_post' }) " span="12"> <van-cell style="" title="我要下单"   icon="peer-pay" /></van-col> -->
  </van-row>
  
  <van-space :size="20"></van-space>
  <van-cell style="  display: flex; font-size: small; font-weight: bold;" title="商品订单" />
  
  
  
  <!-- <van-space :size="20"></van-space>
  <van-cell style="  display: flex; font-size: small;" title="我购买的商品订单" /> -->
  
  <van-row> 
    <van-col @click=" router.push({ path: '/mygoodsorder' }) " style="display: flex;align-items: center; justify-content: center;" span="12"> <van-cell  title="我的订单"  icon="manager-o" /></van-col>
    <van-col  span="12">  <a href="/myfoodorder" class="order-link"> <van-cell style="" title="我的美食订单"   icon="peer-pay" />  </a></van-col>
  </van-row>

  
  <van-space :size="20"></van-space>
  <van-cell style="  display: flex; font-size: small; font-weight: bold;" title="商家管理" />
  
  <van-row> 
    <van-col  @click=" router.push({ path: '/my_fabu_category_sele2' }) " span="12"> <van-cell style="" title="商品发布"   icon="peer-pay" /></van-col>
    <van-col  to="/post_info" @click=" router.push({ path: '/my_post' }) " span="12"> <van-cell style="" title="我发布的商品"   icon="peer-pay" /></van-col>
  </van-row>
  <van-row> 
    <van-col @click=" router.push({ path: '/goodsorders_guanli' }) " style="display: flex;align-items: center; justify-content: center;" span="12"> <van-cell  title="我经营商品订单"  icon="manager-o" /></van-col>
    <van-col  to="/post_info" @click=" router.push({ path: '/my_yizhan' }) " span="12"> <van-cell style="" title="我的仓库商品"   icon="peer-pay" /></van-col>
  </van-row>
  
  <van-space :size="20"></van-space>
  <van-cell style="  display: flex; font-size: small;font-weight: bold;" title="驿站管理" />
  
  <van-row> 
    <van-col @click=" router.push({ path: '/address_yizhan' }) " style="display: flex;align-items: center; justify-content: center;" span="12"> <van-cell  title="驿站管理"  icon="manager-o" /></van-col>
    <van-col  @click=" router.push({ path: '/kucun_add' }) "   span="12"> <van-cell style="" title="驿站库存"   icon="peer-pay" /></van-col>
  </van-row>

  <van-row> 
    <van-col @click=" router.push({ path: '/yizhanorder_handle' }) " style="display: flex;align-items: center; justify-content: center;" span="12"> <van-cell  title="驿站订单"  icon="manager-o" /></van-col>
    
    <van-col  span="12">  <a href="/yizhan_tongji" class="order-link"> <van-cell style="" title="驿站统计"   icon="peer-pay" />  </a></van-col>
    <!-- <van-col  to="/yizhan_tongji" @click="tongji" span="12"> <van-cell style="" title="驿站统计"   icon="peer-pay" /></van-col> -->
  </van-row>
  
  <van-space :size="20"></van-space>
  <van-cell style="  display: flex; font-size: small; font-weight: bold;" title="超级管理" />
  
  <van-row> 
    <van-col @click=" router.push({ path: '/yizhanorder_handle' }) " style="display: flex;align-items: center; justify-content: center;" span="12"> <van-cell  title="驿站订单"  icon="manager-o" /></van-col>
    
    <van-col  span="12">  <a href="/superuser_orders" class="order-link"> <van-cell style="" title="查看他人订单"   icon="peer-pay" />  </a></van-col>
    <!-- <van-col  to="/yizhan_tongji" @click="tongji" span="12"> <van-cell style="" title="驿站统计"   icon="peer-pay" /></van-col> -->
  </van-row>
  




  <van-space :size="20"></van-space>
  <van-cell style="  display: flex; font-size: small; font-weight: bold;" title="超级管理" />



  </div>
  </template>
  
  


<script setup>

import https from '@/utils/request.js'
import { ref,onMounted, } from 'vue';
import {showToast} from 'vant';
import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

var listdata2 = ref([]);
const show = ref(false);
const isLoggedIn = ref(false)

const gotoDetails = (id) => {
  console.log('id',id);
  router.push({
    path: '/activity_detail', //${date.getFullYear() }
    query: {
      id
    }
  });
};

// 注册登录
const zhuce = () => {
  console.log('注册');
  
  router.push('/user_register');
  
};

const logout = () => {
  console.log('退出登录');
  localStorage.removeItem("user_id")
  localStorage.removeItem('token');
  localStorage.removeItem('refresh');

  // 导航到登录页面，你需要根据你的路由配置来确定登录页面的路径
  router.push('/user_login');
  
};
const login2 = () =>{
  
  console.log('dianjile ')
  router.push('/user_login/').then(() => {
          console.log('Navigation to /user_login successful');
          
        })
        .catch(err => {
          console.error('Navigation error:', err);
        });
}
  
// changepasswd()
const changepasswd = () =>{
  console.log('asdf')
}
// 获取我名下的驿站
const getmyyizhan = ()=>{

  https.get('/api/user/yizhan_addr/myyizhan').then(response => {
      console.log('asdfas555111');
      console.log(response);
      // router.push('/my_post')
   

    }).catch(error => {
      console.log('出错了2');
      console.error(error);
      
    });
}

onMounted(() => {
  // 加载数据，写成了一个函数，这里的数据来自于一开始
  
  const user_id = localStorage.getItem('user_id');
  console.log('user_id',user_id)
  isLoggedIn.value = false
  console.log('da',isLoggedIn.value)
  if (user_id) {
    console.log('userid2',)
    isLoggedIn.value = true;
  }
  
  
  
}
);

</script>



<!-- 
<script >
// import tupian from '../assets/icon/huodong.jpg'
import { useRouter,useRoute } from 'vue-router'
export default {
  data() {
    return {
    };
  },
};


</script> -->


<style scoped>
.my-container{
  background-color:#F4F2F2 ;
  margin-bottom: 50px;
}
.van-cell__title{
  padding-left: -20px;
}
</style>



