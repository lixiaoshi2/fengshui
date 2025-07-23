<template>
  <div class="p-4 bg-gray-100">
    <h1 class="text-xl font-bold  mb-4 text-yellow-700">🔮 风水命理专区</h1>


     <!-- 分类导航 -->
    <section class="grid grid-cols-1 md:mt-16 md:grid-cols-3 gap-4 p-2">
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


    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
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
  { name: "🎉 起名", description: "宝宝名、公司名等", path: "/qiming" },
  { name: "⚰️ 个人头像设计", description: "微信头像等", path: "/bai" },
  { name: "🔮 公司徽标设计", description: "", path: "/mingli" },
  { name: "🔮 择日", description: "结婚、开业、动工、搬家等", path: "/mingli" },
  { name: "🔮 风水", description: "住宅、商铺、墓地等", path: "/mingli" },
  { name: "🔮 紫薇斗命盘分析", description: "", path: "/mingli" },
  { name: "🔮 流年运势预测分析", description: "", path: "/mingli" },
  { name: "🔮 八字排盘/合婚分析", description: "", path: "/mingli" },
];

// 点击跳转专区
const goToZone = (path) => {
  router.push(path);
};

</script>
