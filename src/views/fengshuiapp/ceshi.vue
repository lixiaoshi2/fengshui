<template>
  <div class="bg-[#f5f5f0] py-16 px-6 text-center mt-20">
    <!-- 标题部分 -->
    <div class="text-4xl md:text-5xl font-extrabold mb-6 tracking-wide">
      <span class="text-gray-900">起名服务</span>
      <span class="text-amber-600 ml-2">匠心打造</span>
    </div>

    <!-- 标签部分 -->
    <div class="flex flex-wrap justify-center gap-4 mt-8">
      <div
        v-for="label in labels"
        :key="label"
        class="px-6 py-2 bg-emerald-700 text-white rounded-md text-lg font-medium shadow-md border border-emerald-900 tracking-wide"
      >
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script setup>
const labels = ['音律优美', '寓意吉祥', '命理匹配', '五格协调'];
</script>

<style scoped>
</style>
