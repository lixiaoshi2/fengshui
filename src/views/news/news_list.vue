
<template>

  <van-nav-bar title="邻家网 - 文档列表" left-text="返回" @click="router.go(-1);" left-arrow>
     <template #right>
       <van-icon name="search" size="18" />
     </template>
   </van-nav-bar>
     
   <div style="border-bottom: 1px solid rgb(244, 235, 235); margin-bottom: 10px;">
     <!-- <city_select></city_select>
     <van-field v-model="city" label="所在城市" placeholder="请选择城市" @click="router.push('/search_page2/')" /> -->
     <van-field v-model="keyword2" label="关键字" placeholder="请输入要查询的关键字" @click="router.push('/')" />
     
     
     <div style="width: 95%;display: flex;flex-direction: row;justify-content: center; margin-left: 15px; margin-right: 15px;margin-bottom: 10px;">   
      
      
      
      <!-- <div style="width: 35%;flex:0 0 30%;margin-top: 5px;">
        <button @click="getLocation">获取位置</button>
        纬度: {{ latitude }}
       </div> -->

     </div>
   </div>
 
  
 <div class="containerRef"  ref="containerRef"    > 
  <!-- 通过上面的ref来定位一个html 元素，通过它来绑定一个scroll事件，这个事件需要单独绑定 -->
  <van-list style="margin-bottom: 50px;" >

   <van-cell class="custom-cell" v-for="(item,index) in listdata2" :key="item.id">
          <template #title>
            <span @click="btn_detail(item.id)" style="font-weight: bold;">{{ item.title }}   id:{{ item.id }} </span>
           
          </template>
          <template #label>
           
           <span> <van-button style="width: 14%;height: 30px; margin: 10px;" plain size="small" @click="btn_update(item.id)" type="primary">编辑</van-button></span>
           
           <span> <van-button style="width: 14%;height: 30px; margin: 10px;" plain size="small" @click="showDialog_offline(item.id,item.name,item.post_id,index)" type="primary">下线</van-button></span>
           <span> <van-button style="width: 14%;height: 30px; margin: 10px;" plain size="small" @click="showDialog_online(item.id,item.name,item.post_id,index)" type="primary">上线</van-button></span>     
           <span> <van-button @click="showDialog_delete(item.id)" style="width: 14%;height: 30px; margin: 10px;"  plain size="small" type="danger">删除</van-button>  </span>
          </template>
      </van-cell>

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

 import { showToast,showDialog } from 'vant';
 
 // import { useMeta } from 'vue-meta';

 import { ref, onMounted, computed,reactive,onActivated,onUnmounted } from 'vue';
 import textEditor  from "@/components/textEditor.vue"  

 // var userinfo = ref()
 const listdata2=ref([])   //这个变量定义了提供数据到
 const retnull = ref('')
 // import Editor from '@tinymce/tinymce-vue'

 
 import { useRouter,useRoute } from 'vue-router'
//  import { KeepAlive } from 'vue';
 const router = useRouter()
 const route = useRoute()
 const keyword2 = ref('')

 
const btn_update = (id)=>{
  router.push('/news_update/'+id+'/')
}


