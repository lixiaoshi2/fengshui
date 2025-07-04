
<template>

  <van-nav-bar title="邻家网 - 租房栏目" left-text="返回" @click="router.go(-1);" left-arrow>
     <template #right>
       <van-icon name="search" size="18" />
     </template>
   </van-nav-bar>
     
   <div style="border-bottom: 1px solid rgb(244, 235, 235); margin-bottom: 10px;">
     <!-- <city_select></city_select>
     <van-field v-model="city" label="所在城市" placeholder="请选择城市" @click="router.push('/search_page2/')" /> -->
     <van-field v-model="keyword2" label="关键字" placeholder="请输入要查询的关键字" @click="router.push('/search_page2/')" />
     <div style="width: 100%;display: flex;flex-direction: row;justify-content: space-between;">
       <div style="width: 80%;flex:0 0 80%;">
           <van-field v-model="city" label="城市" placeholder="请输入城市" @click="router.push('/search_page2/')" />
         <van-field v-model="location2" label="指定位置" placeholder="地址附近的租房栏目" @click="router.push('/search_page2/')" />
       </div>
     </div>
     
     <div style="width: 95%;display: flex;flex-direction: row;justify-content: center; margin-left: 15px; margin-right: 15px;margin-bottom: 10px;">   
      
      <van-button style="font-size: 14px;" type="primary" size="small" @click="runSearchGps">搜索当前位置附近(打开gps)</van-button>
      
      <!-- <div style="width: 35%;flex:0 0 30%;margin-top: 5px;">
        <button @click="getLocation">获取位置</button>
        纬度: {{ latitude }}
       </div> -->

     </div>
   </div>
 
  
 <div class="containerRef"  ref="containerRef"    > 
  <!-- 通过上面的ref来定位一个html 元素，通过它来绑定一个scroll事件，这个事件需要单独绑定 -->
  <van-list style="margin-bottom: 50px;" >

   <van-cell style="margin-top: -10px;">
     <span style=" float: left;color:brown;" v-if="retnull === '无数据'">暂时没有您搜索的内容</span>
   </van-cell>

   <div class="goodslist" v-for="(item) in listdata2" :key="item.id">   
    
   <div class="full-screen-layout"   >
     <!-- 左侧图片 -->
     <div class="image" @click.prevent="goToDetails(item.id)" >
       <img  :src="item.imgurl|| defaultImgUrl" class="thumb-img" alt="产品图片">
     </div>
     
     <!-- 右侧信息 -->
     <div class="info">
       <div class="info-item">
         <!-- <span class="label">订单号：</span> -->
         
         <span style="font-weight: bold; font-size: 15px; color:black" > <a style="color: black;" :href="`/rentroom_detail/${item.id}`" @click.prevent="goToDetails(item.id)">
               {{ item.title  }}
             </a> </span>
       </div>
       <div class="info-item">
         <span class="titleclass2">联系人:</span>
         <span class="value">{{item.owner}}</span>
       </div>
       <div class="info-item">
         <span class="titleclass2">电话:</span>
         <span class="value">{{item.phone}}</span>
         
         <!-- <span class="titleclass">距离：</span > <span class="value"></span> -->

         <span v-if="item.distance>0" style="flex=40% ;margin-left: 20px; font-size: 12px; ">距离：{{ change_unit(item.distance) }} KM</span> 

       </div>
     
     </div>
    
   </div>  <!-- 上边图片和信息的内容结束 -->
 
   </div> 
 
 </van-list>
 
 </div>
 
   <div style="height: 50px; background-color: white;">
 
   </div>
 
 </template>
 
 <script setup>
 import axios from 'axios';
 import config from '@/global.config.js'
 import md5 from 'js-md5'
 import funcs from '@/utils/common_func.js'
 import https from '@/utils/request.js';
 import { useStore } from 'vuex'
 import { showToast,showDialog } from 'vant';
 
 // import { useMeta } from 'vue-meta';
 import { useHead } from '@vueuse/head'
 import { ref, onMounted, computed,reactive,onActivated,onUnmounted } from 'vue';
 import textEditor  from "@/components/textEditor.vue"  
 import weizhi from '@/components/weizhi.vue'
 import city_select from '@/components/city_select.vue' 
 // var userinfo = ref()
 const listdata2=ref([])   //这个变量定义了提供数据到
 const retnull = ref('')
 // import Editor from '@tinymce/tinymce-vue'
 let content = ref('')
 let content_id = ref('')
 
 import { useRouter,useRoute } from 'vue-router'
