<template>
  <!-- 顶栏 -->
  <van-nav-bar title="商家抢到的工作" left-text="返回" @click-left="router.go(-1)" left-arrow>
    <template #right>
      <van-icon name="question-o" size="18" @click="showImage = true" />
    </template>
  </van-nav-bar>

  <!-- 帮助图片弹窗 -->
  <van-popup v-model:show="showImage" position="center" closeable round>
    <img src="/images/help2/qiangdan.jpg" alt="帮助图片" style="max-width: 90vw; max-height: 80vh; border-radius: 8px" />
  </van-popup>

  <!-- 主体内容 -->
  <div>
    <h2 class="text-lg font-bold mb-4 ml-4">子账号已抢订单</h2>

    <div v-for="order in orders" :key="order.order_id" class="mb-6 border p-4 rounded shadow">
      <h3 class="text-md font-semibold">订单号：{{ order.order_id }}</h3>
      <p>地址：{{ order.order_info.houseaddr }}</p>
      <p>时间：{{ dayjs(order.order_info.create_time).format('YYYY-MM-DD HH:mm') }}</p>

      <div class="mt-2">
        <p class="font-semibold">抢单人员：</p>
        <ul class="pl-4 list-disc">
          <li v-for="cleaner in order.cleaners" :key="cleaner.cleaner_id">
            {{ cleaner.cleaner_name }}（ID: {{ cleaner.cleaner_id }}）<br>
            电话：{{ cleaner.phone }}<br>
            距离：{{ cleaner.distance }} 公里
          </li>
        </ul>
      </div>
    </div>

    <!-- 分页按钮 -->
    <div class="flex justify-center items-center gap-4 my-4 mb-16">
  <van-button size="small" :disabled="currentPage <= 1" @click="goPrevPage">上一页</van-button>
  <span class="text-gray-600 text-sm">第 {{ currentPage }} / {{ totalPages }} 页</span>
  <van-button size="small" :disabled="!nextPage" @click="goNextPage">下一页</van-button>
</div>
  </div>
</template>

<script setup>
import https from '@/utils/request.js'
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'

const router = useRouter()
const showImage = ref(false)

const orders = ref([])
const currentPage = ref(1)
const nextPage = ref(null)
const loading = ref(false)

/* ---------- 获取分页订单 ---------- */
const fetchOrders = async (page = 1) => {
  loading.value = true
  try {
    const res = await https.get(`/api/minsubaojie/mygrab-ordersb/?page=${page}`)
    const data = res
    orders.value = data.results
    currentPage.value = page
    nextPage.value = data.next
      ? Number(new URL(data.next).searchParams.get('page'))
      : null
  } catch (err) {
    alert('获取订单失败')
  } finally {
    loading.value = false
  }
}

/* ---------- 翻页按钮 ---------- */
const goPrevPage = () => {
  if (currentPage.value > 1) {
    fetchOrders(currentPage.value - 1)
  }
}

const goNextPage = () => {
  if (nextPage.value) {
    fetchOrders(nextPage.value)
  }
}

onMounted(() => {
  fetchOrders()
})
</script>

<style scoped>
:deep(img) {
  max-width: 100%;
  height: auto;
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
:deep(p) {
  line-height: 35px;
}
</style>
