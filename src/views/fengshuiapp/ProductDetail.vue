<template>

  <div class="min-h-screen bg-gray-100 pb-24">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="好听的网站名" left-text="返回" left-arrow @click-left="router.go(-1)" />

    <!-- 商品标题和价格 -->
    <h1 class="text-xl font-bold mb-2 px-5 mt-4">{{ product.name }}</h1>
    <p class="text-red-600 text-lg font-semibold mb-4 px-5">${{ product.price }}</p>

    <!-- 商品参数信息 -->
    <div class="text-sm text-gray-700 space-y-2 px-5">
      <p><strong>分类：</strong> {{ product.category }}</p>
      <p><strong>简介：</strong> {{ product.description }}</p>
      <p><strong>规格：</strong> {{ product.spec || '标准配置' }}</p>
    </div>

    <!-- 商品内容卡片（图片区域） -->
    <div class="p-4 bg-white shadow mt-4">
      <img
        v-if="product.cover_image"
        :src="fullImage(product.cover_image)"
        class="w-full h-auto object-contain rounded-lg mb-4"
        alt="主图"
      />
     
      <img
        v-for="(img, idx) in product.images"
        :key="idx"
        :src="fullImage(img.image)"
        class="w-full h-auto object-contain rounded-lg mb-8"
        alt="附图"
      />
    </div>

    <!-- 固定底部按钮 -->
    <div class="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-inner mb-12">
      <van-button type="primary" block @click="addToCart">加入购物车</van-button>
    </div>
  </div>


</template>

<script setup>

import { ref, onMounted } from 'vue'

//
const product = ref({})



import https from '@/utils/request.js'

import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router';
 const route = useRoute()
 const router = useRouter();

// 拼接图片完整地址
// 动态获取当前前端域名或 IP，并拼接端口号
// const fullImage = (path) => {
//   if (typeof path === 'string') {
//     if (path.startsWith('http')) {
//       return path // 已经是完整路径
//     }

//     // 从 window.location 提取当前主机名，例如 localhost 或 192.168.x.x
//     const hostname = window.location.hostname
//     const port = 8000  // 后端端口号
//     const protocol = window.location.protocol  // http: 或 https:

//     return `${protocol}//${hostname}:${port}${path}`
    
//   }

//   return ''
// }

const fullImage = (path) => {
  if (typeof path === 'string') {
    // 如果路径本身已经是完整的 HTTP/HTTPS URL，直接返回
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    const hostname = window.location.hostname;
    const protocol = window.location.protocol; // http: 或 https:
    const backendPort = 8000; // 后端端口号，只有在特定条件下使用

    // 检查 hostname 是否以 '192.' 开头，或者是否是 'localhost' 或 '127.0.0.1'
    // 这些通常是开发环境或本地测试环境的地址
    if (hostname.startsWith('192.') || hostname === 'localhost' || hostname === '127.0.0.1') {
      // 如果是本地或内网 IP，需要拼接端口号
      return `${protocol}//${hostname}:${backendPort}${path}`;
    } else {
      // 如果是域名访问（例如 fs.nearnet.ca），则不需要拼接端口号
      // 因为 Nginx 会处理端口转发
      return `${protocol}//${hostname}${path}`;
    }
  }

  // 如果 path 不是字符串，或者为空，返回空字符串
  return '';
};

// 点击加入购物车
const addToCart = async () => {

   try {
    // 尝试发送请求
    await https.post('/api/fengshui/cart/', {
      product: product.value.id,
      quantity: 1
    });

    // 如果请求成功，弹出成功信息
    alert('已加入购物车，请在购物车中完成后续操作');

  } catch (error) {
    // 捕获请求过程中发生的错误

    // 假设后端返回 401 Unauthorized 表示未登录
    
      router.push('/user_login'); // 如果你使用了 Vue Router，需要先引入 useRouter
   

  }



}
onMounted(async () => {
  const productId = route.params.id
  try {
    const res = await https.get(`/api/fengshui/products/${productId}/`)
    product.value = res
    
  } catch (e) {
    console.error('商品加载失败', e)
  }
})
</script>
