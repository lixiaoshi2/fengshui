
<template>
  <van-nav-bar title="萝卜家政" left-text="返回"  @click-left="router.go(-1)" left-arrow>
    <template #right>
     
      <van-icon name="question-o" size="18" @click="showImage = true" />
    </template>
  </van-nav-bar>

  
   <!-- 弹出图片窗口 -->
   <van-popup v-model:show="showImage" position="center" closeable round>
    <img
      src="/images/help2/ordernow.jpg"
      alt="帮助图片"
      style="max-width: 90vw; max-height: 80vh; border-radius: 8px"
    />
   </van-popup>


  <div class="flex justify-between px-4 py-3 border-b">
    <div class="relative cursor-pointer pb-2"
      :class="activeTab === '长期服务' ? 'text-lg font-bold border-b-2 border-blue-500 text-black' : 'text-nm text-gray-500'"
  >
      请填写服务详情

    </div>

  </div>

  <div class="p-4">

    <div>


      <form @submit.prevent="submitOrder">
        <div style="margin-bottom: 70px;" class="max-w-4xl mx-auto p-4 bg-gray-105 ">


          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <label class="text-lg font-medium text-gray-700">房源：</label>
              <button type="button" @click="chooseHouse"
                class="text-sm px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
                选择服务位置
              </button>
            </div>
            <input type="text" v-model="houseid" placeholder="点击选择需要保洁的房源" class="w-full p-2 border rounded-md"
              readonly />
          </div>



          <div class="mb-4">
            <label class="block text-lg font-medium text-gray-700">城市：</label>
            <input type="text" v-model="city" placeholder="请输入所在小区或标志性位置" class="w-full mt-2 p-2 border rounded-md" />
          </div>

          <div class="mb-4">
            <label class="block text-lg font-medium text-gray-700">房源位置：</label>
            <input type="text" v-model="houseaddr" placeholder="请输入所在小区或标志性位置"
              class="w-full mt-2 p-2 border rounded-md" />
          </div>

          <div class="mb-2">
            <label class="block text-lg font-medium m-b-6 mb-2">
              服务类型：<span class="text-sm text-gray-400">(一次支付重复使用)</span>
            </label>
            <!-- 使用grid，每行3个元素 -->
            <div class="grid grid-cols-3 gap-4">
              <label class="flex items-center" v-for="(price, type) in servicePrices" :key="type">
                <input type="radio" name="cleantype" :value="type" v-model="cleantype"
                  class="text-blue-600 focus:ring-blue-500" />
                <span class="ml-2 text-gray-700 text-sm">{{ type }}</span>
              </label>
            </div>

            <p class="text-gray-900 mt-4">当前服务类型：<strong> {{ cleantype }} </strong>
            </p>
            <!-- 新分类结束 -->

          </div>

          <div class="mt-2">
            <p class="text-gray-700">
              平台收取费用：<strong>{{ servicePrice }}</strong>元
            </p>
            <p class="text-gray-700">
              提供：<strong>{{contactCount}}</strong> 人永久联系方式
            </p>
          </div>



          <div class="border-t border-gray-300 my-4"></div> <!-- 添加隔断线 -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-red-500">备注：(请描述工作时间、内容、预计价格以及各种要求，避免浪费您的选择次数，总字数120以内)</label>

            <!-- <textarea data-v-8b3361b8="" v-model="beizhu" placeholder="请描述工作内容，方便找到对口的家政人员"
              class="w-full mt-2 p-2 border rounded-md" rows="2"></textarea> -->

              <textarea v-model="beizhu" rows="4" class="w-full p-2 border rounded-md mb-1"
              placeholder="请输入备注内容，最多120字"></textarea>

            <div class="text-right text-sm text-gray-500">
              {{ beizhu.length }}/120 字
            </div>

          </div>


          <div class="mb-4">
            <label class="block text-lg font-medium text-gray-700">联系人：</label>
            <input type="text" v-model="contact_name" placeholder="输入联系人姓名" class="w-full mt-2 p-2 border rounded-md" />
          </div>
          <div class="mb-4">
            <label class="block text-lg font-medium text-gray-700">联系人电话：</label>
            <input type="text" v-model="contact_phone" placeholder="输入联系人姓名"
              class="w-full mt-2 p-2 border rounded-md" />
          </div>


          <div class="mt-8" @click="cleanorder">
            <button  class="w-full p-3 text-white bg-blue-500 bg-blue-500 rounded-md" >
              确定服务详情
            </button>
          </div>
        </div>
      </form>

    </div>


  </div>