//  import { KeepAlive } from 'vue';
 const router = useRouter()
 const route = useRoute()
 const keyword2 = ref('')
 const location2 = ref('')
 const latitude = ref(0)
 const longitude = ref(0)
 const locationgps = ref({})
 const city = ref('')
 
const spinning = ref(false);  // 正在加载的标志
 const defaultImgUrl = "/nopic.jpg"
 // const defaultImgUrl = "@/assets/icon/logo3.png"
 //                        @/assets/icon/logo3.png
 // const defaultImgUrl = "/src/assets/icon/logo3.png"
 // 获取详情
 const goToDetails = (id) => {
   console.log('id',id);
  //  这段代码告诉浏览器，我要去详情页，去之前要触底的事件处理器，否则会触发另外一次的列表获取。
   window.removeEventListener('scroll', handleScroll);
   containerRef.value.removeEventListener('scroll', handleScroll);
  
   route.meta.isPush = false; //这段代码让
   router.push({
     path: `/rentroom_detail/${id}` , 
   
   });
   
 }
 
 // 这段代码将米的单位转换成公里
 const change_unit = (distance) => {
     var distance = (distance/1000).toFixed(2)
     return distance
   };
 

 
   import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
 
   // onBeforeRouteUpdate((to,from)=>{//当前组件路由改变后触发
   //     console.log(to);
   // })
 
   onBeforeRouteLeave((to, from, next) => {
     //  判断跳转的页面是否为详细，如果是到详细页面则设置push，以后返回就用push作为不重新加载的判断
     // if (to.path == '/rentroom_detail') {
     // console.log('lixiaoshi2',to.path)
     if (to.path.indexOf('rentroom_detail')) {
       // alert('leave to detail,so isPush is false')
         // route.meta.isPush = false;
         localStorage.setItem('push',false)
         console.log('lixiaoshi检测到了 ')
     } else {
       // alert('leave to other than detail so isPush is true')
       // route.meta.isPush = true;
       localStorage.setItem('push',true)
       // alert('222')
       console.log('没有检测到')
     }
     next();
 })
 
 onActivated(() => {
   // alert('asdf')
   var push = localStorage.getItem('push')
   console.log('enter into onactivated lif time')
   window.addEventListener('scroll', handleScroll);  //pc端加载事件监听
   containerRef.value.addEventListener('scroll', handleScroll)  //这个事件加载命令对手机端监听scroll有用
   console.log(push);
   // 如果isPush为true，证明不是详情页返回的，否则就是从详情页返回的
   if (push == 'true') {
     // 如果不是 重置这个页面的信息
     // alert(this.$route.meta.isPush)
     // alert('123')  //这个可以作为测试使用，因为console没用了
     console.log('is push request')  //这一项不会在console控制台显示，也就是无效console代码 alert是有效的
     // alert('asdf333')
     router.go(0);
     localStorage.setItem('push', false)
   } else {
     // alert("enter into rentroom_list page,it's ispush is ")
     // 重置isPush的状态
     // route.meta.isPush = true;
     // router.go(1);
     console.log("ads")
   }
 })
 
 
 
 
 // ------------------------ 以下代码是处理滑到底部加载新数据 ------
 const containerRef = ref(null)
 const items = ref([])
 var pageNum = ref('')

 
 // 这个事件处理函数就是模板中的处理scroll事件的函数，js一直提供scroll事件的信息，我们提取滚动信息，然后判断是否触底
 const  handleScroll =  (event) => {
   if (spinning.value) return; 
       
       const scrollHeight = document.documentElement.scrollHeight;
       const scrollTop =    document.documentElement.scrollTop || document.body.scrollTop;
       const clientHeight = document.documentElement.clientHeight;
       // console.log('1', scrollHeight,scrollTop,clientHeight)
       if (scrollHeight - scrollTop - clientHeight < 200) {
         console.log('触底了，加载新的数据');
         loaddata2();
         
         }
         
       }
                            
 // 原文链接：https://blog.csdn.net/JackieDYH/article/details/132299737
 // 首次加载数据函数，这个函数需要获取浏览器的各种查询参数，从而来获取查询

 const loaddata = () => {
   var location = localStorage.getItem('one_location');
   var keyword = localStorage.getItem('one_keyword');
   
   var search_city = localStorage.getItem('city')
   // alert(search_city)
   if (search_city == null) {
     localStorage.setItem("city", 'toronto')
     // alert('请选择城市')
     // showNotify({ message: '提示' });  //这里的这个功能不能呈现
   }
   if (search_city==null){
    search_city=''
   }
   if (keyword==null){
    keyword=''
   }
   if (location==null){
    location=''
   }
   console.log('keyword1', keyword)
   var url = '/api/rentroom/list2/?city=' + search_city
 
   if (location !== '' ) {
     url = url + '&addr=' + location
   }
 
   if (keyword !== '') {
     url = url + '&title=' + keyword
 
   }
   // url = '/api/rentroom/list2/'
   console.log('url22', url)
 
   // 把url保存到浏览器，当触摸到底部把数据拿出来使用
    // 把url保存到浏览器，当触摸到底部把数据拿出来使用
    https.get(url).then(response => {
     console.log('获取到查询的家政保洁');
     console.log(response);
    
     listdata2.value = response.results
     if(response.results!=undefined){
    //  console.log('sdfga23s',response.results)
    //  console.log('访问的服务器协议',window.location.protocol)
    if (window.location.protocol == "http:"){
      console.log('访问的协议是http')

    }else{
      // console.log('访问的协议是https,此时需要将http协议，将图片地址换成')
      // let needtochange = config.backendserver1
      // if 
      for (let i = 0; i < listdata2.value.length; i++) {
          console.log('aaa', listdata2.value[i].imgurl);
          listdata2.value[i].imgurl = listdata2.value[i].imgurl.replace(config.backendserver1, config.backendserver2);
          console.log('bbb',listdata2.value[i].imgurl)
      }
    }
    localStorage.setItem('listNextUrl', response.next)
  }
     retnull.value = response
     // showToast('获取列表成功');
    
 
   }).catch(error => {
     console.log('获取数据出错了2');
     console.error(error);
     showDialog({message:'您要么没有登陆，要么访问次数过多，请一分钟后再访问'})
     // showToast('请重新登录');
   });
 
   localStorage.setItem('one_location', '')
   localStorage.setItem('one_keyword', '')
 }
 
 // 第二次查询函数，就直接从第一次查询的参数里获取next，这样就不用再次获取查询参数了，页码在里面也有了
 const loaddata2 = () => {
   // loading.value = true
   spinning.value = true
   let listNextUrl = localStorage.getItem("listNextUrl")
   console.log('listNextUrl', listNextUrl)
   
   if (listNextUrl !== "null") {     //如果
     console.log('不是null进入此处')
     // 下面的代码是根据测试还是生产环境来提供listNextUrl，这步骤提供http://192.168.1.127:8000/api/rentroom/list2/?city=Toronto&page=2
     // 替换原来的地址为https ，并且“/api/” 替换成“/api/api/”以满足后端的需求
     listNextUrl = funcs.getUrlIp(listNextUrl)
     console.log('listNextUrl',listNextUrl)
     
    //  const nexturl2 = localStorage.getItem('listNextUrl')
    //  console.log( '下一页的地址', nexturl2)
    // // 如果地址
    // //  if(nexturl2)


     https.get(listNextUrl).then(response => {
       console.log('asdfas5551112');
       console.log(response);
       // retnull = response;

       for (let i = 0; i < response.results.length; i++) {
          // console.log('aaa', response.results[i].imgurl);
          response.results[i].imgurl =response.results[i].imgurl.replace(config.backendserver1, config.backendserver);
          // console.log('bbb',listdata2.value[i].imgurl)
      }

       listdata2.value = [...listdata2.value, ...response.results]
       // showToast('获取列表成功');
      
     
       localStorage.setItem('listNextUrl', response.next)
       // var pagenum4 = funcs.getpageNum(response.next)
       
       // localStorage.setItem('pageNum',pagenum4)
       spinning.value = false
     }).catch(error => {
       console.log('出错了112');
       console.log(error);
       showDialog({message:'您的访问次数过多，请一分钟后再访问'})
       // showToast('请重新登录');
     });
     
   } else {
     console.log('是null')
     listdata2.value = [...listdata2.value]
     // return
   }
 }

 // 这是通过gps获取数据，也就是就近获取身边的商家，首先需要设置可以触发通过gps来加载onmunted钩子函数，然后再触发刷新
 const runSearchGps = () =>{
   // 通过设置此项告诉onmounted钩子函数
   localStorage.setItem('searchByGps','1')
   // 但点击按地址附近查找时 ，从新加载一遍页面这样才会对触底事件重新生效
   window.location.reload()
   // router.push('/rentroom_list/')
 }


