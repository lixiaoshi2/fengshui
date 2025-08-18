<template>
  <div class="max-w-2xl mx-auto px1 py-4">
    <!-- 顶部导航栏 -->
    <div class="flex items-center justify-center border-b pb-3">
      <p class="text-lg font-semibold">联系我们</p>
    </div>

    <div class="bg-white shadow-md rounded-2xl p-2 space-y-0 max-w-xl mx-auto">
      <!-- 邮箱 -->
      <a href="mailto:Sunnydu1212@hotmail.com" 
         class="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition">
        <div class="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full">
          📧
        </div>
        <div class="py-4 mb-2">
          <p class="text-sm  font-semibold  text-gray-900">电子邮件</p>
          <p class="py-2 text-gray-600 text-sm">Sunnydu1212@hotmail.com</p>
          <p class="text-gray-600 text-sm">lixiaoshi101@gmail.com</p>
        </div>
      </a>

      <!-- 微信 -->
      <div class="flex items-start space-x-3 p-2 rounded-lg transition">
        <div class="flex items-center justify-center w-10 h-10 bg-green-100 text-green-600 rounded-full">
          💬
        </div>
        <div class="py-4">
          <p class="text-sm font-semibold text-gray-900 ">微信</p>
          <p class="py-2 text-gray-600 text-sm cursor-pointer hover:text-green-600" @click="copyWechat('Duyao12121212')">
            Duyao12121212
          </p>
          <p class="text-gray-600 text-sm cursor-pointer hover:text-green-600" @click="copyWechat('13769181917')">
            13769181917
          </p>
        </div>
      </div>

      <!-- 电话 -->
      <a href="tel:+16473232111" 
         class="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition">
        <div class="flex items-center justify-center w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full">
          ☎️
        </div>
        <div class="p-2">
          <p class="text-sm font-semibold text-gray-900">电话</p>
          <p  class="py-2 text-gray-600 text-sm">+16473232111</p>
          <p class="text-gray-600 text-sm">+14373406137</p>
        </div>
      </a>
    </div>
  </div>
</template>


<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const copyWechat = (account) => {
  // 先尝试现代 Clipboard API（需 HTTPS 或 localhost）
  if (typeof navigator !== 'undefined' &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === 'function') {
    navigator.clipboard.writeText(account)
      .then(() => alert(`微信号 ${account} 已复制，请前往微信添加好友。`))
      .catch(() => fallbackCopy(account))
  } else {
    // 不支持时走回退
    fallbackCopy(account)
  }
}

function fallbackCopy(text) {
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.top = '-9999px'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    if (ok) {
      alert(`微信号 ${text} 已复制，请前往微信添加好友。`)
    } else {
      alert(`复制失败，请手动复制：${text}`)
    }
  } catch (e) {
    alert(`复制失败，请手动复制：${text}`)
  }
}
</script>
