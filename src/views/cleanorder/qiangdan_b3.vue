<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">可抢订单列表（父账户）</h1>

    <div v-if="loading" class="text-gray-500">加载中...</div>

    <div v-else-if="orders.length === 0" class="text-gray-500">暂无可抢订单</div>

    <div v-else>
      <div v-for="order in orders" :key="order.order_id" class="bg-white rounded-xl shadow p-4 mb-6">
        <h2 class="text-lg font-semibold mb-2">订单 ID：{{ order.order_id }}</h2>
        <p class="text-sm text-gray-600 mb-2">创建时间：{{ formatTime(order.created_time) }}</p>

        <div class="mb-2">
          <!-- <h3 class="text-md font-medium">订单信息：</h3> -->
          <pre class="bg-gray-100 p-2 rounded text-sm whitespace-pre-wrap">{{ order.order_info }}</pre>
        </div>

        <div>
          <h3 class="text-md font-medium mb-1">可抢保洁员（点击抢单）：</h3>
          <ul class="pl-4 list-disc text-sm text-gray-700">
            <li v-for="cleaner in order.available_cleaners" :key="cleaner.cleaner_id">
              {{ cleaner.cleaner_name }}（cleanID：{{ cleaner.cleaner_id }}）电话：{{ cleaner.phone }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'


import https from '@/utils/request.js';


// import { ref, onMounted, computed,reactive } from 'vue';
// import { useToast } from "vue-toastification";

import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const orders = ref([])
const loading = ref(true)

const fetchOrders = async () => {
  try {
    const res = await https.get('/api/minsubaojie/available-orders2/')
    orders.value = res
  } catch (error) {
    console.error('获取订单失败:', error)
  } finally {
    loading.value = false
  }
}

const formatTime = (timeStr) => {
  const d = new Date(timeStr)
  return d.toLocaleString()
}

onMounted(() => {
  fetchOrders()
})
</script>
