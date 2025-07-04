
<template>
  <van-nav-bar title="邻家网 美食销售" left-text="返回" @click="router.go(-1);" left-arrow>
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

<div class="wrapper"  style="padding: 10px;margin-bottom: 0px; font-size: 13px;">
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
      
      <van-button size="small" @click="mapClick(addr,city)" style="margin: 10px; width: 22%;" type="success">地图导航</van-button>
      <van-button size="small" @click="phoneClick(phone)" style="margin: 10px; width: 22%;" type="success">拨打电话</van-button>
      <van-button size="small"  @click="copyUrl" style="margin: 10px; width: 22%;" type="success">分享链接</van-button>
      <van-button size="small"  @click="buyinfo" style="margin: 10px; width: 15%;" type="success">购买</van-button>
      <!-- <van-button size="small"  @click="copyUrl" style="margin: 10px; width: 25%;" type="success">收藏</van-button> -->
    </div> 
    <p :style="{ color: messageColor }">{{ message }}</p>
  </van-row>
  
  
</div>

<van-cell  >
  <!-- 使用 title 插槽来自定义标题 -->
  <template #title>
    分类： <span @click="toCategoryList"  style="font-size: var(--van-cell-font-size); color:#80cd48; font-family: var(--van-base-font); width:100%; font-weight: bold;" class="custom-title"> {{ retdata2.category }}</span>
  </template>
  <template #default>
    <div class="" style="float: left;">
      <span style="font-size: small;margin-right: 4px; float: left;">店铺入驻时长:</span>
      <span  style=" margin-left: 10px; font-size: small;" > {{ ruzhushichang }} 月</span>
    </div>
  </template>
  <!-- <template  #value>
     <span   style="font-size: var(--van-cell-font-size); color:rgb(217 27 157); font-family: var(--van-base-font); width:100%; font-weight: bold;" class="custom-title"> {{ retdata2.category }}</span>
  </template> -->
  <!--  -->
</van-cell>

<div class="wrapper2" ref="wrapper2" style=" padding: 10px;margin-bottom: 0px; font-size: 15px;">
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
// import axios from 'axios';
import config from '@/global.config.js'
// import md5 from 'js-md5'
// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';
import funcs from '@/utils/common_func.js';
import report from '../../components/report.vue';
import { useStore } from 'vuex'
import { showToast,showDialog } from 'vant';
import { ref, onMounted, computed,reactive,nextTick,watchEffect  } from 'vue';
import textEditor  from "@/components/textEditor.vue"  
import weizhi from '@/components/weizhi.vue'
import { useRouter,useRoute } from 'vue-router'

import { useHead } from '@vueuse/head'

const router = useRouter()
const route = useRoute()
const hotel_id = ref('')
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
const yizhan_ownerid = ref('')
var city = ref('')
var state = ref('')
const city2= ref('')
let pickaddr = ref('')
// import Editor from '@tinymce/tinymce-vue'
let content = ref('')
let content_id = ref('')

const categories = config.category
const ruzhushichang = ref('')
const phoneClick = (phone)=>{
  var callUrl = "tel:" + encodeURIComponent(phone);

 window.location.href = callUrl;
}

const toCategoryList = () =>{
  
  const url = category_url.value + '/'
  // console.log('233',url)
  router.push(category_url.value)
  // router.push('hotel_list')
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
//     if (to.path === '/hotel_list') {
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

const buyinfo = () =>{
  showDialog({message:'请在下面的详情页里查找购买的链接，点击进入购买页面'})
}

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
    messageColor.value = 'red';
  } catch (err) {
    console.error('无法复制到剪贴板', err);
    message.value = '无法复制到剪贴板';
    messageColor.value = 'red';
  }
  
  // 移除临时的 textarea 元素
  document.body.removeChild(textarea);
};

// 进入购买的网页
const buy = () => {
  router.push('/myfood_buypage')

  // 创建一个临时的 textarea 元素
  
};



// content的ref对象
const wrapper2 = ref(null);

const currentPath = route.path;
const shanpinfenlei = currentPath.split('_')[0];
console.log('currentPath',currentPath)
const path = route.fullPath;
console.log('fullpath',path)
const id3 = route.query.id
console.log('id3',id3)
const productid= ref('')


