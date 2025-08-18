<template>
  <div class="p-2 max-w-5xl md:mt-16 mx-auto bg-white shadow-md rounded-xl mb-16">
    <!-- 头部 -->
    <header class="max-w-5xl mx-auto px-4 py-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-full bg-[#f5e4d6] flex items-center justify-center text-[#5a3e2b] font-bold text-lg shadow">
            忆</div>
          <div>
            <h1 class="text-2xl font-extrabold text-[#5a3e2b]">忆福安 · 合婚分析</h1>
            <p class="text-sm text-[#7c5e47]">基于八字匹配，评估婚配相合程度与长期幸福潜力</p>
          </div>
        </div>

      </div>
    </header>
    <!-- <nav class="mb-4 ml-2 md:flex items-center gap-6 text-sm text-[#6b4f3a]">

      <a class=" px-4 py-2 bg-[#5a3e2b] text-white rounded shadow hover:opacity-95" href="#xiadan">下单预约合婚</a>
    </nav> -->

       <section id="xiadan
      ">
      <div class="px-1 ">

        <!-- <h1 class="text-xl font-bold  text-gray-800"> 下单:</h1> -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
          <div v-for="item in products" :key="item.url"
            class="bg-white p-2 rounded shadow hover:shadow-md transition cursor-pointer" @click="goToDetail(item.id)">
            <img :src="fullImage(item.cover_image)" class="w-full h-32 object-cover mb-2 rounded" />
            <div class="text-sm font-semibold">{{ item.name }}</div>
            <div class="text-red-500 font-bold mt-1">${{ item.price }}</div>
           <a @click="checkout2(item)" class="px-2 py-1 text-sm bg-[#5a3e2b] text-white rounded shadow hover:opacity-95" href="#xiadan">立即购买</a>
          </div>
        </div>
      </div>
    </section>


    <!-- 合婚分析 -->
    <section id="match" class="bg-white rounded-2xl p-2 shadow-md my-2">
      <div class="flex items-start gap-6">
        <div class="flex-1">
          <h3 class="text-xl font-bold text-[#4a3628]">合婚分析</h3>
          <p class="mt-2 text-gray-600">
            根据男女双方的生辰八字进行比对分析，评估双方命格是否匹配、五行相生相克关系以及婚姻生活的长期稳定性。
            我们从多维度考量两人是否“命理登对”，并给出改善建议与注意事项，帮助新人建立更稳固的婚姻基础。
          </p>

          <div class="mt-4 grid md:grid-cols-2 gap-4">
            <div class="p-2 border rounded-lg">
              <strong class="block">八字相合度</strong>
              <p class="text-sm">对比双方天干地支与五行配置，量化相合/相冲程度，判断整体匹配度。</p>
            </div>

            <div class="p-2 border rounded-lg">
              <strong class="block">婚姻运势评估</strong>
              <p class="text-sm">分析婚姻中的吉凶时段、感情稳定性、家庭与子女运势等关键因素。</p>
            </div>

            <div class="p-2 border rounded-lg">
              <strong class="block">助益与化解建议</strong>
              <p class="text-sm">提出实际的化解与增强方法（如择日、喜用神调整、风水与礼仪建议），提升双方互助能力。</p>
            </div>

            <div class="p-2 border rounded-lg">
              <strong class="block">决策参考</strong>
              <p class="text-sm">为结婚时机、婚礼择日、家庭规划等重大决策提供命理参考与可行建议。</p>
            </div>
          </div>

          <!-- <div class="mt-4 text-gray-700">
            <h4 class="text-lg font-semibold text-[#4a3628]">我们的合婚报告包含</h4>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>双方八字基础信息与五行强弱对比</li>
              <li>主要冲合关系与可能的矛盾点</li>
              <li>适宜的婚期与避免的禁忌日（如需择日另行服务）</li>
              <li>实用的化解与提升建议（风水、礼仪、生活建议等）</li>
            </ul>
          </div> -->
        </div>

        <!-- 可选图示/装饰 -->
        <!-- <div class="w-44 h-44 bg-[#f5e4d6] rounded-xl flex items-center justify-center text-[#5a3e2b] font-bold shadow">合婚</div> -->
      </div>
    </section>

    <!-- 联系 -->
    <section id="contact" class="my-2 bg-[#fffaf6] rounded-2xl p-2 shadow-md">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h4 class="text-xl font-bold text-[#4a3628]">想知道你们是否天作之合？</h4>
          <p class="text-gray-700 mt-1">提供双方出生时间、地点与姓名，我们将为您提供专业建议。</p>
        </div>
        <div class="flex items-center gap-3">

          <a href=" #" class="px-3 py-1 border border-[#cfa87a] text-[#5a3e2b] rounded">成功案例</a>
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
  const category = '合婚分析'
  categoryTitle.value = category || '商品列表'

  if (!category) {
    console.warn('未指定分类')
    return
  }

  try {
    const res = await https.get('/api/fengshui/products/', {
      // params: { category }
      category: '合婚分析' 
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
