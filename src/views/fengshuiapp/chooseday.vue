<template>
  <div class="p-1 max-w-5xl md:mt-16 mx-auto bg-white shadow-md rounded-xl mb-16">
   

 <header class="max-w-5xl mx-auto px-2 py-2 md:mt-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-[#f5e4d6] flex items-center justify-center text-[#5a3e2b] font-bold text-lg shadow">忆</div>
          <div>
            <h1 class="text-2xl font-extrabold text-[#5a3e2b]">忆福安 · · 择日择吉服务</h1>
            <p class="text-sm text-[#7c5e47]">择吉良辰，为重要时刻增添顺遂与吉祥</p>
          </div>
        </div>
       
      </div>
    </header>
    
      
      <section id="xiadan">
         <div class="px-1 ">
            
            <!-- <h1 class="text-xl font-bold  text-gray-800"> 下单:</h1> -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
              <div v-for="item in products" :key="item.url"
                class="bg-white p-1 rounded shadow hover:shadow-md transition cursor-pointer"
                >
                <img :src="fullImage(item.cover_image)" @click="goToDetail(item.id)" class="w-full h-32 object-cover mb-2 rounded" />
                <div class="text-sm font-semibold">{{ item.name }}</div>
                <div class="text-red-500 font-bold mt-1">${{ item.price }}</div>
                <a @click="checkout2(item)" class="px-2 py-1 text-sm bg-[#5a3e2b] text-white rounded shadow hover:opacity-95" href="#xiadan">立即购买</a>
              </div>
            </div>
          </div>
      </section>

    <section id="auspicious-date" class="bg-white rounded-2xl p-2 shadow-md my-6">
     
  <div class="flex items-start gap-6">
    <div class="flex-1">
      <h3 class="text-2xl font-bold text-[#4a3628]">择日择吉</h3>
      <p class="mt-2 text-gray-600">
        结合个人八字命盘，综合分析天干地支、五行生克及黄历信息，
        为结婚、开业、动工、搬迁、签约等重大事项甄选黄道吉日。
        确保所选时日与个人时运相合，助事事顺遂、吉祥如意，避免冲煞与不利影响。
      </p>

      <div class="mt-4 grid md:grid-cols-2 gap-4">
        <div class="p-2 border rounded-lg">
          <strong class="block">黄历择吉</strong>
          <p class="text-sm">结合农历、节气与天干地支，筛选出有利于特定事项的良辰吉日。</p>
        </div>
        <div class="p-2 border rounded-lg">
          <strong class="block">八字匹配</strong>
          <p class="text-sm">确保所选日期与命主八字喜用神相合，避开不利五行与冲煞。</p>
        </div>
        <div class="p-2 border rounded-lg">
          <strong class="block">重大事项优化</strong>
          <p class="text-sm">针对婚嫁、开业、搬迁、动工等不同事件，选择最契合的吉时良日。</p>
        </div>
        <div class="p-2 border rounded-lg">
          <strong class="block">个性化方案</strong>
          <p class="text-sm">结合个人或企业情况，提供多种备选方案，灵活安排时间。</p>
        </div>
      </div>
    </div>
    <!-- <div class="w-44 h-44 bg-[#f5e4d6] rounded-xl flex items-center justify-center text-[#5a3e2b] font-bold shadow">择吉</div> -->
  </div>
</section>

 <section id="contact" class="my-8 bg-[#fffaf6] rounded-2xl p-6 shadow-md">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <!-- <h4 class="text-xl font-bold text-[#4a3628]">准备好为名字注入福气了吗？</h4> -->
            <p class="text-gray-700 mt-1">联系我们，准备好出生时间或企业资料，我们安排您和老师详谈。</p>
          </div>
          <div class="flex items-center gap-3">
            <a href="#xiadan" class="px-5 py-3 bg-[#5a3e2b] text-white rounded shadow">成功案例</a>
            <!-- <a href="#" class="px-4 py-3 border border-[#cfa87a] text-[#5a3e2b] rounded">查看案例</a> -->
          </div>
        </div>
      </section>

    
   


  </div>
</template>

<script setup>
// 无需脚本逻辑，这只是静态展示

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import https from '@/utils/request.js'

const route = useRoute()
const router = useRouter()
const products = ref([])
const categoryTitle = ref('')

// 拼接图片完整地址
const baseURL = 'http://192.168.1.127:8000'  // 或 http://localhost:8000
const fullImage = (path) => {
  if (typeof path === 'string') {
    return path.startsWith('http') ? path : baseURL + path
  }
  return ''  // 如果不是字符串，返回空字符串避免出错
}

// 保存到购物车

const LOCAL_KEY = 'guest_cart';

function getLocalCart() {
  const raw = localStorage.getItem(LOCAL_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveLocalCart(cart) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(cart));
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


onMounted(async () => {
  // const category = route.query.category || ''
  const category = '择日'
  categoryTitle.value = category || '商品列表'

  if (!category) {
    console.warn('未指定分类')
    return
  }

  try {
    const res = await https.get('/api/fengshui/products/', {
      // params: { category }
      category: '择日' 
    })
    console.log('res',res)
    products.value = res
    
  } catch (error) {
    console.error('加载商品失败', error)
  }
})

const goToDetail = (id) => {
  router.push(`/product/${id}`)
}

</script>
