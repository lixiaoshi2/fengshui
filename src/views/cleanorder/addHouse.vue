
<template>
  

  <van-nav-bar title="新增服务位置" left-text="返回"  @click-left="router.go(-1)" left-arrow>
    <template #right>
     
      <van-icon name="question-o" size="18" @click="showImage = true" />
    </template>
  </van-nav-bar>

   <!-- 弹出图片窗口 -->
   <van-popup v-model:show="showImage" position="center" closeable round>
    <img
      src="/images/help2/addhouse.jpg"
      alt="帮助图片"
      style="max-width: 90vw; max-height: 80vh; border-radius: 8px"
    />
   </van-popup>



  <div style="margin-bottom: 70px;" class="max-w-4xl mx-auto p-4 bg-gray-105 ">


    <!-- 测试省市选择 -->


    <div class="mb-4">
      <label class="block text-lg font-medium text-gray-700">选择省份(必选)：</label>
      <select v-model="selectedProvince" @change="updateCities" class="w-full mt-2 p-2 border rounded-md">
        <option value="" disabled>请选择省份</option>
        <option v-for="(cities, province) in cityData" :key="province" :value="province">{{ province }}</option>
      </select>
    </div>

    <div class="mb-4" v-if="selectedProvince">
      <label class="block text-lg font-medium text-gray-700">选择地级市(必选)：</label>
      <select v-model="selectedCity" class="w-full mt-2 p-2 border rounded-md">
        <option value="" disabled>请选择城市</option>
        <option v-for="city in cityData[selectedProvince]" :key="city">{{ city }}</option>
      </select>
    </div>

    <p v-if="selectedCity">您选择了： {{ selectedCity }}</p>



    <!-- 测试省市选择 -->


    <div class="mb-4">
      <label class="block text-lg font-medium text-gray-700">
        地图位置：
        <button @click="choosePosition" type="button"
          class="ml-2 px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
          点击选择
        </button>
        
      </label>
      <input style="display: none;" type="text" @click="choosePosition" v-model="LatLng" placeholder="请在地图上选择(必填)"
        class="w-full mt-2 p-2 border rounded-md" />
    </div>



    <div class="mb-4">
      <label class="block text-lg font-medium text-gray-700">
        房源位置(必填)：
        <span class="text-sm text-red-500">(填写县区及街道等)</span>
      </label>
      <input type="text" v-model="houseaddr" placeholder="例如：五华区环城西路附近" class="w-full mt-2 p-2 border rounded-md" />
    </div>

    <div class="mb-4">
      <label class="block text-lg font-medium text-gray-700">联系人：</label>
      <input type="text" v-model="owner" placeholder="必填" class="w-full mt-2 p-2 border rounded-md" />
    </div>

    <div class="mb-4">
      <label class="block text-lg font-medium text-gray-700">联系人电话：</label>
      <input type="text" v-model="phone" placeholder="必填" class="w-full mt-2 p-2 border rounded-md" />
    </div>
    <div class="mb-4">
      <label class="block text-lg font-medium text-gray-700">联系人微信：</label>
      <input type="text" v-model="weixin" placeholder="" class="w-full mt-2 p-2 border rounded-md" />
    </div>

    <div class="mb-4">
      <label class="block text-lg font-medium text-gray-700">民宿基准价格：(如节假日或保洁时长变动太大，现场协商调整)</label>
      <input type="text" v-model="price" placeholder="一般保洁不用填" class="w-full mt-2 p-2 border rounded-md" />
    </div>

    <div class="mb-4">
      <!-- <label class="block text-lg font-medium text-gray-700">备注：</label>


      <textarea v-model="beizhu" placeholder="输入需要备注的内容" rows="3"
        class="w-full mt-2 p-2 border rounded-md resize-none"></textarea> -->


      <label class="block mb-2">
        备注：
        <span class="text-gray-500 text-sm">(请详细列出工作内容时间、对应聘者的要求以及价格，最多 120 字)</span>
      </label>

      <textarea v-model="beizhu" rows="4" class="w-full p-2 border rounded-md mb-1"
        placeholder="请输入备注内容，最多120字" />

      <div class="text-right text-sm text-gray-500">
        {{ beizhu.length }}/120 字
      </div>





    </div>
    <!-- <div class="mb-6">
      <label class="block text-lg font-medium text-gray-700">摆设规范 (选填)</label>
      <div
        class="border-dashed border-2 border-gray-300 rounded-md h-32 flex justify-center items-center cursor-pointer">
        <span class="text-gray-500">点击上传图片 (最多16张)</span>
      </div>
      <p class="mt-2 text-sm text-gray-500">可上传最多16张图片作为民宿酒店的摆设规范。</p>
    </div> -->



    <!-- ************上传图片的代码开始************** -->
    <!-- <div class="p-6 bg-gray-100 min-h-screen"> -->
    <div class="p-6 bg-gray-100 ">
      <h3 class="text font-bold text-gray-800 mb-4">请多上传工作环境照片，有利找到合适的承担者</h3>

      <div class="flex flex-wrap gap-4">
        <!-- 图片预览框 -->
        <div v-for="(file, index) in selectedFiles" :key="index"
          class="relative w-32 h-32 border border-gray-300 bg-white rounded-lg overflow-hidden">
          <img :src="file.preview" alt="Preview" class="object-cover w-full h-full" />
          <button @click="removeImage(index)"
            class="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-sm">×</button>
        </div>

        <!-- 添加图片按钮 -->
        <label
          class="w-32 h-32 flex items-center justify-center border border-dashed border-gray-400 bg-white rounded-lg cursor-pointer">
          <span class="text-gray-500">+</span>
          <input type="file" multiple class="hidden" @change="handleFileChange" />
        </label>
      </div>

      <button @click="uploadFiles" class="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        上传图片
      </button>

      <div v-if="uploadedImages.length" class="mt-6">
        <h2 class="text-xl font-semibold text-gray-800">上传成功的图片：</h2>
        <div class="flex flex-wrap gap-4 mt-4">
          <div v-for="(image, index) in uploadedImages" :key="index" class="w-32 h-32">
            <img :src="image" alt="uploaded" class="object-cover w-full h-full rounded-lg border border-gray-300" />
          </div>
        </div>
      </div>
    </div>

    <!-- ************上传图片的代码结束始************** -->

    <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="(item, index) in roomConfig" :key="index" class="flex items-center justify-between">
        <span class="text-lg font-medium text-gray-700">{{ item.label }}：</span>
        <div class="flex items-center space-x-2">
          <button @click="decrease(item)" class="p-2 bg-gray-200 rounded-md">-</button>
          <span class="text-lg">{{ item.value }}</span>
          <button @click="increase(item)" class="p-2 bg-gray-200 rounded-md">+</button>
        </div>
      </div>
    </div> -->

    <!-- <div class="mt-6 flex items-center">
      <label class="text-lg font-medium text-gray-700">估计时长：</label>
      <div class="flex items-center ml-2">
        <button @click="area--" class="p-2 bg-gray-200 rounded-md">-</button>
        <span class="mx-2 text-lg">{{ area }}</span>
        <button @click="area++" class="p-2 bg-gray-200 rounded-md">+</button>
        <span class="ml-2">小时</span>

      </div>
    </div> -->

    <!-- <div class="mt-6">
      <label class="flex items-center">
        <input type="checkbox" v-model="agree" class="mr-2">
        <span class="text-sm text-gray-700">我已阅读并同意 <a href="#" class="text-blue-500">《房东（管家）新增房源协议》</a></span>
      </label>
    </div> -->

    <div class="mt-8" @click="addHouse">
      <button  @click="saveHouseInfo" class="w-full p-3 text-white rounded-md bg-blue-500" >
        保存房源信息
      </button>
    </div>
  </div>






  <!-- 
  <button @click="addHouse"
    class="fixed bottom-20 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md shadow-md hover:bg-blue-600 transition duration-300">
    添加房源
  </button> -->



