<template>

  <div class="categroy" >
 <div class="icon-container">
    <van-icon name="search" class="icon" color="#1989fa" ></van-icon>
    <div class="content">
      
      <div  class="your-div-content">
        生活服务
      </div>
    </div>
  </div>
  <!-- <div class="flex-container">
    <div v-for="item in category[0]" :key="item.id" class="flex-item pointer" @click="router.push(item.url)">
      {{ item.text }}    
    </div> -->

    <div class="flex-container">
      <a
        v-for="item in category[0]"
        :key="item.id"
        :href="item.url"
        class="flex-item pointer"
      >
        {{ item.text }}
      </a>
   </div>
  </div>
<!-- </div> -->

<div class="categroy">
  <div class="icon-container">
    <van-icon name="search" class="icon" color="red"></van-icon>
    <div class="content">
      
      <div class="your-div-content">
        教育培训
      </div>
    </div>
  </div>
  <div class="flex-container">
    <a
        v-for="item in category[1]"
        :key="item.id"
        :href="item.url"
        class="flex-item pointer"
      >
        {{ item.text }}
      </a>
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
    <a
        v-for="item in category[2]"
        :key="item.id"
        :href="item.url"
        class="flex-item pointer"
      >
        {{ item.text }}
      </a>
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
    <a
        v-for="item in category[3]"
        :key="item.id"
        :href="item.url"
        class="flex-item pointer"
      >
        {{ item.text }}
      </a>
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
    <a
        v-for="item in category[4]"
        :key="item.id"
        :href="item.url"
        class="flex-item pointer"
      >
        {{ item.text }}
      </a>
  </div>
</div>

<div style="" class="categroy">
  <div class="icon-container">
    <van-icon name="search" class="icon" color="blue"></van-icon>
    <div class="content">
      
      <div class="your-div-content">
        汽车服务
      </div>
    </div>
  </div>
  <div class="flex-container">
    <a
        v-for="item in category[5]"
        :key="item.id"
        :href="item.url"
        class="flex-item pointer"
      >
        {{ item.text }}
      </a>
  </div>
</div>

<div style="" class="categroy">
  <div class="icon-container">
    <van-icon name="search" class="icon" color="blue"></van-icon>
    <div class="content">
      
      <div class="your-div-content">
        法律金融
      </div>
    </div>
  </div>
  <div class="flex-container">
    <a
        v-for="item in category[6]"
        :key="item.id"
        :href="item.url"
        class="flex-item pointer"
      >
        {{ item.text }}
      </a>
  </div>
</div>


<div style="" class="categroy">
  <div class="icon-container">
    <van-icon name="search" class="icon" color="blue"></van-icon>
    <div class="content">
      
      <div class="your-div-content">
        运动娱乐
      </div>
    </div>
  </div>
  <div class="flex-container">
    <a
        v-for="item in category[7]"
        :key="item.id"
        :href="item.url"
        class="flex-item pointer"
      >
        {{ item.text }}
      </a>
  </div>
</div>


<div style="margin-bottom: 150px;" class="categroy">
  <div class="icon-container">
    <van-icon name="search" class="icon" color="blue"></van-icon>
    <div class="content">
      
      <div class="your-div-content">
        商品销售
      </div>
    </div>
  </div>
  <div class="flex-container">
    <a
        v-for="item in category[8]"
        :key="item.id"
        :href="item.url"
        class="flex-item pointer"
      >
        {{ item.text }}
      </a>
  </div>
</div>


</template>

<script setup>
import { ref, onMounted, computed,reactive ,onActivated} from 'vue';
import { useRouter,useRoute } from 'vue-router'
import config from '@/global.config.js'
const router = useRouter()
const route = useRoute()
const keyword = ref('')

// 这个配置统一在global.config.js里了
const category = config.category



</script>

<style scoped>

.pointer {
  cursor: pointer;
}

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
  overflow: hidden;
  padding:5px;
  margin-bottom: 5px; 
  white-space: nowrap; /* 确保文本内容不会换行 */
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