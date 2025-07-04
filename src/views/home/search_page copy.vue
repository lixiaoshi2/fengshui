<template>
    <!-- <weizhi v-model:fieldValue="weizhizhi" ref="weizhiref" ></weizhi> -->
    <van-nav-bar title="在所有分类中查找" left-text="返回" @click="router.go(-1);"  left-arrow>
<template #right>
  <van-icon name="search" size="18" />
</template>
</van-nav-bar>
   
   <div >
    <van-field style="margin-bottom: 10px;" v-model="keyword" label="关键字" placeholder="请输入要查询的关键字" />
    <!-- <div style="display: flex; flex-wrap: wrap; margin-left: 12px; margin-bottom:15px; font-weight: bold;font-size: small;">历史搜索</div> -->
    <div style="margin-left: 12px; margin-bottom:10px; font-weight: bold;font-size: small;">历史搜索</div>
    <div style="display: flex; flex-wrap: wrap; margin-left: 5px; padding-top: 5px">
        <div style=" margin-left: 10px; padding-top: 5px" v-for="(item,index) in search_keyword_old" :key="index">
        
          <span @click="select_keyword(item)" style="flex-wrap: nowrap;  margin-top:5px; padding: 2px; font-size: small; background-color: rgb(215, 209, 209);"> {{ item }} </span>
        
        </div>
    </div> 
   </div>
   
   <div style="margin-top:20px;" >
    
    <!-- 暂时不要地址，因为不能就近查找 -->
    <!-- <city_select></city_select> -->
    
   </div>

    <div style="display: flex;  justify-content: center; margin-top:20px;  " >
      <van-button style="width:50%;margin-top: 0px;margin-bottom: 20px;" @click="search" size="small" icon="search" center type="success">查    询</van-button>
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
                  <div style="flex=40%"> <span style="font-weight: bold; margin-right:15px;">分类:</span>{{ item.category }}</div> 
                  
              </div>
              
            </template>
            <template #label>
            </template>
        </van-cell>
    </van-list>

</div>



</template>
     
<script setup>
import { ref, watch, onMounted, defineEmits, defineProps } from 'vue';
import { useRouter,useRoute } from 'vue-router'
import https from '@/utils/request.js';
import funcs from '@/utils/common_func.js';
import config from '@/global.config.js' ;

// import { Geolocation } from 'vue-Geolocation';
// import city_select from '@/components/city_select.vue' 
const router = useRouter()
const route = useRoute()
import category  from '@/components/category.vue' 

const geolocation = ref({})
const longitude = ref('')
const latitude = ref('')

const keyword= ref('');
const location= ref('');
var search_keyword_old = ref('')
var search_location_old = ref('')
const city = ref('');
const listdata2 = ref([])
const  retnull = ref('')
city.value = localStorage.getItem('city')
// const location = ref([])

const select_keyword = (item)=>{
    keyword.value = item

}

const select_location = (item)=>{
    location.value = item

}

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';

  // onBeforeRouteUpdate((to,from)=>{//当前组件路由改变后触发
  //     console.log(to);
  // })

//  通过
onBeforeRouteLeave((to, from, next) => {
    //  判断跳转的页面是否为详细，如果是到详细页面则设置push，以后返回就用push作为不重新加载的判断
    // if (to.path == '/glasses_detail') {
    // console.log('lixiaoshi2',to.path)
    if (to.path.indexOf('allpost_detail')) {
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

// 向数组添加新的字段


const search = ()=>{
    var search_keyword2 = localStorage.getItem("search_keyword")
    var search_keyword = ''
    if (search_keyword2 !== null ){ //如果有历史查询内容，就加入现在的查询关键词
        // search_keyword = search_keyword2 ;
        var a = search_keyword2.indexOf(keyword.value)
       
        // console.log('a',a)
        if (search_keyword2.indexOf(keyword.value) ==-1 ){  
            //如果查询内容没有包含在历史内容里，这样才把这个内容加入历史内容
            search_keyword = keyword.value  + ',' + search_keyword2;
            var search_keyword3 = search_keyword.split(",");
            if (search_keyword3.length>10){
                // console.log('asdf',search_keyword3)
                search_keyword3 = search_keyword3.slice(0,10)
                search_keyword  = search_keyword3.join(",");
                console.log('asdf33',search_keyword3)
            }
        }
        else{  //如果历史查询有这个关键词，那么就加入这个关键词
            search_keyword =  search_keyword2;
        }
        localStorage.setItem("search_keyword",search_keyword)
        
    }
    else  //没有历史查询内容，直接将查询内容插入浏览器
    {
        if (keyword.value!==''){

            search_keyword = keyword.value
            localStorage.setItem("search_keyword",search_keyword)
        }

    }
    
    console.log('3333',keyword.value);
    const b = keyword.value;
    if (b!==''){
        console.log('hehe ')
        localStorage.setItem("one_keyword",b)
    }

    // 记住如果在地址栏最后一个字符没有用‘/’结束就会出现跨域的错误提示
    var urlfull = '/api/user/my_post/list_public/'
    console.log('keyword',keyword.value)
    if (keyword.value) {
        // urlfull = urlfull + '?title=' + keyword.value
        urlfull = urlfull + '?title='+keyword.value
        
    }
    console.log('url full',urlfull)
    https.get(urlfull).then(response => {
        console.log('从后端获取查询数据');
        console.log(response);
        
        listdata2.value = response.results
        
        listdata2.value = response.results.map(item => {
            // 添加新的字段
            var categoryE = funcs.getcategory (config.category,item.category)
            console.log('url:',categoryE)
            // 从global.config.js 根据返回的分类名“眼镜”中获取/glasses_list/
            item.category_list = categoryE.url;
            
            
            // 提取url比如"/glasses_list/"中的glasses，作为页面详情中的导航
            var match = categoryE.url.match(/\/(\w+)_list\//);
            // 提取匹配结果中的 'hotel'
            var extracted = match ? match[1] : null;
            item.category_detail = extracted+'_detail';
            // console.log('detail',extracted)
            return item;
        });
        
        console.log('newdata2', listdata2.value)
        // funcs.getcategory(config.category,category)
        // showToast('获取列表成功');

        }).catch(error => {
            console.log('出错了2');
            console.error(error);
            // showToast('请重新登录');
        });
        
    // localStorage.setItem("search_keyword",'')

}


onMounted(() => {
    var search_keyword=  localStorage.getItem("search_keyword")
    var search_keyword_array = []
    console.log('11', search_keyword)
    if (search_keyword!==null){
        search_keyword_array = search_keyword.split(",")
        search_keyword_old.value = search_keyword_array
        console.log(search_keyword_array[0])
        console.log('asdf2323',search_keyword_old.value)
    }
    

    var search_location=  localStorage.getItem("search_location")
    var search_location_array = []
    console.log('11', search_location)
    if (search_location!==null){
        search_location_array = search_location.split(",")
        search_location_old.value = search_location_array
        console.log(search_location_array[0])
        console.log('asdf2323',search_location_old.value)
    } 
    });

    // 暂时不能启用因为这个位置的功能需要具有https的设置网站才可以
    // getPosition();


const goToDetails = (category,post_id) =>{
    console.log('进入分类信息')
    // const info = funcs.getcategory(config.category,category)
    // console.log('info',info)
    // var detail_url = funcs.extractCategory(info.url)
    
    const detail_url = '/'+category + '_detail/'+ post_id
    console.log('detail',detail_url)
    router.push(detail_url)
}



</script>
     
<style>

</style>