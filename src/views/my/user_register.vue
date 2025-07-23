<template>
  <div class="md:mt-10"></div>

  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-[6vh] px-4">
    <div class="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
      <div class="flex items-center justify-center mb-6 md:mt-20">
        <span class="text-2xl font-bold text-orange-500 tracking-wide">注册新用户</span>
      </div>

      <div class="text-center text-gray-400 text-xs mb-4 font-semibold">
        在浏览器中打开本页面，<br> 否则将无法完成登录！(APP不用)
      </div>

      <form @submit.prevent="handleRegisterSubmit" class="space-y-4">
        <input v-model="email" placeholder="电子邮件，如无可用电话代替" required class="w-full px-4 py-2 border rounded-md" />
        <input v-model="mobile" type="mobile" placeholder="电话" required class="w-full px-4 py-2 border rounded-md" />
        
        <div class="relative">
          <input
            v-model="password"
            :type="passwordFieldType" placeholder="密码"
            required
            class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none pr-10"
          />
          <span
            class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
            @click="togglePasswordVisibility('password')" >
            <svg v-if="passwordFieldType === 'password'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18.84 10.12a.75.75 0 010 .76c-2.3 3.4-6.07 5.12-9.25 5.12S3.46 14.28 1.16 10.88a.75.75 0 010-.76C3.46 6.52 7.23 4.8 10.75 4.8s7.29 1.72 9.25 5.32zm-9.25 3.13a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" clip-rule="evenodd" />
              <circle cx="10.75" cy="10.5" r="2.5" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              <path fill-rule="evenodd" d="M.66 10.5a.5.5 0 01.4-.4h.01c2.19-2.58 5.17-4 8.93-4 3.76 0 6.74 1.42 8.93 4h.01c.41 0 .66.44.4.8l-1.57 2.05a.5.5 0 01-.8.08l-1.07-1.39a.5.5 0 00-.73-.02L12.5 13.5a.5.5 0 01-.7-.7l1.07-1.39a.5.5 0 00-.7-.02l-1.32.9a.5.5 0 01-.68-.04l-1.07-1.39a.5.5 0 00-.7-.02l-1.32.9a.5.5 0 01-.68-.04l-1.07-1.39a.5.5 0 00-.7-.02L5.5 13.5a.5.5 0 01-.7-.7l1.07-1.39a.5.5 0 00-.7-.02l-1.32.9a.5.5 0 01-.68-.04l-1.07-1.39a.5.5 0 00-.7-.02L.66 10.5z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
        <div class="relative">
          <input
            v-model="confirm_password"
            :type="confirmPasswordFieldType" placeholder="确认密码"
            required
            class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none pr-10"
          />
          <span
            class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
            @click="togglePasswordVisibility('confirmPassword')" >
            <svg v-if="confirmPasswordFieldType === 'password'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18.84 10.12a.75.75 0 010 .76c-2.3 3.4-6.07 5.12-9.25 5.12S3.46 14.28 1.16 10.88a.75.75 0 010-.76C3.46 6.52 7.23 4.8 10.75 4.8s7.29 1.72 9.25 5.32zm-9.25 3.13a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" clip-rule="evenodd" />
              <circle cx="10.75" cy="10.5" r="2.5" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              <path fill-rule="evenodd" d="M.66 10.5a.5.5 0 01.4-.4h.01c2.19-2.58 5.17-4 8.93-4 3.76 0 6.74 1.42 8.93 4h.01c.41 0 .66.44.4.8l-1.57 2.05a.5.5 0 01-.8.08l-1.07-1.39a.5.5 0 00-.73-.02L12.5 13.5a.5.5 0 01-.7-.7l1.07-1.39a.5.5 0 00-.7-.02l-1.32.9a.5.5 0 01-.68-.04l-1.07-1.39a.5.5 0 00-.7-.02l-1.32.9a.5.5 0 01-.68-.04l-1.07-1.39a.5.5 0 00-.7-.02L5.5 13.5a.5.5 0 01-.7-.7l1.07-1.39a.5.5 0 00-.7-.02l-1.32.9a.5.5 0 01-.68-.04l-1.07-1.39a.5.5 0 00-.7-.02L.66 10.5z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
        <p v-if="passwordMismatchError" class="text-red-500 text-sm text-center">
          两次输入的密码不一致，请重新输入。
        </p>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md font-semibold">
          注册
        </button>
      </form>

      <div class="text-center mt-6 text-sm text-gray-600">
        <a href="/user_login" class="text-blue-600 hover:underline">登录</a>
        <span class="mx-2">|</span>
        <a href="/user_password_forget_email"  class="text-blue-600 hover:underline">找回密码</a>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import https from '@/utils/request.js';

