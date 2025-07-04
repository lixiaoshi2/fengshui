<template>

  <van-nav-bar title="选择合适的服务者" left-text="返回" @click-left="router.go(-1)" left-arrow>
    <template #right>

      <van-icon name="question-o" size="18" @click="showImage = true" />
    </template>
  </van-nav-bar>

  <!-- 弹出图片窗口 -->
  <van-popup v-model:show="showImage" position="center" closeable round>
    <img src="/images/help2/faburenwu.jpg" alt="帮助图片" style="max-width: 90vw; max-height: 80vh; border-radius: 8px" />
  </van-popup>




  <div style="margin-bottom: 35px;" class="container mx-auto p-4 ">
    <div class="flex text-sm items-center justify-center space-x-4 mt-4 mb-5">
      <h2 class="l ">此页面让您 <span class="text-red-500">尽量多</span>
        选择合适的家政人员，然后等待被选人员“接受此任务”，只有最早接单的人，才有资格获得您的提供的工作机会，服务者的人数根据选择会不同。
       
        <br>服务人员分为专业和一般家政人员，如果找不到，可修改查找类别
        <br><span class="text-red-500"> * 如果匹配后，双方经协商和试用还不满意，平台不退款 </span>
        <br><span class="text-red-500"> * 请雇主自己验证家政人员信息，管理好自己财务，平台仅提供联系方式 </span>
        <br><span class="text-red-500"> * 如果家政员有不检点行为请在:查找结果->评论->投诉区，我们将其清除平台 </span>
      </h2>

    </div>

    

    <div class="flex items-center justify-center space-x-4 mt-4 mb-5">

      <button @click="paidan" class="text-sm px-6 py-1 bg-blue-500 text-white rounded-md text-base">
        发布任务
      </button>
      <button @click="showConfirmfun()" class="text-sm px-6 py-1 bg-blue-500 text-white rounded-md text-base">
        去支付
      </button>
    </div>



    <div class="flex items-center mb-4">
      <!-- <span class="">{{ order_id }}</span></div> -->
      <div @click="editOrder(order_id)" class="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded cursor-pointer hover:bg-blue-600">订单id： 
        <span >
        {{ order_id }}
      </span></div>


      <!-- 全选复选框 -->
      <div class="flex items-center ml-4">
        <input type="checkbox" id="selectAll" v-model="selectAll" @change="toggleSelectAll"
          class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
        <label for="selectAll" class="ml-2 cursor-pointer">全选/取消全选</label>

      </div>
    </div>
    <label for="selectAll" class="ml-2 cursor-pointer">（下滑页面到底打开下一页）</label>


    <!-- <div v-if="loading" class="text-gray-500">正在加载...</div>
    <div v-if="errorMsg" class="text-red-500">{{ errorMsg }}</div> -->

    <ul v-if="cleaners.length > 0">
      <li v-for="cleaner in cleaners" :key="cleaner.id" class="border p-4 rounded-lg mb-2">

        <!-- 复选框 -->

        <p><strong>姓名：</strong>{{ cleaner.name }}，{{ cleaner.gender }} ，{{ cleaner.age }}岁，编号 {{ cleaner.user_id }}</p>
        <!-- <p><strong>家政编号：</strong>{{ cleaner.id }}</p> -->
        <!-- <p><strong>年龄：</strong>{{ cleaner.age }}</p> -->
        <!-- <p><strong>性别：</strong>{{ cleaner.gender }}</p> -->
        <p class="text-blue-600"><strong>距离：</strong>{{ cleaner.distance_km }} 公里</p>
        <p> <strong>地址：</strong>{{ cleaner.addr }} </p>
        <p><strong>备注：</strong>{{ cleaner.beizhu }} </p>


        <!-- 复选框和 label 使用 flex 布局对齐 -->
        <div class="flex items-center mr-4">
          <input type="checkbox" :id="'cleaner_' + cleaner.id" :value="cleaner.id" v-model="selectedCleanerIds"
            class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
          <label :for="'cleaner_' + cleaner.id" class="ml-2 cursor-pointer">
            设为备选
          </label>
          <button @click="router.push(`/rating2/${order_id}/${cleaner.id}`)"
            class="mt-1 ml-4 px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
            他人评价
          </button>
        </div>


      </li>
    </ul>

    <!-- <p v-if="noMoreData" class="text-center text-gray-500 mt-4">没有更多数据了</p> -->
    <p v-if="loading" class="text-center text-blue-500 mt-4">加载中...</p>
    <p v-if="errorMsg" class="text-center text-red-500 mt-4">{{ errorMsg }}</p>

    <!-- 确认选择按钮 -->
    <div class="flex justify-center space-x-4 mt-4 mb-5">
      <button @click="$router.push('/getcleanorder')" class="px-4 py-2 bg-blue-500 text-white rounded-md">
        返回订单列表
      </button>

   

    </div>


    <!-- 自定义确认对话框 -->
    <div v-if="showDialog" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg">
        <h2 class="text-lg font-semibold mb-4">确认分配任务</h2>
        <p class="text-gray-700 mb-4">
          请认真检查自己定义的工作内容、时间、报酬及人员要求，一般需要等待1个小时以上让服务者抢单，如长无人抢单时，重新修改工作条件，以匹配更多的人员。
        </p>

        <p class="text-gray-700 mb-4">
          系统会匹配约定数量的服务者给您。
        </p>

        <div class="flex justify-end space-x-4">
          <button @click="showDialog = false" class="px-4 py-2 bg-gray-400 text-white rounded-md">
            取消
          </button>
          <button @click="confirmAssign()" class="px-4 py-2 bg-green-500 text-white rounded-md">
            确认分配
          </button>
        </div>
      </div>
    </div>
    <!-- 派单对话框结束 -->

    <!-- 没有付费的提示框 -->
    <div v-if="showPayDiallog" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg">
        <!-- <h2 class="text-lg font-semibold mb-4">确认分配任务</h2> -->
        <p class="text-gray-700 mb-4">
          如您已支付，请等待系统确认或打电话加快确认，如您还未付费，请先付费，付费前查看附近是否有足够的服务人员，如果没有，请不要付费，平台不退款。
        </p>


        <div class="flex justify-end space-x-4">
          <button @click="showPayDiallog = false" class="px-4 py-2 bg-gray-400 text-white rounded-md">
            确认
          </button>
        </div>

      </div>
    </div>


    <!-- 没有付费的提示框 -->



    <!-- 支付前对话框 -->
    <div v-if="showConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <p class="text-lg mb-4">支付前请查看周围是否有足够的人选，如果没有请不要支付，平台不退款</p>
        <div class="flex justify-end space-x-4">
          <button @click="confirmPay()" class="px-4 py-2 bg-blue-500 text-white rounded-lg">确定</button>
          <button @click="showConfirm = false" class="px-4 py-2 bg-gray-300 rounded-lg">取消</button>
        </div>
      </div>
    </div>


  </div>



