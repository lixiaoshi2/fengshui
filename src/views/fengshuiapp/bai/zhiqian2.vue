<template>
  <div class="min-h-screen bg-gray-100 pb-24">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="超值烧纸套餐" left-text="返回" left-arrow @click-left="router.go(-1)" />

    <!-- 商品内容卡片 -->
    <div class="p-4 bg-white shadow">
      <!-- 商品图片：完整显示，不裁剪 -->
      <img src="/images/baishi/zhiqian3.jpg" class="w-full h-auto object-contain rounded-lg mb-4" alt="烧纸套餐" />
      

      <!-- 商品标题和价格 -->
      <h1 class="text-xl font-bold mb-2">超值烧纸套餐2</h1>
      <p class="text-red-600 text-lg font-semibold mb-4">¥88</p>

      <!-- 商品参数信息 -->
      <div class="text-sm text-gray-700 space-y-2">
        <p><strong>分类：</strong> 白事专区</p>
        <p><strong>简介：</strong> 包含五套烧纸，适用于传统祭祀，寄托哀思。</p>
        <p><strong>规格：</strong> 五套装（含金银纸）</p>
        <p><strong>价格：</strong> $30</p>
      </div>
    </div>

    <!-- 固定底部下单按钮 -->
    <div class="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-inner mb-12">
      <van-button type="primary" block @click="placeOrder">加入购物车</van-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const placeOrder = () => {
  alert('您已下单商品：超值烧纸套餐')
}
</script>
