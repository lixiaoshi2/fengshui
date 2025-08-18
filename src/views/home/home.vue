<template>
  <div class="min-h-screen bg-gray-100 text-gray-800 md:mt-4">
    <!-- 顶部导航 -->
    <!-- <header style="background-color: #F8F8F8; " class="text-center p-4 text-xl font-bold shadow-md">
      <span style="color: #4A3C30;">忆福安传统文化服务</span>
    </header> -->

    <!-- <header style="background-color: #F8F8F8; " class="text-center p-4 text-xl font-bold shadow-md">
      <span style="color: #2F4F4F;">忆福安传统文化服务</span>
    </header> -->
<header style="background: linear-gradient(to right, #f5e4d6, #f9f9f9);  solid #cfa87a;"
        class="text-center pt-2 pb-0 px-4 pb-2 text-2xl font-semibold shadow-md text-[#5a3e2b] lg:hidden">
    <span style="font-family: 'SimSun', '宋体', serif;">忆福安文化平台</span>
   
</header>

    <!-- 分类导航 -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-2 px-4 py-2 md:mt-24">
      <div v-for="category in categories" :key="category.name"
        class="bg-white rounded-xl shadow hover:shadow-lg px-4 py-0 cursor-pointer transition"
        @click="goToZone(category.path)">
        <div class="text-lg font-semibold mb-0">{{ category.name }}</div>
        <p class="text-sm text-gray-600">{{ category.description }}</p>
      </div>
    </section>

    <!-- 推荐商品 -->
    <section class="p-2">
      <h3 class="px-2 font-bold mb-1">精选推荐</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        <div v-for="item in productsWithFullImage" :key="item.id" class="bg-white p-2 rounded-lg shadow hover:shadow-md transition">
          <img @click="router.push(item.url)" :src="item.image" alt="商品图" class="w-full h-32 object-cover rounded-md mb-1" />
          <div class="text-sm font-semibold">{{ item.name }}</div>
          <div class="text-red-600 font-bold mt-0">${{ item.price }}</div>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="text-center text-sm text-gray-500 p-4 mt-6">
      © 2025忆福安文化平台 
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useHead } from '@vueuse/head'

const router = useRouter();

const categories = [
  // { name: "🎉 喜事专区", description: "婚礼用品、婚车布置、婚庆主持等", path: "/xishi" },
  
  { name: "🔮 多伦多玄学命理", description: "算命、运势、预测婚姻、预测、八字、风水、道符", path: "/mingli" },
  { name: "⚰️ 多伦多烧纸纸钱冥币", description: "种类齐全，烧纸、冥币、纸钱，套餐", path: "/bai" },
];

var products =[]



// 根据当前环境生成图片完整路径
const host = window.location.hostname;
let baseUrl = "";

if (host.startsWith("192.168.1.")) {

 products = [

  { id: 1, name: "烧纸冥币礼包25元装", price: 25, image: "/media/products/cover/zhiqian2-0.jpg",url: "/product/1"  },
  { id: 2, name: "婚庆红绸套装", price: 128, image: "/media/products/cover/10.jpg" ,url: "/product/2" },
  { id: 3, name: "风水八卦镜", price: 66, image: "/media/products/cover/02cover.jpg" ,url: "/product/12"},
 
];

}else{
products = [
  { id: 1, name: "烧纸冥币礼包10元装", price: 10, image: "/media/products/cover/10_BlGvjyw.jpg",url: "/product/24"  },
  { id: 2, name: "烧纸冥币礼包15元装", price: 15, image: "/media/products/cover/15-2.jpg" ,url: "/product/25" },
  { id: 3, name: "烧纸冥币礼包25元装", price: 25, image: "/media/products/cover/25.jpg" ,url: "/product/26"  },
  { id: 4, name: "烧纸冥币-摇钱树", price: 10, image: "/media/products/cover/10_BlGvjyw.jpg" ,url: "/product/27"  },
  { id: 5, name: "烧纸冥币-金库银库-亮面", price: 25, image: "/media/products/cover/fangwu01.jpg" ,url: "/product/17"  },
  { id: 6, name: "平台师傅介绍", price: 199-399, image: "/media/products/cover/zhangsongxu2_nYw95WU.jpg" ,url: "/mingli_jieshao"  },
  { id: 7, name: "问卜问卦", price: 200, image: "/media/products/cover/%E5%88%98%E5%8B%87_NhyPdfn.jpg" ,url: "/product/30"  },
  { id: 8, name: "合婚分析", price: 200, image: "/media/products/cover/%E5%88%98%E5%8B%87_NhyPdfn.jpg" ,url: "/hunyin"  },

];
}




if (host.startsWith("192.168.1.")) {
  baseUrl = "http://192.168.1.127:8000";
} else {
  baseUrl = window.location.origin; // 自动用当前线上域名
}

const productsWithFullImage = products.map(p => ({
  ...p,
  image: `${baseUrl}${p.image}`
}));


 useHead({
   title: `多伦多最便宜纸钱烧纸冥币 多伦多算命预测婚姻`,
   meta: [
     {
       name: 'keyword',
       content: `多伦多，最便宜，烧纸，纸钱，冥币，加拿大占卜，多伦多起名 加拿大算命预测婚姻`
     },
     {
       name: 'description',
       content: `多伦多最便宜烧纸，最便宜纸钱，多伦多起名， 以及最便宜冥币，多伦多占卜，多伦多看事，多伦多易学，加拿大算命，预测婚姻`
     }
   ]
 });


// 点击跳转专区
const goToZone = (path) => {
  router.push(path);
};
</script>
