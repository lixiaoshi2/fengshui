<template>
  <van-nav-bar title="帮助资料" left-text="返回" @click-left="router.go(-1)" left-arrow>
    <template #right>
      <van-icon name="question-o" size="18" />
    </template>
  </van-nav-bar>

 <div class="p-4">
    <h1 class="text-lg font-bold mb-4">帮助资料</h1>

    <!-- 内部跳转 -->
    <div class="mb-4">
      <a href="/getservice" class="block p-4 bg-gray-100 rounded hover:bg-gray-200 transition">
        小萝卜家政平台介绍
      </a>
    </div>

    <!-- 视频按钮 -->
    <div v-for="(item, index) in videoList" :key="index" class="mb-3">
      <button
        class="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
        @click="copyLink(item.url)"
      >
        {{ item.title }}
      </button>
    </div>

    <!-- 弹窗：复制失败手动复制 -->
    <div
      v-if="showDialog"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white rounded p-6 w-11/12 max-w-md">
        <h2 class="text-lg font-semibold mb-2">复制失败，请手动复制链接</h2>
        <p class="break-all text-sm bg-gray-100 p-2 rounded">{{ currentUrl }}</p>
        <div class="text-right mt-4">
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            @click="showDialog = false"
          >
            知道了
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()
const route = useRoute()
const videoList = [
  {
    title: '用户注册及App安装视频',
    url: 'https://www.xiaohongshu.com/explore/68462e7b000000002300c1de?xsec_token=YB3nZdIbXWTcvbwxqINXTyO_NVKA1xtYtrEChD_3dKaFE%3D',
  },
  {
    title: '雇主填写信息及查找商家视频',
    url: 'https://www.xiaohongshu.com/explore/684630960000000023016e28?xsec_token=YB3nZdIbXWTcvbwxqINXTyO4ML7vKEE629ZwzKxLwgnH8%3D&xsec_source=pc_creatormng',
  },
  {
    title: '家政人员入驻及接单视频',
    url: 'https://www.xiaohongshu.com/explore/684630960000000023016e28?xsec_token=xxx',
  },
  {
    title: '社区分销商工作视频',
    url: 'https://www.xiaohongshu.com/explore/684638550000000023000041?xsec_token=xxx',
  },
]

const showDialog = ref(false)
const currentUrl = ref('')

const copyLink = (url) => {
  const textarea = document.createElement('textarea')
  textarea.value = url
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()

  try {
    const success = document.execCommand('copy')
    if (success) {
      alert('链接已复制，请粘贴到浏览器中打开')
    } else {
      currentUrl.value = url
      showDialog.value = true
    }
  } catch (err) {
    currentUrl.value = url
    showDialog.value = true
  }

  document.body.removeChild(textarea)
}
</script>
