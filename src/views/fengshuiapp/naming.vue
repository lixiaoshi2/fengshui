<template>
  <div class="p-2 max-w-5xl md:mt-16 mx-auto bg-white shadow-md rounded-xl mb-16">



    <header class="max-w-5xl mx-auto px-2 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-full bg-[#f5e4d6] flex items-center justify-center text-[#5a3e2b] font-bold text-lg shadow">
            忆</div>
          <div>
            <h1 class=" text-xl font-extrabold text-[#5a3e2b]">忆福安 · 起名改名服务</h1>
            <p class="text-sm text-[#7c5e47]">传承东方智慧 · 与姓名合和，助旺人运与事业</p>
          </div>
        </div>
        <!-- <nav class="hidden md:flex items-center gap-6 text-sm text-[#6b4f3a]">
          <a class="hover:underline" href="#personal">宝宝/成人起名</a>
          <a class="hover:underline" href="#business">企业取名</a>
          <a class="px-4 py-2 bg-[#5a3e2b] text-white rounded shadow hover:opacity-95" href="#xiadan">下单起名</a>
        </nav> -->
      </div>
    </header>
    <!-- // -->

    <main class="max-w-5xl mx-auto px-0">
      <!-- Hero -->
   
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


      <section class="grid px-2  gap-8 items-center my-8">
        <div class="space-y-4">
          <h2 class="text-xl md:text-4xl font-extrabold text-[#4a3628]">为人生正名 · 以名助运</h2>
          <p class="text-gray-600 leading-relaxed">
            结合命主四柱八字与家庭信息，精研姓名的音、形、义、数理及五行配比，量身定制既端庄又吉祥的名字。无论是婴幼儿起名、成人改名，还是企业命名，我们都用传统命理与现代审美相结合的方式，提升命主福泽。</p>

          <!-- <div class="flex gap-3 mt-4">
           
            <a href="#business" class="px-4 py-2 border border-[#cfa87a] text-[#5a3e2b] rounded">企业取名改名</a>
          </div> -->
        </div>

      </section>

      <!-- Personal Naming -->
      <section id="personal" class="bg-white rounded-2xl p-4 shadow-md my-6">
        <div class="flex items-start gap-6">
          <div class="flex-1">
            <h3 class="text-2xl font-bold text-[#4a3628]">宝宝名 / 成人名</h3>
            <p class="mt-2 text-gray-600">结合命主四柱八字，并参考家庭成员四柱信息，为婴幼儿、儿童及成人起名或改名。确保姓名在音、形、义、数理及五行上与命格相合，助旺运势，提升人生福泽。</p>

            <ul class="mt-4 grid md:grid-cols-2 gap-2 text-gray-700">
              <li class="p-2 border rounded-lg">

                <p class="text-sm"><strong>音：</strong>注重名字读音流畅、寓意吉祥、避免音近不雅词。</p>
              </li>
              <li class="p-4 border rounded-lg">

                <p class="text-sm"><strong>形：</strong>字形美观、结构协调，与姓氏搭配自然得体。</p>
              </li>
              <li class="p-4 border rounded-lg">

                <p class="text-sm"><strong>义： </strong>名字义理吉祥，朗朗上口且易于传播。</p>
              </li>
              <li class="p-4 border rounded-lg">

                <p class="text-sm"> <strong>数理与五行：</strong>计算天格、人格、地格、外格、总格并配合五行喜忌，形成理想配置。</p>
              </li>
            </ul>
          </div>
          <!-- <div class="w-44 h-44 bg-[#f5e4d6] rounded-xl flex items-center justify-center text-[#5a3e2b] font-bold shadow">起名</div> -->
        </div>
      </section>

      <!-- Business Naming -->
      <section id="business" class="bg-white rounded-2xl p-4 shadow-md my-6">
        <div class="flex items-start gap-6">
          <div class="flex-1">
            <h3 class="text-2xl font-bold text-[#4a3628]">企业取名 / 改名</h3>
            <p class="mt-2 text-gray-600">根据企业经营项目性质及法人代表的四柱八字，综合行业属性与命理喜忌，制定契合企业气运与品牌形象的吉祥名称，助力事业兴旺、财运亨通。</p>

            <div class="mt-4 grid md:grid-cols-2 gap-4">
              <div class="p-2 border rounded-lg">
                <strong class="block">行业与定位</strong>
                <p class="text-sm">根据行业属性选择字面与音律，提升品牌辨识度与信赖感。</p>
              </div>
              <div class="p-4 border rounded-lg">
                <strong class="block">法人八字匹配</strong>
                <p class="text-sm">参考法人及主要合伙人的八字，优化公司名称的五行配比。</p>
              </div>

              <div class="p-4 border rounded-lg">
                <strong class="block">品牌寓意</strong>
                <p class="text-sm">名字寓意与品牌愿景一致，便于传播与记忆。</p>
              </div>
            </div>
          </div>
          <!-- <div class="w-44 h-44 bg-[#f5e4d6] rounded-xl flex items-center justify-center text-[#5a3e2b] font-bold shadow">企业名</div> -->
        </div>
      </section>

      <!-- CTA -->
      <section id="contact" class="my-8 bg-[#fffaf6] rounded-2xl p-6 shadow-md">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h4 class="text-xl font-bold text-[#4a3628]">准备好为名字注入福气了吗？</h4>
            <p class="text-gray-700 mt-1">联系我们，准备好出生时间或企业资料，我们安排您和老师详谈。</p>
          </div>

          <div class="flex items-center gap-3">
            <a href="/qimingproducts" class="px-5 py-3 bg-[#5a3e2b] text-white rounded shadow">查看案例</a>
          
          </div>
        </div>
      </section>

    


      <footer class="text-center text-sm text-gray-500 p-6">© 2025 忆福安文化平台 · 传承与关怀</footer>
    </main>


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
  const category = '烧纸'
  categoryTitle.value = category || '商品列表'

  if (!category) {
    console.warn('未指定分类')
    return
  }

  try {
    const res = await https.get('/api/fengshui/products/', {
      // params: { category }
      category: '起名' 
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
