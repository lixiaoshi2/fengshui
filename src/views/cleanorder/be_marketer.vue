<template>
  <van-nav-bar title="萝卜保洁" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
    <template #title>
      <label class="block text-lg font-medium text-gray-700">萝卜家政</label>
    </template>
  </van-nav-bar>

  <div>
    <h2 class="text-lg font-bold px-3 pt-0 mb-1">申请成为区域销售</h2>
    <div class="flex justify-between items-center mb-0 px-2 py-0 text-sm text-gray-400">
      区域经销商工作内容是发展社区分销商，您的分销商的业绩决定了您的业绩

    </div>

    <div style="background-color: #f7f7f7; padding: 8px; margin: 8px 0; "></div>

 <div class="flex items-center space-x-2">
          <label for="referralCode" class="text-sm font-bold text-gray-800 whitespace-nowrap ml-6">是否是分销商：</label>
          <span :class="{ 'text-green-600': isSalesAgent === true, 'text-red-600': isSalesAgent === false }">
            {{ is_marketer === null ? '加载中...' : (is_marketer ? '是' : '否') }}
          </span>
        </div>


    <div class="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 class="text-xl font-bold mb-4">申请成为渠道商</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="flex items-start">
          <input v-model="agreementAccepted" id="agreement" type="checkbox" required
            class="h-4 w-4 text-blue-600 border-gray-300 rounded" />
          <label for="agreement" class="ml-2 block text-sm text-gray-700">
            我已阅读并同意 <a href="/agreement" class="text-blue-600 underline">《渠道商佣金协议》</a>
          </label>
        </div>

        <!-- <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          立即申请
        </button> -->

          <button type="submit"
            :disabled="is_marketer"
            :class="{
              'w-full py-2 px-4 rounded': true,
              'bg-blue-600 text-white hover:bg-blue-700': !is_marketer,
              'bg-gray-400 text-gray-700 cursor-not-allowed': is_marketer
            }">
      {{ is_marketer ? '您已是区域商' : '立即申请' }}
    </button>

      </form>

      <p v-if="message" class="mt-4 text-green-600">{{ message }}</p>
      <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
    </div>


  </div>




</template>

<script setup>
import { ref, onMounted } from 'vue'
import https from '@/utils/request.js'
import dayjs from 'dayjs'

import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const agreementAccepted = ref(false)
const message = ref('')
const error = ref('')
var is_marketer = ref(false)

const submitForm = async () => {
  console.log("kaishishangchuan le ")
  try {
    const response = await https.post('/api/minsubaojie/become-marketer/', {
      agreement_accepted: agreementAccepted.value,
    })
    message.value = response.message
    // alert(response.message)
    error.value = ''
  } catch (err) {
    console.log("error",err)
    error.value = err.response?.message?.detail || '提交失败'
    console.log(response)
    alert(response.message)
  }
}





onMounted(() => {
  https.get('/api/minsubaojie/is_marketer/').then(res => {
  if (res.is_marketer) {
    console.log("当前用户是渠道商");
   
    is_marketer.value = res.is_marketer
  } else {
    console.log("不是渠道商，可以显示注册按钮");
  }
});
})


</script>
