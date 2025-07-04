
<template>
  <van-nav-bar title="萝卜保洁" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>


  <div class="flex justify-between px-4 py-3 border-b">
    <div class="relative cursor-pointer pb-2"
      :class="activeTab === '长期服务' ? 'text-lg font-bold border-b-2 border-blue-500 text-black' : 'text-nm text-gray-500'"
      @click="longtermservice">
      长期服务订单

    </div>
    <div class="relative cursor-pointer pb-2"
      :class="activeTab === '一次性服务' ? 'text-lg font-bold border-b-2 border-blue-500 text-black' : 'text-nm text-gray-500'"
      @click="onetimeservice">
      一次性服务订单
    </div>
  </div>

  <div class="p-4">

    <div v-if="activeTab === '长期服务'">


      <form @submit.prevent="submitOrder">
        <div style="margin-bottom: 70px;" class="max-w-4xl mx-auto p-4 bg-gray-105 ">
          <div class="mb-4">
            <label class="block text-lg font-medium text-gray-700">房源：(点击选择其他房源)</label>
            <input @click="chooseHouse" type="text" v-model="houseid" placeholder="点击选择需要保洁的房源"
              class="w-full mt-2 p-2 border rounded-md" />
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



          <!-- 长期服务 -->
          <div class="mb-4">
            <label class="block text-lg font-medium m-b-6 ">
              长期服务：
            </label>
            <div class="flex items-center space-x-6">
              <label class="flex items-center">
                <input type="radio" name="cleantype" value="民宿酒店" v-model="cleantype"
                  class="text-blue-600 focus:ring-blue-500" />
                <span class="ml-2 text-gray-700">民宿酒店</span>
              </label>
              <label class="flex items-center">
                <input type="radio" name="cleantype" value="保洁做饭" v-model="cleantype"
                  class="text-blue-600 focus:ring-blue-500" />
                <span class="ml-2 text-gray-700">保洁做饭</span>
              </label>
              <label class="flex items-center">
                <input type="radio" name="cleantype" value="单独保洁" v-model="cleantype"
                  class="text-blue-600 focus:ring-blue-500" />
                <span class="ml-2 text-gray-700">单独保洁</span>
              </label>
            </div>
            <div class="flex items-center space-x-6">
              <label class="flex items-center">
                <input type="radio" name="cleantype" value="老病护理" v-model="cleantype"
                  class="text-blue-600 focus:ring-blue-500" />
                <span class="ml-2 text-gray-700">老病护理</span>
              </label>
              <label class="flex items-center">
                <input type="radio" name="cleantype" value="孩子护理" v-model="cleantype"
                  class="text-blue-600 focus:ring-blue-500" />
                <span class="ml-2 text-gray-700">孩子护理</span>
              </label>
              <label class="flex items-center">
                <input type="radio" name="cleantype" value="月子护理" v-model="cleantype"
                  class="text-blue-600 focus:ring-blue-500" />
                <span class="ml-2 text-gray-700">月子护理</span>
              </label>
            </div>
          </div>


          <!-- 当选择长期服务时，显示自动计算的服务期限 -->
          <div v-if="isLongTerm" class="mt-4">
            <p class="text-gray-700">
              服务期限：<strong>{{ startDate }}</strong> 至 <strong>{{ endDate }}</strong> 
            </p>
            <p class="text-gray-700">
              总匹配：<strong>6</strong>人（请节省使用）
            </p>
          </div>




          <div class="mt-4">
            <p class="text-gray-700">
              平台收取费用：<strong>100</strong>元
            </p>
          </div>

          <div class="border-t border-gray-300 my-4"></div> <!-- 添加隔断线 -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-red-500">备注：(请描述工作时间和内容，以及各种限制条件，避免找到不合适的家政人员)</label>
            <input type="text" v-model="beizhu" placeholder="请描述工作内容，方便找到对口的家政人员" class="w-full mt-2 p-2 border rounded-md" />
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

          <div class="border-t border-gray-300 my-4"></div> <!-- 添加隔断线 -->

          <!-- 添加修改逻辑 -->

           <!-- 编辑弹窗 -->
  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-8 rounded-md w-96">
      <h3 class="text-lg font-semibold mb-4">编辑订单</h3>
      <label class="block mb-2">房屋地址：</label>
      <input readonly v-model="editForm.houseaddr" class="w-full p-2 border rounded-md mb-4" />

      <label class="block mb-2">城市：</label>
      <input readonly v-model="editForm.city" class="w-full p-2 border rounded-md mb-4" />

      <label class="block mb-2">保洁类型：</label>
      <input v-model="editForm.cleantype" class="w-full p-2 border rounded-md mb-4" />

      <label class="block mb-2">价格：</label>
      <input v-model="editForm.price" class="w-full p-2 border rounded-md mb-4" />

      <label class="block mb-2">联系人：</label>
      <input v-model="editForm.contact_name" class="w-full p-2 border rounded-md mb-4" />

      <label class="block mb-2">备注：</label>
      <input v-model="editForm.beizhu" class="w-full p-2 border rounded-md mb-4" />

      <div class="flex justify-end gap-4">
        <button @click="closeModal" class="px-4 py-2 bg-gray-400 text-white rounded-md">取消</button>
        <button @click="saveOrder" class="px-4 py-2 bg-blue-500 text-white rounded-md">保存</button>
      </div>
    </div>
  </div>




          <!-- 添加修改逻辑结束 -->


          <div class="mt-6">
            <label class="flex items-center">
              <input type="checkbox" v-model="agree" class="mr-2">
              <span class="text-sm text-gray-700">我已阅读并同意 <a href="#" class="text-blue-500">《房东（管家）新增房源协议》</a></span>
            </label>
          </div>


          <div class="mt-8" @click="cleanorder">
            <button :disabled="!agree" @click="saveHouseInfo" class="w-full p-3 text-white bg-blue-500 rounded-md"
              :class="[agree ? 'bg-blue-500' : 'bg-gray-300 cursor-not-allowed']">
              确认并下单
            </button>
          </div>
        </div>
      </form>




    </div>
    <div v-if="activeTab === '一次性服务'">
      <!-- 附近阿姨的内容 -->


      <!--    新的内容 -->
      <form @submit.prevent="submitOrder">
        <div style="margin-bottom: 70px;" class="max-w-4xl mx-auto p-4 bg-gray-105">
          <!-- 房源(点击选择其他房源) -->
          <div class="mb-4">
            <label class="block text-lg font-medium text-gray-700">房源：(点击选择其他房源)</label>
            <input @click="chooseHouse" type="text" v-model="houseid" placeholder="点击选择需要保洁的房源"
              class="w-full mt-2 p-2 border rounded-md" />
          </div>

          <!-- 城市 -->
          <div class="mb-4">
            <label class="block text-lg font-medium text-gray-700">城市：</label>
            <input type="text" v-model="city" placeholder="请输入所在小区或标志性位置" class="w-full mt-2 p-2 border rounded-md" />
          </div>

          <!-- 房源名称 -->
          <div class="mb-4">
            <label class="block  text-lg font-medium text-gray-700">房源位置：</label>
            <input type="text" v-model="houseaddr" placeholder="请输入所在小区或标志性位置"
              class="w-full mt-2 p-2 border rounded-md" />
          </div>




          <!-- 当选择长期服务时，显示自动计算的服务期限 -->
          <div v-if="isLongTerm" class="mt-4">
            <p class="text-gray-700">
              服务期限：<strong>{{ startDate }}</strong> 至 <strong>{{ endDate }}</strong>
            </p>
          </div>

          <div class="border-t border-gray-300 my-4"></div> <!-- 分割线 -->


          <div class="mb-4">
            <label class="block text-sm font-medium ">一次性服务：(如窗户，地毯，窗帘等的保洁及开荒保洁)</label>
            <div class="flex items-center space-x-6">

              <label class="flex items-center">
                <input type="radio" name="cleantype" value="专业保洁" v-model="cleantype"
                  class="text-blue-600 focus:ring-blue-500" />
                <span class="ml-2 text-gray-700">专业保洁</span>
              </label>
              <label class="flex items-center">
                <input type="radio" name="cleantype" value="水电维修" v-model="cleantype"
                  class="text-blue-600 focus:ring-blue-500" />
                <span class="ml-2 text-gray-700">水电维修</span>
              </label>
              <label class="flex items-center">
                <input type="radio" name="cleantype" value="水道通堵" v-model="cleantype"
                  class="text-blue-600 focus:ring-blue-500" />
                <span class="ml-2 text-gray-700">水道通堵</span>
              </label>

             

            </div>
            <div class="flex items-center space-x-6">

              <label class="flex items-center">
                <input type="radio" name="cleantype" value="宠物寄养" v-model="cleantype"
                  class="text-blue-600 focus:ring-blue-500" />
                <span class="ml-2 text-gray-700">宠物寄养</span>
              </label>
              <label class="flex items-center">
                <input type="radio" name="cleantype" value="宠物看护" v-model="cleantype"
                  class="text-blue-600 focus:ring-blue-500" />
                <span class="ml-2 text-gray-700">宠物看护</span>
              </label>

              <label class="flex items-center">
                <input type="radio" name="cleantype" value="其他" v-model="cleantype"
                  class="text-blue-600 focus:ring-blue-500" />
                <span class="ml-2 text-gray-700">其他</span>
              </label>


            </div>
          </div>


          <!-- 平台收取费用 -->
          <div class="mt-4">
            <p class="text-gray-700">
              平台收取费用：<strong>8</strong>元
            </p>
            <p class="text-gray-700">
              总匹配：<strong>4</strong>人（请节省使用）
            </p>
          </div>

          <div class="max-w-md mx-auto">
            <label for="datetimePicker" class="block text-lg font-medium text-gray-700 mb-2">选择保洁日期和时间：</label>
            <div class="relative">
              <input type="text" id="datetimePicker" v-model="formattedDateTime" @focus="showPicker = true" readonly
                class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请选择一次性服务的日期和时间" />
              <div v-if="showPicker"
                class="absolute top-14 left-0 w-full bg-white border rounded-lg shadow-lg z-10 p-4">
                <!-- 日期选择 -->
                <input type="date" v-model="selectedDate" class="w-full p-2 border rounded-md mb-4" />

                <!-- 时间选择 -->
                <div class="flex justify-between">
                  <div class="text-center">
                    <p class="text-sm font-semibold">小时</p>
                    <div class="mt-2">
                      <button type="button" @click="changeHour(-1)"
                        class="p-1 text-gray-600 hover:bg-gray-200 rounded-full">-</button>
                      <div class="text-lg font-bold my-2">{{ padZero(hour) }}</div>
                      <button type="button" @click="changeHour(1)"
                        class="p-1 text-gray-600 hover:bg-gray-200 rounded-full">+</button>
                    </div>
                  </div>
                  <div class="text-center">
                    <p class="text-sm font-semibold">分钟</p>
                    <div class="mt-2">
                      <button type="button" @click="changeMinute(-1)"
                        class="p-1 text-gray-600 hover:bg-gray-200 rounded-full">-</button>
                      <div class="text-lg font-bold my-2">{{ padZero(minute) }}</div>
                      <button type="button" @click="changeMinute(1)"
                        class="p-1 text-gray-600 hover:bg-gray-200 rounded-full">+</button>
                    </div>
                  </div>
                </div>

                <div class="mt-4 text-right">
                  <button type="button" @click="confirmDateTime"
                    class="px-4 py-2 bg-blue-500 text-white rounded-md">确认</button>
                  <button type="button" @click="cancelDateTime"
                    class="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md">取消</button>
                </div>
              </div>
            </div>
          </div>


          <div class="border-t border-gray-300 my-4"></div>

          <!-- 备注 -->
          <div class="mb-4">
            <label class="block text-sm font-medium">
              备注：(请描述工作时间和内容，以及各种限制条件，避免找到不合适的家政人员)
            </label>
            <input type="text" v-model="beizhu" placeholder="请描述工作内容，方便找到对口的家政人员" class="w-full mt-2 p-2 border rounded-md" />
          </div>


          <!-- 联系人 -->
          <div class="mb-4">
            <label class="block text-lg font-medium text-gray-700">联系人：</label>
            <input type="text" v-model="contact_name" placeholder="输入联系人姓名" class="w-full mt-2 p-2 border rounded-md" />
          </div>
          <!-- 联系人电话 -->
          <div class="mb-4">
            <label class="block text-lg font-medium text-gray-700">联系人电话：</label>
            <input type="text" v-model="contact_phone" placeholder="输入联系人电话"
              class="w-full mt-2 p-2 border rounded-md" />
          </div>



          <!-- 同意协议 -->
          <div class="mt-6">
            <label class="flex items-center">
              <input type="checkbox" v-model="agree" class="mr-2" />
              <span class="text-sm text-gray-700">
                我已阅读并同意
                <a href="#" class="text-blue-500">《房东（管家）新增房源协议》</a>
              </span>
            </label>
          </div>

          
          <div class="mt-8" @click="cleanorder">
            <button :disabled="!agree" @click="saveHouseInfo" class="w-full p-3 text-white bg-blue-500 rounded-md"
              :class="[agree ? 'bg-blue-500' : 'bg-gray-300 cursor-not-allowed']">
              确认并下单
            </button>
          </div>
        </div>
      </form>

      <!-- 新内容结束 -->


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
import { useStore } from 'vuex'
import { showToast, showDialog } from 'vant';
import { ref, onMounted, computed, watchEffect  } from 'vue';
import textEditor  from "@/components/textEditor.vue"  
import weizhi from '@/components/weizhi.vue'
import { useRouter,useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const router = useRouter()
const route = useRoute()
const latitude = ref('')
const longitude = ref('')
const category_url = ref('')
// var userinfo = ref()

const houseaddr = ref('')
const houseid = ref('')
const city = ref('')
const contact_name = ref('')
const contact_phone = ref('')
const showProject = ref(false);
const agree = ref(false);

const chooseHouse = ()=>{
  router.push("/chooseHouse"); // 跳转到 /fangyuan 路由
}

var duration = ref(1)

const toggleProject = () => {
  showProject.value = !showProject.value;
};


const onetimeservice =() =>{
    activeTab.value = '一次性服务'
    cleantype.value= ''
    formattedDateTime.value = ''
}
const longtermservice =() =>{
    activeTab.value = '长期服务'
    cleantype.value= ''
    formattedDateTime.value = ''
}


const activeTab = ref("长期服务");


const showPicker = ref(false)
const selectedDate = ref('')
const hour = ref(12)
const minute = ref(0)
var formattedDateTime = ref('')
const beizhi = ref('')
const price= ref('')
const beizhu = ref('')


const cleantype = ref('')

// 判断是否为长期服务
const isLongTerm = computed(() => {
  return cleantype.value === '民宿酒店' || cleantype.value === '老病护理' || cleantype.value === '月子护理'
   || cleantype.value === '孩子护理' || cleantype.value === '单独保洁' || cleantype.value === '保洁做饭' 
})

// 存放计算后的开始日期和结束日期
const startDate = ref('')
const endDate = ref('')

// 日期格式化函数，格式为 yyyy-MM-dd
function formatDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// 根据当前日期计算服务期限
function computeDates() {
  const now = new Date()
  // 开始日期：当前日期 + 7 天
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  // 结束日期：开始日期 + 365 天
  const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 90+7)
  startDate.value = formatDate(start)
  endDate.value = formatDate(end)
}

