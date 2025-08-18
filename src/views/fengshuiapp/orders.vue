<template>

  
  <div class="p-2 md:mt-24">
    <h1 class="text-base font-medium mb-1">📦 我的订单</h1>

    <div v-for="order in orders" :key="order.id" class="bg-white rounded shadow p-2 mb-2 border-b-1 border-gray-200">
      <div class="mb-2 text-sm text-gray-700">
        <strong>订单编号：</strong> {{ order.id }}<br>
        <strong>下单时间：</strong> {{ formatTime(order.created_at) }}<br>

        <!-- <strong>支付状态：</strong> {{ order.is_paid ? '已支付' : '未支付' }}<br> -->
        <div class="flex justify-between items-center mb-1">
          <div class="text-sm">
            <strong>支付状态：</strong> {{ order.is_paid ? '已支付' : '未支付' }}
          </div>
          <div v-if="!order.is_paid">
            <button @click="goToPay(order)"
              class="text-xs text-blue-600 border border-blue-600 rounded px-2 py-1 hover:bg-blue-50">
              去付款
            </button>
          </div>
        </div>


        <!--  -->

        <strong>配送方式：</strong> {{ deliveryLabel(order.delivery_method) }}<br>
        <strong>订单状态：</strong> {{ order.status }}
      </div>

      <div v-if="order.address" class="text-xs text-gray-600 mb-2">
        <strong>收货地址：</strong> {{ order.address.label }} - {{ order.address.contact_name }} - {{
        order.address.contact_phone }}
      </div>

      <div class="border-t pt-2">
        <div v-for="item in order.items" :key="item.id" class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-3">
            <img :src="fullImage(item.product.cover_image)" class="w-14 h-14 rounded" />
            <div>
              <div class="text-sm">{{ item.product.name }}</div>
              <div class="text-xs text-gray-500">¥{{ item.price }} × {{ item.quantity }}</div>
            </div>
          </div>
          <div class="text-sm text-right text-red-500">¥{{ item.price * item.quantity }}</div>
        </div>
        <div class="text-right font-semibold text-sm text-gray-800">总计：¥{{ order.total_price }}</div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="flex justify-center items-center mt-6 gap-4 text-sm">
      <button @click="prevPage" :disabled="page <= 1" class="px-3 py-1 bg-gray-300 rounded">上一页</button>
      <span>第 {{ page }} 页</span>
      <button @click="nextPage" :disabled="!hasNext" class="px-3 py-1 bg-gray-300 rounded">下一页</button>
    </div>
  </div>
</template>





<script setup>
import { ref, onMounted } from 'vue'
import https from '@/utils/request'


import { useRouter,useRoute } from 'vue-router'
const router = useRouter()


const orders = ref([])
const page = ref(1)
const hasNext = ref(false)

const loadOrders = async () => {
  const res = await https.get(`/api/fengshui/orders/?page=${page.value}`)
  orders.value = res.results
  hasNext.value = res.next !== null
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    loadOrders()
  }
}

const nextPage = () => {
  if (hasNext.value) {
    page.value++
    loadOrders()
  }
}


const goToPay = (order) => {
  router.push({ name: 'pay', params: { order_id: order.id } })
}





// const fullImage = (path) => path?.startsWith('http') ? path : `http://127.0.0.1:8000${path}`

// 动态获取当前前端域名或 IP，并拼接端口号
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

const formatTime = (iso) => new Date(iso).toLocaleString()
const deliveryLabel = (code) => ({
  'delivery': '送货上门',
  'pickup': '自取'
})[code] || code

onMounted(loadOrders)
</script>

