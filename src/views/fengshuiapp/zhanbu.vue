<template>
  <div class="p-1 max-w-5xl md:mt-16 mx-auto bg-white shadow-md rounded-xl mb-16">
    
    <!-- 头部 -->
    <header class="max-w-5xl mx-auto px-4 py-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-[#f5e4d6] flex items-center justify-center text-[#5a3e2b] font-bold text-lg shadow">忆</div>
          <div>
            <h1 class="text-2xl font-extrabold text-[#5a3e2b]">忆福安 · 占卜问卦服务</h1>
            <p class="text-sm text-[#7c5e47]">以易经智慧，洞察未来趋向，助您趋吉避凶</p>
          </div>
        </div>
       
      </div>
    </header>
       <!-- <nav class="mb-4 md:flex items-center gap-6 text-sm text-[#6b4f3a]">
        
          <a class="px-4 py-2 bg-[#5a3e2b] text-white rounded shadow hover:opacity-95" href="#xiadan">下单预约占卜</a>
        </nav> -->


     <section id="xiadan">
         <div class="px-1 ">
            
            <!-- <h1 class="text-xl font-bold  text-gray-800"> 下单:</h1> -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
              <div v-for="item in products" :key="item.url"
                class="bg-white p-1 rounded shadow hover:shadow-md transition cursor-pointer"
                @click="goToDetail(item.id)">
                <img :src="fullImage(item.cover_image)" class="w-full h-32 object-cover mb-2 rounded" />
                <div class="text-sm font-semibold">{{ item.name }}</div>
                <div class="text-red-500 font-bold mt-1">${{ item.price }}</div>
                 <a @click="checkout2(item)" class="px-2 py-1 text-sm bg-[#5a3e2b] text-white rounded shadow hover:opacity-95" href="#xiadan">立即购买</a>

              </div>
            </div>
          </div>
      </section>

    <!-- 占卜问卦 -->
    <section id="divination" class="bg-white rounded-2xl p-2 shadow-md my-6">
      <div class="flex items-start gap-6">
      
        <div class="flex-1">
          <h3 class="text-xl font-bold text-[#4a3628]">占卜问卦</h3>
          <p class="mt-2 text-gray-600">
            通过起卦、断卦，解读卦象信息，洞察事情的发展趋势与结果。
            可用于预测婚姻感情、事业财运、健康疾病、家宅风水等各类问题，
            帮助释疑解惑、趋吉避凶，为决策提供有力参考。
          </p>

          <div class="mt-4 grid md:grid-cols-2 gap-4">
            <div class="p-2 border rounded-lg">
              <strong class="block">婚姻感情</strong>
              <p class="text-sm">分析感情走势，判断缘分深浅与未来发展方向。</p>
            </div>
            <div class="p-2 border rounded-lg">
              <strong class="block">事业财运</strong>
              <p class="text-sm">预测事业机会与风险，指导投资与职业选择。</p>
            </div>
            <div class="p-2 border rounded-lg">
              <strong class="block">健康疾病</strong>
              <p class="text-sm">结合卦象发现潜在健康隐患，给出趋利避害建议。</p>
            </div>
            <div class="p-2 border rounded-lg">
              <strong class="block">家宅风水</strong>
              <p class="text-sm">洞察家宅运势与风水吉凶，提供优化布局的参考。</p>
            </div>
          </div>
        </div>
        <!-- <div class="w-44 h-44 bg-[#f5e4d6] rounded-xl flex items-center justify-center text-[#5a3e2b] font-bold shadow">卦象</div> -->
      </div>
    </section>

    <!-- 联系 -->
    <section id="contact" class="my-8 bg-[#fffaf6] rounded-2xl p-6 shadow-md">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h4 class="text-xl font-bold text-[#4a3628]">想知道未来走向与吉凶吗？</h4>
          <p class="text-gray-700 mt-1">联系我们，准备好相关问题与背景信息，我们为您起卦解答。</p>
        </div>
        <div class="flex items-center gap-3">
          <a href="#xiadan" class="px-5 py-3 bg-[#5a3e2b] text-white rounded shadow">成功案例</a>
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


onMounted(async () => {
  // const category = route.query.category || ''
  const category = '占卜'
  categoryTitle.value = category || '商品列表'

  if (!category) {
    console.warn('未指定分类')
    return
  }

  try {
    const res = await https.get('/api/fengshui/products/', {
      // params: { category }
      category: '占卜' 
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


</script>
