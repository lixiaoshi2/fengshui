<template>

  <div class="min-h-screen bg-gray-100 pb-24">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="忆福安文化" left-text="返回" left-arrow @click-left="router.go(-1)" />

    <!-- 商品标题和价格 -->
    <h1 class="text-xl font-bold mb-2 px-5 md:mt-16 mt-4">{{ product.name }}</h1>
    <p class="text-red-600 text-lg font-semibold mb-4 px-5">${{ product.price }}</p>

    <!-- 商品参数信息 -->
    <div class="text-sm text-gray-700 space-y-2 px-5">
      <p><strong>分类：</strong> {{ product.category }}</p>
      <p><strong>简介：</strong> {{ product.description }}</p>
      <p><strong>规格：</strong> {{ product.spec || '标准配置' }}</p>
    </div>


    <div class="max-w-5xl mx-auto p-4 sm:p-6 text-gray-800">
    <!-- Header -->
    <div class="mb-6 text-center">
      <h1 class="text-2xl sm:text-3xl font-bold mb-2">🏡 远程阳宅风水吉凶鉴定服务</h1>
      <p class="text-sm sm:text-base text-gray-600">选错房子，可能影响一生运势</p>
      <p class="text-base sm:text-lg font-medium mt-1">选对阳宅，转运只在一念之间</p>
    </div>

    <!-- Intro -->
    <div class="bg-white shadow p-4 sm:p-6 rounded mb-6">
      <p class="mb-2">一场无需出门的专业风水鉴定，助你避开大凶之宅，精准挑选真正适合自己的居所。让你和家人住得安心，运势稳步上升！</p>
    </div>

    <!-- Service Description -->
    <div class="mb-6">
      <h2 class="text-lg font-semibold mb-2">📝 服务说明</h2>
      <p class="mb-2">无需亲临现场，通过远程资料即可完成全面风水评估。</p>
      <ul class="list-disc list-inside text-sm sm:text-base text-gray-700">
        <li>建筑地址</li>
        <li>等比例的房屋平面图</li>
        <li>基本家庭成员资料</li>
      </ul>
      <p class="mt-2">我们将从专业风水角度，全面分析房屋的格局、气场走向，判断是否有利居住者的整体运势。</p>
    </div>

    <!-- Why Feng Shui -->
    <div class="mb-6">
      <h2 class="text-lg font-semibold mb-2">❓ 为什么需要风水鉴定？</h2>
      <p class="mb-2">房子的格局看得见，但风水影响却常被忽视。</p>
      <ul class="list-disc list-inside text-sm sm:text-base text-gray-700">
        <li>风水不好，可能导致运势低迷、健康受阻、家庭关系紧张。</li>
        <li>风水合理，有助提升生活品质、事业发展和家庭和谐。</li>
      </ul>
      <p class="mt-2">一个专业的风水鉴定，可以帮助您：</p>
      <ul class="list-disc list-inside text-sm sm:text-base text-gray-700">
        <li>✅ 避开风水大凶宅</li>
        <li>✅ 找出真正适合自己的吉宅</li>
        <li>✅ 在购房或搬迁前发现潜藏问题，避免损失与后悔</li>
      </ul>
    </div>

    <!-- Service Content -->
    <div class="mb-6">
      <h2 class="text-lg font-semibold mb-2">📦 服务内容</h2>
      <ul class="list-disc list-inside text-sm sm:text-base text-gray-700">
        <li><strong>鉴定方式：</strong> 全程远程进行，无需现场勘查</li>
        <li><strong>所需资料：</strong> 建筑地址、等比例平面图、家庭基本信息</li>
        <li><strong>适用地区：</strong> 全球地区，服务涵盖加拿大、美国、大陆、台湾、香港、新加坡、澳洲等</li>
        <li><strong>鉴定范围：</strong> 聚焦阳宅风水的吉凶评估，并判断是否具备三元纳气风水布局的调整潜力</li>
      </ul>
    </div>

     <!-- Service Content -->
    <div class="mb-6">
      <h2 class="text-lg font-semibold mb-2">📦 服务时长</h2>
      <ul class="list-disc list-inside text-sm sm:text-base text-gray-700">
        <li><strong>规定时间：</strong>控制在30分钟以内</li>
        <li><strong>如果超时：</strong>请重新下单</li>
       
      </ul>
    </div>

    <!-- 师傅介绍 -->
<div class="mb-6">
  <h2 class="text-lg font-semibold mb-2">📦 老师介绍</h2>
  <a
    href="/mingli_jieshao"
    class="text-blue-600 hover:underline hover:text-blue-800 transition"
  >
    点击查看风水师傅详细介绍 &rarr;
  </a>
