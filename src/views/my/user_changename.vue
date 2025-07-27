
<template>

  <van-nav-bar title="修改电子邮件" left-text="返回" @click=" router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  
  <van-form style="margin-bottom:65px; margin-top:30px;">
    <!-- 在双括号里的router不要this，而在click里的参数则需要this变量 -->

    <van-field v-model="oldname"  name="email" label="原昵称"  :readonly="isReadOnly" >
    </van-field>


    <van-field v-model="newname"  name="newname" label="新昵称" placeholder="昵称"
      :rules="[{ required: true, message: '请填写新昵称' }]">
      
    </van-field>

    <div style="margin: 16px; display: flex;  justify-content: center; /* 水平居中 */  align-items: center; /* 垂直居中 */ ">
      <!-- <van-button round block type="info" native-type="submit">注册</van-button> -->
      <van-button @click="changeMail" type="primary">修改电子邮件</van-button>
    </div>
  </van-form>
  <div style="text-align: center; margin-top: -20px;"> 已有账户，<a
      @click.prevent="router.push({ path: '/user_login' })">请登录</a></div>



</template>

<script setup>

import {ref,onMounted} from 'vue'
import { useRouter,useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
// const store = useStore()
import https from '@/utils/request.js';
import { showSuccessToast,showFailToast  } from 'vant';

const email = ref('')  
const newname = ref('')
const oldname = ref('')
let doflag = 0
const changeMail = () =>{
  
  const user_id = localStorage.getItem("user_id")
  const values = { //这里真实的
  'last_name':newname.value,
  'user_id':user_id 
  
}


  https.put(('/api/user/update_name/'+user_id+'/'),values).then(response => {
    console.log('asdfas555111');
    console.log(response);
    
    localStorage.setItem("username",newname.value)
    alert('修改昵称成功，请返回')
    

  }).catch(error => {
    console.log('出错了2');
    console.error(error);
    // showToast('请重新登录');
  });

}


// 获取初始的电子邮件地址
onMounted(() => {
  oldname.value = localStorage.getItem("username")
  console.log('dianziyoujian', oldname.value)

});




  
</script>