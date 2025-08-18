<template>
  <div ></div>
  <div class="p-4 mb-16">
    <h1 class="text-xl font-bold mb-4 text-gray-800">⚰️ 多伦多纸钱烧纸冥币</h1>
    
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-16">
      <div
        v-for="item in products"
        :key="item.url"
        class="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer"
        @click="goToDetail(item.id)"
      >
        <img :src="fullImage(item.cover_image)" class="w-full h-32 object-cover mb-2 rounded" />
        <div class="text-sm font-semibold">{{ item.name }}</div>
        <div class="text-red-500 font-bold mt-1">${{ item.price }}</div>
       
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import https from '@/utils/request.js'

const route = useRoute()
const router = useRouter()
const products = ref([])
const categoryTitle = ref('')

// 拼接图片完整地址
const baseURL = 'http://192.168.1.127:8000'  // 或 http://localhost:8000
const fullImage = (path) => {
  if (typeof path === 'string') {
    return path.startsWith('http') ? path : baseURL + path
  }
  return ''  // 如果不是字符串，返回空字符串避免出错
}


onMounted(async () => {
  // const category = route.query.category || ''
  const category = '烧纸'
  categoryTitle.value = category || '商品列表'

  if (!category) {
    console.warn('未指定分类')
    return
  }

  try {
    const res = await https.get('/api/fengshui/products/', {
      // params: { category }
      category: '烧纸' 
    })
    console.log('res',res)
    products.value = res
    
  } catch (error) {
    console.error('加载商品失败', error)
  }
})

const goToDetail = (id) => {
  router.push(`/product/${id}`)
}
</script>