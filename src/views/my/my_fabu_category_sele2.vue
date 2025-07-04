<template>
    <!-- <weizhi v-model:fieldValue="weizhizhi" ref="weizhiref" ></weizhi> -->
    <van-nav-bar title="邻家网 - 分类选择" left-text="返回" @click=" router.go(-1);" left-arrow>
        <template #right>
        <van-icon name="search" size="18" />
        </template>
    </van-nav-bar>
    
   
    <!-- <van-field v-model="text" label="全站查找" placeholder="请输入要查询的关键字" /> -->
    <div class="categroy" >
 <div class="icon-container">
    <van-icon name="search" class="icon" color="#1989fa" ></van-icon>
    <div class="content">
      
      <div  class="your-div-content">
        生活服务
      </div>
    </div>
  </div>
  <div class="flex-container">
    <div v-for="item in category[0]" :key="item.id" class="flex-item clickable" @click="to_post_url(item.text,item.api_url, item.post_url)">
      {{ item.text }}
    </div>
  </div>
</div>

<div class="categroy">
  <div class="icon-container">
    <van-icon name="search" class="icon" color="red"></van-icon>
    <div class="content">
      
      <div class="your-div-content">
        教育培训
      </div>
    </div>
  </div>
  <!-- get_category(item.name,item.api_url) post_info -->
  <div class="flex-container">  
    <!-- 这里的 category[2]是大的分类名，从大的分类名获取小的分类名-->
    <div v-for="item in category[1]" :key="item.id" @click="to_post_url(item.text,item.api_url, item.post_url)" class="flex-item  clickable">
      {{ item.text }}

    </div>
  </div>
</div>

<div class="categroy">
  <div class="icon-container">
    <van-icon name="search" class="icon" color="green"></van-icon>
    <div class="content">
      
      <div class="your-div-content">
        旅居服务
      </div>
    </div>
  </div>
  <div class="flex-container">
    <!-- 这里的 category[2]是大的分类名，从大的分类名获取小的分类名-->
    <div v-for="item in category[2]" :key="item.id" class="flex-item  clickable" @click="to_post_url(item.text,item.api_url, item.post_url)" >
      {{ item.text }}
    </div>
  </div>
</div>

  <div class="categroy">
  <div class="icon-container">
    <van-icon name="search" class="icon" color="blue"></van-icon>
    <div class="content">
      
      <div class="your-div-content">
        美食服务
      </div>
    </div>
  </div>
  <div class="flex-container">
    <div v-for="item in category[3]" :key="item.id" class="flex-item  clickable" @click="to_post_url(item.text,item.api_url, item.post_url)" >
      {{ item.text }}
    </div>
  </div>
</div>

<div class="categroy">
  <div class="icon-container">
    <van-icon name="search" class="icon" color="blue"></van-icon>
    <div class="content">
      
      <div class="your-div-content">
        家居装修
      </div>
    </div>
  </div>
  <div class="flex-container">
    <div v-for="item in category[4]" :key="item.id" class="flex-item  clickable" @click="to_post_url(item.text,item.api_url, item.post_url)" >
      {{ item.text }}
    </div>
  </div>
</div>
   

<div class="categroy">
  <div class="icon-container">
    <van-icon name="search" class="icon" color="blue"></van-icon>
    <div class="content">
      
      <div class="your-div-content">
        汽车相关
      </div>
    </div>
  </div>
  <div class="flex-container">
    <div v-for="item in category[5]" :key="item.id" class="flex-item  clickable" @click="to_post_url(item.text,item.api_url, item.post_url)" >
      {{ item.text }}
    </div>
  </div>
</div>


<div class="categroy">
  <div class="icon-container">
    <van-icon name="search" class="icon" color="blue"></van-icon>
    <div class="content">
      
      <div class="your-div-content">
        法律金融
      </div>
    </div>
  </div>
  <div class="flex-container">
    <div v-for="item in category[6]" :key="item.id" class="flex-item  clickable" @click="to_post_url(item.text,item.api_url, item.post_url)" >
      {{ item.text }}
    </div>
  </div>
</div>


<div class="categroy">
  <div class="icon-container">
    <van-icon name="search" class="icon" color="blue"></van-icon>
    <div class="content">
      
      <div class="your-div-content">
        运动娱乐
      </div>
    </div>
  </div>
  <div class="flex-container">
    <div v-for="item in category[7]" :key="item.id" class="flex-item  clickable" @click="to_post_url(item.text,item.api_url, item.post_url)" >
      {{ item.text }}
    </div>
  </div>
</div>

<div class="categroy" style="margin-bottom: 60px;">
  <div class="icon-container">
    <van-icon name="search" class="icon" color="blue"></van-icon>
    <div class="content">
      
      <div class="your-div-content">
        平台自营
      </div>
    </div>
  </div>
  <div class="flex-container">
    <div v-for="item in category[8]" :key="item.id" class="flex-item  clickable" @click="to_post_url(item.text,item.api_url, item.post_url)" >
      {{ item.text }}
    </div>
  </div>
</div>
  

</template>
     
<script setup>
import { ref, watch, onMounted, defineEmits, defineProps } from 'vue';
import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
// import category2  from '@/components/category2.vue' 
import config from '@/global.config.js'
const category = config.category

// textname 是分类名,api_url是新增分类信息的地址，post_url是信息信息的页面，因为不同的
const to_post_url = (category_name,api_url, post_url) => {
    localStorage.setItem("category_name", category_name)
    localStorage.setItem("category_api_url", api_url)
    // localStorage.setItem("appname", api_url)
    let appname2 = api_url
    console.log('appname',appname2)
    if (appname2 !== null) {

        var a = appname2.indexOf("/", 3);
        appname2 = appname2.slice(a + 1)
        a = appname2.indexOf("/");
        appname2 = appname2.slice(0, a)
        // console.log(appname2.slice(a+1));
        console.log('a', appname2)
        localStorage.setItem('appname', appname2)

    }
    else {
        alert('请先选择分类')
    }
    // localStorage.setItem("appname",api_url)
    console.log(route)
    // router.go(-1)
    router.push(post_url)
}





</script>
     
<style scoped>
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
}
.flex-item {
  flex: 0 0 20%; /* flex-grow: 1; flex-shrink: 0; flex-basis: 23%; */
  text-align: center;
  padding: 5px;
  margin-bottom: 5px; 
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

.clickable {
            cursor: pointer;
}
</style>