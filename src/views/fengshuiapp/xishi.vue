<template>
  <div class="p-4 bg-gray-100">
    <h1 class="text-xl font-bold  mb-4 text-yellow-700">🎉  喜事婚庆专区</h1>


     <!-- 分类导航 -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
      <div
        v-for="category in categories"
        :key="category.name"
        class="bg-white rounded-xl shadow hover:shadow-lg p-2 cursor-pointer transition"
        @click="goToZone(category.path)"
      >
        <div class="text-lg font-semibold mb-2">{{ category.name }}</div>
        <p class="text-sm text-gray-600">{{ category.description }}</p>
      </div>
    </section>


    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div
        v-for="item in fengshuiItems"
        :key="item.id"
        class="bg-white p-4 rounded shadow hover:shadow-md transition"
      >
        <img :src="item.image" class="w-full h-32 object-cover mb-2 rounded" />
        <div class="text-sm font-semibold">{{ item.name }}</div>
        <div class="text-green-700 font-bold mt-1">¥{{ item.price }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();


  const categories = [
  { name: "📝 结婚注册", description: "法律认可的结婚需由持证的证婚人主持", path: "/qiming" },
  { name: "✨ 婚礼策划", description: "负责完整的策划过程", path: "/bai" },
  { name: "📍 场地选择", description: "", path: "/bai" },
  { name: "🎤 主持人", description: "", path: "/bai" },
  { name: "📸 摄影师", description: "", path: "/mingli" },
  { name: "🌸 花艺道具", description: "", path: "/mingli" },
  { name: "💌 请柬打印", description: "", path: "/mingli" },
  { name: "🎁 伴手礼", description: "", path: "/mingli" },
  { name: "🍰 甜品", description: "", path: "/mingli" },
  { name: "🍽️ 正餐", description: "", path: "/mingli" },
  { name: "🎧 DJ", description: "", path: "/mingli" }
];


// 点击跳转专区
const goToZone = (path) => {
  router.push(path);
};

</script>