// 监听长期服务选择，一旦选中则自动计算并显示服务期限
watchEffect(() => {
  if (isLongTerm.value) {
    computeDates()
  } else {
    startDate.value = ''
    endDate.value = ''
  }
})


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



const submitOrder = async () => {
  if (activeTab.value=="长期服务"){
    formattedDateTime.value = endDate.value + " 12:00:00"
    price.value = 200
  }

  if (activeTab.value=="一次性服务"){
    
    price.value = 5
  }
  if (cleantype.value!='' && beizhu.value!='' ){
     console.log('adfa ')
  const order = ref({
    houseid: houseid.value,
    city: city.value,
    houseaddr: houseaddr.value,
    cleantype: cleantype.value,
    price: price.value,
    // beizhu: beizhu.value,
    contact_name: contact_name.value,
    formattedDateTime: formattedDateTime.value,
    beizhu: beizhu.value,
    contact_phone:contact_phone.value,
    latitude:latitude.value,
    longitude:longitude.value,
 
  });
 
  console.log('tijiaoshuju',order.value)

  try {
    const response = await https.post('/api/minsubaojie/addCleanOrder/', order.value);
    console.log('订单提交成功', response.data);
    alert('订单提交成功！');
    router.push("/getcleanorder/")
    // resetForm();
  } catch (error) {
    console.error('订单提交失败', error);
    alert('订单提交失败，请重试！');
  }

}
else{
  alert('保洁类型和备注不能为空')
}
};

// 修改的业务逻辑
const showModal = ref(false);
const editForm = ref({});

const openEditModal = (order) => {
  editForm.value = { ...order };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveOrder = async () => {
  try {
    const response = await fetch(`/api/orders/${editForm.value.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm.value),
    });

    if (!response.ok) throw new Error('保存失败');

    const index = orders.value.findIndex(order => order.id === editForm.value.id);
    if (index !== -1) orders.value[index] = { ...editForm.value };

    closeModal();
    alert('订单已更新');
  } catch (error) {
    alert(error.message);
  }
};



//修改业务逻辑结束

onMounted(() => {
  houseid.value = localStorage.getItem("house_id");
  houseaddr.value = localStorage.getItem('houseaddr')
  city.value = localStorage.getItem('city')
  price.value = localStorage.getItem('price')
  // beizhu.value = localStorage.getItem('beizhu')
  latitude.value = localStorage.getItem('latitude')
  longitude.value = localStorage.getItem('longitude')
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