const processedContent = ref('');  //处理后的内容
productid.value = shanpinfenlei+id3
console.log('productid',productid)
let myurl = ref('')
// 添加监听事件2
const addEventListeners = () => {
  nextTick(() => {  // 这个函数是在页面添加完了以后会执行，可以修改页面元素，
    if (wrapper2.value) {
      console.log('.wrapper2 element found');
      console.log('title2', title.value)
      console.log("pickaddr", pickaddr.value)
      // console.log('wrapper2里的内容',wrapper2)
      // 获取div元素中的所有<a>标签
      const aTags = wrapper2.value.querySelectorAll('a');

      if (aTags.length > 0) {
        console.log('Number of <a> tags found:', aTags.length);

        // 遍历每个<a>标签并添加事件监听器
        aTags.forEach(a => {
          a.addEventListener('click', function (event) {
            console.log('Link clicked:', a.href);

            // 阻止默认行为，例如跳转链接
            event.preventDefault();

            // 获取链接的href属性
            const href = a.href;
            console.log('href', href)
            // 解析链接中的查询参数
            const url = new URL(href);
            const params = new URLSearchParams(url.search);

            // 获取特定参数的值
            // const id2 = params.get('id');   //页面id
            // const color2 = params.get('color');
            const cost = params.get('cost');  // 获取该美食的价格
            const goodsname = params.get('goodsname'); // 获取该美食店的商品名
            console.log('cost', cost)
            console.log('goodsname', goodsname)


            const parentP = a.parentElement;

            // 查找前一个 <p> 标签
            const previousP = parentP.previousElementSibling;
            let img3 = ''
            // 查找前一个 <p> 标签中的 <img> 标签
            const img = previousP ? previousP.querySelector('img') : null;
            let imgSrc  = ''
            if (img) {
              imgSrc = img.src;  // 获取图片的 src 属性
              console.log('有图片')
              console.log(imgSrc);  // 输出图片的 src URL 作为字符串
            } else {
              console.log('图片对象不存在');
              showDialog({message:"没有商品图片，不可以交易"})
            }


            img3 = imgSrc
            // if(imgurl2){
            //   img3 = imgurl2
            // }
            console.log('path', route.path)
            const url2 = route.path
            const parts = url2.split('/');
            const goodspage = parts[1]; // "myfood_detail" 提供商品的页面分类
            const googdid = parts[2]    // 商品页面的id
            // const price = parts[3]
            console.log(goodspage, googdid);


            // myurl.value = `/mycart_add?title=${title.value}&goodname=myfood&productid=${productid.value}&pickaddr=${pickaddr.value}&img=${img3}&id=${id2}&color=${color2}&cost=${cost}`
            // console.log('myurl:', myurl.value)
            // router.push(myurl.value)

            const values2 = { //这里真实的
              'goodspage': goodspage,  //确定商品分类，如美食或是眼镜等
              "goodsid": googdid,   //确定店家，分类下的店家
              "goodsname": goodsname,   //确定商品在店里的商品名称，可能会有多个商品，或是多个型号
              "goodsimg": img3,  //此件商品的图片
              "pickaddr": pickaddr.value,   // 确定取货地址，因为在购物车里可能这个地址就会发生改变，
              "yizhan_ownerid": yizhan_ownerid.value,  //驿站老板的id
              "jingyingzhe_id": localStorage.getItem("user_id"),   //经营者也就是上一级业务的负责人id  
              "weixin": weixin.value,  // 经营者的微信
              "email": email.value,  // 经营者的微信
              "phone": phone.value,   // 驿站老板电话
              "phone2": phone2.value,  //经营者电话
              "price": cost,  //商品价格
              "shopname":  title.value,  //商品价格
              
            }
            console.log("values2", values2)
            // 将商品提交到购物车后台地址
            var posturl =  '/api/mycart/add/'
            https.post(posturl,values2).then(response => {
              console.log('asdfas555111');
              console.log(response);
              showDialog({ message: '已将商品添加到购物车' })
              // router.push('/my_post')

            }).catch(error => {
              console.log('出错了2');
              console.error(error);

            });

          });
        });
      } else {
        console.log('No <a> tags found within .wrapper2');
      }
    } else {
      console.error('.wrapper2 element not found');
    }
  });
};



// 重写地址
const rewriteImageUrl = (src) => {
      const isLocal = src.startsWith('http://192.168.1.127:8000');
      const baseUrl = isLocal
        ? 'https://www.nearnet.ca/api'
        : 'https://www.nearnet.ca/api';
      return src.replace('http://192.168.1.127:8000', baseUrl);
  };