</template>

<script setup>
import axios from 'axios';
import config from '@/global.config.js'
import md5 from 'js-md5'
// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';
import funcs from '@/utils/common_func.js';
import report from '../../components/report.vue';

import { showToast, showDialog } from 'vant';
import { ref, onMounted, computed,reactive,watch } from 'vue';

import { useRouter,useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import {cityData} from '@/utils/cityData.js';

const router = useRouter()
const route = useRoute()
const showImage = ref(false)

const category_url = ref('')

var owner= ref('');
var phone= ref('');
var beizhu = ref('')
var weixin= ref('');
var houseaddr= ref('');

var city = ref('')
var price = ref('')
let LatLng = ref('')
let latitude = ref('')
let longitude = ref('')


// ////////////上传图片的代码///////////

  const selectedFiles = ref([]);
  const uploadedImages = ref([]);

  const handleFileChange = (event) => {
  const files = Array.from(event.target.files);
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      selectedFiles.value.push({
        file: file,
        preview: e.target.result,  // 生成图片预览
      });
    };
    reader.readAsDataURL(file);
  });
};

const removeImage = (index) => {
  selectedFiles.value.splice(index, 1);
};

const uploadFiles = async () => {
  if (selectedFiles.value.length === 0) {
    alert("请添加至少一张图片！");
    return;
  }

  const formData = new FormData();

  selectedFiles.value.forEach((item) => {
    formData.append("image", item.file);  // 字段名 "image" 要和后端一致
  });
  formData.append("temp_id", tempId);  // 发送 temp_id 给后端

  //  https.post(('/api/user/login/'),this.params).then(response =>{
  try {
    const response = await https.post3("/api/minsubaojie/imgupload/", formData);

    uploadedImages.value.push(...response.images);
    alert("图片上传成功！");
    selectedFiles.value = [];  // 清空已选图片
  } catch (error) {
    console.error("上传失败：", error);
    alert("上传失败，请重试！");
  }
};