const spinning = ref(false);  // 正在加载的标志
 const defaultImgUrl = "/nopic.jpg"
 // const defaultImgUrl = "@/assets/icon/logo3.png"
 //                        @/assets/icon/logo3.png
 // const defaultImgUrl = "/src/assets/icon/logo3.png"
 // 获取详情
 const goToDetails = (id) => {
   console.log('id',id);
   
   route.meta.isPush = false; //这段代码让
   router.push({
     path: `/news_detail/${id}` , 
     // query: {
     //   id
     // }
   });
   // router.push({ name: 'news_detail', params: { id } });
 }
 

 const btn_detail = (id)=>{
  router.push('/news_detail/'+id+'/')
 }


 
   import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
 
   // onBeforeRouteUpdate((to,from)=>{//当前组件路由改变后触发
   //     console.log(to);
   // })
 
   onBeforeRouteLeave((to, from, next) => {
     //  判断跳转的页面是否为详细，如果是到详细页面则设置push，以后返回就用push作为不重新加载的判断
     // if (to.path == '/news_detail') {
     // console.log('lixiaoshi2',to.path)
     if (to.path.indexOf('news_detail')) {
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
     // alert("enter into news_list page,it's ispush is ")
     // 重置isPush的状态
     // route.meta.isPush = true;
     // router.go(1);
     console.log("ads")
   }
 })
 
 // 原文链接：https://blog.csdn.net/brilliantSt/article/details/128287700
 
 
 
 //   onBeforeRouteLeave((to, from, next) => {
 //     //  判断跳转的页面是否为详细，是的话则储存当前页面的高度
 //     if (to.path === '/details') {
 //         //这里用的session来存的，当然也可以用vuex 或 pinia 或其它方法
 //         sessionStorage.setItem('scrollTop', window.pageYOffset)  
 //     } else {
 //         sessionStorage.setItem('scrollTop', 0) 
 //     }
 //     next();
 // })
 // 原文链接：https://blog.csdn.net/Jet_Lover/article/details/133993568
 
 
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
 
   if (keyword==null){
    keyword=''
   }
 
   console.log('keyword1', keyword)
   var url = '/api/news/list/?'

   if (keyword !== '') {
     url = url + 'title=' + keyword
 
   }
   // url = '/api/news/list2/'
   console.log('url22', url)
 
   // 把url保存到浏览器，当触摸到底部把数据拿出来使用
 
   https.get(url).then(response => {
     console.log('获取到查询的家政保洁');
     console.log(response);
     
     listdata2.value = response.results
     // 我想在这里修改图片的地址，因为如果上传到服务器后，本地的图片地址会被保留，而无法显示
     console.log('listdata22',listdata2.value)
     
     retnull.value = response
     // showToast('获取列表成功');
     localStorage.setItem('listNextUrl', response.next)
 
   }).catch(error => {
     console.log('获取数据出错了2');
     console.error(error);
     showDialog({message:'您要么没有登陆，要么访问次数过多，请一分钟后再访问'})
     // showToast('请重新登录');
   });
 
  
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
     // 下面的代码是根据测试还是生产环境来提供listNextUrl，这步骤提供http://192.168.1.127:8000/api/news/list2/?city=Toronto&page=2
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


var url2 = ref('');


 
 // 首先是系统加载页面，加载页面的时候加载scroll事件检测
 onMounted(() => {
   // 加载数据，写成了一个函数，这里的数据来自于一开始
   
   // keyword2.value = localStorage.getItem('one_keyword');
   // location2.value = localStorage.getItem('one_location');
   
   
   // 进入此页面设置一个页码标志放在localstorage中
   localStorage.setItem("pageNum",1)
   loaddata() 
   
  //  loaddata() 
   // 下面的加载如果已经加载过一次，那么我点击gps查询，其实页面的滑动事件就会被销毁，除非重新加载页面
   window.addEventListener('scroll', handleScroll);  //pc端加载事件监听
   containerRef.value.addEventListener('scroll', handleScroll)  //这个事件加载命令对手机端监听scroll有用
   //一定要复位，否则一直都是用gps查询，只有点击以后才如此查询
 }
 );


 
 // 在html的header里添加seo词汇
 // import { useMeta } from 'vue-meta';
 

 
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
 flex: 0 0 22%; /* 左侧图片固定宽度为屏幕宽度的一半 */
 /* max-width: 50%;  图片最大宽度为屏幕宽度的一半 */
 
}

.image img {
 max-width: 100%; /* 图片最大宽度100% */
 height: auto; /* 高度自适应 */
 max-height: 70vh; /* 图片最大高度为屏幕高度的70% */
 object-fit: contain; /* 图片填充方式，保持比例并适应容器 */

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
 margin-top:-10px;
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