const latitude2 = ref(null);
const longitude2 = ref(null);
var url2 = ref('');


//  这是通过刷新页面后首次加载按照经纬度查询的首页
 const searchByGps2 = () => {

   // 从新加载一遍页面这样才会对触底事件重新生效
   const search_city = localStorage.getItem("city")
  
   if(search_city==null || search_city==''){return}
  
   // 位置信息获取成功时执行的回调函数
       
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(
       (position) => {
        //  alert('Position_latitude:', position.coords.latitude)
         latitude.value = position.coords.latitude;
         longitude.value = position.coords.longitude;
         // '必须在获取位置的代码下面获取数据，因为获取gps是外部设备数据异步获取，所以需要等待'
        //  console.log('position', position.coords.latitude)
         console.log('必须在获取位置的代码下面获取数据，因为获取gps是外部设备数据异步获取，所以需要等待')
         url2.value = '/api/rentroom/list2/?city=' + search_city + '&latitude=' + latitude.value + '&longitude=' + longitude.value
         console.log('url2', url2.value)

         console.log('url2-2', url2.value)
         https.get(url2.value).then(response => {
           console.log('用获取到查询的家政保洁');
           console.log(response);

           listdata2.value = response.results

          // 新的
          console.log('访问的服务器协议',window.location.protocol)
          if (window.location.protocol == "http:"){
          console.log('访问的协议是http')

          }else{
          console.log('访问的协议是https,此时需要将http协议，将图片地址换成')
          // let needtochange = config.backendserver1
          for (let i = 0; i < listdata2.value.length; i++) {
              console.log('aaa', listdata2.value[i].imgurl);
              listdata2.value[i].imgurl = listdata2.value[i].imgurl.replace(config.backendserver1, config.backendserver2);
              console.log('bbb',listdata2.value[i].imgurl)
          }
          }

           // showToast('获取列表成功');
           localStorage.setItem('listNextUrl', response.next)
          
           // ------- 添加事件事件触发的内容， 是在数据加载后才能进行事件添加
           // 下面这两个加载监听事件，主要是监听滑动事件的监听
           //   window.addEventListener('scroll', handleScroll);  //pc端加载事件监听 
           //  // 对指定的html元素containerRef添加监听事件 ，handleScroll是监听到最底部发出事件触发，
           //  //处理函数是handleScroll来处理。
           //   containerRef.value.addEventListener('scroll', handleScroll)  //这个事件加载命令对手机端监听scroll有用
           window.removeEventListener('scroll', handleScroll);
           window.addEventListener('scroll', handleScroll);  //pc端加载事件监听
           containerRef.value.addEventListener('scroll', handleScroll)  //这个事件加载命令对手机端监听scroll有用

           // city.value = localStorage.getItem('city')
         }).catch(error => {
           console.log('获取家政保洁出错了2');
           console.error(error);
           // showToast('请重新登录');
         });

       },
       (error) => {
        //  alert('出错了')
         url2.value = '/api/rentroom/list2/?city=' + search_city + '&latitude=' + '43.811950' + '&longitude=' + '-79.3548376';
         switch (error.code) {
           case error.PERMISSION_DENIED:
            showDialog({message:"请打开手机的位置信息gps，或是添加位置权限，【否则会没有返回数据】"})
            //  alert("请打开手机的gps，或是添加位置权限");
             break;
           case error.POSITION_UNAVAILABLE:
             alert("位置不可用");
             break;
           case error.TIMEOUT:
             alert("请求超时");
             break;
           case error.UNKNOWN_ERROR:
             alert("未知错误");
             break;
         }
       }
     );
   } else {
     url2.value = '/api/rentroom/list2/?city=' + search_city + '&latitude=' + '43.811950' + '&longitude=' + '-79.3548376';
     alert('Geolocation is not supported by this browser.');
   }


 } 
 
 // 首先是系统加载页面，加载页面的时候加载scroll事件检测
 onMounted(() => {
   // 加载数据，写成了一个函数，这里的数据来自于一开始
   
   // keyword2.value = localStorage.getItem('one_keyword');
   // location2.value = localStorage.getItem('one_location');
   
   var searchByGps = localStorage.getItem('searchByGps')  // 这是判断是否使用何种查询方式
   // 进入此页面设置一个页码标志放在localstorage中
   localStorage.setItem("pageNum",1)
   if(searchByGps==1){
     // 采用地理位置查询
     console.log('执行了1')
     searchByGps2()
   }else{
     // 一般加载
     console.log('执行了2')
     loaddata() 
   }
  //  loaddata() 
   // 下面的加载如果已经加载过一次，那么我点击gps查询，其实页面的滑动事件就会被销毁，除非重新加载页面
   window.addEventListener('scroll', handleScroll);  //pc端加载事件监听
   containerRef.value.addEventListener('scroll', handleScroll)  //这个事件加载命令对手机端监听scroll有用
   city.value = localStorage.getItem('city')
   localStorage.setItem('searchByGps','0')   //一定要复位，否则一直都是用gps查询，只有点击以后才如此查询
 }
 );


 
 // 在html的header里添加seo词汇
 // import { useMeta } from 'vue-meta';
 
 useHead({
   title: `加拿大多伦多 找到您附近最近最好最便宜租房栏目`,
   meta: [
     {
       name: 'keyword',
       content: `加拿大,多伦多,, 最好最便宜, 高质量,高品质,高性价比租房栏目`
     },
     {
       name: 'description',
       content: `加拿大,多伦多,, 找到您身边最近最好最便宜,高性价比租房栏目`
     }
   ]
 });
 
 </script>
 
 
 <style scoped>
 :deep(.van-cell__title){
 width:30%;
}

