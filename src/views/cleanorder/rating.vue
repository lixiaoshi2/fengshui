<template>
  <van-nav-bar title="萝卜保洁" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
    <template #title>
      <label class="block text-lg font-medium text-gray-700">萝卜保洁</label>
    </template>
  </van-nav-bar>

  <div class="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg">
    <!-- ⭐ 打分区域 -->
    <h2 class="text-xl font-semibold mb-2 ">为本次服务评分 </h2>
    <div class="text-xs text-gray-500 mt-2 mb-4">
      如有虚假信息请 <span class="text-red-500 font-medium">评价</span> 并且
      <span class="text-red-500 font-medium">举报</span>
    </div>
    <div class="flex items-center mb-4 space-x-1">
      <template v-for="n in 5" :key="n">
        <svg @click="setRating(n)"
          :class="['w-8 h-8 cursor-pointer', rating >= n ? 'text-yellow-400' : 'text-gray-300']" fill="currentColor"
          viewBox="0 0 20 20">
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.13 3.478a1 1 0 00.95.69h3.656c.969 0 1.371 1.24.588 1.81l-2.958 2.15a1 1 0 00-.364 1.118l1.13 3.478c.3.921-.755 1.688-1.54 1.118L10 13.347l-2.958 2.15c-.784.57-1.838-.197-1.54-1.118l1.13-3.478a1 1 0 00-.364-1.118L3.31 8.905c-.783-.57-.38-1.81.588-1.81h3.656a1 1 0 00.95-.69l1.13-3.478z" />
        </svg>
      </template>
    </div>

    <textarea v-model="comment" placeholder="说说你的评价吧..."
      class="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" rows="3"></textarea>

    <div class="flex justify-center space-x-4 mt-4">
      <button @click="submitReview" class="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
        提交评价
      </button>

      <button @click="openReportDialog = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
        我举报
      </button>

      <button @click="reportInfo" class="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
        举报内容
      </button>
    </div>

    <!-- 举报内容 -->
    <div v-if="openReportDialog" class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
        <h2 class="text-lg font-semibold mb-4">举报用户</h2>

        <label class="block mb-2 text-sm text-gray-700">请选择举报原因：</label>
        <select v-model="form.reason" class="w-full mb-4 border border-gray-300 rounded p-2">
          <option value="">请选择</option>
          <option value="虚假信息">虚假信息</option>
          <option value="服务态度差">服务态度差</option>
          <option value="联系不上">联系不上</option>
          <option value="其他">其他</option>
        </select>

        <label class="block mb-2 text-sm text-gray-700">补充说明（选填）：</label>
        <textarea v-model="form.description" class="w-full h-24 border border-gray-300 rounded p-2 resize-none"
          placeholder="请输入详细情况..."></textarea>

        <div class="flex justify-end space-x-2 mt-4">
          <button @click="submitReport" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            提交举报
          </button>
          <button @click="openReportDialog = false" class="bg-gray-300 text-gray-700 px-4 py-2 rounded">
            取消
          </button>
        </div>
      </div>
    </div>

    <!-- 举报内容 -->

    <!-- 📝 历史评价 -->
    <h3 class="text-lg font-semibold mt-8 mb-4 border-b pb-2">其他用户的评价</h3>
    <div v-if="reviews.length === 0" class="text-gray-500">暂无评价。</div>

    <div v-for="(rev, index) in reviews" :key="index" class="border-t py-4">
      <div class="flex items-center justify-between">
        <div class="font-medium text-gray-700">
          👤 {{ rev.customer_name || '匿名用户' }}
        </div>
        <div class="text-sm text-gray-500">
          {{ formatDate(rev.created_at) }}
        </div>
      </div>

      <div class="flex items-center space-x-1 my-1">
        <template v-for="n in 5" :key="n">
          <svg :class="['w-5 h-5', rev.rating >= n ? 'text-yellow-400' : 'text-gray-300']" fill="currentColor"
            viewBox="0 0 20 20">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.13 3.478a1 1 0 00.95.69h3.656c.969 0 1.371 1.24.588 1.81l-2.958 2.15a1 1 0 00-.364 1.118l1.13 3.478c.3.921-.755 1.688-1.54 1.118L10 13.347l-2.958 2.15c-.784.57-1.838-.197-1.54-1.118l1.13-3.478a1 1 0 00-.364-1.118L3.31 8.905c-.783-.57-.38-1.81.588-1.81h3.656a1 1 0 00.95-.69l1.13-3.478z" />
          </svg>
        </template>
      </div>

      <!-- 评论内容 -->
      <p class="text-gray-700 mt-1">{{ rev.comment }}</p>

      <!-- 回复内容 -->
      <div v-if="rev.reply_comment" class="mt-2 pl-4 border-l-4 border-blue-200">
        <p class="text-sm text-blue-700">💬 服务者回复：{{ rev.reply_comment }}</p>
      </div>
    </div>

  </div>


  <!-- 弹出框显示投诉的内容 -->
  <div v-if="showReport" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg w-80 shadow-xl text-gray-800">
      <h2 class="text-lg font-semibold mb-2 text-red-600">举报内容</h2>
      <p class="text-sm whitespace-pre-wrap">{{ reportText }}</p>
      <button @click="showReport = false"
        class="mt-4 bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400 text-sm">
        关闭
      </button>
    </div>
  </div>


