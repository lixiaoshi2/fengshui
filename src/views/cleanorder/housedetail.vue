
<template>
  <van-nav-bar title="新增房源" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>


  <div style="margin-bottom: 50px;" class="p-4 min-h-screen bg-gray-100">
    <h1 class="text-2xl font-bold text-gray-800 mb-4 text-center">房源详情</h1>

    <div v-if="!house" class="text-center text-gray-500">
      正在加载房源信息...
    </div>



    <div v-else class="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <p><strong>地址：</strong> {{ house.houseaddr }}</p>
      <p><strong>城市：</strong> {{ house.city }}</p>
      <p><strong>房主：</strong> {{ house.owner }}</p>
      <p><strong>电话：</strong> {{ house.phone }}</p>
      <p><strong>微信：</strong> {{ house.weixin }}</p>
      <p><strong>价格：</strong> {{ house.price }} 元</p>
      <p><strong>备注：</strong> {{ house.beizhu }}</p>
      <p><strong>清洁时间：</strong> {{ house.cleantime }} 小时</p>


      <div class="flex mt-4 space-x-2">
        <button @click="router.go(-1);" class="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          返回列表
        </button>
       

      </div>

    </div>

    <div v-if="house.images && house.images.length">
      <!-- <h2>房源图片</h2> -->
      <div v-for="image in house.images" :key="image.id" style="margin-bottom: 10px;">
        <img :src="image.image" alt="房源图片" style="width: 100%; height: auto; border-radius: 8px;" />
      </div>
    </div>



    <div class="flex mt-4 space-x-2">



      <button @click="router.go(-1);" class="w-1/3 flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        返回列表
      </button>
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