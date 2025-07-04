
<template>

  <van-nav-bar title="修改手机号码" left-text="返回" @click=" router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <van-form style="margin-bottom:65px; margin-top:30px;">
    <!-- 在双括号里的router不要this，而在click里的参数则需要this变量 -->

    <van-field v-model="oldPhone"  name="oldPhone" label="原手机"  :readonly="isReadOnly" >
    </van-field>

    <van-field v-model="phone"  name="phone" label="新手机" placeholder="输入新手机号码"
      :rules="[{ required: true, message: '请填写新手机号码' }]">
      
    </van-field>

    


    <div style="margin: 16px; display: flex;  justify-content: center; /* 水平居中 */  align-items: center; /* 垂直居中 */ ">
      <!-- <van-button round block type="info" native-type="submit">注册</van-button> -->
      <van-button @click="changePhone" type="primary">修改手机号码</van-button>
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
import {  showFailToast, showSuccessToast,showToast  } from 'vant';

const phone = ref('')
const oldPhone = ref('')

const changePhone = () => {

  const user_id = localStorage.getItem("user_id")
  const values = { //这里真实的
    'phone': phone.value,
    'user_id': user_id
  }


  https.put(('/api/user/phone/' + user_id + '/'), values).then(response => {
    console.log('asdfas555111');
    console.log(response.error);
    if (response.error == '该号码已被其他用户占用') {
      // showSuccessToast({ message:'此号码已被他人使用' , background: '#ff4444', duration: 5000,color: '#ff0000' });
      // showToast({ message:'此号码已被他人使用' , duration: 5000 });
      // showFailToast('此号码已被他人使用');
      showFailToast({ message:'此号码已被他人使用' , background: '#ff4444', duration: 3000,color: '#ff0000' });
    }
    else {
      showSuccessToast({ message: '号码修改成功', background: '#ff4444', duration: 3000, color: '#ff0000' });
    }

  }).catch(error => {
    console.log('出错了2');
    console.error(error);
    showSuccessToast({ message: '密码过期了，请登录账户', background: '#ff4444', duration: 5000, color: '#ff0000' });
    // showToast('请重新登录');
  });

}
// 获取现在手机号码
onMounted(() => {
  const user_id = localStorage.getItem("user_id")
  console.log('user_id',user_id)
  https.get('/api/user/phone/'+user_id+'/').then(response => {
    console.log('获取到查询的家庭旅馆');
    console.log(response);
    if (response.mobile !='' ){
      oldPhone.value = response.mobile
    }


  }).catch(error => {
    console.log('获取手机号码出错');
    console.error(error);
    // showToast('请重新登录');
  });


});

</script>