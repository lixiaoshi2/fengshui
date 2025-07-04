
<template>
  <van-nav-bar title="文档" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>


  <van-cell >
  <!-- 使用 title 插槽来自定义标题 -->
  <template #title>
    <span style="font-size: 16px; width:40%; font-weight: bold;" class="custom-title"> {{ title }}</span>
  </template>
</van-cell>



<div class="wrapper" style=" padding: 10px;margin-bottom: 0px; font-size: 15px;">
<div id="id" style="width: 100%" v-html="content"></div>

</div>

<!-- <div class="wrapper" style="display: flex; padding: 10px;margin-top:20px; margin-bottom:60px;  color: chocolate; font-size: 13px;">
<div style="flex:  0 0 80%;">
  申明：本网的信息由信息发布者提供，信息的合法性和真实性由信息发布者负责，请自行辨别信息真伪，并谨慎决策！
</div>
<div style="flex:  0 0 25%; color: chocolate;margin-right:8px; ">
    <van-button style="width:80%" type="danger"  size="media" @click="handleClick">举报</van-button>
</div>

</div> -->


</template>

<script setup>
import axios from 'axios';
import config from '@/global.config.js'
import md5 from 'js-md5'
// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';
import funcs from '@/utils/common_func.js';

import { showToast, showDialog } from 'vant';
import { ref, onMounted, computed,reactive } from 'vue';

import { useRouter,useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const router = useRouter()
const route = useRoute()
const news_id = ref('')
const retdata2= ref({})
// const category_url = ref('')
// var userinfo = ref()
var title= ref('');
var owner= ref('');
var phone= ref('');
var phone2= ref('');
var email= ref('');
var weixin= ref('');
var addr= ref('');
var weizhizhi= ref('');
var detail= ref('');
var city = ref('')
var state = ref('')
const city2= ref('')
// import Editor from '@tinymce/tinymce-vue'
let content = ref('')
let content_id = ref('')
const categories = config.category

const phoneClick = (phone)=>{
  var callUrl = "tel:" + encodeURIComponent(phone);

 window.location.href = callUrl;
}

// const toCategoryList = () =>{
  
//   const url = category_url.value + '/'
//   // console.log('233',url)
//   router.push(category_url.value)
//   // router.push('news_list')
// }




/////////// ------------- 这段代码是获取页面的网址并复制到剪切板
const message = ref('');
const messageColor = ref('black');

const copyUrl = () => {
  const currentUrl = window.location.href;

  // 创建一个临时的 textarea 元素
  const textarea = document.createElement('textarea');
  textarea.value = currentUrl;
  document.body.appendChild(textarea);
  
  // 选择并复制文本
  textarea.select();
  try {
    document.execCommand('copy');
    // message.value = `页面地址已复制到剪贴板：${currentUrl}`;
    message.value = `页面地址已复制到剪贴板，您可以粘贴到其他APP`;
    messageColor.value = 'green';
  } catch (err) {
    console.error('无法复制到剪贴板', err);
    message.value = '无法复制到剪贴板';
    messageColor.value = 'red';
  }
  
  // 移除临时的 textarea 元素
  document.body.removeChild(textarea);
};



onMounted(() => {

// const user_id = localStorage.getItem("user_id");

 console.log('asasdfsad')
  // news_id.value = route.query.id;  // 这个模式是从？id=89 中获取参数
  news_id.value = route.params.id;  // 这个是从 /89 中获取参数
  
  console.log('news_id', news_id)

  https.get(('/api/news/detail/'+news_id.value+'/')).then(response => {
  // https.get(('/api/news/news/2/')).then(response => {
    console.log('asdfas555111');
    console.log(response);
    // if (response)
    retdata2.value = response;
    title.value = retdata2.value.title
   
    content.value = retdata2.value.content
    // for (const item of listdata2.value) {
    //     console.log('hello', item.content)
    //  }
    // console.log('访问的服务器协议',window.location.protocol)
    // if (window.location.protocol == "http:"){
    //   console.log('访问的协议是http')

    // }else{
    //   console.log('访问的协议是https,此时需要将http协议，将图片地址换成')
    //   content.value = content.value.replace(/http:\/\/192\.168\.1\.127:8000\//g, "https://www.nearnet.ca/api/");
    // }

    if (window.location.protocol == "http:"){
      console.log('访问的协议是http')
     
      
    }else{
      content.value  =  content.value .split(config.backendserver1).join(config.backendserver2)
      // console.log('response222',response)
    }


    // funcs.getUrlIp()

    if (city.value=='Toronto'){
      console.log('alsdfl来到toronto')
      city2.value='多伦多'
    }
    else if(city.value =='Vancouver'){
      console.log('as来到了温哥华d')
      city2.value='温哥华'
    }

    useHead({
      title: `${title.value} | 加拿大邻家网`,
      meta: [
        {
          name: 'description',
          content: title.value,
        },
        {
          name: 'keywords',
          content: `加拿大，${city.value},${city2.value},您附近,高性价比,家庭厨房`,
        },
      ],
    });


  }).catch(error => {
    console.log('访问民宿详情出错了');
    showDialog({message:'您的访问次数过多，请一分钟后再访问'})
    // alert('您的访问次数过多，请一分钟后再访问')
    console.error(error);
    // showToast('请重新登录');
  });

});



</script>


<style scoped>
 :deep(img) {
  max-width: 100%; /* 图片最大宽度为父元素宽度的100% */
  height: auto; /* 高度自动调整，保持宽高比 */
}

:deep(.van-cell__value) {
    position: relative;
    overflow: hidden;
    color: #140114;
    text-align: left;
    font-size: 18px;
    vertical-align: middle;
    word-wrap: break-word;
}
:deep(p){
  line-height: 35px;
}

</style>