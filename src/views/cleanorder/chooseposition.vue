<template>
  <van-nav-bar title="点击选择服务所在位置" left-text="返回" @click-left="router.go(-1)" left-arrow>
    <template #right>

      <van-icon name="question-o" size="18" @click="showImage = true" />
    </template>
  </van-nav-bar>

  <!-- 弹出图片窗口 -->
  <van-popup v-model:show="showImage" position="center" closeable round>
    <img src="/images/help2/chooseposition.jpg" alt="帮助图片"
      style="max-width: 90vw; max-height: 80vh; border-radius: 8px" />
  </van-popup>



  <div id="app">

    <div class="flex items-center justify-center p-4">
      <input type="text" v-model="address" placeholder="请输入地址将地图定位到附近"
        class="border border-gray-300 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button @click="searchLocation"
        class="text-sm ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
        搜索
      </button>
      <div class="text-sm font-semibold text-red-500 bg-gray-100 p-4 rounded-md text-center mx-auto w-full max-w-2xl">
        点击服务所在位置，出现图标后即完成定位，点击返回
      </div>
    </div>


    <!-- <button @click="searchNearby">搜索</button> -->

    <div id="map" style="width: 100%; height: 500px;"></div>
  </div>



  <div class="text-lg font-semibold text-red-500 bg-gray-100 p-4 rounded-md text-center mx-auto w-full max-w-2xl">
    点击服务所在位置，出现图标后即完成定位，点击返回
  </div>

  {{ message }}


  <!-- <button @click="router.go(-1)" -->
  <button @click="gonext"
    class="w-4/5 fixed bottom-20 left-1/2 transform -translate-x-1/2 px-2 py-2 bg-blue-500 text-white text-sm font-medium rounded-md shadow-md hover:bg-blue-600 transition duration-300">
    出现位置图标后(已成功)点击返回
  </button>

</template>

<script setup>
import axios from 'axios';
import config from '@/global.config.js'
import md5 from 'js-md5'
// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';
import { cityCoordinates } from '@/utils/cityCoordinates .js';
import funcs from '@/utils/common_func.js';
import report from '../../components/report.vue';
import { useStore } from 'vuex'
import { showToast, showDialog } from 'vant';
import { ref, onMounted, computed, reactive, nextTick } from 'vue';

import { useRouter, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const router = useRouter()
const route = useRoute()
let city = ref('')

let map = null;
let marker = null; // 用于存储单个标注点
let geocoder = null;
let service = null;

const message = ref('');
const apiKey = '3ROBZ-6G6CL-GKEPX-MWLTN-AAC72-QAB4G';
const address = ref("");  // 输入的地址
const showImage = ref(false)
const initMap = () => {
  // if (document.getElementById('qqMapScript')) return; // 防止多次加载脚本

  const script = document.createElement('script');
  script.id = 'qqMapScript';
  // script.src = 'https://map.qq.com/api/gljs?v=1.exp&key=3ROBZ-6G6CL-GKEPX-MWLTN-AAC72-QAB4G';
  script.src = `https://map.qq.com/api/gljs?v=1.exp&key=${apiKey}`;
  console.log("src22:",`https://map.qq.com/api/gljs?v=1.exp&key=${apiKey}`)
  
  script.onload = loadMap;
  document.head.appendChild(script);

};

// 
const gonext = () =>{
  localStorage.setItem('ischoosed',1)
  alert("有位置图标，表明您已成功选择服务位置，返回后请继续")
  router.go(-1);

}

// 地图初始化函数
const loadMap = () => {

  city.value = localStorage.getItem("selectedCity")
  const coordinates = cityCoordinates[city.value];
  console.log("jingdu,jingdu,weidu", coordinates)

  map = new window.qq.maps.Map(document.getElementById('map'), {
    // center: new window.qq.maps.LatLng(latitude.value, longitude.value), // 设置地图中心（广州）
    center: new window.qq.maps.LatLng(coordinates.lat, coordinates.lng), // 设置地图中心（广州）
    zoom: 15, // 设置缩放级别
  });

 

  geocoder = new qq.maps.Geocoder({
    complete: function (result) {
      const location = result.detail.location; // 获取经纬度
      console.log("地址的经纬度：", location);
      
      // 将地图定位到该经纬度
      map.panTo(location);

      // 如果已存在标记，则移除
      if (marker) {
        marker.setMap(null);
      }

      // 创建新的标记
      marker = new qq.maps.Marker({
        position: location,
        map: map,
      });
    },
    error: function (error) {
    console.error('错误：', error);
  },
  });


  service = new qq.maps.SearchService({
    complete: function(results) {
      if (results.detail?.pois?.length > 0) {
        console.log("正确加载")
        const firstResult = results.detail.pois[0];
        const latLng = new qq.maps.LatLng(firstResult.latLng.lat, firstResult.latLng.lng);

        if (marker) marker.setMap(null);

        marker = new qq.maps.Marker({ position: latLng, map });
        map.panTo(latLng);
        message.value = `找到地址：${firstResult.name}`;
      } else {
        alert('未找到相关位置，请重新输入。');
      }
    },
    error: function(error) {
      console.error('搜索失败', error);
      alert('搜索失败，请稍后重试。');
    },
  });


  // 监听地图点击事件，获取经纬度
  qq.maps.event.addListener(map, 'click', function (event) {
    const lat = event.latLng.getLat();
    const lng = event.latLng.getLng();

    // message.value = `正在获取地址名称...`;
    // 如果已有标注点，先删除它
    if (marker) {
      marker.setMap(null);
    }

    // // 创建新标注点
    marker = new qq.maps.Marker({
      position: new qq.maps.LatLng(lat, lng),
      map: map,
    });
    // lat = lat.substr(0,14)
    localStorage.setItem('lat', lat.toFixed(8))
    localStorage.setItem('lng', lng.toFixed(8))

    // alert("您已选中您的需服务的位置，可以点击返回了")
  
  
  });


};

// // ✅ 搜索地址功能

const fetchLocation = async () => {
      
      console.log("city22",city.value)
      const url = `/map/ws/place/v1/search?boundary=region(${city.value},0)&keyword=${encodeURIComponent(address.value)}&page_size=20&page_index=1&key=${apiKey}`;
      // const url = `https://apis.map.qq.com/map/ws/place/v1/search?boundary=region(${city.value},0)&keyword=${encodeURIComponent(address.value)}&page_size=20&page_index=1&key=${apiKey}`;
      console.log("url",url)


      try {
        
        const response = await axios.get(url);
        console.log('response',response.data.data[0].location)
      
        if (response.data.status === 0 && response.data.data.length > 0) {

          const lat = response.data.data[0].location.lat
          const lng = response.data.data[0].location.lng
          const coordinates = response.data.data[0].location
          // const location = new TMap.LatLng(lat, lng);
          map.setCenter(new window.qq.maps.LatLng(coordinates.lat, coordinates.lng));
         

        } else {
          alert('未找到相关位置');
        }
      } catch (error) {
        console.error('获取位置失败:', error);
        alert('获取位置失败');
      }
    };

const searchLocation = () => {
  const searchAddress = address.value.trim();
  if (!searchAddress) {
    alert('请输入地址');
    return;
  }

  fetchLocation()

  



  
};





// 测试


// 测试结束







onMounted(() => {
  city.value = localStorage.getItem("city")
  console.log('city', city)
  // getLatLnt(city)

  initMap();




  

});
////////////////////////////////////////////////////// 原来代码结束


</script>

<style scoped>
.map-container {
  height: 600px;
  /* 高度至少为 400px */
  width: 100%;
}
</style>

