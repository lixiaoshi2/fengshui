<template>


<div  class="categroy" v-for="item in category2" :key="item.id"  >
  
 <div v-if="item.isparent" class="icon-container">
    <van-icon name="search" class="icon" color="#1989fa" ></van-icon>
    <div class="content">
      
      <div  class="your-div-content">
        {{ item.name }}
      </div>
    </div>
  </div>  
  
    <div v-if="!item.isparent" class="flex-item" @click="get_category(item.name,item.api_url)">
      {{ item.name }}
    </div>

</div>

</template>

<script setup>

import { ref, onMounted, computed,reactive } from 'vue';
import { useRouter,useRoute } from 'vue-router'
import https from '@/utils/request.js';
const router = useRouter()
const route = useRoute()

const category2 = ref([])
const container_html='<div  class="flex-container">'
const container_html_close='</div>'


// 获取分类名后，保存到浏览器
const get_category = (name,api_url)=>{
  localStorage.setItem("category_name",name)
  localStorage.setItem("category_api_url",api_url)
  let appname2 = api_url
  if (appname2!==null){
    
    var a = appname2.indexOf("/",3);
    appname2 = appname2.slice(a+1)
    a = appname2.indexOf("/");
    appname2 = appname2.slice(0,a)
    // console.log(appname2.slice(a+1));
    console.log('a',appname2)
    localStorage.setItem('appname',appname2)
    
  }
  else{
    alert('请先选择分类')
  }
  // localStorage.setItem("appname",api_url)
  console.log(route)
  // router.go(-1)
  router.push('/post_info/')
}

onMounted(() => {

  https.get('/api/category/list/').then(response => {
  // https.get(('/api/hotel/hotel/2/')).then(response => {
    console.log('asdfas555111');
    console.log(response);
    console.log(response[0])
    category2.value = response
  

  }).catch(error => {
    console.log('出错了2');
    console.error(error);
    showToast('请重新登录');
  });

});

</script>


<style  scoped>

.search-bar {
  display: flex;
  align-items: center;
  padding: 0px;
  background-color: #fff;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.2);
}

.search-icon {
  font-size: 20px;
  margin-right: 0px; /* 调整图标和输入框之间的间距 */
}

.flex-container {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  margin-top: 5px;
  margin-left: 10px;

  
}
.category {
  margin-bottom: 6px;
  font-size: smaller;
}
.your-div-content {
    font-size: smaller;
}
.flex-item {
  flex: 0 0 20%; /* flex-grow: 1; flex-shrink: 0; flex-basis: 23%; */
  text-align: center;
  padding: 5px;
  margin-bottom: 5px; 
  font-size: smaller;
}

.flex-container:after {
  content: "";
  flex: auto;
}
.your-div-content{
  font-weight: bold;
}
.icon-container {
  display: flex;
  align-items: center;
  margin-left:10px ;
  margin-top: 10px;
}

.icon {
  font-size: 20px;
  margin-right: 10px;
}
</style>