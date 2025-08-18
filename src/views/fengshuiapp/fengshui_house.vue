<template>
  <div class="p-2 max-w-5xl md:mt-16 mx-auto bg-white shadow-md rounded-xl mb-16">
    <!-- 头部 -->
    <header class="max-w-5xl mx-auto px-2 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-[#f5e4d6] flex items-center justify-center text-[#5a3e2b] font-bold text-lg shadow">忆</div>
          <div>
            <h1 class="text-2xl font-extrabold text-[#5a3e2b]">忆福安 · 远程风水堪舆</h1>
            <p class="text-sm text-[#7c5e47]">住宅、商铺与墓地的专业远程堪舆服务 — 无需现场勘查</p>
          </div>
        </div>
       
      </div>
    </header>
    
  <section id="xiadan">
         <div class="px-2 ">
            
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

    

    <!-- 服务总述 -->
    <section class="bg-white rounded-2xl p-2 shadow-md my-6">
      <h3 class="text-2xl font-bold text-[#4a3628]">服务简介</h3>
      <p class="mt-2 text-gray-600">
        提供专业的远程风水堪舆服务，适用于住宅（Condo / Townhouse / House）、商铺与墓地等场景。
        全程通过平面图与地址资料进行分析，无需现场勘查。我们依据形势与方位，结合阴阳五行与理气法则，
        为您提供可执行的风水调整建议与电子鉴定报告。
      </p>
    </section>

    <!-- 住宅 -->
    <section id="residence" class="bg-white rounded-2xl p-2 shadow-md my-6">
      <div class="flex items-start gap-6">
        <div class="flex-1">
          <h4 class="text-2xl font-bold text-[#4a3628]">住宅（Condo / Townhouse / House）</h4>
          <p class="mt-2 text-gray-600">
            住宅堪舆全程远程进行。我们会根据平面图与方位，评估采光、朝向、门窗布局、主卧与炉灶位置的风水利弊，
            并结合家庭成员八字提出个性化化解与改善建议。
          </p>

          <div class="mt-4 grid md:grid-cols-2 gap-4">
            <div class="p-3 border rounded-lg">
              <strong class="block">鉴定方式</strong>
              <p class="text-sm">全程远端进行，无需现场勘查。使用等比例平面图与卫星图等资料进行分析。</p>
            </div>
            <div class="p-3 border rounded-lg">
              <strong class="block">所需数据</strong>
              <p class="text-sm">建物地址、等比例平面图（平面图需标注朝向）、家庭基本资料（出生时间可选）。</p>
            </div>
            <div class="p-3 border rounded-lg">
              <strong class="block">鉴定结果</strong>
              <p class="text-sm">文字鉴定报告（电子文件），含问题点、原因分析与可行调整建议。</p>
            </div>
            <div class="p-3 border rounded-lg">
              <strong class="block">注意事项</strong>
              <p class="text-sm">针对公寓/联排/独立屋的不同格局提供差异化建议，兼顾实际可执行性。</p>
            </div>
          </div>

          <!-- 定价 -->
          <div class="mt-4">
            <h5 class="text-lg font-semibold text-[#4a3628]">参考定价</h5>
            <div class="mt-2 grid sm:grid-cols-2 gap-3">
              <div class="p-3 border rounded-lg">
                <div class="flex items-baseline justify-between">
                  <div>
                    <div class="text-sm text-gray-600">Condo / Townhouse / House（首 100 ㎡）</div>
                    <div class="text-xl font-bold text-[#5a3e2b]">100 ㎡ · $398 </div>
                  </div>
                </div>
              </div>
              <div class="p-3 border rounded-lg">
                <div class="text-sm text-gray-600">超出部分</div>
                <div class="text-xl font-bold text-[#5a3e2b]">$200 / 每 50 ㎡</div>
              </div>
            </div>
          
          </div>
        </div>

       
      </div>
    </section>

    <!-- 商铺 -->
    <section id="shop" class="bg-white rounded-2xl p-2 shadow-md my-6">
      <div class="flex items-start gap-6">
        <div class="flex-1">
          <h4 class="text-2xl font-bold text-[#4a3628]">商铺堪舆</h4>
          <p class="mt-2 text-gray-600">
            商铺远程鉴定侧重于门面朝向、门口气场、货架与收银区布置、后场（仓储）与员工动线等要素，
            结合行业属性给出提升客流、促销与财运的优化建议。
          </p>

          <div class="mt-4 grid md:grid-cols-2 gap-4">
            <div class="p-3 border rounded-lg">
              <strong class="block">鉴定方式</strong>
              <p class="text-sm">全程远端进行，基于平面图与门面照片分析。</p>
            </div>
            <div class="p-3 border rounded-lg">
              <strong class="block">所需数据</strong>
              <p class="text-sm">商铺地址、平面图、门面照片、经营业态与营业时间等基础信息。</p>
            </div>
            <div class="p-3 border rounded-lg">
              <strong class="block">鉴定结果</strong>
              <p class="text-sm">文字鉴定报告（电子文件），并可选配改善图示与布局建议。</p>
            </div>
            <div class="p-3 border rounded-lg">
              <strong class="block">附加服务</strong>
              <p class="text-sm">可提供布局示意图、配色与招牌建议（收费另议）。</p>
            </div>
          </div>

          <!-- 定价 -->
          <div class="mt-4">
            <h5 class="text-lg font-semibold text-[#4a3628]">参考定价</h5>
            <div class="mt-2 grid sm:grid-cols-2 gap-3">
              <div class="p-3 border rounded-lg">
                <div class="flex items-baseline justify-between">
                  <div>
                    <div class="text-sm text-gray-600">商铺（首 100 ㎡以内）</div>
                    <div class="text-xl font-bold text-[#5a3e2b]">100 ㎡ · $480 </div>
                  </div>
                </div>
              </div>
              <div class="p-3 border rounded-lg">
                <div class="text-sm text-gray-600">超出部分</div>
                <div class="text-xl font-bold text-[#5a3e2b]">$220 / 每 50 ㎡</div>
              </div>
            </div>
          
          </div>


        </div>

       
      </div>
    </section>

    <!-- 墓地 -->
    <section id="tomb" class="bg-white rounded-2xl p-2 shadow-md my-6">
      <div class="flex items-start gap-6">
        <div class="flex-1">
          <h4 class="text-2xl font-bold text-[#4a3628]">墓地远程堪舆</h4>
          <p class="mt-2 text-gray-600">
            远程堪舆针对墓地将根据地形、环境与方位等因素，量身订做阴宅风水方案。
            无论山地还是平原，我们都能通过地图、航拍图与地形资料找到最适合的安葬位置并提出化解建议。
          </p>

          <div class="mt-4 grid md:grid-cols-2 gap-4">
            <div class="p-3 border rounded-lg">
              <strong class="block">鉴定方式</strong>
              <p class="text-sm">远程分析地形、方位、周边环境与水系走向，结合当地风水禁忌给出结论。</p>
            </div>
            <div class="p-3 border rounded-lg">
              <strong class="block">所需数据</strong>
              <p class="text-sm">墓地位置、航拍/卫星图、地形说明以及家族信息（如适用）。</p>
            </div>
            <div class="p-3 border rounded-lg">
              <strong class="block">鉴定结果</strong>
              <p class="text-sm">提供电子鉴定报告与可行化解方案（含方位建议与安葬注意）。</p>
            </div>
            <div class="p-3 border rounded-lg">
              <strong class="block">参考价格</strong>
              <p class="text-sm">标准远程占地报告 $398（具体视地形与资料复杂度可调整）。</p>
            </div>
          </div>
        </div>

        
      </div>
    </section>

    <!-- CTA / 联系 -->
    <section id="contact" class="my-8 bg-[#fffaf6] rounded-2xl p-6 shadow-md">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h4 class="text-xl font-bold text-[#4a3628]">需要远程风水鉴定？</h4>
          <p class="text-gray-700 mt-1">请准备好地址、平面图及相关资料，点击下单或发送资料给我们，我们将在 3 个工作日内返回详尽报告。</p>
        </div>
        <div class="flex items-center gap-3">
          <a href="/fengshui_products" class="px-5 py-3 bg-[#5a3e2b] text-white rounded shadow">下单远程堪舆</a>
          <a href="mailto:contact@nearnet.ca" class="px-4 py-3 border border-[#cfa87a] text-[#5a3e2b] rounded">发送资料</a>
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
  const category = '房屋风水'
  categoryTitle.value = category || '商品列表'

  if (!category) {
    console.warn('未指定分类')
    return
  }

  try {
    const res = await https.get('/api/fengshui/products/', {
      // params: { category }
      category: '房屋风水' 
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