</template>

<script setup>
// import axios from 'axios';
// import config from '@/global.config.js'
// import md5 from 'js-md5'
// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';
// import funcs from '@/utils/common_func.js';

// import { useStore } from 'vuex'
// import { showToast, showDialog } from 'vant';
import { ref, onMounted, computed,onBeforeUnmount, watch ,reactive } from 'vue';

import { useRouter, useRoute } from 'vue-router'
// import { useHead } from '@vueuse/head'

const router = useRouter()
const route = useRoute()


const order_id = route.query.order_id;
const cleaners = ref([]);


const errorMsg = ref("");
const showPayDiallog = ref(false)
const selectAll = ref(false);
const showDialog = ref(false);
const selectedCleanerIds = ref([]);

// 确认派单,先保存备选人员，然后系统后台自行派单
const confirmAssign = () => {
  showDialog.value = false;
  saveCandidates();
};

// 支付功能
const showImage = ref(false)
const showConfirm = ref(false)

const  orderId = ref('')
const  price = ref('')

let scrollListener = null; // 用于解绑时保留引用

const editOrder = (order_id) =>{
  router.push(`/orderedit/${order_id}/`)
}


// ✅ 使用节流函数防止过度调用
let throttleTimer = null;
const throttle = (fn, delay = 300) => {
  return () => {
    if (throttleTimer) return;
    throttleTimer = setTimeout(() => {
      fn();
      throttleTimer = null;
    }, delay);
  };
};

