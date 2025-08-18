<template>
  <div class="p-2 max-w-5xl md:mt-16 mx-auto bg-white shadow-md rounded-xl mb-16">
    <!-- 头部 -->
    <header class="max-w-5xl mx-auto px-2 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-[#f5e4d6] flex items-center justify-center text-[#5a3e2b] font-bold text-lg shadow">忆</div>
          <div>
            <h1 class="text-xl font-extrabold text-[#5a3e2b]"> 紫薇斗数命盘分析</h1>
            <p class="text-sm text-[#7c5e47]">以星曜与宫位为据，洞察人生格局与运势节律</p>
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
                @click="goToDetail(item.id)">
                <img :src="fullImage(item.cover_image)" class="w-full h-32 object-cover mb-2 rounded" />
                <div class="text-sm font-semibold">{{ item.name }}</div>
                <div class="text-red-500 font-bold mt-1">${{ item.price }}</div>
                 <a @click="checkout2(item)" class="px-2 py-1 text-sm bg-[#5a3e2b] text-white rounded shadow hover:opacity-95" href="#xiadan">立即购买</a>
              </div>
            </div>
          </div>
      </section>


    <!-- 紫薇斗数 -->
    <section id="ziwei" class="bg-white rounded-2xl p-2 shadow-md my-6">
      <div class="flex items-start gap-3">
        <div class="flex-1">
          <h3 class="text-2xl font-bold text-[#4a3628]">紫薇斗数命盘分析</h3>
          <p class="mt-2 text-gray-600">
            通过排出紫薇斗数命盘，分析十二宫位与各星曜组合的影响，全面推算个人的性格特质、事业走向、婚姻家庭、财富与健康等面向。
            紫微斗数擅长解析人生大限（每十年运势）与流年（逐年运势）的变化，帮助您把握关键时期、规避风险并抓住机缘。
          </p>

          <div class="mt-4 grid md:grid-cols-2 gap-4 text-gray-700">
            <div class="p-3 border rounded-lg">
              <strong class="block">十二宫位解读</strong>
              <p class="text-sm">逐宫分析命、兄弟、夫妻、子女、事业、财帛、疾厄等，揭示不同人生领域的潜能与盲点。</p>
            </div>

            <div class="p-3 border rounded-lg">
              <strong class="block">主星与副星组合</strong>
              <p class="text-sm">解读紫微、天机、太阳、武曲等主星与辅星的组合，评估吉凶力量与偏向。</p>
            </div>

            <div class="p-3 border rounded-lg">
              <strong class="block">大限（十年运）分析</strong>
              <p class="text-sm">分段解析人生各大运程，指出优势期、转折点与需谨慎的阶段，便于中长期规划。</p>
            </div>

            <div class="p-3 border rounded-lg">
              <strong class="block">流年（年度）预测</strong>
              <p class="text-sm">逐年评估当年运势走向，标注重要机遇与潜在风险，提供可执行的防范或把握建议。</p>
            </div>

            <div class="p-3 border rounded-lg">
              <strong class="block">实用建议</strong>
              <p class="text-sm">将命盘结论转化为现实可行的建议（如择业、择时、合作人选择、健康防护等）。</p>
            </div>

            <!-- <div class="p-3 border rounded-lg">
              <strong class="block">报告内容</strong>
              <p class="text-sm">提供详尽电子命盘图、逐宫解析、大限与流年表、以及个性化结论与建议。</p>
            </div> -->
          </div>
          <section class="bg-white rounded-2xl p-4 shadow-md my-6">
  <h3 class="text-lg font-bold text-[#4a3628]">大师简介</h3>
  <p class="mt-2  text-gray-700">
    家树，号家树道人。自幼受家乡孔孟传统国学熏陶，研习堪舆、紫微斗数、科仪符箓等五术秘学。后皈依龙虎山天师府正一道，专研时家奇门，得当代六壬大家刘、袁恩师点化，精通紫薇穿壬、象断乾坤等秘法。
  </p>
  <p class="mt-2 text-gray-700">
    从事易学研究二十余载，凭借“实断、实解、实策”的实战派风格著称，致力为众生排忧解难，趋吉避凶。
  </p>
  <p class="mt-2 text-gray-700">
    现任中国周易天启实战派预测专家，陕西省周文化研究会副秘书长，济南华山国学文化中心创始人。
  </p>
</section>

          <div class="mt-4 text-gray-700">
            <h4 class="text-lg font-semibold text-[#4a3628]">适用对象</h4>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>希望了解自身天赋与职业方向的人</li>
              <li>需要评估婚姻与家庭关系的个人或伴侣</li>
              <li>计划重大投资、创业或职业转型者</li>
              <li>关注年度运势与重要时点的人士</li>
            </ul>
          </div>
        </div>

        <!-- 装饰 / 简要卡片 -->
        <!-- <div class="hidden md:flex w-44 h-44 bg-[#f5e4d6] rounded-xl items-center justify-center text-[#5a3e2b] font-bold shadow">
          星盘
        </div> -->
      </div>
    </section>

    <!-- 分析流程 -->
    <section class="bg-white rounded-2xl p-4 shadow-md my-6">
      <h4 class="text-lg font-semibold text-[#4a3628]">分析流程</h4>
      <ol class="list-decimal pl-5 mt-3 text-gray-700 space-y-2">
        <li>提交资料：提供出生年/月/日/时、性别与出生地点（尽量精确）。</li>
        <li>排盘计算：依据出生资料生成紫微斗数命盘与星曜位置。</li>
        <li>深度解读：逐宫与星曜组合分析，同时给出大限与流年结论。</li>
        <!-- <li>交付报告：提供电子报告（含命盘图表与文字解读）并附实用建议。</li> -->
      </ol>
    </section>

    <!-- 联系 CTA -->
    <section id="contact" class="my-8 bg-[#fffaf6] rounded-2xl p-4 shadow-md">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h4 class="text-xl font-bold text-[#4a3628]">想查看未来运势吗？</h4>
          <p class="text-gray-700 mt-1">联系我们，提供详细出生信息与关注领域。</p>
        </div>
        <!-- <div class="flex items-center gap-3">
          <a href="/ziwei_products" class="px-5 py-3 bg-[#5a3e2b] text-white rounded shadow">下单预约紫薇命盘</a>
          <a href="mailto:contact@nearnet.ca" class="px-4 py-3 border border-[#cfa87a] text-[#5a3e2b] rounded">发送资料咨询</a>
        </div> -->
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
  const category = '紫薇斗数'
  categoryTitle.value = category || '商品列表'

  if (!category) {
    console.warn('未指定分类')
    return
  }

  try {
    const res = await https.get('/api/fengshui/products/', {
      // params: { category }
      category: '紫薇斗数' 
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
