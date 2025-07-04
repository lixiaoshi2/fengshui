<template>
   <div>
        <van-field v-model="fieldValue" 
            is-link 
            readonly 
            label="所在城市" 
            placeholder="选择城市" 
            @click="showPicker = true" />
        <van-popup v-model:show="showPicker" round position="bottom">
            <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm"  />
        </van-popup>

    </div>

</template>

<script setup>
import { ref, onMounted, computed,reactive } from 'vue';
import config from '@/global.config.js'
    const columns = config.city  //这里的columns是所有的城市列表，备选的城市，这里选择以后城市将保存在浏览器里
    const fieldValue = ref('');
    const showPicker = ref(false);

    const onConfirm = ({ selectedOptions }) => {
      showPicker.value = false;
      fieldValue.value = selectedOptions[0].value;
      localStorage.setItem("city",fieldValue.value);
      console.log(fieldValue.value)
    };

    onMounted(() => {
        fieldValue.value =  localStorage.getItem("city")
    })

</script>

<style>

</style>