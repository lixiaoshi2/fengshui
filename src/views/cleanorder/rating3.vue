<template>
  <div class="p-4">
    <h2 class="text-lg font-semibold mb-4">雇主评论</h2>

    <div v-if="rating" class="border p-4 rounded shadow-sm">
      <p><strong>评分：</strong>{{ rating.rating }} 星</p>
      <p><strong>评论内容：</strong> {{ rating.comment || '无' }}</p>
      <p class="text-gray-500 text-sm">评论时间：{{ formatDate(rating.created_at) }}</p>

      <div v-if="rating.reply_comment" class="bg-blue-100 p-3 rounded mt-3">
        <strong class="text-blue-600">你的回复：</strong> {{ rating.reply_comment }}
      </div>

      <div v-else class="mt-3">
        <textarea
          v-model="reply"
          placeholder="填写你的回复..."
          class="border w-full p-2 rounded mb-2"
        ></textarea>
        <button
          class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          @click="submitReply"
        >
          提交回复
        </button>
      </div>
    </div>

    <div v-else>
      <p class="text-gray-500">没有找到该订单的评论。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// import axios from '@/utils/request'  // 你自己的封装
import https from '@/utils/request.js';
import { showToast } from 'vant'

const route = useRoute()
const orderId = route.params.order_id  // 假设你从路由中获得订单 ID
console.log('orderid',orderId)
const rating = ref(null)
const reply = ref('')

const loadRating = async () => {
  const userid = localStorage.getItem("user_id")
  console.log('orderid3',orderId)
  try {
    const res = await https.get(`/api/minsubaojie/rating3/${orderId}/${userid}/`)
    rating.value = res
  } catch (e) {
    rating.value = null
  }
}

const submitReply = async () => {

  if (!reply.value) {
   
    alert('回复不能为空')
    return
  }
  try {
    await https.post(`/api/minsubaojie/reply/${orderId}/`, {
      reply_comment: reply.value,
    })
    showToast('回复成功')
    await loadRating()
  } catch (e) {
    showToast('提交失败')
  }
}

const formatDate = (val) => {
  return new Date(val).toLocaleString()
}

onMounted(() => {
  loadRating()
})
</script>
