<template>
  <div class="p-2 max-w-5xl md:mt-16 mx-auto bg-white shadow-md rounded-xl mb-16">
    <!-- 头部 -->
    <header class="max-w-5xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-[#f5e4d6] flex items-center justify-center text-[#5a3e2b] font-bold text-lg shadow">忆</div>
          <div>
            <h1 class="text-2xl font-extrabold text-[#5a3e2b]">忆福安 · 流年运势预测</h1>
            <p class="text-sm text-[#7c5e47]">洞察当年运势，趋吉避凶，把握关键机遇</p>
          </div>
        </div>
       
      </div>
    </header>
     <!-- <nav class="mb-4 ml-2 md:flex items-center gap-6 text-sm text-[#6b4f3a]">
        <a class="px-4 py-2 bg-[#5a3e2b] text-white rounded shadow hover:opacity-95" href="#xiadan">下单预约</a>
        </nav> -->

          <section id="xiadan">
         <div class="px-0 ">
            
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


    <!-- 流年运势预测分析 -->
    <section id="liunian" class="bg-white rounded-2xl p-2 shadow-md my-6">
      <div class="flex items-start gap-6">
        <div class="flex-1">
          <h3 class="text-xl font-bold text-[#4a3628]">流年运势预测分析</h3>
          <p class="mt-2 text-gray-600">
            通过对出生年、月、日、时对应的天干地支推算命盘，并结合大运、流年与小运等要素进行综合分析，
            系统评估当年运势的喜忌与变化，为年度决策与生活安排提供参考。
          </p>

          <div class="mt-4 grid md:grid-cols-2 gap-4">
            <div class="p-2 border rounded-lg">
              <strong class="block">趋吉避凶</strong>
              <p class="text-sm">提前识别当年可能的阻碍与风险，提出化解与应对建议，减少不利影响。</p>
            </div>

            <div class="p-2 border rounded-lg">
              <strong class="block">把握机遇</strong>
              <p class="text-sm">提示当年可能出现的有利时机（如事业、投资、婚姻等），帮助你提前布局以争取最佳收益。</p>
            </div>

            <div class="p-2 border rounded-lg">
              <strong class="block">自我认知</strong>
              <p class="text-sm">通过流年分析，加深对自身情绪、能量与处事风格的认识，优化个人发展策略。</p>
            </div>

            <div class="p-2 border rounded-lg">
              <strong class="block">决策支持</strong>
              <p class="text-sm">将流年结论转化为可执行建议（如择时、出行、签约、家庭安排），助您做出更稳妥的选择。</p>
            </div>
          </div>

          <div class="mt-4 text-gray-700">
            <h4 class="text-lg font-semibold text-[#4a3628]">我们的分析包含</h4>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>四柱排盘与五行力量评估</li>
              <li>大运流年交互影响分析</li>
              <li>重点月份与吉凶时段标注</li>
              <li>个性化化解与加强方案（配合风水、时辰或行为建议）</li>
            </ul>
          </div>
        </div>

        <!-- 可选图标/简介区 -->
        <!-- <div class="w-44 h-44 bg-[#f5e4d6] rounded-xl flex items-center justify-center text-[#5a3e2b] font-bold shadow">流年</div> -->
      </div>
    </section>

    <!-- 联系 -->
    <section id="contact" class="my-8 bg-[#fffaf6] rounded-2xl p-2 shadow-md">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h4 class="text-xl font-bold text-[#4a3628]">想了解本年的运势趋势吗？</h4>
          <p class="text-gray-700 mt-1">联系我们，提供出生信息与关注的领域（事业/财富/感情/健康），我们将在 1-3 个工作日内返回详尽流年报告与实用建议。</p>
        </div>
        <div class="flex items-center gap-3">
          
          <a href="mailto:contact@nearnet.ca" class="px-4 py-3 border border-[#cfa87a] text-[#5a3e2b] rounded">成功案例</a>
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
  const category = '流年运势'
  categoryTitle.value = category || '商品列表'

  if (!category) {
    console.warn('未指定分类')
    return
  }

  try {
    const res = await https.get('/api/fengshui/products/', {
      // params: { category }
      category: '流年运势' 
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
