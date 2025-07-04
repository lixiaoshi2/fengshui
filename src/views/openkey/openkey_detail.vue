
<template>
  <van-nav-bar title="开锁配钥匙服务" left-text="返回" @click="router.go(-1);" left-arrow>
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

<div class="wrapper" style="padding: 10px;margin-bottom: 0px; font-size: 13px;">
<van-row style="margin-bottom: 10px;"> 
  <div style="display: flex; width: 100%;font-size: medium;color: rgb(133, 130, 130);"> 
      <div style="width:30%">联  系  人</div>
      <div style="width:50%">{{ owner }}</div>
    </div>
  </van-row>

 
  <van-row style="margin-bottom: 10px;"> 
    <div class="" style="display: flex; width: 100%;font-size: medium;color: rgb(133, 130, 130);"> 
      <div style="width:30%">联系电话</div>
      <div style="width:50%">{{ phone }}</div>
    </div>
  </van-row>
  <van-row style="margin-bottom: 10px;"> 
    <div style="display: flex; width: 100%;font-size: medium;color: rgb(133, 130, 130);">  
      <div style="width:30%">备用电话</div>
      <div style="width:50%">{{ phone2 }}</div>
    </div>
  </van-row>
  <van-row style="margin-bottom: 10px;"> 
    <div style="display: flex; width: 100%;font-size: medium;color: rgb(133, 130, 130);"> 
      <div style="width:30%">电子邮件</div>
      <div style="width:50%">{{ email }}</div>
    </div>
  </van-row>
  <van-row style="margin-bottom: 10px;"> 
    <div style="display: flex; width: 100%;font-size: medium;color: rgb(133, 130, 130);"> 
      <div style="width:30%">商家微信</div>
      <div style="width:50%">{{ weixin }}</div>
    </div>
  </van-row>
  <van-row style="margin-bottom: 10px;"> 
    <div style="display: flex; width: 100%;font-size: medium;color: rgb(133, 130, 130);"> 
      <div style="width:30%">商家地址</div>
      <div style="width:70%">{{ addr }} {{ city }} {{ state }}</div>
    </div> 
  </van-row>
  <van-row style="margin-bottom: 10px;"> 
    <div style="display: flex; justify-content: center; width: 100%;font-size: medium;color: rgb(133, 130, 130);"> 
      
      <van-button size="small" @click="mapClick(addr,city)" style="margin: 10px; width: 25%;" type="success">地图导航</van-button>
      <van-button size="small" @click="phoneClick(phone)" style="margin: 10px; width: 25%;" type="success">拨打电话</van-button>
      <van-button size="small"  @click="copyUrl" style="margin: 10px; width: 25%;" type="success">分享链接</van-button>
    </div> 
    <p :style="{ color: messageColor }">{{ message }}</p>
  </van-row>
  
  
</div>

<van-cell  >
  <!-- 使用 title 插槽来自定义标题 -->
  <template #title>
    进入分类： <span @click="toCategoryList"  style="font-size: var(--van-cell-font-size); color:#80cd48; font-family: var(--van-base-font); width:100%; font-weight: bold;" class="custom-title"> {{ retdata2.category }}</span>
  </template>
  <!--  -->
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

<report></report>

</template>

