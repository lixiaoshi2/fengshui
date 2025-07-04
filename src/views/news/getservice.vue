<template>
  <van-nav-bar title="萝卜保洁" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
    <template #title>
      <label class="block text-lg font-medium text-gray-700">萝卜保洁</label>
    </template>
  </van-nav-bar>



<!-- 
  <div class="px-4 py-6">
    <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">我们的服务</h2>
    <div class="flex justify-center">
      <div class="bg-white rounded-2xl shadow p-4 text-center max-w-[700px] w-full">
        <img src="@/assets/images/getservice.jpg" alt="保洁服务" class="w-full h-auto rounded-lg mb-2" />
        <p class="text-gray-700">保洁服务</p>
      </div>
    </div>
  </div> -->

  <section class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Hero -->
    <header class="flex-grow flex items-center justify-center">
      <div class="w-full max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 class="text-3xl md:text-5xl font-extrabold text-blue-600 mb-4">
          小萝卜家政平台
        </h1>
        <p class="text-gray-700 md:text-lg leading-relaxed">
          连接家政人员与雇主的 <span class="font-semibold">智能撮合平台</span>，双向选择，让找人、用人更省心。
        </p>
        <button @click="router.push('/user_register')"
          class="mt-8 inline-block bg-blue-600 text-white rounded-full px-6 py-3 font-medium shadow hover:bg-blue-700 transition">
          立即加入，享受专业服务
        </button>
      </div>
    </header>

    <!-- Content -->
    <main class="w-full max-w-4xl mx-auto px-4 py-8 space-y-10">
      <!-- 费用透明 -->
      <article class="">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">费用透明 · 业内最低</h2>
        <ul class="list-disc pl-5 space-y-2 text-gray-700">
          <li>雇主仅需 <span class="font-semibold text-blue-600">30 元</span>，即可获取 <span class="font-semibold">1 名家政人员</span>联系方式，重复使用不限次。</li>
          <li>平台对家政人员 <span class="font-semibold">免佣金</span>，真正把收入留给劳动者。</li>
          <li>总收费仅为市场同类平台的 <span class="font-semibold">十分之一甚至更低</span>。</li>
        </ul>
      </article>

      <!-- 评价体系 -->
      <article>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">评价体系 · 优中选优</h2>
        <ul class="list-disc pl-5 space-y-2 text-gray-700">
          <li>雇主通过真实评价快速锁定优质从业者。</li>
          <li>家政人员凭服务质量赢得更多订单，良币驱逐劣币。</li>
          <li>若抢单者无视自身条件接活，雇主可一键差评，平台自动降低其曝光。</li>
        </ul>
      </article>

      <!-- 双向匹配 -->
      <article>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">双向多环节匹配 · 高效撮合</h2>
        <ul class="list-disc pl-5 space-y-2 text-gray-700">
          <li>雇主需清晰描述：工作内容、时间、技能要求。</li>
          <li>家政人员需清晰描述：工作内容、可服务时间及特长。</li>
          <li>雇主先发起初选，家政人员再次确认后接单。</li>
          <li>家政人员根据雇主的要求，结合自己的条件理性抢单，避免强错单，浪费雇主的机会，提升匹配的有效性。</li>
          <li>先到先得，响应最快者优先获得工作机会，提升查找的效率。</li>
        </ul>
      </article>

      <!-- 距离优先 -->
      <article>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">节省成本</h2>
        <ul class="list-disc pl-5 space-y-2 text-gray-700">
          <li>庞大的地理位置数据库，自动优先推荐近距离人选。</li>
          <li>降低交通与时间成本，配合家政免佣金政策。</li>
          <li>兼职人员以及灵活就业人员加入，进一步降低成本。</li>
          <li>综合以上可节省 <span class="font-semibold">30% 以上</span>。</li>
        </ul>
      </article>

      <!-- 平台定位 -->
      <article>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">平台定位 · 信息桥梁</h2>
        <p class="text-gray-700 leading-relaxed">
          小萝卜仅提供撮合与信息服务，不介入雇主与家政人员的具体交易，也不承担双方纠纷责任。平台收费极低、运行自动化，无法提供额外补偿——支付前请确认接受此条款。
        </p>
      </article>
    </main>

    <!-- Call to action -->
    <footer class="bg-blue-600 text-white text-center py-6 mb-16">
      <p class="text-lg font-semibold mb-2">选择小萝卜，省钱、省时、更专业</p>
      <button class="bg-white text-blue-600 font-medium rounded-full px-6 py-2 hover:bg-gray-100 transition">
        马上体验
      </button>
    </footer>
  </section>





</template>
  
  <script setup>

  import { ref, onMounted, computed, reactive } from 'vue';
  
  import { useRouter, useRoute } from 'vue-router'
  import { useHead } from '@vueuse/head'
  
  const router = useRouter()
  const route = useRoute()
  

 
  </script>
  
  
  <style scoped>
  
  
  </style>