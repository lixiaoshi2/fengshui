<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">可抢订单列表（父账户）</h1>

    <div v-if="loading" class="text-gray-500">加载中...</div>

    <div v-else-if="orders.length === 0" class="text-gray-500">暂无可抢订单</div>

    <div v-else>
      <div v-for="order in orders" :key="order.order_id" class="bg-white rounded-xl shadow p-4 mb-6">
        <h2 class="text-lg font-semibold mb-2">订单 ID：{{ order.order_id }}</h2>
        <p class="text-sm text-gray-600 mb-2">
          创建时间：{{ formatTime(order.created_time) }}
        </p>

        <div class="mb-2">
          <pre class="bg-gray-100 p-2 rounded text-sm whitespace-pre-wrap">
{{ order.order_info }}
          </pre>
        </div>

        <div>
          <h3 class="text-md font-medium mb-1">可抢保洁员：<span class="text-gray-500 text-sm">(点击抢单)</span></h3>
          <ul class="pl-4 list-disc text-sm text-gray-700">
            <li v-for="cleaner in order.available_cleaners" :key="cleaner.cleaner_id">
              <div class="border p-2 rounded mb-2 cursor-pointer hover:bg-blue-50" >
                {{ cleaner.cleaner_name }}（cID：{{ cleaner.cleaner_id }}）电话：
                {{ cleaner.phone }} ({{ cleaner.distance }}公里)
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 分页 -->
      <div class="flex justify-center items-center space-x-2 mt-4 mb-10">
        <button class="px-3 py-1 border rounded disabled:opacity-50" :disabled="page <= 1"
          @click="changePage(page - 1)">
          上一页
        </button>
        <span class="text-sm">第 {{ page }} 页，共 {{ totalPages }} 页</span>
        <button class="px-3 py-1 border rounded disabled:opacity-50" :disabled="page >= totalPages"
          @click="changePage(page + 1)">
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted,computed } from 'vue'
import https from '@/utils/request.js'

const orders = ref([])
const loading = ref(true)
const page = ref(1)
const pageSize = 10
const total = ref(0)

// var totalPages =  computed(() => Math.ceil(total.value / pageSize))
var totalPages = ref(0)
const fetchOrders = async () => {
  loading.value = true
  console.log('page',page.value)
  try {
    const res = await https.get('/api/minsubaojie/available-orders3/', {
     
        page: page.value,
        page_size: pageSize,
        city:localStorage.getItem("city")
      
    })
    orders.value = res.results
    console.log("orders.val",orders.value)
    total.value = res.count
    totalPages.value = res.total_pages
  } catch (error) {
    console.error('获取订单失败:', error)
  } finally {
    loading.value = false
  }
}

const changePage = (newPage) => {
  page.value = newPage
  // console.log("newpage",page.value)
  fetchOrders()
}

const grab_order2 =  (orderId, distance ,cleaner_id) =>{
  console.log('keyixiedaima le')
  console.log("抢单juli",distance)
  console.log("orderId",orderId)
    
    console.log("抢单juli",distance)
    
    if (confirm('请认真核对自己是否符合雇主要求，如果不符合不要抢单，否则会被差评，如果符合请清单。')) {
       https.post(`/api/minsubaojie/grab-orderb/${orderId}/`,{
        distance: distance,
        cleaner_id:cleaner_id
      });
      alert("抢单成功！，您现在就可以马上和雇主电话联系，先抢先得");
      // router.push('/mygraborder')
    }
    
    // fetchOrders();
} 

   
    


const formatTime = (timeStr) => {
  const d = new Date(timeStr)
  return d.toLocaleString()
}

onMounted(() => {
  fetchOrders()
})
</script>
