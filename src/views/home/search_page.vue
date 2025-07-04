<template>
    <!-- <weizhi v-model:fieldValue="weizhizhi" ref="weizhiref" ></weizhi> -->
    <van-nav-bar title="在所有分类中查找" left-text="返回" @click="router.go(-1);"  left-arrow>
<template #right>
  <van-icon name="search" size="18" />
</template>
</van-nav-bar>
   
   <div >
    <van-field style="margin-bottom: 10px;" v-model="keyword2" label="关键字" placeholder="请输入要查询的关键字" />
    <!-- <div style="display: flex; flex-wrap: wrap; margin-left: 12px; margin-bottom:15px; font-weight: bold;font-size: small;">历史搜索</div> -->
    
    
    <!-- <div style="margin-left: 12px; margin-bottom:10px; font-weight: bold;font-size: small;">历史搜索</div> -->
    <div style="display: flex; flex-wrap: wrap; margin-left: 5px; padding-top: 5px">
        <div style=" margin-left: 10px; padding-top: 5px" v-for="(item,index) in search_keyword_old" :key="index">
        
          <span @click="select_keyword(item)" style="flex-wrap: nowrap;  margin-top:5px; padding: 2px; font-size: small; background-color: rgb(215, 209, 209);"> {{ item }} </span>
        
        </div>
    </div> 
   </div>
   
   <div style="margin-top:20px;" >
    
    <!-- 暂时不要地址，因为不能就近查找 -->
    <!-- <city_select></city_select> -->
    <!-- <van-field style="margin-bottom: 10px;" v-model="city" label="城市名：" placeholder="请输入您所在的城市"  /> -->
   </div>

    <div style="display: flex;  justify-content: center; margin-top:20px;  " >
      <van-button style="width:50%;margin-top: 0px;margin-bottom: 20px;" @click="searchaction" size="small" icon="search" center type="success">查    询</van-button>
    </div>
   <!-- {{ geolocation }} -->

   <div class="containerRef"  ref="containerRef"   > 
    <!-- 通过上面的ref来定位一个html 元素，通过它来绑定一个scroll事件，这个事件需要单独绑定 -->
    <van-list style="margin-bottom: 50px;" >
      <van-cell>
        <span style="float: left;color:brown;  " v-if="retnull === '无数据'">暂时没有您搜索的内容</span>
      </van-cell>
 
        <van-cell  class="custom-cell" v-for="(item) in listdata2" :key="item.id">
            <template #title>
             
              <span style="font-weight: bold;"  @click.prevent="goToDetails(item.name,item.post_id)">
                {{ item.title  }}
              </span>
                      
              <div style="display:flex ;">
                  <div style=" flex=40%"  @click="router.push('/'+item.name+'_list/')" >
                     <span style="font-weight: bold; margin-right:15px;" >分类:</span>
                    <span>  {{ item.category }}  </span>    <span style="margin-left: 15px;font-weight: bold;">地址：</span>  <span style="">  {{ item.city }} </span>
                  </div> 
                  
              </div>
              
            </template>
            <template #label>
            </template>
        </van-cell>
    </van-list>

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

import city_select from '@/components/city_select.vue' 
// var userinfo = ref()
const listdata2=ref([])   //这个变量定义了提供数据到
const retnull = ref('')
// import Editor from '@tinymce/tinymce-vue'


import { useRouter,useRoute } from 'vue-router'
//  import { KeepAlive } from 'vue';
const router = useRouter()
const route = useRoute()
const keyword2 = ref('')

const city = ref('')
// let keyword = ref('')
var search_keyword_old = ref('')

const spinning = ref(false);  // 正在加载的标志

// 获取详情
const goToDetails = (categoryname, id) => {
  console.log('id',id);
  
  route.meta.isPush = false; //这段代码让
  router.push({
    path: `/${categoryname}_detail/${id}` , 

  });
  // router.push({ name: 'trainadult_detail', params: { id } });
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
    //  判断跳转的页面是否为详细，如果是到详细页面则设置push为false，false就不需要刷新，
    // if (to.path == '/trainadult_detail') {
    // console.log('lixiaoshi2',to.path)
    // if (to.path.indexOf('trainadult_detail')) {
    //   // alert('leave to detail,so isPush is false')
    //     // route.meta.isPush = false;
    //     localStorage.setItem('push',false)
    //     console.log('lixiaoshi检测到了 ')
    // } else {
   
    //   localStorage.setItem('push',true)
    //   // alert('222')
    //   console.log('没有检测到')
    // }
    localStorage.setItem('push',false)
    // localStorage.setItem('push',true)
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
    // alert("enter into trainadult_list page,it's ispush is ")
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
    //   console.log('1', scrollHeight,scrollTop,clientHeight)
      if (scrollHeight - scrollTop - clientHeight < 200) {
        console.log('触底了，加载新的数据');
        loaddata2();
        
        }
        
}
                           
