<template>
  <van-nav-bar title="用户信息" left-text="返回" @click=" router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <van-form @submit="onSubmit" style="margin-bottom:65px; margin-top:30px;">
    <!-- 在双括号里的router不要this，而在click里的参数则需要this变量 -->

    <!-- {{ id }} --><!-- 这个id来源于data里的this.$route.query.id,从url里获取 -->


    <van-field v-model="email" name="email" label="电子邮件" placeholder="请输入用户电子邮件地址" :value="email"
      :rules="[{ required: true, message: '请输入用户电子邮件地址' }]" />

    <van-field v-model="username" name="username" label="用户名" placeholder="请输入用户名" :value="username"
      :rules="[{ required: true, message: '请输入用户名' }]" />

    <van-field v-model="last_name" name="last_name" label="用户昵称" placeholder="请输入用户用户昵称" :value="last_name"
      :rules="[{ required: true, message: '请输入用户用户昵称' }]" />

    <van-field v-model="mobile" name="mobile" label="电话" placeholder="请输入用户电话" :value="mobile"
      :rules="[{ required: true, message: '请输入用户电话' }]" />

    <van-field name="male" label="单选框">
      <template #input>
        <van-radio-group v-model="male" direction="horizontal">
          <van-radio name="1">男</van-radio>
          <van-radio name="2">女</van-radio>
        </van-radio-group>
      </template>
    </van-field>


    <van-field style="display:none ;" v-model="user_role" name="user_role" value="user" />
    <van-field v-model="password" :type="showornot" name="password" label="密码" placeholder="请输入密码"
      :rules="[{ required: true, message: '请填写密码' }]">
      <template #button>
        <span @click="isShow">
          <van-icon name="closed-eye" v-if="showeye" />
          <van-icon name="eye-o" v-else />
        </span>
      </template>
    </van-field>


    <div class="flex justify-center my-4">
      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full">
        修改用户信息
      </button>
    </div>

  </van-form>
  <div style="text-align: center; margin-top: -20px;"> 已有账户，<a
      @click.prevent="router.push({ path: '/user_login' })">请登录</a></div>
</template>

<script setup>
import axios from 'axios';
import config from '@/global.config.js'
import md5 from 'js-md5'
// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';
import { useStore } from 'vuex'
import { showToast } from 'vant';
import { ref, onMounted, computed, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router'
// import { useHead } from '@vueuse/head'
const router = useRouter()
const route = useRoute()
// var userinfo = ref()
var email = ref('');
var password = ref('');

var mobile = ref('');

var showeye = ref(true);
var username = ref('');

var last_name = ref('');
// var male = ref(1);
var gender = ref(true);
var showornot = ref("password");




const isShow = () => {        //点击切换眼睛
  showeye.value = !showeye.value;
  if (showeye.value === true) {
    this.showornot = "password";
  } else {
    showornot.value = "text";
  }
}

const male = computed({
  get: () => (gender.value ? '1' : '2'),
  set: (val) => {
    gender.value = val === '1'
  }
})

const onSubmit = (values) => {
  // onSubmit(values) {
  console.log('submit2', values);



  if (male.value == '1') {
    gender.value = true
  }
  else {
    gender.value = false
  }

  console.log('dafa');

  const values2 = {
    "email": email.value,
    // "password": md5(this.password),
    "password": password.value,
    "mobile": mobile.value,
    "gender": gender.value,
    "username": username.value,
    "last_name": last_name.value,
  }
 
  console.log("value2", values2);
  const user_id = localStorage.getItem("user_id");
  console.log("user_id", user_id)

  https.put(('/api/user/' + user_id + '/info/'), values2).then(response => {
    console.log('asdfas555111');
    console.log(response);
  
    
    showToast('修改成功');
   

  }).catch(error => {
    
    console.error(error);
    showToast('出错了，请重新修改');
  });

}


const gender2 =ref('')
onMounted(() => {

  const user_id = localStorage.getItem("user_id");
  // console.log('userid', user_id)
  https.get(('/api/user/user/' + user_id + '/')).then(response => {
    console.log('asdfas555111');
    console.log(response);

    email.value = response.email;
    username.value = response.username;
    mobile.value = response.mobile;
    last_name.value = response.last_name;
   
    gender.value= response.gender;
    console.log('gender', gender.value)
     gender2.value = response.gender
   
    // showToast('删除成功');
    // this.reload;
    // listdata2.value = 
    // router.push( '/activitys_liebiao_geren');

  }).catch(error => {
    console.log('出错了2');
    console.error(error);
    showToast('请重新登录');
  });
}
);



</script>