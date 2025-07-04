<!-- MarketerList.vue -->
<template>
    
    <div class="p-4">
    <h1 class="text-xl font-bold mb-4 text-gray-800">区域经理列表</h1>

    <!-- 表格头部：PC显示 -->
    <div class="hidden md:grid grid-cols-6 bg-gray-100 p-2 font-semibold rounded-md text-sm text-gray-700">
      <div>用户名</div>
      <div>手机</div>
      <div>邀请码</div>
      <div>累计佣金</div>
      <div>未支付佣金</div>
      <div>是否认证</div>
      <div>操作</div>
    </div>

    <!-- 表格内容：响应式布局 -->
    <div v-for="marketer in marketers" :key="marketer.id"
         class="border p-3 my-2 rounded-md shadow-sm hover:shadow-md transition-all">

      <!-- PC端 -->
      <div class="hidden md:grid grid-cols-6 text-sm text-gray-800">
        <div>{{ marketer.username }}</div>
        <div>{{ marketer.phone }}</div>
        <div>{{ marketer.referral_code }}</div>
        <div>{{ marketer.total_bonus }} 元</div>
        <div>{{ marketer.unpayed }} 元</div>
        <div>
          <span :class="marketer.is_approved ? 'text-green-600' : 'text-red-500'">
            {{ marketer.is_approved ? '已认证' : '未认证' }}
          </span>
        </div>
        <div>
          <button class="bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-1 rounded">详情</button>
        </div>
      </div>

      <!-- 手机端 -->
      <div class="md:hidden text-sm space-y-1">
        <div><strong>用户名：</strong>{{ marketer.username }}</div>
        <div><strong>手机：</strong>{{ marketer.phone }}</div>
        <div><strong>邀请码：</strong>{{ marketer.referral_code }}</div>
        <div><strong>累计佣金：</strong>{{ marketer.total_bonus }} 元</div>
        <div><strong>未支付佣金：</strong>{{ marketer.unpayed }} 元</div>
        <div>
          <strong>是否认证：</strong>
          <span :class="marketer.is_approved ? 'text-green-600' : 'text-red-500'">
            {{ marketer.is_approved ? '已认证' : '未认证' }}
          </span>
        </div>
        <div>
  <button
    @click="toggleApproval(marketer)"
    :class="marketer.is_approved ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'"
    class="text-white text-sm px-2 py-1 rounded"
  >
    {{ marketer.is_approved ? '取消认证' : '同意认证' }}
  </button>
</div>
      </div>

    </div>
  </div>

</template>
  
  <script setup>

  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import https from '@/utils/request.js'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
  
  const marketers = ref([])
  const error = ref('')
  
  const fetchMarketers = async () => {
    try {
      const res = await https.get('/api/minsubaojie/marketers/')
      marketers.value = res
      console.log("res",res)
    } catch (err) {
      error.value = '获取渠道商失败，请检查权限或网络。'
    }
  }
  
  const toggleApproval = async (marketer) => {
  try {
    const res = await https.post(`/api/minsubaojie/toggle-approval/${marketer.id}/`)
    marketer.is_approved = res.is_approved
  } catch (error) {
    console.error('切换认证状态失败:', error)
    alert('操作失败')
  }
}

  onMounted(() => {
    fetchMarketers()
  })
  </script>
  