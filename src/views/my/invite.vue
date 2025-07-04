<template>
   <van-nav-bar title="萝卜保洁" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
    <template #title>
      <label class="block text-lg font-medium text-gray-700">萝卜家政</label>
    </template>
  </van-nav-bar>
    <div class="p-4 space-y-4 text-sm text-gray-600">
      <div>我的邀请码：<strong>{{ inviteCode }}</strong></div>
      <div>我的推荐链接：</div>
      <input
        type="text"
        class="w-full p-2 border rounded"
        v-model="inviteLink"
        readonly
      />
  
      <button @click="copyLink" class="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
        复制推荐链接
      </button>
  
      <div class="mt-4">
        <div>推荐二维码：</div>
        <canvas ref="canvasRef"></canvas>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import QRCode from 'qrcode'
  import https from '@/utils/request.js';

  import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
  
  const inviteCode = ref('')        // 从后端接口获取
  const inviteLink = ref('')        // 后端生成好的链接
  const canvasRef = ref(null)
  


const getInvite = async () => {
    
    const res = await https.get(`/api/user/getinvite/`)
    const data = res
    console.log('res',data)
    return data
}

onMounted(async () => {

    // 假设你已通过 API 拿到用户数据
    // const res = getInvite();
    
    const res = await https.get(`/api/user/getinvite/`)
    const data = res
    console.log('res',data)


    inviteCode.value = res.invite_code
    inviteLink.value = res.invite_link

    // 生成二维码
    await QRCode.toCanvas(canvasRef.value, inviteLink.value, {
        width: 200,
        margin: 2
    })
})

const copyLink = async () => {
    try {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(inviteLink.value)
            alert('复制成功！')
        } else {
            // fallback 方式（兼容旧浏览器）
            const input = document.createElement('input')
            input.value = inviteLink.value
            document.body.appendChild(input)
            input.select()
            document.execCommand('copy')
            document.body.removeChild(input)
            alert('复制成功！')
        }
    } catch (err) {
        console.error('复制失败：', err)
        alert('复制失败，请手动复制')
    }
}



  </script>
  