// 原文链接：https://blog.csdn.net/JackieDYH/article/details/132299737
// 首次加载数据函数，这个函数需要获取浏览器的各种查询参数，从而来获取查询

const loaddata = () => {
//   var location = localStorage.getItem('one_location');
  var keyword = keyword2.value;
  
  var search_city = localStorage.getItem('city')
  // alert(search_city)
  if (search_city == null) {
    localStorage.setItem("city", 'toronto')
    // alert('请选择城市')
    // showNotify({ message: '提示' });  //这里的这个功能不能呈现
  }
  if (search_city==null){
    search_city = ''
  }
  if (keyword==null){
   keyword=''
  }
  if (location==null){
   location=''
  }
  console.log('keyword1', keyword)
  var url = '/api/user/my_post/list_public/?city=' + search_city


  if (keyword !== '') {
    url = url + '&title=' + keyword2.value

  }
  // url = '/api/trainadult/list2/'
  console.log('url22', url)

  // 把url保存到浏览器，当触摸到底部把数据拿出来使用

  https.get(url).then(response => {
    console.log('获取到查询的家政保洁');
    console.log(response);

    listdata2.value = response.results

    console.log('访问的服务器协议',window.location.protocol)
  //  if (window.location.protocol == "http:"){
  //    console.log('访问的协议是http')
  //   //  console.log('listdata222',listdata2.value)
  //  }else{
  //    console.log('访问的协议是https,此时需要将http协议，将图片地址换成')
  //    // let needtochange = config.backendserver1
  //    console.log('listdata222',listdata2.value)
  //    if ( listdata2.value!=undefined){
  //    for (let i = 0; i < listdata2.value.length; i++) {
  //        console.log('aaa', listdata2.value[i].imgurl);
         
  //        listdata2.value[i].imgurl = listdata2.value[i].imgurl.replace(config.backendserver1, config.backendserver2);
  //        console.log('bbb',listdata2.value[i].imgurl)
  //    }
  //   }
  //  }

    retnull.value = response
    // showToast('获取列表成功');
    localStorage.setItem('listNextUrl', response.next)

  }).catch(error => {
    console.log('获取数据出错了2');
    console.error(error);
    showDialog({message:'您要么没有登陆，要么访问次数过多，请一分钟后再访问'})
    // showToast('请重新登录');
  });

  localStorage.setItem('one_location', '')
  localStorage.setItem('one_keyword', '')
}

// const gotofenlei = ()=>{
//     router.push(/")
// }

// 第二次查询函数，就直接从第一次查询的参数里获取next，这样就不用再次获取查询参数了，页码在里面也有了
const loaddata2 = () => {
  // loading.value = true
  spinning.value = true
  let listNextUrl = localStorage.getItem("listNextUrl")
  console.log('listNextUrl', listNextUrl)
  
  if (listNextUrl !== "null") {     //如果
    console.log('不是null进入此处')
    // 下面的代码是根据测试还是生产环境来提供listNextUrl，这步骤提供http://192.168.1.127:8000/api/trainadult/list2/?city=Toronto&page=2
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

    //   for (let i = 0; i < response.results.length; i++) {
    //      // console.log('aaa', response.results[i].imgurl);
    //      response.results[i].imgurl =response.results[i].imgurl.replace(config.backendserver1, config.backendserver);
    //      // console.log('bbb',listdata2.value[i].imgurl)
    //  }

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

// 具体的查询程序
const searchaction = () =>{
    console.log('helle')
   loaddata();
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
    // searchByGps2()
  }else{
    // 一般加载
    console.log('执行了2')
    // loaddata() 
  }
 //  loaddata() 
  // 下面的加载如果已经加载过一次，那么我点击gps查询，其实页面的滑动事件就会被销毁，除非重新加载页面
  window.addEventListener('scroll', handleScroll);  //pc端加载事件监听
  containerRef.value.addEventListener('scroll', handleScroll)  //这个事件加载命令对手机端监听scroll有用
  city.value = localStorage.getItem('city')
  localStorage.setItem('searchByGps','0')   //一定要复位，否则一直都是用gps查询，只有点击以后才如此查询
}
);



</script>


     
<style>

</style>