<template>
  <div class="p-2 max-w-5xl md:mt-16 mx-auto bg-white shadow-md rounded-xl mb-16">
    
    <!-- 头部 -->
    <header class="max-w-5xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-[#f5e4d6] flex items-center justify-center text-[#5a3e2b] font-bold text-lg shadow">忆</div>
          <div>
            <h1 class="text-2xl font-extrabold text-[#5a3e2b]">忆福安 · 八字排盘服务</h1>
            <p class="text-sm text-[#7c5e47]">精准命盘推算，洞察人生全局</p>
          </div>
        </div>
        
      </div>
    </header>

   


      <section id="xiadan">
         <div class="px-1 ">
            
            <!-- <h1 class="text-xl font-bold  text-gray-800"> 下单:</h1> -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
              <div v-for="item in products" :key="item.url"
                class="bg-white p-2 rounded shadow hover:shadow-md transition cursor-pointer"
                @click="goToDetail(item.id)">
                <img :src="fullImage(item.cover_image)" class="w-full h-32 object-cover mb-2 rounded" />
                <div class="text-sm font-semibold">{{ item.name }}</div>
                <div class="text-red-500 font-bold mt-1">${{ item.price }}</div>
                 <a @click="checkout2(item)" class="px-2 py-1 text-sm bg-[#5a3e2b] text-white rounded shadow hover:opacity-95" href="#xiadan">立即购买</a>
              </div>
            </div>
          </div>
      </section>

    <!-- 八字排盘 -->
    <section id="bazi" class="bg-white rounded-2xl p-2 shadow-md my-6">
      <div class="flex items-start gap-6">
        <div class="flex-1">
          <h3 class="text-xl font-bold text-[#4a3628]">八字排盘</h3>
          <p class="mt-2 text-gray-600">
            以个人的出生年、月、日、时及性别为依据，推算出专属命盘，为后续预测提供精准的数据参考。
            通过分析命盘中的天干地支、五行生克、十神格局、大运流年等关键要素，
            可洞察其事业、婚姻、健康、子女、财运等方面的运势走向，
            为人生规划、重大决策、投资选择及风险规避提供可靠依据。
            同时结合喜用神分析，提出调整与优化建议，帮助趋吉避凶、提升人生运势。
          </p>

          <div class="mt-4 grid md:grid-cols-2 gap-4">
            <div class="p-2 border rounded-lg">
              <strong class="block">专属命盘推算</strong>
              <p class="text-sm">根据出生信息精确排出命盘，确保数据真实有效。</p>
            </div>
            <div class="p-2 border rounded-lg">
              <strong class="block">五行喜忌分析</strong>
              <p class="text-sm">解析五行生克制化，找出命中喜用神与忌神。</p>
            </div>
            <div class="p-2 border rounded-lg">
              <strong class="block">十神格局解读</strong>
              <p class="text-sm">分析十神组合，揭示事业、婚姻、财运等核心信息。</p>
            </div>
            <div class="p-2 border rounded-lg">
              <strong class="block">运势趋势预判</strong>
              <p class="text-sm">结合大运流年，预测未来机遇与挑战，提供决策参考。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系 -->
    <section id="contact" class="my-8 bg-[#fffaf6] rounded-2xl p-6 shadow-md">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h4 class="text-xl font-bold text-[#4a3628]">想要全面了解自己的命运蓝图吗？</h4>
          <p class="text-gray-700 mt-1">联系我们，提供出生时间、地点及性别，我们将为您排出详尽命盘并解读。</p>
        </div>
        <div class="flex items-center gap-3">
          <a href="#" class="px-5 py-3 bg-[#5a3e2b] text-white rounded shadow">成功案例</a>
        </div>
      </div>
    </section>




      <footer class="text-center text-sm text-gray-500 p-6">© 2025 忆福安文化平台 · 传承与关怀</footer>
   

  </div>
</template>

    
<script setup>
// 纯静态展示，无脚本逻辑


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
  const category = '八字'
  categoryTitle.value = category || '商品列表'

  if (!category) {
    console.warn('未指定分类')
    return
  }

  try {
    const res = await https.get('/api/fengshui/products/', {
      // params: { category }
      category: '八字' 
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
