<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- 顶部导航 -->
    <header class="bg-red-600 text-white p-4 text-center text-xl font-bold shadow-md">
      红白喜事 & 风水命理服务平台
    </header>

    <!-- 分类导航 -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div
        v-for="category in categories"
        :key="category.name"
        class="bg-white rounded-xl shadow hover:shadow-lg p-4 cursor-pointer transition"
        @click="goToZone(category.path)"
      >
        <div class="text-lg font-semibold mb-2">{{ category.name }}</div>
        <p class="text-sm text-gray-600">{{ category.description }}</p>
      </div>
    </section>

    <!-- 推荐商品 -->
    <section class="p-4">
      <h2 class="text-lg font-bold mb-4">精选推荐</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div
          v-for="item in products"
          :key="item.id"
          class="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
        >
          <img :src="item.image" alt="商品图" class="w-full h-32 object-cover rounded-md mb-2" />
          <div class="text-sm font-semibold">{{ item.name }}</div>
          <div class="text-red-600 font-bold mt-1">¥{{ item.price }}</div>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="text-center text-sm text-gray-500 p-4 mt-6">
      © 2025 红白喜事平台 · 昆明文化传承服务中心
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const categories = [
  { name: "🎉 喜事专区", description: "婚礼用品、婚车布置、婚庆主持等", path: "/xishi" },
  { name: "⚰️ 白事专区", description: "寿衣、纸钱、葬礼布置、司仪服务", path: "/bai" },
  { name: "🔮 风水命理", description: "大师算命、八字合婚、镇宅风水物品", path: "/mingli" },
];

const products = [
  { id: 1, name: "烧纸礼包（5套）", price: 88, image: "/images/shaozhi01.jpg" },
  { id: 2, name: "婚庆红绸套装", price: 128, image: "/images/hongxi01.jpg" },
  { id: 3, name: "风水八卦镜", price: 66, image: "/images/baguajing01.jpg" },
  { id: 4, name: "道教大师算卦服务", price: 199, image: "/images/cesuan01.jpg" },
];

// 点击跳转专区
const goToZone = (path) => {
  router.push(path);
};
</script>
