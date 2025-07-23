<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-[10vh] px-4">
    <div class="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
      <div class="flex items-center justify-center mb-6">
        <span class="text-2xl font-bold text-orange-500 tracking-wide">请登录</span>
      </div>

      <div class="text-center text-gray-400 text-xs mb-4 font-semibold">
        在浏览器中打开本页面(APP不用)，<br> 否则将无法完成登录！
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <input
            v-model="email"
            type="text"
            placeholder="用户名"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            required
          />
        </div>
        
        <div class="relative">
          <input
            v-model="password"
            :type="passwordFieldType" placeholder="密码"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none pr-10" required
          />
          <span
            class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
            @click="togglePasswordVisibility"
          >
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
        <div class="text-sm text-red-500"> {{ errorinfo }} </div> 
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md"
        >
          登录
        </button>
      </form>

      <div class="text-center mt-6 text-sm text-gray-600">
        <a href="/user_register" class="text-blue-600 hover:underline">注册</a>
        <span class="mx-2">|</span>
        <a href="/user_password_forget_email"  class="text-blue-600 hover:underline">找回密码</a>
       
      </div>
    </div>

    <div
      v-if="showForgotPasswordModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-sm relative">
        <button @click="closeForgotPassword" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          ✕
        </button>
        <h3 class="text-xl font-bold mb-4 text-center">请联系后台</h3>
        <form @submit.prevent="handleForgotPasswordSubmit" class="space-y-4">
          <input type="email" placeholder="后台微信： 13769181917， 15908801519" required class="w-full px-4 py-2 border rounded-md" />
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md font-semibold">
            谢谢
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

import https from '@/utils/request.js';
import userFunc from '@/utils/userFunc'; // 确保正确导入你的用户存储方法

const id = ref('');
const email = ref('');
const mobile = ref('');
const password = ref('');
const errorinfo = ref('');
const errorflag = ref(0);
const params = ref({});

const confirm_password = ref('');
const user_name = ref('')

const showRegisterModal = ref(false)
const showForgotPasswordModal = ref(false)
const passwordMismatchError = ref(false);

// 新增：控制密码输入框类型的响应式变量
const passwordFieldType = ref('password');

// 新增：切换密码显示/隐藏的函数
const togglePasswordVisibility = () => {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
};

const openRegister = () => (showRegisterModal.value = true)

const closeRegister = () =>{
  email.value = '';
  mobile.value = '';
  user_name.value = '';
  password.value = '';
  confirm_password.value = '';
  passwordMismatchError.value = false;
  showRegisterModal.value = false
} 

const openForgotPassword = () => (showForgotPasswordModal.value = true)
const closeForgotPassword = () => (showForgotPasswordModal.value = false)

const openImage = () => {
  window.open('/images/help2/zhuce.png', '_blank') // 替换成你实际的图片路径
}

const handleLogin = async() => {
  console.log('登录中:', user_name.value, password.value)

  params.value = {
    username: email.value,
    password: password.value
  };

  try {
    const response = await https.post('/api/user/login/', params.value);
    console.log('登录成功', response);

    const token = response.data.access
    const token_refresh = response.data.refresh;
    console.log('response22',response)  //email,gender,user_id,username,token,refresh
    localStorage.setItem('user_role',response.role)
    userFunc.saveLocalstorage(response.email,response.gender,response.user_id,response.username,token,token_refresh);
    localStorage.setItem("cleaner_id",response.cleaner_id)
    alert('您已登录成功，请直接访问')
    // 执行android webview认识的代码
    const userId = localStorage.getItem("user_id");
    // 检查 WebView 是否支持这个方法
    await mergeLocalCartToBackend(); // ✅ 合并购物车操作

    const redirectPath = route.query.redirecturl;
    if (redirectPath) {
      router.push(redirectPath);
      localStorage.removeItem('redirectPath');
    } else {
      router.push('/');
    }
  } catch (error) {

    errorinfo.value = error.response?.data?.msg?.[0] || '账户名或密码错误,多次出错，联系后台';
    if(errorinfo.value=="未找到该用户"){
      console.log('tuichule')
      return
    }
    
    errorinfo.value = error.response?.data?.error?.[0] || '账户名或密码错误,多次出错，联系后台';
    errorflag.value = 1;
  }
}

const LOCAL_KEY = 'guest_cart';
// 获取本地购物车数据
const getLocalCart = () => {
  try {
    const data = localStorage.getItem(LOCAL_KEY);
    if (!data) return [];

    const parsed = JSON.parse(data);

    // 校验 parsed 是数组，并且每项至少有 product_id 和 quantity
    if (Array.isArray(parsed) && parsed.every(item =>
      typeof item.product_id === 'number' &&
      typeof item.quantity === 'number'
    )) {
      return parsed;
    }

    // 如果结构异常，清除并返回空数组
    localStorage.removeItem(LOCAL_KEY);
    return [];
  } catch (e) {
    console.error("解析本地购物车失败", e);
    localStorage.removeItem(LOCAL_KEY);
    return [];
  }
};

// 将本地的数据融合进入后端
const mergeLocalCartToBackend = async () => {
  const localCart = getLocalCart();

  console.log("进入购物车融合了")
  if (!localCart.length) return;
  console.log("购物车有内容")
  console.log('localcart',localCart)

  // 批量将本地商品加入后端购物车
  for (const item of localCart) {
    try {
      await https.post('/api/fengshui/cart/', {
        product: item.product_id,
        quantity: item.quantity,
      });
    } catch (error) {
      console.error(`合并商品 ${item.product_id} 失败`, error);
    }
  }
 

  // ✅ 清空本地购物车
  localStorage.removeItem(LOCAL_KEY);

  // ✅ 重新加载购物车（后端）
  // await loadCart();
};


// 忘记密码
const handleForgotPasswordSubmit = () => {
  console.log('找回密码提交')
  alert("请联系平台，再联系我们查找")
  closeForgotPassword()
}
</script>