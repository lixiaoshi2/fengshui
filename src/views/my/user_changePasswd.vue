
<template>

  <van-nav-bar title="修改密码" left-text="返回" @click=" router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <van-form style="margin-bottom:65px; margin-top:60px;">
    <!-- 在双括号里的router不要this，而在click里的参数则需要this变量 -->

    <van-field v-model="password" :type="showornot" name="password" label="新密码" placeholder="输入新密码"
      :rules="[{ required: true, message: '请填写新密码' }]">
      <template #button>
        <span @click="isShow">
          <van-icon name="closed-eye" v-if="showeye" />
          <van-icon name="eye-o" v-else />
        </span>
      </template>
    </van-field>

    <van-field v-model="password2" :type="showornot" name="password2" label="确认新密码" placeholder="请再次输入密码"
      :rules="[{ required: true, message: '请再次填写密码' }]">
      <template #button>
        <span @click="isShow">
          <van-icon name="closed-eye" v-if="showeye" />
          <van-icon name="eye-o" v-else />
        </span>
      </template>
      
    </van-field>
    <p style="margin-left: 15px; font-size: 13px; color:red" v-if="error">{{ error }}</p>


    <div style="margin: 16px; display: flex;  justify-content: center; /* 水平居中 */  align-items: center; /* 垂直居中 */ ">
      <!-- <van-button round block type="info" native-type="submit">注册</van-button> -->
      <van-button @click="changePasswd" type="primary">修改密码</van-button>
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
import { showSuccessToast  } from 'vant';

const email = ref('')  
const password = ref('')  
const password2 = ref('')  
let showeye = ref(false)
const showornot = ref("password")

const error = ref('');
    
const isShow = () => {  //点击切换眼睛
    showeye.value = !showeye.value;
    if (showeye.value === true) {
      showornot.value = "password";
    } else {
      showornot.value = "text";
    }
  }
  let doflag = 0
  const changePasswd = () =>{
    if (password.value!=password2.value) {
            error.value = '两次输入的密码不一样!';
            doflag = 0;
            // console.log('buyingyang')
            // showSuccessToast({ message: '密码不一样', background: '#ff4444',duration: 5000, color: '#ee0a24' })
          } else {
            error.value = '';
            // 如果需要其他操作，可以在这里执行
            doflag = 1
            console.log('yiyang')
          }

    const user_id = localStorage.getItem("user_id")
    const values = { //这里真实的
    'password':password.value,
    'user_id':user_id
  }
 if (doflag==1){


    https.put(('/api/user/'+user_id+'/password/'),values).then(response => {
      console.log('asdfas555111');
      console.log(response);
      showSuccessToast({ message: '密码修改成功', background: '#ff4444', duration: 5000,color: '#ff0000' });
      

    }).catch(error => {
      console.log('出错了2');
      console.error(error);
      // showToast('请重新登录');
    });

  }
  }
</script>