
<template>
  <van-nav-bar title="小萝卜保洁" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
    <template #title>
      <label class="block text-lg font-medium text-gray-700">小萝卜保洁</label>
    </template>
  </van-nav-bar>


  <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-6 text-center">编辑保洁员信息</h1>

    <form @submit.prevent="updateCleaner">
      <!-- 文字信息编辑 -->
      <div class="space-y-4">

        <!-- 测试省市选择 -->
        <div class="mb-4">
          <label class="block text-lg font-medium text-gray-700">选择省份：</label>
          <select v-model="selectedProvince" @change="updateCities" class="w-full mt-2 p-2 border rounded-md">
            <option value="" disabled>请选择省份</option>
            <option v-for="(cities, province) in cityData" :key="province" :value="province">{{ province }}</option>
          </select>
        </div>

        <div class="mb-4" v-if="selectedProvince">
          <label class="block text-lg font-medium text-gray-700">选择地级市：</label>
          <select v-model="selectedCity" class="w-full mt-2 p-2 border rounded-md">
            <option value="" disabled>请选择城市</option>
            <option v-for="city in cityData[selectedProvince]" :key="city">{{ city }}</option>
          </select>
        </div>

        <p v-if="selectedCity">您选择了： {{ selectedCity }}</p>



        <!-- 测试省市选择 -->



        <div class="mb-4">
          <label @click="choosePosition" class="block text-lg font-medium text-gray-700">地图位置：

            <button type="button" @click="choosePosition"
              class="px-2 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">点击选择</button>
          </label>
          <input style="display: none;" type="text" @click="choosePosition" v-model="form.latitude"
            placeholder="请在地图上选择" class="w-full mt-2 p-2 border rounded-md" />
        </div>
        <div style="display: none;" class="mb-4">
          <label class="block text-lg font-medium text-gray-700">纬度：(点击选择)</label>
          <input type="text" @click="choosePosition" v-model="form.longitude" placeholder="请在地图上选择"
            class="w-full mt-2 p-2 border rounded-md" />
        </div>
        <div>
          <label style="display: none;" class="block font-semibold text-gray-700">姓名：</label>
          <input v-model="cleaner.name" type="text"
            class="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label class="block font-semibold text-gray-700">电话：</label>
          <input v-model="cleaner.phone" type="text"
            class="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
        <label for="category" class="block font-medium mb-1">分类：
          <span class="text-sm text-gray-500">(如果您是专业保洁、维修、防水、装修请选“专业类工作”，其他选择“一般家政保姆”)</span>
        </label>
        <select v-model="cleaner.category" id="category" required
          class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300">
          <option value="专业类工作">专业类工作</option>
          <option value="一般保洁保姆">一般保洁保姆</option>
        </select>
      </div>

        <div>
          <label class="block font-semibold text-gray-700">微信：</label>
          <input v-model="cleaner.weixin" type="text"
            class="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label class="block font-semibold text-gray-700">地址：</label>
          <input v-model="cleaner.addr" type="text"
            class="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <!-- <div>
          <label class="block font-semibold text-gray-700">城市：</label>
          <input v-model="cleaner.city" type="text"
            class="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div> -->
        <div>
          <label class="block font-semibold text-gray-700">备注：</label>
          <textarea v-model="cleaner.beizhu"
            class="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
        </div>
      </div>

      <!-- 图片上传部分 -->
      <div class="mt-8 space-y-6">

        <div data-v-8b3361b8="" class="flex flex-col items-center">
          <label data-v-8b3361b8="" class="block font-semibold">生活或是工作照(可无)：</label>
          <div v-if="!cleaner.id_card_front"
            class="w-full max-w-md h-40 flex items-center justify-center border border-gray-300 rounded-lg mb-2 bg-gray-100 text-gray-500">
            无图片，请上传生活或是工作照
          </div>
          <img v-else data-v-8b3361b8="" :src="cleaner.id_card_front" alt="生活或是工作照"
            class="w-full max-w-md rounded-lg border border-gray-300 mb-2">
          <input data-v-8b3361b8="" type="file" class="w-full" @change="onFileChange($event, 'id_card_front')">
        </div>



        <div data-v-8b3361b8="" class="flex flex-col items-center">
          <label data-v-8b3361b8="" class="block font-semibold">资质等(可无)：</label>
          <div v-if="!cleaner.id_card_back"
            class="w-full max-w-md h-40 flex items-center justify-center border border-gray-300 rounded-lg mb-2 bg-gray-100 text-gray-500">
            无图片，请上传资质等相关照片
          </div>
          <img v-else data-v-8b3361b8="" :src="cleaner.id_card_back" alt="资质等"
            class="w-full max-w-md rounded-lg border border-gray-300 mb-2">
          <input data-v-8b3361b8="" type="file" class="w-full" @change="onFileChange($event, 'id_card_back')">
        </div>


        <div data-v-8b3361b8="" class="flex flex-col items-center">
          <label data-v-8b3361b8="" class="block font-semibold">资质等(可无)：</label>
          <div v-if="!cleaner.health_certificate"
            class="w-full max-w-md h-40 flex items-center justify-center border border-gray-300 rounded-lg mb-2 bg-gray-100 text-gray-500">
            无图片，请上传资质等相关照片
          </div>
          <img v-else data-v-8b3361b8="" :src="cleaner.health_certificate" alt="资质等"
            class="w-full max-w-md rounded-lg border border-gray-300 mb-2">
          <input data-v-8b3361b8="" type="file" class="w-full" @change="onFileChange($event, 'health_certificate')">
        </div>


      </div>

      <!-- 提交按钮 -->
      <div style="margin-bottom: 50px;" class="mt-8 text-center">
        <button type="submit"
          class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          更新家政信息
        </button>
      </div>
    </form>
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
import { useStore } from 'vuex'
import { showToast, showDialog } from 'vant';
import { ref, onMounted, computed,reactive ,watch} from 'vue';
import textEditor  from "@/components/textEditor.vue"  
import weizhi from '@/components/weizhi.vue'
import { useRouter,useRoute } from 'vue-router'
import {cityData} from '@/utils/cityData.js';
import { useHead } from '@vueuse/head'

