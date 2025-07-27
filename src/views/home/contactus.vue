<template>
    <div class="my-container">
       <!-- <van-nav-bar @click="router.go(-1);" left-text="返回"  > -->  
       <van-nav-bar  >
        
        <template #title>
          <p >联系我们</p>
          
        </template>
        
        </van-nav-bar>
    
     
    <van-space :size="20"></van-space>
    
    
    <van-space :size="20"></van-space>
       
    <van-cell style="  display: flex; font-size: small; font-weight: bold;" title="联系方式" />
    <van-row> 
      <van-col style="display: flex;align-items: center; justify-content: center;" span="24"> 
      <van-cell  title="电子邮件：Sunnydu1212@hotmail.com, lixiaoshi101@gmail.com"    />
    </van-col>
      
    <van-col style="display: flex;align-items: center; justify-content: center;" span="24"> 
      <van-cell  title="微信：Duyao12121212, 13769181917"  /></van-col>
      
    <van-col style="display: flex;align-items: center; justify-content: center;" span="24"> 
      <van-cell  title="电话：6473232111,  4373406137 "  /></van-col>
    
    </van-row>
    
    
    
    <van-space :size="20"></van-space>
    <!-- <van-cell style="  display: flex; font-size: small; font-weight: bold;" title="帮助文档" /> -->
    
    <van-row> 
      <!-- <van-col  @click=" router.push({ path: '/news_detail/2' }) " span="24"> <van-cell style="" title="如何发布黄页"   icon="peer-pay" /></van-col> -->
      <!-- <van-col @click=" router.push({ path: '/getservice' }) " style="display: flex;align-items: center; justify-content: center;" span="24"> <van-cell  title="小萝卜家政平台介绍"  icon="manager-o" /></van-col>
      <van-col @click=" router.push({ path: '/help_regist' }) " style="display: flex;align-items: center; justify-content: center;" span="24"> <van-cell  title="小萝卜家政用户注册及功能介绍"  icon="manager-o" /></van-col>
      <van-col @click=" router.push({ path: '/minsutuoguan' }) " style="display: flex;align-items: center; justify-content: center;" span="24"> <van-cell  title="民宿信息托管业务帮助，联系方式同上"  icon="manager-o" /></van-col>
      <van-col @click=" router.push({ path: '/tuiguangziliao' }) " style="display: flex;align-items: center; justify-content: center;" span="24"> <van-cell  title="推广资料"  icon="manager-o" /></van-col>
       -->
    
    </van-row>
    
   
    

    
    <van-space :size="20"></van-space>
    
    
    
    </div>
    </template>
    
  
  
  <script setup>
  



  import { useRouter,useRoute } from 'vue-router'
  const router = useRouter()
  const route = useRoute()
  


  
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
  
  
  
  