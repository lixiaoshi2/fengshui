
<template>
  

  <van-nav-bar title="选择需服务位置" left-text="返回"  @click-left="router.go(-1)" left-arrow>
    <template #right>
     
      <van-icon name="question-o" size="18" @click="showImage = true" />
    </template>
  </van-nav-bar>

  
   <!-- 弹出图片窗口 -->
   <van-popup v-model:show="showImage" position="center" closeable round>
    <img
      src="/images/help2/choose_house.jpg"
      alt="帮助图片"
      style="max-width: 90vw; max-height: 80vh; border-radius: 8px"
    />
   </van-popup>


  <div class="p-4 min-h-screen bg-gray-100">
    <div style="margin-bottom: 50px;" class="mt-8"  @click="addHouse">
      <button  class="w-full p-3 text-white bg-blue-500 rounded-md">
        新增需服务位置
      </button>  
      
    </div>
   
    <div v-if="houses.length === 0" class="text-center text-gray-500">
      您还没有添加任何房源。
    </div>

    <div v-else class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="(house, index) in houses" :key="index" class="p-4 bg-white shadow-md rounded-lg">
        <h2 class="text-lg font-semibold text-gray-800 truncate">{{ house.city }} {{ house.houseaddr }}</h2>
        <div class="mt-2 flex justify-between">
          <button @click="choose(house.id,house.houseaddr,house.latitude,house.longitude,house.city,house.price,house.beizhu,house.owner,house.phone)" class="text-blue-500 hover:underline">选择</button>
          <button @click="viewDetails(house.id)" class="text-blue-500 hover:underline">详情</button>
          <button @click="editHouse(house.id)" class="text-green-500 hover:underline">修改</button>
          <button @click="deleteHouse(house.id,index)" class="text-red-500 hover:underline">删除</button>
        </div>
      </div>
    </div>

    <div style="margin-bottom: 50px;" class="mt-8"  @click="addHouse">
      <button  class="w-full p-3 text-white bg-blue-500 rounded-md">
        新增需服务位置
      </button>  
      
    </div>


  </div>



  

</template>

<script setup>
import axios from 'axios';
import config from '@/global.config.js'
import md5 from 'js-md5'
// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';
import funcs from '@/utils/common_func.js';
import report from '../../components/report.vue';
// import { useStore } from 'vuex'
import { showToast, showDialog } from 'vant';
import { ref, onMounted, computed,reactive } from 'vue';

import { useRouter,useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const router = useRouter()
const route = useRoute()
const showImage = ref(false)

const houses = ref([]);





const choose = (id, houseaddr, latitude, longitude, city, price, beizhu,owner,phone) => {
  localStorage.setItem('house_id', id)
  localStorage.setItem("houseaddr", houseaddr)
  localStorage.setItem("latitude", latitude)
  localStorage.setItem("longitude", longitude)
  localStorage.setItem("city", city)
  localStorage.setItem("price", price)
  localStorage.setItem("beizhu", beizhu)
  localStorage.setItem("owner", owner)
  localStorage.setItem("phone", phone)
  // router.push(`/housedetail/${id}`);
  router.go(-1)
};


const addHouse = () => {
  const city = localStorage.getItem("selectedCity");

  if (city) {
    // 如果city存在，删除该设置
    localStorage.removeItem("selectedCity");
    console.log("selectedCity has been removed.");
  } else {
    console.log("No selectedCity found.");
  }
  router.push("/addHouse"); // 跳转到 /fangyuan 路由
}

const viewDetails = (id) => {

  router.push(`/housedetail/${id}`);
};

const editHouse = (id) => {
  router.push(`houseupdate/${id}`);
};


const deleteHouse = async (id,index) => {
  if (confirm("确定要删除这个房源吗？")) {

    try {
      https.delete(`api/minsubaojie/housedel/${id}/`);
      houses.value.splice(index, 1);
      alert("房源已删除！");

      
    } catch (error) {
      console.error("删除房源失败：", error);
    }
  }
};




onMounted(() => {
  console.log('进入chooseHouse的onMounted')
  https.get(('/api/minsubaojie/houselist/')).then(response => {
      console.log('asdfas555111');
      console.log(response);
      houses.value = response
    }).catch(error => {
      console.log('出错了2');
      console.error(error);
      showToast('请重新登录');
    });


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
:deep(p){
  line-height: 35px;
}

</style>