// 处理文章内容，获取content，找到图片，调用图片处理程序
const processImages = (content) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    // console.log('传入的内容',content)
    
    // 查找所有图片并替换链接
    const images = tempDiv.querySelectorAll('img');
    // console.log('img',images)
    images.forEach((img) => {
      const src = img.getAttribute('src');
      // console.log('src1',src)
      if (src) {
        var newSrc = rewriteImageUrl(src);
        // console.log('111222',newSrc)
        img.setAttribute('src', newSrc);
      }
    });

    // 更新内容
    processedContent.value = tempDiv.innerHTML;
    return processedContent.value
  };


//onmounted  从后台获取数据
const getdata = () => {
  https.get(('/api/myfood/detail/' + hotel_id.value + '/')).then(response => {
    // https.get(('/api/hotel/hotel/2/')).then(response => {
    // console.log('asdfas555111');
    // console.log(response);
    retdata2.value = response;
    title.value = retdata2.value.title
    owner.value = retdata2.value.owner
    phone.value = retdata2.value.phone
    phone2.value = retdata2.value.phone2
    email.value = retdata2.value.email
    // console.log('asdfas555111');
    weixin.value = retdata2.value.weixin
    email.value = retdata2.value.email
    addr.value = retdata2.value.addr
    state.value = retdata2.value.state
    yizhan_ownerid.value = retdata2.value.yizhan_userid
    city.value = retdata2.value.city
    console.log('asdfas555112');
    content.value = retdata2.value.content

    const currentUrl2 = window.location.href;
    console.log('currenturl2',currentUrl2)
    const isHttps = currentUrl2.startsWith('https://www.nearnet.ca');
    console.log('asdf33',isHttps)
    if (isHttps){
      const newcontent = processImages(content.value);
      // console.log('newconten', newcontent)
      content.value = newcontent;
    }



    // if (window.location.protocol == "http:"){
    //   console.log('访问的协议是http')

    // }else{
    //   // console.log('访问的协议是https,此时需要将http协议，将图片地址换成')
    //   // let needtochange = config.backendserver1
    //   // if 
    //   for (let i = 0; i < listdata2.value.length; i++) {
    //       console.log('aaa', listdata2.value[i].imgurl);
    //       listdata2.value[i].imgurl = listdata2.value[i].imgurl.replace(config.backendserver1, config.backendserver2);
    //       console.log('bbb',listdata2.value[i].imgurl)
    //   }


    
    weizhizhi.value = state.value + '/' + city.value
    pickaddr.value = addr.value + ', ' + city.value + ' ' + state.value
    // category_url.value = 
    // console.log('asdf2122',content.value)

    const res = funcs.getcategory_url(categories, response.category)
    console.log('fenlei212', res)
    category_url.value = res.url
    // ruzhushichang.value = response.create_time
    let startdate = response.create_time
    startdate = startdate.slice(0, 10)
    console.log('startdate', startdate.slice(0, 10))
    ruzhushichang.value = funcs.getshichang(startdate)

    


    if (city.value == 'Toronto') {
      console.log('alsdfl来到toronto')
      city2.value = '多伦多'
    }
    else if (city.value == 'Vancouver') {
      console.log('as来到了d')
      city2.value = ''
    }


    // 动态设置页面头部信息
    useHead({
      title: `${title.value} | 加拿大邻家网`,
      meta: [
        {
          name: 'description',
          content: title.value,
        },
        {
          name: 'keywords',
          content: `加拿大，${city.value},${city2.value},最好最便宜的美食，快餐外卖`,
        },
      ],
    });

    // 监听事件，监控时间将数据发往购物车
    addEventListeners()

  }).catch(error => {
    console.log('出错了2');
    showDialog({ message: '您的访问次数过多，请一分钟后再访问' })
    console.error(error);
    // showToast('请重新登录');
  });
}


onMounted(() => {
 console.log('asasdfsad')
  // hotel_id.value = route.query.id;
  hotel_id.value = route.params.id;
  console.log('hotel_id', hotel_id)
   getdata()
  
})





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
:deep(#id p){
  line-height: 25px;
  margin-block-start: 0.2em;
  margin-block-end: 0.2em; /* 将上下间距调整为 0.5em */
  
}

.custom-value {
  text-align: right;
  width: 100%;
}

</style>