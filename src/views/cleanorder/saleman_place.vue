<template>
  <van-nav-bar title="萝卜保洁" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
    <template #title>
      <label class="block text-lg font-medium text-gray-700">萝卜家政</label>
    </template>
  </van-nav-bar>

  <div>
    <h2 class="text-lg font-bold px-3 pt-0 mb-1">分销商工作区</h2>
    <div class="flex justify-between items-center mb-0 px-2 py-0 text-sm text-gray-400">
      分销商的工作是向周围业主推广本平台，获取直接订单的20%分红，只有申请通过才能成为销商
      <br>业主也能成为分销商，但需要分红金额超过200元才开始分配
    </div>

    <div style="background-color: #f7f7f7; padding: 8px; margin: 8px 0; "></div>


    <van-row class="py-0 my-0">
      <van-col  style="display: flex;align-items: center; justify-content: center;" span="12">
        <van-cell title="申请做分销商" @click=" router.push({ path: '/be_saleman' }) " icon="manager-o" /></van-col>

 <van-col  style="display: flex;align-items: center; justify-content: center;" span="12">
        <van-cell title="申请做分销商2" @click=" router.push({ path: '/be_saleman2' }) " icon="manager-o" /></van-col>


      <van-col style="display: flex;align-items: center; justify-content: center;" span="12">
        <van-cell title="我的邀请码" @click=" router.push({ path: '/invite' }) " icon="manager-o" /></van-col>

    </van-row>
    


    <van-row class="py-0 my-0">
      <van-col  style="display: flex;align-items: center; justify-content: center;" span="12">
        <van-cell title="分销协议" @click=" router.push({ path: '/saleman_protoc' }) " icon="manager-o" /></van-col>

      <van-col style="display: flex;align-items: center; justify-content: center;" span="12">
        <van-cell title="我的分红" @click=" router.push({ path: '/saleman_fenhong' }) " icon="manager-o" /></van-col>

    </van-row>


     <van-row class="py-0 my-0">
      <van-col  style="display: flex;align-items: center; justify-content: center;" span="12">
        <van-cell title="已分红" @click=" router.push({ path: '/saleman_protoc' }) " icon="manager-o" /></van-col>

      <van-col style="display: flex;align-items: center; justify-content: center;" span="12">
        <van-cell title="营销广告"    @click="downloadPic" icon="manager-o" /></van-col>

    </van-row>

    <van-row class="py-0 my-0">
      <van-col  style="display: flex;align-items: center; justify-content: center;" span="12">
        <van-cell title="推广人员" @click=" router.push({ path: '/my_xiajia' }) " icon="manager-o" /></van-col>

      <van-col style="display: flex;align-items: center; justify-content: center;" span="12">
        <van-cell title="营销广告"    @click="downloadPic" icon="manager-o" /></van-col>

    </van-row>

    <div style="background-color: #f7f7f7; padding: 8px; margin: 8px 0; "></div>

  


    <!-- 积分统计 -->
    <!-- <div class="text-center mb-4">
      <h1 class="text-2xl font-bold text-gray-800">总分红: {{ jifen }}</h1>
      <p class="text-sm text-gray-500">分销商数量: {{ rewardCount }}</p>
    </div> -->

   

  
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import https from '@/utils/request.js'
import dayjs from 'dayjs'

const inviteLogs = ref([])
const jifen = ref(0)
const rewardCount = ref(0)
const nextPageUrl = ref(null)
const prevPageUrl = ref(null)

import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const downloadPic = () => {
 alert('不要在微信中下载，在浏览器中下载，用此图再添加上自己的推荐码')

  window.location.href = '/download/tuijian2.jpg'
}


onMounted(() => {
  fetchLogs('/api/minsubaojie/my_invite_logs/?page=1')
})

const fetchLogs = async (url) => {
  if (!url) return
  try {
    const res = await https.get(url)
    inviteLogs.value = res.results.invite_logs
    jifen.value = res.results.user_info.invite_points
    rewardCount.value = res.results.user_info.invite_reward_count
    nextPageUrl.value = res.next
    prevPageUrl.value = res.previous
  } catch (e) {
    console.error('加载失败', e)
  }
}

const formatTime = (val) => dayjs(val).format('YYYY-MM-DD HH:mm')
const statusText = (val) => ({ pending: '待验证', validated: '已验证', rewarded: '已奖励' }[val] || '未知')
const rewardText = (val) => ({ points: '积分', coupon: '优惠券', cash: '现金' }[val] || '无')
</script>
