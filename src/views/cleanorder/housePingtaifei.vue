
<template>
  <!-- <van-nav-bar title="新增房源" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar> -->

  <header class="w-full bg-blue-500 text-white py-4 shadow-md flex items-center">
  <button @click="router.go(-1)" class="ml-4 flex items-center">
    <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path>
    </svg>
    返回
  </button>
  <h1 class="text-xl font-bold flex-1 text-center mr-10">小萝卜民宿</h1>
</header>


  <div style="" class="max-w-3xl mx-auto mb-10 p-8 bg-white shadow-lg rounded-lg">
  <h1 class="text-2xl font-bold text-gray-800 mb-4">收费说明</h1>
  <p class="text-gray-700 mb-2">
    <strong>收费目的：</strong> 我们致力于为业主提供高效、可靠的家政保洁与维护服务。为了更好地协调和分配专业人员，我们引入了一次性会员费制度，确保服务的高效运转和资源合理配置。
  </p>
  <p class="text-gray-700 mb-2">
    <strong>收费标准：</strong>
  </p>
  <ul class="list-disc list-inside text-gray-700 mb-4">
    <li>民宿业主：每次需缴纳 <strong>100元以上</strong> 的会员费。</li>
    <li>民居业主：每次需缴纳 <strong>50元以上</strong> 的会员费。</li>
  </ul>
  <p class="text-gray-700 mb-4">
    每次服务时，<strong>平台会从已缴纳的会员费中扣除 5元</strong> 作为平台服务费，业主无需额外支付。会员费余额不足时，业主需重新缴纳下一笔会员费，以便继续享受平台服务。
  </p>
  <p class="text-gray-700 mb-4">
    <strong>举例说明：</strong><br>
    <strong>民居保洁案例：</strong><br>
    假设您预订了一次 2 小时的民居保洁服务，保洁费总计为 <strong>80元</strong>。其中，<strong>5元作为平台服务费</strong>，从您已缴纳的会员费中扣除。<br>
    <strong>因此，您只需支付 75元给保洁员</strong>，无需额外支付平台服务费。
  </p>
  <p class="text-gray-700 mb-4">
    <strong>为什么选择我们？</strong>
  </p>
  <ul class="list-disc list-inside text-gray-700 mb-4">
    <li>专业服务：我们合作的保洁与维护人员均经过严格筛选，确保服务质量。</li>
    <li>灵活调度：根据业主需求，快速匹配合适的服务人员。</li>
    <li>费用透明：无隐性收费，业主与保洁人员直接结算，平台费用由会员费扣除。</li>
  </ul>
  <a href="/housepingtaifei" 
     class="w-full bg-blue-500 text-white py-3 rounded-lg font-bold text-center block hover:bg-blue-600">
    支付会员费
  </a>
</div>


</template>

<script setup>
import axios from 'axios';
import config from '@/global.config.js'
import md5 from 'js-md5'
// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';
import funcs from '@/utils/common_func.js';

import { showToast, showDialog } from 'vant';
import { ref, onMounted, computed,reactive } from 'vue';

import { useRouter,useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const router = useRouter()
const route = useRoute()

const category_url = ref('')
const house = ref('')

onMounted(() => {
  console.log('rout',route.params)
  var id =route.params.id
  console.log('id',id)
  https.get(('/api/minsubaojie/housedetail/'+id+'/')).then(response => {
      console.log(response);
      house.value = response      
    }).catch(error => {
      console.log('出错了2');
      console.error(error);
      // showToast('请重新登录');
    });

})

</script>


<style scoped>
 :deep(img) {
  max-width: 100%; /* 图片最大宽度为父元素宽度的100% */
  height: auto; /* 高度自动调整，保持宽高比 */
}

:deep(.van-cell__value) {
    position: relative;
    overflow: hidden;
    color: #140114;
    text-align: left;
    font-size: 18px;
    vertical-align: middle;
    word-wrap: break-word;
}
:deep(p){
  line-height: 35px;
}

</style>