import { showToast } from 'vant';
import userFunc from '@/utils/userfunc.js'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue';

const router = useRouter()
const route = useRoute()

const error = ref('')
const errorflag = ref('0')
const email = ref('')
const password = ref('')
const user_role = ref('user')
const mobile = ref('')
let user_name = ref('') // 保持 let，因为可能会在后面修改值
const male = ref('1')
const xingbie = ref(true)
const showImage = ref(false)
const confirm_password = ref('')

const passwordMismatchError = ref(false) // 用于控制密码不一致的错误提示

// *** 新增：独立的密码类型变量 ***
const passwordFieldType = ref('password');
const confirmPasswordFieldType = ref('password');

// *** 修改：通用的切换密码显示/隐藏的函数 ***
const togglePasswordVisibility = (field) => {
  if (field === 'password') {
    passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
  } else if (field === 'confirmPassword') {
    confirmPasswordFieldType.value = confirmPasswordFieldType.value === 'password' ? 'text' : 'password';
  }
};


// 打开图片，从浏览器打开
const openImage = () => {
  window.open('/images/help2/zhuce.png', '_blank') // 替换成你实际的图片路径
}


// 注册
const handleRegisterSubmit = () => {
  console.log("adsfas")
  passwordMismatchError.value = false;
  console.log('mima', password.value, confirm_password.value)
  // 验证两次密码是否一致
  if (password.value !== confirm_password.value) {
    passwordMismatchError.value = true; // 设置错误提示为 true
    console.log('注册失败：两次密码不一致');
    return; // 阻止表单继续提交
  }


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
  if (mobile.value.length > 15) {
    error.value = '电话太长了'
  }

  // 这里的 username 逻辑看起来有点奇怪，将 mobile 和 randomdata 拼接
  // 建议：如果用户有输入昵称，就用昵称；如果没有，再考虑用mobile加randomdata
  // 为了不改变你的核心逻辑，我保留了你的 user_name 拼接逻辑。
  user_name.value = mobile.value + '_' + randomdata; // 修正为使用 mobile 作为基础，或按你的实际业务逻辑
  console.log('username_2', user_name.value);

  const values = {
    "email": email.value,
    "password": password.value,
    "mobile": mobile.value,
    "gender": xingbie.value, // 使用 xingbie.value 代替 true
    "username": user_name.value, // 使用拼接后的 user_name.value
    "last_name": mobile.value // 保持不变，如果需要调整再告知
  }

  console.log('value2', values);
  const inviteCode = route.query.invite_code


  https.post((`/api/user/register/?invite_code=${inviteCode}`), values).then(response => {
    console.log('response', response)
    console.log(response.error)

    if (response.error) {
      alert(response.error)
      error.value = response.error
    } else {
      alert("注册成功，请登录")
      console.log("登录成功")
      router.push('/user_login');
    }


  }).catch(error => {
    console.log('出错了2');
    console.error(error);
    // 捕获后端返回的错误信息
    const backendErrorMsg = error.response?.data?.email?.[0] || // 邮箱错误
                            error.response?.data?.mobile?.[0] || // 手机号错误
                            error.response?.data?.password?.[0] || // 密码错误
                            error.response?.data?.username?.[0] || // 用户名错误
                            error.response?.data?.non_field_errors?.[0] || // 非字段错误，如“用户已存在”
                            '注册失败，请稍后再试。'; // 通用错误
    alert(backendErrorMsg);
  });
}

// 找回密码
const openForgotPassword = () => {
  alert("请联系平台，再联系我们查找")
}
</script>

<style scoped>
/* 如果有需要，可以添加scoped样式 */
</style>