const router = useRouter()
const route = useRoute()

// const cleaner = ref({})

const cleaner = ref({});

const updatedFiles = ref({
  id_card_front: null,
  id_card_back: null,
  health_certificate: null,
});


var form = ref({
  latitude: '',
  longitude: '',
  weixin: '',
  beizhu: '',
  name: '',
  phone: '',
  addr: '',
  city: '',

});

const onFileChange = (event, field) => {
  const file = event.target.files[0];
  if (file) {
    updatedFiles.value[field] = file;
    cleaner.value[field] = URL.createObjectURL(file); // 实时预览新图片
  }
};


// 这是省市选择器

const selectedProvince = ref('');
const selectedCity = ref('');

const updateCities = () => {
  selectedCity.value = '';
};

// 监听城市选择变化
watch(selectedCity, (newCity) => {
  if (newCity) {
    localStorage.setItem('selectedCity', newCity);
    console.log(`已保存到localStorage: ${newCity}`);
  }
});

// 省市选择器

const updateCleaner = async () => {
  try {
    const formData = new FormData();
    for (const [key, value] of Object.entries(cleaner.value)) {
      if (key === 'city') {
        // 使用 selectedCity 替换 city 数据
        formData.append('city', selectedCity.value);
      } else {
        formData.append(key, value);
      }
      // if (key =='category'){
      //   formData.append("category",form.category)
      // }
    }
    for (const [key, file] of Object.entries(updatedFiles.value)) {
      if (file) {
        formData.append(key, file);
      }

    }

    console.log('category',cleaner.value.category)
    console.log("formData",formData)
    await https.put3("/api/minsubaojie/profileupdate/", formData  );
    alert("保洁员信息更新成功！");
    router.push("/myprofile")
  } catch (error) {
    console.error("更新保洁员信息失败", error);
    alert("更新失败，请重试！");
  }
};





// 选择房源位置
const choosePosition = ()=>{
  console.log('选择位置')
  router.push("/chooseposition"); // 跳转到 /fangyuan 路由
}



onMounted(() => {

  form.value.latitude = localStorage.getItem('lat');
  form.value.longitude = localStorage.getItem('lng');
  // console.log('lat',lat)

  https.get(('/api/minsubaojie/myprofile/')).then(response => {
     
     console.log(response);

     cleaner.value = response
     selectedCity.value = response.city

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