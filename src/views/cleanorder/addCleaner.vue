
<template>
  <van-nav-bar title="新增家政人员" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
    <template #title>
      <label class="block text-lg font-medium text-gray-700">新增保洁阿姨</label>
    </template>
  </van-nav-bar>

  <!-- 将数据写在form里这样图片和数据可以一起上传 -->
  <div style="margin-bottom: 50px;" class="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-lg">
    <h3 class="text font-bold text-center mb-6">每个账户只能增加一个保洁人员！</h3>

    <form @submit.prevent="submitForm" class="space-y-6">

      <!-- 测试省市选择 -->
      <div class="mb-4">
        
        <label class="block text-lg font-medium text-gray-700">
          选择省份：
          <span class="text-sm text-gray-500">(先选择省市然后再选择地图位置)</span>
        </label>
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
          <button @click="choosePosition"
            class="px-2 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">点击选择
          </button> <label class="text-sm ml-3"> （获取： </label>
        </label>

        
      </div>

      <div style="display: none" class="mb-4">
        <label class="block text-lg font-medium text-gray-700">（）</label>
       
      </div>


      <div style="display: none" class="mb-4">
        <label class="block text-lg font-medium text-gray-700">纬度：(点击选择)</label>
        <input type="text" @click="choosePosition" v-model="form.longitude" placeholder="请在地图上选择"
          class="w-full mt-2 p-2 border rounded-md" />
      </div>

       <!-- 详细地址 -->
       <div>
        <label for="addr" class="block font-medium mb-1">大致地址：(输入县区及大致位置)</label>
        <input v-model="form.addr" id="addr" type="text" placeholder="请输入县区及大致位置" required
          class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
      </div>

      <!-- 姓名 -->
      <div>
        <label for="name" class="block font-medium mb-1">姓名：</label>
        <input v-model="form.name" id="name" type="text" placeholder="请输入姓名" required
          class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
      </div>

      <div>
        <label for="category" class="block font-medium mb-1">分类：
          <span class="text-sm text-gray-500">(如果您是寻求专业保洁、维修、防水、装修请选“专业类工作”，其他保洁、做饭、照顾人、代购、代取、宠物照看、上门理发灯邻里互助选择“一般保洁保姆”)</span>
        </label>
        <select v-model="form.category" id="category" required
          class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300">
          <option value="专业类工作">专业类工作</option>
          <option value="一般保洁保姆">一般保洁保姆</option>
        </select>
      </div>

      <!-- 性别 -->
      <div>
        <label class="block font-medium mb-1">性别：</label>
        <div class="flex items-center space-x-4">
          <label class="flex items-center">
            <input v-model="form.gender" type="radio" value="男" class="mr-2" />
            男
          </label>
          <label class="flex items-center">
            <input v-model="form.gender" type="radio" value="女" class="mr-2" />
            女
          </label>
        </div>
      </div>

      <!-- 年龄 -->
      <div>
        <label for="age" class="block font-medium mb-1">年龄：</label>
        <input v-model="form.age" id="age" type="number" placeholder="请输入年龄" required min="18" max="80"
          class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
      </div>

      <!-- 联系电话 -->
      <div>
        <label for="phone" class="block font-medium mb-1">联系电话：</label>
        <input v-model="form.phone" id="phone" type="tel" placeholder="请输入联系电话" required
          class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
      </div>

      <div>
        <label for="weixin" class="block font-medium mb-1">微信：</label>
        <input v-model="form.weixin" id="weixin" type="tel" placeholder="请输入微信" required
          class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
      </div>

      <div>
        <label for="beizhu" class="block font-medium mb-1">备注：(<span class="text-sm">请详细提供自己的工作内容 </span> )</label>
        <textarea v-model="form.beizhu" id="beizhu" placeholder="提供能够工作的时间，工作的内容，工资预期按小时算，以及特长" rows="3" required
          class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300 resize-none"></textarea>
      </div>


     

      <!-- 上传证件信息 -->
      <h3 class="text-lg font-semibold mt-8">上传个人及资质信息（可不上传，但有利于雇主的了解）</h3>
      <div v-for="(file, index) in files" :key="index" class="mt-4">
        <label :for="file.key" class="block font-medium mb-1">{{ file.label }}</label>
        <input :id="file.key" type="file" @change="handleFileChange($event, file.key)"
          class="w-full border border-gray-300 p-2 rounded-md" />
        <div v-if="file.preview" class="mt-2">
          <img :src="file.preview" alt="预览图" class="w-40 h-40 object-cover border rounded-md" />
        </div>
      </div>

      <!-- 提交按钮 -->
      <button type="submit" :disabled="uploading"
        class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50">
        {{ uploading ? '提交中...' : '提交' }}
      </button>

      <!-- 上传进度 -->
      <div v-if="uploading" class="text-center mt-4 text-gray-600">上传进度: {{ progress }}%</div>
    </form>
  </div>


  <!--    form提交结束 -->






