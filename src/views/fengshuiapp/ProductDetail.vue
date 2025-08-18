<template>

  <div class="min-h-screen bg-gray-100 pb-24">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="忆福安文化" left-text="返回" left-arrow @click-left="router.go(-1)" />

    <!-- 商品标题和价格 -->
    <h1 class="text-xl font-bold mb-2 px-5 md:mt-16 mt-4">{{ product.name }}</h1>
  
    <div class="flex items-baseline mb-4 px-5">
      <p class="text-red-600 text-lg font-semibold mr-3">${{ product.price }}</p>

      <p v-if="product.price_origin  > product.price"
        class="text-gray-500 text-sm line-through">
        ${{ product.price_origin }}
      </p>
    </div>
    <!-- 商品参数信息 -->
    <div class="text-sm text-gray-700 space-y-2 px-5">
      <p><strong>分类：</strong> {{ product.category }}</p>
      <p><strong>简介：</strong> {{ product.description }}</p>
      <p><strong>规格：</strong> {{ product.spec || '标准配置' }}</p>
    </div>
    <div class="px-4 pt-2">
        <template v-if="['起名', '择日','占卜','流年运势','八字','婚姻','房屋风水','定制道符','紫薇斗数'].includes(product.category)">
      <!-- 立即购买 -->
      <a @click="checkout2(product)" 
         class="px-2 py-2 text-lg bg-[#5a3e2b] text-white rounded shadow hover:opacity-95 block text-center">
        立即购买
      </a>
    </template>

    <template v-else>
      <!-- 加入购物车 -->
      <van-button type="primary" block @click="addToCart">
        加入购物车
      </van-button>
    </template>
    </div>
  

    <!-- 商品内容卡片（图片区域） -->
    <div class="p-4 bg-white shadow mt-4">
      <img v-if="product.cover_image" :src="fullImage(product.cover_image)"
        class="w-full h-auto object-contain rounded-lg mb-4" alt="主图" />

      <img v-for="(img, idx) in product.images" :key="idx" :src="fullImage(img.image)"
        class="w-full h-auto object-contain rounded-lg mb-8" alt="附图" />
    </div>

    <!-- 固定底部按钮 -->
    <div class="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-inner mb-12 flex justify-center">
      <!-- <div class="w-full max-w-xl"> <van-button type="primary" block @click="addToCart">加入购物车</van-button>
      </div> -->
    </div>

      <!-- 判断分类 -->
    



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

// 点击资讯类直接购买




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



const pay = async (orderId) => {
  router.push(`/pay/${orderId}`) // 🔁跳转到支付页
}

const checkout2 = async (item) => {
  const userId = localStorage.getItem('user_id');
 
  if (!userId) {
    alert("请先登录再进行结算！");
    router.push('/user_login');
    return;
  }

  const payload = {
    delivery_method: 'zixun',
    total_price:item.price,
    product:item.id
  };

  console.log("paload",payload)
  

  const res = await https.post('/api/fengshui/create_order/', payload);
  
  if (res?.order_id) {
    alert(`订单创建成功，订单号：${res.order_id}`);
    await pay(res.order_id);
  }

};





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
  const productId = route.params.id
  try {
    const res = await https.get(`/api/fengshui/products/${productId}/`)
    product.value = res

    
  } catch (e) {
    console.error('商品加载失败', e)
  }

// 判断是否登录
const userId = localStorage.getItem('user_id');
  if (userId) {
    isLoggedIn.value = true;
    console.log('用户已登录，user_id:', userId);
  } else {
    isLoggedIn.value = false;
    console.log('用户未登录，user_id不存在。');
  }




})
</script>
