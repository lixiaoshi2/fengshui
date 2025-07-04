<template>
  <div class="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg">
    <!-- ⭐ 打分区域 -->

    <!-- ⭐ 打分概览区域 -->
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center space-x-2 text-lg font-semibold text-gray-800">
        <span>平均评分：</span>
        <span class="text-yellow-500 text-xl">{{ avg_rating }}</span>
        <span class="text-sm text-gray-500">（{{ total_reviews }} 条评价）</span>
      </div>
    </div>

    <div class="text-sm text-gray-700">
      评价条数越多，一般表明报价合理服务次数多，
    </div>
    <div class="text-sm text-gray-700">
      评分高说明此人做工质量很好，收费也很合理。
    </div>

    <!-- 📝 历史评价 -->
    <h3 class="text-lg font-semibold mt-8 mb-4 border-b pb-2">评价</h3>



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

      <p class="text-gray-700 mt-1">{{ rev.comment }}</p>

      <!-- 回复内容 -->
      <div v-if="rev.reply_comment"
        class="mt-2 pl-4 border-l-4 border-blue-400 bg-blue-50 text-blue-800 text-sm py-2 px-3 rounded">
        🧹 服务者回复：{{ rev.reply_comment }}
      </div>
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
const avg_rating = ref('')
const total_reviews = ref('')

console.log("cleanerid",route.params.id,route.params.cleanerid)
  // 设置星级
  function setRating(value) {
    console.log("评分")
    rating.value = value
  }
  
 
  
  // 获取历史评价
  async function fetchReviews() {
    try {
      const res = await https.get(`/api/minsubaojie/reviews2/${route.params.cleanerid}/`) // 假设 cleaner ID 是 3
      
      if (res.error){
        reviews.value=[]
      }else{
        reviews.value = res.reviews
        avg_rating.value = res.avg_rating
        total_reviews.value = res.total_reviews
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
  
  onMounted(fetchReviews)
  </script>
  