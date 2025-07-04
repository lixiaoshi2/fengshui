
<template>
  <van-nav-bar title="小萝卜保洁" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>


  <div class="flex justify-between px-4 py-3 border-b">
    <div class="relative cursor-pointer pb-2"
      :class="activeTab === '发单' ? 'text-lg font-bold border-b-2 border-blue-500 text-black' : 'text-nm text-gray-500'"
      @click="activeTab = '发单'">
      保洁订单

    </div>
    <div class="relative cursor-pointer pb-2"
      :class="activeTab === '阿姨' ? 'text-lg font-bold border-b-2 border-blue-500 text-black' : 'text-nm text-gray-500'"
      @click="activeTab = '阿姨'">
      附近阿姨
    </div>
  </div>

  <div class="p-4">

    <div v-if="activeTab === '发单'">
         


  <div style="margin-bottom: 70px;" class="max-w-4xl mx-auto p-4 bg-gray-105 ">
    <div class="mb-4">
      <label class="block text-lg font-medium text-gray-700">房源：</label>
      <input @click="chooseHouse" type="text" v-model="house" placeholder="点击选择需要保洁的房源" class="w-full mt-2 p-2 border rounded-md" />
    </div>
   


    <div class="mb-4">
      <label class="block text-lg font-medium text-gray-700">房源名称：</label>
      <input type="text" v-model="houseName" placeholder="请输入所在小区或标志性位置" class="w-full mt-2 p-2 border rounded-md" />
    </div>

    <div class="mb-4">
      <label class="block text-lg font-medium text-gray-700">备注：</label>
      <input type="text" v-model="beizhu" placeholder="请输入所在小区或标志性位置" class="w-full mt-2 p-2 border rounded-md" />
    </div>

    



<div class="max-w-md mx-auto">
    <label for="datetimePicker" class="block text-lg font-medium text-gray-700 mb-2">选择保洁日期和时间：</label>
    <div class="relative">
      <input
        type="text"
        id="datetimePicker"
        v-model="formattedDateTime"
        @focus="showPicker = true"
        readonly
        class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="请选择保洁日期和时间"
      />
      <div
        v-if="showPicker"
        class="absolute top-14 left-0 w-full bg-white border rounded-lg shadow-lg z-10 p-4"
      >
        <!-- 日期选择 -->
        <input type="date" v-model="selectedDate" class="w-full p-2 border rounded-md mb-4" />
      
        <!-- 时间选择 -->
        <div class="flex justify-between">
          <div class="text-center">
            <p class="text-sm font-semibold">小时</p>
            <div class="mt-2">
              <button @click="changeHour(-1)" class="p-1 text-gray-600 hover:bg-gray-200 rounded-full">-</button>
              <div class="text-lg font-bold my-2">{{ padZero(hour) }}</div>
              <button @click="changeHour(1)" class="p-1 text-gray-600 hover:bg-gray-200 rounded-full">+</button>
            </div>
          </div>
          <div class="text-center">
            <p class="text-sm font-semibold">分钟</p>
            <div class="mt-2">
              <button @click="changeMinute(-1)" class="p-1 text-gray-600 hover:bg-gray-200 rounded-full">-</button>
              <div class="text-lg font-bold my-2">{{ padZero(minute) }}</div>
              <button @click="changeMinute(1)" class="p-1 text-gray-600 hover:bg-gray-200 rounded-full">+</button>
            </div>
          </div>
        </div>

        <div class="mt-4 text-right">
          <button @click="confirmDateTime" class="px-4 py-2 bg-blue-500 text-white rounded-md">确认</button>
          <button @click="cancelDateTime" class="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md">取消</button>
        </div>
      </div>
    </div>
  </div>



<!--  -->








<div class="border-t border-gray-300 my-4"></div> <!-- 添加隔断线 -->
<div class="mt-4 flex items-center">
  <label class="text-lg font-medium text-gray-700">预计时长：</label>
  <div class="flex items-center ml-2">
    <button @click="duration--" class="p-2 bg-gray-200 rounded-md">-</button>
    <span class="mx-2 text-lg">{{ duration }}</span>
    <button @click="duration++" class="p-2 bg-gray-200 rounded-md">+</button>
    <span class="ml-2">小时</span>
  </div>
</div>


<div class="mt-2">
  <p class="text-sm font-medium text-red-500">注：超出时间，现场补</p> <!-- 红色文字 -->
