
<template>
  <div class="min-h-screen bg-gray-50 flex flex-col mt-8 font-sans">


    <header class="fixed top-0 left-0 w-full bg-white shadow-sm z-50 py-3 px-4 flex items-center justify-between
               md:hidden"> <button @click="router.go(-1)"
        class="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="ml-1 text-base">返回</span>
      </button>

      
    <h1 v-if="!username" class="text-lg font-semibold text-gray-800 tracking-wide">
      忆福安文化
    </h1>
    <div v-else class="text-sm text-gray-600">
      欢迎，{{ username }}
    </div>
      <div class="w-14"></div>
    </header>


    <div class="md:mt-12 px-4"></div>
    <div v-if="!isLoggedIn"
      class="flex items-center mt-14 md:mt-16 py-3 px-4 rounded-lg shadow-md bg-gradient-to-r from-yellow-50 to-orange-50 cursor-pointer transition-transform transform hover:scale-[1.01] active:scale-[0.99] mx-4"
      @click="login">
      <div
        class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-3 border-2 border-yellow-300 bg-yellow-200">
        <svg class="w-7 h-7 text-orange-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"></path>
        </svg>
      </div>

      <div class="flex-grow">
        <h3 class="text-lg font-semibold text-gray-800">登录/注册</h3>
        <button class="px-3 py-0.5 text-xs rounded-full bg-orange-200 text-orange-700 shadow-sm flex items-center mt-1">
          身份认证
          <svg class="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>

      <div class="flex-shrink-0 text-gray-400 text-2xl ml-4">&gt;</div>
    </div>
    <main class="flex-1 overflow-y-auto px-4 py-4 md:py-6">
      <div class="container mx-auto">
        <!-- <section class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-6 md:mt-10">
          <div v-for="(item, index) in menus" :key="index" @click="router.push(item.path)"
            class="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div class="w-8 h-8 text-gray-700 mb-2" v-html="item.svg" />
            <span class="text-sm text-gray-700 text-center">{{ item.label }}</span>
          </div>
        </section> -->

        <section class="bg-white rounded-lg shadow-md p-6 mt-6 mb-6">
          <div class="grid grid-cols-3 gap-y-6 gap-x-2 px-6 py-4 bg-white rounded-lg shadow">
            <div v-for="(item, index) in menus" :key="index"
              class="flex flex-col items-center text-sm text-gray-800 cursor-pointer" @click="router.push(item.path)">
              <div class="w-6 h-6 text-black mb-2" v-html="item.svg"></div>
              <div>{{ item.label }}</div>
            </div>
          </div>
        </section>

        <section class="bg-white rounded-lg shadow-md p-6 mt-6 mb-6">
          <div class="grid grid-cols-3 gap-y-6 gap-x-2 px-6 py-4 bg-white rounded-lg shadow">
            <div v-for="(item, index) in menus2" :key="index"
              class="flex flex-col items-center text-sm text-gray-800 cursor-pointer" @click="router.push(item.path)">
              <div class="w-6 h-6 text-black mb-2" v-html="item.svg"></div>
              <div>{{ item.label }}</div>
            </div>
          </div>
        </section>

        <div class="mt-6 mb-6">
          <h3 class="px-2 font-bold text-gray-800 text-lg mb-4">管理员权限</h3>
          <section v-if="isadmin" class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            <div v-for="(item, index) in menus_guanli" :key="index" @click="router.push(item.path)"
              class="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div class="w-8 h-8 text-gray-700 mb-2" v-html="item.svg" />
              <span class="text-sm text-gray-700 text-center">{{ item.label }}</span>
            </div>
          </section>
        </div>

        <div class="mt-8 mb-8">
          <button @click="logout"
            class="w-full p-3 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-200">
            退出登录
          </button>
        </div>
      </div>
    </main>
  </div>
</template>



<script setup>

import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
// 核心功能按钮数据

const isLoggedIn = ref(false); // 默认未登录
localStorage.setItem("is_need",1)



const menus = [
  {
    label: '购物车',
    path: '/mycart',
    svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>`,
  },
  {
    label: '我的订单',
    path: '/orders',
    svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 14h6m-3-3v6m-7 4h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v17z"/>
          </svg>`,
  },
  {
    label: '我的推荐码',
    path: '/invite',
    svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 14h6m-3-3v6m-7 4h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v17z"/>
          </svg>`,
  },
  {
    label: '推荐及积分',
    path: '/jifen',
    svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 14h6m-3-3v6m-7 4h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v17z"/>
          </svg>`,
  },
 
]



const menus_guanli = [
  {
    label: '订单管理',
    path: '/ordersadmin',
    svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>`,
  },
  
  {
    label: '新增商品',
    path: '/addproduct',
    svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>`,
  },
  
 
]


const menus2 = [
  {
    label: '修改密码',
    path: '/user_changepasswd',
    svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>`,
  },
  {
    label: '修改邮件',
    path: '/user_changeEmail',
    svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 14h6m-3-3v6m-7 4h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v17z"/>
          </svg>`,
  },
  {
    label: '修改昵称',
    path: '/user_changename',
    svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 14h6m-3-3v6m-7 4h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v17z"/>
          </svg>`,
  },
  {
    label: '手机号码',
    path: '/user_changePhone',
    svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12h-6"/>
          </svg>`,
  },
  {
    label: '找回密码',
    path: '/user_password_forget_email',
    svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12h-6"/>
          </svg>`,
  }
 
  

]

const username = ref('')

const logout = () => {
  // 在这里执行你的登出逻辑，例如清除 token，更新登录状态
  localStorage.removeItem("user_id")
  localStorage.removeItem('token');
  localStorage.removeItem('refresh');
  localStorage.removeItem('user_role');
  localStorage.removeItem('username');
  isLoggedIn.value = false; // 模拟登出
  // isMenuOpen.value = false;
  router.push('/user_login'); // 登出后跳转到首页或其他页面
};



// 登录
const login = () =>{
  router.push("/user_login")
}


// 切换客户性质
const qiehuan2 = () => {
  console.log("即将切换成家政人员")
  localStorage.setItem("is_need", 0);
  router.push("/my_worker")
  .then(() => {
      // 3. 在跳转完成后，强制刷新目标页面
      router.go(0);
    })
    .catch(error => {
      console.error("路由跳转失败:", error);
    });
}

// 是否显示管理内容
const isadmin = ref(false); 

// 在组件挂载时检查 localStorage
onMounted(() => {
  
  const userId = localStorage.getItem('user_id');
  localStorage.setItem("is_need", 1);
  if (userId) {
    isLoggedIn.value = true;
    username.value = localStorage.getItem("username")
    console.log('用户已登录，user_id:', userId);
  } else {
    isLoggedIn.value = false;
    console.log('用户未登录，user_id不存在。');
  }

  const userRole = localStorage.getItem('user_role');

  if (userRole === 'admin' || userRole === 'partner') {
    isadmin.value = true;
  }


});



</script>

<style scoped>
/* 这里可以放置组件特有的样式，但对于Tailwind，大部分样式直接写在template里 */
/* 如果你需要自定义一些 Tailwind 没有的动画或复杂选择器，可以写在这里 */
</style>