<script setup>
import axios from 'axios';
import config from '@/global.config.js'
import md5 from 'js-md5'
// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';
import funcs from '@/utils/common_func.js';
import report from '../../components/report.vue';
import { useStore } from 'vuex'
import { showToast, showDialog } from 'vant';
import { ref, onMounted, computed,reactive } from 'vue';
import textEditor  from "@/components/textEditor.vue"  
import weizhi from '@/components/weizhi.vue'
import { useRouter,useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const router = useRouter()
const route = useRoute()
const openkey_id = ref('')
const retdata2= ref({})
const category_url = ref('')
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
import Editor from '@tinymce/tinymce-vue'
let content = ref('')
let content_id = ref('')
const categories = config.category

const phoneClick = (phone)=>{
  var callUrl = "tel:" + encodeURIComponent(phone);

 window.location.href = callUrl;
}

const toCategoryList = () =>{
  
  const url = category_url.value + '/'
  // console.log('233',url)
  router.push({
     path: `/openkey_list/` , 
   });
  // router.push('openkey_list')
}

const mapClick = (addr,city) =>{
  let slash_position = addr.indexOf('/');
  let addr1 = addr.substring(0,slash_position)
  if (slash_position!=-1){
    console.log('slash',slash_position)
    console.log(addr1)
    let addr2 = addr.substring(slash_position+1)
    console.log(addr2)
    // https://www.google.com/maps/dir/Finch+Ave+East+at+Victoria+Park+Ave,
    let url = 'https://www.google.com/maps/dir/' + addr1 + ' at '+ addr2+','+city 
    window.open(url)
  }
  else{
    let addrs = addr.replace(" ");
    let addrNew = addr.trim();
    addrNew = addrNew.replace(' ','+')
    // https://www.google.com/maps/place/19+Rye+Meadoway,+Toronto,
    let url = 'https://www.google.com/maps/place/' + addrNew + ','+city
    window.open(url)
  }
}



// onBeforeRouteLeave((to, from, next) => {
//     //  判断跳转的页面是否为详细，是的话则储存当前页面的高度
//     if (to.path === '/openkey_list') {
//         //这里用的session来存的，当然也可以用vuex 或 pinia 或其它方法
//         route.meta.isPush = false;
//     } else {
//       route.meta.isPush = true;
//     }
//     next();
// })

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

//  console.log('asasdfsad')
  // openkey_id.value = route.query.id;  // 这个模式是从？id=89 中获取参数
  openkey_id.value = route.params.id;  // 这个是从 /89 中获取参数
  
  console.log('openkey_id', openkey_id)

  https.get(('/api/openkey/detail/'+openkey_id.value+'/')).then(response => {
  // https.get(('/api/openkey/openkey/2/')).then(response => {
    // console.log('asdfas555111');
    // console.log(response);
    // 替换图片把内网地址替换成服务器地址

    // console.log('访问的服务器协议',window.location.protocol)
    if (window.location.protocol == "http:"){
      console.log('访问的协议是http')
      // response.content = response.content.replace(config.backendserver1, config.backendserver2);
      
    }else{
      response.content = response.content.split(config.backendserver1).join(config.backendserver2)
      // console.log('response222',response)
    }

    // console.log('打印内容', content.value)
    retdata2.value = response;

    if(!retdata2.value.is_offline) {

    title.value = retdata2.value.title
    owner.value = retdata2.value.owner
    phone.value = retdata2.value.phone
    phone2.value = retdata2.value.phone2
    email.value = retdata2.value.email
    console.log('asdfas555111');
    weixin.value = retdata2.value.weixin
    addr.value = retdata2.value.addr
    state.value = retdata2.value.state
    city.value = retdata2.value.city
    console.log('asdfas555112');
    content.value = retdata2.value.content


    // https://www.mynextdoor01.space/api/api/openkey/list2/?city=toronto
    // httpss://www.mynextdoor01.space/api/api/openkey/list2/?city=toronto&page=2
    // console.log('打印内容', content.value)

    weizhizhi.value = state.value + '/' +  city.value
    // category_url.value = 
    // console.log('asdf2122',content.value)
    const res = funcs.getcategory_url2(route.path)
    console.log('fenlei212',res)
    category_url.value = res.url

   
    if (city.value.toLowerCase()=='toronto'){
      // console.log('alsdfl来到toronto')
      city2.value='多伦多'
    }
    if(city.value.toLowerCase() =='vancouver'){
      // console.log('as来到了温哥华d')
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
          content: `加拿大，${city.value},${city2.value},您附近,高性价比,开锁配钥匙服务`,
        },
      ],
    });

  }
  else{
    showDialog({message:"该信息没有审核通过，请通过电子邮件联系平台，并通过分享链接获取您信息地址，申请通过审核"})
  }

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