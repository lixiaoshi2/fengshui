
<template>

  <van-nav-bar title="找回密码" left-text="返回" @click=" router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
 
  <p class="px-10 text-gray-700 text-sm mt-4 md:mt-16">
  通过邮件地址找回密码，请用填写账户的邮件地址，然后登录邮箱打开链接，有重置密码的链接，如果找不到，<span class="text-red-500">请在垃圾邮件中查看 </span> 。
</p>
  <van-form class="px-6" style="margin-bottom:65px; margin-top:30px;">
    <!-- 在双括号里的router不要this，而在click里的参数则需要this变量 -->

    <van-field v-model="email" type="text" name="email" label="电子邮件" placeholder="您的电子邮件地址"
      :rules="[
        {
          required: true,  
          message: '请填写用于找回密码的电子邮件地址' 
        },
        { 
          validator: validateEmail, // 调用自定义验证方法
          message: '不正确的电子邮件格式' 
        }
        ]">
      

      validator: this.validateEmail, // 调用自定义验证方法
          message: 'Invalid email address'

    </van-field>

    
    <p style="margin-left: 15px; font-size: 13px; color:red" v-if="error">{{ error }}</p>


    <div style="margin: 16px; display: flex;  justify-content: center; /* 水平居中 */  align-items: center; /* 垂直居中 */ ">
      <!-- <van-button round block type="info" native-type="submit">注册</van-button> -->
      <van-button @click="postEmail" type="primary">找回密码</van-button>
    </div>
  </van-form>
  



</template>

<script setup>

import {ref} from 'vue'
import { useRouter,useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
// const store = useStore()
import https from '@/utils/request.js';
import { showSuccessToast,showDialog  } from 'vant';
import { el } from 'element-plus/es/locale/index.mjs';

// 假设 URL 为 http://example.com/?param1=value1&param2=value2
// http://192.168.1.127:5173/user_password_forget/?userid=1&token=c6h06c-7959435990dc9cf2fa2cdb9771af94f4
const params = new URLSearchParams(window.location.search);
const userid = params.get('userid'); // 获取参数 param1 的值
const token = params.get('token'); // 获取参数 param2 的值
console.log('userid22',userid)
console.log('linshitoken',token)


const email = ref('')  

const inputRight = ref('')

const error = ref('');

const isShow = () => {  //点击切换眼睛
    showeye.value = !showeye.value;
    if (showeye.value === true) {
      showornot.value = "password";
    } else {
      showornot.value = "text";
    }
  }

const validateEmail = (value) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value || regex.test(value)) {
    inputRight.value = 'right'
    return true;
  } else {
    inputRight.value = 'wrong'
    return false;
  }
}

// 提交电子邮件到服务器
 const postEmail = ()=>{
  console.log('input',inputRight.value)
  if ( inputRight.value == 'right'){
    // console.log('ok')
    const values = {
      'email':email.value
    }
    // showDialog({message:'请求已发送，请等待'});
    https.post('/api/user/fogetpassword/',values).then(response => {
      console.log('asdfas555111');
      console.log(response);
      if(response.error){
        alert(response.error)
      }else{
        showDialog({message:'修改密码请求已经发送到您的邮件地址，请检查'});
      }
      // showSuccessToast({ message: '密码修改已经提交了，请在电子邮件中重置', background: '#ff4444', duration: 5000,color: '#ff0000' });
      
      // 记住需要修改settings里的前端地址，从而改善

    }).catch(error => {
      console.log('出错了2');
      console.error(error);
      // showToast('请重新登录');
      showSuccessToast({ message: '修改密码请求已经发送到您的邮件地址，请检查', background: '#ff4444', duration: 5000,color: '#ff0000' });
    });

    }
  
 } 
  

</script>