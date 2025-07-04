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
    <h2 class="text-lg font-bold px-3 pt-0 mb-1">渠道商工作区</h2>
    <div class="flex justify-between items-center mb-0 px-2 py-0 text-sm text-gray-400">
      渠道商工作内容是发展分销商，比如开发小区的一个商店，大学门口的一家超市，这些分销商（商店）再负责最终推广到业主
    </div>

    <div style="background-color: #f7f7f7; padding: 8px; margin: 8px 0; "></div>


    <!-- <van-cell class="py-0" style="  display: flex; font-size: small;  font-weight: bold;" title="渠道商工作区" /> -->
    
    <van-row class="py-0 my-0">
      <van-col  style="display: flex;align-items: center; justify-content: center;" span="12">
        <van-cell title="成为区域经销商" @click=" router.push({ path: '/be_marketer' }) " icon="manager-o" /></van-col>

      <van-col style="display: flex;align-items: center; justify-content: center;" span="12">
        <van-cell title="查看协议" @click=" router.push({ path: '/saleman_protoc' }) " icon="manager-o" /></van-col>

    </van-row>


    <van-row class="py-0 my-0">
      <van-col  style="display: flex;align-items: center; justify-content: center;" span="12">
        <van-cell title="我的邀请码" @click=" router.push({ path: '/invite' }) " icon="manager-o" /></van-col>

      <van-col style="display: flex;align-items: center; justify-content: center;" span="12">
        <van-cell title="查看分红" @click=" router.push({ path: '/marketer_fenhong' }) " icon="manager-o" /></van-col>

    </van-row>

    <div style="background-color: #f7f7f7; padding: 8px; margin: 8px 0; "></div>

  


    <!-- 积分统计 -->
    <!-- <div class="text-center mb-4">
      <h1 class="text-2xl font-bold text-gray-800">总积分: {{ jifen }}</h1>
      <p class="text-sm text-gray-500">分销商数量: {{ rewardCount }}</p>
    </div> -->

 

  
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import dayjs from 'dayjs'

const inviteLogs = ref([])
const jifen = ref(0)
const rewardCount = ref(0)
const nextPageUrl = ref(null)
const prevPageUrl = ref(null)

import https from '@/utils/request.js'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()


onMounted(() => {
 // fetchLogs('/api/minsubaojie/my_invite_logs/?page=1')
})

// 获取总积分
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
