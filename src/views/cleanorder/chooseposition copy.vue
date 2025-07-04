<template>
  <van-nav-bar title="地图上选择地址" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>



  <div id="app">
    <input type="text" id="searchInput" placeholder="请输入地址" />
    <button @click="searchLocation">搜索</button>

    <div id="map" style="width: 100%; height: 500px;"></div>
  </div>



  <div class="text-lg font-semibold text-red-500 bg-gray-100 p-4 rounded-md text-center mx-auto w-full max-w-2xl">
    请在地图上点击您所在位置
  </div>

  {{ message }}


  <button @click="router.go(-1);"
    class="fixed bottom-20 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md shadow-md hover:bg-blue-600 transition duration-300">
    返回
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


let map = null;
let marker = null; // 用于存储单个标注点
let geocoder = null;
let service = null;

const message = ref('');



const initMap = () => {
  // if (document.getElementById('qqMapScript')) return; // 防止多次加载脚本

  const script = document.createElement('script');
  script.id = 'qqMapScript';
  script.src = 'https://map.qq.com/api/gljs?v=1.exp&key=3ROBZ-6G6CL-GKEPX-MWLTN-AAC72-QAB4G';
 
  script.onload = loadMap;
  document.head.appendChild(script);

};


// 地图初始化函数
const loadMap = () => {

  const city = localStorage.getItem("selectedCity")
  const coordinates = cityCoordinates[city];
  console.log("jingdu,jingdu,weidu", coordinates)

  map = new window.qq.maps.Map(document.getElementById('map'), {
    // center: new window.qq.maps.LatLng(latitude.value, longitude.value), // 设置地图中心（广州）
    center: new window.qq.maps.LatLng(coordinates.lat, coordinates.lng), // 设置地图中心（广州）
    zoom: 11, // 设置缩放级别
  });

  // 初始化 Geocoder 实例
  geocoder = new qq.maps.Geocoder({
    complete: function (result) {
      const address = result.detail.address; // 获取地址名称
      message.value = `地址名称：${address}`;
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
    // console.log(`点击位置的经纬度：纬度 ${lat}, 经度 ${lng}`);
    // alert(`点击位置的经纬度：纬度 ${lat}, 经度 ${lng}`);

    // 调用 Geocoder 进行逆地理编码
    const latLng = new qq.maps.LatLng(lat, lng);
    geocoder.getAddress(latLng);

  });


};

// ✅ 搜索地址功能
const searchLocation = () => {
  const searchInput = document.getElementById('searchInput').value.trim();
  if (!searchInput) {
    showToast('请输入地址');
    return;
  }

  // 确保 service 已经初始化
  if (!service) {
    showToast('地图服务未正常加载');
    return;
  }

  // 使用 search 方法的正确回调方式
  service.search(searchInput, {
    complete: function(results) {
      console.log("搜索结果:", results);

      if (results.detail && results.detail.pois && results.detail.pois.length > 0) {
        const firstResult = results.detail.pois[0];
        const latLng = new qq.maps.LatLng(firstResult.latLng.lat, firstResult.latLng.lng);

        // 清除之前的标记
        if (marker) {
          marker.setMap(null);
        }

        // 创建新标记
        marker = new qq.maps.Marker({ 
          position: latLng, 
          map: map 
        });

        // 地图中心移动到该位置
        map.panTo(latLng);

        // 更新消息
        message.value = `找到地址：${firstResult.name}`;

        // 可选：保存经纬度到本地存储
        localStorage.setItem('lat', firstResult.latLng.lat.toFixed(8));
        localStorage.setItem('lng', firstResult.latLng.lng.toFixed(8));
      } else {
        showToast('未找到相关位置，请重新输入');
      }
    },
    error: function(error) {
      console.error('搜索失败', error);
      showToast('搜索失败，请稍后重试');
    }
  });
};





onMounted(() => {
  const city = localStorage.getItem("city")
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

