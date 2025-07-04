<template>

  <van-nav-bar title="好听的网站名" left-text="返回" left-arrow @click-left="router.go(-1)" />
  <div class="p-4">
    <h1 class="text-xl font-bold mb-1">🛒 我的购物车</h1>

    <!-- 配送方式选择 -->
    <div class="bg-white p-4 rounded shadow mb-3">
      <h2 class="text-md font-semibold mb-2">🚚 配送方式</h2>
      <label class="mr-4">
        <input type="radio" v-model="deliveryMethod" value="delivery" />
        配送到家
      </label>
      <label>
        <input type="radio" v-model="deliveryMethod" value="pickup" />
        到店自取
      </label>
    </div>

    <div v-if="deliveryMethod === 'pickup'" class="text-sm text-gray-500 mb-4">
      ✅ 您已选择到店自取，无需选择地址。
    </div>


    <!-- 地址选择区域 -->
    <div v-if="deliveryMethod === 'delivery'" class="bg-white p-4 rounded shadow mb-3">
      <div class="bg-white p-4 rounded shadow mb-3">
        <h2 class="text-md font-semibold mb-2" @click="router.push('/useraddr')">📍 选择收货地址(添加地址)</h2>
        <div v-for="addr in addressList.addresses" :key="addr.id" class="mb-3">
          <label class="flex items-center">
            <input type="radio" v-model="selectedAddressId" :value="addr.id" />
            <div class="ml-2">
              <div>{{ addr.label }} - {{ addr.contact_name }}</div>
              <div class="text-xs text-gray-500">{{ addr.contact_phone }} - {{ addr.detail }}</div>
            </div>
          </label>
        </div>
      </div>
    </div>

    <div class="mb-16">
      <div v-for="item in cart.items" :key="item.id"
        class="bg-white p-4 rounded shadow mb-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <img :src="fullImage(item.product_image)" class="w-20 h-20 object-cover rounded" />
          <div>
            <div class="font-semibold">{{ item.product_name }}</div>
            <div class="text-sm text-gray-500">¥{{ item.product_price }}</div>
            <div class="text-red-600 text-sm">小计：¥{{ item.subtotal }}</div>

            <!-- 数量控制按钮 -->
            <div class="flex items-center mt-2 mb-2">
              <button @click="changeQuantity(item, item.quantity - 1)"
                class="w-6 h-6 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center"
                :disabled="item.quantity <= 1">-</button>

              <span class="mx-3 w-6 text-center">{{ item.quantity }}</span>

              <button @click="changeQuantity(item, item.quantity + 1)"
                class="w-6 h-6 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center">+</button>
            </div>
          </div>
        </div>

        <!-- 删除按钮 -->
        <button @click="removeItem(item)" class="text-sm text-red-500">删除</button>
      </div>

      <div style="height: 20px;" class="mb-4"></div>

    </div>

    <div class="text-lg font-bold text-right">总计：¥{{ cart.total }}</div>
  </div>


  <!-- ✅ 结算按钮，固定在底部 -->
  <div class="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 border-t mb-12">
    <div class="flex justify-between items-center">
      <span class="text-lg font-semibold text-gray-700">合计：¥{{ cart.total }}</span>
      <button @click="checkout" class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
        结算
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import https from '@/utils/request'
import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const cart = ref({ items: [], total: 0 })
const deliveryMethod = ref("delivery")  // 默认是配送到家

//
// const fullImage = (path) =>
//   path.startsWith('http') ? path : 'http://192.168.1.127:8000' + path


// 动态获取当前前端域名或 IP，并拼接端口号
// const fullImage = (path) => {
//   if (typeof path === 'string') {
//     if (path.startsWith('http')) {
//       return path // 已经是完整路径
//     }

//     // 从 window.location 提取当前主机名，例如 localhost 或 192.168.x.x
//     const hostname = window.location.hostname
//     const port = 8000  // 后端端口号
//     const protocol = window.location.protocol  // http: 或 https:

//     return `${protocol}//${hostname}:${port}${path}`
//   }

//   return ''
// }

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



const loadCart = async () => {
  const res = await https.get('/api/fengshui/cart/')
  cart.value = res
}

const changeQuantity = async (item, newQuantity) => {
  if (newQuantity < 1) return
  await https.put('/api/fengshui/cart/', { id: item.id, quantity: newQuantity })
  await loadCart()
}

const removeItem = async (item) => {
    console.log("item",item)
  await https.delete('/api/fengshui/cart/', {  id: item.id })
  await loadCart()
}
// 结账



const checkout = async () => {
  if (!cart.value.items.length) {
    alert("购物车为空，无法结算")
    return
  }

  if (deliveryMethod.value === 'delivery' && !selectedAddressId.value) {
    alert("请选择收货地址")
    return
  }

  const payload = {
    delivery_method: deliveryMethod.value,  // 传递配送方式
  }

  if (deliveryMethod.value === 'delivery') {
    payload.address_id = selectedAddressId.value
  }

  const res = await https.post('/api/fengshui/create_order/', payload)

  if (res?.order_id) {
    alert(`订单创建成功，订单号：${res.order_id}`)

     await pay(res.order_id)
  }
}



const pay = async (orderId) => {
  router.push(`/pay/${orderId}`) // 🔁跳转到支付页
}

////////////////////// 绑定地址  //////////
const addressList = ref([])
const selectedAddressId = ref(null)

const loadAddresses = async () => {
  const res = await https.get('/api/fengshui/addresses/')
  addressList.value = res
  const defaultAddr = res.find(addr => addr.is_default)
  selectedAddressId.value = defaultAddr?.id || (res[0]?.id ?? null)
}


/////////////绑定地址结束////////////

onMounted(() => {
  loadCart()
  loadAddresses()
})
</script>
