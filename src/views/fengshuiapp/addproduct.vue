<template>
  <div class="p-4 max-w-xl mx-auto mt-16 md:mt-20">

    <header class="fixed top-0 left-0 w-full bg-white shadow-sm z-50 py-3 px-4 flex items-center justify-between
               md:hidden"> <button @click="router.go(-1)"
        class="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="ml-1 text-base">返回</span>
      </button>

      <h1 class="text-lg font-semibold text-gray-800 tracking-wide">忆福安文化</h1>

      <div class="w-14"></div>
    </header>

    <h1 class="text-xl font-bold mb-4">新增商品</h1>

    <form @submit.prevent="submitProduct" enctype="multipart/form-data">
      <input v-model="form.name" type="text" placeholder="商品名称" class="input" />
      <input v-model="form.price" type="number" placeholder="价格" class="input" step="0.01" />
      <input v-model="form.category" type="text" placeholder="分类" class="input" />
      <textarea rows="5" v-model="form.description" placeholder="描述" class="input"></textarea>
      <input v-model="form.spec" type="text" placeholder="规格" class="input" />
      <input v-model="form.stock" type="number" placeholder="库存" class="input" />

      <label>封面图：</label>
      <input type="file" @change="handleCover" accept="image/*" class="input" />

      <label>商品多图：</label>
      <input type="file" multiple @change="handleImages" accept="image/*" class="input" />

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded mt-4">提交</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import https from '@/utils/request.js'  // 确保你这里使用的是 axios 实例

const form = ref({
  name: '',
  price: '',
  category: '',
  description: '',
  spec: '',
  stock: '',
})

const coverImage = ref(null)
const images = ref([])

const handleCover = (e) => {
  coverImage.value = e.target.files[0]
}

const handleImages = (e) => {
  images.value = Array.from(e.target.files)
}

const submitProduct = async () => {
  const formData = new FormData()

  // 添加字段
  formData.append('name', form.value.name)
  formData.append('price', form.value.price)
  formData.append('category', form.value.category)
  formData.append('description', form.value.description)
  formData.append('spec', form.value.spec)
  formData.append('stock', form.value.stock)

  // 添加图片
  if (coverImage.value) {
    formData.append('cover_image', coverImage.value)
  }

  images.value.forEach(img => {
    formData.append('images', img)
  })

  try {
    const res = await https.post3('/api/fengshui/products/create/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    alert('提交成功')
    console.log(res.data)
  } catch (error) {
    alert('提交失败，请检查数据是否完整')
    console.error(error)
  }
}
</script>

<style scoped>
.input {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
