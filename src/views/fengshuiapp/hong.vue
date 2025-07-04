<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4 text-red-600">🎉 喜事专区</h1>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div
        v-for="item in weddingItems"
        :key="item.id"
        class="bg-white p-4 rounded shadow hover:shadow-md transition"
      >
        <img :src="item.image" class="w-full h-32 object-cover mb-2 rounded" />
        <div class="text-sm font-semibold">{{ item.name }}</div>
        <div class="text-red-500 font-bold mt-1">¥{{ item.price }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const weddingItems = [
  { id: 1, name: "新婚红绸全套", price: 188, image: "https://via.placeholder.com/150" },
  { id: 2, name: "婚庆车队装饰", price: 288, image: "https://via.placeholder.com/150" },
  { id: 3, name: "结婚对联礼包", price: 68, image: "https://via.placeholder.com/150" },
  { id: 4, name: "婚庆主持人预约", price: 688, image: "https://via.placeholder.com/150" },
]
</script>
