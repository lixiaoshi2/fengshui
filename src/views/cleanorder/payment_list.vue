<template>

  <div class="p-4 text-sm sm:text-base container mx-auto">
    <h2 class="text-lg font-bold mb-4">支付记录列表</h2>
    <div class="overflow-x-auto bg-white rounded-lg shadow-md">
      <table class="min-w-full divide-y divide-gray-200 table-fixed">
        <thead class="bg-gray-50">
          <tr class="bg-gray-200 text-left">
            <th class="p-2">订单</th>
            <th class="p-2">金额</th>
            <!-- <th class="p-2">支付方式</th> -->
            <!-- <th class="p-2">状态</th> -->
            <!-- <th class="p-2">支付时间</th> -->
            <th scope="col"
              class="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[30%]">
              创建时间 </th>

            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in payments" :key="payment.id" class="border-t">
            <td class="p-2">{{ payment.order }}</td>
            <td class="p-2">{{ payment.amount }}</td>
            <!-- <td class="p-2">{{ payment.payment_method }}</td> -->
            <!-- <td class="p-2">{{ payment.status }}</td> -->
            <!-- <td class="p-2">{{ formatTime(payment.created_at) }}</td> -->
            <td class="px-2 py-4 text-sm text-gray-500 overflow-hidden text-ellipsis">
              {{ formatTime(payment.created_at) }}
            </td>

            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button v-if="payment.status === '未支付' || payment.status === '待支付' " @click="confirmPayment(payment.id)"
                class="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                {{  '确认收款' }}
              </button>
              <span v-else class="text-gray-500 text-xs">不可操作</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-4 flex justify-between items-center text-sm mb-10">
      <button @click="previousPage" :disabled="!prev" class="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">
        上一页
      </button>
      <button @click="nextPage" :disabled="!next" class="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">
        下一页
      </button>
    </div>
  </div>



</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import https from '@/utils/request.js';

const payments = ref([])
const next = ref(null)
const prev = ref(null)
const url = ref('/api/minsubaojie/payments/')

const fetchPayments = async (targetUrl = url.value) => {
  try {
    const res = await https.get(targetUrl)
    payments.value = res.results
    next.value = res.next
    prev.value = res.previous
  } catch (err) {
    console.error('获取支付列表失败:', err)
  }
}

const formatTime = (datetimeStr) => {
  if (!datetimeStr) return '——'
  const d = new Date(datetimeStr)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

// 确认支付
const confirmPayment = async (paymentId) => {

   const confirmed = confirm("确定要将此支付状态标记为“支付成功”吗？此操作无法撤回！");
  if (!confirmed) {
    return; // 用户点击了取消，不继续执行
  }
  
  try {
    // 发送 PATCH 请求更新支付状态
    const response = await https.post(`/api/minsubaojie/confirmpay/${paymentId}/`, {
      status: 'success', // 将状态更新为 'success'
      paid_at: new Date().toISOString() // 更新支付时间为当前时间
    });
    console.log("response",response.message)
    if (response.message === "支付状态已更新为成功") {
      // 成功更新后，更新前端的支付状态
      const index = payments.value.findIndex(p => p.id === paymentId);
      console.log("index",index)
      if (index !== -1) {
        console.log("进入了，是有支付记录的")
        payments.value[index].status = '支付成功';
        payments.value[index].status_display = '支付成功'; // 更新显示文本
        payments.value[index].paid_at = response.data.paid_at; // 更新支付时间
      }
      alert('支付状态更新成功！');
    } else {
      alert('更新支付状态失败。');
    }
  } catch (error) {
    console.error('更新支付状态时出错:', error);
    if (error.response && error.response.status === 403) {
      alert('没有权限更新支付状态。');
    } else {
      alert('更新支付状态失败，请检查网络或联系管理员。');
    }
  } 
};


const nextPage = () => {
  if (next.value) fetchPayments(next.value)
}
const previousPage = () => {
  if (prev.value) fetchPayments(prev.value)
}

onMounted(() => {
  fetchPayments()
})
</script>