orderId.value = route.query.order_id;
price.value = route.query.price;

// 确认事件函数
const showConfirmfun = () => {

  showConfirm.value = true
  // currentOrderId.value = order.id

}


// // 实际支付
const confirmPay = async () => {

 router.push({ path: "/show_erweima", query: { order_id: orderId.value ,price:price.value} })

  


};


// 加载最新家政人员
const get_paystatus = async (orderId) => {

 
  const url = `/api/minsubaojie/pay_status/${orderId}/`

  const res = await https.get(url)
  console.log('订单状态',res)
  return res

}


//   showDialog = true
const paidan = async()=>{
  console.log("运行到这里")

  showDialog.value = true
 }


const closePayDialog=()=>{
  closePayDialog.value = false
}
const loading = ref(false);
const page = ref(1);
const noMoreData = ref(false);



// 分配最近的家政人员
const fetchCleaners = async () => {

   if (loading.value || noMoreData.value) return;
  loading.value = true;

  try {
    const response = await https.post("/api/minsubaojie/find_nearest_cleaners/", {
      order_id,
      page: page.value,
      city: localStorage.getItem("city")
    });

    if (response.cleaners && response.cleaners.length > 0) {
      cleaners.value.push(...response.cleaners);
      page.value += 1;
    } else {
      noMoreData.value = true;
      errorMsg.value = "没有更多数据了";
    }
  } catch (error) {
    console.error("获取保洁员失败:", error);
    errorMsg.value = "获取保洁员失败，请检查网络或稍后再试！";
  } finally {
    loading.value = false;
  }

};




const handleScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  const scrollHeight = document.documentElement.scrollHeight;

  if (scrollTop + clientHeight >= scrollHeight - 20) {
    fetchCleaners();
  }
};


// 保存备选的家政人员
const saveCandidates = async () => {
  if (selectedCleanerIds.value.length === 0) {
    alert('请选择至少一名备选家政人员！');
    return;
  }
 
  console.log('order_id',order_id)
  console.log('selectedCleanerIds',selectedCleanerIds.value)
  // 组合 cleaner_id 和 user_id
  const selectedCandidates = selectedCleanerIds.value.map(cleanerId => {
    const cleaner = cleaners.value.find(c => c.id === cleanerId);
    return cleaner ? { cleaner_id: cleaner.id, user_id: cleaner.user_id,distance: cleaner.distance_km } : null;
  }).filter(Boolean);  // 过滤掉 null 值
  console.log('selectedCandidates',selectedCandidates)
  
  try {
    const response = await https.post('/api/minsubaojie/save_candidates/', {
      order_id: order_id,
      selectedCandidates: selectedCandidates  
    });
    if (response.success) {
      alert("您选中的人员已保存")
      if (response.pay_status=="已支付"){
        // 已经支付了
        console.log("asdf")
        alert('您已支付，请耐心等待家政人员接单 ');
        router.push("/getcleanorder")
      }
      else{
        alert("未支付，请支付")
        router.push({ path: "/show_erweima", query: { order_id: orderId.value ,price:price.value} })
       
      }
      // 在这里查看是否已支付，已支付则直接到备选家政人员界面
      // 

    } else {
      alert('提交失败：' + response.message);
    }
  } catch (error) {
    alert('提交失败，请检查网络或稍后再试！');
  }
};


// 全选/取消全选
const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedCleanerIds.value = cleaners.value.map(cleaner => cleaner.id);
  } else {
    selectedCleanerIds.value = [];
  }
};

// // 如果手动勾选或取消，更新selectAll状态
watch(selectedCleanerIds, (newVal) => {
  selectAll.value = newVal.length === cleaners.value.length;
});



onMounted(() => {
  fetchCleaners()
  window.addEventListener('scroll', handleScroll);
})

// ✅ 离开页面时移除监听器，防止内存泄漏或页面已卸载还加载数据
onBeforeUnmount(() => {
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener);
  }
});

</script>


<style scoped>
:deep(img) {
  max-width: 100%;
  /* 图片最大宽度为父元素宽度的100% */
  height: auto;
  /* 高度自动调整，保持宽高比 */
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

:deep(p) {
  line-height: 35px;
}
</style>