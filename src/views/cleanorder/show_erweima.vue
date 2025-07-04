
<template>

  <van-nav-bar title="扫码支付" left-text="返回" @click-left="router.go(-1)" left-arrow>
    <template #right>

      <van-icon name="question-o" size="18" @click="showImage = true" />
    </template>
  </van-nav-bar>


  <div v-if="payStatus" class="mt-4 text-sm  px-6">
    当前支付状态：<span class="font-bold text-red-500">{{ payStatus }}</span>
  </div>
  <div v-if="errorMsg" class="mt-4 text-red-500">
    {{ errorMsg }}
  </div>






  <div class="max-w-3xl mx-auto p-4 mb-10">
    <!-- <h2 class="text-xl font-bold mb-4">我的查找记录</h2> -->
    发送短信后，返回查找记录发布工作

    <img src="/images/money/shoukuan2.jpg" alt="" style="max-width: 90vw; max-height: 80vh; border-radius: 8px" />

    <p><span class="mr-4">订单号：{{ orderId }} </span> 信息费： <span class="ml-0 text-red-500"> {{ price }} 元</span>(不能错)</p>


    <!-- <p class="bg-blue-500 text-white px-2 rounded-md inline-block"> 点击获取订单信息</p> -->



    <p>扫码支付后，点击👇发订单信息</p>

    <p>
      <!-- <button @click="sendSms" :disabled="payStatus === '已支付'"
        class="inline-block bg-blue-500 text-white px-3 rounded-md hover:bg-blue-600 ml-2 transition duration-300 ease-in-out cursor-pointer">
        点击发短信
      </button> -->


      <button @click="sendSms" :disabled="payStatus === '已支付'"
        class="inline-block px-3 rounded-md ml-2 transition duration-300 ease-in-out cursor-pointer"
        :class="payStatus === '已支付' ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'">
        点击发短信
      </button>


      通知后台，完成后记得返回<span class="text-red-500">发布任务</span>
    </p>

    <p> 联系电话(微信)：{{phoneNumber}} <span></span></p>



  </div>


  <!-- 支付确认框 -->





</template>

<script setup>

import config from '@/global.config.js'

// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';

import { ref, onMounted, computed,watch } from 'vue';

import { useRouter,useRoute } from 'vue-router'


const router = useRouter()
const route = useRoute()


// const smsBody = ref('');
const orders = ref([])
const showImage =ref(false)
const orderId =ref('')
const price =ref(0)

const phoneNumber = ref('15908801519');

orderId.value = route.query.order_id;
price.value = route.query.price;

let basePrice = Number(route.query.price) - 1;

  // 提取 order_id 的最后两位，不足补0
  let idStr = String(orderId.value).padStart(2, '0');  // 防止一位数
  let decimalPart = idStr.slice(-2);                   // 取最后两位

  // 构造最终 price
  price.value = Number(`${Math.floor(basePrice)}.${decimalPart}`);

console.log('Order ID:', orderId.value);
console.log('Price:', price.value);


const smsBody = ref(`我已支付萝卜家政信息费，订单id：${orderId.value},信息费：${price.value}元，请开通权限`)
console.log('smsBody',smsBody)

const smsLink = computed(() => {
  // 基础链接
 
  let link = `sms:${phoneNumber.value}`;

  // 如果有预设内容，则添加到链接中
  // 注意：某些设备和短信应用可能不支持 body 参数
  if (smsBody.value) {
    link += `?body=${encodeURIComponent(smsBody.value)}`;
  }
  return link;
});


const success = ref(false)
const error = ref(null)

const sendSms = async () => {
  // 新增支付记录
  const payload = {
    order: orderId.value,
    amount:price.value,
    payment_method: '微信',
    
    note: '线下确认收款'
  }

  try {
    await https.post('/api/minsubaojie/addpayment/', payload)
    success.value = true
  } catch (err) {
    error.value = err.response?.data?.detail || '服务器错误'
  }

  alert("短信发送后，请返回查找任务中等待")
  router.push("/getcleanorder")
   // === 关键：环境检测和条件式调用 ===
  // 检查 window.AndroidInterface 是否存在且其 isAndroidApp 方法是否可用
  if (window.AndroidInterface && typeof window.AndroidInterface.isAndroidApp === 'function' && window.AndroidInterface.isAndroidApp()) {
    // 如果在我们的 Android WebView App 中，调用原生方法来发送短信
    window.AndroidInterface.sendSmsToNative(phoneNumber.value, smsBody.value);
  } else {
    // 否则，在普通浏览器或其他环境中，直接使用 window.location.href 跳转
    window.location.href = smsLink.value;
  }
  
}

// /////////////////  查看是否支付 


const payStatus = ref('')
const errorMsg = ref('')

const checkPayStatus = async () => {
  payStatus.value = ''
  errorMsg.value = ''
  if (!orderId.value) {
    errorMsg.value = '请输入订单ID'
    return
  }

  try {
    const res = await https.get(`/api/minsubaojie/pay_status/${orderId.value}/`)
    payStatus.value = res.pay_status
  } catch (err) {
    errorMsg.value = err.response?.data?.error || '查询失败'
  }
}


onMounted(() => {
  checkPayStatus()
  
})
















// 编辑处理








onMounted(() => {
 
})


</script>


<style scoped>
 :deep(img) {
  max-width: 100%; /* 图片最大宽度为父元素宽度的100% */
  height: auto; /* 高度自动调整，保持宽高比 */
}

:deep(.van-cell__value) {
    position: relative;
    overflow: hidden;
    color: #140114;
    text-align: left;
    font-size: 18px;
    vertical-align: middle;
    word-wrap: break-word;
}
:deep(p){
  line-height: 35px;
}

</style>