</div>
<div class="border-t border-gray-300 my-4"></div> <!-- 添加隔断线 -->

    <!--  -->


    <div class="mt-6">
      <label class="flex items-center">
        <input type="checkbox" v-model="agree" class="mr-2">
        <span class="text-sm text-gray-700">我已阅读并同意 <a href="#" class="text-blue-500">《房东（管家）新增房源协议》</a></span>
      </label>
    </div>


    <div class="mt-8"  @click="addHouse">
      <button :disabled="!agree" @click="saveHouseInfo" class="w-full p-3 text-white bg-blue-500 rounded-md"
        :class="[agree ? 'bg-blue-500' : 'bg-gray-300 cursor-not-allowed']">
        保存房源信息
      </button>
    </div>
  </div>













    </div>
    <div v-if="activeTab === '阿姨'">
      <!-- 附近阿姨的内容 -->
      <p>这里是附近阿姨页面的内容</p>
    </div>




  </div>




  <!-- 底部价格 & 按钮 -->
  <!-- <div style="margin-bottom: 40px;"
    class="fixed bottom-0 left-0 w-full bg-gradient-to-r from-gray-600 to-gray-800 text-white flex justify-between items-center p-4">
    <span class="text-sm">已优惠 <span class="text-red-400">¥0</span> 合计 ¥--</span>
    <button class="bg-blue-500 px-6 py-2 rounded-lg text-white font-bold">发布</button>
  </div> -->




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
import { ref, onMounted, computed,reactive } from 'vue';
import textEditor  from "@/components/textEditor.vue"  
import weizhi from '@/components/weizhi.vue'
import { useRouter,useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const router = useRouter()
const route = useRoute()
const rentroom_id = ref('')
const retdata2= ref({})
const category_url = ref('')
// var userinfo = ref()

const houseName = ref('')
const house = ref('')
const showProject = ref(false);
const agree = ref(false);

const chooseHouse = ()=>{
  router.push("/chooseHouse"); // 跳转到 /fangyuan 路由
}

var duration = ref(1)

const toggleProject = () => {
  showProject.value = !showProject.value;
};






/////////// ------------- 这段代码是获取页面的网址并复制到剪切板
const message = ref('');
const messageColor = ref('black');

const copyUrl = () => {
  const currentUrl = window.location.href;

  // 创建一个临时的 textarea 元素
  const textarea = document.createElement('textarea');
  textarea.value = currentUrl;
  document.body.appendChild(textarea);
  
  // 选择并复制文本
  textarea.select();
  try {
    document.execCommand('copy');
    // message.value = `页面地址已复制到剪贴板：${currentUrl}`;
    message.value = `页面地址已复制到剪贴板，您可以粘贴到其他APP`;
    messageColor.value = 'green';
  } catch (err) {
    console.error('无法复制到剪贴板', err);
    message.value = '无法复制到剪贴板';
    messageColor.value = 'red';
  }
  
  // 移除临时的 textarea 元素
  document.body.removeChild(textarea);
};



const activeTab = ref("发单");


const showPicker = ref(false)
const selectedDate = ref('')
const hour = ref(12)
const minute = ref(0)
const formattedDateTime = ref('')

const changeHour = (delta) => {
  hour.value = (hour.value + delta + 24) % 24
}

const changeMinute = (delta) => {
  minute.value = (minute.value + delta + 60) % 60
}

const confirmDateTime = () => {
  if (!selectedDate.value) {
    alert('请选择日期')
    return
  }
  formattedDateTime.value = `${selectedDate.value} ${padZero(hour.value)}:${padZero(minute.value)}`
  showPicker.value = false
}

const cancelDateTime = () => {
  showPicker.value = false
}

const padZero = (num) => {
  return num.toString().padStart(2, '0')
}





// onMounted(() => {

// // const user_id = localStorage.getItem("user_id");

// //  console.log('asasdfsad')
//   // rentroom_id.value = route.query.id;  // 这个模式是从？id=89 中获取参数
//   rentroom_id.value = route.params.id;  // 这个是从 /89 中获取参数
  
//   console.log('rentroom_id', rentroom_id)

//   https.get(('/api/rentroom/detail/'+rentroom_id.value+'/')).then(response => {
//   // https.get(('/api/rentroom/rentroom/2/')).then(response => {
//     // console.log('asdfas555111');
//     // console.log(response);
//     // 替换图片把内网地址替换成服务器地址

//     // console.log('访问的服务器协议',window.location.protocol)
//     if (window.location.protocol == "http:"){
//       console.log('访问的协议是http')
//       // response.content = response.content.replace(config.backendserver1, config.backendserver2);
      
//     }else{
//       response.content = response.content.split(config.backendserver1).join(config.backendserver2)
//       // console.log('response222',response)
//     }

//     // console.log('打印内容', content.value)
//     retdata2.value = response;

//     // 如果已经是下线将不显示，这个过程由平台控制
//     if(!retdata2.value.is_offline) {
      
//     title.value = retdata2.value.title
//     owner.value = retdata2.value.owner
//     phone.value = retdata2.value.phone
//     phone2.value = retdata2.value.phone2
//     email.value = retdata2.value.email
//     console.log('asdfas555111');
//     weixin.value = retdata2.value.weixin
//     addr.value = retdata2.value.addr
//     state.value = retdata2.value.state
//     city.value = retdata2.value.city
//     console.log('asdfas555112');
//     content.value = retdata2.value.content


//     // https://www.mynextdoor01.space/api/api/rentroom/list2/?city=toronto
//     // httpss://www.mynextdoor01.space/api/api/rentroom/list2/?city=toronto&page=2
//     // console.log('打印内容', content.value)

//     weizhizhi.value = state.value + '/' +  city.value
//     // category_url.value = 
//     // console.log('asdf2122',content.value)
//     const res = funcs.getcategory_url2(route.path)
//     console.log('fenlei212',res)
//     category_url.value = res.url

     
//     if (city.value.toLowerCase()=='toronto'){
//       // console.log('alsdfl来到toronto')
//       city2.value='多伦多'
//     }
//     if(city.value.toLowerCase() =='vancouver'){
//       // console.log('as来到了d')
//       city2.value=''
//     }
   
//     useHead({
//       title: `${title.value} | 加拿大邻家网`,
//       meta: [
//         {
//           name: 'description',
//           content: title.value,
//         },
//         {
//           name: 'keywords',
//           content: `加拿大，${city.value} ,您附近,最好最便宜高性价比,租房栏目`,
//         },
//       ],
//     });
//   }
//   else{
//     showDialog({message:"该信息没有审核通过，请通过电子邮件联系平台，并通过分享链接获取您信息地址，申请通过审核"})
//   }


//   }).catch(error => {
//     console.log('访问民宿详情出错了');
//     showDialog({message:'您的访问次数过多，请一分钟后再访问'})
//     // alert('您的访问次数过多，请一分钟后再访问')
//     console.error(error);
//     // showToast('请重新登录');
//   });

// });



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