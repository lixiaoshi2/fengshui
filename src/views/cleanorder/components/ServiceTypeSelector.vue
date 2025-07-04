<template>
    <div>
      <div class="grid grid-cols-3 gap-4">
        <label class="flex items-center" v-for="(price, type) in servicePrices" :key="type">
          <input
            type="radio"
            name="cleantype"
            :value="type"
            v-model="selectedType"
            class="text-blue-600 focus:ring-blue-500"
          />
          <span class="ml-2 text-gray-700 text-sm">{{ type }}</span>
        </label>
      </div>
  
      <p class="text-gray-900 mt-4">当前服务类型：<strong>{{ selectedType }}</strong></p>
  
      <div class="mt-2">
        <p class="text-gray-700">平台收取费用：<strong>{{ servicePrice }}</strong> 元</p>
        <p class="text-gray-700">提供：<strong>{{ contactCount }}</strong> 人联系方式</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  
  const props = defineProps({
    modelValue: String, // 接收 v-model 传入的值
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const selectedType = ref(props.modelValue)
  
  // 同步 v-model 数据
  watch(() => props.modelValue, (newVal) => {
    selectedType.value = newVal
  })
  
  watch(selectedType, (newVal) => {
    emit('update:modelValue', newVal)
  })
  
  const servicePrices = {
    '民宿保洁': 100,
    '保洁做饭': 100,
    '单独保洁': 100,
    '老病护理': 100,
    '孩子照顾': 100,
    '月子护理': 100,
    '邻里互助': 20,
    '专业保洁': 20,
    '水电维修': 20,
    '防水堵漏': 20,
    '家电维修': 20,
    '装修相关': 100,
    '其他简单': 20
  }
  
  const servicePrice = computed(() => servicePrices[selectedType.value] || 0)
  
  const contactCount = computed(() => {
    const price = servicePrice.value
    if (price === 100) return 3
    if (price === 20) return 1
    return 0
  })
  </script>
  