
<template>


  <van-nav-bar title="用户注册" left-text="返回"  @click="router.go(-1);" left-arrow>
    <template #right>

      <van-icon name="question-o" size="18" @click="showImage = true" />
    </template>
  </van-nav-bar>

  <!-- 弹出图片窗口 -->
  <van-popup v-model:show="showImage" position="center" closeable round>
    <img src="/images/help2/zhuce.png" alt="帮助图片" style="max-width: 90vw; max-height: 80vh; border-radius: 8px" />
  </van-popup>




  <van-form style="margin-bottom:20px; margin-top:10px;">
    <!-- 在双括号里的router不要this，而在click里的参数则需要this变量 -->

    <!-- {{ id }} --><!-- 这个id来源于data里的this.$route.query.id,从url里获取 -->
    <div class="text-sm  p-4 space-y-1">
      
    <div class="flex items-center space-x-1">
      <p class="m-0 text-red-500">一定在浏览器打开，先完成注册，后点击下载安装手机App。</p>
      <van-icon name="question-o" size="18" @click="showImage = true" style="color: #60a5fa;"/>
    </div>
 </div>

    <div class="text-sm text-gray-500  p-4 space-y-1">
      <p>手机号码和电子邮件都可用来登录。</p>
      <p>电子邮件可用于找回密码。</p>
    </div>

    <van-field v-model="email" name="email" label="电子邮件" placeholder="请输入用户电子邮件地址" validate-trigger="onBlur"
      :rules="[{ required: true, message: '请输入用户电子邮件地址' }]" />

    <van-field v-model="user_name" name="user_name" label="用户昵称" placeholder="请输入用户用户昵称" validate-trigger="onBlur"
      :rules="[{ required: true, message: '请输入用户用户昵称' }]" />

    <van-field v-model="mobile" name="mobile" label="电话" placeholder="请输入用户电话" validate-trigger="onBlur"
      :rules="[{ required: true, message: '请输入用户电话' }]" />

    <!-- <van-field name="male" label="单选框">
      <template #input>
        <van-radio-group v-model="male" direction="horizontal">
          <van-radio name="1">男</van-radio>
          <van-radio name="2">女</van-radio>
        </van-radio-group>
      </template>
    </van-field> -->

    <van-field style="display:none ;" v-model="user_role" name="user_role" value="user" />



    <!-- 活动位置 -->
    <!-- <van-field v-model="user_password" type="tex" name="user_password" label="用户密码" placeholder="请填写用户密码"
            :rules="[{ required: true, message: '请填写用户密码' }]" /> -->

    <!-- <van-field v-model="user_password2" @blur="mimabijiao" type="password" name="user_password2" label="确认密码" placeholder="请填写确认密码"
            :rules="[{ required: true, message: '请填写确认密码' }]" /> -->

    <van-field v-model="password" :type="showornot" name="password" label="密码" placeholder="请输入密码" 
      :rules="[{ required: true, message: '请填写密码' }]">
      <template #button>
        <span @click="isShow">
          <van-icon name="closed-eye" v-if="showeye" />
          <van-icon name="eye-o" v-else />
        </span>
      </template>
    </van-field>

    <div style="display: flex; color: red; justify-content: center; "> {{ error }} </div>
    <div class="flex justify-center mt-4">
      <button @click="zhuce" class="px-6 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
        注册
      </button>
    </div>
  </van-form>
  <div class="text-center mt-4">
    <button @click.prevent="$router.push({ path: '/user_login' })"
      class="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
      已有账户，请登录
    </button>
  </div>
</template>

<script setup>
  // import axios from 'axios';
  // import config from '@/global.config.js'
  // import md5 from 'js-md5'
  // xuexi 
  // import apiFun from '@/utils/api.js'
  import https from '@/utils/request.js';
  import { useStore } from 'vuex'
  import { showToast } from 'vant';
  import  userFunc from '@/utils/userfunc.js'  
  import { useRouter,useRoute } from 'vue-router'
 import { ref } from 'vue';
 const router = useRouter()
 const route = useRoute()
 const error = ref('')
 const errorflag = ref('0')
var  email =ref('')
const  password = ref('')
const user_role= ref('user')
const mobile = ref('')
const showeye = ref(true)
let user_name = ref('')
const male = ref('1')
const xingbie = ref(true)
const showornot = ref('password')
const showImage = ref(false)


const isShow = () => {//点击切换眼睛
  showeye.value = !showeye.value;
  if (showeye.value === true) {
    showornot.value = "password";
  } else {
    showornot.value = "text";
  }
};

const zhuce = () => {
  error.value = ''
  if (male.value == '1') {
    xingbie.value = true
  }
  else {
    xingbie.value = false
  }
  var nickname = user_name.value
  console.log('nickname', user_name.value)
  console.log('nickname2', nickname)
  // console.log('asdf11111');
  var randomdata = userFunc.generateRandomCode();
  console.log('dafd', randomdata);
  if (user_name.value.length > 10) {
    user_name.value = user_name.value.slice(0, 10)
  }
  if (mobile.value.length > 14) {
    error.value = '电话太长了'
  }

  user_name.value = user_name.value + '_' + randomdata;
  console.log('username_2', user_name.value);

  const values = {
    "email": email.value,
    "password": password.value,
    // "password": md5(this.password),
    "mobile": mobile.value,
    "gender": xingbie.value,
    "username": user_name.value,
    "last_name": nickname,
  }

  console.log('value2', values);
  const inviteCode = route.query.invite_code
  if (email.value=='' || mobile.value=='' || password.value =='')
  {
    alert("信息不全，请补全注册信息")
  }else{


  https.post((`/api/user/register/?invite_code=${inviteCode}`), values).then(response => {
    
    // listdata2.value.splice(index, 1);
    if (response.error) {
      error.value = response.error
    } else {
      alert("注册成功，请登录")
      console.log("登录成功")
      router.push('/user_login');
    }


  }).catch(error => {
    console.log('出错了2');
    console.error(error);

  });
}

}

 

 
  
</script>