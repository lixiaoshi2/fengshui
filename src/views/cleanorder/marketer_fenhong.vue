<template>
  <van-nav-bar title="萝卜保洁" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
    <template #title>
      <label class="block text-lg font-medium text-gray-700">萝卜家政</label>
    </template>
  </van-nav-bar>

  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">我的分红记录</h2>

    <div class="mb-4 flex items-center space-x-2">
      <label class="text-sm font-medium">选择月份：</label>
      <input type="month" v-model="month" class="border rounded px-2 py-1" />
      <button @click="fetchCommissions" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">查询</button>
    </div>

    <div class="mb-4">本月总分红：<strong class="text-green-600 text-lg">{{ totalCommission }} 元</strong></div>

    <table class="w-full table-auto border border-gray-200 text-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="border px-2 py-1">订单ID</th>
          <th class="border px-2 py-1">角色</th>
          <th class="border px-2 py-1">金额</th>
          <th class="border px-2 py-1">比例 (%)</th>
          <th class="border px-2 py-1">时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in records" :key="item.id">
         

          <td class="border px-2 py-1">
            <button @click="getOrderDetail(item.order_id)"
              class="text-blue-600 hover:underline font-medium px-2 py-1 rounded hover:bg-blue-100">
              {{ item.order_id }}
            </button>
          </td>

          <td class="border px-2 py-1">{{ roleLabel(item.role) }}</td>
          <td class="border px-2 py-1">{{ item.amount }}</td>
          <td class="border px-2 py-1">{{ item.percentage }}</td>
          <td class="border px-2 py-1">{{ formatDate(item.calculated_at) }}</td>
          <!-- <button class="text-blue-600 underline" @click="fetchOrderDetail(item.id)">查看订单</button> -->
        </tr>
      </tbody>
    </table>

    <!-- 分页按钮 -->
    <div class="mt-4 flex items-center space-x-4">
      <button @click="prevPage" :disabled="page === 1" class="px-3 py-1 border rounded">上一页</button>
      <span>第 {{ page }} 页</span>
      <button @click="nextPage" class="px-3 py-1 border rounded">下一页</button>
    </div>

    <!-- 订单详情弹窗 -->
    <div v-if="orderDetail"
      class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white p-6 rounded w-[400px] relative">
        <h3 class="text-lg font-bold mb-4">客户信息</h3>
        <p><strong>客户：</strong>{{ orderDetail.user.last_name }}</p>
        <p><strong>电话：</strong>{{ orderDetail.user.mobile }}</p>

        <button class="absolute top-2 right-2 text-gray-500" @click="orderDetail = null">✖</button>
      </div>
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

// 当前页码和月份
const page = ref(1)
const month = ref(new Date().toISOString().slice(0, 7)) // 默认当前月

// 数据状态
const records = ref([])
const totalCommission = ref(0)



// 订单详情
const orderDetail = ref(null)

function roleText(role) {
  return role === 'distributor' ? '分销商' : '区域销售'
}

async function getOrderDetail(orderId) {
  try {
    const res = await https.get(`/api/minsubaojie/order-detail/${orderId}/`)
    orderDetail.value = res
  } catch (error) {
    alert('获取订单详情失败')
  }
}



// 获取分红数据
const fetchCommissions = async () => {
  try {
    const res = await https.get(`/api/minsubaojie/commissions/?month=${month.value}&page=${page.value}`, )
    records.value = res.results.records
    totalCommission.value = res.results.total_commission
  } catch (error) {
    console.error('获取分红失败:', error)
  }
  
 
}

// 分页控制
const prevPage = () => {
  if (page.value > 1) {
    page.value--
    fetchCommissions()
  }
}
const nextPage = async () => {
  if (!pagination.next) return; // 没有下一页，直接返回

  // 解析下一页的页码（假设格式为：?page=2&month=2025-05）
  const url = new URL(pagination.next);
  const nextPageNum = url.searchParams.get('page');
  const nextMonth = url.searchParams.get('month');

  // 更新当前页码
  page.value = Number(nextPageNum);
  month.value = nextMonth; // 可选：更新月份参数（一般不会变）

  await fetchCommissions();
};
// 角色显示
const roleLabel = (role) => {
  return role === 'distributor' ? '分销商' : '区域经销商'
}

// 时间格式化
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

// 页面初始化加载
onMounted(() => {
  fetchCommissions()
})



</script>