</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import https from '@/utils/request.js';
//   import axios from 'axios'

import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const rating = ref(0)
const comment = ref('')
const reviews = ref([])

console.log("cleanerid",route.params.id,route.params.cleanerid)
  // 设置星级
  function setRating(value) {
    console.log("评分")
    rating.value = value
  }
  
  // 提交评价
  async function submitReview() {
    if (rating.value === 0) return alert('请选择星级评分')
    try {
      await https.post('/api/minsubaojie/reviews/', {
        order: route.params.id,  // 实际中替换为真实订单ID
        cleaner: route.params.cleanerid,  // 实际中替换为真实订单ID
        rating: rating.value,
        comment: comment.value,
        customer:localStorage.getItem("user_id")
      })
      alert('评价成功')
      rating.value = 0
      comment.value = ''
      fetchReviews()
    } catch (err) {
      console.log("可以看到错误提示")
      console.error(err)
      alert('不能重复提交评价，也不能对未匹配的人员评价')
    }
  }


    
  // 获取历史评价
  async function fetchReviews() {
    try {
      const res = await https.get(`/api/minsubaojie/reviews/${route.params.cleanerid}/`) // 假设 cleaner ID 是 3
      
      if (res.error){
        reviews.value=[]
      }else{
        reviews.value = res
      }
    } catch (err) {
      console.error(err)
    }
  }


  


  
  // 时间格式化
  function formatDate(isoDate) {
    const date = new Date(isoDate)
    return date.toLocaleDateString()
  }


  // ///////////// 举报内容
  const openReportDialog = ref(false)

  const form = ref({
    reason: '',
    description: ''
  })


  // 获取举报信息// 获取举报信息reportInfo
 
const showReport = ref(false)
const reportText = ref('')
const reportInfo = async () => {
  try {
    const res = await https.get('/api/minsubaojie/report_one/', {
      params: {
        order_id: route.params.id,
        reported_user_id: localStorage.getItem("user_id")
      }
    })

    if (res?.[0]?.reason) {
      reportText.value = res[0].reason + ', ' + res[0].description
      showReport.value = true
    } else {
      reportText.value = '暂无举报记录。'
      showReport.value = true
    }
  } catch (err) {
    reportText.value = '获取举报信息失败。'
    showReport.value = true
  }
}



// 提交举报
  const submitReport = async () => {
    if (!form.value.reason) {
      alert('请选择举报原因')
      return
    }

    const payload = {
      reason: form.value.reason,
      description: form.value.description,
      reported_user_id: localStorage.getItem("user_id"), // 被举报人ID
      order_id: route.params.id  // 可选：与订单相关的举报
    }
    console.log("payload",payload)

    try {
      const res = await https.post('/api/minsubaojie/report/', payload)
      alert('举报提交成功，我们将尽快处理。')
      openReportDialog.value = false
    } catch (error) {
      alert(`举报提交失败，请稍后重试,您可能已经提交过了。`)
    }
  }

  ///////////  举报内容


  onMounted(fetchReviews)
</script>
  