.container {
 width: 100%; /* 容器占满全部宽度 */
 display: flex; /* 使用 Flexbox 布局 */
 /*flex-wrap: wrap;  允许换行 */
 margin: 5px;
}



.thumb-img {
 cursor: pointer; /* 鼠标指针样式为手型 */
 width: 100%; /* 缩略图宽度100% */
 height: auto; /* 自动调整高度 */
}


:deep(.van-card-desc) {
 white-space: pre-line; /* 允许文本根据需要自动换行 */
}


.goodslist{

 height: auto;
 padding-top: 10px;
 align-items: center; /* 垂直居中 */
 
 /* background-color: white; */
}

.full-screen-layout {
 display: flex;
 margin-bottom: 0px;

 height: auto;
 padding-top: 10px;
 align-items: center; /* 垂直居中 */
 justify-content: center; /* 水平居中 */
 background-color: white;
}

.image {
 margin-left: 10px;
 flex: 0 0 28%; /* 左侧图片固定宽度为屏幕宽度的一半 */
 /* max-width: 50%;  图片最大宽度为屏幕宽度的一半 */
 width: 100px; /* 设置容器宽度 */
  height: 100px; /* 设置容器高度 */
  overflow: hidden; /* 隐藏溢出的部分 */
}

.image img {
  width: 100%; /* 图片宽度适应容器宽度 */
  height: auto; /* 保持图片比例 */
  /* height: 150px; */
  object-fit: cover; /* 覆盖容器，并保持图片的比例 */
  object-position: center; /* 将图片的中心部分作为显示区域 */
  border-radius: 12px; /* 圆角效果 */
}

.info {
 flex: 1; /* 右侧信息占据剩余空间 */
 display: flex;
 flex-direction: column;
 justify-content: flex-start; /* 垂直顶部对齐 */
 align-items: flex-start; /* 左对齐 */
 padding-top: 5px; /* 右侧信息的内边距 */
 margin-left:10px;
 margin-top:-30px;
 padding-bottom: 5px;

 padding-right: 10px;
}

.info-item {
 margin-bottom: 5px;
 margin-right: 5px;
}

.label {
 font-weight: bold;
 font-size: 12px; /* 标签字体大小 */
}

.titleclass {
 font-size: 15px; /* 值字体大小 */
 /* font-size: bold; */
 font-weight: bold;
}
.titleclass2 {
 font-size: 13px; /* 值字体大小 */
 /* font-size: bold; */
 /* font-weight: bold; */
}
.value {
 font-size: 12px; /* 值字体大小 */
 color: rgb(87, 84, 84);
}
 </style>