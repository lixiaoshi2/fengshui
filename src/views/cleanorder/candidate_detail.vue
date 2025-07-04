<template>
  <van-nav-bar title="小萝卜保洁" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
    <template #title>
      <label class="block text-lg font-medium text-gray-700">小萝卜家政</label>
    </template>
  </van-nav-bar>

  <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mb-10">
    <h1 class="text-2xl font-bold mb-6 text-center">家政人员详情</h1>

    <!-- 数据加载提示 -->
    <div v-if="errorMsg" class="text-red-500">{{ errorMsg }}</div>
    <div v-else-if="loading">数据加载中...</div>
    <div v-else>
      <!-- 文字信息部分 -->
      <div class="space-y-4" v-if="data.cleaner">
        <p class="text-gray-700"><span class="font-semibold">用户ID：</span>{{ data.cleaner.user_id || '无' }}</p>
        <p class="text-gray-700"><span class="font-semibold">姓名：</span>{{ data.cleaner.name || '无' }}</p>
        <p class="text-gray-700"><span class="font-semibold">电话：</span>{{ data.cleaner.phone || '无' }}</p>
        <p class="text-gray-700"><span class="font-semibold">微信：</span>{{ data.cleaner.weixin || '无' }}</p>
        <p class="text-gray-700"><span class="font-semibold">性别：</span>{{ data.cleaner.gender || '无' }}</p>
        <p class="text-gray-700"><span class="font-semibold">年龄：</span>{{ data.cleaner.age || '无' }}</p>
        <p class="text-gray-700"><span class="font-semibold">备注：</span>{{ data.cleaner.beizhu || '无备注' }}</p>
      </div>

      <!-- 身份证图片 -->
      <div v-if="data.cleaner?.id_card_front" class="flex flex-col items-center mt-8">
        <span class="font-semibold">备选人信息：</span>

        <div class="relative w-full max-w-md">
          <!-- 图片 -->
          <img :src="`http://localhost:8000${data.cleaner.id_card_front}`" alt="身份证正面"
            class="rounded-lg border border-gray-300 w-full">

          <!-- 水印层 -->
          <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <span class="text-white text-2xl font-bold opacity-55">仅供查看 仅供查看 仅供查看 仅供查看 仅供查看</span>
          </div>
        </div>
      </div>

      <div v-else>
        <p class="text-gray-500">无图片</p>
      </div>
    </div>

    <!-- <button @click="refuse(data.id)" class="mt-2 ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
      拒接
    </button> -->

   

    <!-- <button @click="confirmcleaner(data.cleaner.id)"
      v-if="data.status === '已抢单'" 
        class="mt-2 ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        确认并结束
    </button> -->


  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import https from '@/utils/request.js';

const router = useRouter();
const route = useRoute();
const loading = ref(true);
const data = ref({});
const errorMsg = ref('');

const orderId = route.query.order_id;
const cleanerId = route.query.cleanerid;

const getcandidate_detail = async (orderId, cleanerId) => {
  try {
    const response = await https.get(`/api/minsubaojie/candidate_detail/${orderId}/${cleanerId}/`);
    data.value = response;
  } catch (error) {
    console.error('获取保洁员失败:', error);
    errorMsg.value = '获取保洁员失败，请检查网络或稍后再试！';
  } finally {
    loading.value = false;
  }
};

// 确认家政人员并关闭此单 confirmcleaner

const confirmcleaner = async(cleanerid) =>{
  console.log("candidateid",cleanerid,orderId)

  try {
    const response = await https.post(`/api/minsubaojie/confirmCleaner/${orderId}/${cleanerid}/`);
    alert("确认此订单成功")
    
  } catch (error) {
    alert("已经确认了")
    router.go(-1)
  } 

  
  router.go(-1)
}

const refuse = async(candidateid) =>{
  console.log("candidateid",candidateid)
  const response = await https.post(`/api/minsubaojie/refuseCleaner/${candidateid}/${orderId}/`);
  console.log('response', response)
  alert("您已拒接此人，您可以再次发起一下轮抢单")
  router.go(-1);
  
}

onMounted(() => {
  const orderId2 = route.query.order_id;
  const cleanerId2 = route.query.cleanerid;
  getcandidate_detail(orderId2, cleanerId2);
});
</script>

<style scoped>
::v-deep(img) {
  max-width: 100%;
  height: auto;
}

::v-deep(p) {
  line-height: 35px;
}

.watermark-container {
  position: relative;
  display: inline-block;
}

.watermark-container::after {
  content: "仅供查看";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15vw; /* 放大水印，6vw表示视口宽度的6% */
  color: rgba(255, 255, 255, 0.5); /* 半透明白色 */
  pointer-events: none; /* 防止遮挡点击事件 */
  white-space: nowrap;
}

</style>