/////////////上传图片代码结束 //////////



const selectedProvince = ref('');
const selectedCity = ref('');

const updateCities = () => {
  console.log("province",selectedProvince.value)
  localStorage.setItem("selectedProvince",selectedProvince.value)
  selectedCity.value = '';
};

// 监听城市选择变化
watch(selectedCity, (newCity) => {
  if (newCity) {
    localStorage.setItem('selectedCity', newCity);
    console.log(`已保存到localStorage: ${newCity}`);
  }
});

// 监听并限制 beizhu 长度为 200 字
watch(
  () => beizhu.value,
  (val) => {
    if (val && val.length > 120) {
      beizhu.value = val.slice(0, 120)
    }
  }
)





const addHouse = ()=>{
  router.push("/addHouse"); // 跳转到 /fangyuan 路由
}
const getLatLnt = (city) => {

const apiKey = '3ROBZ-6G6CL-GKEPX-MWLTN-AAC72-QAB4G'; // 替换为你的 OpenCage API 密钥
const url = `https://apis.map.qq.com/ws/geocoder/v1/?address=${city}&key=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data.status === 0) {
      latitude.value = data.result.location.lat;
      longitude.value = data.result.location.lng;
      console.log(`City: ${city}, Latitude: ${latitude}, Longitude: ${longitude}`);
    } else {
      console.log('City not found or error in response.');
    }
  })
  .catch(error => console.error('Error fetching coordinates:', error));

}



// 选择房源位置
const choosePosition = ()=>{
  console.log('选择位置')
  // getLatLnt('昆明')

  city = localStorage.getItem("selectedCity")
  if(city){
    router.push("/chooseposition"); // 跳转到 /fangyuan 路由
  }
  else{
    alert("请设置城市")
  }
}

  



const houseName = ref('');
    const area = ref(1);
    const agree = ref(false);
    const roomConfig = ref([
      { label: '卧室数量', value: 1 },
      { label: '客厅数量', value: 1 },
      { label: '厨房数量', value: 1 },
      { label: '卫生间数量', value: 1 }
    ]);

    const increase = (item) => {
      item.value++;
    };

    const decrease = (item) => {
      if (item.value > 0) {
        item.value--;
      }
    };

const saveHouseInfo = () => {

  alert('房源信息已保存！');

  const [latitude, longitude] = LatLng.value.split(',');

  console.log("纬度:", latitude);
  console.log("经度:", longitude);

  const values2 = { //这里真实的
    'temp_id': tempId,
    'latitude': parseFloat(latitude),
    "longitude": parseFloat(longitude),
    "city": selectedCity.value,
    "houseaddr": houseaddr.value,
    "owner": owner.value,
    "phone": phone.value,
    "weixin": weixin.value,
    "price": price.value,
    "cleantime": area.value,
    "beizhu": beizhu.value
  }



  console.log('inadsf', values2)

  https.post('/api/minsubaojie/addhouse/', values2).then(response => {

    console.log('进入购买也面前，修改了修改和保存了购物车的数据');

    // 因为修改了购物车所以才可以重新提交订单
    localStorage.removeItem("is_postorder")

   
    // 返回列表
    router.go(-1)

  }).catch(error => {
    // console.log('需要添加用户详细信息');

    // showDialog("")
    console.error(error);

  });




};



const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const tempId = generateUUID();

console.log('uuid',tempId)


const activeTab = ref("发单");

onMounted(() => {

  selectedCity.value = localStorage.getItem("selectedCity")
  selectedProvince.value = localStorage.getItem("selectedProvince")
  const lat = localStorage.getItem('lat');
  const lng = localStorage.getItem('lng');
  console.log('lat',lat)
  if (lat && lng) {
    LatLng.value = `${lat},${lng}`;
    console.log('latLng:', LatLng.value);  // 检查拼接结果
  } else {
    console.log('LocalStorage中没有经纬度');
  }
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