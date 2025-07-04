
<template>
  <van-nav-bar title="邻家网 美食销售" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <div class="info-item">
    <!-- <span class="label">订单号：</span> -->

    <div style="margin-left:35px; margin-top: 20px; margin-bottom: 20px;   font-weight: bold; font-size: 15px; color:green"> 
      支付成功
    </div>

    <div style="margin: 20px;"> <a href="/myfoodorder">点击进入自己的订单</a> </div>


  </div>




</template>

<script setup>
// import axios from 'axios';
import config from '@/global.config.js'
// import md5 from 'js-md5'
// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';
import funcs from '@/utils/common_func.js';
import report from '../../components/report.vue';
import { useStore } from 'vuex'
import { showToast,showDialog } from 'vant';
import { ref, onMounted, computed,reactive,nextTick,watchEffect  } from 'vue';
import textEditor  from "@/components/textEditor.vue"  
import weizhi from '@/components/weizhi.vue'
import { useRouter,useRoute } from 'vue-router'

import { useHead } from '@vueuse/head'

const router = useRouter()
const route = useRoute()


onMounted(() => {
 console.log('asasdfsad')
  // // hotel_id.value = route.query.id;
  // hotel_id.value = route.params.id;
  // console.log('hotel_id', hotel_id)
  
  
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

.custom-value {
  text-align: right;
  width: 100%;
}

</style>