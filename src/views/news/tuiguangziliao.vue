<template>
    <div class="my-container">
       <!-- <van-nav-bar @click="router.go(-1);" left-text="返回"  > -->  
       <van-nav-bar  >
        
        <template #title>
          <p >推广资料</p>
          
        </template>
        
        </van-nav-bar>
    
     
    <van-space :size="20"></van-space>
    
    
    <van-space :size="20"></van-space>
       
    <van-cell style="  display: flex; font-size: small; font-weight: bold;" title="推广图" />
    <van-row>
      <van-col
        span="12"
        style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
        <img
          :src="'/download/tuiguang.jpg'"
          @click="previewImage(0)"
          class="w-24 h-24 object-cover cursor-pointer rounded shadow-md"
        />
        <a :href="'/download/tuiguang.jpg'" download class="text-blue-500 text-sm mt-2">下载1</a>
      </van-col>
      <van-col
        span="12"
        style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
        <img
          :src="'/download/tuijian2.jpg'"
          @click="previewImage(1)"
          class="w-24 h-24 object-cover cursor-pointer rounded shadow-md"
        />
        <a :href="'/download/tuijian2.jpg'" download class="text-blue-500 text-sm mt-2">下载2</a>
      </van-col>

     
    </van-row>
    
    
    
    <van-space :size="20"></van-space>
    <van-cell style="  display: flex; font-size: small; font-weight: bold;" title="帮助文档" />
    
    <van-row> 
      <!-- <van-col  @click=" router.push({ path: '/news_detail/2' }) " span="24"> <van-cell style="" title="如何发布黄页"   icon="peer-pay" /></van-col> -->
     
    
    </van-row>
    
   
    

    
    <van-space :size="20"></van-space>
    
    
    
    </div>
    </template>
    
  
  
  <script setup>
  

import { showImagePreview } from 'vant'



  import { useRouter,useRoute } from 'vue-router'
  const router = useRouter()
  const route = useRoute()
  
const images = [
  '/download/tuiguang.jpg',
  '/download/tuijian2.jpg',

]

const previewImage = (index) => {
  showImagePreview({
    images,
    startPosition: index,
  })
}

  
  </script>
  
  

  
  
  <style scoped>
  .my-container{
    background-color:#F4F2F2 ;
    margin-bottom: 50px;
  }
  .van-cell__title{
    padding-left: -20px;
  }
  </style>
  
  
  
  