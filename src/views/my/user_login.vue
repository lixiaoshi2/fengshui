
<template>
  <div>

    <van-nav-bar title="用户登录" left-text="返回"  @click="router.go(-1);" left-arrow>
      <template #right>

        <van-icon name="question-o" size="18" @click="showImage = true" />
      </template>
    </van-nav-bar>

    <!-- 弹出图片窗口 -->
    <van-popup v-model:show="showImage" position="center" closeable round>
      <img src="/images/help2/zhuce.png" alt="帮助图片" style="max-width: 90vw; max-height: 80vh; border-radius: 8px" />
    </van-popup>


    <div class="text-sm text-gray-500 mt-2 p-4 space-y-1">

      <div class="flex items-center space-x-1">
        <p class="m-0 text-red-500">在微信里，不能登录，一定在浏览器中登录。</p>
        <van-icon name="question-o" size="18" @click="showImage = true" />
      </div>
      
      <p class="mt-3 text-red-500">请下载APP，更方便</p>
    </div>

    <van-form @submit="onSubmit">
      <van-field v-model="email" name="email" label="手机/email" placeholder="手机号码/电子邮件登录" 
        :rules="[{ required: true, message: '请填写手机号码或是email' }]" />
      <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]" />

      <div class="m-4">
        <div class="flex justify-center text-red-600 mb-2">
          {{ errorinfo }}
        </div>
        <div class="flex justify-center">
          <button type="submit" class="px-6 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
            登录
          </button>
        </div>
      </div>

      <div v-if="errorflag === 1" style="margin: 15px; color:red;">

      </div>



    </van-form>



    <div class="text-center mt-4">
      <span class="mr-2">没有账户</span>
      <router-link to="/user_register">
        <button class="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          跳转到注册页面
        </button>
      </router-link>
    </div>

    <div class="text-center mt-4">
      <span class="mr-2">忘记密码</span>
      <router-link to="/user_password_forget_email">
        <button class="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          至找回密码页面
        </button>
      </router-link>
    </div>


  </div>

  <!-- <img :src="imgurl" /> -->
  <!-- <img src="src/assets/icon/" + imgurl2 /> -->
  <!-- <img :src="@/assets/icon/huodong.jpg" /> -->
</template>


<script setup >


import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

import https from '@/utils/request.js';

// import requestFCMToken from '@/utils/fcmjs.js';
import userFunc from '@/utils/userFunc'; // 确保正确导入你的用户存储方法


const id = ref('');
const email = ref('');
const password = ref('');
const errorinfo = ref('');
const errorflag = ref(0);
const params = ref({});


const showImage = ref(false)


onMounted(() => {
  console.log('执行了 login，已经进入了 login 页面');
});

const onSubmit = async () => {
  // console.log('提交登录', { email: email.value, password: password.value });



  params.value = {
    username: email.value,
    password: password.value
  };

  try {
    const response = await https.post('/api/user/login/', params.value);
    console.log('登录成功', response);

    const token = response.data.access
    const token_refresh = response.data.refresh;
    console.log('response22',response)  //email,gender,user_id,username,token,refresh
    userFunc.saveLocalstorage(response.email,response.gender,response.user_id,response.username,token,token_refresh);
    localStorage.setItem("cleaner_id",response.cleaner_id)
    alert('您已登录成功，请直接访问')
    // 执行android webview认识的代码
    const userId = localStorage.getItem("user_id");

    // 在这里添加获取fcm的token
    console.log('获取了userid',response.user_id)
    console.log("开始获取设备的token jpush")
    // requestFCMToken(response.user_id)

    const redirectPath = route.query.redirecturl;
    if (redirectPath) {
      router.push(redirectPath);
      localStorage.removeItem('redirectPath');
    } else {
      router.push('/');
    }
  } catch (error) {
    console.log('登录错误', error);
    errorinfo.value = error.response?.data?.error?.[0] || '账户名或密码错误';
    errorflag.value = 1;
  }

}



</script>

<style scoped></style>