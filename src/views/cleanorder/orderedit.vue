<template>
 
<div class="p-6 mb-10 max-w-2xl mx-auto">
    <h2 class="text-xl font-bold mb-4">编辑订单信息</h2>

    <!-- 房屋地址 -->
    <label class="block mb-2">房屋地址：</label>
    <input
      readonly
      v-model="houseaddr"
      class="w-full p-2 border rounded-md mb-4"
    />

    <!-- 城市 -->
    <label class="block mb-2">城市：</label>
    <input
      readonly
      v-model="city"
      class="w-full p-2 border rounded-md mb-4"
    />

    <!-- 服务类型 -->
    <div class="mb-4">
      <label class="block text-lg font-medium mb-2">
        服务类型：<span class="text-sm text-gray-400">(如已缴费，请选择相同价位，专业保洁前都是一般保洁，其他都是专业性的工作，结果只分两大类)</span>
      </label>
      <div class="grid grid-cols-3 gap-4">
        <label
          class="flex items-center"
          v-for="(price, type) in servicePrices"
          :key="type"
        >
          <input
            type="radio"
            name="cleantype"
            :value="type"
            v-model="cleantype"
            class="text-blue-600 focus:ring-blue-500"
          />
          <span class="ml-2 text-gray-700 text-sm">{{ type }}</span>
        </label>
      </div>

      <p class="text-gray-900 mt-4">
        当前服务类型：<strong>{{ cleantype }}</strong>
      </p>
      <p class="text-gray-700 mt-2">
        平台收取费用：<strong>{{ servicePrice }}</strong> 元
      </p>
      <p class="text-gray-700">
        提供：<strong>{{ contactCount }}</strong> 人的联系方式
      </p>
    </div>

    <!-- 联系人姓名 -->
    <label class="block mb-2">联系人姓名：</label>
    <input
      v-model="contact_name"
      class="w-full p-2 border rounded-md mb-4"
      placeholder="请输入姓名"
    />

    <!-- 联系电话 -->
    <label class="block mb-2">联系电话：</label>
    <input
      v-model="contact_phone"
      class="w-full p-2 border rounded-md mb-4"
      placeholder="请输入电话"
    />

    <!-- 备注 -->
    <label class="block mb-2">备注（最多1200字）：</label>
    <textarea
      v-model="beizhu"
      rows="4"
      maxlength="1200"
      class="w-full p-2 border rounded-md mb-1"
      placeholder="请输入备注内容"
    ></textarea>
    <div class="text-right text-sm text-gray-500">
      {{ beizhu.length }}/1200 字
    </div>

    <!-- 保存按钮 -->
    <div class="flex justify-end mt-6">
      <button
        @click="saveOrder"
        :disabled="saving"
        class="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
      >
        {{ saving ? '保存中...' : '保存' }}
      </button>
    </div>
  </div>



</template>

<script setup>
import config from '@/global.config.js'

// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';

import { showToast, showDialog } from 'vant';
import { ref, onMounted, computed, watch  } from 'vue';

import { useRouter,useRoute } from 'vue-router'


const router = useRouter()
const route = useRoute()

// 表单字段变量
const id = ref(null)
const houseaddr = ref('')
const city = ref('')
const cleantype = ref('一般保洁')
const contact_name = ref('')
const contact_phone = ref('')
const beizhu = ref('')
const saving = ref(false)

// 动态计算价格 & 联系人数

const servicePrices = config.servicePrices
const servicePrice = computed(() => servicePrices[cleantype.value] || 0)

const contactCount = computed(() => {
  const price = servicePrice.value
  if (price === 100) return 3
  if (price === 30) return 1
  return 0
})

// 拉取订单详情
const fetchOrder = async () => {
  try {
    const orderId = route.params.orderid
    const res = await https.get(`/api/minsubaojie/orders/${orderId}/`)
    id.value = orderId
    houseaddr.value = res.houseaddr
    city.value = res.city
    cleantype.value = res.cleantype
    contact_name.value = res.contact_name
    contact_phone.value = res.contact_phone
    beizhu.value = res.beizhu || ''
  } catch (error) {
    alert('获取订单失败')
  }
}

onMounted(fetchOrder)

// 保存更新
const saveOrder = async () => {
  console.log("baocun")
  try {
    // await https.put(`/api/minsubaojie/updateOrder/${id.value}/`, {
    await https.put(`/api/minsubaojie/orders/${id.value}/`, {
      cleantype: cleantype.value,
      contact_name: contact_name.value,
      contact_phone: contact_phone.value,
      beizhu: beizhu.value,
    })
    alert('保存成功')
    router.back()
  } catch (e) {
    alert('保存失败')
  } finally {
    saving.value = false
  }
}


</script>

<style scoped>
/* 你可以放 Tailwind，也可以写自定义样式 */
</style>
