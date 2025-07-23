<template>
  <div class="p-6">
    <div v-if="order" class="max-w-4xl mx-auto bg-white p-6 shadow-md rounded">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-lg font-semibold">订单详情 - ID: {{ order.id }}</h1>
        <button @click="router.go(-1)" class="px-4 py-1 bg-blue-600 text-white rounded">返回</button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800 mb-4">
        <div>
          <p><strong>订单总价:</strong> ¥{{ order.total_price }}</p>
          <p><strong>当前状态:</strong> {{ order.status }}</p>
          <p><strong>配送方式:</strong> {{ order.delivery_method }}</p>
          <p><strong>创建时间:</strong> {{ formatDateTime(order.created_at) }}</p>
        </div>
        <div>
          <p><strong>所属用户:</strong> {{ order.user?.username }} (ID: {{ order.user?.id }})</p>
          <p><strong>是否支付:</strong> {{ order.is_paid ? '是' : '否' }}</p>
          <p v-if="order.is_paid"><strong>支付时间:</strong> {{ formatDateTime(order.pay_time) }}</p>
        </div>
      </div>

      <div class="border-t border-gray-200 mt-4 pt-4 text-sm">
        <h2 class="font-semibold mb-2">收货地址</h2>
        <p v-if="order.address">
          {{ order.address.province }}{{ order.address.city }}{{ order.address.district }}{{ order.address.detail }} 
          ({{ order.address.contact_name }} / {{ order.address.contact_phone }})
        </p>
        <p v-else>无收货地址信息</p>
      </div>

      <div class="border-t border-gray-200 mt-4 pt-4">
        <h2 class="font-semibold mb-2">订单商品</h2>
        <div class="space-y-2">
          <div v-for="item in order.items" :key="item.id" class="flex justify-between items-center border p-2 rounded">
            <div class="flex items-center gap-2">
              <img v-if="item.product?.image" :src="fullImage(item.product.image)" class="w-12 h-12 object-cover rounded" />
              <div class="text-sm">
                <p>{{ item.product.name }}</p>
                <p class="text-xs text-gray-500">¥{{ item.price }} × {{ item.quantity }}</p>
              </div>
            </div>
            <div class="text-right text-sm font-semibold">¥{{ (item.price * item.quantity).toFixed(2) }}</div>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-200 mt-6 pt-4">
        <h2 class="font-semibold mb-2">更新订单状态</h2>
        <div class="space-y-2">
          <select v-model="statusForm.new_status" class="border px-3 py-2 rounded w-full">
            <option disabled value="">选择新状态</option>
            <option value="待支付">待支付</option>
            <option value="已付款">已付款</option>
            <option value="已发货">已发货</option>
            <option value="已完成">已完成</option>
          </select>
          <div v-if="statusForm.new_status === '已发货'" class="space-y-2">
            <input v-model="statusForm.tracking_number" placeholder="快递单号" class="border px-3 py-2 rounded w-full" />
            <input v-model="statusForm.delivery_company" placeholder="快递公司" class="border px-3 py-2 rounded w-full" />
          </div>
          <textarea v-model="statusForm.note" placeholder="备注" class="border w-full px-3 py-2 rounded"></textarea>
          <button @click="submitStatusUpdate" class="bg-blue-600 text-white px-4 py-2 rounded">更新状态</button>
        </div>
      </div>

      <div class="border-t border-gray-200 mt-6 pt-4 mb-10">
        <h2 class="font-semibold mb-2">状态变更历史</h2>
        <div v-if="order.status_logs.length > 0" class="space-y-3">
          <div v-for="(log, index) in order.status_logs" :key="index" class="border p-3 rounded bg-gray-50">
            <p><strong>{{ log.status }}</strong> - {{ formatDateTime(log.timestamp) }}</p>
            <p>操作人: {{ log.operator?.username || '系统' }}</p>
            <p v-if="log.tracking_number">快递单号: {{ log.tracking_number }}</p>
            <p v-if="log.delivery_company">快递公司: {{ log.delivery_company }}</p>
            <p v-if="log.note">备注: {{ log.note }}</p>
          </div>
        </div>
        <p v-else class="text-sm text-gray-500">暂无变更记录</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import https from '@/utils/request'
import { format } from 'date-fns'
// import { fullImage } from '@/utils/image_path_helper'

const route = useRoute()
const router = useRouter()
const order = ref(null)
const statusForm = ref({
  new_status: '',
  tracking_number: '',
  delivery_company: '',
  note: ''
})

const fetchOrderDetail = async () => {
  const id = route.params.id
  const res = await https.get(`/api/fengshui/ordersdetail_admin/${id}/`)
  order.value = res
  statusForm.value.new_status = res.status
}

const submitStatusUpdate = async () => {
  const id = route.params.id
  const res = await https.put(`/api/fengshui/ordersdetail_admin/${id}/`, statusForm.value)
  order.value = res
  alert('状态更新成功')
}

const goBack = () => {
  router.push('/admin/orders')
}

const fullImage = (path) => {
  if (typeof path === 'string') {
    // 如果路径本身已经是完整的 HTTP/HTTPS URL，直接返回
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    const hostname = window.location.hostname;
    const protocol = window.location.protocol; // http: 或 https:
    const backendPort = 8000; // 后端端口号，只有在特定条件下使用

    // 检查 hostname 是否以 '192.' 开头，或者是否是 'localhost' 或 '127.0.0.1'
    // 这些通常是开发环境或本地测试环境的地址
    if (hostname.startsWith('192.') || hostname === 'localhost' || hostname === '127.0.0.1') {
      // 如果是本地或内网 IP，需要拼接端口号
      return `${protocol}//${hostname}:${backendPort}${path}`;
    } else {
      // 如果是域名访问（例如 fs.nearnet.ca），则不需要拼接端口号
      // 因为 Nginx 会处理端口转发
      return `${protocol}//${hostname}${path}`;
    }
  }

  // 如果 path 不是字符串，或者为空，返回空字符串
  return '';
};

const formatDateTime = (dt) => {
  return format(new Date(dt), 'yyyy-MM-dd HH:mm:ss')
}

onMounted(fetchOrderDetail)
</script>
