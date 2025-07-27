
<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">💰 订单支付</h1>

    <!-- 订单信息 -->
    <div class="bg-white p-4 rounded shadow mb-4">
      <p>订单号：<strong>{{ order?.id }}</strong></p>
      <p>金额总计：<strong>${{ order?.total_price }}</strong></p>
    </div>

    <!-- 支付方式选择 -->
    <h2 class="text-md font-semibold mb-2">请选择支付方式</h2>
    <div class="space-y-4">
      <button @click="selectMethod('offline')" class="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700">
        线下付款
      </button>
      <button @click="selectMethod('etransfer')" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-500">
        e-Transfer
      </button>
      <button @click="selectMethod('alipay')" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        支付宝支付
      </button>
      <button @click="selectMethod('wechat')" class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
        微信支付
      </button>
    </div>

    <!-- 支付说明 -->
    <div v-if="paymentMethod" class="text-sm mt-6 bg-white p-4 rounded shadow">
      <h3 class="font-semibold mb-2">支付说明</h3>

      <div v-if="paymentMethod === 'offline'">
        请您到店付款<br>
        地址：<strong>20 Orchid Rd, Markham Toronto L3T 7T6</strong><br>
        电话：647-323-2111
      </div>

      <div v-if="paymentMethod === 'etransfer'">
        请通过 e-Transfer 发送款项至邮箱：<br />
        <strong class="text-blue-600 text-lg">Sunnydu1212@hotmail.com</strong><br />
        备注中请写订单号：<strong>{{ order?.id }}</strong>
      </div>

      <div v-if="paymentMethod === 'wechat'" class="text-center">
        请使用 <strong>微信</strong> 扫描下方二维码支付：<br />
        <img src="@/assets/images/shoukuan/weixinzhifu.jpg" alt="微信二维码" class="mx-auto my-4 w-48 h-48 object-contain" />
        备注中请填写订单号：<strong>{{ order?.id }}</strong>
      </div>

      <div v-if="paymentMethod === 'alipay'" class="text-center">
        请使用 <strong>支付宝</strong> 扫描下方二维码支付：<br />
        <img src="@/assets/images/shoukuan/zhifubao.png" alt="支付宝二维码" class="mx-auto my-4 w-48 h-48 object-contain" />
        备注中请填写订单号：<strong>{{ order?.id }}</strong>
      </div>

      

      <button @click="confirmPaid" class="mt-4 bg-blue-500 text-white mb-10 py-2 px-4 rounded">
        我已完成支付
      </button>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import https from '@/utils/request'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const orderId = route.params.order_id
const order = ref(null)
const paymentMethod = ref(null)

const loadOrder = async () => {
  const res = await https.get(`/api/fengshui/order_detail/${orderId}/`)
  order.value = res
}

const selectMethod = (method) => {
  paymentMethod.value = method
}

const confirmPaid = async () => {
  const res = await https.post('/api/fengshui/pay_order/', {
    order_id: orderId,
    pay_method: paymentMethod.value
  })

  alert(res.message || "支付记录已保存")
  router.push('/orders') // 支付完成后返回首页或订单页
}

onMounted(() => {
  loadOrder()
})
</script>
