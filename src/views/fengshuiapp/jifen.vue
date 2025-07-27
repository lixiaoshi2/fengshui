<template>
  <van-nav-bar title="您的积分" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
    <template #title>
      <label class="block text-lg font-medium text-gray-700">萝卜家政</label>
    </template>
  </van-nav-bar>

  <div>
    <h2 class="text-lg font-bold px-3 pt-3">我的邀请记录和积分政策( <span class="text-sm text-red-500">积分政策只针对风水预测</span> )</h2>
    <div class="flex justify-between items-center mb-3 p-3 text-sm text-gray-400">
      被推荐人消费以后，才能增加积分。 <br>
       第一次消费，老客户可以获得50的积分，新客户可以获取50积分，积分可用于风水咨询。  <br>
        vip客户推广的客户每次消费，都可获取50积分，还以兑换现金。
    </div>

    <!-- 积分统计 -->
    <div class="text-center mb-4">
      <!-- <h1 class="text-2xl font-bold text-gray-800">积分: {{ jifen }}</h1> -->
      <!-- <p class="text-sm text-gray-500">奖励次数: {{ rewardCount }}</p> -->
    </div>

    <!-- 列表 -->
    <div class="p-4" v-if="inviteLogs.length === 0">暂无记录</div>
    <table v-else class="table-auto w-full text-sm">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-2 py-1">被推荐人</th>
          <th class="px-2 py-1">状态</th>
          <th class="px-2 py-1">id</th>
          <th class="px-2 py-1">分数</th>
          <th class="px-2 py-1">推荐时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in inviteLogs" :key="log.id" class="border-b">
          <td class="px-2 py-1">{{ log.invitee_name }}</td>
          <td class="px-2 py-1">{{ statusText(log.status) }}</td>
          <td class="px-2 py-1">{{ log.invitee_id }}</td>
          <td class="px-2 py-1">{{ log.score }}</td>
          <td class="px-2 py-1">{{ formatTime(log.created_at) }}</td>
        </tr>
      </tbody>
    </table>

    <!-- 分页 -->
    <div class="flex justify-center space-x-4 mt-4">
      <button
        @click="fetchLogs(prevPageUrl)"
        :disabled="!prevPageUrl"
        class="text-sm px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        上一页
      </button>
      <button
        @click="fetchLogs(nextPageUrl)"
        :disabled="!nextPageUrl"
        class="text-sm  px-2 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        下一页
      </button>
    </div>
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


onMounted(() => {
  fetchLogs('/api/fengshui/my_invite_logs/?page=1')
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
