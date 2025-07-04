
<template>
    <van-nav-bar title="小萝卜家政帮助文档" left-text="返回" @click="router.go(-1);" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
  
  
  
  
  
  
  
  </template>
  
  <script setup>
  
  // import config from '@/global.config.js'
  // import md5 from 'js-md5'
  // // import apiFun from '@/utils/api.js'
  // import https from '@/utils/request.js';

  // import { showToast, showDialog } from 'vant';
  // import { ref, onMounted, computed, watch  } from 'vue';
  

  import { useRouter,useRoute } from 'vue-router'
  
  
  const router = useRouter()
  const route = useRoute()

 

  
  </script>
  
  
  <style scoped>
  
  </style>