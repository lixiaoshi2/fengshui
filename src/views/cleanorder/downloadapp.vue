
<template>
 

  <van-nav-bar title="下载" left-text="返回" @click-left="router.go(-1)" left-arrow>
    <template #right>

      <van-icon name="question-o" size="18" @click="showImage = true" />
    </template>
  </van-nav-bar>

  <!-- 弹出图片窗口 -->
  <van-popup v-model:show="showImage" position="center" closeable round>
    <img src="/images/help2/zhuce.png" alt="帮助图片" style="max-width: 90vw; max-height: 80vh; border-radius: 8px" />
  </van-popup>


  <div class="w-full flex justify-center mt-8 mb-4">

    
    <p @click="downloadApk"
      class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
      📥 萝卜家政 App
    </p>


  </div>

  <strong class="text-bold px-4 mt-8">帮助： <span class="text-sm text-red-500 ">（苹果手机用浏览器） </span> </strong>
  <div class="text-sm text-gray-500 mt-0 px-4 space-y-1">


    <div class="flex items-center space-x-1">
      <p class="m-0">1. 微信扫码进入小萝卜家政平台。</p>
    </div>

    <div class="flex items-center space-x-1">
      <p class="m-0">2. 在微信里，不能下载， <span class="text-red-500"> 请在浏览器中下载。 </span> </p>
      <van-icon name="question-o" size="18" @click="showImage = true" />
    </div>

    <div class="flex items-center space-x-1">
      <p class="m-0">3. 点击下载，进入下载页面，也就是您目前的页面</p>
    </div>
    <div class="flex items-center space-x-1">
      <p class="m-0">4. 可能会提示未经审核，未经备案，请继续安装</p>
    </div>
    <div class="flex items-center space-x-1">
      <p class="m-0">5.一直选择继续安装，中途会让您输入锁屏密码</p>
    </div>
    <div class="flex items-center space-x-1">
      <p class="m-0">6. 请回屏幕打开luobojz图标</p>
    </div>
    

  </div>

  <van-popup v-model:show="showImage" position="center" closeable round>
    <img src="/images/help2/zhuce.png" alt="帮助图片" style="max-width: 90vw; max-height: 80vh; border-radius: 8px" />
  </van-popup>
  <van-popup v-model:show="showImage2" position="center" closeable round>
    <img src="/images/help2/zhuce.png" alt="帮助图片" style="max-width: 90vw; max-height: 80vh; border-radius: 8px" />
  </van-popup>


</template>

<script setup>

// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';
import funcs from '@/utils/common_func.js';
import report from '../../components/report.vue';
import { useStore } from 'vuex'
import { showToast, showDialog } from 'vant';
import { ref, onMounted, computed,reactive } from 'vue';
// import { useToast } from "vue-toastification";
import textEditor  from "@/components/textEditor.vue"  
import weizhi from '@/components/weizhi.vue'
import { useRouter,useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const router = useRouter()
const route = useRoute()

const showImage = ref(false)


const downloadApk = () => {
 alert('不要在微信中下载，在浏览器中打开，请选择保存，选择信任')

  window.location.href = '/download/app-debug.apk'
}



</script>


<style scoped>
 

</style>