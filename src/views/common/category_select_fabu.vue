<template>
    <!-- <weizhi v-model:fieldValue="weizhizhi" ref="weizhiref" ></weizhi> -->
    <van-nav-bar title="邻家网 - 分类选择" left-text="返回" @click=" this.$router.go(-1);" left-arrow>
        <template #right>
        <van-icon name="search" size="18" />
        </template>
    </van-nav-bar>
    
   
    <!-- <van-field v-model="text" label="全站查找" placeholder="请输入要查询的关键字" /> -->
    
   
    <category2></category2>

</template>
     
<script setup>
import { ref, watch, onMounted, defineEmits, defineProps } from 'vue';
import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
import category2  from '@/components/category2.vue' 

onMounted(() => {
    // fieldValue.value =  localStorage.getItem("city")
})


</script>
     
<style>

</style>