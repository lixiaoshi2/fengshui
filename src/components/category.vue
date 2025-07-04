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
  
   
  <!-- <div  class="flex-container">
    <div v-if="!item.isparent" class="flex-item" @click="get_category(item.name,item.api_url)">
      {{ item.name }}
    </div>
  </div> -->
  
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
// const category = [
// [
//     // 生活服务类
//         { id: 100, text: '家庭厨房' ,url:'/hotel_list/'},
//         { id: 101, text: '家庭旅馆',url:'/hotel_list/' },
//         { id: 102, text: '开锁服务' ,url:'/hotel_list/'},
//         { id: 103, text: '保洁服务' ,url:'/hotel_list/'},
//         // ... 更多生活服务子分类
// ],
// [      //教育培训
//     { id: 200, text: '科学培训' ,url:'/hotel_list/'},
//     { id: 201, text: '艺术培训',url:'/hotel_list/' },
//     { id: 202, text: '体育培训' ,url:'/api/hotel/list2/'},
//     { id: 203, text: '棋类培训' ,url:'/api/hotel/list2/'},
//     { id: 204, text: '成人教育' ,url:'/api/hotel/list2/'},
// ],
// [      //旅居服务
//     { id: 300, text: '家庭旅馆' ,url:'/api/hotel/list2/'},
//     { id: 301, text: '拼车服务' ,url:'/api/hotel/list2/'},
//     { id: 302, text: '接送服务' ,url:'/api/hotel/list2/'},
//     { id: 303, text: '包车服务' ,url:'/api/hotel/list2/'},
//     { id: 304, text: '回国带物',url:'/api/hotel/list2/' },
// ],[      //美食服务
//     { id: 300, text: '家庭厨房' ,url:'/api/hotel/list2/'},
//     { id: 301, text: '火锅美食' ,url:'/api/hotel/list2/'},
//     { id: 302, text: '自助餐' ,url:'/api/hotel/list2/'},
//     { id: 302, text: '小吃类' ,url:'/api/hotel/list2/'}, 
// ]
      
// ]

// 获取分类名后，保存到浏览器
const get_category = (name,api_url)=>{
  localStorage.setItem("category_name",name)
  localStorage.setItem("category_api_url",api_url)
  console.log(route)
  router.go(-1)
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