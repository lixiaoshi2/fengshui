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
    <h2 class="text-lg font-bold px-3 pt-0 mb-1">申请成为分销商（销售代表）</h2>
    <div class="flex justify-between items-center mb-0 px-2 py-0 text-sm text-gray-400">
      分销商工作内容是发展周边业主，业主在平台上下单消费，就有提成，要成为分销商，需同意佣金发放协议。

    </div>

    <div style="background-color: #f7f7f7; padding: 8px; margin: 8px 0; "></div>


    <div class="max-w-md mx-auto p-6 bg-white shadow rounded">

      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- 邀请码输入框 -->
        <div class="flex items-center space-x-2">
          <label for="referralCode" class="text-sm font-bold text-gray-800 whitespace-nowrap">您的推荐者ID：</label>
          <input v-model="referralCode" id="referralCode" type="text"
            class="flex-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-0 py-1"
            placeholder="没有可以不填，有则自动填入" />
        </div>

       

        <!-- 判断是否是分销商 -->
        <div class="flex items-center space-x-2">
          <label for="referralCode" class="text-sm font-bold text-gray-800 whitespace-nowrap">是否是分销商：</label>
          <span :class="{ 'text-green-600': isSalesAgent === true, 'text-red-600': isSalesAgent === false }">
            {{ isSalesAgent === null ? '加载中...' : (isSalesAgent ? '是' : '否') }}
          </span>
        </div>

        <div class="flex items-start">
          <input v-model="agreementAccepted" id="agreement" type="checkbox" required
            class="h-4 w-4 text-blue-600 border-gray-300 rounded" />
          <label for="agreement" class="ml-2 block text-sm text-gray-700">
            我已阅读并同意 <a href="/agreement" class="text-blue-600 underline">《渠道商佣金协议》</a>
          </label>
        </div>

        <button type="submit"
            :disabled="isSalesAgent"
            :class="{
              'w-full py-2 px-4 rounded': true,
              'bg-blue-600 text-white hover:bg-blue-700': !isSalesAgent,
              'bg-gray-400 text-gray-700 cursor-not-allowed': isSalesAgent
            }">
      {{ isSalesAgent ? '您已是分销商' : '立即申请' }}
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
const referralCode = ref('')
const message = ref('')
const error = ref('')


const  userId = localStorage.getItem('user_id')


const submitForm = async () => {
  try {
    const response = await https.post('/api/minsubaojie/become-saler/', {
      agreement_accepted: agreementAccepted.value,
      invited_by:referralCode.value
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

const isSalesAgent = ref(null);


// 获取邀请码
const fetch_inviter = async () => {
    try {
      const res = await https.get('/api/minsubaojie/get_inviter/')
      referralCode.value = res.inviter
      console.log("res",res)
    } catch (err) {
      error.value = '获取邀请码失败，请检查权限或网络。'
    }
  }
  
// 获取是否是销售代表
const fetchIsSalesAgent = async () => {
  if (userId.value === '') {
    // 如果没有用户ID，直接返回或显示错误
    isSalesAgent.value = false;
    return;
  }

  try {
    // 假设你的 API 地址是 /api/users/{user_id}/is_sales_agent/
    const response = await https.get(`/api/minsubaojie/is_sales_agent/`);
    isSalesAgent.value = response.is_sales_agent;
  } catch (error) {
    console.error("获取分销商状态失败:", error);
    isSalesAgent.value = false; // 出现错误时，默认设置为“否”或显示错误信息
    // 可以添加更友好的用户提示
  }
};


onMounted(() => {

  fetch_inviter()

  // // 假设从某个地方获取到当前用户ID，例如：
  const user_id = JSON.parse(localStorage.getItem('user_id'));
  if (user_id ) {
    
    fetchIsSalesAgent();
  } else {
    console.warn("未找到用户ID，无法判断分销商状态。");
    isSalesAgent.value = false; // 或其他默认值
  }
 
//


})


</script>