</div>

    <!-- Pricing -->
    <div class="mb-6">
      <h2 class="text-lg font-semibold mb-2">💰 服务费用</h2>
      <ul class="list-disc list-inside text-sm sm:text-base text-gray-700">
        <li>200平米以内住宅：300加元（人民币按5.5汇率计算）</li>
        <li>200-300平米，请选择400加元</li>
        <li>300-500平米，请选择500加元</li>
        <li>500平米以上，请选择700加元</li>
      </ul>
    </div>

    <!-- Contact -->
    <div class="bg-white shadow p-4 sm:p-6 rounded">
      <h2 class="text-lg font-semibold mb-2">📞 联系我们</h2>
      <p>如需咨询或下单，请随时与我们联系，我们将为您提供专业、细致的服务，助您开运迎福！</p>
      <ul class="mt-2 text-sm sm:text-base text-gray-700">
        <li><strong>联系人：</strong> 杜女士</li>
        <li><strong>邮箱：</strong> Sunnydu1212@hotmail.com</li>
        <li><strong>微信：</strong> Duyao12121212</li>
      </ul>
    </div>
  </div>

    <!-- 商品内容卡片（图片区域） -->
    <div class="p-4 bg-white shadow mt-4">





        
      <!-- <img
        v-if="product.cover_image"
        :src="fullImage(product.cover_image)"
        class="w-full h-auto object-contain rounded-lg mb-4"
        alt="主图"
      /> -->
      <!-- <img :src="product.cover_image" alt=""> -->
      <!-- <img :src="product.image" alt=""> -->
      <!-- <img
        v-for="(img, idx) in product.images"
        :key="idx"
        :src="fullImage(img.image)"
        class="w-full h-auto object-contain rounded-lg mb-8"
        alt="附图"
      /> -->
    </div>

    <!-- 固定底部按钮 -->
    <div class="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-inner mb-12 flex justify-center">
  <div class="w-full max-w-xl"> <van-button type="primary" block @click="addToCart">加入购物车</van-button>
  </div>
</div>
  </div>


</template>

<script setup>

import { ref, onMounted } from 'vue'

//


import https from '@/utils/request.js'

import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router';
 const route = useRoute()
 const router = useRouter();
import coverImg from '@/assets/images/mingli/fengshuihouse1.jpg'
import image from '@/assets/images/mingli/fengshuihouse.jpg'

const product = ref({
  name: '远程阳宅风水吉凶鉴定服务', // 商品名称
  price: 199,        // 价格
  category: '风水',    // 分类
  description: '师傅的资料在分水师傅介绍里，时间主要在大陆时间晚上8:00到10：00以内。如需多项服务请另外选购。',  // 描述
  spec:'时间在30分钟以内，如需超过请另外采购',      //规格
  cover_image: coverImg, // 使用已导入的图片
  image:image
});

const isLoggedIn = ref(false)
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
const addToCart2 = async () => {

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
      router.push('/user_login'); // 如果你使用了 Vue Router，需要先引入 useRouter
   
  }

}


// ******************************新的不需要登录兼容的购物车*****************

const LOCAL_KEY = 'guest_cart';



function saveLocalCart(cart) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(cart));
}

const addToCart = async () => {
  const userId = localStorage.getItem('user_id');

  // 已登录：请求后端接口
  if (userId) {
    try {
      await https.post('/api/fengshui/cart/', {
        product: product.value.id,
        quantity: 1
      });
      alert('已加入购物车，请在购物车中完成后续操作');
    } catch (error) {
      console.error('后端请求失败', error);
      alert('添加失败，请稍后再试');
    }

  } else {
    // 未登录：存入 localStorage
    const cart = getLocalCart();
    const exist = cart.find(item => item.product_id === product.value.id);

    if (exist) {
      exist.quantity += 1;
    } else {
      cart.push({
        product_id: product.value.id,
        quantity: 1,
        title: product.value.title,
        price: product.value.price,
        image: product.value.image,  // 方便购物车页展示
      });
    }

    saveLocalCart(cart);
    alert('商品已添加至购物车（未登录），登录后可自动合并');
  }
};


function getLocalCart() {
  const raw = localStorage.getItem(LOCAL_KEY);
  return raw ? JSON.parse(raw) : [];
}

const loadCart = async () => {
  const userId = localStorage.getItem('user_id');
  if (userId) {
    // 加载远程购物车
    const res = await https.get('/api/fengshui/cart/');
    cartItems.value = res.data;
  } else {
    // 加载本地购物车
    cartItems.value = getLocalCart();
  }
};


onMounted(async () => {
//   const productId = route.params.id
//   try {
//     const res = await https.get(`/api/fengshui/products/${productId}/`)
//     product.value = res

    
//   } catch (e) {
//     console.error('商品加载失败', e)
//   }

// // 判断是否登录
// const userId = localStorage.getItem('user_id');
//   if (userId) {
//     isLoggedIn.value = true;
//     console.log('用户已登录，user_id:', userId);
//   } else {
//     isLoggedIn.value = false;
//     console.log('用户未登录，user_id不存在。');
//   }




})
</script>
