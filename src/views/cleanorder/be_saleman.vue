<template>
  <van-nav-bar title="萝卜保洁" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #title>
      <label class="block text-lg font-medium text-gray-700">萝卜家政</label>
    </template>
  </van-nav-bar>

  <div class="p-4">
    <h2 class="text-lg font-bold">申请成为分销商（销售代表）</h2>
    <p class="text-sm text-gray-500 mb-3">成为分销商可获得周边订单提成，需填写完整资料并同意佣金协议。</p>

    <form @submit.prevent="submitForm" class="space-y-3">
      <van-cell-group inset>
        <van-field v-model="form.dealer_name" label="经销商名称" placeholder="必填" />
        <van-field v-model="form.dealer_weixin" label="微信号" />
        <van-field v-model="form.dealer_shouji" label="手机号" />
        <van-field v-model="form.dealer_id_number" label="身份证或统一代码" />
        <van-field v-model="form.bank_account_name" label="开户人名称" />
        <van-field v-model="form.bank_account_number" label="银行卡号" />
        <van-field v-model="form.bank_name" label="开户行名称" placeholder="精确到支行" />
      </van-cell-group>

      <div class="flex items-start mt-2">
        <input v-model="form.agreement_accepted" id="agreement" type="checkbox" required class="mt-1 h-4 w-4" />
        <label for="agreement" class="ml-2 text-sm text-gray-700">
          我已阅读并同意 <a href="/agreement" class="text-blue-600 underline">《渠道商佣金协议》</a>
        </label>
      </div>

      <van-button block round type="primary" native-type="submit" :loading="loading">
        {{ isAgent ? '保存修改' : '立即申请' }}
      </van-button>

      <div v-if="message" class="text-green-600 mt-2 text-sm">{{ message }}</div>
      <div v-if="error" class="text-red-600 mt-2 text-sm">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import https from '@/utils/request'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const isAgent = ref(false)
const message = ref('')
const error = ref('')

const form = ref({
  dealer_name: '',
  dealer_weixin: '',
  dealer_shouji: '',
  dealer_id_number: '',
  bank_account_name: '',
  bank_account_number: '',
  bank_name: '',
  agreement_accepted: false
})

const fetchSalesInfo = async () => {
  try {
    const res = await https.get('/api/minsubaojie/become-saler/')
    if (res.is_agent) {
      isAgent.value = true
      Object.assign(form.value, res.data)
    } else {
      isAgent.value = false
    }
  } catch (err) {
    error.value = '加载销售信息失败'
  }
}

const submitForm = async () => {
  loading.value = true
  error.value = ''
  message.value = ''

  try {
    const res = await https.post('/api/minsubaojie/become-saler/', form.value)
    message.value = res.message
  } catch (err) {
    error.value = err.response?.data?.message || '提交失败'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchSalesInfo()
})
</script>