</template>

<script setup>
// import axios from 'axios';
// import config from '@/global.config.js'
// import md5 from 'js-md5'
// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';
// import 
// import funcs from '@/utils/common_func.js';
// import report from '../../components/report.vue';
import { useStore } from 'vuex'
import { showToast, showDialog } from 'vant';
import { ref, onMounted, computed,reactive,watch } from 'vue';
// import textEditor  from "@/components/textEditor.vue"  
// import weizhi from '@/components/weizhi.vue'
import { useRouter,useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import {cityData} from '@/utils/cityData.js';

const router = useRouter()
const route = useRoute()

const ischoosed = ref('')

var form = ref({
  latitude: '',
  longitude: '',
  weixin: '',
  beizhu: '',
  name: '',
  phone: '',
  addr: '',
  city: '',
  gender:'',
  age:'',

});

const uploading = ref(false);
const progress = ref(0);

const files = ref([
  { key: 'id_card_front', label: '个人形象', file: null, preview: '' },
  { key: 'id_card_back', label: '资质1', file: null, preview: '' },
  { key: 'health_certificate', label: '资质2', file: null, preview: '' }
]);

const handleFileChange = (event, key) => {
  const file = event.target.files[0];
  const fileObj = files.value.find(f => f.key === key);
  if (file) {
    fileObj.file = file;
    fileObj.preview = URL.createObjectURL(file); // 生成临时预览图
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


// 选择房源位置
const choosePosition = ()=>{
  console.log('选择位置')
  localStorage.setItem("ischoosed",0)
  router.push("/chooseposition"); // 跳转到 /fangyuan 路由
}




const submitForm = async () => {

  const confirmSubmit = window.confirm('提交前请确认：如果已有数据，提交将会覆盖原有数据。是否继续？');
  
  if (!confirmSubmit) {
    alert('取消提交');
    return;
  }


  const formData = new FormData();
  formData.append('name', form.value.name);
  formData.append('phone', form.value.phone);
  formData.append('latitude', form.value.latitude);
  formData.append('longitude', form.value.longitude);
  formData.append('weixin', form.value.weixin);
  formData.append('beizhu', form.value.beizhu);
  formData.append('addr', form.value.addr);
  formData.append('phone', form.value.phone);
  // formData.append('city', form.value.city);
  formData.append('city', localStorage.getItem("selectedCity"));
  formData.append('gender', form.value.gender);
  formData.append('age', form.value.age);
  formData.append('category', form.value.category);

  files.value.forEach(fileObj => {
    if (fileObj.file) {
      formData.append(fileObj.key, fileObj.file);
    }
  });
  console.log('提交前的数据',formData)
  try {
    // uploading.value = true;
    const response = await https.post2('/api/minsubaojie/addcleaner/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        progress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      }
    });
    alert('提交成功！');
    console.log('上传成功返回的', response.data);

    // router.push({ name: 'myprofile' });
    router.push('/myprofile' );
  } catch (error) {
    console.error('提交失败', error);
    alert('提交失败，请稍后重试。');
  }
  //  finally {
  //   uploading.value = false;
  // }
};



onMounted(() => {

  form.value.latitude = localStorage.getItem('lat');
  form.value.longitude = localStorage.getItem('lng');
 ischoosed.value = localStorage.getItem('ischoosed');
  // console.log('lat',lat)
  selectedCity.value = localStorage.getItem("selectedCity")
 
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