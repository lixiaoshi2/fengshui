<template>
  <van-nav-bar title="用户信息" left-text="返回" @click=" router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <van-form @submit="onSubmit" style="margin-bottom:65px; margin-top:30px;">
    <!-- 在双括号里的router不要this，而在click里的参数则需要this变量 -->

    <!-- {{ id }} --><!-- 这个id来源于data里的this.$route.query.id,从url里获取 -->


    <van-field v-model="userid" name="userid" label="用户id" readonly placeholder="址" :value="userid"
      :rules="[{ required: true, message: '请输入用户电子邮件地址' }]" />

    <van-field v-model="email" name="email" label="电子邮件" readonly placeholder="请输入用户电子邮件地址" :value="email"
      :rules="[{ required: true, message: '请输入用户电子邮件地址' }]" />

    <van-field v-model="username" name="username" label="用户名" readonly placeholder="请输入用户名" :value="username"
      :rules="[{ required: true, message: '请输入用户名' }]" />

    <van-field v-model="last_name" name="last_name" label="用户昵称" readonly :value="last_name"
      :rules="[{ required: true, message: '请输入用户用户昵称' }]" />

    <van-field v-model="mobile" name="mobile" readonly label="电话" placeholder="请输入用户电话" :value="mobile"
      :rules="[{ required: true, message: '请输入用户电话' }]" />

    <van-field name="male" label="单选框">
      <template #input>
        <van-radio-group v-model="male" direction="horizontal">
          <van-radio name="1">男</van-radio>
          <van-radio name="2">女</van-radio>
        </van-radio-group>
      </template>
    </van-field>

  </van-form>
 

  <div class="flex justify-center space-x-4 mt-8">
  <button
    @click="router.push('/user_detail')"
    class="px-6 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
  >
    修改
  </button>

  <button
    @click="logout"
    class="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
  >
    退出登录
  </button>
</div>


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
var userid = ref('');

var last_name = ref('');
//  var male = ref(1);


var gender = ref(true);
var showornot = ref("password");


// 显示在 radio-group 中的字段，computed 双向绑定
const male = computed({
  get: () => (gender.value ? '1' : '2'),
  set: (val) => {
    backendMale.value = val === '1'
  }
})

const logout = () => {
  console.log('退出登录');
  localStorage.removeItem("user_id")
  localStorage.removeItem('token');
  localStorage.removeItem('refresh');

  // 导航到登录页面，你需要根据你的路由配置来确定登录页面的路径
  router.push('/user_login');

};

const isShow = () => {        //点击切换眼睛
  showeye.value = !showeye.value;
  if (showeye.value === true) {
    this.showornot = "password";
  } else {
    showornot.value = "text";
  }
}



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
    userid.value = response.id;
    gender.value = response.gender;



  }).catch(error => {
    console.log('出错了2');
    console.error(error);
    showToast('请重新登录');
  });
}
);



</script>