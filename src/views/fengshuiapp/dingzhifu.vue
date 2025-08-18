<template>
  <div class="p-2 max-w-5xl md:mt-16 mx-auto bg-white shadow-md rounded-xl mb-16">
    <!-- 头部 -->
    <header class="max-w-5xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-[#f5e4d6] flex items-center justify-center text-[#5a3e2b] font-bold text-lg shadow">忆</div>
          <div>
            <h1 class="text-2xl font-extrabold text-[#5a3e2b]">忆福安 · 定制符箓</h1>
            <p class="text-sm text-[#7c5e47]">承传正一道法科仪，为您绘制专属符篆，化煞祈福、镇宅开运</p>
          </div>
        </div>
        
      </div>
    </header>

     <section id="xiadan">
         <div class="px-4 ">
            
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

    <!-- 定制符箓 -->
    <section id="fu" class="bg-white rounded-2xl p-2 shadow-md my-6">
      <div class="flex items-start gap-6">
        <div class="flex-1">
          <h3 class="text-2xl font-bold text-[#4a3628]">定制符箓（化煞·镇宅·祈福·开运）</h3>
          <p class="mt-2 text-gray-600">
            传承正一道法科仪，根据个人八字绘制专属符篆，用于化煞镇宅、祈福安康、开运助缘等。
            每一张符箓均由道长斋戒沐浴、誦咒入坛后以百年朱砂与针对性材料手工绘制，结坛送圣并以香火供奉与诵经加持。
          </p>

          <div class="mt-4 grid md:grid-cols-2 gap-4 text-gray-700">
            <div class="p-3 border rounded-lg">
              <strong class="block">材料用料</strong>
              <p class="text-sm">采用百年珍藏朱砂，配以经咒指定的纸墨与笔，确保符箓质地与持咒效力。</p>
            </div>

            <div class="p-3 border rounded-lg">
              <strong class="block">仪式准备</strong>
              <p class="text-sm">书符前，道长须斋戒沐浴并以神咒静心、静口、静坛，敬天地、焚香礼拜，恭迎神灵。</p>
            </div>

            <div class="p-3 border rounded-lg">
              <strong class="block">开坛入炁</strong>
              <p class="text-sm">以神咒敕具（敕墨、敕纸、敕笔），调身调心请神入坛，入炁存神，使符具与神炁相通。</p>
            </div>

            <div class="p-3 border rounded-lg">
              <strong class="block">书写与敕符</strong>
              <p class="text-sm">配合对应咒语、指诀与步法，入炁注力于笔端，完成符篆书写后进行敕符、盖印与结坛送圣程序。</p>
            </div>

            <div class="p-3 border rounded-lg">
              <strong class="block">加持与供奉</strong>
              <p class="text-sm">书成后进行香火供奉与誦经加持（通常为期七天），以稳固符箓之效力与神力传承。</p>
            </div>

            <div class="p-3 border rounded-lg">
              <strong class="block">特殊技法</strong>
              <p class="text-sm">依据个案需要可配合取炁入讳、设狱结煞等秘法，以增强化解或护佑效果（需与道长沟通）。</p>
            </div>
          </div>

          <div class="mt-4 text-gray-700">
            <h4 class="text-lg font-semibold text-[#4a3628]">适用场景与注意事项</h4>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>化煞镇宅：家宅、店铺出现煞气或方位不利时的化解方案。</li>
              <li>祈福安康：为个人或家庭祈求平安与健康的护佑之物。</li>
              <li>开运助缘：在重要节点（婚姻、签约、开业）前辅助提升运势。</li>
              <li>使用说明：符箓交付后请按道长指导安装、焚化或随身携带，避免随意处置。</li>
              <li>法规与伦理：符箓为信仰与仪式性物品，请勿用于违法或伤害他人的行为。</li>
            </ul>
          </div>

          <div class="mt-4">
            <h5 class="text-lg font-semibold text-[#4a3628]">定制流程与所需资料</h5>
            <ol class="list-decimal pl-5 mt-2 space-y-2 text-gray-700">
              <li>提交申请：提供姓名、出生年/月/日/时（八字）与使用目的说明。</li>
              
              <li>斋戒开坛：道长按仪式进行斋戒、开坛与书符。</li>
              <li>加持与交付：完成七天加持后邮寄交付，并附使用说明与注意事项。</li>
            </ol>
          </div>

           <!-- 制符人简介 -->
        <aside class="w-full  p-4 border rounded-lg bg-[#fffaf6]">
          <h5 class="text-lg font-semibold text-[#4a3628] mb-2">制符人 · 张宗旭</h5>
          <p class="text-sm text-gray-700 leading-relaxed">
            全真龙门二十三代弟子，承白云山正宗法脉。青年云游四海，礼谒高真大德，潜心修学二十余载。精通科仪、符法与水法，现隐修于终南山麓，潜心研修丹道。
          </p>
          <div class="mt-3">
            <p class="text-sm text-gray-600"><strong>专长：</strong>符法、科仪、风水、水法、丹道</p>
            <p class="text-sm text-gray-600 mt-1"><strong>交付：</strong>完成七日加持后邮寄或现场交付（按双方约定）</p>
          </div>
        </aside>

          <div class="mt-4 flex items-center gap-3">
            <!-- <a href="/dingzhifu_products" class="px-5 py-3 bg-[#5a3e2b] text-white rounded shadow">下单定制符箓</a> -->
            <a href="#" class="px-4 py-3 border border-[#cfa87a] text-[#5a3e2b] rounded">成功案例</a>
          </div>
        </div>

   
      </div>
    </section>

    


      <footer class="text-center text-sm text-gray-500 p-6">© 2025 忆福安文化平台 · 传承与关怀</footer>
   


  </div>
</template >

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
  const category = '定制道符'
  categoryTitle.value = category || '商品列表'

  if (!category) {
    console.warn('未指定分类')
    return
  }

  try {
    const res = await https.get('/api/fengshui/products/', {
      // params: { category }
      category: '定制道符' 
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
