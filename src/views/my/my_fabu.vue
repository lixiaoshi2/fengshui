<template>
  <div class="my-container">


    <van-nav-bar>
      <!-- 左侧：始终显示注册按钮 -->
      <template #left>
        <p @click="zhuce" class="text-blue-600 cursor-pointer">注册</p>
      </template>

      <!-- 中间：标题 -->
      <template #title>
        <p class="text-base font-semibold text-gray-800">
          <span v-if="isLoggedIn">欢迎{{ shortUsername }}</span>
          <span v-else>欢迎使用本平台</span>
        </p>
      </template>

      <!-- 右侧：已登录显示退出按钮，未登录显示登录按钮 -->
      <template #right>
        <p v-if="isLoggedIn" @click="logout" class="text-red-500 cursor-pointer">退出</p>
        <p v-else @click="login2" class="text-blue-600 cursor-pointer">登录</p>
      </template>
    </van-nav-bar>


    <van-space :size="20"></van-space>
    <!-- <van-cell @click="router.push('/orders')" style="  display: flex; font-size: small; color: #1989fa; text-decoration: underline; font-weight: bold;" title="所有订单" /> -->

    <van-cell title="所有订单" is-link style="
    display: flex;
    font-size: small;
    font-weight: bold;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    transition: background-color 0.2s;
  " @click="router.push('/orders')" />

    <van-row>
      <van-col span="8"> <a href="/orders" class="order-link"> <van-cell style="" title="待付款" icon="peer-pay" />
        </a></van-col>
      <!-- <van-col  @click=" router.push({ path: '/my_fabu_category_sele2' }) " span="12"> <van-cell style="" title="黄页发布"   icon="peer-pay" /></van-col> -->
      <!-- <van-col @click=" router.push({ path: '/my_post' }) " style="display: flex;align-items: center; justify-content: center;" span="12"> <van-cell  title="修改档案"  icon="manager-o" /></van-col> -->
      <van-col span="8"> <a href="/orders" class="order-link"> <van-cell style="" title="待发货" icon="peer-pay" />
        </a></van-col>

      <van-col @click="router.push('/orders')" style="display: flex;align-items: center; justify-content: center;" span="8">
        <van-cell title="已收货" icon="manager-o" /></van-col>




    </van-row>



    <van-space :size="20"></van-space>



    <van-space :size="20"></van-space>
    <van-cell style="  display: flex; font-size: small;" title="用户管理" />


    <van-row>
      <van-col style="display: flex;align-items: center; justify-content: center;" span="8">
        <van-cell title="用户信息" @click=" router.push({ path: '/user_detail2' }) " icon="manager-o" /></van-col>

      <van-col style="display: flex;align-items: center; justify-content: center;" span="8">
        <van-cell title="修改密码" @click=" router.push({ path: '/user_changepasswd' }) " icon="manager-o" />
      </van-col>
      <van-col style="display: flex;align-items: center; justify-content: center;" span="8">
        <van-cell title="地址" @click=" router.push({ path: '/useraddr' }) " icon="manager-o" />
      </van-col>

    </van-row>

    <van-row>
      <van-col style="display: flex;align-items: center; justify-content: center;" span="12">
        <van-cell title="修改电子邮件" @click=" router.push({ path: '/user_changeEmail' }) " icon="manager-o" /></van-col>

      <van-col style="display: flex;align-items: center; justify-content: center;" span="12">
        <van-cell title="修改手机号码" @click=" router.push({ path: '/user_changePhone' }) " icon="manager-o" /></van-col>

    </van-row>






    <!-- <van-space :size="20"></van-space>
  <van-cell style="  display: flex; font-size: small;" title="我的黄页订单" /> -->

 <van-space :size="20"></van-space>
    <!-- <van-cell style="  display: flex; font-size: small; font-weight: bold;" title="雇主操作" /> -->



    <!-- <van-space :size="20"></van-space>
  <van-cell style="  display: flex; font-size: small;" title="我购买的商品订单" /> -->




    <!-- <van-row>
      <van-col span="12"> <a href="/ordernow" class="order-link"> <van-cell style="" title="新增查找家政" icon="peer-pay" />
        </a>
      </van-col>

      <van-col span="12"> <a href="/getcleanorder" class="order-link"> <van-cell style="" title="查找记录"
            icon="peer-pay" /> </a>
      </van-col>



    </van-row> -->



    <van-space :size="20"></van-space>
    <van-cell style="  display: flex; font-size: small; font-weight: bold;" title="商品" />

    <van-row>

      <van-col span="12"> <a href="/addproduct" class="order-link"> <van-cell style="" title="新增商品" icon="peer-pay" />
        </a></van-col>
      <van-col span="12"> <a href="/mygraborder" class="order-link"> <van-cell style="" title="后台订单管理"
            icon="peer-pay" /> </a></van-col>

    </van-row>


    



  </div>
</template>
  


<script setup>

import https from '@/utils/request.js'
import { ref,onMounted,computed } from 'vue';
import {showToast} from 'vant';
import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

var listdata2 = ref([]);
const show = ref(false);



const username = ref(localStorage.getItem('username') || '')
const isLoggedIn = computed(() => !!username.value)

// 截取简短用户名：英文最多6字符，中文最多3字符
const shortUsername = computed(() => {
  if (!username.value) return ''
  const name = username.value
  const isChinese = /[\u4e00-\u9fa5]/.test(name)
  return isChinese ? name.slice(0, 4) : name.slice(0, 12)
})


// 注册登录
const zhuce = () => {
  console.log('注册');
  
  router.push('/user_register');
  
};

// 绑定推送手机的注册号到数据库
const bangding = () => {
  console.log('注册jpush');
  // 执行android webview认识的代码
  const userId = localStorage.getItem("user_id");
    // 检查 WebView 是否支持这个方法
    if (window.AndroidInterface) {
        window.AndroidInterface.sendUserId(userId);
        alert("调用成功")
    } else {
        console.log("AndroidInterface 不存在，可能不是在 WebView 里");
        alert("失败，AndroidInterface 不存在，可能不在webview里")
    }

    // 在这里添加获取fcm的token
    console.log('获取了userid',response.user_id)
    console.log("开始获取设备的token jpush")
  
};

const logout = () => {
  
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

const isAdmin = ref(false)
onMounted(() => {
  // 加载数据，写成了一个函数，这里的数据来自于一开始

  const user_id = localStorage.getItem('user_id');
  console.log('user_id', user_id)
  isLoggedIn.value = false
  console.log('da', isLoggedIn.value)
  if (user_id) {
    console.log('userid2',)
    isLoggedIn.value = true;
  }


  isAdmin.value = user_id == '1' || user_id === '33' || user_id === '23'



});

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