</template>

<script setup>

import config from '@/global.config.js'

// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';

import { showToast, showDialog } from 'vant';
import { ref, onMounted, computed, watch  } from 'vue';

import { useRouter,useRoute } from 'vue-router'


const router = useRouter()
const route = useRoute()
const latitude = ref('')
const longitude = ref('')

const houseaddr = ref('')
const houseid = ref('')
const city = ref('')
const contact_name = ref('')
const contact_phone = ref('')
const showProject = ref(false);
const agree = ref(false);


const showImage = ref(false)

const chooseHouse = ()=>{
  router.push("/chooseHouse"); // 跳转到 /fangyuan 路由
}





const activeTab = ref("长期服务");



var formattedDateTime = ref('')

const price= ref('')
const beizhu = ref('')


const cleantype = ref('')


// 存放计算后的开始日期和结束日期
const startDate = ref('')
const endDate = ref('')

// 限制字数
watch(
  () => beizhu.value,
  (val) => {
    if (val && val.length > 120) {
      beizhu.value = val.slice(0, 120)
    }
  }
)

// 日期格式化函数，格式为 yyyy-MM-dd
function formatDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}



const submitOrder = async () => {
  if (activeTab.value=="长期服务"){
    formattedDateTime.value = endDate.value + " 12:00:00"
    price.value = 200
  }

  console.log("price",servicePrice.value)

  if (cleantype.value!='' && beizhu.value!='' ){
     console.log('adfa ')
  const order = ref({
    houseid: houseid.value,
    city: city.value,
    houseaddr: houseaddr.value,
    cleantype: cleantype.value,
    price: servicePrice.value,
    // beizhu: beizhu.value,
    contact_name: contact_name.value,
    formattedDateTime: endDate.value,
    beizhu: beizhu.value,
    contact_phone:contact_phone.value,
    latitude:latitude.value,
    longitude:longitude.value,
 
  });
 
  console.log('tijiaoshuju',order.value)

  try {
    const response = await https.post('/api/minsubaojie/addCleanOrder/', order.value);
    console.log('订单提交成功', response);
    const orderid = response.id
    alert('订单提交成功！请到查找记录中进行实际查找');
    localStorage.setItem("pay_status","未支付")
    router.push(`/getcleaner/?order_id=${orderid}&price=${servicePrice.value}`)
   
  } catch (error) {
    console.error('订单提交失败', error);
    alert('订单提交失败，请重试！');
  }

}
else{
  alert('保洁类型和备注不能为空')
}
};


// 计算当前选中服务的价格
const servicePrices = config.servicePrices
const servicePrice = computed(() => servicePrices[cleantype.value] || 0)

const contactCount = computed(() => {
  const price = servicePrice.value
  if (price === 100) return 3
  if (price === 30) return 1
  return 0
})

onMounted(() => {

  houseid.value = localStorage.getItem("house_id");
  if(!houseid.value){
    houseid.value = ""
    console.log("houseid",houseid.value)
  }
 
  houseaddr.value = localStorage.getItem('houseaddr')
  if(!houseaddr.value){
    houseaddr.value = ""
    console.log("houseid",houseaddr.value)
  }
 
  city.value = localStorage.getItem('city')
  if(!city.value){
    city.value = ""
    console.log("city",city.value)
  }


  price.value = localStorage.getItem('price')
  if(!price.value){
    price.value = ""
    console.log("price",price.value)
  }
  
  latitude.value = localStorage.getItem('latitude')
  if(!latitude.value){
    latitude.value = ""
    console.log("latitude",city.value)
  }

  longitude.value = localStorage.getItem('longitude')
  if(!longitude.value){
    longitude.value = ""
    console.log("longitude",longitude.value)
  }

  beizhu.value = localStorage.getItem("beizhu")
  if(!beizhu.value){
    beizhu.value = ""
    console.log("beizhu",beizhu.value)
  }


  contact_name.value = localStorage.getItem("owner")
  if(!contact_name.value){
    contact_name.value = ""
    console.log("contact_name",contact_name.value)
  }

  contact_phone.value = localStorage.getItem("phone")
  if(!contact_phone.value){
    contact_phone.value = ""
    console.log("contact_phone",contact_phone.value)
  }

  const now = new Date()
  // 开始日期：当前日期 + 7 天
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  // 结束日期：开始日期 + 365 天
  const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 90+7)
  startDate.value = formatDate(start)
  endDate.value = formatDate(end)



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


input[type="radio"]:checked + span {
  font-weight: bold;
  color: #2563eb;
}

</style>