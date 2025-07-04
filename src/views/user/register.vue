<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">用户注册</h2>

      <form @submit.prevent="submitRegister" class="space-y-4">
        <!-- 用户名 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
          <input v-model="username" type="text" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
        </div>

        <!-- 手机号 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">手机号</label>
          <input v-model="phone" type="tel" required pattern="^1[3-9]\\d{9}$" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
        </div>

        <!-- 密码 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
          <input v-model="password" type="password" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
        </div>

        <!-- 确认密码 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">确认密码</label>
          <input v-model="confirmPassword" type="password" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
        </div>

        <!-- 提交按钮 -->
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          注册
        </button>

        <!-- 错误提示 -->
        <p v-if="error" class="text-red-600 text-sm text-center mt-2">{{ error }}</p>
        <p v-if="success" class="text-green-600 text-sm text-center mt-2">{{ success }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import https from '@/utils/request.js' // 替换为你项目的请求工具

const username = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')

const submitRegister = async () => {
  error.value = ''
  success.value = ''

  if (password.value !== confirmPassword.value) {
    error.value = '两次密码不一致'
    return
  }

  try {
    const res = await https.post('/api/register/', {
      username: username.value,
      phone: phone.value,
      password: password.value,
    })
    success.value = '注册成功！请登录'
  } catch (err) {
    error.value = err.response?.data?.detail || '注册失败，请稍后再试'
  }
}
</script>
