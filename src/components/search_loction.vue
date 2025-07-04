<template>
    <!-- <weizhi v-model:fieldValue="weizhizhi" ref="weizhiref" ></weizhi> -->

    <div>
        <van-field v-model="fieldValue" 
            is-link 
            readonly 
            label="所在城市" 
            placeholder="选择城市" 
            @click="showPicker = true" />
        <van-popup v-model:show="showPicker" round position="bottom">
            <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
        </van-popup>

    </div>
    <van-field v-model="text" placeholder="请输入要查询的位置" @click="$router.push('/search_page')" />


</template>
     
<script setup>
import { ref, watch, onMounted, defineEmits, defineProps } from 'vue';
import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
// import weizhi  from '@/components/weizhi.vue'
var weizhizhi= ref('');
const columns = [
      { text: '多伦多', value: 'Toronto' },
      { text: '温哥华', value: 'Vancouver' },
      { text: '温州', value: 'Wenzhou' },
      { text: '绍兴', value: 'Shaoxing' },
      { text: '湖州', value: 'Huzhou' },
    ];
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
     
<style></style>