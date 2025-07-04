
<template>
  <van-nav-bar title="小萝卜保洁" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
    <template #title>
      <label class="block text-lg font-medium text-gray-700">新增保洁阿姨</label>
    </template>
  </van-nav-bar>


  <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-6 text-center">保洁员详情</h1>
    
    <!-- 文字信息部分 -->
    <div class="space-y-4">
      <p class="text-gray-700"><span class="font-semibold">姓名：</span>{{ cleaner.name }}</p>
      <p class="text-gray-700"><span class="font-semibold">userId：</span>{{ cleaner.user }}</p>
      <p class="text-gray-700"><span class="font-semibold">家政Id：</span>{{ cleaner.id }}</p>
      <p class="text-gray-700"><span class="font-semibold">工作分类：</span>{{ cleaner.category }}</p>

      <p class="text-gray-700"><span class="font-semibold">电话：</span>{{ cleaner.phone }}</p>
      <p class="text-gray-700"><span class="font-semibold">微信：</span>{{ cleaner.weixin }}</p>
      <p class="text-gray-700"><span class="font-semibold">地址：</span>{{ cleaner.addr }}</p>
      <p class="text-gray-700"><span class="font-semibold">城市：</span>{{ cleaner.city }}</p>
      <p class="text-gray-700"><span class="font-semibold">备注：</span>{{ cleaner.beizhu }}</p>
      
      <p class="text-gray-700 text-sm">系统提示：请每隔<span class="text-red-500"> 1小时</span> 登录一次，才能最快响应雇主的工作，被选择后可主动联系雇主</p> 
    </div>

    <!-- 图片展示部分 -->
    <div class="mt-8 space-y-6">
      <div v-if="cleaner.id_card_front" class="flex flex-col items-center">
        <span class="font-semibold">资料1：</span>
        <img :src="cleaner.id_card_front" alt="身份证正面" class="w-full max-w-md rounded-lg border border-gray-300">
      </div>
      <div v-if="cleaner.id_card_back" class="flex flex-col items-center">
        <span class="font-semibold">资料2：</span>
        <img :src="cleaner.id_card_back" alt="身份证反面" class="w-full max-w-md rounded-lg border border-gray-300">
      </div>
      <div v-if="cleaner.health_certificate" class="flex flex-col items-center">
        <span class="font-semibold">资料3：</span>
        <img :src="cleaner.health_certificate" alt="健康证" class="w-full max-w-md rounded-lg border border-gray-300">
      </div>
    </div>
  </div>



</template>

<script setup>
import axios from 'axios';
import config from '@/global.config.js'
import md5 from 'js-md5'
// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';
import funcs from '@/utils/common_func.js';
import report from '../../components/report.vue';
import { useStore } from 'vuex'
import { showToast, showDialog } from 'vant';
import { ref, onMounted, computed,reactive } from 'vue';
import textEditor  from "@/components/textEditor.vue"  
import weizhi from '@/components/weizhi.vue'
import { useRouter,useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const router = useRouter()
const route = useRoute()

const cleaner = ref({})

var form = ref({
  latitude: '',
  longitude: '',
  weixin: '',
  beizhu: '',
  name: '',
  phone: '',
  addr: '',
  city: '',

});

const uploading = ref(false);
const progress = ref(0);

const files = ref([
  { key: 'id_card_front', label: '身份证正面', file: null, preview: '' },
  { key: 'id_card_back', label: '身份证反面', file: null, preview: '' },
  { key: 'health_certificate', label: '健康证', file: null, preview: '' }
]);






// 选择房源位置
const choosePosition = ()=>{
  console.log('选择位置')
  router.push("/chooseposition"); // 跳转到 /fangyuan 路由
}



onMounted(() => {

  form.value.latitude = localStorage.getItem('lat');
  form.value.longitude = localStorage.getItem('lng');
  // console.log('lat',lat)

  https.get(('/api/minsubaojie/myprofile/')).then(response => {
     
     console.log(response);

     cleaner.value = response
   }).catch(error => {
     console.log('出错了2');
     console.error(error);
     showToast('请重新登录');
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