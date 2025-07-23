<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans">
    <!-- 页头开始 -->


    <!-- 页头 -->
    <header class="bg-blue-600 text-white p-4 shadow-md fixed top-0 left-0 right-0 z-10">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-xl font-bold">小萝卜家政</div>
        <div class="flex items-center  space-x-4">
          <!-- 图标1 -->
          <!-- <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4m-2 0h20"></path>
          </svg> -->

          <!-- 图标2 -->
          <svg @click="router.push('/menu_setup')" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 3h12l5 9-5 9H6l-5-9z" />
            <circle cx="12" cy="12" r="4" />
          </svg>
          <!-- 切换按钮 -->
          <button class="bg-blue-500 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-full">
            切换为服务者
          </button>
        </div>
      </div>
    </header>
    <!-- 页头结束 -->

  
    <main class="flex-1 overflow-y-auto pt-4 md:mt-16 pb-16">
      <div class="container mx-auto px-4 mt-10 py-4">

        <section class="bg-white rounded-lg shadow-md p-6 mb-6">

          <div class="grid grid-cols-3 gap-y-6 gap-x-2 px-6 py-4 bg-white rounded-lg shadow">
            <div v-for="(item, index) in menus" :key="index"
              class="flex flex-col items-center text-sm text-gray-800 cursor-pointer" @click="router.push(item.path)">
              <!-- 图标 SVG -->
              <div class="w-6 h-6 text-black mb-2" v-html="item.svg"></div>
              <div>{{ item.label }}</div>
            </div>
          </div>

        </section>

         <div class="mt-8" @click="cleanorder">
            <button  class="w-full p-3 text-white bg-blue-500 bg-blue-500 rounded-md" @click="logout"  >
              退出登录
            </button>
          </div>


<!-- 
        <section class="bg-white rounded-lg shadow-md p-6 mb-6">

          <div class="grid grid-cols-3 gap-y-6 gap-x-2 px-6 py-4 bg-white rounded-lg shadow">
            <div  v-for="(item, index) in menus_guanli" :key="index"
              class="flex flex-col items-center text-sm text-gray-800 cursor-pointer" @click="handleClick(item)">
            
              <div class="w-6 h-6 text-black mb-2" v-html="item.svg"></div>
              <div>{{ item.label }}</div>
            </div>
          </div>

        </section> -->


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


const menus = [
  {
    label: '修改密码',
    path: '/user_changepasswd',
    svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>`,
  },
  // {
  //   label: '电子邮件',
  //   path: '/ordernow',
  //   svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
  //           <path stroke-linecap="round" stroke-linejoin="round" d="M9 14h6m-3-3v6m-7 4h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v17z"/>
  //         </svg>`,
  // },
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
    path: '/user_changePhone',
    svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12h-6"/>
          </svg>`,
  },
  // {
  //   label: '我的邀请码',
  //   path: '/chooseposition2',
  //   svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
  //           <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m-6-8h6m4 12V4a2 2 0 00-2-2H5a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2z"/>
  //         </svg>`,
  // },
  // {
  //   label: '推广人员',
  //   path: '/chooseposition2',
  //   svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
  //           <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m-6-8h6m4 12V4a2 2 0 00-2-2H5a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2z"/>
  //         </svg>`,
  // },
  // {
  //   label: '分销商',
  //   path: '/chooseposition2',
  //   svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
  //           <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m-6-8h6m4 12V4a2 2 0 00-2-2H5a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2z"/>
  //         </svg>`,
  // },
  // {
  //   label: '渠道商',
  //   path: '/chooseposition2',
  //   svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
  //           <path stroke-linecap="round" stroke-linejoin="round" d="M18 10c0-3.314-2.686-6-6-6S6 6.686 6 10v2H4v6h4v-2h8v2h4v-6h-2v-2z"/>
  //         </svg>`,
  // },
  // {
  //   label: '合作伙伴',
  //   path: '/chooseposition2',
  //   svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
  //           <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
  //         </svg>`,
  // },
  // {
  //   label: '下载APP',
  //   path: '/downloadapp/',
  //   svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
  //           <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
  //         </svg>`,
  // },
  // {
  //   label: '分享',
  //   path: '/invite/',
  //   svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
  //           <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
  //         </svg>`,
  // },
]

const menus_guanli = [
  {
    label: '举报列表',
    svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>`,
  },
  {
    label: '区域经理',
    svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 14h6m-3-3v6m-7 4h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v17z"/>
          </svg>`,
  },
  {
    label: '确定支付',
    svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12h-6"/>
          </svg>`,
  },
  {
    label: '最新订单',
    svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m-6-8h6m4 12V4a2 2 0 00-2-2H5a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2z"/>
          </svg>`,
  },
  {
    label: '最新用户',
    svg: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m-6-8h6m4 12V4a2 2 0 00-2-2H5a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2z"/>
          </svg>`,
  },

]

const logout = () => {
  // 在这里执行你的登出逻辑，例如清除 token，更新登录状态
  localStorage.removeItem("user_id")
  localStorage.removeItem('token');
  localStorage.removeItem('refresh');
  localStorage.removeItem('user_role');
  isLoggedIn.value = false; // 模拟登出
  // isMenuOpen.value = false;
  router.push('/'); // 登出后跳转到首页或其他页面
};



// 在组件挂载时检查 localStorage
onMounted(() => {
  const userId = localStorage.getItem('user_id');
  if (userId) {
    isLoggedIn.value = true;
    console.log('用户已登录，user_id:', userId);
  } else {
    isLoggedIn.value = false;
    console.log('用户未登录，user_id不存在。');
  }
});


</script>

<style scoped>
/* 这里可以放置组件特有的样式，但对于Tailwind，大部分样式直接写在template里 */
/* 如果你需要自定义一些 Tailwind 没有的动画或复杂选择器，可以写在这里 */
</style>